'use client'

import AnimatedText from '@/components/AnimatedText'
import CreativeProcess from '@/components/CreativeProcess'
import JourneyMap from '@/components/JourneyMap'
import KnowledgeTree from '@/components/KnowledgeTree'
import ParallaxSection from '@/components/ParallaxSection'
import ProjectCard from '@/components/ProjectCard'
import PublicationCard from '@/components/PublicationCard'
import RevealOnScroll from '@/components/RevealOnScroll'
import StatusClock from '@/components/StatusClock'
import { useLanguage } from '@/contexts/LanguageContext'
import { publications, skills } from '@/lib/data'
import { motion } from 'framer-motion'
import { ArrowRight, Award, Briefcase, Code, FileText, Globe, GraduationCap, Handshake, Layers, MapPin, Users, Zap } from 'lucide-react'
import nextDynamic from 'next/dynamic'
import Link from 'next/link'

// Lazy load ThreeScene - reduz ~200KB do bundle inicial
const ThreeScene = nextDynamic(() => import('@/components/ThreeScene'), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-transparent" />
})

export default function Home() {
  const { t } = useLanguage()
  const projectsData = t('projects.items')
  const featuredProjects = Array.isArray(projectsData) ? projectsData.slice(0, 3) : []

  // Get featured publications or first 3 most recent
  const featuredPublications = publications
    .filter(pub => pub.featured)
    .slice(0, 3)
    .concat(
      publications
        .filter(pub => !pub.featured)
        .slice(0, Math.max(0, 3 - publications.filter(pub => pub.featured).length))
    )
    .slice(0, 3)

  const experiencesData = t('experiences')
  const featuredExperiences = Array.isArray(experiencesData) ? experiencesData.slice(0, 4) : []

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
      <div className="relative min-h-screen flex items-center justify-center z-10 pb-24">
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-20">
          <div className="text-center">
            {/* Status Clock */}
            <div className="flex justify-center mb-8">
              <RevealOnScroll direction="down" delay={0.2}>
                <StatusClock />
              </RevealOnScroll>
            </div>

            {/* Main heading */}
            <RevealOnScroll direction="fade">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-orbitron font-bold mb-6">
                <span className="text-neon-cyan">ALBERTO</span>
                <br />
                <span className="text-neon-magenta">DIMANDE</span>
              </h1>
            </RevealOnScroll>

            {/* Animated title */}
            <RevealOnScroll direction="up" delay={0.2} className="mb-6">
              <AnimatedText
                text={t('hero.subtitle')}
                className="text-xl sm:text-2xl md:text-3xl font-orbitron font-medium text-white mb-2"
              />
              <p className="text-base sm:text-lg text-gray-300 mt-3">
                📍 {t('hero.location')}
              </p>
            </RevealOnScroll>

            {/* Skills icons */}
            <ParallaxSection speed={0.3} className="flex justify-center gap-6 sm:gap-10 mb-10 flex-wrap">
              <motion.div
                whileHover={{ scale: 1.15, y: -8 }}
                className="flex flex-col items-center group"
              >
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full glass border border-neon-cyan flex items-center justify-center mb-2 group-hover:glow-cyan transition-all">
                  <Layers className="w-7 h-7 sm:w-8 sm:h-8 text-neon-cyan" />
                </div>
                <span className="text-xs sm:text-sm text-gray-400">{t('hero.gis')}</span>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.15, y: -8 }}
                className="flex flex-col items-center group"
              >
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full glass border border-neon-magenta flex items-center justify-center mb-2 group-hover:glow-magenta transition-all">
                  <MapPin className="w-7 h-7 sm:w-8 sm:h-8 text-neon-magenta" />
                </div>
                <span className="text-xs sm:text-sm text-gray-400">{t('hero.urbanism')}</span>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.15, y: -8 }}
                className="flex flex-col items-center group"
              >
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full glass border border-neon-blue flex items-center justify-center mb-2 group-hover:glow-blue transition-all">
                  <Code className="w-7 h-7 sm:w-8 sm:h-8 text-neon-blue" />
                </div>
                <span className="text-xs sm:text-sm text-gray-400">{t('hero.webDev')}</span>
              </motion.div>
            </ParallaxSection>

            {/* CTA Buttons */}
            <RevealOnScroll direction="up" delay={0.6} className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <Link href="/about">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 sm:px-8 sm:py-4 glass-strong border border-neon-cyan rounded-lg text-neon-cyan font-semibold hover:glow-cyan transition-all text-sm sm:text-base"
                >
                  {t('hero.knowMore')}
                </motion.button>
              </Link>
              <Link href="/projects">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 sm:px-8 sm:py-4 glass-strong border border-neon-magenta rounded-lg text-neon-magenta font-semibold hover:glow-magenta transition-all text-sm sm:text-base"
                >
                  {t('hero.viewProjects')}
                </motion.button>
              </Link>
            </RevealOnScroll>
          </div>
        </div>

        {/* Scroll indicator - Mouse animado (posição fixa no fundo) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-1"
        >
          <div className="w-5 h-8 rounded-full border-2 border-neon-cyan/60 flex justify-center pt-1.5">
            <motion.div
              className="w-1 h-2 bg-neon-cyan rounded-full"
              animate={{ y: [0, 10, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
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

      {/* Knowledge Tree Section */}
      <section className="relative py-12 sm:py-20 z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <KnowledgeTree />
        </div>
      </section>

      {/* Journey Map Section */}
      <section className="relative py-12 sm:py-20 z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <JourneyMap />
        </div>
      </section>

      {/* Creative Process Section */}
      <section className="relative py-12 sm:py-20 z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <CreativeProcess />
        </div>
      </section>

      {/* Publications Section */}
      <section className="relative py-20 sm:py-32 z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <RevealOnScroll direction="fade">
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-4 mb-4">
                <FileText className="w-10 h-10 text-neon-cyan hidden sm:block" />
                <h2 className="text-4xl sm:text-5xl md:text-6xl font-orbitron font-bold">
                  <span className="text-neon-cyan">{t('publications.title')}</span>{' '}
                  <span className="text-neon-magenta">&</span>{' '}
                  <span className="text-neon-blue">{t('publications.subtitle')}</span>
                </h2>
                <GraduationCap className="w-10 h-10 text-neon-magenta hidden sm:block" />
              </div>
              <div className="w-32 h-1 bg-gradient-to-r from-neon-cyan via-neon-magenta to-neon-blue mx-auto mb-4" />
              <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                {t('publications.description')}
              </p>
              
              {/* Stats Preview */}
              <div className="flex flex-wrap justify-center gap-6 mt-8">
                <div className="glass rounded-lg px-4 py-2 border border-neon-cyan/30">
                  <div className="text-2xl font-bold text-neon-cyan font-orbitron">{publications.length}</div>
                  <div className="text-xs text-gray-400">Publicações</div>
                </div>
                <div className="glass rounded-lg px-4 py-2 border border-neon-magenta/30">
                  <div className="text-2xl font-bold text-neon-magenta font-orbitron">
                    {new Set(publications.map((p) => p.journal)).size}
                  </div>
                  <div className="text-xs text-gray-400">Revistas</div>
                </div>
                <div className="glass rounded-lg px-4 py-2 border border-neon-blue/30">
                  <div className="text-2xl font-bold text-neon-blue font-orbitron">
                    {new Set(publications.flatMap((p) => p.topics)).size}
                  </div>
                  <div className="text-xs text-gray-400">Tópicos</div>
                </div>
              </div>
            </div>
          </RevealOnScroll>

          {/* Featured Publications Grid - Using PublicationCard Component */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {featuredPublications.map((publication, index) => (
              <RevealOnScroll key={publication.slug || index} direction="up" delay={index * 0.1}>
                <PublicationCard publication={publication} index={index} />
              </RevealOnScroll>
            ))}
          </div>

          {/* Call to Action */}
          <RevealOnScroll direction="fade" className="text-center">
            <Link href="/publications">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 glass-strong border-neon-magenta rounded-lg text-neon-magenta font-semibold hover:glow-magenta transition-all inline-flex items-center gap-2 text-lg"
              >
                Ver Todas as Publicações
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
              { title: t('about.languages'), skills: skills.languages, icon: Globe, borderClass: 'border-neon-cyan', textClass: 'text-neon-cyan' },
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
                  {featuredExperiences.map((exp, index) => (
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
                <Handshake className="w-16 h-16 text-neon-cyan" />
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

