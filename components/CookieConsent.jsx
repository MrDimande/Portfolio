'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import { AnimatePresence, motion } from 'framer-motion'
import { Cookie, X } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false)
  const { t } = useLanguage()

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('cookie_consent')
    if (consent === null) {
      // Small delay to not overwhelm user immediately
      const timer = setTimeout(() => setIsVisible(true), 1000)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem('cookie_consent', 'true')
    setIsVisible(false)
  }

  const handleDecline = () => {
    localStorage.setItem('cookie_consent', 'false')
    setIsVisible(false)
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
        >
          <div className="max-w-4xl mx-auto glass-strong border border-neon-cyan/30 rounded-2xl p-6 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 backdrop-blur-xl bg-dark-bg/90">
            <div className="flex items-start gap-4 flex-1">
              <div className="p-3 rounded-full glass border border-neon-cyan/20 bg-neon-cyan/10 shrink-0">
                <Cookie className="w-6 h-6 text-neon-cyan" />
              </div>
              <div className="space-y-2">
                <p className="text-gray-200 text-sm leading-relaxed">
                  {t('cookies.message')}{' '}
                  <Link href="/privacy" className="text-neon-cyan hover:underline decoration-neon-cyan/50 underline-offset-4">
                    {t('cookies.learnMore')}
                  </Link>
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
              <button
                onClick={handleDecline}
                className="flex-1 md:flex-none px-6 py-2.5 rounded-xl border border-white/10 hover:bg-white/5 text-gray-300 text-sm font-medium transition-colors"
              >
                {t('cookies.decline')}
              </button>
              <button
                onClick={handleAccept}
                className="flex-1 md:flex-none px-6 py-2.5 rounded-xl bg-gradient-to-r from-neon-cyan to-neon-blue text-dark-bg text-sm font-bold hover:shadow-lg hover:shadow-neon-cyan/20 transition-all transform hover:scale-105"
              >
                {t('cookies.accept')}
              </button>
            </div>
            
            <button 
              onClick={handleDecline}
              className="absolute top-4 right-4 md:hidden text-gray-500 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
