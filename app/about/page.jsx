'use client'

import { motion } from 'framer-motion'
import { MapPin, Target, Lightbulb, Code2, Layers, Globe } from 'lucide-react'
import { skills } from '@/lib/data'
import HobbiesSection from '@/components/HobbiesSection'
import EntrepreneurshipSection from '@/components/EntrepreneurshipSection'
import CertificationsSection from '@/components/CertificationsSection'
import TestimonialsSection from '@/components/TestimonialsSection'
import DownloadCV from '@/components/DownloadCV'
import RevealOnScroll from '@/components/RevealOnScroll'
import { useLanguage } from '@/contexts/LanguageContext'

export default function AboutPage() {
  const { t } = useLanguage()

  const skillCategories = [
    {
      title: t('about.gisMapping'),
      icon: Layers,
      skills: skills.gis,
      color: 'cyan',
      borderClass: 'border-neon-cyan',
      textClass: 'text-neon-cyan',
    },
    {
      title: t('about.webDevelopment'),
      icon: Code2,
      skills: skills.web,
      color: 'magenta',
      borderClass: 'border-neon-magenta',
      textClass: 'text-neon-magenta',
    },
    {
      title: t('about.urbanPlanning'),
      icon: Target,
      skills: skills.planning,
      color: 'blue',
      borderClass: 'border-neon-blue',
      textClass: 'text-neon-blue',
    },
    {
      title: t('about.languages'),
      icon: Globe,
      skills: skills.languages,
      color: 'cyan',
      borderClass: 'border-neon-cyan',
      textClass: 'text-neon-cyan',
    },
  ]

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
            <span className="text-neon-cyan">{t('about.title')}</span>
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-neon-cyan to-neon-magenta mx-auto" />
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Profile Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1"
          >
            <div className="glass-strong rounded-2xl p-8 border border-white/10 sticky top-24">
              <div className="w-32 h-32 mx-auto mb-6 rounded-full glass border-2 border-neon-cyan flex items-center justify-center overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-neon-cyan/20 to-neon-magenta/20 flex items-center justify-center">
                  <span className="text-4xl font-bold text-neon-cyan">AD</span>
                </div>
              </div>
              <h2 className="text-2xl font-bold text-center mb-2 font-orbitron">
                <span className="text-neon-cyan">Alberto</span>{' '}
                <span className="text-neon-magenta">Dimande</span>
              </h2>
              <p className="text-center text-gray-400 mb-6">
                Planificador Territorial Futurista
              </p>
              <div className="flex items-center justify-center gap-2 text-gray-400 text-sm mb-6">
                <MapPin className="w-4 h-4" />
                <span>Maputo, Mozambique</span>
              </div>
              <DownloadCV />
            </div>
          </motion.div>

          {/* About Text */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 space-y-6"
          >
            <div className="glass-strong rounded-2xl p-8 border border-white/10">
              <p className="text-gray-300 leading-relaxed mb-4">
                {t('about.intro')}
              </p>
              <p className="text-gray-300 leading-relaxed mb-4">
                {t('about.background')}
              </p>
              <p className="text-gray-300 leading-relaxed">
                {t('about.approach')}
              </p>
            </div>

            <div className="glass-strong rounded-2xl p-8 border border-white/10">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-full glass border border-neon-magenta flex items-center justify-center flex-shrink-0">
                  <Lightbulb className="w-6 h-6 text-neon-magenta" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">{t('about.visionTitle')}</h3>
                  <p className="text-gray-300 leading-relaxed">
                    {t('about.vision')}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Skills Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-center mb-12 font-orbitron">
            <span className="text-neon-cyan">{t('about.skills')}</span>{' '}
            <span className="text-neon-magenta">&</span>{' '}
            <span className="text-neon-blue">{t('about.technologies')}</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {skillCategories.map((category, index) => {
              const Icon = category.icon
              return (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="glass-strong rounded-xl p-6 border border-white/10 hover:border-neon-cyan transition-all"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`w-12 h-12 rounded-full glass ${category.borderClass} flex items-center justify-center`}>
                      <Icon className={`w-6 h-6 ${category.textClass}`} />
                    </div>
                    <h3 className="text-xl font-bold text-white">{category.title}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className={`px-3 py-1 rounded-full text-sm glass ${category.borderClass}/30 ${category.textClass}`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Entrepreneurship Section */}
        <EntrepreneurshipSection />

        {/* Certifications Section */}
        <CertificationsSection />

        {/* Hobbies Section */}
        <HobbiesSection />

        {/* Testimonials Section */}
        <TestimonialsSection />
      </div>
    </div>
  )
}

