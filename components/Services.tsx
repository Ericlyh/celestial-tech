'use client'

import { motion } from 'framer-motion'
import {
  Shield,
  Eye,
  Target,
  UserCheck,
  GraduationCap,
  BrainCircuit,
  Lightbulb,
  Cpu,
  Layers,
  Sparkles,
} from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from '@/i18n'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: 'easeOut' },
  }),
}

export default function Services() {
  const { t } = useTranslation()
  const [activeTab, setActiveTab] = useState<'cyber' | 'ai'>('cyber')

  const cyberServices = [
    {
      icon: Shield,
      titleKey: 'services_cyber_consulting' as const,
      descKey: 'services_cyber_consulting_desc' as const,
    },
    {
      icon: Eye,
      titleKey: 'services_soc' as const,
      descKey: 'services_soc_desc' as const,
    },
    {
      icon: Target,
      titleKey: 'services_pentest' as const,
      descKey: 'services_pentest_desc' as const,
    },
    {
      icon: UserCheck,
      titleKey: 'services_personal' as const,
      descKey: 'services_personal_desc' as const,
    },
    {
      icon: GraduationCap,
      titleKey: 'services_training' as const,
      descKey: 'services_training_desc' as const,
    },
    {
      icon: BrainCircuit,
      titleKey: 'services_purple' as const,
      descKey: 'services_purple_desc' as const,
    },
  ]

  const aiServices = [
    {
      icon: Lightbulb,
      titleKey: 'services_ai_strategy' as const,
      descKey: 'services_ai_strategy_desc' as const,
    },
    {
      icon: Cpu,
      titleKey: 'services_ai_custom' as const,
      descKey: 'services_ai_custom_desc' as const,
    },
    {
      icon: Layers,
      titleKey: 'services_ai_deploy' as const,
      descKey: 'services_ai_deploy_desc' as const,
    },
    {
      icon: Sparkles,
      titleKey: 'services_ai_train' as const,
      descKey: 'services_ai_train_desc' as const,
    },
  ]

  const activeServices = activeTab === 'cyber' ? cyberServices : aiServices

  return (
    <section id="services" className="relative py-32 px-6 overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-deep-space via-[#0d0d1a] to-deep-space pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-cyber-cyan/5 rounded-full blur-[100px] pointer-events-none" />
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-[0.06]"
        style={{ backgroundImage: "url('/bg-data.jpg')" }}
      />

      <div className="relative max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.p
            custom={0}
            variants={fadeUp}
            className="text-cyber-cyan font-mono text-sm tracking-widest uppercase mb-4"
          >
            {t('services_label')}
          </motion.p>
          <motion.h2
            custom={1}
            variants={fadeUp}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            {t('services_title')}
          </motion.h2>
          <motion.p
            custom={2}
            variants={fadeUp}
            className="text-white/60 max-w-2xl mx-auto text-lg"
          >
            {t('services_subtitle')}
          </motion.p>
        </motion.div>

        {/* Tab toggle */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={3}
          variants={fadeUp}
          className="flex justify-center mb-12"
        >
          <div className="inline-flex bg-white/[0.05] backdrop-blur-md rounded-xl p-1 border border-white/10">
            <button
              onClick={() => setActiveTab('cyber')}
              className={`px-8 py-3 rounded-lg font-medium text-sm transition-all duration-300 ${
                activeTab === 'cyber'
                  ? 'bg-cyber-cyan/20 text-cyber-cyan shadow-[0_0_20px_rgba(0,240,255,0.2)]'
                  : 'text-white/50 hover:text-white'
              }`}
            >
              🛡️ {t('services_cyber')}
            </button>
            <button
              onClick={() => setActiveTab('ai')}
              className={`px-8 py-3 rounded-lg font-medium text-sm transition-all duration-300 ${
                activeTab === 'ai'
                  ? 'bg-cyber-purple/20 text-cyber-purple shadow-[0_0_20px_rgba(139,92,246,0.2)]'
                  : 'text-white/50 hover:text-white'
              }`}
            >
              🤖 {t('services_ai')}
            </button>
          </div>
        </motion.div>

        {/* Services grid */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {activeServices.map((service, i) => (
            <motion.div
              key={service.titleKey}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="group relative bg-white/[0.03] backdrop-blur-md rounded-2xl p-6 border border-white/[0.06] hover:border-cyber-cyan/30 transition-all duration-500 hover:shadow-[0_0_30px_rgba(0,240,255,0.05)]"
            >
              {/* Glow on hover */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyber-cyan/0 via-cyber-purple/0 to-cyber-cyan/0 group-hover:from-cyber-cyan/5 group-hover:via-cyber-purple/5 group-hover:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div className="relative">
                <div className="flex items-center gap-4 mb-4">
                  <div className={`p-3 rounded-xl ${
                    activeTab === 'cyber'
                      ? 'bg-cyber-cyan/10 text-cyber-cyan group-hover:bg-cyber-cyan/20'
                      : 'bg-cyber-purple/10 text-cyber-purple group-hover:bg-cyber-purple/20'
                  } transition-colors duration-300`}>
                    <service.icon className="w-6 h-6" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-cyber-cyan/90 transition-colors">
                  {t(service.titleKey)}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed">
                  {t(service.descKey)}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Synergy highlight */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={10}
          variants={fadeUp}
          className="mt-16 relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-cyber-cyan/5 via-cyber-purple/5 to-cyber-cyan/5 rounded-3xl blur-xl pointer-events-none" />
          <div className="relative bg-white/[0.03] backdrop-blur-md rounded-3xl p-8 md:p-10 border border-white/[0.08] text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyber-cyan/10 text-cyber-cyan text-xs font-mono tracking-wider mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-cyber-cyan animate-pulse" />
              {t('services_synergy_label')}
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              {t('services_synergy_title')}
            </h3>
            <p className="text-white/55 max-w-2xl mx-auto text-base leading-relaxed">
              {t('services_synergy_desc')}
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <span className="px-4 py-1.5 rounded-full bg-white/[0.05] border border-white/10 text-white/60 text-sm">
                🤖 {t('services_synergy_1')}
              </span>
              <span className="px-4 py-1.5 rounded-full bg-white/[0.05] border border-white/10 text-white/60 text-sm">
                🛡️ {t('services_synergy_2')}
              </span>
              <span className="px-4 py-1.5 rounded-full bg-white/[0.05] border border-white/10 text-white/60 text-sm">
                📊 {t('services_synergy_3')}
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
