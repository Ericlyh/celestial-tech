'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Building2, Cpu, Landmark } from 'lucide-react';

const caseStudies = [
  {
    title: 'Zero-Day Incident Response for Global FinTech',
    industry: 'Financial Services',
    industryIcon: Landmark,
    description:
      'When a Fortune 500 fintech firm faced an advanced persistent threat, we deployed our AI-driven SOC within hours — identifying, containing, and eradicating the threat before any data exfiltration occurred.',
    metrics: ['100% Threat Eradication', '< 4hr Response Time', '$12M Loss Prevented'],
    link: '#',
  },
  {
    title: 'AI-Powered SOC Migration for E-Commerce Platform',
    industry: 'E-Commerce / Retail',
    industryIcon: Building2,
    description:
      'Migrated a leading e-commerce platform to our intelligent SOC infrastructure, reducing false positives by 94% and cutting security operations costs by 40% in the first quarter alone.',
    metrics: ['94% Fewer False Positives', '40% Cost Reduction', '99.99% Uptime'],
    link: '#',
  },
  {
    title: 'Quantum-Ready Infrastructure for Tech Scale-Up',
    industry: 'Technology / SaaS',
    industryIcon: Cpu,
    description:
      'Architected a post-quantum security framework for a high-growth SaaS company, ensuring their cryptography stack will withstand next-generation decryption attacks.',
    metrics: ['Quantum-Resistant', 'SOC 2 Type II', 'Zero Downtime Migration'],
    link: '#',
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
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: 'easeOut' },
  },
};

export default function CaseStudies() {
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
            Success Stories
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Results That <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] to-[#8B5CF6]">Speak</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Real problems. Real solutions. Real outcomes for organizations that trust us with their security.
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
          {caseStudies.map((study, index) => {
            const IndustryIcon = study.industryIcon;
            return (
              <motion.article
                key={index}
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
                      <IndustryIcon className="w-5 h-5 text-[#8B5CF6]" />
                    </div>
                    <span className="text-sm text-[#8B5CF6] font-medium tracking-wide">
                      {study.industry}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-[#00F0FF] transition-colors duration-300">
                    {study.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-400 text-sm leading-relaxed mb-6">
                    {study.description}
                  </p>

                  {/* Metrics */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {study.metrics.map((metric, mIndex) => (
                      <span
                        key={mIndex}
                        className="text-xs text-[#00F0FF] bg-[#00F0FF]/10 border border-[#00F0FF]/20
                                   px-3 py-1 rounded-full"
                      >
                        {metric}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <a
                    href={study.link}
                    className="inline-flex items-center gap-2 text-sm font-medium text-[#8B5CF6]
                               hover:text-[#00F0FF] transition-colors duration-300 group/link"
                  >
                    View Case Study
                    <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform duration-300" />
                  </a>
                </div>

                {/* Bottom glow on hover */}
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00F0FF]/30 to-transparent" />
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
