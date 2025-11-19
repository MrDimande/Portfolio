'use client'

import { motion } from 'framer-motion'
import { Mail, MessageSquare } from 'lucide-react'
import ContactForm from '@/components/ContactForm'
import CalendlyWidget from '@/components/CalendlyWidget'
import { useLanguage } from '@/contexts/LanguageContext'

export default function ContactPage() {
  const { t } = useLanguage()
  return (
    <div className="relative min-h-screen pt-24 sm:pt-32 pb-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-orbitron font-bold mb-4">
            <span className="text-neon-cyan">{t('contact.title')}</span>
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-neon-cyan to-neon-magenta mx-auto mb-4" />
          <p className="text-gray-400 max-w-2xl mx-auto">
            {t('contact.description')}
          </p>
        </motion.div>

            {/* Calendly Widget */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-center mb-12"
            >
              <CalendlyWidget />
            </motion.div>

            {/* Contact Form Section */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <ContactForm />
            </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div className="glass-strong rounded-xl p-6 border border-white/10">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full glass border border-neon-cyan flex items-center justify-center">
                <Mail className="w-6 h-6 text-neon-cyan" />
              </div>
              <h3 className="text-xl font-bold text-white">{t('contact.quickResponse')}</h3>
            </div>
            <p className="text-gray-400">
              {t('contact.quickResponseDesc')}
            </p>
          </div>

          <div className="glass-strong rounded-xl p-6 border border-white/10">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full glass border border-neon-magenta flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-neon-magenta" />
              </div>
              <h3 className="text-xl font-bold text-white">{t('contact.collaborations')}</h3>
            </div>
            <p className="text-gray-400">
              {t('contact.collaborationsDesc')}
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

