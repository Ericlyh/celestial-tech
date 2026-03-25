'use client';

import { motion } from 'framer-motion';
import { Linkedin, Twitter, Github, Target, Rocket, Heart } from 'lucide-react';

export default function Founder() {
  return (
    <section id="founder" className="relative py-24 px-6 md:px-12 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-[#0d0d14] to-[#0A0A0A] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_#00F0FF08_0%,_transparent_60%)] pointer-events-none" />

      <div className="relative max-w-5xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-[#00F0FF] text-sm font-medium tracking-widest uppercase mb-4">
            The Vision
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            From the <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] to-[#8B5CF6]">Founder</span>
          </h2>
        </motion.div>

        {/* Founder card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="relative bg-white/[0.03] border border-white/[0.08] rounded-3xl p-8 md:p-12
                     backdrop-blur-md overflow-hidden"
        >
          {/* Subtle grid overlay */}
          <div
            className="absolute inset-0 opacity-[0.015]"
            style={{
              backgroundImage:
                'linear-gradient(#00F0FF 1px, transparent 1px), linear-gradient(90deg, #00F0FF 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          />

          {/* Corner accents */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-[#00F0FF]/10 to-transparent rounded-br-full" />
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-[#8B5CF6]/10 to-transparent rounded-tl-full" />

          <div className="relative flex flex-col md:flex-row gap-10 items-start">
            {/* Photo placeholder */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex-shrink-0"
            >
              <div className="relative">
                {/* Glow ring */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#00F0FF] to-[#8B5CF6] opacity-30 blur-md" />
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#00F0FF] to-[#8B5CF6] opacity-20 blur-xl" />

                {/* Photo */}
                <div className="relative w-40 h-40 rounded-full bg-gradient-to-br from-[#00F0FF]/20 to-[#8B5CF6]/20
                                border-2 border-[#00F0FF]/30 flex items-center justify-center
                                shadow-[0_0_40px_rgba(0,240,255,0.15)]">
                  <span className="text-5xl font-bold text-transparent bg-clip-text
                                   bg-gradient-to-br from-[#00F0FF] to-[#8B5CF6]">
                    CF
                  </span>
                </div>

                {/* Decorative ring */}
                <div className="absolute -inset-4 rounded-full border border-[#00F0FF]/10" />
              </div>
            </motion.div>

            {/* Content */}
            <div className="flex-1">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-white mb-1">Alex Chen</h3>
                <p className="text-[#00F0FF] font-medium">Founder & CEO, Celestial Tech</p>
              </div>

              <div className="space-y-4 text-gray-300 leading-relaxed mb-8">
                <p>
                  After a decade protecting critical infrastructure at two of the world&apos;s largest cybersecurity firms,
                  I grew frustrated watching great organizations get breached not because they lacked security tools —
                  but because they lacked strategic direction.
                </p>
                <p>
                  Celestial Tech was born from a simple belief: <strong className="text-white">security should be a
                  partner, not a vendor.</strong> We fuse military-grade defense with genuine intelligence — the kind
                  that learns, adapts, and anticipates. Not just another MSSP. A true security partner.
                </p>
              </div>

              {/* Personal message */}
              <div className="relative bg-white/[0.03] border border-[#00F0FF]/10 rounded-xl p-5 mb-8">
                <div className="absolute -top-3 left-5 px-2 bg-[#0A0A0A]">
                  <Heart className="w-4 h-4 text-[#8B5CF6]" />
                </div>
                <p className="text-gray-400 italic text-sm leading-relaxed">
                  &quot;My commitment to every client is simple: I will treat your security like it&apos;s my own.
                  Because at the end of the day, when you win, we all win.&quot;
                </p>
              </div>

              {/* Social proof badges */}
              <div className="flex flex-wrap gap-6 mb-8">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#00F0FF] animate-pulse" />
                  <span className="text-sm text-gray-400">10+ Years Enterprise Security</span>
                </div>
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4 text-[#8B5CF6]" />
                  <span className="text-sm text-gray-400">500+ Threat Investigations</span>
                </div>
                <div className="flex items-center gap-2">
                  <Rocket className="w-4 h-4 text-[#00F0FF]" />
                  <span className="text-sm text-gray-400">Founded 2024</span>
                </div>
              </div>

              {/* Social links */}
              <div className="flex gap-4">
                {[
                  { icon: Linkedin, href: '#', label: 'LinkedIn' },
                  { icon: Twitter, href: '#', label: 'Twitter' },
                  { icon: Github, href: '#', label: 'GitHub' },
                ].map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="w-10 h-10 rounded-lg bg-white/[0.05] border border-white/[0.1]
                               flex items-center justify-center text-gray-400
                               hover:text-[#00F0FF] hover:border-[#00F0FF]/30 hover:bg-[#00F0FF]/5
                               transition-all duration-300"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
