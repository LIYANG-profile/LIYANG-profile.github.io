import { profile } from '../data/profile'
import { Reveal } from './Reveal'

export function About() {
  return (
    <section id="about" className="border-t border-line" aria-labelledby="about-heading">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 lg:grid-cols-2">
        <Reveal className="border-b border-line px-5 py-12 md:px-10 md:py-16 lg:border-b-0 lg:border-r lg:px-14">
          <p className="font-label text-[11px] tracking-[0.28em] text-muted">
            ABOUT
          </p>
          <h2 id="about-heading" className="sr-only">
            关于我
          </h2>
          <div className="mt-8 max-w-xl space-y-5 text-[15px] leading-[1.85] text-ink/80 md:text-base">
            {profile.about.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </Reveal>

        <div id="contact" className="px-5 py-12 md:px-10 md:py-16 lg:px-14">
          <Reveal delay={0.06}>
            <p className="font-label text-[11px] tracking-[0.28em] text-muted">
              CONTACT
            </p>
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
