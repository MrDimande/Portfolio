'use client'

import RevealOnScroll from '@/components/RevealOnScroll'
import { education } from '@/lib/data'
import { motion } from 'framer-motion'
import { Calendar, GraduationCap } from 'lucide-react'

export default function EducationSection() {
  return (
    <section className="py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-12 text-center"
      >
        <h2 className="text-3xl font-bold font-orbitron mb-4">
          <span className="text-neon-cyan">Educação</span>{' '}
          <span className="text-neon-magenta">&</span>{' '}
          <span className="text-neon-blue">Cursos</span>
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-neon-cyan to-neon-magenta mx-auto" />
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {education.map((edu, index) => (
          <RevealOnScroll key={index} direction="up" delay={index * 0.1}>
            <div className="glass-strong rounded-xl p-6 border border-white/10 hover:border-neon-cyan transition-all h-full flex flex-col">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-full glass border border-neon-cyan flex items-center justify-center flex-shrink-0">
                  <GraduationCap className="w-6 h-6 text-neon-cyan" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">{edu.degree}</h3>
                  <p className="text-neon-magenta font-medium">{edu.institution}</p>
                </div>
              </div>
              
              <div className="mt-auto pt-4 border-t border-white/5">
                <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                  <Calendar className="w-4 h-4 text-neon-blue" />
                  <span>{edu.period}</span>
                </div>
                {edu.description && (
                  <p className="text-sm text-gray-300 leading-relaxed">
                    {edu.description}
                  </p>
                )}
              </div>
            </div>
          </RevealOnScroll>
        ))}
      </div>
    </section>
  )
}
