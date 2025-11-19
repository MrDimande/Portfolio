'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Briefcase, Calendar, MapPin, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react'
import { experiences } from '@/lib/data'
import { useLanguage } from '@/contexts/LanguageContext'
import { getSoundEffects } from '@/lib/soundEffects'

export default function InteractiveTimeline3D() {
  const { t } = useLanguage()
  const [activeIndex, setActiveIndex] = useState(0)
  const [is3DMode, setIs3DMode] = useState(true)
  const containerRef = useRef(null)

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % experiences.length)
    getSoundEffects()?.playSwipe()
  }

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + experiences.length) % experiences.length)
    getSoundEffects()?.playSwipe()
  }

  const handleCardClick = (index) => {
    setActiveIndex(index)
    getSoundEffects()?.playClick()
  }

  // Auto-rotate on hover
  useEffect(() => {
    if (!is3DMode || !containerRef.current) return

    const container = containerRef.current
    let animationFrame = null
    let rotationY = 0

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const mouseX = e.clientX
      const deltaX = mouseX - centerX
      rotationY = (deltaX / rect.width) * 20 // Max 20 degrees rotation
    }

    const animate = () => {
      const cards = container.querySelectorAll('[data-timeline-card]')
      cards.forEach((card, index) => {
        const angle = (360 / experiences.length) * index + rotationY
        const radius = 300
        const x = Math.sin((angle * Math.PI) / 180) * radius
        const z = Math.cos((angle * Math.PI) / 180) * radius
        const opacity = Math.abs(z) / radius

        card.style.transform = `translateX(${x}px) translateZ(${z}px) rotateY(${-angle}deg)`
        card.style.opacity = Math.max(0.3, opacity)
        card.style.zIndex = Math.round(z)
      })
      animationFrame = requestAnimationFrame(animate)
    }

    container.addEventListener('mousemove', handleMouseMove)
    animate()

    return () => {
      container.removeEventListener('mousemove', handleMouseMove)
      if (animationFrame) cancelAnimationFrame(animationFrame)
    }
  }, [is3DMode])

  return (
    <div className="relative">
      {/* 3D Mode Toggle */}
      <div className="flex justify-center mb-8">
        <motion.button
          onClick={() => {
            setIs3DMode(!is3DMode)
            getSoundEffects()?.playClick()
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-3 glass-strong border border-neon-cyan rounded-lg text-neon-cyan font-semibold hover:glow-cyan transition-all flex items-center gap-2"
        >
          <span>{is3DMode ? 'Modo 2D' : 'Modo 3D'}</span>
        </motion.button>
      </div>

      {/* Timeline Container */}
      <div
        ref={containerRef}
        className={`relative h-[600px] perspective-1000 ${is3DMode ? 'preserve-3d' : ''}`}
        style={{
          perspective: is3DMode ? '1000px' : 'none',
        }}
      >
        {experiences.map((experience, index) => {
          const isActive = index === activeIndex
          const position = is3DMode
            ? {
                x: Math.sin((360 / experiences.length) * index * (Math.PI / 180)) * 300,
                z: Math.cos((360 / experiences.length) * index * (Math.PI / 180)) * 300,
                rotationY: (360 / experiences.length) * index,
              }
            : {
                x: (index - activeIndex) * 400,
                z: 0,
                rotationY: 0,
              }

          return (
            <motion.div
              key={index}
              data-timeline-card
              initial={false}
              animate={{
                x: is3DMode ? position.x : position.x,
                z: is3DMode ? position.z : 0,
                rotateY: is3DMode ? -position.rotationY : 0,
                scale: isActive ? 1.1 : is3DMode ? 0.8 : 0.9,
                opacity: isActive ? 1 : is3DMode ? 0.5 : 0.7,
              }}
              transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
              onClick={() => handleCardClick(index)}
              className="absolute top-1/2 left-1/2 w-80 cursor-pointer"
              style={{
                transformStyle: is3DMode ? 'preserve-3d' : 'flat',
                transformOrigin: 'center center',
                marginLeft: '-160px',
                marginTop: '-200px',
              }}
            >
              <motion.div
                whileHover={{ y: -10, scale: 1.05 }}
                className={`glass-strong rounded-xl p-6 border transition-all ${
                  isActive
                    ? 'border-neon-cyan glow-cyan'
                    : 'border-white/10 hover:border-neon-magenta'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3
                      className={`text-xl font-bold mb-1 transition-colors ${
                        isActive ? 'text-neon-cyan' : 'text-white'
                      }`}
                    >
                      {experience.title}
                    </h3>
                    <p className="text-neon-magenta font-semibold">{experience.company}</p>
                  </div>
                  <div
                    className={`w-12 h-12 rounded-full glass border flex items-center justify-center flex-shrink-0 transition-all ${
                      isActive ? 'border-neon-cyan glow-cyan' : 'border-neon-magenta'
                    }`}
                  >
                    <Briefcase
                      className={`w-6 h-6 ${isActive ? 'text-neon-cyan' : 'text-neon-magenta'}`}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2 mb-4 text-sm text-gray-400">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{experience.period}</span>
                  </div>
                  {experience.location && (
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>{experience.location}</span>
                    </div>
                  )}
                </div>

                <p className="text-gray-300 text-sm mb-4 leading-relaxed line-clamp-3">
                  {experience.description}
                </p>

                {experience.link && (
                  <a
                    href={experience.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center gap-2 text-neon-cyan text-sm hover:text-neon-magenta transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Ver Website</span>
                  </a>
                )}

                {/* Active Indicator */}
                {isActive && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-2 w-4 h-4 bg-neon-cyan rounded-full"
                  >
                    <motion.div
                      animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute inset-0 bg-neon-cyan rounded-full"
                    />
                  </motion.div>
                )}
              </motion.div>
            </motion.div>
          )
        })}
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-center gap-4 mt-8">
        <motion.button
          onClick={handlePrev}
          whileHover={{ scale: 1.1, x: -5 }}
          whileTap={{ scale: 0.9 }}
          className="w-12 h-12 rounded-full glass-strong border border-neon-cyan flex items-center justify-center text-neon-cyan hover:glow-cyan transition-all"
          aria-label="Anterior"
        >
          <ChevronLeft className="w-6 h-6" />
        </motion.button>

        {/* Dots Indicator */}
        <div className="flex gap-2">
          {experiences.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => handleCardClick(index)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              className={`w-3 h-3 rounded-full transition-all ${
                index === activeIndex
                  ? 'bg-neon-cyan w-8'
                  : 'bg-gray-600 hover:bg-neon-magenta'
              }`}
              aria-label={`Ir para experiência ${index + 1}`}
            />
          ))}
        </div>

        <motion.button
          onClick={handleNext}
          whileHover={{ scale: 1.1, x: 5 }}
          whileTap={{ scale: 0.9 }}
          className="w-12 h-12 rounded-full glass-strong border border-neon-cyan flex items-center justify-center text-neon-cyan hover:glow-cyan transition-all"
          aria-label="Próximo"
        >
          <ChevronRight className="w-6 h-6" />
        </motion.button>
      </div>

      {/* Info Text */}
      <p className="text-center text-gray-400 text-sm mt-4">
        {is3DMode
          ? 'Mova o mouse para rotacionar • Clique em um card para focar'
          : 'Navegue pelas experiências usando as setas'}
      </p>
    </div>
  )
}

