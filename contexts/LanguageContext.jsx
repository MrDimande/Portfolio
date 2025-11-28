'use client'

import { translations } from '@/lib/translations'
import { createContext, useContext } from 'react'

const LanguageContext = createContext()

// Idioma fixo: Português de Moçambique
const FIXED_LANGUAGE = 'pt-MZ'

export function LanguageProvider({ children }) {
  const t = (key) => {
    const keys = key.split('.')
    let value = translations[FIXED_LANGUAGE]

    for (const k of keys) {
      value = value?.[k]
    }

    return value || key
  }

  return (
    <LanguageContext.Provider value={{ language: FIXED_LANGUAGE, t, isLoading: false }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider')
  }
  return context
}

