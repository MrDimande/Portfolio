'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

export default function LanguageSwitcher() {
  const { language, changeLanguage, availableLanguages } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  const currentLang = availableLanguages.find(l => l.code === language) || availableLanguages[0]

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="relative" ref={dropdownRef}>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg glass border border-white/10 hover:border-neon-cyan transition-all group"
      >
        <span className="text-lg">{currentLang.flag}</span>
        <span className="text-sm font-medium text-gray-300 group-hover:text-white uppercase">
          {currentLang.label}
        </span>
        <ChevronDown className={`w-3 h-3 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full right-0 mt-2 w-48 rounded-xl glass-strong border border-white/20 overflow-hidden shadow-xl shadow-black/50 z-50"
          >
            <div className="p-1">
              {availableLanguages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    changeLanguage(lang.code)
                    setIsOpen(false)
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${
                    language === lang.code
                      ? 'bg-neon-cyan/20 text-white'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span className="text-xl">{lang.flag}</span>
                  <div className="flex flex-col items-start">
                    <span className="text-sm font-medium">{lang.label}</span>
                    <span className="text-[10px] opacity-70">{lang.name}</span>
                  </div>
                  {language === lang.code && (
                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-neon-cyan shadow-[0_0_10px_rgba(0,255,255,0.8)]" />
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
