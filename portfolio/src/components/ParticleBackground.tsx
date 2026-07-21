import { useEffect, useRef } from 'react'
// p5 约占 1MB，运行时用动态 import 加载，避免拖慢首屏；此处仅引入类型
import type p5 from 'p5'

/** Default seed — change to explore variations; same seed always renders identically. */
export const PARTICLE_BACKGROUND_DEFAULT_SEED = 42821

const PALETTE = {
  paper: [250, 248, 244] as const,
  accent: [232, 68, 46] as const,
  muted: [138, 138, 132] as const,
} as const

const PAPER_RGB = `${PALETTE.paper[0]}, ${PALETTE.paper[1]}, ${PALETTE.paper[2]}`

/** Kokonut-style edge vignette — radial + vertical fades to paper for center text clarity. */
const VIGNETTE = {
  radial: `radial-gradient(ellipse 68% 62% at 50% 48%, transparent 22%, rgba(${PAPER_RGB}, 0.9) 100%)`,
  edgeFadeHeight: '10rem',
} as const

const MOUSE = {
  lerp: 0.14,
  radius: 280,
  /** Max blend toward cursor-driven flow (0–1). */
  strength: 0.9,
  /** Direct radial push per frame so motion reads near the cursor. */
  pushSpeed: 1.35,
  offscreen: -9999,
} as const

type ParticleTone = 'accent' | 'muted' | 'whisper'

type ParticleParams = {
  seed: number
  particleCount: number
  flowScale: number
  driftSpeed: number
}

type ParticleBackgroundProps = {
  seed?: number
  className?: string
}

type MouseField = {
  targetX: number
  targetY: number
  smoothX: number
  smoothY: number
}

function lerpAngle(from: number, to: number, amount: number) {
  let delta = to - from
  const twoPi = Math.PI * 2
  while (delta > Math.PI) delta -= twoPi
  while (delta < -Math.PI) delta += twoPi
  return from + delta * amount
}

function vignetteAlphaFactor(x: number, y: number, width: number, height: number) {
  const centerRadius = Math.min(width, height) * 0.42
  const dx = x - width / 2
  const dy = (y - height / 2) * 1.08
  const dist = Math.hypot(dx, dy)
  if (dist >= centerRadius) return 1
  return 0.38 + (dist / centerRadius) * 0.62
}

class Particle {
  x: number
  y: number
  size: number
  tone: ParticleTone
  alpha: number
  noiseOffset: number

  constructor(sketch: p5, width: number, height: number) {
    this.x = sketch.random(width)
    this.y = sketch.random(height)
    this.size = sketch.random(2.0, 5.5)
    const roll = sketch.random()
    if (roll < 0.14) {
      this.tone = 'accent'
    } else if (roll < 0.5) {
      this.tone = 'muted'
    } else {
      this.tone = 'whisper'
    }
    this.alpha = sketch.random(0.045, 0.155)
    this.noiseOffset = sketch.random(1000)
  }

  update(
    sketch: p5,
    width: number,
    height: number,
    flowScale: number,
    driftSpeed: number,
    animate: boolean,
    mouse: MouseField,
  ) {
    if (!animate) return

    let angle =
      sketch.noise(
        this.x * flowScale,
        this.y * flowScale,
        sketch.frameCount * 0.0032 + this.noiseOffset,
      ) *
      sketch.TWO_PI *
      2

    const dx = this.x - mouse.smoothX
    const dy = this.y - mouse.smoothY
    const dist = Math.hypot(dx, dy)

    if (dist < MOUSE.radius && dist > 0.5) {
      const falloff = (1 - dist / MOUSE.radius) ** 1.6
      const influence = falloff * MOUSE.strength
      const tangentAngle = Math.atan2(dy, dx) + Math.PI / 2
      const pushAngle = Math.atan2(dy, dx)

      angle = lerpAngle(angle, tangentAngle, influence * 0.85)
      angle = lerpAngle(angle, pushAngle, influence * 0.35)

      const push = influence * MOUSE.pushSpeed
      this.x += (dx / dist) * push
      this.y += (dy / dist) * push
    }

    this.x += sketch.cos(angle) * driftSpeed
    this.y += sketch.sin(angle) * driftSpeed

    if (this.x < -6) this.x = width + 6
    if (this.x > width + 6) this.x = -6
    if (this.y < -6) this.y = height + 6
    if (this.y > height + 6) this.y = -6
  }

  display(sketch: p5, width: number, height: number) {
    const rgb =
      this.tone === 'accent'
        ? PALETTE.accent
        : this.tone === 'muted'
          ? PALETTE.muted
          : ([
              Math.round(PALETTE.accent[0] * 0.55 + PALETTE.paper[0] * 0.45),
              Math.round(PALETTE.accent[1] * 0.55 + PALETTE.paper[1] * 0.45),
              Math.round(PALETTE.accent[2] * 0.55 + PALETTE.paper[2] * 0.45),
            ] as const)

    const vignette = vignetteAlphaFactor(this.x, this.y, width, height)

    sketch.noStroke()
    sketch.fill(rgb[0], rgb[1], rgb[2], this.alpha * vignette * 255)
    sketch.circle(this.x, this.y, this.size)
  }
}

