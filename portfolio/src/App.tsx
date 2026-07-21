import { About } from './components/About'
import { Capabilities } from './components/Capabilities'
import { DataOps } from './components/DataOps'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { Nav } from './components/Nav'
import { ParticleBackground } from './components/ParticleBackground'
import { WorksMarquee } from './components/WorksMarquee'
import { SHOW_DATA_OPS } from './data/site'

export default function App() {
  return (
    <div className="relative min-h-svh text-ink">
      <ParticleBackground />
      <div className="relative z-10">
        <Nav />
        <main>
          <Hero />
          <WorksMarquee />
          <Capabilities />
          {SHOW_DATA_OPS ? <DataOps /> : null}
          <About />
        </main>
        <Footer />
      </div>
    </div>
  )
}