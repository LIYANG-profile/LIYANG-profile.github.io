import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from 'react'
import { useReducedMotion } from 'motion/react'
import { works, type Work } from '../data/works'
import { BrushUnderline } from './BrushUnderline'
import { Reveal } from './Reveal'
import { WorkCard } from './WorkCard'
import { WorkModal } from './WorkModal'

const SPEED_PX_PER_SEC = 36
const MOBILE_DRAG_MQ = '(pointer: coarse) and (max-width: 767px)'
/** Ignore tiny jitter before choosing an axis. */
const AXIS_LOCK_PX = 14
/** Horizontal must clearly win so vertical page scroll stays native. */
const HORIZONTAL_DOMINANCE = 1.5

/** Keep offset in (-loopWidth, 0] so the duplicated track never shows a gap. */
function wrapOffset(offset: number, loopWidth: number) {
  if (loopWidth <= 0) return 0
  let next = offset % loopWidth
  if (next > 0) next -= loopWidth
  if (next <= -loopWidth) next += loopWidth
  return next
}

export function WorksMarquee() {
  const trackRef = useRef<HTMLDivElement>(null)
  const offsetRef = useRef(0)
  const loopWidthRef = useRef(0)
  const draggingRef = useRef(false)
  const dragStartXRef = useRef(0)
  const dragStartYRef = useRef(0)
  const dragStartOffsetRef = useRef(0)
  const pointerIdRef = useRef<number | null>(null)
  const axisLockRef = useRef<'none' | 'x' | 'y'>('none')
  const dragMovedRef = useRef(false)
  const reduceMotion = useReducedMotion()

  const [hoverPaused, setHoverPaused] = useState(false)
  const [selectedWork, setSelectedWork] = useState<Work | null>(null)
  const [mobileDragEnabled, setMobileDragEnabled] = useState(false)

  const loopWorks = useMemo(
    () => (reduceMotion ? [...works] : [...works, ...works]),
    [reduceMotion],
  )

  useEffect(() => {
    const media = window.matchMedia(MOBILE_DRAG_MQ)
    const sync = () => setMobileDragEnabled(media.matches)
    sync()
    media.addEventListener('change', sync)
    return () => media.removeEventListener('change', sync)
  }, [])

  const applyTransform = useCallback(() => {
    if (trackRef.current) {
      trackRef.current.style.transform = `translate3d(${offsetRef.current}px,0,0)`
    }
  }, [])

  const measureLoopWidth = useCallback(() => {
    const track = trackRef.current
    if (!track || reduceMotion) {
      loopWidthRef.current = 0
      return
    }

    const cards = track.children
    const count = works.length
    if (cards.length < count * 2) return

    const first = cards[0] as HTMLElement
    const secondSetFirst = cards[count] as HTMLElement
    const width = secondSetFirst.offsetLeft - first.offsetLeft
    if (width <= 0) return

    loopWidthRef.current = width
    offsetRef.current = wrapOffset(offsetRef.current, width)
    applyTransform()
  }, [applyTransform, reduceMotion])

  useEffect(() => {
    measureLoopWidth()

    const track = trackRef.current
    const resizeObserver =
      track && typeof ResizeObserver !== 'undefined'
        ? new ResizeObserver(() => measureLoopWidth())
        : null
    if (track && resizeObserver) resizeObserver.observe(track)

    const images = track?.querySelectorAll('img') ?? []
    const onImageSettle = () => measureLoopWidth()
    images.forEach((img) => {
      if (!img.complete) {
        img.addEventListener('load', onImageSettle)
        img.addEventListener('error', onImageSettle)
      }
    })

    window.addEventListener('resize', measureLoopWidth)
    return () => {
      resizeObserver?.disconnect()
      window.removeEventListener('resize', measureLoopWidth)
      images.forEach((img) => {
        img.removeEventListener('load', onImageSettle)
        img.removeEventListener('error', onImageSettle)
      })
    }
  }, [measureLoopWidth, loopWorks])

  useEffect(() => {
    if (reduceMotion) {
      offsetRef.current = 0
      applyTransform()
      return
    }

    let frame = 0
    let last = performance.now()

    const tick = (now: number) => {
      const delta = (now - last) / 1000
      last = now

      const shouldRun = !hoverPaused && !draggingRef.current
      const loopWidth = loopWidthRef.current

      if (shouldRun && trackRef.current && loopWidth > 0) {
        offsetRef.current = wrapOffset(
          offsetRef.current - SPEED_PX_PER_SEC * delta,
          loopWidth,
        )
        applyTransform()
      }

      frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [applyTransform, hoverPaused, reduceMotion])

  const handleOpenDetail = (work: Work) => {
    if (dragMovedRef.current) return
    setSelectedWork(work)
  }

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!mobileDragEnabled || reduceMotion) return
    pointerIdRef.current = event.pointerId
    dragStartXRef.current = event.clientX
    dragStartYRef.current = event.clientY
    dragStartOffsetRef.current = offsetRef.current
    axisLockRef.current = 'none'
    dragMovedRef.current = false
    draggingRef.current = false
  }

  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (pointerIdRef.current !== event.pointerId) return
    if (axisLockRef.current === 'y') return

    const dx = event.clientX - dragStartXRef.current
    const dy = event.clientY - dragStartYRef.current

    if (axisLockRef.current === 'none') {
      if (Math.hypot(dx, dy) < AXIS_LOCK_PX) return
      if (Math.abs(dx) > Math.abs(dy) * HORIZONTAL_DOMINANCE) {
        axisLockRef.current = 'x'
        draggingRef.current = true
        dragMovedRef.current = true
        event.currentTarget.setPointerCapture(event.pointerId)
      } else if (Math.abs(dy) >= Math.abs(dx)) {
        // Yield fully to native vertical scrolling — do not capture or preventDefault.
        axisLockRef.current = 'y'
        pointerIdRef.current = null
        draggingRef.current = false
        return
      } else {
        return
      }
    }

    if (axisLockRef.current !== 'x') return

    if (event.cancelable) event.preventDefault()
    offsetRef.current = wrapOffset(
      dragStartOffsetRef.current + dx,
      loopWidthRef.current,
    )
    applyTransform()
  }

  const endDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (
      pointerIdRef.current !== null &&
      pointerIdRef.current !== event.pointerId
    ) {
      return
    }
    const wasHorizontalDrag = axisLockRef.current === 'x'
    draggingRef.current = false
    pointerIdRef.current = null
    axisLockRef.current = 'none'
    if (wasHorizontalDrag) {
      offsetRef.current = wrapOffset(offsetRef.current, loopWidthRef.current)
      applyTransform()
    }
  }

  const dragHandlers =
    reduceMotion || !mobileDragEnabled
      ? undefined
      : {
          onPointerDown,
          onPointerMove,
          onPointerUp: endDrag,
          onPointerCancel: endDrag,
        }

  return (
    <section id="works" aria-labelledby="works-heading">
      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          <div className="flex flex-wrap items-baseline justify-between gap-3 px-5 pt-14 pb-10 md:px-10 md:pt-16 md:pb-12 lg:px-14">
            <h2
              id="works-heading"
              className="text-3xl font-black tracking-tight md:text-4xl"
            >
              <BrushUnderline tone="slate">作品</BrushUnderline>
            </h2>
            <p className="font-label text-[11px] tracking-[0.28em] text-muted">
              WORKS
            </p>
          </div>
        </Reveal>

        <div
          className={`relative pb-14 md:pb-20 ${
            reduceMotion
              ? 'overflow-x-auto overflow-y-hidden'
              : 'overflow-hidden'
          }${mobileDragEnabled && !reduceMotion ? ' touch-pan-y' : ''}`}
          onMouseEnter={() => setHoverPaused(true)}
          onMouseLeave={() => setHoverPaused(false)}
        >
          <div
            ref={trackRef}
            className="flex w-max gap-4 px-5 will-change-transform touch-pan-y md:gap-5 md:px-10 lg:px-14"
            {...dragHandlers}
          >
            {loopWorks.map((work, index) => {
              const instanceId = `${work.id}-${index}`
              return (
                <WorkCard
                  key={instanceId}
                  work={work}
                  onOpenDetail={() => handleOpenDetail(work)}
                />
              )
            })}
          </div>
        </div>
      </div>

      <WorkModal work={selectedWork} onClose={() => setSelectedWork(null)} />
    </section>
  )
}
