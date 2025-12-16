'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import { AnimatePresence, motion } from 'framer-motion'
import { Briefcase, Building2, Calendar, ChevronLeft, ChevronRight, GraduationCap, MapPin, Rocket } from 'lucide-react'
import { useState } from 'react'

const ANIMATION_COLORS = {
  'neon-blue': '#0080ff',
  'neon-cyan': '#00ffff',
  'neon-magenta': '#ff00ff',
  'gray-500': '#6b7280',
}

export default function JourneyMap() {
  const { t } = useLanguage()
  const [activeIndex, setActiveIndex] = useState(0)

  // Map translation index to icon and type
  // Since translations array items don't have 'type', 'icon', 'color' explicitly in the file I edited before,
  // I need to map them by index assuming the order is preserved.
  // Ideally, I should strictly match the data structure, but for now I will reconstruct the metadata.
  
  // Metadata for each item in order (must match translations.js order)
  const journeyMetadata = [
    { type: 'work', icon: Building2, color: 'neon-blue' },
    { type: 'education', icon: GraduationCap, color: 'neon-cyan' },
    { type: 'leadership', icon: Rocket, color: 'neon-magenta' },
    { type: 'leadership', icon: Briefcase, color: 'neon-cyan' },
    { type: 'work', icon: MapPin, color: 'neon-blue' },
    { type: 'education', icon: GraduationCap, color: 'neon-magenta' }
  ]

  const journeyItems = t('journey.items')
  
  const journey = Array.isArray(journeyItems) 
    ? journeyItems.map((item, index) => ({
        ...item,
        ...(journeyMetadata[index] || { type: 'work', icon: Briefcase, color: 'gray-500' })
      }))
    : []

  if (journey.length === 0) return null

  const currentItem = journey[activeIndex]
  const Icon = currentItem.icon

  const goNext = () => setActiveIndex((prev) => (prev + 1) % journey.length)
  const goPrev = () => setActiveIndex((prev) => (prev - 1 + journey.length) % journey.length)

  return (
    <div className="relative py-12">
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-10"
      >
        <div className="flex items-center justify-center gap-3 mb-2">
          <Calendar className="w-6 h-6 text-neon-magenta" />
          <h2 className="text-2xl sm:text-3xl font-orbitron font-bold">
            <span className="text-white">{t('journey.titlePrefix')}</span>{' '}
            <span className="text-neon-magenta">{t('journey.titleSuffix')}</span>
          </h2>
        </div>
        <p className="text-gray-500 text-xs">{t('journey.subtitle')}</p>
      </motion.div>

      {/* Main Timeline Container */}
      <div className="max-w-4xl mx-auto">
        
        {/* Timeline Bar */}
        <div className="relative mb-8">
          {/* Background line */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-white/10 -translate-y-1/2" />
          
          {/* Progress Line */}
          <motion.div 
            className="absolute top-1/2 left-0 h-0.5 bg-gradient-to-r from-neon-blue via-neon-cyan to-neon-magenta -translate-y-1/2"
            initial={{ width: '0%' }}
            animate={{ width: `${(activeIndex / (journey.length - 1)) * 100}%` }}
            transition={{ duration: 0.5 }}
          />

          {/* Timeline Points */}
          <div className="relative flex justify-between">
            {journey.map((item, index) => {
              const ItemIcon = item.icon
              const isActive = index === activeIndex
              const isPast = index < activeIndex

              return (
                <motion.button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative flex flex-col items-center"
                >
                  {/* Point */}
                  <motion.div
                    animate={{
                      scale: isActive ? 1.2 : 1,
                      borderColor: isActive ? ANIMATION_COLORS[item.color] || '#ffffff' : 'rgba(255, 255, 255, 0.1)',
                    }}
                    className={`relative w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isActive
                        ? 'glass-strong border-2'
                        : isPast
                        ? 'glass border border-white/20'
                        : 'glass border border-white/10'
                    }`}
                    style={{
                      boxShadow: isActive ? `0 0 20px var(--${item.color.replace('-', '')})` : 'none',
                    }}
                  >
                    <ItemIcon className={`w-4 h-4 sm:w-5 sm:h-5 ${isActive ? `text-${item.color}` : isPast ? 'text-gray-400' : 'text-gray-600'}`} />
                    
                    {/* Active pulse */}
                    {isActive && (
                      <motion.div
                        animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className={`absolute inset-0 rounded-full bg-${item.color}`}
                      />
                    )}
                  </motion.div>

                  {/* Year label */}
                  <span className={`mt-2 text-[10px] font-medium transition-colors ${
                    isActive ? `text-${item.color}` : 'text-gray-600'
                  }`}>
                    {item.year.split('-')[0]}
                  </span>
                </motion.button>
              )
            })}
          </div>
        </div>

        {/* Content Card */}
        <div className="relative">
          {/* Navigation Arrows */}
          <motion.button
            onClick={goPrev}
            whileHover={{ scale: 1.1, x: -2 }}
            whileTap={{ scale: 0.9 }}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 sm:-translate-x-12 w-10 h-10 rounded-full glass border border-white/10 flex items-center justify-center text-gray-400 hover:text-neon-cyan hover:border-neon-cyan transition-all z-10"
          >
            <ChevronLeft className="w-5 h-5" />
          </motion.button>

          <motion.button
            onClick={goNext}
            whileHover={{ scale: 1.1, x: 2 }}
            whileTap={{ scale: 0.9 }}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 sm:translate-x-12 w-10 h-10 rounded-full glass border border-white/10 flex items-center justify-center text-gray-400 hover:text-neon-cyan hover:border-neon-cyan transition-all z-10"
          >
            <ChevronRight className="w-5 h-5" />
          </motion.button>

          {/* Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="glass-strong rounded-2xl p-6 sm:p-8 border border-white/10 text-center"
            >
              {/* Icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', delay: 0.1 }}
                className={`inline-flex items-center justify-center w-16 h-16 rounded-full glass border-2 border-${currentItem.color} mb-4`}
                style={{
                  boxShadow: `0 0 30px var(--${currentItem.color.replace('-', '')})`,
                }}
              >
                <Icon className={`w-8 h-8 text-${currentItem.color}`} />
              </motion.div>

              {/* Type Badge */}
              <div className="flex justify-center mb-3">
                <span className={`px-3 py-1 rounded-full text-[10px] uppercase tracking-wider bg-${currentItem.color}/10 text-${currentItem.color} border border-${currentItem.color}/30`}>
                  {currentItem.type === 'education' && '🎓 Formação'}
                  {currentItem.type === 'work' && '💼 Experiência'}
                  {currentItem.type === 'leadership' && '🚀 Liderança'}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                {currentItem.title}
              </h3>

              {/* Place */}
              <p className={`text-sm text-${currentItem.color} mb-3`}>
                {currentItem.place}
              </p>

              {/* Description */}
              <p className="text-gray-400 text-sm max-w-md mx-auto leading-relaxed">
                {currentItem.description}
              </p>

              {/* Year */}
              <div className="mt-4 pt-4 border-t border-white/10">
                <span className="text-xs text-gray-500">
                  <Calendar className="w-3 h-3 inline mr-1" />
                  {currentItem.year}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Progress Dots (Mobile) */}
        <div className="flex justify-center gap-2 mt-6 sm:hidden">
          {journey.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === activeIndex 
                  ? 'bg-neon-cyan w-6' 
                  : 'bg-white/20 hover:bg-white/40'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
