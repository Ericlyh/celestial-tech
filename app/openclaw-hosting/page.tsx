'use client'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'
import { motion } from 'framer-motion'
import { useTranslation } from '@/i18n'

const features = [
  {
    icon: '🗣️',
    title: '識聽廣東話',
    titleEn: 'Speaks Natural Cantonese',
    desc: 'AI 用地道廣東話回應，唔使再做英文繁體。客戶睇得明，老闆放心用。',
    descEn: 'Natural Cantonese responses — no more English-only AI. Your customers understand, you stay in control.',
  },
  {
    icon: '💬',
    title: '一鍵接通 Telegram',
    titleEn: 'One-Click Telegram Bot',
    desc: '連接你現有嘅 Telegram Bot，5 分鐘搞掂。我哋幫你設定，唔使寫 code。',
    descEn: 'Connect your existing Telegram bot in 5 minutes. We handle the setup — zero coding required.',
  },
  {
    icon: '💳',
    title: '支援 FPS 收款',
    titleEn: 'FPS Payment Ready',
    desc: '直接喺對話入面發送 FPS 收款連結，客戶confirm 付款即時通知你。',
    descEn: 'Send FPS payment links directly in chat. Customers pay, you get notified instantly.',
  },
  {
    icon: '🤖',
    title: '預設 HK 商業技能',
    titleEn: 'Pre-Built HK Business Skills',
    desc: '餐廳助理、接待處、網店助手 — 揀完即用，唔使訓練。',
    descEn: 'Restaurant assistant, reception, online shop — pick a template, deploy instantly.',
  },
  {
    icon: '📱',
    title: 'WhatsApp / Telegram 雙支援',
    titleEn: 'WhatsApp + Telegram',
    desc: '你嘅客戶用開咩，我哋就支援咩。唔使迫人下載新 app。',
    descEn: 'Your customers use WhatsApp? Telegram? We support both. No app downloads needed.',
  },
  {
    icon: '🔒',
    title: '香港數據本地存放',
    titleEn: 'HK Data Residency',
    desc: '所有數據留在香港伺服器，私隱有保證。符合香港個人資料私隱條例。',
    descEn: 'All data stored on HK servers. Privacy-compliant with PDPO.',
  },
]

const testimonials = [
  {
    quote: '我用咗佢 2 個禮拜，間餐廳嘅外賣booking全自動，員工少咗做嘢，我少咗煩。',
    name: '陳生',
    business: '茶餐廳老闆',
    plan: 'Pro Plan',
  },
  {
    quote: '終於有個 AI 識得用廣東話回應客人，唔使再麻煩員工覆 message。',
    name: '李小姐',
    business: '補習中心負責人',
    plan: 'Starter Plan',
  },
  {
    quote: '我哋 agency 用佢幫客做 onboarding workflow，省咗好多 email 時間。',
    name: '黃先生',
    business: '數碼營銷 Agency',
    plan: 'Business Plan',
  },
]

const plans = [
  {
    name: 'Starter',
    nameZh: '起步',
    price: '199',
    period: '/月',
    desc: '最適合 freelance 同 micro-SME',
    descEn: 'Perfect for freelancers & micro-SMEs',
    features: [
      '1 個 AI 員工',
      '1 個 Telegram Bot',
      '基本廣東話技能',
      'FPS 收款連結',
      'Email 支援',
    ],
    cta: '立即試用',
    highlight: false,
  },
  {
    name: 'Pro',
    nameZh: '專業',
    price: '399',
    period: '/月',
    desc: '最適合成長中的中小企',
    descEn: 'For growing SMEs',
    features: [
      '3 個 AI 員工',
      '3 個 Telegram Bot',
      '全部 HK 技能模板',
      'FPS + Stripe 收款',
      '優先 WhatsApp 支援',
      '每月報告',
    ],
    cta: '開始免費試用',
    highlight: true,
  },
  {
    name: 'Business',
    nameZh: '企業',
    price: '799',
    period: '/月',
    desc: '最適合有多間分店嘅老闆',
    descEn: 'For multi-location businesses',
    features: [
      '10 個 AI 員工',
      '10 個 Telegram Bot',
      '全部 HK 技能模板',
      'FPS + Stripe + AlipayHK',
      '24/7 真人支援',
      '自訂技能開發',
      '白標選項',
    ],
    cta: '聯絡我哋',
    highlight: false,
  },
]

