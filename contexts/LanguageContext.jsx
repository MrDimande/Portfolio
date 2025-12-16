'use client'

import { translations } from '@/lib/translations'
import { createContext, useContext, useEffect, useState } from 'react'

const LanguageContext = createContext()

const AVAILABLE_LANGUAGES = [
  { code: 'pt-MZ', label: 'PT', name: 'Português (MZ)', flag: '🇲🇿' },
  { code: 'en-GB', label: 'EN', name: 'English (UK)', flag: '🇬🇧' },
]

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('pt-MZ')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Load language from local storage if available
    const savedLanguage = localStorage.getItem('language')
    if (savedLanguage && translations[savedLanguage]) {
      setLanguage(savedLanguage)
    }
    setIsLoading(false)
  }, [])

  const changeLanguage = (langCode) => {
    if (translations[langCode]) {
      setLanguage(langCode)
      localStorage.setItem('language', langCode)
    }
  }

  // Translation function
  const t = (key) => {
    const keys = key.split('.')
    let value = translations[language]
    
    for (const k of keys) {
      if (value === undefined) break
      value = value[k]
    }
    
    // Fallback to pt-MZ if missing
    if (!value) {
      let fallback = translations['pt-MZ']
      for (const k of keys) {
        if (fallback === undefined) break
        fallback = fallback[k]
      }
      return fallback || key
    }

    return value
  }

  const value = {
    language,
    changeLanguage,
    t,
    isLoading,
    availableLanguages: AVAILABLE_LANGUAGES
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
