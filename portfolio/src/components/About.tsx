import { useInView, useReducedMotion } from 'motion/react'
import { useRef } from 'react'
import { profile } from '../data/profile'
import { useLocale } from '../i18n/LocaleContext'
import { ui } from '../i18n/ui'
import { BrushUnderline } from './BrushUnderline'
import { PencilRing } from './PencilRing'
import { Reveal } from './Reveal'
import { TypeReveal, lineDoneAt } from './TypeReveal'

/** 关于区更快的逐字节奏 */
const ABOUT_CHAR_DELAY = 0.022
const ABOUT_CHAR_DURATION = 0.18
const ABOUT_LINE_GAP = 0.14

export function About() {
  const reduceMotion = useReducedMotion()
  const { locale, t } = useLocale()
  const bodyRef = useRef<HTMLDivElement>(null)
  // 正 margin 提前触发；避免负 % 在首屏边缘/快滚时漏检，导致正文长期 invisible
  const inView = useInView(bodyRef, { once: true, amount: 0.12, margin: '120px 0px' })
  const started = Boolean(reduceMotion) || inView

  const lead = t(profile.about.lead)
  const toolEdit = t(profile.about.toolEdit)
  const mid = t(profile.about.mid)
  const toolData = t(profile.about.toolData)
  const tail = t(profile.about.tail)
  const paraB = t(profile.about.more[0])
  const paraC = t(profile.about.more[1])

  const leadStart = 0.06
  const editStart = lineDoneAt(
    leadStart,
    lead.length,
    ABOUT_CHAR_DELAY,
    ABOUT_CHAR_DURATION,
  )
  const midStart = lineDoneAt(
    editStart,
    toolEdit.length,
    ABOUT_CHAR_DELAY,
    ABOUT_CHAR_DURATION,
  )
  const dataStart = lineDoneAt(
    midStart,
    mid.length,
    ABOUT_CHAR_DELAY,
    ABOUT_CHAR_DURATION,
  )
  const tailStart = lineDoneAt(
    dataStart,
    toolData.length,
    ABOUT_CHAR_DELAY,
    ABOUT_CHAR_DURATION,
  )
  const paraBStart =
    lineDoneAt(
      tailStart,
      tail.length,
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
              <BrushUnderline tone="olive">{t(ui.sections.about)}</BrushUnderline>
            </h2>
            <p className="font-label text-[11px] tracking-[0.28em] text-muted">
              {t(ui.sections.aboutLabel)}
            </p>
          </div>

          <div
            ref={bodyRef}
            className="relative mt-8 max-w-xl space-y-5 text-[15px] leading-[1.85] text-ink/80 md:text-base"
          >
            {/* locale key 仅重挂载文案，observer 挂在稳定父级上 */}
            <div key={locale}>
              {started ? (
                <>
                  <p>
                    <TypeReveal
                      segments={[{ text: lead }]}
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
                        segments={[{ text: toolEdit }]}
                        startDelay={reduceMotion ? 0 : editStart}
                        charDelay={ABOUT_CHAR_DELAY}
                        charDuration={ABOUT_CHAR_DURATION}
                      />
                    </PencilRing>
                    <TypeReveal
                      segments={[{ text: mid }]}
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
                        segments={[{ text: toolData }]}
                        startDelay={reduceMotion ? 0 : dataStart}
                        charDelay={ABOUT_CHAR_DELAY}
                        charDuration={ABOUT_CHAR_DURATION}
                      />
                    </PencilRing>
                    <TypeReveal
                      segments={[{ text: tail }]}
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
                    {lead}
                    <span className="whitespace-nowrap">{toolEdit}</span>
                    {mid}
                    <span className="whitespace-nowrap">{toolData}</span>
                    {tail}
                  </p>
                  <p>{paraB}</p>
                  <p>{paraC}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div id="contact" className="px-5 py-12 md:px-10 md:py-16 lg:px-14">
          <Reveal delay={0.06}>
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <h2 className="text-3xl font-black tracking-tight md:text-4xl">
                <BrushUnderline tone="sky">{t(ui.sections.contact)}</BrushUnderline>
              </h2>
              <p className="font-label text-[11px] tracking-[0.28em] text-muted">
                {t(ui.sections.contactLabel)}
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
