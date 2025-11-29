'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import { motion } from 'framer-motion'
import { Code, ExternalLink, Github, Map } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import GISMapModal from './GISMapModal'

export default function ProjectCard({ project, index, allProjects = [], viewMode = 'grid' }) {
  const { t } = useLanguage()
  const [isMapModalOpen, setIsMapModalOpen] = useState(false)

  const iconMap = {
    gis: Map,
    web: Code,
    default: ExternalLink,
  }

  const Icon = iconMap[project.type] || iconMap.default

  const handleViewProject = (e) => {
    if (project.type === 'gis' && project.location) {
      e.preventDefault()
      setIsMapModalOpen(true)
    }
  }

  if (viewMode === 'list') {
    return (
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        whileHover={{ x: 10 }}
        className="glass-strong rounded-xl overflow-hidden border border-white/10 hover:border-neon-cyan transition-all group flex flex-col md:flex-row"
      >
        {/* Project Image/Placeholder */}
        <div className="relative w-full md:w-64 h-48 md:h-auto bg-gradient-to-br from-neon-cyan/20 to-neon-magenta/20 flex items-center justify-center flex-shrink-0">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="w-20 h-20 rounded-full glass border border-neon-cyan flex items-center justify-center"
          >
            <Icon className="w-10 h-10 text-neon-cyan" />
          </motion.div>
        </div>

        {/* Project Content */}
        <div className="p-6 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-xl font-bold text-white group-hover:text-neon-cyan transition-colors">
                {project.title}
              </h3>
              <span className="px-3 py-1 rounded-full text-xs glass border border-neon-magenta/30 text-neon-magenta">
                {project.category}
              </span>
            </div>

            <p className="text-gray-400 text-sm mb-4 leading-relaxed">
              {project.description}
            </p>

            {/* Technologies */}
            {project.technologies && project.technologies.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 rounded text-xs glass border border-white/10 text-gray-400"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Links */}
          <div className="flex gap-3">
            {project.liveUrl && (
              <>
                {project.type === 'gis' && project.location ? (
                  <motion.button
                    onClick={handleViewProject}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg glass border border-neon-cyan text-neon-cyan text-sm font-medium hover:glow-cyan transition-all"
                  >
                    <Map className="w-4 h-4" />
                    {t('projects.viewProject')}
                  </motion.button>
                ) : (
                  <Link
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg glass border border-neon-cyan text-neon-cyan text-sm font-medium hover:glow-cyan transition-all"
                    >
                      <ExternalLink className="w-4 h-4" />
                      {t('projects.viewProject')}
                    </motion.button>
                  </Link>
                )}
              </>
            )}
            {project.githubUrl && (
              <Link
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg glass border border-white/10 text-gray-300 text-sm font-medium hover:border-neon-magenta hover:text-neon-magenta transition-all"
                >
                  <Github className="w-4 h-4" />
                  {t('projects.code')}
                </motion.button>
              </Link>
            )}
          </div>
        </div>

        {/* GIS Map Modal */}
        {project.type === 'gis' && (
          <GISMapModal
            isOpen={isMapModalOpen}
            onClose={() => setIsMapModalOpen(false)}
            project={project}
            allProjects={allProjects}
          />
        )}
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.03, y: -10 }}
      className="glass-strong rounded-xl overflow-hidden border border-white/10 hover:border-neon-cyan transition-all group"
    >
      {/* Project Image/Placeholder */}
      <div className="relative h-48 bg-gradient-to-br from-neon-cyan/20 to-neon-magenta/20 flex items-center justify-center">
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          className="w-20 h-20 rounded-full glass border border-neon-cyan flex items-center justify-center"
        >
          <Icon className="w-10 h-10 text-neon-cyan" />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-dark-card to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      {/* Project Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-bold text-white group-hover:text-neon-cyan transition-colors">
            {project.title}
          </h3>
          <span className="px-3 py-1 rounded-full text-xs glass border border-neon-magenta/30 text-neon-magenta">
            {project.category}
          </span>
        </div>

        <p className="text-gray-400 text-sm mb-4 leading-relaxed">
          {project.description}
        </p>

        {/* Technologies */}
        {project.technologies && project.technologies.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.map((tech, idx) => (
              <span
                key={idx}
                className="px-2 py-1 rounded text-xs glass border border-white/10 text-gray-400"
              >
                {tech}
              </span>
            ))}
          </div>
        )}

        {/* Links */}
        <div className="flex gap-3">
          {project.liveUrl && (
            <>
              {project.type === 'gis' && project.location ? (
                <motion.button
                  onClick={handleViewProject}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg glass border border-neon-cyan text-neon-cyan text-sm font-medium hover:glow-cyan transition-all"
                >
                  <Map className="w-4 h-4" />
                  {t('projects.viewProject')}
                </motion.button>
              ) : (
                <Link
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg glass border border-neon-cyan text-neon-cyan text-sm font-medium hover:glow-cyan transition-all"
                  >
                    <ExternalLink className="w-4 h-4" />
                    {t('projects.viewProject')}
                  </motion.button>
                </Link>
              )}
            </>
          )}
          {project.githubUrl && (
            <Link
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-2 rounded-lg glass border border-white/10 text-gray-300 text-sm font-medium hover:border-neon-magenta hover:text-neon-magenta transition-all"
              >
                <Github className="w-4 h-4" />
                {t('projects.code')}
              </motion.button>
            </Link>
          )}
        </div>
      </div>

      {/* GIS Map Modal */}
      {project.type === 'gis' && (
        <GISMapModal
          isOpen={isMapModalOpen}
          onClose={() => setIsMapModalOpen(false)}
          project={project}
          allProjects={allProjects}
        />
      )}
    </motion.div>
  )
}

