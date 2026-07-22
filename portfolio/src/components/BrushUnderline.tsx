import { motion, useReducedMotion } from 'motion/react'
import type { ReactNode } from 'react'

/** 与作品分类色板对齐的笔刷色 */
const brushTones = {
  accent: 'text-accent',
  olive: 'text-[#6B7A4A]',
  slate: 'text-[#5B6B7A]',
  sky: 'text-[#3B82C4]',
} as const

type BrushTone = keyof typeof brushTones

type BrushUnderlineProps = {
  children: ReactNode
  className?: string
  /** accent=橘红（默认）；olive/slate 适配作品分类色 */
  tone?: BrushTone
  /** 笔刷开始绘制的延迟（秒）；默认 0.28 */
  drawDelay?: number
}

/** 笔刷下划线：章节标题强调 */
export function BrushUnderline({
  children,
  className = '',
  tone = 'accent',
  drawDelay = 0.28,
}: BrushUnderlineProps) {
  const reduceMotion = useReducedMotion()

  return (
    <span className={`relative inline-block ${className}`}>
      <span className="relative z-10">{children}</span>
      <svg
        className={`pointer-events-none absolute -bottom-1 left-[-2%] h-[0.32em] w-[104%] ${brushTones[tone]}`}
        viewBox="0 0 200 12"
        preserveAspectRatio="none"
        aria-hidden
      >
        <motion.path
          d="M2 8 C40 2, 80 11, 120 6 S180 3, 198 7"
          fill="none"
          stroke="currentColor"
          strokeWidth="5"
          strokeLinecap="round"
          initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 0.92 }}
          viewport={{ once: true, margin: '-8% 0px' }}
          transition={{
            duration: 0.75,
            delay: reduceMotion ? 0 : drawDelay,
            ease: [0.22, 1, 0.36, 1],
          }}
        />
      </svg>
    </span>
  )
}
