'use client'

import { motion } from 'framer-motion'
import { ExternalLink, Briefcase, Calendar } from 'lucide-react'
import Link from 'next/link'

export default function CompanyCard({ name, role, period, description, skills = [], link, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      whileHover={{ scale: 1.02, y: -5 }}
      className="glass-strong rounded-xl p-6 border border-white/10 hover:border-neon-cyan transition-all group"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-full glass border border-neon-cyan flex items-center justify-center group-hover:glow-cyan transition-all">
              <Briefcase className="w-6 h-6 text-neon-cyan" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white group-hover:text-neon-cyan transition-colors font-orbitron">
                {name}
              </h3>
              <p className="text-sm text-neon-magenta font-medium">{role}</p>
            </div>
          </div>
        </div>
        {link && (
          <Link href={link} target="_blank" rel="noopener noreferrer">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 45 }}
              whileTap={{ scale: 0.9 }}
              className="w-10 h-10 rounded-full glass border border-neon-cyan flex items-center justify-center hover:glow-cyan transition-all"
            >
              <ExternalLink className="w-5 h-5 text-neon-cyan" />
            </motion.div>
          </Link>
        )}
      </div>

      {/* Period */}
      <div className="flex items-center gap-2 mb-4 text-gray-400 text-sm">
        <Calendar className="w-4 h-4 text-neon-magenta" />
        <span>{period}</span>
      </div>

      {/* Description */}
      <p className="text-gray-300 leading-relaxed mb-4">
        {description}
      </p>

      {/* Skills */}
      {skills && skills.length > 0 && (
        <div className="mt-4 pt-4 border-t border-white/10">
          <p className="text-xs text-gray-400 mb-3 uppercase tracking-wide">Soft Skills</p>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, idx) => (
              <motion.span
                key={idx}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 + idx * 0.05 }}
                whileHover={{ scale: 1.1 }}
                className="px-3 py-1.5 rounded-full text-xs glass border border-neon-cyan/30 text-neon-cyan hover:glow-cyan transition-all cursor-default"
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  )
}

