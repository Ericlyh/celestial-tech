'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown, ArrowRight, Sparkles } from 'lucide-react'
import { useTranslation } from '@/i18n'

/* =============================================
   STAR PARTICLE CANVAS
   ============================================= */
interface Star {
  x: number
  y: number
  size: number
  opacity: number
  twinkleSpeed: number
  twinkleOffset: number
}

function useStarCanvas(canvasRef: React.RefObject<HTMLCanvasElement>) {
  const starsRef = useRef<Star[]>([])
  const animFrameRef = useRef<number>(0)

  useEffect(() => {
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
      const count = Math.floor((canvas.width * canvas.height) / 8000)
      starsRef.current = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.5 + 0.3,
        opacity: Math.random() * 0.6 + 0.2,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        twinkleOffset: Math.random() * Math.PI * 2,
      }))
    }

    let time = 0
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      time += 1

      starsRef.current.forEach((star) => {
        const twinkle = Math.sin(time * star.twinkleSpeed + star.twinkleOffset)
        const alpha = star.opacity * (0.5 + twinkle * 0.5)

        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(200, 220, 255, ${alpha})`
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
  }, [canvasRef])
}

/* =============================================
   FLOATING ORB SHAPES (decorative)
   ============================================= */
function Orb({ className, color }: { className: string; color: string }) {
  return (
    <div
      className={`absolute rounded-full blur-3xl opacity-20 ${className}`}
      style={{ background: color }}
    />
  )
}

/* =============================================
   HERO COMPONENT
   ============================================= */
export default function Hero() {
  const { t } = useTranslation()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useStarCanvas(canvasRef)

  const scrollToServices = () => {
    document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' })
  }

  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* ── Canvas Star Background ── */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ zIndex: 0 }}
      />

      {/* ── Digital Grid Overlay ── */}
      <div className="hero-grid-overlay" />

      {/* ── Radial Depth Overlay ── */}
      <div className="hero-radial-overlay" />

      {/* ── Floating Orbs ── */}
      <Orb
        className="w-[600px] h-[600px] -top-40 -left-40"
        color="rgba(139, 92, 246, 0.15)"
      />
      <Orb
        className="w-[500px] h-[500px] -bottom-40 -right-40"
        color="rgba(0, 240, 255, 0.12)"
      />

      {/* ── Shield / Neural Overlay (subtle SVG) ── */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ zIndex: 1 }}
      >
        <svg
          viewBox="0 0 400 400"
          className="w-[600px] h-[600px] opacity-[0.03]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M200 360C200 360 340 300 340 180V90L200 40L60 90V180C60 300 200 360 200 360Z"
            stroke="url(#shieldGrad)"
            strokeWidth="2"
            fill="none"
          />
          <defs>
            <linearGradient id="shieldGrad" x1="60" y1="40" x2="340" y2="360">
              <stop offset="0%" stopColor="#00F0FF" />
              <stop offset="100%" stopColor="#8B5CF6" />
            </linearGradient>
          </defs>
          {/* Neural network dots */}
          {Array.from({ length: 20 }, (_, i) => {
            const angle = (i / 20) * Math.PI * 2
            const r = 80 + Math.random() * 60
            const cx = 200 + r * Math.cos(angle)
            const cy = 200 + r * Math.sin(angle)
            return (
              <circle key={i} cx={cx} cy={cy} r="2" fill="rgba(0,240,255,0.5)" />
            )
          })}
        </svg>
      </div>

      {/* ── Main Content ── */}
      <div
        className="relative container-main text-center z-10 px-4"
        style={{ zIndex: 10 }}
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mb-8"
        >
          <span className="pillar-badge-cyan">
            <Sparkles size={14} />
            {t('hero_badge')}
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
          className="heading-xl mb-6 max-w-5xl mx-auto"
        >
          {t('hero_headline')}
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
          className="body-lg text-pure-white/60 max-w-3xl mx-auto mb-10"
        >
          {t('hero_subheadline')}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <button onClick={scrollToContact} className="btn-cyber-cyan text-base px-8 py-3.5">
            {t('hero_cta_protected')}
            <ArrowRight size={18} />
          </button>
          <button onClick={scrollToServices} className="btn-cyber-purple text-base px-8 py-3.5">
            {t('hero_cta_ai')}
            <ArrowRight size={18} />
          </button>
        </motion.div>

        {/* Trust Signals */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease: 'easeOut' }}
          className="mt-16"
        >
          <p className="body-md text-pure-white/40 mb-5 tracking-widest uppercase text-xs">
            {t('hero_trust')}
          </p>
          <div className="flex flex-wrap gap-6 justify-center items-center opacity-30">
            {/* Placeholder trust logos — replace with real SVGs */}
            {[t('hero_logo_fortune'), t('hero_logo_banks'), t('hero_logo_tech'), t('hero_logo_defense')].map((name) => (
              <span key={name} className="text-sm font-semibold tracking-wider text-pure-white/50 uppercase">
                {name}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ── Scroll-Down Indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 cursor-pointer"
        onClick={scrollToServices}
      >
        <span className="text-xs text-pure-white/30 tracking-widest uppercase">{t('hero_scroll')}</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={20} className="text-cyber-cyan/60" />
        </motion.div>
      </motion.div>
    </section>
  )
}
