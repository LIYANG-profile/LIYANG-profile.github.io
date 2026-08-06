export type Locale = 'zh' | 'en'

export type LocalizedString = { zh: string; en: string }

export const LOCALE_STORAGE_KEY = 'portfolio-locale'

export function pickLocalized(
  text: LocalizedString | string,
  locale: Locale,
): string {
  if (typeof text === 'string') return text
  return text[locale]
}

export function isLocale(value: string | null | undefined): value is Locale {
  return value === 'zh' || value === 'en'
}

function localeFromQuery(): Locale | null {
  if (typeof window === 'undefined') return null
  const lang = new URLSearchParams(window.location.search).get('lang')
  return isLocale(lang) ? lang : null
}

function localeFromStorage(): Locale | null {
  if (typeof window === 'undefined') return null
  try {
    const stored = window.localStorage.getItem(LOCALE_STORAGE_KEY)
    return isLocale(stored) ? stored : null
  } catch {
    return null
  }
}

function localeFromBrowser(): Locale {
  if (typeof navigator === 'undefined') return 'zh'
  const candidates = [navigator.language, ...(navigator.languages ?? [])]
  for (const lang of candidates) {
    if (lang.toLowerCase().startsWith('zh')) return 'zh'
  }
  return 'en'
}

/** URL ?lang= → localStorage → browser language */
export function detectInitialLocale(): Locale {
  return localeFromQuery() ?? localeFromStorage() ?? localeFromBrowser()
}

export function persistLocale(locale: Locale) {
  try {
    window.localStorage.setItem(LOCALE_STORAGE_KEY, locale)
  } catch {
    // ignore quota / private mode
  }
}
