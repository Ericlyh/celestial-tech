'use client'

import { motion } from 'framer-motion'
import { Mail, MapPin, Phone, Calendar, ArrowRight, CheckCircle } from 'lucide-react'
import { useState, FormEvent } from 'react'
import { useTranslation } from '@/i18n'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: 'easeOut' },
  }),
}

const infoCards = [
  { icon: Mail, label: 'Email Us', value: 'hello@celestialtech.io', sub: 'We respond within 24 hours' },
  { icon: Phone, label: 'Call Us', value: '+1 (888) 988-CYBER', sub: 'Mon–Fri, 9am–6pm HKT' },
  { icon: MapPin, label: 'Location', value: 'Hong Kong · Singapore · London', sub: 'Global SOC, 24/7 coverage' },
] as const

export default function Contact() {
  const { t } = useTranslation()
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    company: '',
    service: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const serviceOptions = [
    'contact_service_cyber_consulting',
    'contact_service_soc',
    'contact_service_pentest',
    'contact_service_personal',
    'contact_service_training',
    'contact_service_purple',
    'contact_service_ai_strategy',
    'contact_service_ai_custom',
    'contact_service_ai_deploy',
    'contact_service_ai_train',
  ]

  return (
    <section id="contact" className="relative py-24 px-6 md:px-12 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-[#0d0d14] to-[#0A0A0A] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#00F0FF06_0%,_transparent_70%)] pointer-events-none" />

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
            {t('contact_label')}
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {t('contact_title')}
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            {t('contact_subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Contact info sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 space-y-8"
          >
            {/* Info cards */}
            {infoCards.map((card, i) => {
              const Icon = card.icon
              return (
              <motion.div
                key={i}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="flex items-start gap-4 p-5 bg-white/[0.03] border border-white/[0.06]
                           rounded-xl hover:border-[#00F0FF]/20 transition-colors duration-300"
              >
                <div className="w-10 h-10 rounded-lg bg-[#00F0FF]/10 border border-[#00F0FF]/20
                                flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-[#00F0FF]" />
                </div>
                <div>
                  <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">
                    {card.label}
                  </p>
                  <p className="text-white font-medium">{card.value}</p>
                  <p className="text-gray-500 text-sm">{card.sub}</p>
                </div>
              </motion.div>
              )
            })}

            {/* Calendly CTA */}
            <motion.div
              custom={3}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#00F0FF]/20 to-[#8B5CF6]/20 rounded-xl blur-md opacity-50 group-hover:opacity-80 transition-opacity duration-300" />
              <div className="relative p-6 rounded-xl bg-white/[0.03] border border-[#00F0FF]/20 text-center">
                <Calendar className="w-8 h-8 text-[#00F0FF] mx-auto mb-3" />
                <p className="text-white font-semibold mb-2">{t('contact_book')}</p>
                <p className="text-gray-400 text-sm mb-4">
                  30 minutes. No sales pitch — just an honest conversation about your security needs.
                </p>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg
                             bg-gradient-to-r from-[#00F0FF] to-[#8B5CF6]
                             text-white font-semibold text-sm
                             hover:shadow-[0_0_20px_rgba(0,240,255,0.3)]
                             transition-all duration-300"
                >
                  {t('contact_book')}
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-3"
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white/[0.03] border border-[#00F0FF]/20 rounded-2xl p-12 text-center"
              >
                <CheckCircle className="w-16 h-16 text-[#00F0FF] mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-white mb-3">Message Received!</h3>
                <p className="text-gray-400 mb-6">
                  Thank you for reaching out. A member of our team will be in touch within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-[#00F0FF] hover:text-white transition-colors duration-300 text-sm"
                >
                  Send another message →
                </button>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-8 md:p-10
                           backdrop-blur-md space-y-6"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name */}
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2" htmlFor="name">
                      {t('contact_name')} <span className="text-[#00F0FF]">*</span>
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formState.name}
                      onChange={handleChange}
                      placeholder="Jane Doe"
                      className="w-full px-4 py-3 rounded-lg bg-white/[0.05] border border-white/[0.1]
                                 text-white placeholder:text-gray-600
                                 focus:outline-none focus:border-[#00F0FF]/50 focus:bg-white/[0.08]
                                 transition-all duration-300"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2" htmlFor="email">
                      {t('contact_email')} <span className="text-[#00F0FF]">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formState.email}
                      onChange={handleChange}
                      placeholder="jane@company.com"
                      className="w-full px-4 py-3 rounded-lg bg-white/[0.05] border border-white/[0.1]
                                 text-white placeholder:text-gray-600
                                 focus:outline-none focus:border-[#00F0FF]/50 focus:bg-white/[0.08]
                                 transition-all duration-300"
                    />
                  </div>
                </div>

                {/* Company */}
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2" htmlFor="company">
                    {t('contact_company')} <span className="text-gray-500 text-xs">(optional)</span>
                  </label>
                  <input
                    id="company"
                    name="company"
                    type="text"
                    value={formState.company}
                    onChange={handleChange}
                    placeholder="Acme Corp"
                    className="w-full px-4 py-3 rounded-lg bg-white/[0.05] border border-white/[0.1]
                               text-white placeholder:text-gray-600
                               focus:outline-none focus:border-[#00F0FF]/50 focus:bg-white/[0.08]
                               transition-all duration-300"
                  />
                </div>

                {/* Service Interest */}
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2" htmlFor="service">
                    {t('contact_service')} <span className="text-[#00F0FF]">*</span>
                  </label>
                  <select
                    id="service"
                    name="service"
                    required
                    value={formState.service}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-white/[0.05] border border-white/[0.1]
                               text-white appearance-none cursor-pointer
                               focus:outline-none focus:border-[#00F0FF]/50 focus:bg-white/[0.08]
                               transition-all duration-300"
                    style={{ backgroundImage: 'none' }}
                  >
                    <option value="" className="bg-[#0d0d14]">{t('contact_service_select')}</option>
                    {serviceOptions.map((key) => (
                      <option key={key} value={key} className="bg-[#0d0d14]">
                        {t(key as any)}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2" htmlFor="message">
                    {t('contact_message')} <span className="text-[#00F0FF]">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formState.message}
                    onChange={handleChange}
                    placeholder={t('contact_message_placeholder')}
                    className="w-full px-4 py-3 rounded-lg bg-white/[0.05] border border-white/[0.1]
                               text-white placeholder:text-gray-600 resize-none
                               focus:outline-none focus:border-[#00F0FF]/50 focus:bg-white/[0.08]
                               transition-all duration-300"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full py-4 rounded-xl font-semibold text-white
                             bg-gradient-to-r from-[#00F0FF] to-[#8B5CF6]
                             hover:shadow-[0_0_30px_rgba(0,240,255,0.25)]
                             active:scale-[0.98]
                             transition-all duration-300"
                >
                  {t('contact_submit')}
                  <ArrowRight className="inline-block ml-2 w-4 h-4" />
                </button>

                <p className="text-center text-gray-500 text-xs">
                  By submitting, you agree to our Privacy Policy. We&apos;ll never spam you or share your data.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
