import { ArrowSquareOut, Play, X } from '@phosphor-icons/react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useEffect, useId, useRef, useState } from 'react'
import { categoryColors, type Work } from '../data/works'

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
  const [showPosterCover, setShowPosterCover] = useState(true)

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

    setShowPosterCover(true)
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
          transition={{ duration: 0.22 }}
        >
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="flex max-h-[96dvh] w-full max-w-3xl flex-col overflow-y-auto border-2 border-accent/40 bg-paper shadow-2xl sm:max-h-[min(96dvh,calc(100dvh-2rem))]"
            onClick={(event) => event.stopPropagation()}
            initial={
              reduceMotion ? false : { opacity: 0, y: 32, scale: 0.97 }
            }
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={
              reduceMotion
                ? { opacity: 0 }
                : { opacity: 0, y: 18, scale: 0.98 }
            }
            transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative shrink-0 border-b border-line px-4 py-3 md:px-5">
              <button
                ref={closeRef}
                type="button"
                className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center border border-line transition-colors hover:border-ink md:right-5"
                aria-label="关闭详情"
                onClick={onClose}
              >
                <X size={18} />
              </button>
              <div className="flex flex-col items-center px-10 text-center">
                <p className="flex items-baseline justify-center gap-3">
                  <span
                    className="font-label text-[10px] tracking-[0.16em]"
                    style={{ color: categoryColors[work.categoryTone] }}
                  >
                    {work.category}
                  </span>
                  <span className="font-label text-[10px] tracking-[0.12em] text-muted">
                    {work.duration}
                  </span>
                </p>
                <h2
                  id={titleId}
                  className="mt-0.5 text-xl font-bold tracking-tight md:text-2xl"
                >
                  {work.title}
                </h2>
                {work.roles.length > 0 ? (
                  <ul className="mt-2 flex flex-wrap justify-center gap-1.5">
                    {work.roles.map((role) => (
                      <li
                        key={role}
                        className="border border-line px-2 py-0.5 text-[11px] leading-none text-ink/65"
                      >
                        {role}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </div>

            <div className="relative aspect-video w-full shrink-0 overflow-hidden bg-ink/5">
              {work.clipSrc ? (
                <>
                  <video
                    ref={videoRef}
                    className={`absolute inset-0 z-0 h-full w-full ${mediaFitClass}`}
                    src={work.clipSrc}
                    poster={work.poster}
                    controls
                    playsInline
                    preload="none"
                    onPlaying={() => setShowPosterCover(false)}
                  />
                  {showPosterCover ? (
                    <button
                      type="button"
                      className="absolute inset-0 z-[1] flex items-center justify-center"
                      aria-label={`播放 ${work.title}`}
                      onClick={() => {
                        void videoRef.current?.play()
                      }}
                    >
                      <img
                        src={work.poster}
                        alt=""
                        className={`pointer-events-none absolute inset-0 h-full w-full ${mediaFitClass}`}
                        decoding="async"
                        fetchPriority="high"
                      />
                      <span className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full border border-line bg-paper/95 text-ink shadow-sm transition-transform hover:scale-105">
                        <Play size={26} weight="fill" className="ml-0.5" />
                      </span>
                    </button>
                  ) : null}
                </>
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

            <div className="flex flex-col">
              <div className="grid grid-cols-2 gap-0 border-t border-line">
                {detailBlocks.map((block, index) => (
                  <motion.div
                    key={block.label}
                    className="border-b border-line px-3 py-3 odd:border-r md:px-4 md:py-5"
                    initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.3,
                      delay: 0.12 + index * 0.05,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <p className="font-label text-[11px] tracking-[0.2em] text-muted">
                      {block.label}
                    </p>
                    <p
                      className={`mt-2 text-[15px] leading-relaxed text-ink/85 md:text-base${
                        block.label === '亮点' ? ' whitespace-pre-line' : ''
                      }`}
                    >
                      {block.body}
                    </p>
                  </motion.div>
                ))}
              </div>

              {work.fullUrl ? (
                <div className="shrink-0 border-t border-line px-4 py-3 md:px-5">
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
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
