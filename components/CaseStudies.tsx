'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Landmark } from 'lucide-react'
import { useTranslation } from '@/i18n'

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: 'easeOut' },
  },
}

export default function CaseStudies() {
  const { t } = useTranslation()

  const caseStudies = [
    {
      titleKey: 'cases_finance_title' as const,
      industryKey: 'cases_finance_industry' as const,
      descKey: 'cases_finance_desc' as const,
      metricsKey: 'cases_finance_metrics' as const,
      link: '#',
    },
    {
      titleKey: 'cases_healthcare_title' as const,
      industryKey: 'cases_healthcare_industry' as const,
      descKey: 'cases_healthcare_desc' as const,
      metricsKey: 'cases_healthcare_metrics' as const,
      link: '#',
    },
    {
      titleKey: 'cases_tech_title' as const,
      industryKey: 'cases_tech_industry' as const,
      descKey: 'cases_tech_desc' as const,
      metricsKey: 'cases_tech_metrics' as const,
      link: '#',
    },
  ]

  return (
    <section id="case-studies" className="relative py-24 px-6 md:px-12 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[#0A0A0A] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#8B5CF610_0%,_transparent_70%)] pointer-events-none" />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            'linear-gradient(#00F0FF 1px, transparent 1px), linear-gradient(90deg, #00F0FF 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-[#8B5CF6] text-sm font-medium tracking-widest uppercase mb-4">
            {t('cases_label')}
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {t('cases_title')}
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            {t('cases_subtitle')}
          </p>
        </motion.div>

        {/* Case study cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {caseStudies.map((study) => (
            <motion.article
              key={study.titleKey}
              variants={cardVariants}
              className="group relative bg-white/[0.03] border border-white/[0.08] rounded-2xl overflow-hidden
                         hover:border-[#8B5CF6]/50 transition-all duration-500"
            >
              {/* Top accent line */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#8B5CF6]/50 to-transparent
                              opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Corner accents */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#8B5CF6]/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative p-8">
                {/* Industry tag */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-[#8B5CF6]/15 border border-[#8B5CF6]/30 flex items-center justify-center">
                    <Landmark className="w-5 h-5 text-[#8B5CF6]" />
                  </div>
                  <span className="text-sm text-[#8B5CF6] font-medium tracking-wide">
                    {t(study.industryKey)}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-[#00F0FF] transition-colors duration-300">
                  {t(study.titleKey)}
                </h3>

                {/* Description */}
                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                  {t(study.descKey)}
                </p>

                {/* Metrics */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {t(study.metricsKey as any).split(',').map((metric: string) => (
                    <span
                      key={metric}
                      className="text-xs text-[#00F0FF] bg-[#00F0FF]/10 border border-[#00F0FF]/20
                                 px-3 py-1 rounded-full"
                    >
                      {metric.trim()}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <a
                  href={study.link}
                  className="inline-flex items-center gap-2 text-sm font-medium text-[#8B5CF6]
                             hover:text-[#00F0FF] transition-colors duration-300 group/link"
                >
                  {t('cases_view')}
                  <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform duration-300" />
                </a>
              </div>

              {/* Bottom glow on hover */}
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00F0FF]/30 to-transparent" />
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
