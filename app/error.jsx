'use client'

import { motion } from 'framer-motion'
import { AlertCircle } from 'lucide-react'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default function Error({ error, reset }) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-lg mx-auto"
        >
          <AlertCircle className="w-20 h-20 text-neon-cyan mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-white mb-4 font-orbitron">
            Algo deu errado!
          </h2>
          <p className="text-gray-400 mb-8">
            {error?.message || 'Ocorreu um erro inesperado'}
          </p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => reset()}
              className="px-6 py-3 glass-strong border border-neon-cyan rounded-lg text-neon-cyan font-semibold hover:glow-cyan transition-all"
            >
              Tentar novamente
            </button>
            <Link
              href="/"
              className="px-6 py-3 glass-strong border border-neon-magenta rounded-lg text-neon-magenta font-semibold hover:glow-magenta transition-all"
            >
              Voltar ao in\u00edcio
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
