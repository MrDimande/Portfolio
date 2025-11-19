'use client'

import { motion } from 'framer-motion'
import { Download, FileText } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

export default function DownloadCV() {
  const { t } = useLanguage()

  const handleDownload = () => {
    // Create a link to download CV
    // Replace with actual CV file path
    const link = document.createElement('a')
    link.href = '/cv-alberto-dimande.pdf' // Add your CV file to public folder
    link.download = 'CV-Alberto-Dimande.pdf'
    link.click()
  }

  return (
    <motion.button
      onClick={handleDownload}
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
      className="flex items-center gap-3 px-6 py-3 glass-strong border border-neon-cyan rounded-lg text-neon-cyan font-semibold hover:glow-cyan transition-all group"
    >
      <div className="w-10 h-10 rounded-full glass border border-neon-cyan flex items-center justify-center group-hover:rotate-12 transition-transform">
        <FileText className="w-5 h-5" />
      </div>
      <div className="text-left">
        <div className="text-xs text-gray-400">Download</div>
        <div className="text-sm font-bold">CV / Resume</div>
      </div>
      <Download className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
    </motion.button>
  )
}

