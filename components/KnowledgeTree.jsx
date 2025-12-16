'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import { motion } from 'framer-motion'
import { Briefcase, Cpu, GraduationCap, Layers, Leaf } from 'lucide-react'
import { useState } from 'react'

export default function KnowledgeTree() {
  const { t } = useLanguage()
  const [activeLevel, setActiveLevel] = useState(null)

  const levels = [
    {
      id: 'roots',
      label: t('knowledgeTree.categories.academic'),
      subtitle: t('about.background'), // Using 'Background' as approximate subtitle or just hardcode "Education"
      // Actually let's use a hardcoded fallback or simpler translation key if not perfect match.
      // t('knowledgeTree.categories.academic') is "Formation Academic" or similar.
      // Let's use it as label. Subtitle can be "Foundation" or similar.
      subtitle: 'Foundation', 
      icon: GraduationCap,
      color: 'neon-cyan',
      items: [
        'Licenciatura em Planeamento Territorial',
        'Universidade Pedagógica de Maputo',
      ],
      description: 'A base sólida do conhecimento'
    },
    {
      id: 'trunk',
      label: t('knowledgeTree.categories.professional'),
      subtitle: 'Experience',
      icon: Briefcase,
      color: 'yellow-400',
      items: ['BMC Pro Services', 'BrainyWrite', 'Consultoria Municipal', '5+ Years'],
      description: 'Experiência que sustenta o crescimento'
    },
    {
      id: 'branches',
      label: t('knowledgeTree.categories.specialization'),
      subtitle: 'Specialization',
      icon: Layers,
      color: 'neon-magenta',
      items: [
        'Territorial Planning', 
        'GIS Analysis', 
        'Web Development', 
        'Consulting'
      ],
      description: 'Caminhos de especialização'
    },
    {
      id: 'leaves',
      label: t('knowledgeTree.categories.technical'),
      subtitle: 'Skills',
      icon: Cpu,
      color: 'neon-blue',
      items: ['ArcGIS', 'QGIS', 'React', 'Next.js', 'JavaScript', 'Liderança'],
      description: 'Competências em constante crescimento'
    },
  ]

  return (
    <div className="relative py-16">
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <div className="flex items-center justify-center gap-3 mb-3">
          <Leaf className="w-8 h-8 text-neon-cyan" />
          <h2 className="text-3xl sm:text-4xl font-orbitron font-bold">
            <span className="text-neon-cyan">{t('knowledgeTree.titlePrefix')}</span>{' '}
            <span className="text-white">{t('knowledgeTree.titleSuffix')}</span>
          </h2>
        </div>
        <p className="text-gray-500 text-sm max-w-md mx-auto">
          {t('knowledgeTree.subtitle')}
        </p>
      </motion.div>

      {/* Conceptual Tree Visualization */}
      <div className="max-w-4xl mx-auto">
        {/* Central Vertical Line (Tree Trunk) */}
        <div className="relative">
          {/* Animated glowing line */}
          <motion.div
            initial={{ height: 0 }}
            whileInView={{ height: '100%' }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            // Fixed redundant gradient class by removing one stop
            className="absolute left-1/2 -translate-x-1/2 w-0.5 bg-gradient-to-b from-neon-cyan via-yellow-400 to-neon-blue"
            style={{ 
              boxShadow: '0 0 20px rgba(0, 255, 255, 0.5)',
              zIndex: 0 
            }}
          />

          {/* Tree Levels */}
          <div className="relative z-10 space-y-0">
            {levels.map((level, index) => {
              const Icon = level.icon
              const isActive = activeLevel === level.id
              const isLeft = index % 2 === 0

              return (
                <motion.div
                  key={level.id}
                  initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className={`flex items-center justify-center relative py-12 ${
                    isLeft ? 'flex-row' : 'flex-row-reverse'
                  }`}
                  onMouseEnter={() => setActiveLevel(level.id)}
                  onMouseLeave={() => setActiveLevel(null)}
                >
                  {/* Content Card */}
                  <div className={`w-[45%] ${isLeft ? 'text-right pr-8' : 'text-left pl-8'}`}>
                    <h3 className={`text-xl font-bold mb-1 transition-colors ${
                      isActive ? `text-${level.color}` : 'text-white'
                    }`}>
                      {level.label}
                    </h3>
                    <p className="text-xs text-gray-500 mb-3 uppercase tracking-wider">
                      {level.subtitle}
                    </p>
                    
                    {/* Items List */}
                    <ul className={`flex flex-wrap gap-2 ${isLeft ? 'justify-end' : 'justify-start'}`}>
                      {level.items.map((item, i) => (
                        <li 
                          key={i}
                          className={`text-xs px-2 py-1 rounded border transition-all ${
                            isActive 
                              ? `bg-${level.color}/10 border-${level.color}/30 text-${level.color}` 
                              : 'bg-white/5 border-white/10 text-gray-400'
                          }`}
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Central Node */}
                  <div className="relative flex-shrink-0">
                    <motion.div
                      whileHover={{ scale: 1.2 }}
                      className={`w-16 h-16 rounded-full glass-strong border-2 flex items-center justify-center transition-all duration-300 relative z-10 ${
                        isActive
                          ? `border-${level.color} bg-${level.color}/10`
                          : 'border-white/20 bg-dark-bg'
                      }`}
                      style={{
                        boxShadow: isActive ? `0 0 30px var(--${level.color})` : 'none'
                      }}
                    >
                      <Icon className={`w-7 h-7 ${isActive ? `text-${level.color}` : 'text-gray-400'}`} />
                    </motion.div>
                    
                    {/* Connection Line to Content */}
                    <div 
                      className={`absolute top-1/2 w-8 h-0.5 bg-white/10 -z-10 transition-colors duration-300 ${
                        isLeft ? 'right-full' : 'left-full'
                      } ${isActive ? `bg-${level.color}` : ''}`}
                    />
                  </div>

                  {/* Empty space for balance */}
                  <div className="w-[45%]" />
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
