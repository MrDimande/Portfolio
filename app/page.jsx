'use client'

import { motion } from 'framer-motion'
import { ArrowDown, MapPin, Code, Layers } from 'lucide-react'
import Link from 'next/link'
import AnimatedText from '@/components/AnimatedText'
import RevealOnScroll from '@/components/RevealOnScroll'
import ParallaxSection from '@/components/ParallaxSection'
import ThreeScene from '@/components/ThreeScene'
import { useLanguage } from '@/contexts/LanguageContext'

export default function Home() {
  const { t } = useLanguage()
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-neon-cyan rounded-full blur-3xl opacity-20"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-neon-magenta rounded-full blur-3xl opacity-20"
          animate={{
            x: [0, -100, 0],
            y: [0, -50, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* 3D Background Scene */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <ThreeScene />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Main heading */}
          <RevealOnScroll direction="fade">
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-orbitron font-bold mb-4">
              <span className="text-neon-cyan">ALBERTO</span>
              <br />
              <span className="text-neon-magenta">DIMANDE</span>
            </h1>
          </RevealOnScroll>

          {/* Animated title */}
          <RevealOnScroll direction="up" delay={0.2} className="mb-8">
            <AnimatedText
              text={t('hero.subtitle')}
              className="text-2xl sm:text-3xl md:text-4xl font-orbitron font-medium text-white mb-2"
            />
            <p className="text-lg sm:text-xl text-gray-300 mt-4">
              {t('hero.location')}
            </p>
          </RevealOnScroll>

          {/* Skills icons */}
          <ParallaxSection speed={0.3} className="flex justify-center gap-8 sm:gap-12 mb-12 flex-wrap">
            <motion.div
              whileHover={{ scale: 1.2, y: -10 }}
              className="flex flex-col items-center group"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full glass border-neon-cyan flex items-center justify-center mb-2 group-hover:glow-cyan transition-all">
                <Layers className="w-8 h-8 sm:w-10 sm:h-10 text-neon-cyan" />
              </div>
              <span className="text-sm text-gray-400">{t('hero.gis')}</span>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.2, y: -10 }}
              className="flex flex-col items-center group"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full glass border-neon-magenta flex items-center justify-center mb-2 group-hover:glow-magenta transition-all">
                <MapPin className="w-8 h-8 sm:w-10 sm:h-10 text-neon-magenta" />
              </div>
              <span className="text-sm text-gray-400">{t('hero.urbanism')}</span>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.2, y: -10 }}
              className="flex flex-col items-center group"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full glass border-neon-blue flex items-center justify-center mb-2 group-hover:glow-blue transition-all">
                <Code className="w-8 h-8 sm:w-10 sm:h-10 text-neon-blue" />
              </div>
              <span className="text-sm text-gray-400">{t('hero.webDev')}</span>
            </motion.div>
          </ParallaxSection>

          {/* CTA Buttons */}
          <RevealOnScroll direction="up" delay={0.6} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/about">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 glass-strong border-neon-cyan rounded-lg text-neon-cyan font-semibold hover:glow-cyan transition-all"
              >
                {t('hero.knowMore')}
              </motion.button>
            </Link>
            <Link href="/projects">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 glass-strong border-neon-magenta rounded-lg text-neon-magenta font-semibold hover:glow-magenta transition-all"
              >
                {t('hero.viewProjects')}
              </motion.button>
            </Link>
          </RevealOnScroll>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <ArrowDown className="w-6 h-6 text-neon-cyan mx-auto" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

