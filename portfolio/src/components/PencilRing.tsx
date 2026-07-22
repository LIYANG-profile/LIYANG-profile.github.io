import { motion, useReducedMotion } from 'motion/react'
import type { ReactNode } from 'react'

type PencilHand = 'a' | 'b'

type PencilRingProps = {
  children: ReactNode
  /** 起笔延迟（秒） */
  drawDelay?: number
  /** 一笔画完时长（秒），含收笔停顿与画过头 */
  drawDuration?: number
  /** 两套笔势，像两个人画 */
  hand?: PencilHand
  active?: boolean
  className?: string
}

const hands: Record<
  PencilHand,
  {
    path: string
    strokeWidth: number
    color: string
    duration: number
    pathLength: number[]
    times: number[]
    ease: Array<[number, number, number, number] | 'linear'>
  }
> = {
  // 手 A：偏沉稳，左下切入，右上短甩
  a: {
    path:
      'M 22 56 ' +
      'C 18 36, 55 5, 108 6 ' +
      'S 172 28, 168 54 ' +
      'S 140 84, 84 82 ' +
      'S 14 64, 20 38 ' +
      'C 28 24, 48 18, 68 22 ' +
      'C 84 16, 104 4, 126 -4',
    strokeWidth: 2.25,
    color: '#8B5FBF',
    duration: 2.15,
    pathLength: [0, 0.76, 0.89, 0.89, 1],
    times: [0, 0.52, 0.72, 0.85, 1],
    ease: [
      [0.4, 0.05, 0.4, 1],
      [0.25, 0.75, 0.2, 1],
      'linear',
      [0.2, 0.6, 0.25, 1],
    ],
  },
  // 手 B：更随意，右上起笔逆时针，合口后水平偏右甩出
  b: {
    path:
      'M 148 18 ' +
      'C 168 28, 176 52, 162 70 ' +
      'S 118 88, 68 80 ' +
      'S 12 58, 22 30 ' +
      'S 58 4, 108 8 ' +
      'C 128 12, 142 18, 152 22 ' +
      'C 162 20, 178 12, 196 8',
    strokeWidth: 1.85,
    color: '#6B7A9A',
    duration: 1.9,
    pathLength: [0, 0.7, 0.86, 0.86, 1],
    times: [0, 0.48, 0.7, 0.82, 1],
    ease: [
      [0.25, 0.1, 0.5, 1],
      [0.15, 0.65, 0.3, 1],
      'linear',
      [0.1, 0.5, 0.2, 1],
    ],
  },
}

/** 彩铅小圈：hand=a/b 两套走势，像两人分别批注 */
export function PencilRing({
  children,
  drawDelay = 0,
  drawDuration,
  hand = 'a',
  active = true,
  className = '',
}: PencilRingProps) {
  const reduceMotion = useReducedMotion()
  const style = hands[hand]
  const duration = drawDuration ?? style.duration

  return (
    <span
      className={`relative inline-block whitespace-nowrap px-[0.2em] ${className}`}
    >
      <span className="relative z-10">{children}</span>
      {active || reduceMotion ? (
        <svg
          className="pointer-events-none absolute -inset-x-1 -inset-y-[0.28em] z-0 h-[calc(100%+0.56em)] w-[calc(100%+0.5rem)] overflow-visible"
          style={{ color: style.color }}
          viewBox="0 0 180 88"
          preserveAspectRatio="none"
          aria-hidden
        >
          <motion.path
            d={style.path}
            fill="none"
            stroke="currentColor"
            strokeWidth={style.strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity={0.88}
            vectorEffect="non-scaling-stroke"
            initial={reduceMotion ? false : { pathLength: 0 }}
            animate={
              reduceMotion
                ? { pathLength: 1 }
                : { pathLength: style.pathLength }
            }
            transition={
              reduceMotion
                ? { duration: 0 }
                : {
                    duration,
                    delay: drawDelay,
                    times: style.times,
                    ease: style.ease,
                  }
            }
          />
        </svg>
      ) : null}
    </span>
  )
}
