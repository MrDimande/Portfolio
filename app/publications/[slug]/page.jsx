'use client'

import InteractiveMap from '@/components/InteractiveMap'
import PublicationStats from '@/components/PublicationStats'
import RevealOnScroll from '@/components/RevealOnScroll'
import { useLanguage } from '@/contexts/LanguageContext'
import { publications } from '@/lib/data'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, Calendar, Download, ExternalLink, Eye, FileText, List, MessageCircle, Moon, Quote, Send, Share2, Star, Sun, ThumbsUp, User, Volume2, VolumeX } from 'lucide-react'
import Link from 'next/link'
import { notFound, useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function PublicationPage() {
  const params = useParams()
  const { t } = useLanguage()
  const slug = params.slug

  const publication = publications.find((p) => p.slug === slug)

  // Rating state
  const [userRating, setUserRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [averageRating, setAverageRating] = useState(4.5)
  const [totalRatings, setTotalRatings] = useState(12)

  // Comments state
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState('')
  const [commentName, setCommentName] = useState('')
  const [showCommentForm, setShowCommentForm] = useState(false)

  // Table of Contents state
  const [activeSection, setActiveSection] = useState('resumo')

  // View & Download counters
  const [viewCount, setViewCount] = useState(0)
  const [downloadCount, setDownloadCount] = useState(0)

  // Reading mode (dark/light)
  const [readingMode, setReadingMode] = useState('dark')

  // Text-to-speech
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [speechSupported, setSpeechSupported] = useState(false)

  // Check speech synthesis support
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      setSpeechSupported(true)
    }
  }, [])

  // Handle text-to-speech
  const handleSpeak = () => {
    if (!speechSupported) return

    if (isSpeaking) {
      window.speechSynthesis.cancel()
      setIsSpeaking(false)
    } else {
      const textToRead = `${publication.title}. ${publication.subtitle || ''}. ${publication.description}`
      const utterance = new SpeechSynthesisUtterance(textToRead)
      utterance.lang = 'pt-PT'
      utterance.rate = 0.9
      utterance.onend = () => setIsSpeaking(false)
      utterance.onerror = () => setIsSpeaking(false)
      window.speechSynthesis.speak(utterance)
      setIsSpeaking(true)
    }
  }

  // Load saved data from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined' && slug) {
      const savedRating = localStorage.getItem(`publication-rating-${slug}`)
      if (savedRating) setUserRating(parseInt(savedRating))

      const savedComments = localStorage.getItem(`publication-comments-${slug}`)
      if (savedComments) setComments(JSON.parse(savedComments))

      const savedStats = localStorage.getItem(`publication-stats-${slug}`)
      if (savedStats) {
        const stats = JSON.parse(savedStats)
        setAverageRating(stats.average)
        setTotalRatings(stats.total)
      }

      // Load view count and increment
      const savedViews = localStorage.getItem(`publication-views-${slug}`)
      const currentViews = savedViews ? parseInt(savedViews) + 1 : 1
      setViewCount(currentViews)
      localStorage.setItem(`publication-views-${slug}`, currentViews.toString())

      // Load download count
      const savedDownloads = localStorage.getItem(`publication-downloads-${slug}`)
      if (savedDownloads) setDownloadCount(parseInt(savedDownloads))
    }
  }, [slug])

  // Handle download tracking
  const handleDownload = () => {
    const newDownloadCount = downloadCount + 1
    setDownloadCount(newDownloadCount)
    localStorage.setItem(`publication-downloads-${slug}`, newDownloadCount.toString())
  }

  if (!publication) {
    notFound()
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: publication.title,
          text: publication.description,
          url: window.location.href,
        })
      } catch (error) {
        console.log('Error sharing:', error)
      }
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert('Link copiado!')
    }
  }

  const handleRating = (rating) => {
    setUserRating(rating)
    localStorage.setItem(`publication-rating-${slug}`, rating.toString())
    
    // Update average (simplified - in real app would use backend)
    const newTotal = totalRatings + 1
    const newAverage = ((averageRating * totalRatings) + rating) / newTotal
    setTotalRatings(newTotal)
    setAverageRating(parseFloat(newAverage.toFixed(1)))
    localStorage.setItem(`publication-stats-${slug}`, JSON.stringify({ average: newAverage, total: newTotal }))
  }

  const handleAddComment = (e) => {
    e.preventDefault()
    if (!newComment.trim() || !commentName.trim()) return

    const comment = {
      id: Date.now(),
      name: commentName,
      text: newComment,
      date: new Date().toLocaleDateString('pt-PT'),
      likes: 0,
    }

    const updatedComments = [comment, ...comments]
    setComments(updatedComments)
    localStorage.setItem(`publication-comments-${slug}`, JSON.stringify(updatedComments))
    setNewComment('')
    setCommentName('')
    setShowCommentForm(false)
  }

  const handleLikeComment = (commentId) => {
    const updatedComments = comments.map((c) =>
      c.id === commentId ? { ...c, likes: c.likes + 1 } : c
    )
    setComments(updatedComments)
    localStorage.setItem(`publication-comments-${slug}`, JSON.stringify(updatedComments))
  }

  // Table of Contents sections
  const sections = [
    { id: 'resumo', label: 'Resumo', icon: '📄' },
    ...(publication.quote ? [{ id: 'citacao', label: 'Citação Destacada', icon: '💬' }] : []),
    ...(publication.pdfUrl ? [{ id: 'documento', label: 'Documento Completo', icon: '📑' }] : []),
    { id: 'avaliacao', label: 'Avaliação', icon: '⭐' },
    { id: 'comentarios', label: 'Comentários', icon: '💭' },
  ]

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId)
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="relative min-h-screen py-20 z-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <RevealOnScroll direction="fade">
          <Link href="/publications">
            <motion.button
              whileHover={{ scale: 1.05, x: -5 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 text-gray-400 hover:text-neon-cyan transition-colors mb-8"
            >
              <ArrowLeft className="w-5 h-5" />
              Voltar às Publicações
            </motion.button>
          </Link>
        </RevealOnScroll>

        {/* Article Header */}
        <RevealOnScroll direction="up">
          <div className="glass-strong rounded-2xl p-8 border border-white/10 mb-8">
            {/* Type Badge & Rating Display */}
            <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
              <div className="flex items-center gap-3">
                <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                  publication.color === 'neon-cyan' ? 'bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/30' :
                  publication.color === 'neon-magenta' ? 'bg-neon-magenta/10 text-neon-magenta border border-neon-magenta/30' :
                  'bg-neon-blue/10 text-neon-blue border border-neon-blue/30'
                }`}>
                  {publication.type}
                </span>
                {publication.featured && (
                  <span className="px-3 py-1 rounded-full bg-yellow-500/10 text-yellow-400 text-xs border border-yellow-500/30">
                    ⭐ Destaque
                  </span>
                )}
              </div>
              {/* Average Rating Display */}
              <div className="flex items-center gap-2 text-sm">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-4 h-4 ${star <= Math.round(averageRating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}`}
                    />
                  ))}
                </div>
                <span className="text-yellow-400 font-medium">{averageRating}</span>
                <span className="text-gray-500">({totalRatings} avaliações)</span>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-orbitron font-bold text-white mb-4">
              {publication.title}
            </h1>

            {publication.subtitle && (
              <p className="text-xl text-neon-magenta mb-6">{publication.subtitle}</p>
            )}

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400 mb-6">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-neon-cyan" />
                <span>{publication.authors?.join(', ')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-neon-magenta" />
                <span>{publication.year}</span>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-neon-blue" />
                <span>{publication.journal}</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-neon-cyan" />
                <span>{comments.length} comentários</span>
              </div>
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-green-400" />
                <span className="text-green-400">{viewCount} visualizações</span>
              </div>
              {publication.pdfUrl && (
                <div className="flex items-center gap-2">
                  <Download className="w-4 h-4 text-yellow-400" />
                  <span className="text-yellow-400">{downloadCount} downloads</span>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              {publication.pdfUrl && (
                <Link href={publication.pdfUrl} target="_blank" onClick={handleDownload}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-6 py-3 rounded-lg glass border border-neon-cyan text-neon-cyan font-medium hover:glow-cyan transition-all"
                  >
                    <Download className="w-5 h-5" />
                    Download PDF
                    <span className="text-xs opacity-60">({downloadCount})</span>
                  </motion.button>
                </Link>
              )}
              <motion.button
                onClick={handleShare}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-6 py-3 rounded-lg glass border border-white/10 text-white font-medium hover:border-neon-magenta hover:text-neon-magenta transition-all"
              >
                <Share2 className="w-5 h-5" />
                Partilhar
              </motion.button>
              {publication.link && (
                <Link href={publication.link} target="_blank">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-6 py-3 rounded-lg glass border border-neon-blue text-neon-blue font-medium hover:glow-blue transition-all"
                  >
                    <ExternalLink className="w-5 h-5" />
                    Ver Original
                  </motion.button>
                </Link>
              )}
            </div>
          </div>
        </RevealOnScroll>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Table of Contents */}
          <div className="lg:col-span-1 order-2 lg:order-1">
            <div className="lg:sticky lg:top-24 space-y-6">
              {/* Table of Contents */}
              <RevealOnScroll direction="right" delay={0.1}>
                <div className="glass-strong rounded-xl p-6 border border-white/10">
                  <div className="flex items-center gap-2 mb-4">
                    <List className="w-5 h-5 text-neon-cyan" />
                    <h3 className="text-lg font-bold text-white">Índice</h3>
                  </div>
                  <nav className="space-y-2">
                    {sections.map((section) => (
                      <motion.button
                        key={section.id}
                        onClick={() => scrollToSection(section.id)}
                        whileHover={{ x: 5 }}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm flex items-center gap-2 transition-all ${
                          activeSection === section.id
                            ? 'bg-neon-cyan/10 text-neon-cyan border-l-2 border-neon-cyan'
                            : 'text-gray-400 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        <span>{section.icon}</span>
                        {section.label}
                      </motion.button>
                    ))}
                  </nav>
                </div>
              </RevealOnScroll>

              {/* Topics */}
              <RevealOnScroll direction="right" delay={0.2}>
                <div className="glass-strong rounded-xl p-6 border border-white/10">
                  <h3 className="text-lg font-bold text-white mb-4">Tópicos</h3>
                  <div className="flex flex-wrap gap-2">
                    {publication.topics?.map((topic, index) => (
                      <span
                        key={index}
                        className={`px-3 py-1 rounded-full text-xs ${
                          publication.color === 'neon-cyan' ? 'bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/30' :
                          publication.color === 'neon-magenta' ? 'bg-neon-magenta/10 text-neon-magenta border border-neon-magenta/30' :
                          'bg-neon-blue/10 text-neon-blue border border-neon-blue/30'
                        }`}
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              </RevealOnScroll>

              {/* Citation */}
              <RevealOnScroll direction="right" delay={0.3}>
                <div className="glass-strong rounded-xl p-6 border border-white/10">
                  <h3 className="text-lg font-bold text-white mb-4">Citação (APA)</h3>
                  <p className="text-xs text-gray-400 leading-relaxed bg-dark-bg/50 rounded-lg p-3 border border-white/5">
                    {publication.citation}
                  </p>
                  <div className="flex gap-2 mt-3">
                    <motion.button
                      onClick={() => {
                        navigator.clipboard.writeText(publication.citation)
                        alert('Citação copiada!')
                      }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 px-3 py-2 rounded-lg glass border border-white/10 text-xs text-gray-300 hover:border-neon-cyan hover:text-neon-cyan transition-all"
                    >
                      📋 Copiar
                    </motion.button>
                    <a
                      href={`mailto:?subject=${encodeURIComponent(`Citação: ${publication.title}`)}&body=${encodeURIComponent(`Olá,\n\nGostaria de partilhar esta referência bibliográfica:\n\n${publication.citation}\n\nLink: ${typeof window !== 'undefined' ? window.location.href : ''}\n\nAtenciosamente`)}`}
                      className="flex-1"
                    >
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full px-3 py-2 rounded-lg glass border border-white/10 text-xs text-gray-300 hover:border-neon-magenta hover:text-neon-magenta transition-all"
                      >
                        📧 Email
                      </motion.button>
                    </a>
                  </div>
                </div>
              </RevealOnScroll>

              {/* Statistics Chart */}
              <RevealOnScroll direction="right" delay={0.4}>
                <PublicationStats publication={publication} />
              </RevealOnScroll>

              {/* Interactive Map (for territorial planning articles) */}
              {(publication.topics?.some(t => 
                t.toLowerCase().includes('território') || 
                t.toLowerCase().includes('territorial') || 
                t.toLowerCase().includes('urbano') ||
                t.toLowerCase().includes('geog') ||
                t.toLowerCase().includes('maputo') ||
                t.toLowerCase().includes('gis')
              )) && (
                <RevealOnScroll direction="right" delay={0.5}>
                  <InteractiveMap publication={publication} />
                </RevealOnScroll>
              )}
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 order-1 lg:order-2 space-y-8">
            {/* Quote (if available) */}
            {publication.quote && (
              <RevealOnScroll direction="up" delay={0.1}>
                <div id="citacao" className="glass-strong rounded-xl p-6 border-l-4 border-neon-cyan">
                  <Quote className="w-8 h-8 text-neon-cyan mb-4" />
                  <blockquote className="text-xl text-white italic leading-relaxed">
                    "{publication.quote}"
                  </blockquote>
                  <p className="text-gray-400 mt-4">— {publication.authors?.[0]}</p>
                </div>
              </RevealOnScroll>
            )}

            {/* Description / Abstract */}
            <RevealOnScroll direction="up" delay={0.2}>
              <div 
                id="resumo" 
                className={`rounded-xl p-8 border transition-all duration-300 ${
                  readingMode === 'light' 
                    ? 'bg-white/95 border-gray-200' 
                    : 'glass-strong border-white/10'
                }`}
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className={`text-2xl font-orbitron font-bold ${
                    readingMode === 'light' ? 'text-gray-800' : 'text-neon-cyan'
                  }`}>
                    Resumo
                  </h2>
                  {/* Reading Mode Toggle */}
                  <motion.button
                    onClick={() => setReadingMode(readingMode === 'dark' ? 'light' : 'dark')}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                      readingMode === 'light'
                        ? 'bg-gray-800 text-white'
                        : 'bg-white/10 text-gray-300 hover:bg-white/20'
                    }`}
                  >
                    {readingMode === 'dark' ? (
                      <>
                        <Sun className="w-3.5 h-3.5" />
                        Modo Claro
                      </>
                    ) : (
                      <>
                        <Moon className="w-3.5 h-3.5" />
                        Modo Escuro
                      </>
                    )}
                  </motion.button>
                  {/* Text-to-Speech Button */}
                  {speechSupported && (
                    <motion.button
                      onClick={handleSpeak}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                        isSpeaking
                          ? 'bg-neon-cyan text-dark-bg'
                          : 'bg-white/10 text-gray-300 hover:bg-white/20'
                      }`}
                    >
                      {isSpeaking ? (
                        <>
                          <VolumeX className="w-3.5 h-3.5" />
                          Parar
                        </>
                      ) : (
                        <>
                          <Volume2 className="w-3.5 h-3.5" />
                          Ouvir
                        </>
                      )}
                    </motion.button>
                  )}
                </div>
                <p className={`leading-relaxed text-lg ${
                  readingMode === 'light' ? 'text-gray-700' : 'text-gray-300'
                }`}>
                  {publication.description}
                </p>
              </div>
            </RevealOnScroll>

            {/* PDF Viewer (if available) */}
            {publication.pdfUrl && (
              <RevealOnScroll direction="up" delay={0.3}>
                <div id="documento" className="glass-strong rounded-xl p-6 border border-white/10">
                  <h2 className="text-2xl font-orbitron font-bold text-neon-magenta mb-6">
                    Documento Completo
                  </h2>
                  <div className="aspect-[3/4] w-full rounded-lg overflow-hidden border border-white/10">
                    <iframe
                      src={`${publication.pdfUrl}#view=FitH`}
                      className="w-full h-full"
                      title={publication.title}
                    />
                  </div>
                  <p className="text-sm text-gray-400 mt-4 text-center">
                    Caso o PDF não carregue,{' '}
                    <Link href={publication.pdfUrl} target="_blank" className="text-neon-cyan hover:underline">
                      clique aqui para abrir numa nova janela
                    </Link>
                  </p>
                </div>
              </RevealOnScroll>
            )}

            {/* Rating Section */}
            <RevealOnScroll direction="up" delay={0.4}>
              <div id="avaliacao" className="glass-strong rounded-xl p-8 border border-white/10">
                <h2 className="text-2xl font-orbitron font-bold text-yellow-400 mb-6">
                  ⭐ Avaliar este Artigo
                </h2>
                <div className="flex flex-col items-center gap-4">
                  <p className="text-gray-400">Clica nas estrelas para avaliar:</p>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <motion.button
                        key={star}
                        onMouseEnter={() => setHoveredRating(star)}
                        onMouseLeave={() => setHoveredRating(0)}
                        onClick={() => handleRating(star)}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-1"
                      >
                        <Star
                          className={`w-10 h-10 transition-colors ${
                            star <= (hoveredRating || userRating)
                              ? 'text-yellow-400 fill-yellow-400'
                              : 'text-gray-600'
                          }`}
                        />
                      </motion.button>
                    ))}
                  </div>
                  {userRating > 0 && (
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-neon-cyan"
                    >
                      Obrigado! Você avaliou com {userRating} estrela{userRating > 1 ? 's' : ''}.
                    </motion.p>
                  )}
                  <div className="text-center text-sm text-gray-500 mt-2">
                    <p>Média: <span className="text-yellow-400 font-medium">{averageRating}</span> ({totalRatings} avaliações)</p>
                  </div>
                </div>
              </div>
            </RevealOnScroll>

            {/* Comments Section */}
            <RevealOnScroll direction="up" delay={0.5}>
              <div id="comentarios" className="glass-strong rounded-xl p-8 border border-white/10">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-orbitron font-bold text-neon-cyan flex items-center gap-2">
                    <MessageCircle className="w-6 h-6" />
                    Comentários ({comments.length})
                  </h2>
                  <motion.button
                    onClick={() => setShowCommentForm(!showCommentForm)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 rounded-lg glass border border-neon-cyan text-neon-cyan text-sm font-medium hover:glow-cyan transition-all"
                  >
                    {showCommentForm ? 'Cancelar' : '+ Adicionar Comentário'}
                  </motion.button>
                </div>

                {/* Comment Form */}
                <AnimatePresence>
                  {showCommentForm && (
                    <motion.form
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      onSubmit={handleAddComment}
                      className="mb-6 p-4 rounded-lg bg-dark-bg/50 border border-white/10"
                    >
                      <div className="space-y-4">
                        <input
                          type="text"
                          value={commentName}
                          onChange={(e) => setCommentName(e.target.value)}
                          placeholder="Seu nome..."
                          className="w-full px-4 py-2 rounded-lg glass border border-white/10 bg-transparent text-white placeholder-gray-500 focus:border-neon-cyan focus:outline-none"
                          required
                        />
                        <textarea
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                          placeholder="Escreva seu comentário..."
                          rows={3}
                          className="w-full px-4 py-2 rounded-lg glass border border-white/10 bg-transparent text-white placeholder-gray-500 focus:border-neon-cyan focus:outline-none resize-none"
                          required
                        />
                        <motion.button
                          type="submit"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full px-4 py-2 rounded-lg bg-gradient-to-r from-neon-cyan to-neon-blue text-dark-bg font-medium flex items-center justify-center gap-2"
                        >
                          <Send className="w-4 h-4" />
                          Enviar Comentário
                        </motion.button>
                      </div>
                    </motion.form>
                  )}
                </AnimatePresence>

                {/* Comments List */}
                <div className="space-y-4">
                  {comments.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">
                      Ainda não há comentários. Seja o primeiro a comentar!
                    </p>
                  ) : (
                    comments.map((comment) => (
                      <motion.div
                        key={comment.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 rounded-lg glass border border-white/10"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-neon-cyan to-neon-blue flex items-center justify-center text-dark-bg font-bold text-sm">
                              {comment.name.charAt(0).toUpperCase()}
                            </div>
                            <span className="font-medium text-white">{comment.name}</span>
                          </div>
                          <span className="text-xs text-gray-500">{comment.date}</span>
                        </div>
                        <p className="text-gray-300 text-sm mb-3">{comment.text}</p>
                        <motion.button
                          onClick={() => handleLikeComment(comment.id)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex items-center gap-1 text-xs text-gray-500 hover:text-neon-cyan transition-colors"
                        >
                          <ThumbsUp className="w-3 h-3" />
                          {comment.likes > 0 && <span>{comment.likes}</span>}
                        </motion.button>
                      </motion.div>
                    ))
                  )}
                </div>
              </div>
            </RevealOnScroll>

            {/* Related Publications */}
            <RevealOnScroll direction="up" delay={0.6}>
              <div className="glass-strong rounded-xl p-6 border border-white/10">
                <h3 className="text-lg font-bold text-white mb-4">Outras Publicações</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {publications
                    .filter((p) => p.slug !== slug)
                    .slice(0, 3)
                    .map((p, index) => (
                      <Link key={index} href={`/publications/${p.slug}`}>
                        <motion.div
                          whileHover={{ y: -5 }}
                          className="p-4 rounded-lg glass border border-white/5 hover:border-neon-cyan/30 transition-all cursor-pointer h-full"
                        >
                          <p className="text-sm text-white font-medium line-clamp-2 mb-2">{p.title}</p>
                          <p className="text-xs text-gray-500">{p.year} • {p.type}</p>
                        </motion.div>
                      </Link>
                    ))}
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </div>
    </div>
  )
}
