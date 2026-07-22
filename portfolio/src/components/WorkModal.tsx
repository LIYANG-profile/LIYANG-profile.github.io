import { ArrowSquareOut, X } from '@phosphor-icons/react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useEffect, useId, useRef } from 'react'
import { type Work } from '../data/works'

type WorkModalProps = {
  work: Work | null
  onClose: () => void
}

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'textarea:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'video[controls]',
  '[tabindex]:not([tabindex="-1"])',
].join(', ')

function listFocusableElements(container: HTMLElement) {
  return Array.from(
    container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
  ).filter((element) => {
    if (element.hasAttribute('disabled') || element.getAttribute('aria-hidden') === 'true') {
      return false
    }
    return element.getClientRects().length > 0
  })
}

export function WorkModal({ work, onClose }: WorkModalProps) {
  const titleId = useId()
  const closeRef = useRef<HTMLButtonElement>(null)
  const dialogRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const previouslyFocusedRef = useRef<HTMLElement | null>(null)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    if (!work) return

    previouslyFocusedRef.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null

    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
        return
      }

      if (event.key !== 'Tab') return

      const dialog = dialogRef.current
      if (!dialog) return

      const focusable = listFocusableElements(dialog)
      if (focusable.length === 0) {
        event.preventDefault()
        return
      }

      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      const active = document.activeElement

      if (event.shiftKey) {
        if (active === first || !dialog.contains(active)) {
          event.preventDefault()
          last.focus()
        }
        return
      }

      if (active === last || !dialog.contains(active)) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', onKeyDown)
      previouslyFocusedRef.current?.focus()
    }
  }, [work, onClose])

  useEffect(() => {
    if (!work?.clipSrc) return

    const video = videoRef.current
    if (!video) return

    video.pause()
    video.currentTime = 0

    return () => {
      video.pause()
      video.currentTime = 0
    }
  }, [work])

  const detailBlocks = work
    ? [
        { label: '背景', body: work.detail.background },
        { label: '亮点', body: work.detail.role },
      ]
    : []

  const isPortraitPoster = work?.posterAspect === 'portrait'
  const mediaFitClass = isPortraitPoster
    ? 'object-contain bg-paper'
    : 'object-cover'

  return (
    <AnimatePresence>
      {work ? (
        <motion.div
          key={work.id}
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/45 p-3 sm:p-4"
          role="presentation"
          onClick={onClose}
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduceMotion ? 0.01 : 0.22 }}
        >
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="flex max-h-[96dvh] w-full max-w-3xl flex-col overflow-y-auto border border-line bg-paper sm:max-h-[min(96dvh,calc(100dvh-2rem))]"
            onClick={(event) => event.stopPropagation()}
            initial={
              reduceMotion ? false : { opacity: 0, scale: 0.97, y: 10 }
            }
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={
              reduceMotion
                ? { opacity: 0 }
                : { opacity: 0, scale: 0.985, y: 6 }
            }
            transition={{
              duration: reduceMotion ? 0.01 : 0.28,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div className="relative shrink-0 border-b border-line px-4 py-2 md:px-5">
              <button
                ref={closeRef}
                type="button"
                className="absolute right-2 top-1.5 flex h-8 w-8 items-center justify-center text-ink/35 transition-colors hover:text-ink focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-ink md:right-4"
                aria-label="关闭详情"
                onClick={onClose}
              >
                <X size={16} weight="light" />
              </button>
              <div className="flex flex-col items-center px-8 text-center">
                <h2
                  id={titleId}
                  className="text-lg font-bold tracking-tight md:text-xl"
                >
                  {work.title}
                </h2>
                {work.roles.length > 0 ? (
                  <p className="mt-1 max-w-md text-[11px] leading-snug text-ink/50">
                    {work.roles.join(' · ')}
                  </p>
                ) : null}
              </div>
            </div>

            <div
              className={`relative aspect-video w-full shrink-0 overflow-hidden border-b border-line ${
                isPortraitPoster ? 'bg-paper' : 'bg-ink/5'
              }`}
            >
              {work.clipSrc ? (
                <video
                  ref={videoRef}
                  className={`absolute inset-0 h-full w-full ${mediaFitClass}`}
                  src={work.clipSrc}
                  poster={work.poster}
                  controls
                  playsInline
                  preload="metadata"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <img
                    src={work.poster}
                    alt=""
                    className={`absolute inset-0 h-full w-full opacity-80 ${mediaFitClass}`}
                  />
                  <p className="relative z-10 border border-line bg-paper/95 px-4 py-2 text-sm text-muted">
                    视频片段待替换 · 当前为封面占位
                  </p>
                </div>
              )}
            </div>

            <motion.div
              className="flex flex-col"
              initial={reduceMotion ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: reduceMotion ? 0.01 : 0.26,
                delay: reduceMotion ? 0 : 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div className="relative grid grid-cols-2 gap-0 border-b border-line">
                <div
                  className="pointer-events-none absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-line"
                  aria-hidden
                />
                {detailBlocks.map((block) => (
                  <div
                    key={block.label}
                    className="px-3 py-2.5 md:px-4 md:py-3.5"
                  >
                    <p className="font-label text-[10px] tracking-[0.28em] text-muted">
                      {block.label}
                    </p>
                    <p
                      className={`mt-1.5 max-w-[34ch] text-sm leading-snug text-ink/70 md:text-[15px]${
                        block.label === '亮点' ? ' whitespace-pre-line' : ''
                      }`}
                    >
                      {block.body}
                    </p>
                  </div>
                ))}
              </div>

              {work.fullUrl ? (
                <div className="shrink-0 px-4 py-2.5 md:px-5">
                  <a
                    href={work.fullUrl}
                    className="inline-flex items-center gap-2 font-label text-xs tracking-[0.18em] text-accent"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    查看完整版
                    <ArrowSquareOut size={14} />
                  </a>
                </div>
              ) : null}
            </motion.div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
