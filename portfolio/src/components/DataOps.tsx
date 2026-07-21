import { ChartBar, Table } from '@phosphor-icons/react'
import { dataOpsHighlights } from '../data/capabilities'
import { Reveal } from './Reveal'

export function DataOps() {
  return (
    <section id="data" aria-labelledby="data-heading">
      <div className="mx-auto max-w-[1400px] px-5 py-12 md:px-10 md:py-16 lg:px-14">
        <Reveal>
          <p className="font-label text-[11px] tracking-[0.28em] text-muted">
            DATA OPS
          </p>
          <h2
            id="data-heading"
            className="mt-3 text-3xl font-black tracking-tight md:text-4xl"
          >
            数据运营能力
          </h2>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-muted">
            不止剪辑交付：用 Excel / Power BI 把内容表现写成可行动的复盘叙事。以下为占位示意，待真实看板截图替换。
          </p>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 border-t border-line lg:mt-14 lg:grid-cols-[1.15fr_0.85fr]">
          <Reveal className="border-b border-line py-8 lg:border-b-0 lg:border-r lg:pr-10 lg:py-10">
            <div className="relative aspect-[16/10] overflow-hidden border border-line bg-[#f3f0ea]">
              <div className="absolute inset-0 grid grid-cols-12 grid-rows-6 opacity-35">
                {Array.from({ length: 72 }).map((_, index) => (
                  <div key={index} className="border border-line/70" />
                ))}
              </div>
              <div className="absolute inset-5 grid grid-cols-3 gap-3 md:inset-6">
                <div className="col-span-2 row-span-2 border border-ink/15 bg-paper/95 p-4">
                  <div className="mb-3 flex items-center gap-2 font-label text-[10px] tracking-[0.18em] text-muted">
                    <ChartBar size={14} />
                    WEEKLY REACH
                  </div>
                  <div className="flex h-24 items-end gap-2">
                    {[40, 65, 48, 80, 72, 90, 58].map((height, index) => (
                      <div
                        key={index}
                        className="flex-1 bg-accent/75"
                        style={{ height: `${height}%` }}
                      />
                    ))}
                  </div>
                </div>
                <div className="border border-ink/15 bg-paper/95 p-4">
                  <p className="font-label text-[10px] tracking-[0.16em] text-muted">
                    COMPLETION
                  </p>
                  <p className="mt-4 font-label text-3xl font-semibold">62%</p>
                </div>
                <div className="col-span-3 border border-ink/15 bg-paper/95 p-4">
                  <div className="mb-2 flex items-center gap-2 font-label text-[10px] tracking-[0.18em] text-muted">
                    <Table size={14} />
                    TOPIC MATRIX
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {['口播', '前瞻', '脚本', '复盘'].map((label) => (
                      <div
                        key={label}
                        className="border border-line px-2 py-3 text-center text-xs"
                      >
                        {label}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <p className="absolute bottom-3 right-3 bg-paper/90 px-2 py-1 font-label text-[9px] tracking-[0.14em] text-muted">
                PLACEHOLDER DASHBOARD
              </p>
            </div>
          </Reveal>

          <div className="flex flex-col divide-y divide-line lg:pl-10">
            {dataOpsHighlights.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.05}>
                <article className="py-7">
                  <p className="font-label text-[10px] tracking-[0.2em] text-muted">
                    {item.metric}
                  </p>
                  <h3 className="mt-2 text-lg font-bold tracking-tight">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/75">
                    {item.description}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
