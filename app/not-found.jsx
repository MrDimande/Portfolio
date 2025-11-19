'use client'

import { motion } from 'framer-motion'
import { Home, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'

export default function NotFound() {
  const { t } = useLanguage()

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h1
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-9xl font-orbitron font-bold mb-4"
          >
            <span className="text-neon-cyan">4</span>
            <span className="text-neon-magenta">0</span>
            <span className="text-neon-cyan">4</span>
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-3xl sm:text-4xl font-orbitron font-bold mb-4 text-white"
          >
            Página Não Encontrada
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-gray-400 mb-8 max-w-md mx-auto"
          >
            A página que procuras não existe ou foi movida. Volta à página inicial para continuar a navegação.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link href="/">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 glass-strong border border-neon-cyan rounded-lg text-neon-cyan font-semibold hover:glow-cyan transition-all flex items-center gap-2"
              >
                <Home className="w-5 h-5" />
                Voltar ao Início
              </motion.button>
            </Link>

            <motion.button
              onClick={() => window.history.back()}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 glass-strong border border-neon-magenta rounded-lg text-neon-magenta font-semibold hover:glow-magenta transition-all flex items-center gap-2"
            >
              <ArrowLeft className="w-5 h-5" />
              Voltar
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

