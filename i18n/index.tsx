'use client'

import { createContext, useContext, useState, useCallback, ReactNode } from 'react'
import { en, LocaleKey } from '@/locales/en'
import { zhHant } from '@/locales/zh-Hant'

const locales: Record<string, Record<LocaleKey, string>> = {
  en,
  'zh-Hant': zhHant,
}

type Locale = 'en' | 'zh-Hant'

interface I18nContextValue {
  locale: Locale
  t: (key: LocaleKey) => string
  setLocale: (locale: Locale) => void
  toggleLocale: () => void
}

const I18nContext = createContext<I18nContextValue>({
  locale: 'en',
  t: (key) => en[key],
  setLocale: () => {},
  toggleLocale: () => {},
})

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('zh-Hant')

  const t = useCallback(
    (key: LocaleKey): string => {
      return locales[locale]?.[key] ?? locales.en[key] ?? key
    },
    [locale]
  )

  const setLocale = useCallback((l: Locale) => setLocaleState(l), [])

  const toggleLocale = useCallback(() => {
    setLocaleState((prev) => (prev === 'en' ? 'zh-Hant' : 'en'))
  }, [])

  return (
    <I18nContext.Provider value={{ locale, t, setLocale, toggleLocale }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useTranslation() {
  return useContext(I18nContext)
}

export const supportedLocales: { code: Locale; label: string; nativeLabel: string }[] = [
  { code: 'en', label: 'English', nativeLabel: 'EN' },
  { code: 'zh-Hant', label: 'Traditional Chinese', nativeLabel: '繁' },
]
