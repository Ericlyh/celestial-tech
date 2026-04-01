'use client'

import { motion } from 'framer-motion'
import { Search, FileCode, Rocket, LineChart, MessageSquare, Shield } from 'lucide-react'
import { useTranslation } from '@/i18n'

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
}

const steps = [
  {
    icon: Search,
    titleKey: 'how_step1_title' as const,
    descKey: 'how_step1_desc' as const,
    num: '01',
  },
  {
    icon: FileCode,
    titleKey: 'how_step2_title' as const,
    descKey: 'how_step2_desc' as const,
    num: '02',
  },
  {
    icon: Rocket,
    titleKey: 'how_step3_title' as const,
    descKey: 'how_step3_desc' as const,
    num: '03',
  },
  {
    icon: LineChart,
    titleKey: 'how_step4_title' as const,
    descKey: 'how_step4_desc' as const,
    num: '04',
  },
]

export default function HowItWorks() {
  const { t } = useTranslation()

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyber-purple/10 text-cyber-purple text-sm font-medium mb-6 border border-cyber-purple/20">
            <span className="w-2 h-2 rounded-full bg-cyber-purple animate-pulse" />
            {t('how_label' as any)}
          </div>
          <h2 className="heading-lg text-pure-white mb-4">
            {t('how_title' as any)}
          </h2>
          <p className="body-lg text-pure-white/50 max-w-2xl mx-auto">
            {t('how_subtitle' as any)}
          </p>
        </motion.div>

        {/* Steps grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {steps.map((step) => {
            const Icon = step.icon
            return (
              <motion.div
                key={step.num}
                variants={itemVariants}
                className="relative glass-card p-8 hover:border-cyber-purple/30 transition-all duration-300 group"
              >
                {/* Step number */}
                <div className="text-6xl font-black text-cyber-purple/10 absolute top-4 right-6 select-none">
                  {step.num}
                </div>

                {/* Icon */}
                <div className="w-14 h-14 rounded-2xl bg-cyber-purple/10 flex items-center justify-center mb-6 border border-cyber-purple/20 group-hover:bg-cyber-purple/20 transition-colors">
                  <Icon className="w-7 h-7 text-cyber-purple" />
                </div>

                {/* Content */}
                <h3 className="text-lg font-bold text-pure-white mb-3">
                  {t(step.titleKey)}
                </h3>
                <p className="text-sm text-pure-white/50 leading-relaxed">
                  {t(step.descKey)}
                </p>

                {/* Connector line (hidden on last column and mobile) */}
                <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 w-6 h-px bg-gradient-to-r from-cyber-purple/40 to-transparent" />
              </motion.div>
            )
          })}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-12"
        >
          <a href="#contact" className="btn-cyber-purple inline-flex items-center gap-2">
            <MessageSquare size={18} />
            {t('how_cta' as any)}
          </a>
        </motion.div>
      </div>
    </section>
  )
}
