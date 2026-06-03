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
const DEFAULT_LOCALE: Locale = 'en'

/**
 * Read a cookie value on the client. Returns null in SSR.
 */
function readCookie(name: string): string | null {
  if (typeof document === 'undefined') return null
  const match = document.cookie.match(new RegExp('(^|; )' + name + '=([^;]*)'))
  return match ? decodeURIComponent(match[2]) : null
}

interface I18nContextValue {
  locale: Locale
  t: (key: LocaleKey) => string
  setLocale: (locale: Locale) => void
  toggleLocale: () => void
}

const I18nContext = createContext<I18nContextValue>({
  locale: DEFAULT_LOCALE,
  t: (key) => en[key],
  setLocale: () => {},
  toggleLocale: () => {},
})

function isValidLocale(v: string | null): v is Locale {
  return v === 'en' || v === 'zh-Hant'
}

export function I18nProvider({ children }: { children: ReactNode }) {
  // SSR-safe initial state. On the server, the value is always the default
  // locale (en). On the client, we hydrate from localStorage in a useEffect
  // — but to keep SSR/CSR markup identical, the FIRST render still uses the
  // default. After mount, we update to whatever the user previously chose.
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE)
  const [hydrated, setHydrated] = useState(false)

  // Resolve the user's saved preference once on mount. Order of preference:
  //   1. localStorage (set by previous toggles on this device)
  //   2. Cookie (set as fallback, available at first paint)
  //   3. Default
  useEffect(() => {
    let resolved: Locale = DEFAULT_LOCALE
    try {
      const stored = localStorage.getItem(LOCALE_KEY)
      if (isValidLocale(stored)) {
        resolved = stored
      } else {
        const fromCookie = readCookie(LOCALE_COOKIE)
        if (isValidLocale(fromCookie)) {
          resolved = fromCookie
        }
      }
    } catch {
      // localStorage may be unavailable (e.g. private mode) — fall through
    }
    setLocaleState(resolved)
    if (typeof document !== 'undefined') {
      document.documentElement.lang = resolved === 'zh-Hant' ? 'zh-Hant' : 'en'
    }
    setHydrated(true)
  }, [])

  // Persist whenever the user toggles. Writes to BOTH localStorage and cookie
  // so the choice survives across sessions and is available to SSR on the
  // next request.
  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l)
    if (typeof window !== 'undefined') {
      try { localStorage.setItem(LOCALE_KEY, l) } catch {}
      document.documentElement.lang = l === 'zh-Hant' ? 'zh-Hant' : 'en'
      document.cookie = `${LOCALE_COOKIE}=${l};path=/;max-age=31536000;SameSite=Lax`
    }
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

  // While hydrating, expose the default locale — this keeps SSR markup
  // identical to the first client render (no hydration mismatch warning).
  // After hydration, components re-render with the resolved locale.
  const value: I18nContextValue = {
    locale,
    t,
    setLocale,
    toggleLocale,
  }

  // Once hydrated, also write the cookie if localStorage had a value but cookie
  // was missing — keeps both stores in sync.
  useEffect(() => {
    if (!hydrated) return
    if (typeof document === 'undefined') return
    const fromCookie = readCookie(LOCALE_COOKIE)
    if (fromCookie !== locale) {
      document.cookie = `${LOCALE_COOKIE}=${locale};path=/;max-age=31536000;SameSite=Lax`
    }
  }, [hydrated, locale])

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
