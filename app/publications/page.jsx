'use client'

import PublicationCard from '@/components/PublicationCard'
import { useLanguage } from '@/contexts/LanguageContext'
import { publications } from '@/lib/data'
import { motion } from 'framer-motion'
import { BookOpen, Calendar, FileText, Globe, GraduationCap, Search } from 'lucide-react'
import { useState } from 'react'

export default function PublicationsPage() {
  const { t } = useLanguage()
  const [selectedType, setSelectedType] = useState('all')
  const [selectedYear, setSelectedYear] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const types = ['all', 'Monografia / Tese de Licenciatura', 'Artigo Académico', 'Paper Técnico', 'Artigo de Pesquisa', 'Post / Artigo de Opinião', 'Tutorial / Guia Técnico']
  
  // Extract unique years from publications and sort descending
  const years = ['all', ...Array.from(new Set(publications.map((p) => p.year))).sort((a, b) => b - a)]

  const filteredPublications = publications.filter((pub) => {
    const matchesType = selectedType === 'all' || pub.type === selectedType
    const matchesYear = selectedYear === 'all' || pub.year === selectedYear
    const matchesSearch =
      searchQuery === '' ||
      pub.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pub.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pub.topics.some((topic) => topic.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesType && matchesYear && matchesSearch
  })

  return (
    <div className="relative min-h-screen pt-24 sm:pt-32 pb-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <BookOpen className="w-10 h-10 text-neon-cyan" />
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-orbitron font-bold">
              <span className="text-neon-cyan">{t('publications.title')}</span>{' '}
              <span className="text-neon-magenta">&</span>{' '}
              <span className="text-neon-blue">{t('publications.subtitle')}</span>
            </h1>
            <GraduationCap className="w-10 h-10 text-neon-magenta" />
          </div>
          <div className="w-32 h-1 bg-gradient-to-r from-neon-cyan via-neon-magenta to-neon-blue mx-auto mb-4" />
          <p className="text-gray-400 max-w-2xl mx-auto">
            {t('publications.description')}
          </p>
        </motion.div>

        {/* Search & Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12 space-y-6"
        >
          {/* Search Bar */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('publications.searchPlaceholder')}
              className="w-full pl-12 pr-4 py-3 glass-strong border border-white/10 rounded-lg focus:border-neon-cyan focus:outline-none focus:ring-2 focus:ring-neon-cyan/20 text-white placeholder-gray-500 transition-all"
            />
          </div>

          {/* Year Filter */}
          <div className="flex flex-wrap justify-center gap-2">
            <div className="flex items-center gap-2 mr-2">
              <Calendar className="w-4 h-4 text-neon-magenta" />
              <span className="text-sm text-gray-400">Ano:</span>
            </div>
            {years.map((year) => (
              <motion.button
                key={year}
                onClick={() => setSelectedYear(year)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-3 py-1 rounded-full font-medium text-xs transition-all ${
                  selectedYear === year
                    ? 'glass-strong border border-neon-magenta text-neon-magenta'
                    : 'glass border border-white/10 text-gray-500 hover:border-neon-magenta/50 hover:text-gray-300'
                }`}
              >
                {year === 'all' ? 'Todos' : year}
              </motion.button>
            ))}
          </div>

          {/* Type Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-3">
            {types.map((type) => (
              <motion.button
                key={type}
                onClick={() => setSelectedType(type)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                  selectedType === type
                    ? 'glass-strong border border-neon-cyan text-neon-cyan glow-cyan'
                    : 'glass border border-white/10 text-gray-400 hover:border-neon-magenta hover:text-neon-magenta'
                }`}
              >
                {type === 'all' ? t('publications.all') : type}
              </motion.button>
            ))}
          </div>

          {/* Active Filters Display */}
          {(selectedType !== 'all' || selectedYear !== 'all' || searchQuery) && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-wrap justify-center gap-2 items-center"
            >
              <span className="text-xs text-gray-500">Filtros ativos:</span>
              {selectedType !== 'all' && (
                <span className="px-2 py-1 rounded-full text-xs bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/30">
                  {selectedType}
                </span>
              )}
              {selectedYear !== 'all' && (
                <span className="px-2 py-1 rounded-full text-xs bg-neon-magenta/10 text-neon-magenta border border-neon-magenta/30">
                  {selectedYear}
                </span>
              )}
              {searchQuery && (
                <span className="px-2 py-1 rounded-full text-xs bg-neon-blue/10 text-neon-blue border border-neon-blue/30">
                  "{searchQuery}"
                </span>
              )}
              <motion.button
                onClick={() => {
                  setSelectedType('all')
                  setSelectedYear('all')
                  setSearchQuery('')
                }}
                whileHover={{ scale: 1.05 }}
                className="text-xs text-gray-500 hover:text-white underline"
              >
                Limpar filtros
              </motion.button>
            </motion.div>
          )}
        </motion.div>

        {/* Publications Grid */}
        {filteredPublications.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredPublications.map((publication, index) => (
              <PublicationCard key={index} publication={publication} index={index} />
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <FileText className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400">{t('publications.noResults')}</p>
          </motion.div>
        )}

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="glass-strong rounded-xl p-6 border border-white/10 text-center">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full glass border border-neon-cyan flex items-center justify-center">
              <FileText className="w-6 h-6 text-neon-cyan" />
            </div>
            <div className="text-3xl font-bold text-neon-cyan mb-2 font-orbitron">
              {publications.length}
            </div>
            <div className="text-sm text-gray-400">{t('publications.statsPublications')}</div>
          </div>

          <div className="glass-strong rounded-xl p-6 border border-white/10 text-center">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full glass border border-neon-magenta flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-neon-magenta" />
            </div>
            <div className="text-3xl font-bold text-neon-magenta mb-2 font-orbitron">
              {new Set(publications.map((p) => p.journal)).size}
            </div>
            <div className="text-sm text-gray-400">{t('publications.statsJournals')}</div>
          </div>

          <div className="glass-strong rounded-xl p-6 border border-white/10 text-center">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full glass border border-neon-blue flex items-center justify-center">
              <Globe className="w-6 h-6 text-neon-blue" />
            </div>
            <div className="text-3xl font-bold text-neon-blue mb-2 font-orbitron">
              {new Set(publications.flatMap((p) => p.topics)).size}
            </div>
            <div className="text-sm text-gray-400">{t('publications.statsTopics')}</div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

