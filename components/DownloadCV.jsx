'use client'

import { motion } from 'framer-motion'
import { Download, FileText, ExternalLink } from 'lucide-react'

const CV_URL = 'https://cv-alberto-dimande-2025.tiiny.site'

export default function DownloadCV() {
  return (
    <motion.a
      href={CV_URL}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
      className="flex items-center gap-3 px-6 py-3 glass-strong border border-neon-cyan rounded-lg text-neon-cyan font-semibold hover:glow-cyan transition-all group"
    >
      <div className="w-10 h-10 rounded-full glass border border-neon-cyan flex items-center justify-center group-hover:rotate-12 transition-transform">
        <FileText className="w-5 h-5" />
      </div>
      <div className="text-left">
        <div className="text-xs text-gray-400">Ver / Download</div>
        <div className="text-sm font-bold">CV / Resume</div>
      </div>
      <ExternalLink className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
    </motion.a>
  )
}

