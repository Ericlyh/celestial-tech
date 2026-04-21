'use client'

import { I18nProvider } from '@/i18n'
import { GlobalStarCanvas } from '@/components/StarCanvas'

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <I18nProvider>
      <GlobalStarCanvas />
      {children}
    </I18nProvider>
  )
}