const faqs = [
  {
    q: '我唔識寫 code，可以用嗎？',
    qEn: 'Can I use this without coding knowledge?',
    a: '完全可以！我哋係為唔識寫 code 嘅 HK 老闆而設。你只需要揀想要咩技能，我哋幫你搞掂所有設定。',
    aEn: 'Absolutely! We built this for non-technical HK business owners. You pick the skill, we handle everything else.',
  },
  {
    q: 'OpenClaw 係乜嘢？',
    qEn: 'What is OpenClaw?',
    a: 'OpenClaw 係一個開源嘅 AI Agent 框架，全球有 230,000+ 開發者用緊。我哋幫 HK 企業包裝成托管服務，你唔使自己管伺服器。',
    aEn: "OpenClaw is an open-source AI agent framework with 230,000+ developers. We manage the hosting so you don't have to.",
  },
  {
    q: 'FPS 收款係點運作？',
    qEn: 'How does FPS payment work?',
    a: '我哋會幫你生成 FPS QR code 或者連結，客戶過數後你有通知，然后我哋手動確認啟動服務。MVP 階段係半自動，之後會變成全自動。',
    aEn: 'We generate an FPS QR code/link for each payment. You get notified, then we manually confirm activation. Semi-automated at MVP, full automation coming soon.',
  },
  {
    q: '月費綁幾耐？',
    qEn: 'Any long-term contracts?',
    a: '月費可以隨時取消，冇長期合約。不過年繳可以慳 2 個月費用。',
    aEn: 'Monthly plans cancel anytime, no long-term contracts. Annual plans save you 2 months.',
  },
]

