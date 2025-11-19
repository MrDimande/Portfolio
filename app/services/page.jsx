'use client'

import { motion } from 'framer-motion'
import { Map, Code, Layers, BarChart3, Globe, Zap, Target, Users } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import GitHubStats from '@/components/GitHubStats'
import AnalyticsDashboard from '@/components/AnalyticsDashboard'

export default function ServicesPage() {
  const { t } = useLanguage()

  const services = [
    {
      title: 'Planeamento Territorial',
      description: 'Desenvolvimento de planos urbanísticos estratégicos, análise territorial mediante GIS, e coordenação de projetos de desenvolvimento urbano sustentável.',
      icon: Map,
      features: ['Planos Mestres Urbanos', 'Análise GIS', 'Coordenação de Projetos', 'Consultoria'],
      borderColor: 'border-neon-cyan',
      textColor: 'text-neon-cyan',
    },
    {
      title: 'Análise GIS',
      description: 'Análise de dados geoespaciais para tomada de decisões, visualização de dados territoriais e criação de mapas interativos.',
      icon: Layers,
      features: ['ArcGIS & QGIS', 'Análise Espacial', 'Cartografia', 'Visualização de Dados'],
      borderColor: 'border-neon-magenta',
      textColor: 'text-neon-magenta',
    },
    {
      title: 'Desenvolvimento Web',
      description: 'Criação de aplicações web modernas, dashboards interativos e plataformas para gestão de projetos urbanísticos.',
      icon: Code,
      features: ['React & Next.js', 'Dashboards Interativos', 'APIs REST', 'Aplicações GIS Web'],
      borderColor: 'border-neon-blue',
      textColor: 'text-neon-blue',
    },
    {
      title: 'Visualização de Dados',
      description: 'Transformação de dados complexos em visualizações intuitivas e dashboards analíticos para stakeholders.',
      icon: BarChart3,
      features: ['Data Visualization', 'Dashboards', 'Relatórios', 'Análise de Métricas'],
      borderColor: 'border-neon-cyan',
      textColor: 'text-neon-cyan',
    },
    {
      title: 'Consultoria Técnica',
      description: 'Aconselhamento especializado em planeamento territorial, tecnologias GIS e desenvolvimento de soluções web.',
      icon: Target,
      features: ['Consultoria GIS', 'Planeamento Estratégico', 'Tecnologia', 'Soluções Personalizadas'],
      borderColor: 'border-neon-magenta',
      textColor: 'text-neon-magenta',
    },
    {
      title: 'Tradução & Localização',
      description: 'Serviços de tradução profissional e localização de conteúdo para empresas internacionais.',
      icon: Globe,
      features: ['Tradução Técnica', 'Localização', 'Multilíngue', 'Mediação Cultural'],
      borderColor: 'border-neon-blue',
      textColor: 'text-neon-blue',
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
            <span className="text-neon-cyan">Serviços</span>{' '}
            <span className="text-neon-magenta">&</span>{' '}
            <span className="text-neon-blue">Soluções</span>
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-neon-cyan to-neon-magenta mx-auto mb-4" />
          <p className="text-gray-400 max-w-2xl mx-auto">
            Soluções especializadas em planeamento territorial, GIS e desenvolvimento web
            para transformar a visão urbana em realidade.
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

        {/* GitHub Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-md mx-auto mb-16"
        >
          <GitHubStats username="MrDimande" />
        </motion.div>

        {/* Analytics Dashboard */}
        <AnalyticsDashboard />
      </div>
    </div>
  )
}

