'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Instagram, Users, Heart, Image as ImageIcon, MessageCircle } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

export default function InstagramStats({ username = 'mr.dimande' }) {
  const { t } = useLanguage()
  const [stats, setStats] = useState({
    followers: 0,
    following: 0,
    posts: 0,
    likes: 0,
    loading: true,
  })

  useEffect(() => {
    const fetchInstagramStats = async () => {
      try {
        const response = await fetch('/api/social/instagram', {
          next: { revalidate: 3600 }, // Revalidar a cada hora
        })
        const data = await response.json()
        
        setStats({
          followers: data.followers || 0,
          following: data.following || 0,
          posts: data.posts || 0,
          likes: data.likes || 0,
          loading: false,
        })
      } catch (error) {
        console.error('Error fetching Instagram stats:', error)
        setStats({
          followers: 250,
          following: 180,
          posts: 65,
          likes: 890,
          loading: false,
        })
      }
    }

    fetchInstagramStats()
    
    // Atualizar a cada hora
    const interval = setInterval(fetchInstagramStats, 3600000)
    return () => clearInterval(interval)
  }, [username])

  const statItems = [
    {
      label: 'Seguidores',
      value: stats.followers,
      icon: Users,
      textColor: 'text-neon-magenta',
      borderColor: 'border-neon-magenta',
    },
    {
      label: 'Seguindo',
      value: stats.following,
      icon: Users,
      textColor: 'text-neon-cyan',
      borderColor: 'border-neon-cyan',
    },
    {
      label: 'Publicações',
      value: stats.posts,
      icon: ImageIcon,
      textColor: 'text-neon-magenta',
      borderColor: 'border-neon-magenta',
    },
    {
      label: 'Curtidas',
      value: stats.likes,
      icon: Heart,
      textColor: 'text-neon-cyan',
      borderColor: 'border-neon-cyan',
    },
  ]

  return (
    <div className="glass-strong rounded-xl p-6 border border-white/10">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-full glass border border-neon-magenta flex items-center justify-center">
          <Instagram className="w-6 h-6 text-neon-magenta" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white font-orbitron">Instagram Stats</h3>
          <p className="text-sm text-gray-400">@{username}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {statItems.map((item, index) => {
          const Icon = item.icon
          return (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="glass rounded-lg p-4 border border-white/10 hover:border-neon-magenta transition-all"
            >
              <div className="flex items-center gap-3 mb-2">
                <Icon className={`w-5 h-5 ${item.textColor}`} />
                <span className="text-sm text-gray-400">{item.label}</span>
              </div>
              {stats.loading ? (
                <div className="h-8 w-16 bg-gray-700 rounded animate-pulse" />
              ) : (
                <div className={`text-2xl font-bold ${item.textColor} font-orbitron`}>
                  {item.value.toLocaleString()}
                </div>
              )}
            </motion.div>
          )
        })}
      </div>

      <motion.a
        href={`https://instagram.com/${username}`}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg glass border border-neon-magenta text-neon-magenta text-sm font-medium hover:glow-magenta transition-all"
      >
        <Instagram className="w-4 h-4" />
        Ver Perfil Completo
      </motion.a>
    </div>
  )
}

