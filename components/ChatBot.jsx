'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, Bot, User } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

export default function ChatBot() {
  const { t } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [inputValue, setInputValue] = useState('')
  const messagesEndRef = useRef(null)

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
          text: 'Olá! Sou o assistente virtual. Como posso ajudar-te hoje? Podes perguntar sobre serviços, projetos, ou experiência.',
          sender: 'bot',
          timestamp: new Date(),
        },
      ])
    }
  }, [isOpen, messages.length])

  const faqResponses = {
    'serviços': 'Ofereço serviços de planeamento territorial, análise GIS, desenvolvimento web e consultoria técnica. Visita a página de Serviços para mais detalhes.',
    'projetos': 'Trabalho em projetos que fundem planeamento territorial, GIS e desenvolvimento web. Podes ver todos os projetos na página de Projetos.',
    'experiência': 'Tenho experiência em planeamento territorial na Municipalidade de Maputo, desenvolvimento web e tradução. Verifica a página de Experiência.',
    'contacto': 'Podes contactar-me por email (alberto.dimande@outlook.com), LinkedIn, WhatsApp ou através do formulário de contacto.',
    'gis': 'Utilizo ArcGIS e QGIS para análise espacial, cartografia e visualização de dados geoespaciais. Também desenvolvo aplicações web GIS.',
    'preços': 'Os preços variam conforme o projeto. Contacta-me para uma consulta personalizada e orçamento detalhado.',
    'disponibilidade': 'Estou disponível para novos projetos. Podes agendar uma reunião através do calendário na página de Contacto.',
  }

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    const userMessage = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue('')

    // Simulate bot response
    setTimeout(() => {
      const lowerInput = inputValue.toLowerCase()
      let botResponse = 'Obrigado pela tua pergunta! Podes encontrar mais informações nas páginas do portfolio ou contactar-me diretamente.'

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

      setMessages((prev) => [...prev, botMessage])
    }, 1000)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <motion.button
          onClick={() => setIsOpen(true)}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="fixed bottom-6 right-6 w-14 h-14 rounded-full glass-strong border border-neon-cyan flex items-center justify-center text-neon-cyan hover:glow-cyan transition-all shadow-lg z-40"
          aria-label="Abrir chat"
        >
          <MessageCircle className="w-6 h-6" />
          <motion.div
            className="absolute -top-1 -right-1 w-3 h-3 bg-neon-magenta rounded-full"
            animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
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
            <div className="flex items-center justify-between p-4 border-b border-white/10 bg-dark-card/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full glass border border-neon-cyan flex items-center justify-center">
                  <Bot className="w-5 h-5 text-neon-cyan" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Assistente Virtual</h3>
                  <p className="text-xs text-gray-400">Online</p>
                </div>
              </div>
              <motion.button
                onClick={() => setIsOpen(false)}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                className="w-8 h-8 rounded-full glass border border-white/10 flex items-center justify-center text-gray-400 hover:text-neon-cyan transition-colors"
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
                    <div className="w-8 h-8 rounded-full glass border border-neon-cyan flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4 text-neon-cyan" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.sender === 'user'
                        ? 'glass border border-neon-cyan text-white'
                        : 'glass-strong border border-white/10 text-gray-300'
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.text}</p>
                  </div>
                  {message.sender === 'user' && (
                    <div className="w-8 h-8 rounded-full glass border border-neon-magenta flex items-center justify-center flex-shrink-0">
                      <User className="w-4 h-4 text-neon-magenta" />
                    </div>
                  )}
                </motion.div>
              ))}
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
                  className="flex-1 px-4 py-2 glass-strong border border-white/10 rounded-lg focus:border-neon-cyan focus:outline-none focus:ring-2 focus:ring-neon-cyan/20 text-white placeholder-gray-500 text-sm"
                />
                <motion.button
                  onClick={handleSendMessage}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={!inputValue.trim()}
                  className="w-10 h-10 rounded-lg glass border border-neon-cyan flex items-center justify-center text-neon-cyan hover:glow-cyan transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                </motion.button>
              </div>
              <p className="text-xs text-gray-500 mt-2 text-center">
                Pergunta sobre: serviços, projetos, experiência, contacto
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

