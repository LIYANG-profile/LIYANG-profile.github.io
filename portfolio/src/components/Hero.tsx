import { useReducedMotion } from 'motion/react'
import { profile } from '../data/profile'
import { BrushUnderline } from './BrushUnderline'
import {
  CHAR_DELAY,
  INTRO_DELAY,
  LINE_GAP,
  TypeReveal,
  lineDoneAt,
} from './TypeReveal'

export function Hero() {
  const reduceMotion = useReducedMotion()

  const greeting = profile.greeting
  const headlineLead = profile.headlineLead
  const headlineTrail = profile.headlineTrail
  const tagline = profile.tagline[0]
  const headlineCharCount = headlineLead.length + 1 + headlineTrail.length

  const greetingStart = INTRO_DELAY
  const headlineStart = lineDoneAt(greetingStart, greeting.length) + LINE_GAP
  const taglineStart = lineDoneAt(headlineStart, headlineCharCount) + LINE_GAP
  /** 与标题最后约 2 字同步起笔，避免空笔画 */
  const brushDelay =
    headlineStart + Math.max(0, headlineCharCount - 2) * CHAR_DELAY

  return (
    <section
      id="top"
      className="relative"
      aria-labelledby="hero-heading"
    >
      <div className="relative mx-auto flex min-h-[min(56svh,520px)] max-w-[1400px] flex-col justify-center px-5 pt-12 pb-16 md:px-10 md:pt-16 md:pb-20 lg:px-14">
        <p className="text-[15px] text-ink/70 md:text-base">
          <TypeReveal
            segments={[{ text: greeting }]}
            startDelay={reduceMotion ? 0 : greetingStart}
          />
        </p>

        <h1
          id="hero-heading"
          className="font-hero mt-4 max-w-[18em] text-[clamp(2.4rem,6.5vw,5rem)] font-bold leading-[1.12] tracking-tight"
        >
          <BrushUnderline drawDelay={reduceMotion ? 0 : brushDelay}>
            <TypeReveal
              startDelay={reduceMotion ? 0 : headlineStart}
              segments={[
                { text: headlineLead },
                { text: '×', className: 'mx-2 font-medium text-muted' },
                { text: headlineTrail },
              ]}
            />
          </BrushUnderline>
        </h1>

        <p className="mt-5 max-w-[28rem] text-[15px] leading-relaxed text-ink/70 md:text-base">
          <TypeReveal
            segments={[{ text: tagline }]}
            startDelay={reduceMotion ? 0 : taglineStart}
          />
        </p>
      </div>
    </section>
  )
}
