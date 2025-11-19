'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react'
import { testimonials } from '@/lib/data'
import { useLanguage } from '@/contexts/LanguageContext'

export default function TestimonialsSection() {
  const { t } = useLanguage()
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const goToTestimonial = (index) => {
    setCurrentIndex(index)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="mt-20"
    >
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold font-orbitron mb-4">
          <span className="text-neon-cyan">Recomendações</span>{' '}
          <span className="text-neon-magenta">&</span>{' '}
          <span className="text-neon-blue">Testemunhos</span>
        </h2>
        <div className="w-32 h-1 bg-gradient-to-r from-neon-cyan via-neon-magenta to-neon-blue mx-auto mb-4" />
        <p className="text-gray-400 max-w-2xl mx-auto">
          O que colegas e clientes dizem sobre o meu trabalho
        </p>
      </div>

      <div className="relative max-w-4xl mx-auto">
        {/* Testimonial Card */}
        <div className="relative h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="glass-strong rounded-2xl p-8 md:p-12 border border-white/10 h-full flex flex-col"
            >
              {/* Quote Icon */}
              <div className={`w-16 h-16 rounded-full glass border ${
                testimonials[currentIndex].color === 'neon-cyan' ? 'border-neon-cyan' :
                testimonials[currentIndex].color === 'neon-magenta' ? 'border-neon-magenta' :
                'border-neon-blue'
              } flex items-center justify-center mb-6`}>
                <Quote className={`w-8 h-8 ${
                  testimonials[currentIndex].color === 'neon-cyan' ? 'text-neon-cyan' :
                  testimonials[currentIndex].color === 'neon-magenta' ? 'text-neon-magenta' :
                  'text-neon-blue'
                }`} />
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-6">
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      testimonials[currentIndex].color === 'neon-cyan' ? 'fill-neon-cyan text-neon-cyan' :
                      testimonials[currentIndex].color === 'neon-magenta' ? 'fill-neon-magenta text-neon-magenta' :
                      'fill-neon-blue text-neon-blue'
                    }`}
                  />
                ))}
              </div>

              {/* Content */}
              <p className="text-gray-300 text-lg md:text-xl leading-relaxed mb-8 flex-1">
                &ldquo;{testimonials[currentIndex].content}&rdquo;
              </p>

              {/* Author */}
              <div className="border-t border-white/10 pt-6">
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-full glass border ${
                    testimonials[currentIndex].color === 'neon-cyan' ? 'border-neon-cyan' :
                    testimonials[currentIndex].color === 'neon-magenta' ? 'border-neon-magenta' :
                    'border-neon-blue'
                  } flex items-center justify-center`}>
                    <span className={`text-xl font-bold ${
                      testimonials[currentIndex].color === 'neon-cyan' ? 'text-neon-cyan' :
                      testimonials[currentIndex].color === 'neon-magenta' ? 'text-neon-magenta' :
                      'text-neon-blue'
                    }`}>
                      {testimonials[currentIndex].name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-lg">
                      {testimonials[currentIndex].name}
                    </h4>
                    <p className="text-gray-400 text-sm">
                      {testimonials[currentIndex].role}
                    </p>
                    <p className={`text-sm font-medium ${
                      testimonials[currentIndex].color === 'neon-cyan' ? 'text-neon-cyan' :
                      testimonials[currentIndex].color === 'neon-magenta' ? 'text-neon-magenta' :
                      'text-neon-blue'
                    }`}>
                      {testimonials[currentIndex].company}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <motion.button
            onClick={prevTestimonial}
            whileHover={{ scale: 1.1, x: -5 }}
            whileTap={{ scale: 0.9 }}
            className="w-12 h-12 rounded-full glass-strong border border-neon-cyan flex items-center justify-center text-neon-cyan hover:glow-cyan transition-all"
            aria-label="Testimonial anterior"
          >
            <ChevronLeft className="w-6 h-6" />
          </motion.button>

          {/* Dots Indicator */}
          <div className="flex gap-2">
            {testimonials.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => goToTestimonial(index)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentIndex
                    ? 'bg-neon-cyan w-8'
                    : 'bg-gray-600 hover:bg-neon-magenta'
                }`}
                aria-label={`Ir para testemunho ${index + 1}`}
              />
            ))}
          </div>

          <motion.button
            onClick={nextTestimonial}
            whileHover={{ scale: 1.1, x: 5 }}
            whileTap={{ scale: 0.9 }}
            className="w-12 h-12 rounded-full glass-strong border border-neon-cyan flex items-center justify-center text-neon-cyan hover:glow-cyan transition-all"
            aria-label="Próximo testemunho"
          >
            <ChevronRight className="w-6 h-6" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}

