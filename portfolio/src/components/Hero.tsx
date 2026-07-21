import { profile } from '../data/profile'

export function Hero() {
  return (
    <section
      id="top"
      className="relative border-b border-line"
      aria-labelledby="hero-heading"
    >
      <div className="relative mx-auto flex min-h-[min(56svh,520px)] max-w-[1400px] flex-col justify-center px-5 py-12 md:px-10 md:py-16 lg:px-14">
        <p className="text-[15px] text-ink/70 md:text-base">
          {profile.greeting}
        </p>

        <h1
          id="hero-heading"
          className="mt-4 max-w-[18em] text-[clamp(2.4rem,6.5vw,5rem)] font-black leading-[1.08] tracking-tight"
        >
          {profile.headlineLead}
          <span className="mx-2 font-medium text-muted">×</span>
          {profile.headlineTrail}
        </h1>

        <p className="mt-5 max-w-[28rem] text-[15px] leading-relaxed text-ink/70 md:text-base">
          {profile.tagline[0]}
        </p>
      </div>
    </section>
  )
}
