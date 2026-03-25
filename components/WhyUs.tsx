'use client';

import { motion } from 'framer-motion';
import { ShieldCheck, Brain, Zap, Users, Headphones, Award } from 'lucide-react';

const benefits = [
  {
    icon: ShieldCheck,
    title: 'Security + Intelligence Fusion',
    description:
      'We merge cutting-edge cybersecurity with AI-driven threat intelligence, giving you defenses that think ahead — not just react.',
  },
  {
    icon: Zap,
    title: 'Proactive Defense',
    description:
      'Stop threats before they strike. Our predictive monitoring identifies vulnerabilities and anomalies in real-time, neutralizing risks preemptively.',
  },
  {
    icon: Users,
    title: 'Enterprise-Grade',
    description:
      'Scalable infrastructure built for the demands of modern enterprise. Bank-grade encryption, zero-trust architecture, and compliance-ready from day one.',
  },
  {
    icon: Brain,
    title: 'Personalized Solutions',
    description:
      'No two organizations face identical threats. We architect security strategies tailored to your industry, stack, and risk profile.',
  },
  {
    icon: Headphones,
    title: '24/7 Support',
    description:
      'Cyber threats don\'t sleep — and neither do we. Our global SOC operates round-the-clock, ensuring a human expert is always a heartbeat away.',
  },
  {
    icon: Award,
    title: 'Proven Track Record',
    description:
      'Trusted by startups and Fortune 500s alike. Our clients report a 99.9% threat resolution rate and average 60% reduction in security incidents.',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

export default function WhyUs() {
  return (
    <section id="why-us" className="relative py-24 px-6 md:px-12 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-[#0d0d14] to-[#0A0A0A] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_#00F0FF08_0%,_transparent_60%)] pointer-events-none" />

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
            Why Choose Us
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Why <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] to-[#8B5CF6]">Celestial Tech</span>?
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            We don&apos;t just secure your systems — we transform your security posture into a strategic advantage.
          </p>
        </motion.div>

        {/* Benefits grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group relative bg-white/[0.03] border border-white/[0.06] rounded-2xl p-8
                           hover:border-[#00F0FF]/40 transition-all duration-500
                           backdrop-blur-md overflow-hidden"
              >
                {/* Hover glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500
                                bg-gradient-to-br from-[#00F0FF]/5 to-[#8B5CF6]/5 pointer-events-none" />

                {/* Neon border on hover */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500
                                shadow-[inset_0_0_20px_rgba(0,240,255,0.1)] pointer-events-none" />

                <div className="relative z-10">
                  {/* Icon */}
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#00F0FF]/20 to-[#8B5CF6]/20
                                  flex items-center justify-center mb-6
                                  border border-[#00F0FF]/20 group-hover:border-[#00F0FF]/50 transition-colors duration-300">
                    <Icon className="w-7 h-7 text-[#00F0FF] group-hover:drop-shadow-[0_0_8px_rgba(0,240,255,0.6)] transition-shadow duration-300" />
                  </div>

                  <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-[#00F0FF] transition-colors duration-300">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
