'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Lightbulb, Handshake, Trophy } from 'lucide-react'

const pillars = [
  {
    icon: Lightbulb,
    title: 'Innovation',
    description:
      'We don\'t follow the playbook — we rewrite it. Our team fuses bleeding-edge AI research with real-world security operations to build solutions that didn\'t exist yesterday.',
    color: 'cyan',
  },
  {
    icon: Handshake,
    title: 'Trust',
    description:
      'Security is a relationship built on confidence. From transparent threat briefings to zero-surprise contracts, we earn trust through consistency and radical accountability.',
    color: 'purple',
  },
  {
    icon: Trophy,
    title: 'Excellence',
    description:
      'We hold ourselves to the highest standards — not just industry benchmarks. Every engagement is executed with precision engineering, thorough testing, and meticulous documentation.',
    color: 'cyan',
  },
]

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: i * 0.15,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
}

function CelestialDecoration() {
  return (
    <div className="absolute -top-20 -right-20 w-80 h-80 pointer-events-none opacity-10">
      <svg viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Outer ring */}
        <circle cx="150" cy="150" r="140" stroke="url(#ringGrad)" strokeWidth="0.5" />
        {/* Middle ring */}
        <circle cx="150" cy="150" r="100" stroke="rgba(0,240,255,0.3)" strokeWidth="0.5" strokeDasharray="4 8" />
        {/* Inner ring */}
        <circle cx="150" cy="150" r="60" stroke="rgba(139,92,246,0.3)" strokeWidth="0.5" />
        {/* Center dot */}
        <circle cx="150" cy="150" r="4" fill="rgba(0,240,255,0.6)" />
        {/* Orbiting dots */}
        {[0, 60, 120, 180, 240, 300].map((angle, i) => {
          const rad = (angle * Math.PI) / 180
          const x = 150 + 100 * Math.cos(rad)
          const y = 150 + 100 * Math.sin(rad)
          return <circle key={i} cx={x} cy={y} r="2" fill="rgba(0,240,255,0.4)" />
        })}
        <defs>
          <linearGradient id="ringGrad" x1="10" y1="10" x2="290" y2="290">
            <stop offset="0%" stopColor="#00F0FF" />
            <stop offset="100%" stopColor="#8B5CF6" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="about"
      className="relative section-pad overflow-hidden"
    >
      {/* Background subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-deep-space via-deep-space/95 to-deep-space pointer-events-none" />

      {/* Decorative celestial element */}
      <CelestialDecoration />

      <div className="relative container-main" ref={ref}>
        {/* Section Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-4"
        >
          <span className="text-sm font-semibold tracking-widest uppercase text-cyber-purple/70">
            Why Celestial Tech
          </span>
        </motion.div>

        {/* Section Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="heading-lg mb-6 max-w-3xl"
        >
          We protect the organizations that shape the{' '}
          <span className="text-gradient-mixed">future of humanity.</span>
        </motion.h2>

        {/* Story Paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="body-lg text-pure-white/60 max-w-3xl mb-16"
        >
          Founded by a team of veteran security engineers and AI researchers, Celestial
          Tech was built on a single conviction: the best defense isn&apos;t just
          human — it&apos;s intelligent. We combine deep offensive security expertise
          with cutting-edge machine learning to create adaptive, autonomous defense
          systems that stay ahead of even the most sophisticated adversaries.
        </motion.p>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="divider-cyber mb-16 origin-left"
        />

        {/* Pillar Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon
            const isCyan = pillar.color === 'cyan'
            return (
              <motion.div
                key={pillar.title}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
                className="glass-card p-8 relative group"
              >
                {/* Icon */}
                <div
                  className={`inline-flex items-center justify-center w-12 h-12 rounded-xl mb-6 transition-all duration-300 ${
                    isCyan
                      ? 'bg-cyber-cyan/10 text-cyber-cyan group-hover:bg-cyber-cyan/20'
                      : 'bg-cyber-purple/10 text-cyber-purple group-hover:bg-cyber-purple/20'
                  }`}
                >
                  <Icon size={22} strokeWidth={1.5} />
                </div>

                {/* Title */}
                <h3
                  className={`heading-sm mb-3 ${
                    isCyan ? 'text-gradient-cyan' : 'text-gradient-purple'
                  }`}
                >
                  {pillar.title}
                </h3>

                {/* Description */}
                <p className="body-md text-pure-white/60 leading-relaxed">
                  {pillar.description}
                </p>

                {/* Hover glow line at bottom */}
                <div
                  className={`absolute bottom-0 left-0 right-0 h-0.5 rounded-b-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                    isCyan ? 'bg-gradient-to-r from-transparent via-cyber-cyan/50 to-transparent' : 'bg-gradient-to-r from-transparent via-cyber-purple/50 to-transparent'
                  }`}
                />
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
