import { animate, useInView, useReducedMotion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'

type AnimatedCounterProps = {
  value: number
  suffix?: string
  className?: string
  /** 小数位；默认 0（整数）。百分比 KPI 传 1。 */
  decimals?: number
}

export function AnimatedCounter({
  value,
  suffix = '',
  className = '',
  decimals = 0,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-20% 0px' })
  const reduceMotion = useReducedMotion()
  const [display, setDisplay] = useState(reduceMotion ? value : 0)

  useEffect(() => {
    if (!inView) return
    if (reduceMotion) {
      setDisplay(value)
      return
    }

    const factor = 10 ** decimals
    const controls = animate(0, value, {
      duration: 1.2,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) =>
        setDisplay(Math.round(latest * factor) / factor),
    })

    return () => controls.stop()
  }, [decimals, inView, reduceMotion, value])

  const formatted =
    decimals > 0
      ? display.toFixed(decimals)
      : Math.round(display).toLocaleString('zh-CN')

  return (
    <span ref={ref} className={className}>
      {formatted}
      {suffix}
    </span>
  )
}
