'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Bot, Send, User, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

export default function ChatBot() {
  const { t } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)

  const quickReplies = [
    { text: 'Serviços', icon: '🛠️' },
    { text: 'Projetos', icon: '📁' },
    { text: 'Contacto', icon: '📧' },
    { text: 'Experiência', icon: '💼' },
  ]

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    // Welcome message
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          id: 1,
          text: 'Olá! 👋 Sou o assistente virtual do Alberto. Como posso ajudar-te hoje?',
          sender: 'bot',
          timestamp: new Date(),
        },
      ])
    }
  }, [isOpen, messages.length])

  const faqResponses = {
    'serviços': '🛠️ Ofereço serviços de:\n• Planeamento Territorial\n• Análise GIS (ArcGIS/QGIS)\n• Desenvolvimento Web\n• Consultoria Técnica\n\nVisita a página de Serviços para mais detalhes!',
    'projetos': '📁 Trabalho em projetos que fundem planeamento territorial, GIS e desenvolvimento web. Podes ver todos os projetos na página de Projetos.',
    'experiência': '💼 Tenho experiência em:\n• Planeamento territorial na Municipalidade de Maputo\n• Desenvolvimento web full-stack\n• Tradução e interpretação\n\nVerifica a página de Experiência!',
    'contacto': '📧 Podes contactar-me através de:\n• Email: alberto.dimande@outlook.com\n• LinkedIn\n• WhatsApp\n• Formulário de contacto\n\nEstou sempre disponível para conversar!',
    'gis': '🗺️ Utilizo ArcGIS e QGIS para análise espacial, cartografia e visualização de dados geoespaciais. Também desenvolvo aplicações web GIS.',
    'preços': '💰 Os preços variam conforme o projeto. Contacta-me para uma consulta personalizada e orçamento detalhado.',
    'disponibilidade': '📅 Estou disponível para novos projetos! Podes agendar uma reunião através do calendário na página de Contacto.',
    'olá': '👋 Olá! Como posso ajudar-te hoje? Podes perguntar sobre serviços, projetos, experiência ou contacto.',
    'oi': '👋 Oi! Como posso ajudar-te hoje?',
    'obrigado': '😊 De nada! Se tiveres mais alguma pergunta, estou aqui para ajudar.',
  }

  const handleSendMessage = (text = inputValue) => {
    if (!text.trim()) return

    const userMessage = {
      id: messages.length + 1,
      text: text,
      sender: 'user',
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)

    // Simulate bot response with typing delay
    setTimeout(() => {
      const lowerInput = text.toLowerCase()
      let botResponse = '🤔 Não tenho certeza sobre isso, mas podes encontrar mais informações nas páginas do portfolio ou contactar o Alberto diretamente!'

      // Check for keywords
      for (const [keyword, response] of Object.entries(faqResponses)) {
        if (lowerInput.includes(keyword)) {
          botResponse = response
          break
        }
      }

      const botMessage = {
        id: messages.length + 2,
        text: botResponse,
        sender: 'bot',
        timestamp: new Date(),
      }

      setIsTyping(false)
      setMessages((prev) => [...prev, botMessage])
    }, 1200)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleQuickReply = (reply) => {
    handleSendMessage(reply.text)
  }

  return (
    <>
      {/* Chat Button - Modern AI Assistant Icon */}
      {!isOpen && (
        <motion.button
          onClick={() => setIsOpen(true)}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-br from-neon-cyan via-neon-blue to-neon-magenta p-[2px] shadow-lg z-40 group"
          aria-label="Abrir chat"
        >
          <div className="w-full h-full rounded-full bg-dark-bg flex items-center justify-center">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Bot className="w-6 h-6 text-neon-cyan group-hover:text-white transition-colors" />
            </motion.div>
          </div>
          {/* Animated ring */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-neon-cyan/50"
            animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.button>
      )}

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed bottom-6 right-6 w-96 h-[600px] glass-strong rounded-2xl border border-neon-cyan/30 overflow-hidden shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10 bg-gradient-to-r from-neon-cyan/10 via-transparent to-neon-magenta/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-neon-cyan via-neon-blue to-neon-magenta p-[2px]">
                  <div className="w-full h-full rounded-full bg-dark-bg flex items-center justify-center">
                    <Bot className="w-5 h-5 text-neon-cyan" />
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white font-orbitron">AI Assistente</h3>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    <p className="text-xs text-green-400">Online</p>
                  </div>
                </div>
              </div>
              <motion.button
                onClick={() => setIsOpen(false)}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                className="w-8 h-8 rounded-full glass border border-white/10 flex items-center justify-center text-gray-400 hover:text-neon-cyan hover:border-neon-cyan transition-all"
              >
                <X className="w-4 h-4" />
              </motion.button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-3 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {message.sender === 'bot' && (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-neon-cyan to-neon-blue p-[1px] flex-shrink-0">
                      <div className="w-full h-full rounded-full bg-dark-bg flex items-center justify-center">
                        <Bot className="w-4 h-4 text-neon-cyan" />
                      </div>
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] rounded-2xl p-3 ${
                      message.sender === 'user'
                        ? 'bg-gradient-to-r from-neon-cyan/20 to-neon-blue/20 border border-neon-cyan/30 text-white'
                        : 'glass-strong border border-white/10 text-gray-300'
                    }`}
                  >
                    <p className="text-sm leading-relaxed whitespace-pre-line">{message.text}</p>
                  </div>
                  {message.sender === 'user' && (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-neon-magenta to-neon-blue p-[1px] flex-shrink-0">
                      <div className="w-full h-full rounded-full bg-dark-bg flex items-center justify-center">
                        <User className="w-4 h-4 text-neon-magenta" />
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
              
              {/* Typing Indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-3 justify-start"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-neon-cyan to-neon-blue p-[1px] flex-shrink-0">
                    <div className="w-full h-full rounded-full bg-dark-bg flex items-center justify-center">
                      <Bot className="w-4 h-4 text-neon-cyan" />
                    </div>
                  </div>
                  <div className="glass-strong border border-white/10 rounded-2xl p-3 flex items-center gap-1">
                    <motion.div
                      className="w-2 h-2 rounded-full bg-neon-cyan"
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                    />
                    <motion.div
                      className="w-2 h-2 rounded-full bg-neon-cyan"
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                    />
                    <motion.div
                      className="w-2 h-2 rounded-full bg-neon-cyan"
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                    />
                  </div>
                </motion.div>
              )}
              
              {/* Quick Replies - show after welcome message */}
              {messages.length === 1 && !isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex flex-wrap gap-2 mt-2"
                >
                  {quickReplies.map((reply, index) => (
                    <motion.button
                      key={reply.text}
                      onClick={() => handleQuickReply(reply)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index }}
                      className="flex items-center gap-2 px-3 py-2 rounded-full glass border border-neon-cyan/30 text-neon-cyan text-xs hover:border-neon-cyan hover:glow-cyan transition-all"
                    >
                      <span>{reply.icon}</span>
                      <span>{reply.text}</span>
                      <ArrowRight className="w-3 h-3" />
                    </motion.button>
                  ))}
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-white/10 bg-dark-card/50">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Escreve uma mensagem..."
                  className="flex-1 px-4 py-3 glass-strong border border-white/10 rounded-xl focus:border-neon-cyan focus:outline-none focus:ring-2 focus:ring-neon-cyan/20 text-white placeholder-gray-500 text-sm"
                />
                <motion.button
                  onClick={() => handleSendMessage()}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={!inputValue.trim()}
                  className="w-12 h-12 rounded-xl bg-gradient-to-r from-neon-cyan to-neon-blue flex items-center justify-center text-dark-bg hover:shadow-lg hover:shadow-neon-cyan/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-5 h-5" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
