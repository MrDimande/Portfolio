'use client'

import { getSoundEffects } from '@/lib/soundEffects'
import { motion } from 'framer-motion'
import { Calendar, Download, ExternalLink, Eye, FileText, Tag, Users } from 'lucide-react'
import Link from 'next/link'

export default function PublicationCard({ publication, index }) {
  const handleClick = () => {
    getSoundEffects()?.playClick()
  }

  const getColorClasses = (color) => {
    switch (color) {
      case 'neon-cyan':
        return {
          border: 'border-neon-cyan',
          text: 'text-neon-cyan',
          bg: 'bg-neon-cyan/10',
        }
      case 'neon-magenta':
        return {
          border: 'border-neon-magenta',
          text: 'text-neon-magenta',
          bg: 'bg-neon-magenta/10',
        }
      case 'neon-blue':
        return {
          border: 'border-neon-blue',
          text: 'text-neon-blue',
          bg: 'bg-neon-blue/10',
        }
      default:
        return {
          border: 'border-neon-cyan',
          text: 'text-neon-cyan',
          bg: 'bg-neon-cyan/10',
        }
    }
  }

  const colors = getColorClasses(publication.color)

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.02, y: -5 }}
      className="glass-strong rounded-xl p-6 border border-white/10 hover:border-neon-cyan transition-all group relative overflow-hidden"
    >
      {/* Gradient overlay on hover */}
      <div className={`absolute inset-0 transition-all pointer-events-none ${
        publication.color === 'neon-cyan'
          ? 'bg-gradient-to-br from-neon-cyan/0 via-neon-cyan/0 to-neon-cyan/0 group-hover:from-neon-cyan/10 group-hover:via-neon-cyan/5 group-hover:to-neon-cyan/10'
          : publication.color === 'neon-magenta'
          ? 'bg-gradient-to-br from-neon-magenta/0 via-neon-magenta/0 to-neon-magenta/0 group-hover:from-neon-magenta/10 group-hover:via-neon-magenta/5 group-hover:to-neon-magenta/10'
          : 'bg-gradient-to-br from-neon-blue/0 via-neon-blue/0 to-neon-blue/0 group-hover:from-neon-blue/10 group-hover:via-neon-blue/5 group-hover:to-neon-blue/10'
      }`} />

      <div className="relative z-10">
        {/* Type Badge */}
        <div className="flex items-center justify-between mb-4">
          <span className={`px-3 py-1 rounded-full text-xs font-medium glass border ${colors.border} ${colors.text}`}>
            {publication.type}
          </span>
          <div className={`w-12 h-12 rounded-full glass ${colors.border} border flex items-center justify-center group-hover:glow-cyan transition-all`}>
            <FileText className={`w-6 h-6 ${colors.text}`} />
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-neon-cyan transition-colors line-clamp-2">
          {publication.title}
        </h3>

        {/* Journal & Year */}
        <div className="flex items-center gap-4 mb-3 text-sm text-gray-400">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            <span className="italic">{publication.journal}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>{publication.year}</span>
          </div>
        </div>

        {/* Authors */}
        <div className="flex items-center gap-2 mb-4 text-sm text-gray-300">
          <Users className="w-4 h-4 text-neon-magenta" />
          <span>{publication.authors.join(', ')}</span>
        </div>

        {/* Description */}
        <p className="text-gray-400 text-sm mb-4 leading-relaxed line-clamp-3">
          {publication.description}
        </p>

        {/* Topics */}
        <div className="flex flex-wrap gap-2 mb-4">
          {publication.topics.map((topic, idx) => (
            <span
              key={idx}
              className="px-2 py-1 rounded text-xs glass border border-white/10 text-gray-400 flex items-center gap-1"
            >
              <Tag className="w-3 h-3" />
              {topic}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-4 border-t border-white/10">
          {/* Read Article Button - Primary Action */}
          <Link
            href={`/publications/${publication.slug}`}
            onClick={handleClick}
            className="flex-1"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg glass border border-neon-cyan text-neon-cyan text-sm font-medium hover:glow-cyan transition-all"
            >
              <Eye className="w-4 h-4" />
              Ler Artigo
            </motion.button>
          </Link>
          {publication.link && (
            <Link
              href={publication.link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleClick}
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-3 py-2 rounded-lg glass border border-white/10 text-gray-300 text-sm font-medium hover:border-neon-magenta hover:text-neon-magenta transition-all"
              >
                <ExternalLink className="w-4 h-4" />
              </motion.button>
            </Link>
          )}
          {publication.pdfUrl && (
            <Link
              href={publication.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleClick}
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-3 py-2 rounded-lg glass border border-white/10 text-gray-300 text-sm font-medium hover:border-neon-magenta hover:text-neon-magenta transition-all"
              >
                <Download className="w-4 h-4" />
              </motion.button>
            </Link>
          )}
        </div>

        {/* Citation (on hover) */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          whileHover={{ opacity: 1, height: 'auto' }}
          className="mt-4 pt-4 border-t border-white/10 overflow-hidden"
        >
          <p className="text-xs text-gray-500 italic leading-relaxed">
            {publication.citation}
          </p>
        </motion.div>
      </div>
    </motion.div>
  )
}

