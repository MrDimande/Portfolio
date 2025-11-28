'use client'

import { useEffect } from 'react'

export default function LanguageWrapper({ children }) {
  useEffect(() => {
    // Set HTML lang attribute to Portuguese
    if (typeof document !== 'undefined') {
      document.documentElement.lang = 'pt'
    }
  }, [])

  return <>{children}</>
}

