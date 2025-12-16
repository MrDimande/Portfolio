'use client'

import { getFestiveSeason } from '@/lib/utils'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function FestiveLogoEffect({ children }) {
  const [festiveSeason, setFestiveSeason] = useState(null)
  const [particles, setParticles] = useState([])

  useEffect(() => {
    const season = getFestiveSeason()
    setFestiveSeason(season)

    if (season) {
      // Criar partículas animadas baseadas na época festiva
      const newParticles = Array.from({ length: 8 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 2,
        size: Math.random() * 4 + 2,
      }))
      setParticles(newParticles)
    }
  }, [])

  if (!festiveSeason) return children

  const getParticleColor = () => {
    switch (festiveSeason.season) {
      case 'christmas':
        return 'rgba(255, 0, 0, 0.8)' // Vermelho
      case 'newyear':
        return 'rgba(255, 215, 0, 0.8)' // Dourado
      case 'easter':
        return 'rgba(255, 192, 203, 0.8)' // Rosa
      case 'halloween':
        return 'rgba(255, 140, 0, 0.8)' // Laranja
      default:
        return 'rgba(255, 255, 255, 0.8)'
    }
  }

  const getGlowColor = () => {
    switch (festiveSeason.season) {
      case 'christmas':
        return 'rgba(255, 0, 0, 0.5)'
      case 'newyear':
        return 'rgba(255, 215, 0, 0.5)'
      case 'easter':
        return 'rgba(255, 192, 203, 0.5)'
      case 'halloween':
        return 'rgba(255, 140, 0, 0.5)'
      default:
        return 'rgba(255, 255, 255, 0.5)'
    }
  }

  return (
    <div className="relative inline-block">
      {children}
      
      {/* Efeito de brilho ao redor do logo */}
      <motion.div
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${getGlowColor()} 0%, transparent 70%)`,
          filter: 'blur(8px)',
          zIndex: -1,
        }}
        animate={{
          opacity: [0.3, 0.6, 0.3],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Decoração principal com animação 3D */}
      <motion.div
        className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 text-2xl sm:text-3xl pointer-events-none"
        initial={{ opacity: 0, scale: 0, rotate: -180 }}
        animate={{ 
          opacity: 1, 
          scale: 1, 
          rotate: 0,
        }}
        transition={{ 
          type: "spring",
          stiffness: 500,
          damping: 20,
          delay: 0.2,
        }}
        style={{ 
          filter: 'drop-shadow(0 0 12px rgba(255, 255, 255, 0.8))',
          zIndex: 10,
        }}
      >
        <motion.span
          animate={{ 
            rotate: [0, 10, -10, 0],
            y: [0, -5, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {festiveSeason.decoration}
        </motion.span>
      </motion.div>

      {/* Partículas flutuantes */}
      <AnimatePresence>
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full pointer-events-none"
            style={{
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              background: getParticleColor(),
              boxShadow: `0 0 ${particle.size * 2}px ${getParticleColor()}`,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
              y: [0, -30, -60],
              x: [0, Math.random() * 20 - 10, Math.random() * 40 - 20],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: particle.delay,
              ease: 'easeOut',
            }}
          />
        ))}
      </AnimatePresence>

      {/* Efeito de raios/estrelas (especialmente para Natal) */}
      {festiveSeason.season === 'christmas' && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {Array.from({ length: 6 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                width: '2px',
                height: '20px',
                background: 'linear-gradient(to bottom, transparent, rgba(255, 255, 255, 0.8), transparent)',
                left: `${20 + i * 15}%`,
                top: '50%',
                transformOrigin: 'center',
              }}
              animate={{
                rotate: [0, 360],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.3,
                ease: 'linear',
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}

