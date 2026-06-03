/* =============================================
   STAR PARTICLE CANVAS — Performance-tuned
   Realistic stars with multi-layer shine
   Includes shooting stars
   ============================================= */
'use client'

import { useEffect, useRef, useState } from 'react'

interface Star {
  x: number
  y: number
  size: number
  baseOpacity: number
  twinkleSpeed: number
  twinkleOffset: number
  rayLength: number
  rayAngle: number
  color: string
}

interface ShootingStar {
  x: number
  y: number
  length: number
  speed: number
  angle: number
  opacity: number
  life: number
}

/**
 * Check if the user has prefers-reduced-motion enabled.
 * When enabled, we render a single static frame and skip animation.
 */
const prefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false
  return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
}

/**
 * Check if the device is low-power (small screens, slow CPUs, or
 * mobile). When true we render fewer stars and throttle FPS.
 */
const isLowPower = (): boolean => {
  if (typeof window === 'undefined') return false
  if (window.innerWidth < 768) return true
  // deviceMemory is non-standard but a useful signal
  const dm = (navigator as any).deviceMemory
  if (typeof dm === 'number' && dm < 4) return true
  return false
}

function useStarCanvas(
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  enabled: boolean = true
) {
  const starsRef = useRef<Star[]>([])
  const shootingStarsRef = useRef<ShootingStar[]>([])
  const animFrameRef = useRef<number>(0)
  const lastShootingStarRef = useRef<number>(0)
  const lastFrameTimeRef = useRef<number>(0)
  // Skip rendering when the canvas is scrolled out of view
  const visibleRef = useRef<boolean>(true)
  // Hold the FPS throttle target
  const fpsTargetRef = useRef<number>(60)

  useEffect(() => {
    if (!enabled) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    const reduced = prefersReducedMotion()
    const lowPower = isLowPower()
    // Cap FPS at 30 on low-power devices to free the main thread
    fpsTargetRef.current = reduced ? 0 : lowPower ? 30 : 60

    // Reduce particle count on low-power
    const starDensityDivisor = lowPower ? 12000 : 6000

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initStars()
    }

    const initStars = () => {
      const count = Math.floor((canvas.width * canvas.height) / starDensityDivisor)
      starsRef.current = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2.2 + 0.4,
        baseOpacity: Math.random() * 0.7 + 0.2,
        twinkleSpeed: Math.random() * 0.025 + 0.008,
        twinkleOffset: Math.random() * Math.PI * 2,
        rayLength: Math.random() * 0.6 + 0.2,
        rayAngle: Math.random() * Math.PI * 2,
        color: Math.random() > 0.7 ? '#8BB8FF' : Math.random() > 0.5 ? '#FFFFFF' : '#C8DCFF',
      }))
    }

    const spawnShootingStar = () => {
      // Reduced frequency to halve the number of new objects
      if (Math.random() > 0.96) {
        shootingStarsRef.current.push({
          x: Math.random() * canvas.width * 1.2,
          y: Math.random() * canvas.height * 0.5,
          length: Math.random() * 120 + 60,
          speed: Math.random() * 8 + 6,
          angle: Math.PI / 4 + (Math.random() * 0.3 - 0.15),
          opacity: 1,
          life: Math.floor(Math.random() * 40 + 20),
        })
      }
    }

    let time = 0

    const draw = (now: number) => {
      // Skip frame if not visible (canvas scrolled off-screen or tab hidden)
      if (document.hidden || !visibleRef.current) {
        animFrameRef.current = requestAnimationFrame(draw)
        return
      }

      // FPS throttle for low-power devices
      const target = fpsTargetRef.current
      if (target > 0) {
        const minDelta = 1000 / target
        if (now - lastFrameTimeRef.current < minDelta) {
          animFrameRef.current = requestAnimationFrame(draw)
          return
        }
      }
      lastFrameTimeRef.current = now

      ctx.clearRect(0, 0, canvas.width, canvas.height)
      time += 1

      // Draw stars
      const stars = starsRef.current
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i]
        const twinkle = Math.sin(time * star.twinkleSpeed + star.twinkleOffset)
        const pulse = Math.sin(time * star.twinkleSpeed * 0.7 + star.twinkleOffset)
        const alpha = star.baseOpacity * (0.4 + twinkle * 0.35 + pulse * 0.1)
        const glowAlpha = alpha * 0.3

        const x = star.x
        const y = star.y
        const size = star.size
        const r = parseInt(star.color.slice(1, 3), 16)
        const g = parseInt(star.color.slice(3, 5), 16)
        const b = parseInt(star.color.slice(5, 7), 16)

        // Core star dot
        ctx.beginPath()
        ctx.arc(x, y, size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`
        ctx.fill()

        // Cross rays only for the brightest stars (saves draw calls)
        if (star.size > 1.4 && alpha > 0.5) {
          ctx.strokeStyle = `rgba(${r},${g},${b},${alpha * 0.4})`
          ctx.lineWidth = 0.5
          const rayLen = star.rayLength * star.size * 6
          ctx.beginPath()
          ctx.moveTo(x - rayLen, y)
          ctx.lineTo(x + rayLen, y)
          ctx.moveTo(x, y - rayLen)
          ctx.lineTo(x, y + rayLen)
          ctx.stroke()
        }
      }

      // Draw + update shooting stars
      spawnShootingStar()
      const activeShooting: ShootingStar[] = []
      for (let i = 0; i < shootingStarsRef.current.length; i++) {
        const s = shootingStarsRef.current[i]
        if (s.life > 0) activeShooting.push(s)
      }
      shootingStarsRef.current = activeShooting

      for (let i = 0; i < activeShooting.length; i++) {
        const s = activeShooting[i]
        s.x += Math.cos(s.angle) * s.speed
        s.y += Math.sin(s.angle) * s.speed
        s.life -= 1
        s.opacity = s.life / 60

        const endX = s.x - Math.cos(s.angle) * s.length
        const endY = s.y - Math.sin(s.angle) * s.length

        const gradient = ctx.createLinearGradient(s.x, s.y, endX, endY)
        gradient.addColorStop(0, `rgba(200, 230, 255, ${s.opacity})`)
        gradient.addColorStop(0.4, `rgba(139, 184, 255, ${s.opacity * 0.6})`)
        gradient.addColorStop(1, 'rgba(139, 184, 255, 0)')

        ctx.beginPath()
        ctx.moveTo(s.x, s.y)
        ctx.lineTo(endX, endY)
        ctx.strokeStyle = gradient
        ctx.lineWidth = 1.5
        ctx.stroke()
      }

      animFrameRef.current = requestAnimationFrame(draw)
    }

    // Watch visibility: pause the rAF loop when the canvas is scrolled out
    // of view or when the tab is in the background. This is the single
    // biggest perf win — most of the page time the canvas is irrelevant.
    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting
      },
      { threshold: 0 }
    )
    visibilityObserver.observe(canvas)

    const onVisibilityChange = () => {
      // document.hidden handled inline in draw()
    }
    document.addEventListener('visibilitychange', onVisibilityChange)

    resize()

    // Static fallback for reduced-motion users: render one frame and stop
    if (reduced) {
      draw(performance.now())
      // Still need to handle resize
      window.addEventListener('resize', resize)
      return () => {
        cancelAnimationFrame(animFrameRef.current)
        window.removeEventListener('resize', resize)
        visibilityObserver.disconnect()
        document.removeEventListener('visibilitychange', onVisibilityChange)
      }
    }

    animFrameRef.current = requestAnimationFrame(draw)
    window.addEventListener('resize', resize)

    return () => {
      cancelAnimationFrame(animFrameRef.current)
      window.removeEventListener('resize', resize)
      visibilityObserver.disconnect()
      document.removeEventListener('visibilitychange', onVisibilityChange)
    }
  }, [canvasRef, enabled])
}

/* ── Hero Star Canvas ── */
export function HeroStarCanvas({ canvasRef }: { canvasRef: React.RefObject<HTMLCanvasElement | null> }) {
  useStarCanvas(canvasRef, true)
  return null
}

/* ── Global Star Canvas (renders on ALL pages) ── */
export function GlobalStarCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useStarCanvas(canvasRef, true)

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-[1]"
      aria-hidden="true"
    />
  )
}

export { useStarCanvas }
