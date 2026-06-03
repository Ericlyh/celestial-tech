'use client'

import { I18nProvider } from '@/i18n'
import { GlobalStarCanvas } from '@/components/StarCanvas'
import ScrollToTop from '@/components/ScrollToTop'

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <I18nProvider>
      <GlobalStarCanvas />
      {children}
      <ScrollToTop />
    </I18nProvider>
  )
}
