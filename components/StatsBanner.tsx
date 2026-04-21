'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { useTranslation } from '@/i18n'
import { CounterValue } from './Animations'

const stats = [
  { target: 78, suffix: '%', label: 'Faster Detection', labelZh: '威脅檢測提速' },
  { target: 99, suffix: '.99%', label: 'Uptime SLA', labelZh: '正常運行時間' },
  { target: 10, suffix: 'M+', label: 'Predictions/Day', labelZh: '每日預測量' },
  { target: 200, prefix: '$', suffix: 'M+', label: 'Loss Prevented', labelZh: '損失已防止' },
]

export default function StatsBanner() {
  const { t } = useTranslation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyber-cyan/5 via-cyber-purple/5 to-cyber-cyan/5 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#00F0FF08_0%,_transparent_60%)] pointer-events-none" />

      <div ref={ref} className="relative max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.12, duration: 0.6, ease: 'easeOut' }}
              className="text-center group"
            >
              {/* Number */}
              <div className="text-4xl lg:text-5xl font-bold tracking-tight mb-2 bg-gradient-to-r from-cyber-cyan to-cyber-purple bg-clip-text text-transparent">
                <CounterValue target={stat.target} suffix={stat.suffix} prefix={stat.prefix} duration={2} />
              </div>
              {/* Label */}
              <div className="text-xs lg:text-sm text-white/40 tracking-widest uppercase">
                <span className="hidden lg:inline">{stat.label}</span>
                <span className="lg:hidden">{stat.labelZh}</span>
              </div>
              {/* Divider line */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : {}}
                transition={{ delay: i * 0.12 + 0.3, duration: 0.6 }}
                className="mt-3 mx-auto h-px bg-gradient-to-r from-transparent via-cyber-cyan/40 to-transparent origin-center"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
