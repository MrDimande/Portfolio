'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { translations, defaultLanguage, supportedLanguages } from '@/lib/translations'

const LanguageContext = createContext()

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(defaultLanguage)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Load language from localStorage or use default
    // Only access localStorage on client side
    if (typeof window !== 'undefined') {
      const savedLanguage = localStorage.getItem('portfolio-language')
      if (savedLanguage && supportedLanguages.includes(savedLanguage)) {
        setLanguage(savedLanguage)
      }
    }
    setIsLoading(false)
  }, [])

  const changeLanguage = (newLanguage) => {
    if (supportedLanguages.includes(newLanguage)) {
      setLanguage(newLanguage)
      if (typeof window !== 'undefined') {
        localStorage.setItem('portfolio-language', newLanguage)
      }
    }
  }

  const t = (key) => {
    const keys = key.split('.')
    let value = translations[language]

    for (const k of keys) {
      value = value?.[k]
    }

    return value || key
  }

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t, isLoading }}>
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

