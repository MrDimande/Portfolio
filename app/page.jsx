'use client'

import { motion } from 'framer-motion'
import { ArrowDown, MapPin, Code, Layers, Sparkles, TrendingUp, Zap, Briefcase, Clock, Award, Users, ArrowRight, Star } from 'lucide-react'
import Link from 'next/link'
import AnimatedText from '@/components/AnimatedText'
import RevealOnScroll from '@/components/RevealOnScroll'
import ParallaxSection from '@/components/ParallaxSection'
import ThreeScene from '@/components/ThreeScene'
import ProjectCard from '@/components/ProjectCard'
import { projects, skills, experiences } from '@/lib/data'
import { useLanguage } from '@/contexts/LanguageContext'

export default function Home() {
  const { t } = useLanguage()
  const featuredProjects = projects.slice(0, 3)

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* 3D Background Scene - Para toda a página */}
      <div className="fixed inset-0 z-0 opacity-20 pointer-events-none">
        <ThreeScene />
      </div>

      {/* Animated background elements - Para toda a página */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
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
        <motion.div
          className="absolute top-1/2 left-1/4 w-64 h-64 bg-neon-blue rounded-full blur-3xl opacity-15"
          animate={{
            x: [0, 80, 0],
            y: [0, -60, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-neon-cyan rounded-full blur-3xl opacity-15"
          animate={{
            x: [0, -80, 0],
            y: [0, 70, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center z-10">

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

      {/* Featured Projects Section */}
      <section className="relative py-20 sm:py-32 z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <RevealOnScroll direction="fade">
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-orbitron font-bold mb-4">
                <span className="text-neon-cyan">{t('projects.title')}</span>{' '}
                <span className="text-neon-magenta">&</span>{' '}
                <span className="text-neon-blue">{t('projects.subtitle')}</span>
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-neon-cyan to-neon-magenta mx-auto mb-4" />
              <p className="text-gray-400 max-w-2xl mx-auto">
                {t('projects.description')}
              </p>
            </div>
          </RevealOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {featuredProjects.map((project, index) => (
              <RevealOnScroll key={index} direction="up" delay={index * 0.1}>
                <ProjectCard project={project} index={index} />
              </RevealOnScroll>
            ))}
          </div>

          <RevealOnScroll direction="fade" className="text-center">
            <Link href="/projects">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 glass-strong border-neon-blue rounded-lg text-neon-blue font-semibold hover:glow-blue transition-all inline-flex items-center gap-2"
              >
                {t('projects.viewAll')}
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
          </RevealOnScroll>
        </div>
      </section>

      {/* Skills Overview Section */}
      <section className="relative py-20 sm:py-32 z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <RevealOnScroll direction="fade">
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-orbitron font-bold mb-4">
                <span className="text-neon-cyan">{t('about.skills')}</span>{' '}
                <span className="text-neon-magenta">&</span>{' '}
                <span className="text-neon-blue">{t('about.technologies')}</span>
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-neon-cyan to-neon-magenta mx-auto mb-4" />
            </div>
          </RevealOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: t('about.gisMapping'), skills: skills.gis, icon: Layers, borderClass: 'border-neon-cyan', textClass: 'text-neon-cyan' },
              { title: t('about.webDevelopment'), skills: skills.web, icon: Code, borderClass: 'border-neon-magenta', textClass: 'text-neon-magenta' },
              { title: t('about.urbanPlanning'), skills: skills.planning, icon: MapPin, borderClass: 'border-neon-blue', textClass: 'text-neon-blue' },
              { title: t('about.languages'), skills: skills.languages, icon: Sparkles, borderClass: 'border-neon-cyan', textClass: 'text-neon-cyan' },
            ].map((category, index) => {
              const Icon = category.icon
              return (
                <RevealOnScroll key={category.title} direction="up" delay={index * 0.1}>
                  <motion.div
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="glass-strong rounded-xl p-6 border border-white/10 hover:border-neon-cyan transition-all"
                  >
                    <div className={`w-12 h-12 rounded-full glass ${category.borderClass} border flex items-center justify-center mb-4`}>
                      <Icon className={`w-6 h-6 ${category.textClass}`} />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-4">{category.title}</h3>
                    <div className="flex flex-wrap gap-2">
                      {category.skills.slice(0, 3).map((skill, idx) => (
                        <span
                          key={idx}
                          className={`px-3 py-1 rounded-full text-xs glass ${category.borderClass}/30 border ${category.textClass}`}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </RevealOnScroll>
              )
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-20 sm:py-32 z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <RevealOnScroll direction="fade">
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-orbitron font-bold mb-4">
                <span className="text-neon-cyan">{t('home.statsTitle')}</span>{' '}
                <span className="text-neon-magenta">&</span>{' '}
                <span className="text-neon-blue">{t('home.statsSubtitle')}</span>
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-neon-cyan to-neon-magenta mx-auto mb-4" />
            </div>
          </RevealOnScroll>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: t('experience.years'), value: '5+', icon: Briefcase, borderClass: 'border-neon-cyan', textClass: 'text-neon-cyan' },
              { label: t('experience.completedProjects'), value: '20+', icon: Award, borderClass: 'border-neon-magenta', textClass: 'text-neon-magenta' },
              { label: t('experience.masteredTech'), value: '15+', icon: Zap, borderClass: 'border-neon-blue', textClass: 'text-neon-blue' },
              { label: t('experience.satisfiedClients'), value: '10+', icon: Users, borderClass: 'border-neon-cyan', textClass: 'text-neon-cyan' },
            ].map((stat, index) => {
              const Icon = stat.icon
              return (
                <RevealOnScroll key={stat.label} direction="up" delay={index * 0.1}>
                  <motion.div
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="glass-strong rounded-xl p-6 border border-white/10 text-center hover:border-neon-cyan transition-all"
                  >
                    <div className={`w-12 h-12 mx-auto mb-4 rounded-full glass ${stat.borderClass} border flex items-center justify-center`}>
                      <Icon className={`w-6 h-6 ${stat.textClass}`} />
                    </div>
                    <div className={`text-3xl font-bold ${stat.textClass} mb-2 font-orbitron`}>
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                  </motion.div>
                </RevealOnScroll>
              )
            })}
          </div>
        </div>
      </section>

      {/* About Preview Section */}
      <section className="relative py-20 sm:py-32 z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <RevealOnScroll direction="right">
              <div>
                <h2 className="text-4xl sm:text-5xl md:text-6xl font-orbitron font-bold mb-6">
                  <span className="text-neon-cyan">{t('about.title')}</span>
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-neon-cyan to-neon-magenta mb-6" />
                <p className="text-gray-300 leading-relaxed mb-6">
                  {t('about.intro')}
                </p>
                <p className="text-gray-300 leading-relaxed mb-8">
                  {t('about.background')}
                </p>
                <Link href="/about">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 glass-strong border-neon-magenta rounded-lg text-neon-magenta font-semibold hover:glow-magenta transition-all inline-flex items-center gap-2"
                  >
                    {t('hero.knowMore')}
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                </Link>
              </div>
            </RevealOnScroll>

            <RevealOnScroll direction="left">
              <div className="glass-strong rounded-2xl p-8 border border-white/10">
                <div className="grid grid-cols-2 gap-6">
                  {experiences.slice(0, 4).map((exp, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      whileHover={{ scale: 1.05, y: -5 }}
                      className="glass rounded-xl p-4 border border-white/10 hover:border-neon-cyan transition-all"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <Briefcase className="w-5 h-5 text-neon-cyan" />
                        <h3 className="text-sm font-bold text-white">{exp.company}</h3>
                      </div>
                      <p className="text-xs text-gray-400 mb-1">{exp.title}</p>
                      <p className="text-xs text-neon-magenta">{exp.period}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="relative py-20 sm:py-32 z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <RevealOnScroll direction="fade">
            <div className="glass-strong rounded-2xl p-12 border border-white/10 text-center max-w-4xl mx-auto">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                className="inline-block mb-6"
              >
                <Sparkles className="w-16 h-16 text-neon-cyan" />
              </motion.div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-orbitron font-bold mb-6">
                <span className="text-neon-cyan">{t('home.ctaTitle')}</span>{' '}
                <span className="text-neon-magenta">{t('home.ctaSubtitle')}</span>
              </h2>
              <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
                {t('home.ctaDescription')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 glass-strong border-neon-cyan rounded-lg text-neon-cyan font-semibold hover:glow-cyan transition-all inline-flex items-center gap-2"
                  >
                    {t('contact.title')}
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                </Link>
                <Link href="/services">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 glass border border-white/10 rounded-lg text-white font-semibold hover:border-neon-magenta hover:text-neon-magenta transition-all inline-flex items-center gap-2"
                  >
                    {t('home.viewServices')}
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                </Link>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </div>
  )
}

