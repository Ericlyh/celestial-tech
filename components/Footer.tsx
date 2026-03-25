'use client';

import { motion } from 'framer-motion';
import { Linkedin, Twitter, Github, Shield } from 'lucide-react';

const quickLinks = [
  { label: 'Home', href: '#' },
  { label: 'Services', href: '#services' },
  { label: 'Case Studies', href: '#case-studies' },
  { label: 'About', href: '#founder' },
  { label: 'Contact', href: '#contact' },
];

const legalLinks = [
  { label: 'Privacy Policy', href: '#' },
  { label: 'Terms of Service', href: '#' },
];

const socialLinks = [
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Twitter, href: '#', label: 'Twitter / X' },
  { icon: Github, href: '#', label: 'GitHub' },
];

const footerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
};

export default function Footer() {
  return (
    <footer className="relative bg-[#060608] border-t border-white/[0.05] overflow-hidden">
      {/* Top accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00F0FF]/20 to-transparent" />

      <motion.div
        variants={footerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-6 md:px-12 py-16"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand column */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            {/* Logo */}
            <div className="flex items-center gap-3 mb-5">
              <div className="relative">
                <div className="absolute inset-0 bg-[#00F0FF]/20 blur-lg rounded-lg" />
                <div className="relative w-10 h-10 rounded-lg bg-gradient-to-br from-[#00F0FF]/20 to-[#8B5CF6]/20
                                border border-[#00F0FF]/30 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-[#00F0FF]" />
                </div>
              </div>
              <div>
                <span className="text-white font-bold text-lg tracking-tight">Celestial Tech</span>
                <span className="block text-[10px] text-[#00F0FF] tracking-[0.2em] uppercase -mt-1">
                  Next-Gen Security
                </span>
              </div>
            </div>

            <p className="text-gray-500 text-sm leading-relaxed max-w-sm mb-6">
              Fusing military-grade cybersecurity with AI-driven threat intelligence. We protect the
              organizations that move the world forward — 24/7, without compromise.
            </p>

            {/* Social icons */}
            <div className="flex gap-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/[0.08]
                             flex items-center justify-center text-gray-500
                             hover:text-[#00F0FF] hover:border-[#00F0FF]/30 hover:bg-[#00F0FF]/5
                             transition-all duration-300"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Quick links */}
          <motion.div variants={itemVariants}>
            <h4 className="text-white font-semibold text-sm tracking-wide uppercase mb-5">Navigation</h4>
            <ul className="space-y-3">
              {quickLinks.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="text-gray-500 hover:text-[#00F0FF] text-sm transition-colors duration-300
                               inline-block hover:translate-x-1"
                    style={{ transition: 'color 0.3s, transform 0.2s' }}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Legal */}
          <motion.div variants={itemVariants}>
            <h4 className="text-white font-semibold text-sm tracking-wide uppercase mb-5">Legal</h4>
            <ul className="space-y-3">
              {legalLinks.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="text-gray-500 hover:text-[#00F0FF] text-sm transition-colors duration-300"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>

            {/* Status indicator */}
            <div className="mt-6 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#00F0FF] animate-pulse" />
              <span className="text-gray-600 text-xs">SOC 2 Active Monitoring</span>
            </div>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <motion.div
          variants={itemVariants}
          className="pt-8 border-t border-white/[0.05] flex flex-col sm:flex-row
                     justify-between items-center gap-4"
        >
          <p className="text-gray-600 text-sm">
            © 2026 Celestial Tech. All rights reserved.
          </p>
          <p className="text-gray-700 text-xs">
            Crafted with precision. Secured with intelligence.
          </p>
        </motion.div>
      </motion.div>
    </footer>
  );
}