function initializeSeed(sketch: p5, seed: number) {
  sketch.randomSeed(seed)
  sketch.noiseSeed(seed)
}

function createParticles(sketch: p5, width: number, height: number, count: number) {
  return Array.from({ length: count }, () => new Particle(sketch, width, height))
}

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function ParticleBackground({
  seed = PARTICLE_BACKGROUND_DEFAULT_SEED,
  className = '',
}: ParticleBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const p5InstanceRef = useRef<p5 | null>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const params: ParticleParams = {
      seed,
      particleCount: 96,
      flowScale: 0.0016,
      driftSpeed: 0.4,
    }

    let particles: Particle[] = []
    let animate = !prefersReducedMotion()

    const mouse: MouseField = {
      targetX: MOUSE.offscreen,
      targetY: MOUSE.offscreen,
      smoothX: MOUSE.offscreen,
      smoothY: MOUSE.offscreen,
    }

    const syncMouseTarget = (clientX: number, clientY: number) => {
      // Canvas is viewport-sized fixed at (0,0) — use client coords directly.
      mouse.targetX = clientX
      mouse.targetY = clientY
    }

    const handleMouseMove = (event: MouseEvent) => {
      if (!animate) return
      syncMouseTarget(event.clientX, event.clientY)
    }

    const handleMouseLeave = () => {
      mouse.targetX = MOUSE.offscreen
      mouse.targetY = MOUSE.offscreen
    }

    const addMouseListeners = () => {
      document.addEventListener('mousemove', handleMouseMove, { passive: true })
      document.addEventListener('mouseleave', handleMouseLeave)
    }

    const removeMouseListeners = () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }

    if (animate) addMouseListeners()

    const sketch = (p: p5) => {
      p.setup = () => {
        const width = window.innerWidth
        const height = window.innerHeight
        const canvas = p.createCanvas(width, height)
        canvas.parent(container)
        canvas.elt.style.display = 'block'

        initializeSeed(p, params.seed)
        particles = createParticles(p, width, height, params.particleCount)

        if (!animate) {
          p.background(...PALETTE.paper)
          particles.forEach((particle) => particle.display(p, width, height))
          p.noLoop()
        }
      }

      p.draw = () => {
        p.fill(PALETTE.paper[0], PALETTE.paper[1], PALETTE.paper[2], 22)
        p.noStroke()
        p.rect(0, 0, p.width, p.height)

        mouse.smoothX = p.lerp(mouse.smoothX, mouse.targetX, MOUSE.lerp)
        mouse.smoothY = p.lerp(mouse.smoothY, mouse.targetY, MOUSE.lerp)

        for (const particle of particles) {
          particle.update(
            p,
            p.width,
            p.height,
            params.flowScale,
            params.driftSpeed,
            animate,
            mouse,
          )
          particle.display(p, p.width, p.height)
        }
      }

      p.windowResized = () => {
        const width = window.innerWidth
        const height = window.innerHeight
        if (width === 0 || height === 0) return

        // 移动端地址栏收起/弹出只改变高度；此时仅调整画布，不重建粒子，避免背景闪跳
        const widthChanged = width !== p.width
        p.resizeCanvas(width, height)

        if (widthChanged) {
          initializeSeed(p, params.seed)
          particles = createParticles(p, width, height, params.particleCount)
        }

        if (!animate) {
          p.background(...PALETTE.paper)
          particles.forEach((particle) => particle.display(p, width, height))
          p.noLoop()
        }
      }
    }

    let disposed = false
    let P5Constructor: typeof p5 | null = null

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handleMotionChange = (event: MediaQueryListEvent) => {
      animate = !event.matches
      if (animate) {
        addMouseListeners()
      } else {
        removeMouseListeners()
        mouse.targetX = MOUSE.offscreen
        mouse.targetY = MOUSE.offscreen
        mouse.smoothX = MOUSE.offscreen
        mouse.smoothY = MOUSE.offscreen
      }
      if (!P5Constructor) return
      p5InstanceRef.current?.remove()
      p5InstanceRef.current = new P5Constructor(sketch)
    }

    motionQuery.addEventListener('change', handleMotionChange)

    void import('p5').then(({ default: P5 }) => {
      if (disposed) return
      P5Constructor = P5
      p5InstanceRef.current = new P5(sketch)
    })

    return () => {
      disposed = true
      removeMouseListeners()
      motionQuery.removeEventListener('change', handleMotionChange)
      p5InstanceRef.current?.remove()
      p5InstanceRef.current = null
    }
  }, [seed])

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-0 overflow-hidden ${className}`.trim()}
      aria-hidden="true"
      style={{ backgroundColor: `rgb(${PAPER_RGB})` }}
    >
      <div ref={containerRef} className="absolute inset-0" />
      <div
        className="absolute inset-0"
        style={{ background: VIGNETTE.radial }}
      />
      <div
        className="absolute inset-x-0 top-0"
        style={{
          height: VIGNETTE.edgeFadeHeight,
          background: `linear-gradient(to bottom, rgb(${PAPER_RGB}), transparent)`,
        }}
      />
      <div
        className="absolute inset-x-0 bottom-0"
        style={{
          height: VIGNETTE.edgeFadeHeight,
          background: `linear-gradient(to top, rgb(${PAPER_RGB}), transparent)`,
        }}
      />
    </div>
  )
}
