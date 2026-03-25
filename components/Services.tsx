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

const cyberServices = [
  {
    icon: Shield,
    title: 'Cybersecurity Consulting',
    description:
      'Comprehensive risk assessments and security strategy development tailored to your organization\'s unique threat landscape.',
  },
  {
    icon: Eye,
    title: 'SOC Monitoring & Rule Set Tuning',
    description:
      '24/7 Security Operations Center monitoring with finely tuned detection rules to catch threats before they escalate.',
  },
  {
    icon: Target,
    title: 'Penetration Testing (Red Teaming)',
    description:
      'Adversary simulation through realistic attack scenarios, exposing vulnerabilities before malicious actors exploit them.',
  },
  {
    icon: UserCheck,
    title: 'Personal Cybersecurity Protection',
    description:
      'Executive and high-profile individual protection — securing personal digital footprints with enterprise-grade controls.',
  },
  {
    icon: GraduationCap,
    title: 'Security Awareness Training',
    description:
      'Human-layer defense through engaging, up-to-date training programs that transform employees into the first line of security.',
  },
  {
    icon: BrainCircuit,
    title: 'Purple Teaming',
    description:
      'Offensive and defensive teams working in unison — bridging the gap with coordinated exercises and knowledge transfer.',
  },
]

const aiServices = [
  {
    icon: Lightbulb,
    title: 'AI Strategy Consulting',
    description:
      'Roadmap development for AI adoption — from use-case identification to ROI modeling and implementation planning.',
  },
  {
    icon: Cpu,
    title: 'Custom AI Tailor-Made Setup & Integration',
    description:
      'Bespoke AI solutions architected and integrated into your existing systems — no off-the-shelf shortcuts.',
  },
  {
    icon: Layers,
    title: 'AI Model Deployment & Scaling',
    description:
      'From prototype to production — reliable, scalable model deployment with monitoring, versioning, and optimization.',
  },
  {
    icon: Sparkles,
    title: 'AI Training & Fine-Tuning',
    description:
      'Specialized model training on proprietary data to maximize relevance, accuracy, and domain-specific performance.',
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: 'easeOut' },
  }),
}

export default function Services() {
  const [activeTab, setActiveTab] = useState<'cyber' | 'ai'>('cyber')

  return (
    <section id="services" className="relative py-32 px-6 overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-deep-space via-[#0d0d1a] to-deep-space pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-cyber-cyan/5 rounded-full blur-[100px] pointer-events-none" />

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
            What We Do
          </motion.p>
          <motion.h2
            custom={1}
            variants={fadeUp}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            Two Pillars, One Mission
          </motion.h2>
          <motion.p
            custom={2}
            variants={fadeUp}
            className="text-white/60 max-w-2xl mx-auto text-lg"
          >
            We operate at the intersection of cybersecurity and artificial intelligence — 
            delivering services that are smarter, faster, and more adaptive than conventional approaches.
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
              🛡️ Cybersecurity
            </button>
            <button
              onClick={() => setActiveTab('ai')}
              className={`px-8 py-3 rounded-lg font-medium text-sm transition-all duration-300 ${
                activeTab === 'ai'
                  ? 'bg-cyber-purple/20 text-cyber-purple shadow-[0_0_20px_rgba(139,92,246,0.2)]'
                  : 'text-white/50 hover:text-white'
              }`}
            >
              🤖 AI Solutions
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
          {(activeTab === 'cyber' ? cyberServices : aiServices).map((service, i) => (
            <motion.div
              key={service.title}
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
                  {service.title}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed">
                  {service.description}
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
              CYBER + AI SYNERGY
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Two Disciplines, Amplified Together
            </h3>
            <p className="text-white/55 max-w-2xl mx-auto text-base leading-relaxed">
              Our cybersecurity and AI practices aren&apos;t siloed — they reinforce each other. 
              AI-powered threat detection feeds into our SOC. Security data trains smarter AI models. 
              The result: protection that learns, adapts, and stays ahead of threats.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <span className="px-4 py-1.5 rounded-full bg-white/[0.05] border border-white/10 text-white/60 text-sm">
                🤖 AI-Powered SOC
              </span>
              <span className="px-4 py-1.5 rounded-full bg-white/[0.05] border border-white/10 text-white/60 text-sm">
                🛡️ Security-Informed AI
              </span>
              <span className="px-4 py-1.5 rounded-full bg-white/[0.05] border border-white/10 text-white/60 text-sm">
                📊 Threat Intelligence + ML
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
