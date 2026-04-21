/* =============================================
   STAR PARTICLE CANVAS — Enhanced
   Realistic stars with multi-layer shine
   Now includes shooting stars
   ============================================= */
'use client'

import { useEffect, useRef } from 'react'

interface Star {
  x: number
  y: number
  size: number
  baseOpacity: number
  twinkleSpeed: number
  twinkleOffset: number
  // Shine effect
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
  life: number // frames remaining
}

function useStarCanvas(canvasRef: React.RefObject<HTMLCanvasElement | null>, enabled: boolean = true) {
  const starsRef = useRef<Star[]>([])
  const shootingStarsRef = useRef<ShootingStar[]>([])
  const animFrameRef = useRef<number>(0)
  const lastShootingStarRef = useRef<number>(0)

  useEffect(() => {
    if (!enabled) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initStars()
    }

    const initStars = () => {
      const count = Math.floor((canvas.width * canvas.height) / 6000)
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
      if (Math.random() > 0.92) {
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
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      time += 1

      // Draw stars
      starsRef.current.forEach((star) => {
        const twinkle = Math.sin(time * star.twinkleSpeed + star.twinkleOffset)
        const pulse = Math.sin(time * star.twinkleSpeed * 0.7 + star.twinkleOffset)
        const alpha = star.baseOpacity * (0.4 + twinkle * 0.35 + pulse * 0.1)
        const glowAlpha = alpha * 0.3

        const x = star.x
        const y = star.y
        const size = star.size

        // Core star dot
        ctx.beginPath()
        ctx.arc(x, y, size, 0, Math.PI * 2)
        ctx.fillStyle = star.color.replace(')', `, ${alpha})`).replace('rgb', 'rgba').replace('#', 'rgba(')
        const hex = star.color
        const r = parseInt(hex.slice(1, 3), 16)
        const g = parseInt(hex.slice(3, 5), 16)
        const b = parseInt(hex.slice(5, 7), 16)
        ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`
        ctx.fill()

        // Inner glow
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, size * 3)
        gradient.addColorStop(0, `rgba(${r},${g},${b},${glowAlpha})`)
        gradient.addColorStop(1, `rgba(${r},${g},${b},0)`)
        ctx.beginPath()
        ctx.arc(x, y, size * 3, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()

        // Cross rays for brighter stars
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
      })

      // Draw + update shooting stars
      spawnShootingStar()
      shootingStarsRef.current = shootingStarsRef.current.filter((s) => s.life > 0)

      shootingStarsRef.current.forEach((s) => {
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

        // Head glow
        const headGradient = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, 4)
        headGradient.addColorStop(0, `rgba(255,255,255,${s.opacity})`)
        headGradient.addColorStop(1, `rgba(200,230,255,0)`)
        ctx.beginPath()
        ctx.arc(s.x, s.y, 3, 0, Math.PI * 2)
        ctx.fillStyle = headGradient
        ctx.fill()
      })

      animFrameRef.current = requestAnimationFrame(draw)
    }

    resize()
    draw()

    window.addEventListener('resize', resize)
    return () => {
      cancelAnimationFrame(animFrameRef.current)
      window.removeEventListener('resize', resize)
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
