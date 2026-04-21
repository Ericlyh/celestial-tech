'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion'
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
  const trackRef = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const [cardWidth, setCardWidth] = useState(432) // card + gap
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const [isDragging, setIsDragging] = useState(false)

  // Responsive card width
  useEffect(() => {
    const updateWidth = () => {
      if (typeof window === 'undefined') return
      const isMd = window.innerWidth >= 768
      const isLg = window.innerWidth >= 1024
      setCardWidth(isLg ? 432 : isMd ? 420 : 356)
    }
    updateWidth()
    window.addEventListener('resize', updateWidth)
    return () => window.removeEventListener('resize', updateWidth)
  }, [])

  // Button visibility state
  const updateButtons = (currentX: number) => {
    const maxScroll = -(testimonials.length - 1) * cardWidth
    setCanScrollLeft(currentX < -4)
    setCanScrollRight(currentX > maxScroll + 4)
  }

  const scrollBy = (direction: 'left' | 'right') => {
    const current = x.get()
    const maxScroll = -(testimonials.length - 1) * cardWidth
    const target = direction === 'left'
      ? Math.min(0, current + cardWidth)
      : Math.max(maxScroll, current - cardWidth)
    x.set(target)
    updateButtons(target)
  }

  // Sync button state on x change
  useEffect(() => {
    const unsub = x.on('change', (val) => updateButtons(val))
    return unsub
  }, [cardWidth])

  return (
    <section id="testimonials" className="relative py-20 sm:py-24 px-4 sm:px-6 md:px-12 overflow-hidden">
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
          className="text-center mb-10 sm:mb-12"
        >
          <p className="text-[#00F0FF] text-xs sm:text-sm font-medium tracking-widest uppercase mb-3 sm:mb-4">
            {t('testimonials_label')}
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6">
            {t('testimonials_title')}
          </h2>
          <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto px-2">
            {t('testimonials_subtitle')}
          </p>
        </motion.div>

        {/* Carousel navigation */}
        <div className="flex justify-end gap-2 mb-6">
          <button
            onClick={() => !isDragging && canScrollLeft && scrollBy('left')}
            className={`p-2 rounded-full border transition-all duration-200 ${
              canScrollLeft
                ? 'bg-white/[0.05] border-white/10 text-white/60 hover:text-white hover:bg-white/10 cursor-pointer'
                : 'bg-white/[0.02] border-white/5 text-white/20 cursor-not-allowed'
            }`}
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => !isDragging && canScrollRight && scrollBy('right')}
            className={`p-2 rounded-full border transition-all duration-200 ${
              canScrollRight
                ? 'bg-white/[0.05] border-white/10 text-white/60 hover:text-white hover:bg-white/10 cursor-pointer'
                : 'bg-white/[0.02] border-white/5 text-white/20 cursor-not-allowed'
            }`}
            aria-label="Next testimonial"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Drag track */}
        <div className="overflow-hidden" ref={trackRef}>
          <motion.div
            drag="x"
            dragConstraints={{ left: -(testimonials.length - 1) * cardWidth, right: 0 }}
            dragElastic={0.08}
            dragMomentum={true}
            dragTransition={{ bounceStiffness: 150, bounceDamping: 18 }}
            style={{ x }}
            className="flex gap-6 sm:gap-8 cursor-grab active:cursor-grabbing select-none"
            onDragStart={() => setIsDragging(true)}
            onDragEnd={() => setIsDragging(false)}
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="group relative flex-shrink-0 w-[320px] sm:w-[360px] md:w-[400px]
                           bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 sm:p-8
                           hover:border-[#00F0FF]/30 transition-all duration-500 backdrop-blur-md"
              >
                {/* Quote icon */}
                <div className="absolute top-5 sm:top-6 right-5 sm:right-6 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                  <Quote className="w-8 sm:w-10 h-8 sm:h-10 text-[#00F0FF]" />
                </div>

                {/* Stars */}
                <div className="mb-5 sm:mb-6">
                  <StarRating rating={testimonial.rating} />
                </div>

                {/* Quote text */}
                <blockquote className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6 sm:mb-8 relative">
                  <span className="text-[#00F0FF]/30 text-4xl sm:text-5xl font-serif absolute -top-1 sm:-top-2 -left-0.5">&ldquo;</span>
                  <p className="relative z-10 pl-4 sm:pl-5">
                    {t(testimonial.quoteKey)}
                  </p>
                </blockquote>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-5 sm:mb-6" />

                {/* Client info */}
                <div className="flex items-center gap-3 sm:gap-4">
                  {/* Avatar */}
                  <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-gradient-to-br from-[#00F0FF]/20 to-[#8B5CF6]/20
                                  border border-[#00F0FF]/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs sm:text-sm font-semibold text-[#00F0FF]">
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

        {/* Dot indicators */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, i) => {
            const dotX = -i * cardWidth
            const isActive = Math.abs(x.get() - dotX) < cardWidth / 2
            return (
              <button
                key={i}
                onClick={() => {
                  const target = -i * cardWidth
                  x.set(target)
                  updateButtons(target)
                }}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  isActive ? 'w-6 bg-[#00F0FF]' : 'w-1.5 bg-white/20'
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            )
          })}
        </div>
      </div>
    </section>
  )
}
