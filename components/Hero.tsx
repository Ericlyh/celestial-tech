'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown, ArrowRight, Sparkles } from 'lucide-react'
import { useTranslation } from '@/i18n'
import { ScrambledText, GradientMesh, MagneticButton } from './Animations'

/* Floating orb decoration */
function Orb({ className, color }: { className: string; color: string }) {
  return (
    <div
      className={`absolute rounded-full blur-3xl opacity-20 ${className}`}
      style={{ background: color }}
    />
  )
}

export default function Hero() {
  const { t } = useTranslation()

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
      {/* ── Animated Gradient Mesh ── */}
      <GradientMesh />

      {/* ── Digital Grid Overlay ── */}
      <div className="hero-grid-overlay" />

      {/* ── Radial Depth Overlay ── */}
      <div className="hero-radial-overlay" />

      {/* ── Floating Orbs (decorative) ── */}
      <Orb
        className="w-[600px] h-[600px] -top-40 -left-40 max-md:hidden"
        color="rgba(139, 92, 246, 0.15)"
      />
      <Orb
        className="w-[500px] h-[500px] -bottom-40 -right-40 max-md:hidden"
        color="rgba(0, 240, 255, 0.12)"
      />

      {/* ── Subtle Shield SVG (decorative) ── */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ zIndex: 1 }}
      >
        <svg
          viewBox="0 0 400 400"
          className="w-[500px] h-[500px] opacity-[0.03] max-w-[80vw]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M200 360C200 360 340 300 340 180V90L200 40L60 90V180C60 300 200 360 200 360Z"
            stroke="url(#shieldGradHero)"
            strokeWidth="2"
            fill="none"
          />
          <defs>
            <linearGradient id="shieldGradHero" x1="60" y1="40" x2="340" y2="360">
              <stop offset="0%" stopColor="#00F0FF" />
              <stop offset="100%" stopColor="#8B5CF6" />
            </linearGradient>
          </defs>
          {Array.from({ length: 20 }, (_, i) => {
            const angle = (i / 20) * Math.PI * 2
            const r = 80 + ((i * 13) % 60)
            const cx = 200 + r * Math.cos(angle)
            const cy = 200 + r * Math.sin(angle)
            return <circle key={i} cx={cx} cy={cy} r="2" fill="rgba(0,240,255,0.5)" />
          })}
        </svg>
      </div>

      {/* ── Main Content ── */}
      <div className="relative container-main text-center z-10 px-4">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mb-6 sm:mb-8"
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
          className="heading-xl mb-4 sm:mb-6 max-w-5xl mx-auto leading-tight px-2"
        >
          <ScrambledText text={t('hero_headline')} className="inline" delay={300} />
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
          className="body-lg text-pure-white/60 max-w-3xl mx-auto mb-8 sm:mb-10 px-2"
        >
          {t('hero_subheadline')}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center"
        >
          <MagneticButton onClick={scrollToContact}>
            <button className="btn-cyber-cyan text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-3.5 flex items-center gap-2 w-full sm:w-auto justify-center">
              {t('hero_cta_protected')}
              <ArrowRight size={18} />
            </button>
          </MagneticButton>
          <MagneticButton onClick={scrollToServices}>
            <button className="btn-cyber-purple text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-3.5 flex items-center gap-2 w-full sm:w-auto justify-center">
              {t('hero_cta_ai')}
              <ArrowRight size={18} />
            </button>
          </MagneticButton>
        </motion.div>

        {/* Trust Signals */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease: 'easeOut' }}
          className="mt-12 sm:mt-16"
        >
          <p className="body-md text-pure-white/40 mb-4 sm:mb-5 tracking-widest uppercase text-xs">
            {t('hero_trust')}
          </p>
          <div className="flex flex-wrap gap-4 sm:gap-6 justify-center items-center opacity-30">
            {[t('hero_logo_fortune'), t('hero_logo_banks'), t('hero_logo_tech'), t('hero_logo_defense')].map((name) => (
              <span key={name} className="text-xs sm:text-sm font-semibold tracking-wider text-pure-white/50 uppercase">
                {name}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ── Scroll Indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 cursor-pointer"
        onClick={scrollToServices}
      >
        <span className="text-[10px] sm:text-xs text-pure-white/30 tracking-widest uppercase">{t('hero_scroll')}</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={18} className="text-cyber-cyan/60" />
        </motion.div>
      </motion.div>
    </section>
  )
}
