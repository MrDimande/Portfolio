'use client'

import AnalyticsDashboard from '@/components/AnalyticsDashboard'
import FacebookStats from '@/components/FacebookStats'
import GitHubStats from '@/components/GitHubStats'
import InstagramStats from '@/components/InstagramStats'
import { useLanguage } from '@/contexts/LanguageContext'
import { motion } from 'framer-motion'
import { BarChart3, Code, Globe, Layers, Map, Target } from 'lucide-react'

export default function ServicesPage() {
  const { t, language } = useLanguage()
  const { translations } = require('@/lib/translations')

  const serviceKeys = [
    { key: 'territorialPlanning', icon: Map, borderColor: 'border-neon-cyan', textColor: 'text-neon-cyan' },
    { key: 'gisAnalysis', icon: Layers, borderColor: 'border-neon-magenta', textColor: 'text-neon-magenta' },
    { key: 'webDevelopment', icon: Code, borderColor: 'border-neon-blue', textColor: 'text-neon-blue' },
    { key: 'dataVisualization', icon: BarChart3, borderColor: 'border-neon-cyan', textColor: 'text-neon-cyan' },
    { key: 'technicalConsulting', icon: Target, borderColor: 'border-neon-magenta', textColor: 'text-neon-magenta' },
    { key: 'translation', icon: Globe, borderColor: 'border-neon-blue', textColor: 'text-neon-blue' },
  ]

  const services = serviceKeys.map((service) => {
    const serviceData = translations[language]?.services?.items?.[service.key]
    return {
      ...service,
      title: serviceData?.title || t(`services.items.${service.key}.title`),
      description: serviceData?.description || t(`services.items.${service.key}.description`),
      features: serviceData?.features || [],
    }
  })

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
            <span className="text-neon-cyan">{t('services.title')}</span>{' '}
            <span className="text-neon-magenta">&</span>{' '}
            <span className="text-neon-blue">{t('services.subtitle')}</span>
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-neon-cyan to-neon-magenta mx-auto mb-4" />
          <p className="text-gray-400 max-w-2xl mx-auto">
            {t('services.description')}
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="glass-strong rounded-xl p-6 border border-white/10 hover:border-neon-cyan transition-all group"
              >
                <div className={`w-14 h-14 rounded-full glass ${service.borderColor} border flex items-center justify-center mb-4 group-hover:glow-cyan transition-all`}>
                  <Icon className={`w-7 h-7 ${service.textColor}`} />
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-neon-cyan transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                  {service.description}
                </p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-gray-400">
                      <span className={`${service.textColor} text-xs`}>▹</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )
          })}
        </div>

        {/* Social Media Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
        >
          <GitHubStats username="MrDimande" />
          <FacebookStats username="alberto.dimande" />
          <InstagramStats username="mr.dimande" />
        </motion.div>

        {/* Analytics Dashboard */}
        <AnalyticsDashboard />
      </div>
    </div>
  )
}

