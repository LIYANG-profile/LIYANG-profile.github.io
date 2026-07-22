import { CaretDown } from '@phosphor-icons/react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useState, type ReactNode } from 'react'
import { capabilities } from '../data/capabilities'
import { BrushUnderline } from './BrushUnderline'
import { DataReviewPanel } from './DataReviewPanel'
import { Reveal } from './Reveal'

export function Capabilities() {
  const [dataReviewOpen, setDataReviewOpen] = useState(false)
  const reduceMotion = useReducedMotion()

  return (
    <section id="capabilities" aria-labelledby="capabilities-heading">
      <div className="mx-auto max-w-[1400px] px-5 pt-4 pb-12 md:px-10 md:pt-6 md:pb-16 lg:px-14">
        <Reveal>
          <div className="flex flex-wrap items-baseline justify-between gap-3 pb-2">
            <h2
              id="capabilities-heading"
              className="text-3xl font-black tracking-tight md:text-4xl"
            >
              <BrushUnderline>技能</BrushUnderline>
            </h2>
            <p className="font-label text-[11px] tracking-[0.28em] text-muted">
              CAPABILITIES
            </p>
          </div>
        </Reveal>

        <div className="mt-2">
          {capabilities.map((capability, index) => {
            const isDataReview = capability.id === 'data-review'
            const showDivider = index < capabilities.length - 1

            return (
              <Reveal key={capability.id} delay={index * 0.05}>
                <article
                  className={`py-10 md:py-12 ${showDivider ? 'border-b border-line' : ''} ${
                    isDataReview && dataReviewOpen ? 'md:pb-14' : ''
                  }`}
                >
                  {isDataReview ? (
                    <button
                      type="button"
                      aria-expanded={dataReviewOpen}
                      aria-controls="data-review-panel"
                      onClick={() => setDataReviewOpen((open) => !open)}
                      className="group grid w-full grid-cols-1 gap-6 text-left transition-colors hover:text-ink md:grid-cols-[4.5rem_minmax(0,1fr)] md:gap-x-10 md:gap-y-4 lg:grid-cols-[5.5rem_minmax(12rem,0.85fr)_minmax(0,1.35fr)] lg:gap-x-12"
                    >
                      <CapabilitySummary
                        number={capability.number}
                        title={capability.title}
                        tools={capability.tools}
                        description={capability.description}
                        trailing={
                          <span className="mt-5 inline-flex items-center gap-2 border border-accent px-3.5 py-2 font-label text-[12px] font-semibold tracking-[0.16em] text-accent transition-colors group-hover:bg-accent group-hover:text-paper">
                            {dataReviewOpen ? '收起案例' : '展开案例'}
                            <CaretDown
                              size={16}
                              weight="bold"
                              className={`transition-transform duration-300 ${
                                dataReviewOpen ? 'rotate-180' : ''
                              }`}
                            />
                          </span>
                        }
                      />
                    </button>
                  ) : (
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-[4.5rem_minmax(0,1fr)] md:gap-x-10 md:gap-y-4 lg:grid-cols-[5.5rem_minmax(12rem,0.85fr)_minmax(0,1.35fr)] lg:gap-x-12">
                      <CapabilitySummary
                        number={capability.number}
                        title={capability.title}
                        tools={capability.tools}
                        description={capability.description}
                      />
                    </div>
                  )}

                  {isDataReview ? (
                    <AnimatePresence initial={false}>
                      {dataReviewOpen ? (
                        <motion.div
                          id="data-review-panel"
                          key="data-review-panel"
                          initial={
                            reduceMotion
                              ? false
                              : { height: 0, opacity: 0 }
                          }
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={
                            reduceMotion
                              ? undefined
                              : { height: 0, opacity: 0 }
                          }
                          transition={{
                            duration: reduceMotion ? 0 : 0.45,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          className="overflow-hidden"
                        >
                          <DataReviewPanel active={dataReviewOpen} />
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  ) : null}
                </article>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function CapabilitySummary({
  number,
  title,
  tools,
  description,
  trailing,
}: {
  number: string
  title: string
  tools: string[]
  description: string
  trailing?: ReactNode
}) {
  return (
    <>
      <p
        className="font-label text-[clamp(2.5rem,4.5vw,3.75rem)] font-light leading-none tracking-tight text-transparent md:pt-1"
        style={{
          WebkitTextStroke:
            '1px color-mix(in srgb, var(--color-ink) 28%, transparent)',
        }}
        aria-hidden
      >
        {number}
      </p>

      <div className="min-w-0">
        <h3 className="text-xl font-bold tracking-tight md:text-[1.4rem]">
          {title}
        </h3>
        <p className="mt-5 font-label text-[11px] tracking-[0.08em] text-ink/55">
          {tools.join('  /  ')}
        </p>
        {trailing}
      </div>

      <p className="max-w-xl text-base leading-[1.85] text-ink/75 md:col-start-2 md:text-[17px] lg:col-start-3 lg:max-w-none lg:pt-1">
        {description}
      </p>
    </>
  )
}
