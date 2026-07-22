import { motion, useReducedMotion } from 'motion/react'

/** 每字间隔（秒） */
export const CHAR_DELAY = 0.05
/** 单字浮现时长（秒） */
export const CHAR_DURATION = 0.32
/** 行与行之间停顿（秒） */
export const LINE_GAP = 0.3
/** 首行开播前短延迟（秒） */
export const INTRO_DELAY = 0.15

export type TypeSegment = {
  text: string
  className?: string
}

type TypeRevealProps = {
  segments: TypeSegment[]
  className?: string
  /** 本行首字开始的绝对延迟（秒） */
  startDelay?: number
  /** 覆盖默认每字间隔 */
  charDelay?: number
  /** 覆盖默认单字浮现时长 */
  charDuration?: number
}

/** 一行字全部「出现」的时刻（末字 delay + 大半动画，用于衔接下一行） */
export function lineDoneAt(
  startDelay: number,
  charCount: number,
  charDelay = CHAR_DELAY,
  charDuration = CHAR_DURATION,
) {
  if (charCount <= 0) return startDelay
  return startDelay + (charCount - 1) * charDelay + charDuration * 0.55
}

/** 逐字浮现：opacity + 轻上移，无光标 */
export function TypeReveal({
  segments,
  className = '',
  startDelay = 0,
  charDelay = CHAR_DELAY,
  charDuration = CHAR_DURATION,
}: TypeRevealProps) {
  const reduceMotion = useReducedMotion()
  const fullText = segments.map((s) => s.text).join('')

  if (reduceMotion) {
    return (
      <span className={className}>
        {segments.map((seg, i) => (
          <span key={i} className={seg.className}>
            {seg.text}
          </span>
        ))}
      </span>
    )
  }

  let index = 0
  const chars = segments.flatMap((segment) =>
    Array.from(segment.text).map((char) => {
      const i = index++
      return { char, className: segment.className, i }
    }),
  )

  return (
    <span className={className} aria-label={fullText}>
      {chars.map(({ char, className: charClass, i }) => (
        <motion.span
          key={`${i}-${char}`}
          aria-hidden
          className={['inline-block', charClass].filter(Boolean).join(' ')}
          initial={{ opacity: 0, y: '0.22em' }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: charDuration,
            delay: startDelay + i * charDelay,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  )
}
