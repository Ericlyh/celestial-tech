'use client'

import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react'
import { en, LocaleKey } from '@/locales/en'
import { zhHant } from '@/locales/zh-Hant'

const locales: Record<string, Record<LocaleKey, string>> = {
  en,
  'zh-Hant': zhHant,
}

type Locale = 'en' | 'zh-Hant'

const LOCALE_KEY = 'mtd-locale'
const LOCALE_COOKIE = 'mtd-locale'

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
  const [locale, setLocaleState] = useState<Locale>('en')
  const [mounted, setMounted] = useState(false)

  // On mount, read from localStorage (browser)
  useEffect(() => {
    const stored = localStorage.getItem(LOCALE_KEY) as Locale | null
    if (stored && (stored === 'en' || stored === 'zh-Hant')) {
      setLocaleState(stored)
    } else {
      // Default to zh-Hant if no stored preference
      setLocaleState('zh-Hant')
    }
    setMounted(true)
  }, [])

  // Persist to localStorage + cookie whenever locale changes
  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l)
    localStorage.setItem(LOCALE_KEY, l)
    // Set cookie for SSR hydration (path=/ so it's available on all routes)
    document.cookie = `${LOCALE_COOKIE}=${l};path=/;max-age=31536000;SameSite=Lax`
  }, [])

  const toggleLocale = useCallback(() => {
    setLocale(locale === 'en' ? 'zh-Hant' : 'en')
  }, [locale, setLocale])

  const t = useCallback(
    (key: LocaleKey): string => {
      return locales[locale]?.[key] ?? locales.en[key] ?? key
    },
    [locale]
  )

  // Avoid rendering with wrong locale on first paint
  const value: I18nContextValue = mounted
    ? { locale, t, setLocale, toggleLocale }
    : { locale: 'en', t: (key) => en[key], setLocale: () => {}, toggleLocale: () => {} }

  return (
    <I18nContext.Provider value={value}>
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
