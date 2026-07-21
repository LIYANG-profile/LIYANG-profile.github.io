import { capabilities } from '../data/capabilities'
import { Reveal } from './Reveal'

export function Capabilities() {
  return (
    <section id="capabilities" aria-labelledby="capabilities-heading">
      <div className="mx-auto max-w-[1400px] px-5 py-12 md:px-10 md:py-16 lg:px-14">
        <Reveal>
          <p className="font-label text-[11px] tracking-[0.28em] text-muted">
            CAPABILITIES
          </p>
          <h2
            id="capabilities-heading"
            className="mt-3 text-3xl font-black tracking-tight md:text-4xl"
          >
            三类能力
          </h2>
        </Reveal>

        <div className="mt-10 border-t border-line md:mt-14">
          {capabilities.map((capability, index) => (
            <Reveal key={capability.id} delay={index * 0.05}>
              <article className="grid grid-cols-1 gap-5 border-b border-line py-8 md:grid-cols-[5.5rem_minmax(10rem,0.9fr)_minmax(0,1.4fr)_minmax(8rem,0.7fr)] md:items-start md:gap-8 md:py-10 lg:gap-10">
                <p
                  className="font-label text-[clamp(2.75rem,5vw,4rem)] font-light leading-none tracking-tight text-transparent"
                  style={{
                    WebkitTextStroke: '1px color-mix(in srgb, var(--color-ink) 35%, transparent)',
                  }}
                  aria-hidden
                >
                  {capability.number}
                </p>

                <div>
                  <h3 className="text-xl font-bold tracking-tight md:text-[1.35rem]">
                    {capability.title}
                  </h3>
                  <p className="mt-2 font-label text-[10px] tracking-[0.22em] text-muted">
                    {capability.titleEn}
                  </p>
                </div>

                <p className="text-[15px] leading-relaxed text-ink/75">
                  {capability.description}
                </p>

                <p className="font-label text-[11px] leading-relaxed tracking-[0.06em] text-muted md:text-right">
                  {capability.tools.join('  ')}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
