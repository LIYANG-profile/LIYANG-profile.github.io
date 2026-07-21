import { Play } from '@phosphor-icons/react'
import { motion, useReducedMotion } from 'motion/react'
import { categoryColors, type Work } from '../data/works'

type WorkCardProps = {
  work: Work
  onOpenDetail: () => void
}

export function WorkCard({ work, onOpenDetail }: WorkCardProps) {
  const reduceMotion = useReducedMotion()
  const isPortraitPoster = work.posterAspect === 'portrait'
  const mediaFitClass = isPortraitPoster
    ? 'object-contain bg-paper'
    : 'object-cover'

  return (
    <motion.article
      className="group flex w-[82vw] max-w-[340px] shrink-0 snap-start flex-col border border-line bg-paper transition-[border-color,box-shadow] duration-300 hover:border-ink/35 sm:w-[320px]"
      whileHover={reduceMotion ? undefined : { y: -3 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      <button
        type="button"
        className="flex h-full w-full flex-col text-left"
        onClick={onOpenDetail}
        aria-label={`查看作品详情：${work.title}`}
      >
        <span className="relative aspect-video w-full overflow-hidden bg-ink/5">
          <img
            src={work.poster}
            alt=""
            className={`h-full w-full ${mediaFitClass}`}
            loading="lazy"
            decoding="async"
          />

          <span className="pointer-events-none absolute inset-0 flex items-center justify-center bg-ink/10 transition-opacity duration-200 group-hover:bg-ink/20">
            <span className="flex h-14 w-14 items-center justify-center rounded-full border border-paper/70 bg-paper/90 text-ink">
              <Play size={22} weight="fill" className="ml-0.5" />
            </span>
          </span>
        </span>

        <span className="flex flex-1 flex-col gap-2.5 px-4 py-4">
          <span className="relative flex min-h-[1.1em] items-baseline justify-center">
            <span
              className="text-[14px] font-semibold leading-none tracking-wide"
              style={{ color: categoryColors[work.categoryTone] }}
            >
              {work.category}
            </span>
            <span className="absolute right-0 top-1/2 -translate-y-1/2 font-label text-[11px] leading-none tracking-[0.12em] text-muted">
              {work.duration}
            </span>
          </span>
          <span className="text-[17px] font-bold leading-snug tracking-tight">
            {work.title}
          </span>
          <span className="line-clamp-2 text-[13px] leading-relaxed text-muted">
            {work.summary}
          </span>
        </span>
      </button>
    </motion.article>
  )
}
