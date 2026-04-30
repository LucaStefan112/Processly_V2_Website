import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import dict, { type Dict, type Lang } from './dict'

type Ctx = {
  lang: Lang
  setLang: (l: Lang) => void
  t: Dict
}

const I18nContext = createContext<Ctx | null>(null)

const STORAGE_KEY = 'processly.lang'

function detectInitialLang(): Lang {
  if (typeof window === 'undefined') return 'en'
  const saved = window.localStorage.getItem(STORAGE_KEY)
  if (saved === 'en' || saved === 'ro') return saved
  const nav = window.navigator.language?.toLowerCase() ?? ''
  return nav.startsWith('ro') ? 'ro' : 'en'
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(detectInitialLang)

  useEffect(() => {
    document.documentElement.lang = lang
    window.localStorage.setItem(STORAGE_KEY, lang)
  }, [lang])

  const setLang = useCallback((l: Lang) => setLangState(l), [])

  const value = useMemo<Ctx>(
    () => ({ lang, setLang, t: dict[lang] }),
    [lang, setLang],
  )

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n(): Ctx {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used within <I18nProvider>')
  return ctx
}

export function useT(): Dict {
  return useI18n().t
}
