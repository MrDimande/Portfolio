'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import { motion } from 'framer-motion'
import { Briefcase, CheckCircle, Clock, Coffee, MapPin, Moon } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function StatusClock() {
  const { t } = useLanguage()
  const [currentTime, setCurrentTime] = useState(null)
  const [mounted, setMounted] = useState(false)

  // Status configuration - edit this to change your status
  const statusConfig = {
    status: 'available', // 'available', 'busy', 'break', 'offline'
    project: null, // Set project name if busy, e.g., 'Website BMC Pro'
    progress: 0, // 0-100 if busy with a project
  }

  useEffect(() => {
    setMounted(true)
    
    const updateTime = () => {
      const now = new Date()
      // Maputo time (CAT - Central Africa Time, UTC+2)
      const maputoTime = new Date(now.toLocaleString('en-US', { timeZone: 'Africa/Maputo' }))
      setCurrentTime(maputoTime)
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)

    return () => clearInterval(interval)
  }, [])

  if (!mounted || !currentTime) {
    return (
      <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full glass border border-white/10">
        <div className="w-4 h-4 rounded-full bg-gray-600 animate-pulse" />
        <span className="text-sm text-gray-500">{t('home.status.loading')}</span>
      </div>
    )
  }

  const hours = currentTime.getHours()
  const minutes = currentTime.getMinutes()
  const seconds = currentTime.getSeconds()

  // Determine time-based context
  const isNight = hours >= 22 || hours < 7
  const isLunch = hours >= 12 && hours < 14
  
  // Get status info
  const getStatusInfo = () => {
    if (statusConfig.status === 'busy' && statusConfig.project) {
      return {
        icon: Briefcase,
        text: `${t('home.status.focused')} ${statusConfig.project}`,
        color: 'neon-magenta',
        pulse: true,
      }
    }
    if (statusConfig.status === 'break' || isLunch) {
      return {
        icon: Coffee,
        text: t('home.status.break'),
        color: 'yellow-400',
        pulse: false,
      }
    }
    if (statusConfig.status === 'offline' || isNight) {
      return {
        icon: Moon,
        text: t('home.status.offline'),
        color: 'gray-400',
        pulse: false,
      }
    }
    return {
      icon: CheckCircle,
      text: t('home.status.available'),
      color: 'neon-cyan',
      pulse: true,
    }
  }

  const status = getStatusInfo()
  const StatusIcon = status.icon

  const formatTime = (num) => num.toString().padStart(2, '0')

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="inline-flex flex-col sm:flex-row items-center gap-3 px-4 py-2 rounded-xl glass-strong border border-white/10"
    >
      {/* Location & Time */}
      <div className="flex items-center gap-2">
        <MapPin className="w-3.5 h-3.5 text-neon-cyan" />
        <span className="text-[10px] text-gray-400">{t('home.status.maputo')}</span>
        <div className="flex items-center gap-1 font-mono">
          <Clock className="w-3.5 h-3.5 text-gray-500" />
          <span className="text-sm text-white font-medium">
            {formatTime(hours)}:{formatTime(minutes)}
          </span>
          <span className="text-[10px] text-gray-600">
            :{formatTime(seconds)}
          </span>
        </div>
      </div>

      {/* Divider */}
      <div className="hidden sm:block w-px h-4 bg-white/10" />
      <div className="sm:hidden w-full h-px bg-white/10" />

      {/* Status */}
      <div className="flex items-center gap-2">
        {/* Status indicator with pulse */}
        <div className="relative">
          <StatusIcon className={`w-4 h-4 text-${status.color}`} />
          {status.pulse && (
            <motion.div
              animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className={`absolute inset-0 rounded-full bg-${status.color}`}
            />
          )}
        </div>
        
        <span className={`text-xs text-${status.color}`}>
          {status.text}
        </span>
      </div>

      {/* Progress bar (if busy with project) */}
      {statusConfig.status === 'busy' && statusConfig.progress > 0 && (
        <div className="flex items-center gap-2">
          <div className="w-16 h-1.5 rounded-full bg-white/10 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${statusConfig.progress}%` }}
              className="h-full bg-gradient-to-r from-neon-cyan to-neon-magenta rounded-full"
            />
          </div>
          <span className="text-[10px] text-gray-500">{statusConfig.progress}%</span>
        </div>
      )}
    </motion.div>
  )
}
