'use client'

import ExperienceCard from '@/components/ExperienceCard'
import InteractiveTimeline3D from '@/components/InteractiveTimeline3D'
import { useLanguage } from '@/contexts/LanguageContext'
import { experiences } from '@/lib/data'
import { motion } from 'framer-motion'
import { Briefcase, Clock } from 'lucide-react'

export default function ExperiencePage() {
  const { t, isLoading } = useLanguage()

  if (isLoading) {
    return (
      <div className="relative min-h-screen pt-24 sm:pt-32 pb-20 flex items-center justify-center">
        <div className="text-neon-cyan">{t('experience.loading')}</div>
      </div>
    )
  }

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
            <span className="text-neon-cyan">{t('experience.title')}</span>{' '}
            <span className="text-neon-magenta">{t('experience.subtitle')}</span>
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-neon-cyan to-neon-magenta mx-auto mb-4" />
          <p className="text-gray-400 max-w-2xl mx-auto">
            {t('experience.description')}
          </p>
        </motion.div>

        {/* Interactive 3D Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <InteractiveTimeline3D />
        </motion.div>

        {/* Traditional Timeline (Alternative View) */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <h2 className="text-2xl font-bold text-center mb-12 font-orbitron">
            <span className="text-neon-cyan">{t('experience.traditionalTimeline')}</span>{' '}
            <span className="text-neon-magenta">{t('experience.traditionalTimelineSubtitle')}</span>
          </h2>

          {/* Timeline Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-neon-cyan via-neon-magenta to-neon-blue hidden md:block" />

          {/* Experience Cards */}
          <div className="space-y-12 md:space-y-16">
            {experiences.map((experience, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative ${
                  index % 2 === 0
                    ? 'md:pr-1/2 md:pr-8'
                    : 'md:ml-1/2 md:pl-8'
                }`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-0 md:left-1/2 top-6 transform -translate-x-1/2 w-4 h-4 rounded-full bg-neon-cyan border-4 border-dark-bg z-10 hidden md:block" />

                <div className="ml-12 md:ml-0">
                  <ExperienceCard experience={experience} index={index} />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { label: t('experience.years'), value: '5+', icon: Briefcase, id: 'years' },
                { label: t('experience.completedProjects'), value: '20+', icon: Clock, id: 'projects' },
            { label: t('experience.masteredTech'), value: '15+', icon: Briefcase, id: 'tech' },
            { label: t('experience.satisfiedClients'), value: '10+', icon: Briefcase, id: 'clients' },
          ].map((stat, index) => {
            const Icon = stat.icon
            if (!Icon) return null
            return (
              <motion.div
                key={stat.id || index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="glass-strong rounded-xl p-6 border border-white/10 text-center hover:border-neon-cyan transition-all"
              >
                <div className="w-12 h-12 mx-auto mb-4 rounded-full glass border border-neon-cyan flex items-center justify-center">
                  <Icon className="w-6 h-6 text-neon-cyan" />
                </div>
                <div className="text-3xl font-bold text-neon-cyan mb-2 font-orbitron">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </div>
  )
}

