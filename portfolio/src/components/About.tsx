import { useInView, useReducedMotion } from 'motion/react'
import { useRef } from 'react'
import { profile } from '../data/profile'
import { BrushUnderline } from './BrushUnderline'
import { PencilRing } from './PencilRing'
import { Reveal } from './Reveal'
import { TypeReveal, lineDoneAt } from './TypeReveal'

/** 关于区更快的逐字节奏 */
const ABOUT_CHAR_DELAY = 0.022
const ABOUT_CHAR_DURATION = 0.18
const ABOUT_LINE_GAP = 0.14

/** 首段拆成普通文案 + 两个关键词（英文不拆行） */
const ABOUT_LEAD = '国际贸易×计算机双重背景，擅长用'
const ABOUT_TOOL_EDIT = '剪映 / DaVinci'
const ABOUT_MID = ' 完成内容创作，再用 '
const ABOUT_TOOL_DATA = 'Excel / Python'
const ABOUT_TAIL = ' 分析数据，把数据表现变成后续选题和投放的依据。'

export function About() {
  const reduceMotion = useReducedMotion()
  const bodyRef = useRef<HTMLDivElement>(null)
  const inView = useInView(bodyRef, { once: true, margin: '-12% 0px' })
  const started = Boolean(reduceMotion) || inView

  const [, paraB, paraC] = profile.about

  const leadStart = 0.06
  const editStart = lineDoneAt(
    leadStart,
    ABOUT_LEAD.length,
    ABOUT_CHAR_DELAY,
    ABOUT_CHAR_DURATION,
  )
  const midStart = lineDoneAt(
    editStart,
    ABOUT_TOOL_EDIT.length,
    ABOUT_CHAR_DELAY,
    ABOUT_CHAR_DURATION,
  )
  const dataStart = lineDoneAt(
    midStart,
    ABOUT_MID.length,
    ABOUT_CHAR_DELAY,
    ABOUT_CHAR_DURATION,
  )
  const tailStart = lineDoneAt(
    dataStart,
    ABOUT_TOOL_DATA.length,
    ABOUT_CHAR_DELAY,
    ABOUT_CHAR_DURATION,
  )
  const paraBStart =
    lineDoneAt(
      tailStart,
      ABOUT_TAIL.length,
      ABOUT_CHAR_DELAY,
      ABOUT_CHAR_DURATION,
    ) + ABOUT_LINE_GAP
  const paraCStart =
    lineDoneAt(paraBStart, paraB.length, ABOUT_CHAR_DELAY, ABOUT_CHAR_DURATION) +
    ABOUT_LINE_GAP
  /** 全文显完后起笔；两圈稍错开，仍接近同时 */
  const allTextDone =
    lineDoneAt(paraCStart, paraC.length, ABOUT_CHAR_DELAY, ABOUT_CHAR_DURATION) +
    0.28
  const editRingDelay = allTextDone
  const dataRingDelay = allTextDone + 0.32

  return (
    <section
      id="about"
      className="flex flex-1 flex-col border-t border-line"
      aria-labelledby="about-heading"
    >
      <div className="relative mx-auto grid w-full max-w-[1400px] flex-1 grid-cols-1 lg:grid-cols-2">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-px -translate-x-1/2 bg-line lg:block"
        />
        <div className="border-b border-line px-5 py-12 md:px-10 md:py-16 lg:border-b-0 lg:px-14">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <h2
              id="about-heading"
              className="text-3xl font-black tracking-tight md:text-4xl"
            >
              <BrushUnderline tone="olive">关于</BrushUnderline>
            </h2>
            <p className="font-label text-[11px] tracking-[0.28em] text-muted">
              ABOUT
            </p>
          </div>

          <div
            ref={bodyRef}
            className="relative mt-8 max-w-xl space-y-5 text-[15px] leading-[1.85] text-ink/80 md:text-base"
          >
            {started ? (
              <>
                <p>
                  <TypeReveal
                    segments={[{ text: ABOUT_LEAD }]}
                    startDelay={reduceMotion ? 0 : leadStart}
                    charDelay={ABOUT_CHAR_DELAY}
                    charDuration={ABOUT_CHAR_DURATION}
                  />
                  <PencilRing
                    hand="a"
                    active={started}
                    drawDelay={reduceMotion ? 0 : editRingDelay}
                  >
                    <TypeReveal
                      segments={[{ text: ABOUT_TOOL_EDIT }]}
                      startDelay={reduceMotion ? 0 : editStart}
                      charDelay={ABOUT_CHAR_DELAY}
                      charDuration={ABOUT_CHAR_DURATION}
                    />
                  </PencilRing>
                  <TypeReveal
                    segments={[{ text: ABOUT_MID }]}
                    startDelay={reduceMotion ? 0 : midStart}
                    charDelay={ABOUT_CHAR_DELAY}
                    charDuration={ABOUT_CHAR_DURATION}
                  />
                  <PencilRing
                    hand="b"
                    active={started}
                    drawDelay={reduceMotion ? 0 : dataRingDelay}
                  >
                    <TypeReveal
                      segments={[{ text: ABOUT_TOOL_DATA }]}
                      startDelay={reduceMotion ? 0 : dataStart}
                      charDelay={ABOUT_CHAR_DELAY}
                      charDuration={ABOUT_CHAR_DURATION}
                    />
                  </PencilRing>
                  <TypeReveal
                    segments={[{ text: ABOUT_TAIL }]}
                    startDelay={reduceMotion ? 0 : tailStart}
                    charDelay={ABOUT_CHAR_DELAY}
                    charDuration={ABOUT_CHAR_DURATION}
                  />
                </p>
                <p>
                  <TypeReveal
                    segments={[{ text: paraB }]}
                    startDelay={reduceMotion ? 0 : paraBStart}
                    charDelay={ABOUT_CHAR_DELAY}
                    charDuration={ABOUT_CHAR_DURATION}
                  />
                </p>
                <p>
                  <TypeReveal
                    segments={[{ text: paraC }]}
                    startDelay={reduceMotion ? 0 : paraCStart}
                    charDelay={ABOUT_CHAR_DELAY}
                    charDuration={ABOUT_CHAR_DURATION}
                  />
                </p>
              </>
            ) : (
              <div className="invisible space-y-5" aria-hidden>
                <p>
                  {ABOUT_LEAD}
                  <span className="whitespace-nowrap">{ABOUT_TOOL_EDIT}</span>
                  {ABOUT_MID}
                  <span className="whitespace-nowrap">{ABOUT_TOOL_DATA}</span>
                  {ABOUT_TAIL}
                </p>
                <p>{paraB}</p>
                <p>{paraC}</p>
              </div>
            )}
          </div>
        </div>

        <div id="contact" className="px-5 py-12 md:px-10 md:py-16 lg:px-14">
          <Reveal delay={0.06}>
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <h2 className="text-3xl font-black tracking-tight md:text-4xl">
                <BrushUnderline tone="sky">联系</BrushUnderline>
              </h2>
              <p className="font-label text-[11px] tracking-[0.28em] text-muted">
                CONTACT
              </p>
            </div>
            <ul className="mt-10 space-y-6">
              <li>
                <a href={`mailto:${profile.email}`} className="group block">
                  <span className="font-label text-2xl font-semibold tracking-[0.12em] underline decoration-ink/25 underline-offset-8 transition-colors group-hover:text-accent group-hover:decoration-accent md:text-3xl">
                    EMAIL
                  </span>
                  <span className="mt-2 block text-sm text-muted">
                    {profile.email}
                  </span>
                </a>
              </li>
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
