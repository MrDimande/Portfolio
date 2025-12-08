'use client'

import { translations } from '@/lib/translations'
import { createContext, useContext } from 'react'

// Idioma fixo: Português de Moçambique
const FIXED_LANGUAGE = 'pt-MZ'

// Função t padrão para SSR
const defaultT = (key) => {
  const keys = key.split('.')
  let value = translations[FIXED_LANGUAGE]
  for (const k of keys) {
    value = value?.[k]
  }
  return value || key
}

// Valor padrão do contexto para evitar erros durante SSR
const defaultContextValue = {
  language: FIXED_LANGUAGE,
  t: defaultT,
  isLoading: false
}

const LanguageContext = createContext(defaultContextValue)

export function LanguageProvider({ children }) {
  return (
    <LanguageContext.Provider value={defaultContextValue}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  return context || defaultContextValue
}

