'use client';

import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    quote:
      'Celestial Tech didn\'t just secure our infrastructure — they transformed our entire security culture. Our board now has confidence in our data protection posture we never had before.',
    name: 'Sarah Mitchell',
    role: 'Chief Information Security Officer',
    company: 'Meridian Capital Group',
    rating: 5,
  },
  {
    quote:
      'The depth of their threat intelligence is unmatched. When we faced a sophisticated social engineering campaign, Celestial identified and neutralized it in under 2 hours. That level of speed saves real businesses.',
    name: 'David Park',
    role: 'VP of Engineering',
    company: 'Nexus Cloud Solutions',
    rating: 5,
  },
  {
    quote:
      'I\'ve worked with five security vendors over my career. Celestial is the first one I\'d genuinely recommend without hesitation. They feel like an extension of our team, not a third-party vendor.',
    name: 'Priya Ramanathan',
    role: 'Head of Technology',
    company: 'Aurora Health Systems',
    rating: 5,
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

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
  );
}

export default function Testimonials() {
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
          className="text-center mb-16"
        >
          <p className="text-[#00F0FF] text-sm font-medium tracking-widest uppercase mb-4">
            Client Voices
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            What Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] to-[#8B5CF6]">Clients Say</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Don&apos;t take our word for it — hear from the leaders who trust us with their most critical security challenges.
          </p>
        </motion.div>

        {/* Testimonial cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="group relative bg-white/[0.03] border border-white/[0.06] rounded-2xl p-8
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
                  {testimonial.quote}
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
                    {testimonial.name.split(' ').map((n) => n[0]).join('')}
                  </span>
                </div>

                <div>
                  <p className="text-white font-medium text-sm">{testimonial.name}</p>
                  <p className="text-[#8B5CF6] text-xs">{testimonial.role}</p>
                  <p className="text-gray-500 text-xs">{testimonial.company}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Trust bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-500 text-sm mb-4">Trusted by security teams at</p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-40">
            {['Meridian Capital', 'Nexus Cloud', 'Aurora Health', 'Quantum Systems', 'Atlas Retail'].map(
              (company) => (
                <span key={company} className="text-white font-medium tracking-wide">
                  {company}
                </span>
              )
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
