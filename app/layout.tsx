import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Providers from './providers'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Celestial Tech | Cybersecurity Meets Artificial Intelligence',
  description:
    'Celestial Tech pioneers the intersection of cybersecurity and AI — delivering enterprise-grade protection and intelligent automation for forward-thinking organizations.',
  keywords: [
    'cybersecurity',
    'AI',
    'artificial intelligence',
    'penetration testing',
    'SOC monitoring',
    'security consulting',
    'AI integration',
  ],
  authors: [{ name: 'Celestial Tech' }],
  openGraph: {
    title: 'Celestial Tech | Cybersecurity Meets Artificial Intelligence',
    description:
      'Where cybersecurity meets artificial intelligence — next-generation protection and intelligence for the digital frontier.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Celestial Tech | Cybersecurity Meets AI',
    description:
      'Where cybersecurity meets artificial intelligence — next-generation protection.',
  },
}

export const viewport = {
  themeColor: '#0A0A0A',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`}>
      <body className="bg-deep-space text-pure-white antialiased font-sans overflow-x-hidden">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
