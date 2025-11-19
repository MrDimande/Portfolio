'use client'

import { motion } from 'framer-motion'
import { Award, ExternalLink } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

export default function CertificationsSection() {
  const { t } = useLanguage()

  const certifications = [
    {
      name: 'Certificação ArcGIS',
      issuer: 'ESRI',
      year: '2021',
      description: 'Especialização em Sistemas de Informação Geográfica',
      color: 'neon-cyan',
    },
    {
      name: 'QGIS Advanced',
      issuer: 'QGIS Organization',
      year: '2020',
      description: 'Análise Espacial Avançada e Cartografia Digital',
      color: 'neon-magenta',
    },
    {
      name: 'Web Development',
      issuer: 'Online Platform',
      year: '2022',
      description: 'React, Next.js e Desenvolvimento Full-Stack',
      color: 'neon-blue',
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="mt-16"
    >
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-center gap-4 mb-4"
        >
          <Award className="w-8 h-8 text-neon-cyan" />
          <h2 className="text-3xl sm:text-4xl font-bold font-orbitron">
            <span className="text-neon-cyan">Certificações</span>{' '}
            <span className="text-neon-magenta">&</span>{' '}
            <span className="text-neon-blue">Qualificações</span>
          </h2>
          <Award className="w-8 h-8 text-neon-magenta" />
        </motion.div>
        <div className="w-32 h-1 bg-gradient-to-r from-neon-cyan via-neon-magenta to-neon-blue mx-auto mb-4" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {certifications.map((cert, index) => (
          <motion.div
            key={cert.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.05, y: -5, rotateY: 5 }}
            className="glass-strong rounded-xl p-6 border border-white/10 hover:border-neon-cyan transition-all group relative overflow-hidden"
          >
            {/* Glow effect on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/0 via-neon-cyan/0 to-neon-magenta/0 group-hover:from-neon-cyan/10 group-hover:via-neon-magenta/5 group-hover:to-neon-blue/10 transition-all pointer-events-none" />

            <div className="relative z-10">
              <div className={`w-16 h-16 mx-auto mb-4 rounded-full glass border border-${cert.color} flex items-center justify-center group-hover:glow-cyan transition-all`}>
                <Award className={`w-8 h-8 text-${cert.color}`} />
              </div>
              <h3 className="text-xl font-bold text-center text-white mb-2 group-hover:text-neon-cyan transition-colors">
                {cert.name}
              </h3>
              <p className="text-center text-neon-magenta text-sm font-medium mb-2">
                {cert.issuer} • {cert.year}
              </p>
              <p className="text-center text-gray-400 text-sm leading-relaxed">
                {cert.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

