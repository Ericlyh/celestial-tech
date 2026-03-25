'use client'

import { motion } from 'framer-motion'
import { Linkedin, Twitter, Github, Target, Rocket, Heart } from 'lucide-react'
import { useTranslation } from '@/i18n'

export default function Founder() {
  const { t } = useTranslation()

  return (
    <section id="founder" className="relative py-24 px-6 md:px-12 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-[#0d0d14] to-[#0A0A0A] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_#00F0FF08_0%,_transparent_60%)] pointer-events-none" />

      <div className="relative max-w-5xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-[#00F0FF] text-sm font-medium tracking-widest uppercase mb-4">
            {t('founder_label')}
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            {t('founder_greeting')}
          </h2>
        </motion.div>

        {/* Founder card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="relative bg-white/[0.03] border border-white/[0.08] rounded-3xl p-8 md:p-12
                     backdrop-blur-md overflow-hidden"
        >
          {/* Subtle grid overlay */}
          <div
            className="absolute inset-0 opacity-[0.015]"
            style={{
              backgroundImage:
                'linear-gradient(#00F0FF 1px, transparent 1px), linear-gradient(90deg, #00F0FF 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          />

          {/* Corner accents */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-[#00F0FF]/10 to-transparent rounded-br-full" />
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-[#8B5CF6]/10 to-transparent rounded-tl-full" />

          <div className="relative flex flex-col md:flex-row gap-10 items-start">
            {/* Photo placeholder */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex-shrink-0"
            >
              <div className="relative">
                {/* Glow ring */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#00F0FF] to-[#8B5CF6] opacity-30 blur-md" />
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#00F0FF] to-[#8B5CF6] opacity-20 blur-xl" />

                {/* Photo */}
                <div className="relative w-40 h-40 rounded-full bg-gradient-to-br from-[#00F0FF]/20 to-[#8B5CF6]/20
                                border-2 border-[#00F0FF]/30 flex items-center justify-center
                                shadow-[0_0_40px_rgba(0,240,255,0.15)]">
                  <span className="text-5xl font-bold text-transparent bg-clip-text
                                   bg-gradient-to-br from-[#00F0FF] to-[#8B5CF6]">
                    CF
                  </span>
                </div>

                {/* Decorative ring */}
                <div className="absolute -inset-4 rounded-full border border-[#00F0FF]/10" />
              </div>
            </motion.div>

            {/* Content */}
            <div className="flex-1">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-white mb-1">{t('founder_name')}</h3>
                <p className="text-[#00F0FF] font-medium">Founder & CEO, Celestial Tech</p>
              </div>

              <div className="space-y-4 text-gray-300 leading-relaxed mb-8">
                <p>{t('founder_p1')}</p>
                <p>{t('founder_p2')}</p>
                <p>{t('founder_p3')}</p>
                <p>{t('founder_p4')}</p>
              </div>

              {/* CTA */}
              <a
                href="#contact"
                className="inline-flex items-center gap-2 text-sm font-medium text-[#00F0FF] hover:text-white transition-colors duration-300 mb-8"
              >
                {t('founder_cta')}
              </a>

              {/* Social links */}
              <div className="flex gap-4">
                {[
                  { icon: Linkedin, href: '#', label: 'LinkedIn' },
                  { icon: Twitter, href: '#', label: 'Twitter' },
                  { icon: Github, href: '#', label: 'GitHub' },
                ].map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="w-10 h-10 rounded-lg bg-white/[0.05] border border-white/[0.1]
                               flex items-center justify-center text-gray-400
                               hover:text-[#00F0FF] hover:border-[#00F0FF]/30 hover:bg-[#00F0FF]/5
                               transition-all duration-300"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
