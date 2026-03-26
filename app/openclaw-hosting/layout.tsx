import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'OpenClaw Hosting | Celestial Tech — AI Employees That Speak Cantonese',
  description: 'Deploy AI agents for your HK business in minutes. Speaks Cantonese, connects to Telegram & WhatsApp, accepts FPS payments.',
}

export default function OpenClawHostingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
