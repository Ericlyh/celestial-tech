'use client'

import { useRef } from 'react'
import { motion, useMotionValue } from 'framer-motion'
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react'
import { useTranslation } from '@/i18n'

const testimonials = [
  {
    quoteKey: 'testimonials_cFO' as const,
    nameKey: 'testimonials_cFO_name' as const,
    roleKey: 'testimonials_cFO_role' as const,
    company: 'Meridian Financial Group',
    rating: 5,
  },
  {
    quoteKey: 'testimonials_cto' as const,
    nameKey: 'testimonials_cto_name' as const,
    roleKey: 'testimonials_cto_role' as const,
    company: 'Nexus Dynamics',
    rating: 5,
  },
  {
    quoteKey: 'testimonials_ceo' as const,
    nameKey: 'testimonials_ceo_name' as const,
    roleKey: 'testimonials_ceo_role' as const,
    company: 'Horizon Health Systems',
    rating: 5,
  },
]

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: rating }).map((_, i) => (
        <Star
          key={i}
          className="w-4 h-4 fill-[#00F0FF] text-[#00F0FF] drop-shadow-[0_0_4px_rgba(0,240,255,0.5)]"
        />
      ))}
    </div>
  )
}

export default function Testimonials() {
  const { t } = useTranslation()
  const constraintsRef = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)

  const scrollBy = (direction: 'left' | 'right') => {
    const cardWidth = 380 + 32 // card width + gap
    const current = x.get()
    const target = direction === 'left' ? current + cardWidth : current - cardWidth
    x.set(Math.min(0, Math.max(target, -(testimonials.length - 1) * cardWidth)))
  }

  return (
    <section id="testimonials" className="relative py-24 px-6 md:px-12 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[#0A0A0A] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_#8B5CF608_0%,_transparent_60%)] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-[#00F0FF] text-sm font-medium tracking-widest uppercase mb-4">
            {t('testimonials_label')}
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {t('testimonials_title')}
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            {t('testimonials_subtitle')}
          </p>
        </motion.div>

        {/* Carousel navigation */}
        <div className="flex justify-end gap-2 mb-6">
          <button
            onClick={() => scrollBy('left')}
            className="p-2 rounded-full bg-white/[0.05] border border-white/10 text-white/60 hover:text-white hover:bg-white/10 transition-all"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => scrollBy('right')}
            className="p-2 rounded-full bg-white/[0.05] border border-white/10 text-white/60 hover:text-white hover:bg-white/10 transition-all"
            aria-label="Next testimonial"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Drag constraints */}
        <div ref={constraintsRef} className="overflow-hidden">
          <motion.div
            drag="x"
            dragConstraints={constraintsRef}
            dragElastic={0.05}
            style={{ x }}
            className="flex gap-8 cursor-grab active:cursor-grabbing select-none"
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="group relative flex-shrink-0 w-[360px] md:w-[400px] bg-white/[0.03] border border-white/[0.06] rounded-2xl p-8
                           hover:border-[#00F0FF]/30 transition-all duration-500 backdrop-blur-md"
              >
                {/* Quote icon */}
                <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                  <Quote className="w-10 h-10 text-[#00F0FF]" />
                </div>

                {/* Stars */}
                <div className="mb-6">
                  <StarRating rating={testimonial.rating} />
                </div>

                {/* Quote text */}
                <blockquote className="text-gray-300 leading-relaxed mb-8 relative">
                  <span className="text-[#00F0FF]/30 text-5xl font-serif absolute -top-2 -left-1">&ldquo;</span>
                  <p className="relative z-10 pl-4">
                    {t(testimonial.quoteKey)}
                  </p>
                </blockquote>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-6" />

                {/* Client info */}
                <div className="flex items-center gap-4">
                  {/* Avatar placeholder */}
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#00F0FF]/20 to-[#8B5CF6]/20
                                  border border-[#00F0FF]/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-semibold text-[#00F0FF]">
                      {t(testimonial.nameKey).split(' ').map((n) => n[0]).join('')}
                    </span>
                  </div>

                  <div>
                    <p className="text-white font-medium text-sm">{t(testimonial.nameKey)}</p>
                    <p className="text-[#8B5CF6] text-xs">{t(testimonial.roleKey)}</p>
                    <p className="text-gray-500 text-xs">{testimonial.company}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
