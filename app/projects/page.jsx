'use client'

import ProjectCard from '@/components/ProjectCard'
import { useLanguage } from '@/contexts/LanguageContext'
import { projects } from '@/lib/data'
import { motion } from 'framer-motion'
import { FolderKanban, Grid3x3, List } from 'lucide-react'
import { useState } from 'react'

export default function ProjectsPage() {
  const { t } = useLanguage()
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [viewMode, setViewMode] = useState('grid') // 'grid' or 'list'

  const categories = ['all', 'GIS', 'Web Development', 'Urban Planning']

  const filteredProjects =
    selectedCategory === 'all'
      ? projects
      : projects.filter((project) =>
          project.category.toLowerCase().includes(selectedCategory.toLowerCase())
        )

  return (
    <div className="relative min-h-screen pt-24 sm:pt-32 pb-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-orbitron font-bold mb-4">
            <span className="text-neon-cyan">{t('projects.title')}</span>{' '}
            <span className="text-neon-magenta">&</span>{' '}
            <span className="text-neon-blue">{t('projects.subtitle')}</span>
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-neon-cyan to-neon-magenta mx-auto mb-4" />
          <p className="text-gray-400 max-w-2xl mx-auto">
            {t('projects.description')}
          </p>
        </motion.div>

            {/* Filter Buttons & View Mode */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-wrap justify-center items-center gap-4 mb-12"
            >
              <div className="flex flex-wrap justify-center gap-4">
                {categories.map((category) => (
                  <motion.button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-6 py-3 rounded-lg font-medium transition-all ${
                      selectedCategory === category
                        ? 'glass-strong border border-neon-cyan text-neon-cyan glow-cyan'
                        : 'glass border border-white/10 text-gray-400 hover:border-neon-magenta hover:text-neon-magenta'
                    }`}
                  >
                    {category === 'all' ? t('projects.all') : category}
                  </motion.button>
                ))}
              </div>

              {/* View Mode Toggle */}
              <div className="flex gap-2 glass-strong rounded-lg p-1 border border-white/10">
                <motion.button
                  onClick={() => setViewMode('grid')}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className={`p-2 rounded transition-all ${
                    viewMode === 'grid'
                      ? 'bg-neon-cyan/20 text-neon-cyan'
                      : 'text-gray-400 hover:text-neon-cyan'
                  }`}
                  title="Grid View"
                >
                  <Grid3x3 className="w-5 h-5" />
                </motion.button>
                <motion.button
                  onClick={() => setViewMode('list')}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className={`p-2 rounded transition-all ${
                    viewMode === 'list'
                      ? 'bg-neon-magenta/20 text-neon-magenta'
                      : 'text-gray-400 hover:text-neon-magenta'
                  }`}
                  title="List View"
                >
                  <List className="w-5 h-5" />
                </motion.button>
              </div>
            </motion.div>

        {/* Projects Grid/List */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
              : 'space-y-6'
          }
        >
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={index}
              project={project}
              index={index}
              allProjects={projects}
              viewMode={viewMode}
            />
          ))}
        </motion.div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <FolderKanban className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400">{t('projects.noProjects')}</p>
          </motion.div>
        )}
      </div>
    </div>
  )
}

