import { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'
import { pl, en } from '../data/translations'

export type Lang = 'pl' | 'en'

const translations = { pl, en }

interface LanguageContextType {
  lang: Lang
  setLang: (l: Lang) => void
  t: typeof pl
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'pl',
  setLang: () => {},
  t: pl,
})

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('pl')
  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => useContext(LanguageContext)
