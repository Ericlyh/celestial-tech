'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown, ArrowRight, Sparkles } from 'lucide-react'
import { useTranslation } from '@/i18n'
import { ScrambledText, GradientMesh, MagneticButton } from './Animations'

function Orb({ className, color }: { className: string; color: string }) {
  return (
    <div
      className={`absolute rounded-full blur-3xl opacity-30 ${className}`}
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
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-24 sm:pt-32"
    >
      {/* Atmospheric background */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-[0.05]"
        style={{ backgroundImage: "url('/bg-cyber-code.jpg')" }}
        aria-hidden="true"
      />
      <GradientMesh />
      <div className="hero-grid-overlay" aria-hidden="true" />

      {/* Floating orbs */}
      <Orb
        className="w-[700px] h-[700px] -top-40 -left-40 max-md:hidden"
        color="rgba(167, 139, 250, 0.18)"
      />
      <Orb
        className="w-[500px] h-[500px] -bottom-40 -right-40 max-md:hidden"
        color="rgba(94, 234, 212, 0.14)"
      />
      <Orb
        className="w-[300px] h-[300px] top-1/3 right-1/4 max-md:hidden"
        color="rgba(244, 184, 96, 0.10)"
      />

      {/* Concentric stellar rings — decorative */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ zIndex: 1 }}
        aria-hidden="true"
      >
        <div className="relative w-[600px] h-[600px] opacity-[0.08] max-w-[80vw]">
          {[140, 220, 300, 380, 460].map((size, i) => (
            <div
              key={size}
              className="absolute inset-0 m-auto rounded-full border border-stellar-cyan/40"
              style={{ width: size, height: size, top: `calc(50% - ${size / 2}px)`, left: `calc(50% - ${size / 2}px)` }}
            />
          ))}
          {/* Center dot */}
          <div className="absolute inset-0 m-auto w-2 h-2 rounded-full bg-stellar-cyan shadow-[0_0_20px_rgba(94,234,212,0.6)]" style={{ top: 'calc(50% - 4px)', left: 'calc(50% - 4px)' }} />
          {/* Orbital points */}
          {Array.from({ length: 6 }).map((_, i) => {
            const angle = (i / 6) * Math.PI * 2
            const r = 280
            const x = 300 + r * Math.cos(angle)
            const y = 300 + r * Math.sin(angle)
            return (
              <div
                key={i}
                className="absolute w-1.5 h-1.5 rounded-full bg-cosmic-violet shadow-[0_0_8px_rgba(167,139,250,0.6)]"
                style={{ left: x - 3, top: y - 3 }}
              />
            )
          })}
        </div>
      </div>

      {/* Main content */}
      <div className="relative container-main text-center z-10 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mb-6 sm:mb-8"
        >
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 text-[10px] font-mono uppercase tracking-[0.18em] rounded-full border border-stellar-cyan/30 text-stellar-cyan bg-stellar-cyan/5">
            <Sparkles size={12} />
            {t('hero_badge')}
          </span>
        </motion.div>

        {/* Headline — Fraunces serif, editorial weight */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
          className="font-display font-light text-5xl sm:text-6xl lg:text-7xl xl:text-8xl leading-[1.02] tracking-tight mb-6 sm:mb-8 max-w-5xl mx-auto px-2"
        >
          <ScrambledText
            text={t('hero_headline')}
            className="inline bg-gradient-to-br from-white via-white to-ink-200 bg-clip-text text-transparent"
            delay={300}
          />
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
          className="text-ink-200 text-lg sm:text-xl max-w-2xl mx-auto mb-10 sm:mb-12 px-2 leading-relaxed"
        >
          {t('hero_subheadline')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center"
        >
          <MagneticButton onClick={scrollToContact}>
            <button className="px-7 py-3.5 rounded-xl bg-stellar-cyan text-deep-space text-sm sm:text-base font-semibold flex items-center gap-2 w-full sm:w-auto justify-center hover:bg-stellar-cyan-soft transition-colors shadow-[0_0_24px_rgba(94,234,212,0.3)] hover:shadow-[0_0_36px_rgba(94,234,212,0.5)]">
              {t('hero_cta_protected')}
              <ArrowRight size={16} />
            </button>
          </MagneticButton>
          <MagneticButton onClick={scrollToServices}>
            <button className="px-7 py-3.5 rounded-xl bg-transparent text-cosmic-violet-soft text-sm sm:text-base font-semibold flex items-center gap-2 w-full sm:w-auto justify-center border border-cosmic-violet/40 hover:bg-cosmic-violet/10 transition-colors">
              {t('hero_cta_ai')}
              <ArrowRight size={16} />
            </button>
          </MagneticButton>
        </motion.div>

        {/* Trust signals */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease: 'easeOut' }}
          className="mt-16 sm:mt-20"
        >
          <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-ink-400 mb-5">
            {t('hero_trust')}
          </p>
          <div className="flex flex-wrap gap-x-8 gap-y-3 justify-center items-center">
            {[t('hero_logo_fortune'), t('hero_logo_banks'), t('hero_logo_tech'), t('hero_logo_defense')].map((name) => (
              <span key={name} className="text-xs font-mono uppercase tracking-[0.2em] text-ink-300/70">
                {name}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 cursor-pointer"
        onClick={scrollToServices}
      >
        <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-ink-400">{t('hero_scroll')}</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}>
          <ChevronDown size={16} className="text-stellar-cyan" />
        </motion.div>
      </motion.div>
    </section>
  )
}
