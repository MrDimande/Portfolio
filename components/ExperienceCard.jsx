'use client'

import { motion } from 'framer-motion'
import { Calendar, MapPin, Briefcase, ExternalLink } from 'lucide-react'
import Link from 'next/link'

export default function ExperienceCard({ experience, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.02, y: -5 }}
      className="glass-strong rounded-xl p-6 border border-white/10 hover:border-neon-cyan transition-all group"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-white mb-1 group-hover:text-neon-cyan transition-colors">
            {experience.title}
          </h3>
          <div className="flex items-center gap-2">
            <p className="text-neon-magenta font-semibold">{experience.company}</p>
            {experience.link && (
              <Link href={experience.link} target="_blank" rel="noopener noreferrer">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 45 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-5 h-5 rounded-full glass border border-neon-cyan/50 flex items-center justify-center hover:glow-cyan transition-all"
                >
                  <ExternalLink className="w-3 h-3 text-neon-cyan" />
                </motion.div>
              </Link>
            )}
          </div>
        </div>
        <div className="w-12 h-12 rounded-full glass border border-neon-cyan flex items-center justify-center flex-shrink-0 group-hover:glow-cyan transition-all">
          <Briefcase className="w-6 h-6 text-neon-cyan" />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-4 text-sm text-gray-400">
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

      <p className="text-gray-300 mb-4 leading-relaxed">{experience.description}</p>

      {experience.responsibilities && experience.responsibilities.length > 0 && (
        <ul className="space-y-2">
          {experience.responsibilities.map((responsibility, idx) => (
            <li key={idx} className="flex items-start gap-2 text-sm text-gray-400">
              <span className="text-neon-cyan mt-1">▹</span>
              <span>{responsibility}</span>
            </li>
          ))}
        </ul>
      )}

      {(experience.technologies || experience.skills) && (experience.technologies?.length > 0 || experience.skills?.length > 0) && (
        <div className="mt-4 pt-4 border-t border-white/10 space-y-3">
          {experience.technologies && experience.technologies.length > 0 && (
            <div>
              <p className="text-xs text-gray-400 mb-2 uppercase tracking-wide">Tecnologias</p>
              <div className="flex flex-wrap gap-2">
                {experience.technologies.map((tech, idx) => (
                  <motion.span
                    key={idx}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + idx * 0.05 }}
                    whileHover={{ scale: 1.1 }}
                    className="px-3 py-1 rounded-full text-xs glass border border-neon-cyan/30 text-neon-cyan hover:glow-cyan transition-all cursor-default"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </div>
          )}
          {experience.skills && experience.skills.length > 0 && (
            <div>
              <p className="text-xs text-gray-400 mb-2 uppercase tracking-wide">Soft Skills</p>
              <div className="flex flex-wrap gap-2">
                {experience.skills.map((skill, idx) => (
                  <motion.span
                    key={idx}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + idx * 0.05 }}
                    whileHover={{ scale: 1.1 }}
                    className="px-3 py-1.5 rounded-full text-xs glass border border-neon-magenta/30 text-neon-magenta hover:glow-magenta transition-all cursor-default"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </motion.div>
  )
}

