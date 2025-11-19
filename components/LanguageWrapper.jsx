'use client'

import { useEffect } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'

export default function LanguageWrapper({ children }) {
  const { language } = useLanguage()

  useEffect(() => {
    // Update HTML lang attribute based on selected language
    const htmlElement = document.documentElement
    const langMap = {
      'pt-MZ': 'pt',
      'en': 'en',
      'es': 'es',
    }
    htmlElement.lang = langMap[language] || 'pt'
  }, [language])

  return <>{children}</>
}

