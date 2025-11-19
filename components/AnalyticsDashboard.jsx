'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { BarChart3, TrendingUp, Users, Eye, MousePointerClick, Clock, Globe, Zap } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

export default function AnalyticsDashboard() {
  const { t } = useLanguage()
  const [analytics, setAnalytics] = useState({
    pageViews: 0,
    uniqueVisitors: 0,
    avgTimeOnSite: 0,
    bounceRate: 0,
    topPages: [],
    deviceTypes: [],
    loading: true,
  })

  useEffect(() => {
    // Simulate analytics data (replace with actual analytics API)
    const loadAnalytics = () => {
      // In a real app, fetch from Google Analytics, Plausible, or your own API
      setTimeout(() => {
        setAnalytics({
          pageViews: 1247,
          uniqueVisitors: 892,
          avgTimeOnSite: 245, // seconds
          bounceRate: 32.5,
          topPages: [
            { name: 'Home', views: 456, color: 'neon-cyan' },
            { name: 'Projects', views: 312, color: 'neon-magenta' },
            { name: 'About', views: 289, color: 'neon-blue' },
            { name: 'Contact', views: 190, color: 'neon-cyan' },
          ],
          deviceTypes: [
            { type: 'Desktop', percentage: 65, color: 'neon-cyan' },
            { type: 'Mobile', percentage: 28, color: 'neon-magenta' },
            { type: 'Tablet', percentage: 7, color: 'neon-blue' },
          ],
          loading: false,
        })
      }, 1000)
    }

    loadAnalytics()
  }, [])

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}m ${secs}s`
  }

  const statCards = [
    {
      label: 'Visualizações',
      value: analytics.pageViews.toLocaleString(),
      icon: Eye,
      color: 'neon-cyan',
      trend: '+12%',
    },
    {
      label: 'Visitantes Únicos',
      value: analytics.uniqueVisitors.toLocaleString(),
      icon: Users,
      color: 'neon-magenta',
      trend: '+8%',
    },
    {
      label: 'Tempo Médio',
      value: formatTime(analytics.avgTimeOnSite),
      icon: Clock,
      color: 'neon-blue',
      trend: '+5%',
    },
    {
      label: 'Taxa de Rejeição',
      value: `${analytics.bounceRate}%`,
      icon: TrendingUp,
      color: 'neon-cyan',
      trend: '-3%',
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
          <BarChart3 className="w-8 h-8 text-neon-cyan" />
          <h2 className="text-3xl sm:text-4xl font-bold font-orbitron">
            <span className="text-neon-cyan">Analytics</span>{' '}
            <span className="text-neon-magenta">&</span>{' '}
            <span className="text-neon-blue">Estatísticas</span>
          </h2>
          <Zap className="w-8 h-8 text-neon-magenta" />
        </motion.div>
        <div className="w-32 h-1 bg-gradient-to-r from-neon-cyan via-neon-magenta to-neon-blue mx-auto mb-4" />
        <p className="text-gray-400 text-sm">Dados em tempo real do portfolio</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, index) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="glass-strong rounded-xl p-6 border border-white/10 hover:border-neon-cyan transition-all group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/0 via-neon-cyan/0 to-neon-magenta/0 group-hover:from-neon-cyan/10 group-hover:via-neon-magenta/5 group-hover:to-neon-blue/10 transition-all pointer-events-none" />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-full glass border flex items-center justify-center group-hover:glow-cyan transition-all ${
                    stat.color === 'neon-cyan' ? 'border-neon-cyan' :
                    stat.color === 'neon-magenta' ? 'border-neon-magenta' :
                    'border-neon-blue'
                  }`}>
                    <Icon className={`w-6 h-6 ${
                      stat.color === 'neon-cyan' ? 'text-neon-cyan' :
                      stat.color === 'neon-magenta' ? 'text-neon-magenta' :
                      'text-neon-blue'
                    }`} />
                  </div>
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                    className="text-xs px-2 py-1 rounded-full glass border border-green-500/30 text-green-400"
                  >
                    {stat.trend}
                  </motion.span>
                </div>
                {analytics.loading ? (
                  <div className="h-8 w-24 bg-gray-700 rounded animate-pulse" />
                ) : (
                  <>
                    <div className={`text-3xl font-bold mb-1 font-orbitron ${
                      stat.color === 'neon-cyan' ? 'text-neon-cyan' :
                      stat.color === 'neon-magenta' ? 'text-neon-magenta' :
                      'text-neon-blue'
                    }`}>
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                  </>
                )}
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Pages */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-strong rounded-xl p-6 border border-white/10"
        >
          <h3 className="text-xl font-bold text-white mb-6 font-orbitron flex items-center gap-2">
            <MousePointerClick className="w-5 h-5 text-neon-cyan" />
            Páginas Mais Visitadas
          </h3>
          <div className="space-y-4">
            {analytics.topPages.map((page, index) => (
              <motion.div
                key={page.name}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="space-y-2"
              >
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-300 font-medium">{page.name}</span>
                  <span className={`font-bold ${
                    page.color === 'neon-cyan' ? 'text-neon-cyan' :
                    page.color === 'neon-magenta' ? 'text-neon-magenta' :
                    'text-neon-blue'
                  }`}>{page.views}</span>
                </div>
                <div className="h-2 bg-dark-card rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${(page.views / analytics.topPages[0].views) * 100}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
                    className={`h-full ${
                      page.color === 'neon-cyan' ? 'bg-gradient-to-r from-neon-cyan to-neon-magenta' :
                      page.color === 'neon-magenta' ? 'bg-gradient-to-r from-neon-magenta to-neon-blue' :
                      'bg-gradient-to-r from-neon-blue to-neon-cyan'
                    }`}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Device Types */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-strong rounded-xl p-6 border border-white/10"
        >
          <h3 className="text-xl font-bold text-white mb-6 font-orbitron flex items-center gap-2">
            <Globe className="w-5 h-5 text-neon-magenta" />
            Tipos de Dispositivos
          </h3>
          <div className="space-y-4">
            {analytics.deviceTypes.map((device, index) => (
              <motion.div
                key={device.type}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="space-y-2"
              >
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-300 font-medium">{device.type}</span>
                  <span className={`font-bold ${
                    device.color === 'neon-cyan' ? 'text-neon-cyan' :
                    device.color === 'neon-magenta' ? 'text-neon-magenta' :
                    'text-neon-blue'
                  }`}>{device.percentage}%</span>
                </div>
                <div className="h-2 bg-dark-card rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${device.percentage}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
                    className={`h-full ${
                      device.color === 'neon-cyan' ? 'bg-gradient-to-r from-neon-cyan to-neon-magenta' :
                      device.color === 'neon-magenta' ? 'bg-gradient-to-r from-neon-magenta to-neon-blue' :
                      'bg-gradient-to-r from-neon-blue to-neon-cyan'
                    }`}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

