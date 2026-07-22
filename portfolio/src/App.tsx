import { About } from './components/About'
import { Capabilities } from './components/Capabilities'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { Nav } from './components/Nav'
import { ParticleBackground } from './components/ParticleBackground'
import { WorksMarquee } from './components/WorksMarquee'

export default function App() {
  return (
    <div className="relative min-h-svh text-ink">
      <ParticleBackground />
      <div className="relative z-10 flex min-h-svh flex-col">
        <Nav />
        <main className="flex flex-1 flex-col">
          <Hero />
          <WorksMarquee />
          <Capabilities />
          <About />
        </main>
        <Footer />
      </div>
    </div>
  )
}