const howItWorks = [
  { step: '01', icon: '📋', title: '揀技能模板', desc: '喺我哋嘅 HK 商業模板入面，揀你想要嘅 AI 員工角色。', descEn: 'Choose from our HK business skill templates.' },
  { step: '02', icon: '💬', title: '連接 Telegram', desc: '用你現有嘅 Telegram Bot Token，5 分鐘完成設定。', descEn: 'Connect your existing Telegram bot in 5 minutes.' },
  { step: '03', icon: '🚀', title: '開始用囉', desc: '即刻幫你接訂單、覆客人、收錢。全自動。', descEn: 'Start taking orders, answering queries, collecting payment.' },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function OpenClawHostingPage() {
  const { t } = useTranslation()

  return (
    <main className="relative min-h-screen bg-deep-space overflow-x-hidden">
      {/* Hero canvas */}
      <div className="hero-canvas-container">
        <div className="hero-grid-overlay" />
        <div className="hero-radial-overlay" />
      </div>

      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="relative max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyber-cyan/10 text-cyber-cyan text-sm font-medium mb-8 border border-cyber-cyan/20">
              <span className="w-2 h-2 rounded-full bg-cyber-cyan animate-pulse" />
              首批 10 間 HK 企業搶先體驗
            </div>

            <h1 className="heading-xl text-pure-white mb-6">
              你嘅 AI 員工
              <br />
              <span className="text-gradient-cyan">識聽廣東話</span>
            </h1>
            <p className="text-xl sm:text-2xl text-pure-white/60 mb-4 font-medium">
              香港中小企 AI 助手平台
            </p>
            <p className="text-base sm:text-lg text-pure-white/40 mb-10 max-w-2xl mx-auto">
              一鍵接通 Telegram，支援 FPS 收款。幫你慳時間、慳人手、慳金錢。
              <br />
              <span className="text-pure-white/30">Your AI employee that speaks Cantonese — built for Hong Kong SMEs.</span>
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <a href="#contact" className="btn-cyber-cyan text-lg px-8 py-4 w-full sm:w-auto">
                免費試用 7 日 →
              </a>
              <a href="#features" className="btn-cyber-purple text-lg px-8 py-4 w-full sm:w-auto">
                睇下點運作
              </a>
            </div>

            {/* Social proof */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-pure-white/40">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-cyber-cyan/40 to-cyber-purple/40 border-2 border-deep-space" />
                  ))}
                </div>
                <span>3 間 HK 企業已啟用</span>
              </div>
              <div className="hidden sm:block w-px h-4 bg-pure-white/20" />
              <span>無需信用卡</span>
              <div className="hidden sm:block w-px h-4 bg-pure-white/20" />
              <span>5 分鐘完成設定</span>
            </div>
          </motion.div>

          {/* Demo screenshot */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-16 max-w-4xl mx-auto"
          >
            <div className="relative rounded-2xl overflow-hidden glass-card border border-white/10 shadow-neon-cyan">
              {/* Window chrome */}
              <div className="bg-white/5 px-4 py-3 flex items-center gap-2 border-b border-white/5">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/60" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                  <div className="w-3 h-3 rounded-full bg-green-500/60" />
                </div>
                <div className="flex-1 text-center text-xs text-pure-white/40 font-mono">Telegram — 餐廳助理 Bot</div>
              </div>
              {/* Chat demo */}
              <div className="p-6 bg-gradient-to-br from-white/[0.02] to-white/[0.01]">
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-cyber-cyan/20 flex-shrink-0 flex items-center justify-center text-sm">🤖</div>
                    <div className="glass-card px-4 py-3 max-w-md">
                      <p className="text-sm text-pure-white/80">
                        👋 你好！我係你嘅餐廳助理 AI。<br /><br />
                        我可以幫你：<br />
                        🥡 處理外賣訂單<br />
                        📅 預約座位<br />
                        ❓ 回應客人查詢<br /><br />
                        請問有咩可以幫到你？
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3 justify-end">
                    <div className="bg-cyber-cyan/20 border border-cyber-cyan/30 rounded-2xl rounded-tr-sm px-4 py-3 max-w-md">
                      <p className="text-sm text-pure-white/90">我想 booking 今晚 7 點，兩個人</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-cyber-cyan/20 flex-shrink-0 flex items-center justify-center text-sm">🤖</div>
                    <div className="glass-card px-4 py-3 max-w-md">
                      <p className="text-sm text-pure-white/80">
                        ✅ 收到！我幫你 book 今晚 7 點，兩位。<br /><br />
                        想唔想要個 FPS 連結嚟留座？客人通常會預早過數確認。
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="heading-lg text-pure-white mb-4">
              專為香港中小企而設
            </h2>
            <p className="body-lg text-pure-white/50">
              Everything you need — nothing you don&apos;t. 為你慳時間，為你賺錢。
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {features.map((f, i) => (
              <motion.div key={i} variants={itemVariants} className="glass-card p-6">
                <div className="text-3xl mb-4">{f.icon}</div>
                <h3 className="text-lg font-bold text-pure-white mb-1">{f.title}</h3>
                <p className="text-xs font-medium text-cyber-cyan mb-3">{f.titleEn}</p>
                <p className="text-sm text-pure-white/60 mb-1">{f.desc}</p>
                <p className="text-xs text-pure-white/30">{f.descEn}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="heading-lg text-pure-white mb-4">
              3 步驟，5 分鐘搞掂
            </h2>
            <p className="body-lg text-pure-white/50">
              From zero to AI employee in 5 minutes — no code required.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {howItWorks.map((item, i) => (
              <motion.div key={i} variants={itemVariants} className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-cyber-cyan/10 flex items-center justify-center text-3xl mx-auto mb-6 border border-cyber-cyan/20">
                  {item.icon}
                </div>
                <div className="text-5xl font-extrabold text-pure-white/10 mb-4">{item.step}</div>
                <h3 className="text-xl font-bold text-pure-white mb-2">{item.title}</h3>
                <p className="text-sm text-pure-white/50 mb-2">{item.desc}</p>
                <p className="text-xs text-pure-white/30">{item.descEn}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="heading-lg text-pure-white mb-4">
              簡單、透明的定價
            </h2>
            <p className="body-lg text-pure-white/50">
              比請一個 part-time admin 平 95%。隨時可以取消。
            </p>
            <p className="text-sm text-pure-white/30 mt-2">
              Simple, transparent pricing. 95% cheaper than a part-time admin. Cancel anytime.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto"
          >
            {plans.map((plan, i) => (
              <motion.div key={i} variants={itemVariants} className={`glass-card p-6 flex flex-col relative ${plan.highlight ? 'border-cyber-cyan/40' : ''}`}>
                {plan.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-cyber-cyan text-deep-space text-xs font-bold px-4 py-1 rounded-full">最受歡迎 · MOST POPULAR</span>
                  </div>
                )}
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-pure-white">{plan.name}</h3>
                  <p className="text-xs text-cyber-cyan font-medium">{plan.nameZh}</p>
                  <div className="mt-4 flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold text-pure-white">${plan.price}</span>
                    <span className="text-pure-white/40 text-sm">{plan.period}</span>
                  </div>
                  <p className="text-xs text-pure-white/50 mt-1">{plan.desc}</p>
                  <p className="text-xs text-pure-white/30">{plan.descEn}</p>
                </div>
                <ul className="space-y-3 flex-1 mb-6">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-pure-white/60">
                      <span className="text-cyber-cyan mt-0.5">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href="#contact"
                  className={`w-full text-center py-3 rounded-xl font-semibold transition-all ${plan.highlight ? 'btn-cyber-cyan' : 'bg-white/5 text-pure-white/80 border border-white/10 hover:bg-white/10 hover:border-white/20'}`}
                >
                  {plan.cta}
                </a>
              </motion.div>
            ))}
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-xs text-pure-white/30 mt-8"
          >
            所有價錢以 HKD 計算。年繳可享 17% 折扣，相等於 2 個月免費。
            <br />
            All prices in HKD. Annual plans save 17% — equivalent to 2 months free.
          </motion.p>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="heading-lg text-pure-white mb-4">
              HK 老闆點樣用？
            </h2>
            <p className="body-lg text-pure-white/50">What HK business owners are saying.</p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {testimonials.map((t, i) => (
              <motion.div key={i} variants={itemVariants} className="glass-card p-6">
                <div className="text-cyber-cyan text-lg mb-3">★★★★★</div>
                <p className="text-sm text-pure-white/70 mb-4 leading-relaxed">「{t.quote}」</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyber-cyan/40 to-cyber-purple/40 flex items-center justify-center text-pure-white font-bold text-sm">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-pure-white">{t.name}</p>
                    <p className="text-xs text-pure-white/40">{t.business} · {t.plan}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="heading-lg text-pure-white mb-4">常見問題</h2>
            <p className="body-lg text-pure-white/50">Frequently Asked Questions.</p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-4"
          >
            {faqs.map((faq, i) => (
              <motion.div key={i} variants={itemVariants} className="glass-card p-6">
                <h3 className="font-semibold text-pure-white mb-1">{faq.q}</h3>
                <p className="text-xs text-cyber-cyan mb-2 font-medium">{faq.qEn}</p>
                <p className="text-sm text-pure-white/60 mb-1">{faq.a}</p>
                <p className="text-xs text-pure-white/30">{faq.aEn}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="heading-lg text-pure-white mb-4">
              準備好試用未？
            </h2>
            <p className="text-lg text-pure-white/60">
              填低以下資料，我哋會 WhatsApp 你。
            </p>
            <p className="text-sm text-pure-white/30 mt-1">
              Leave your details and we&apos;ll WhatsApp you within 24 hours.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="glass-card p-8"
          >
            <form
              action="https://formspree.io/f/-placeholder"
              method="POST"
              className="space-y-5"
              id="contact-form"
            >
              <div>
                <label className="block text-sm font-medium text-pure-white/80 mb-1">
                  你嘅名字 / Your Name *
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="例如：陳大文"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-pure-white placeholder:text-pure-white/20 focus:border-cyber-cyan/50 focus:ring-2 focus:ring-cyber-cyan/20 outline-none transition text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-pure-white/80 mb-1">
                  WhatsApp 號碼 *
                </label>
                <input
                  type="tel"
                  name="whatsapp"
                  required
                  placeholder="例如：+852 6123 4567"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-pure-white placeholder:text-pure-white/20 focus:border-cyber-cyan/50 focus:ring-2 focus:ring-cyber-cyan/20 outline-none transition text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-pure-white/80 mb-1">
                  業務類型 / Business Type
                </label>
                <select
                  name="business_type"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-pure-white/70 focus:border-cyber-cyan/50 focus:ring-2 focus:ring-cyber-cyan/20 outline-none transition text-sm"
                >
                  <option value="" className="bg-deep-space">請選擇 / Please select</option>
                  <option value="restaurant" className="bg-deep-space">餐廳 / Restaurant</option>
                  <option value="retail" className="bg-deep-space">零售店 / Retail</option>
                  <option value="onlineshop" className="bg-deep-space">網店 / Online Shop</option>
                  <option value="agency" className="bg-deep-space">Agency / 顧問</option>
                  <option value="freelancer" className="bg-deep-space">Freelancer / 自由工作者</option>
                  <option value="other" className="bg-deep-space">其他 / Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-pure-white/80 mb-1">
                  你遇到嘅最大問題 / Biggest Pain Point
                </label>
                <textarea
                  name="pain_point"
                  rows={3}
                  placeholder="例如：每日用 WhatsApp 覆客人查到好辛苦..."
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-pure-white placeholder:text-pure-white/20 focus:border-cyber-cyan/50 focus:ring-2 focus:ring-cyber-cyan/20 outline-none transition text-sm resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-pure-white/80 mb-1">
                  你想要咩 Plan？ / Preferred Plan
                </label>
                <div className="flex gap-4 flex-wrap">
                  {[
                    { value: 'starter', label: 'Starter $199/月' },
                    { value: 'pro', label: 'Pro $399/月' },
                    { value: 'business', label: 'Business $799/月' },
                    { value: 'unsure', label: '未決定 / Not sure' },
                  ].map((opt) => (
                    <label key={opt.value} className="flex items-center gap-2 text-sm text-pure-white/60 cursor-pointer">
                      <input type="radio" name="plan" value={opt.value} className="text-cyber-cyan focus:ring-cyber-cyan/50" />
                      {opt.label}
                    </label>
                  ))}
                </div>
              </div>
              <input type="hidden" name="_subject" value="新 HK OpenClaw 查詢！" />
              <button type="submit" className="w-full btn-cyber-cyan text-lg py-4">
                提交 — 等我哋 WhatsApp 你！
              </button>
              <p className="text-center text-xs text-pure-white/30">
                我哋唔會spam你。只係發送一次 WhatsApp 確認。
                <br />
                We won&apos;t spam you. Just one WhatsApp to confirm.
              </p>
            </form>
          </motion.div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </main>
  )
}
