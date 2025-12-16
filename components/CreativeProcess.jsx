'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import { motion } from 'framer-motion'
import { CheckCircle, ClipboardList, FileSearch, Layers, Map, PenTool, Target } from 'lucide-react'
import { useState } from 'react'

export default function CreativeProcess() {
  const { t } = useLanguage()
  const [activeStep, setActiveStep] = useState(null)

  // Icons map mapped to IDs
  const iconsMap = {
    1: FileSearch,
    2: Map,
    3: ClipboardList,
    4: PenTool,
    5: Layers,
    6: Target
  }

  // Colors map
  const colorsMap = {
    1: 'neon-cyan',
    2: 'neon-magenta',
    3: 'neon-blue',
    4: 'neon-cyan',
    5: 'neon-magenta',
    6: 'neon-blue'
  }

  // Get steps from translations
  // Note: we need to handle this carefully as t('creativeProcess.steps') return might depend on implementation
  // Assuming t returns the object/array directly if key points to one
  const stepsData = t('creativeProcess.steps')
  
  // Safe check if stepsData is array
  const steps = Array.isArray(stepsData) ? stepsData.map((step, index) => ({
    ...step,
    icon: iconsMap[step.id] || iconsMap[1],
    color: colorsMap[step.id] || 'neon-cyan'
  })) : []

  return (
    <div className="relative py-16">
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <div className="flex items-center justify-center gap-3 mb-2">
          <Map className="w-7 h-7 text-neon-cyan" />
          <h2 className="text-2xl sm:text-3xl font-orbitron font-bold">
            <span className="text-white">{t('creativeProcess.titlePrefix')}</span>{' '}
            <span className="text-neon-cyan">{t('creativeProcess.titleSuffix')}</span>
          </h2>
        </div>
        <p className="text-gray-500 text-xs max-w-md mx-auto">
          {t('creativeProcess.subtitle')}
        </p>
      </motion.div>

      {/* Flowchart */}
      <div className="max-w-5xl mx-auto px-4">
        {/* Desktop: Horizontal Flow */}
        <div className="hidden md:block">
          <div className="relative flex items-center justify-between">
            {/* Connection Line */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-white/10 -translate-y-1/2 z-0" />
            <motion.div
              className="absolute top-1/2 left-0 h-0.5 bg-gradient-to-r from-neon-cyan via-neon-magenta to-neon-blue -translate-y-1/2 z-0"
              initial={{ width: '0%' }}
              whileInView={{ width: '100%' }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
            />

            {/* Steps */}
            {steps.map((step, index) => {
              const Icon = step.icon
              const isActive = activeStep === step.id

              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative z-10 flex flex-col items-center"
                  onMouseEnter={() => setActiveStep(step.id)}
                  onMouseLeave={() => setActiveStep(null)}
                >
                  {/* Step Number */}
                  <div className={`text-[10px] font-bold mb-2 ${isActive ? `text-${step.color}` : 'text-gray-600'}`}>
                    0{step.id}
                  </div>

                  {/* Icon Circle */}
                  <motion.div
                    whileHover={{ scale: 1.15 }}
                    className={`relative w-14 h-14 rounded-full cursor-pointer transition-all duration-300 flex items-center justify-center ${
                      isActive
                        ? `glass-strong border-2 border-${step.color}`
                        : 'glass border border-white/20'
                    }`}
                    style={{
                      boxShadow: isActive ? `0 0 25px var(--${step.color.replace('-', '')})` : 'none',
                    }}
                  >
                    <Icon className={`w-6 h-6 ${isActive ? `text-${step.color}` : 'text-gray-400'}`} />
                    
                    {/* Pulse */}
                    {isActive && (
                      <motion.div
                        animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                        transition={{ duration: 1, repeat: Infinity }}
                        className={`absolute inset-0 rounded-full bg-${step.color}`}
                      />
                    )}
                  </motion.div>

                  {/* Title */}
                  <div className={`mt-3 text-center transition-colors ${isActive ? 'text-white' : 'text-gray-500'}`}>
                    <div className="text-xs font-semibold">{step.title}</div>
                  </div>

                  {/* Tooltip */}
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      className="absolute top-full mt-4 w-56 p-4 rounded-xl glass-strong border border-white/20 z-30"
                    >
                      <div className={`text-xs font-bold text-${step.color} mb-1`}>{step.subtitle}</div>
                      <p className="text-[11px] text-gray-400 mb-3 leading-relaxed">{step.description}</p>
                      <div className="flex flex-wrap gap-1">
                        {step.details.map((detail, i) => (
                          <span
                            key={i}
                            className={`px-2 py-0.5 rounded-full text-[9px] bg-${step.color}/10 text-${step.color} border border-${step.color}/30`}
                          >
                            {detail}
                          </span>
                        ))}
                      </div>
                      {/* Arrow */}
                      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-dark-bg/90 border-l border-t border-white/20 rotate-45" />
                    </motion.div>
                  )}
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Mobile: Vertical Flow */}
        <div className="md:hidden space-y-4">
          {steps.map((step, index) => {
            const Icon = step.icon
            const isActive = activeStep === step.id
            const isLast = index === steps.length - 1

            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <div
                  onClick={() => setActiveStep(isActive ? null : step.id)}
                  className={`flex items-start gap-4 p-4 rounded-xl cursor-pointer transition-all ${
                    isActive
                      ? `glass-strong border border-${step.color}/50`
                      : 'glass border border-white/10'
                  }`}
                >
                  {/* Icon */}
                  <div
                    className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                      isActive
                        ? `glass-strong border-2 border-${step.color}`
                        : 'glass border border-white/20'
                    }`}
                    style={{
                      boxShadow: isActive ? `0 0 20px var(--${step.color.replace('-', '')})` : 'none',
                    }}
                  >
                    <Icon className={`w-5 h-5 ${isActive ? `text-${step.color}` : 'text-gray-400'}`} />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-[10px] font-bold ${isActive ? `text-${step.color}` : 'text-gray-600'}`}>
                        0{step.id}
                      </span>
                      <span className={`text-sm font-semibold ${isActive ? 'text-white' : 'text-gray-400'}`}>
                        {step.title}
                      </span>
                    </div>
                    <p className={`text-[11px] ${isActive ? `text-${step.color}` : 'text-gray-600'}`}>
                      {step.subtitle}
                    </p>

                    {/* Expanded content */}
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="mt-3 pt-3 border-t border-white/10"
                      >
                        <p className="text-[11px] text-gray-400 mb-2">{step.description}</p>
                        <div className="flex flex-wrap gap-1">
                          {step.details.map((detail, i) => (
                            <span
                              key={i}
                              className={`px-2 py-0.5 rounded-full text-[9px] bg-${step.color}/10 text-${step.color} border border-${step.color}/30`}
                            >
                              {detail}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>

                {/* Connector */}
                {!isLast && (
                  <div className="absolute left-8 top-full h-4 w-0.5 bg-gradient-to-b from-white/20 to-transparent" />
                )}
              </motion.div>
            )
          })}
        </div>

        {/* Result indicator */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="flex justify-center mt-10"
        >
          <div className="flex items-center gap-3 px-6 py-3 rounded-full glass-strong border border-neon-cyan/30">
            <CheckCircle className="w-5 h-5 text-neon-cyan" />
            <span className="text-sm text-gray-300">
              <span className="text-neon-cyan font-semibold">{t('creativeProcess.resultTitle')}</span> {t('creativeProcess.resultText')}
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
