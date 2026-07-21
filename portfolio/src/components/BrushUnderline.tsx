import { motion, useReducedMotion } from 'motion/react'

type BrushUnderlineProps = {
  children: React.ReactNode
  className?: string
}

/** 橘红笔刷下划线，用于 Hero 标题首词强调 */
export function BrushUnderline({ children, className = '' }: BrushUnderlineProps) {
  const reduceMotion = useReducedMotion()

  return (
    <span className={`relative inline-block ${className}`}>
      <span className="relative z-10">{children}</span>
      <svg
        className="pointer-events-none absolute -bottom-1 left-[-2%] h-[0.32em] w-[104%] text-accent"
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
          transition={{ duration: 0.75, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
        />
      </svg>
    </span>
  )
}
