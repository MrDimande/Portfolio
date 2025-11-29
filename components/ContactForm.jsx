'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Mail, Linkedin, CheckCircle, Github, MessageCircle, Instagram, AlertCircle, Copy, Phone, Building2, FileText, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'

export default function ContactForm() {
  const { t } = useLanguage()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errors, setErrors] = useState({})
  const [copiedEmail, setCopiedEmail] = useState(false)
  const maxMessageLength = 1000

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  }

  const validatePhone = (phone) => {
    if (!phone) return true // Phone is optional
    const re = /^[\d\s\-\+\(\)]+$/
    return re.test(phone) && phone.replace(/\D/g, '').length >= 8
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      })
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório'
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Nome deve ter pelo menos 2 caracteres'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email é obrigatório'
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Email inválido'
    }

    if (formData.phone && !validatePhone(formData.phone)) {
      newErrors.phone = 'Telefone inválido'
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Assunto é obrigatório'
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Mensagem é obrigatória'
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Mensagem deve ter pelo menos 10 caracteres'
    } else if (formData.message.length > maxMessageLength) {
      newErrors.message = `Mensagem não pode exceder ${maxMessageLength} caracteres`
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      // Envia email usando EmailJS
      // Configura as tuas credenciais em https://www.emailjs.com/
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY

      if (serviceId && templateId && publicKey) {
        const emailjs = (await import('@emailjs/browser')).default
        await emailjs.send(serviceId, templateId, {
          from_name: formData.name,
          from_email: formData.email,
          phone: formData.phone || 'Não fornecido',
          company: formData.company || 'Não fornecido',
          subject: formData.subject,
          message: formData.message,
          to_name: 'Alberto Dimande',
        }, publicKey)
      } else {
        // Fallback: abre o cliente de email
        const mailtoLink = `mailto:alberto.dimande@outlook.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(
          `Nome: ${formData.name}\nEmail: ${formData.email}\nTelefone: ${formData.phone || 'N/A'}\nEmpresa: ${formData.company || 'N/A'}\n\nMensagem:\n${formData.message}`
        )}`
        window.open(mailtoLink, '_blank')
      }

      setIsSubmitting(false)
      setIsSubmitted(true)
      setFormData({ name: '', email: '', phone: '', company: '', subject: '', message: '' })
      setErrors({})

      // Reset success message after 5 seconds
      setTimeout(() => setIsSubmitted(false), 5000)
    } catch (error) {
      setIsSubmitting(false)
      setErrors({ submit: 'Erro ao enviar mensagem. Tenta novamente.' })
    }
  }

  const copyEmailToClipboard = async () => {
    try {
      await navigator.clipboard.writeText('alberto.dimande@outlook.com')
      setCopiedEmail(true)
      setTimeout(() => setCopiedEmail(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Contact Info */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        <div>
          <h2 className="text-3xl font-bold mb-4 font-orbitron">
            <span className="text-neon-cyan">{t('contact.connect')}</span>
          </h2>
          <p className="text-gray-400 leading-relaxed">
            {t('contact.connectDescription')}
          </p>
        </div>

        <div className="space-y-4">
          <div className="relative">
            <Link
              href="mailto:alberto.dimande@outlook.com"
              className="flex items-center gap-4 p-4 glass-strong rounded-lg border border-white/10 hover:border-neon-cyan transition-all group"
            >
              <div className="w-12 h-12 rounded-full glass border border-neon-cyan flex items-center justify-center group-hover:glow-cyan transition-all">
                <Mail className="w-6 h-6 text-neon-cyan" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-400">{t('contact.email')}</p>
                <p className="text-white font-medium">alberto.dimande@outlook.com</p>
              </div>
            </Link>
            <motion.button
              onClick={copyEmailToClipboard}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="absolute top-4 right-4 p-2 rounded-lg glass border border-neon-cyan/30 text-neon-cyan hover:glow-cyan transition-all"
              title="Copiar email"
            >
              {copiedEmail ? (
                <CheckCircle className="w-4 h-4 text-green-400" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </motion.button>
          </div>

          <Link
            href="https://www.linkedin.com/in/alberto-dimande-97817822b/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 p-4 glass-strong rounded-lg border border-white/10 hover:border-neon-blue transition-all group"
          >
            <div className="w-12 h-12 rounded-full glass border border-neon-blue flex items-center justify-center group-hover:glow-blue transition-all">
              <Linkedin className="w-6 h-6 text-neon-blue" />
            </div>
            <div>
              <p className="text-sm text-gray-400">{t('contact.linkedin')}</p>
              <p className="text-white font-medium">alberto-dimande</p>
            </div>
          </Link>

          <Link
            href="https://github.com/MrDimande"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 p-4 glass-strong rounded-lg border border-white/10 hover:border-neon-cyan transition-all group"
          >
            <div className="w-12 h-12 rounded-full glass border border-neon-cyan flex items-center justify-center group-hover:glow-cyan transition-all">
              <Github className="w-6 h-6 text-neon-cyan" />
            </div>
            <div>
              <p className="text-sm text-gray-400">{t('contact.github')}</p>
              <p className="text-white font-medium">MrDimande</p>
            </div>
          </Link>

          <Link
            href="https://wa.me/258870883476"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 p-4 glass-strong rounded-lg border border-white/10 hover:border-neon-magenta transition-all group"
          >
            <div className="w-12 h-12 rounded-full glass border border-neon-magenta flex items-center justify-center group-hover:glow-magenta transition-all">
              <MessageCircle className="w-6 h-6 text-neon-magenta" />
            </div>
            <div>
              <p className="text-sm text-gray-400">{t('contact.whatsapp')}</p>
              <p className="text-white font-medium">+258 87 088 3476</p>
            </div>
          </Link>

          <Link
            href="https://instagram.com/mr.dimande"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 p-4 glass-strong rounded-lg border border-white/10 hover:border-neon-magenta transition-all group"
          >
            <div className="w-12 h-12 rounded-full glass border border-neon-magenta flex items-center justify-center group-hover:glow-magenta transition-all">
              <Instagram className="w-6 h-6 text-neon-magenta" />
            </div>
            <div>
              <p className="text-sm text-gray-400">{t('contact.instagram')}</p>
              <p className="text-white font-medium">@mr.dimande</p>
            </div>
          </Link>
        </div>
      </motion.div>

      {/* Contact Form */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              {t('contact.name')} <span className="text-neon-magenta">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-4 py-3 glass-strong border rounded-lg focus:outline-none focus:ring-2 text-white placeholder-gray-500 transition-all ${
                errors.name
                  ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20'
                  : 'border-white/10 focus:border-neon-cyan focus:ring-neon-cyan/20'
              }`}
              placeholder={t('contact.name')}
            />
            <AnimatePresence>
              {errors.name && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-1 text-sm text-red-400 flex items-center gap-1"
                >
                  <AlertCircle className="w-4 h-4" />
                  {errors.name}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              {t('contact.email')} <span className="text-neon-magenta">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-3 glass-strong border rounded-lg focus:outline-none focus:ring-2 text-white placeholder-gray-500 transition-all ${
                errors.email
                  ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20'
                  : 'border-white/10 focus:border-neon-cyan focus:ring-neon-cyan/20'
              }`}
              placeholder={t('contact.emailPlaceholder')}
            />
            <AnimatePresence>
              {errors.email && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-1 text-sm text-red-400 flex items-center gap-1"
                >
                  <AlertCircle className="w-4 h-4" />
                  {errors.email}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Phone & Company Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Phone */}
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                <Phone className="w-4 h-4 inline mr-1" />
                Telefone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={`w-full px-4 py-3 glass-strong border rounded-lg focus:outline-none focus:ring-2 text-white placeholder-gray-500 transition-all ${
                  errors.phone
                    ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20'
                    : 'border-white/10 focus:border-neon-cyan focus:ring-neon-cyan/20'
                }`}
                placeholder="+258 87 088 3476"
              />
              <AnimatePresence>
                {errors.phone && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mt-1 text-sm text-red-400 flex items-center gap-1"
                  >
                    <AlertCircle className="w-4 h-4" />
                    {errors.phone}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* Company */}
            <div>
              <label
                htmlFor="company"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                <Building2 className="w-4 h-4 inline mr-1" />
                Empresa
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="w-full px-4 py-3 glass-strong border border-white/10 rounded-lg focus:border-neon-cyan focus:outline-none focus:ring-2 focus:ring-neon-cyan/20 text-white placeholder-gray-500 transition-all"
                placeholder="Opcional"
              />
            </div>
          </div>

          {/* Subject */}
          <div>
            <label
              htmlFor="subject"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              <FileText className="w-4 h-4 inline mr-1" />
              Assunto <span className="text-neon-magenta">*</span>
            </label>
            <select
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className={`w-full px-4 py-3 glass-strong border rounded-lg focus:outline-none focus:ring-2 text-white transition-all ${
                errors.subject
                  ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20'
                  : 'border-white/10 focus:border-neon-cyan focus:ring-neon-cyan/20'
              }`}
            >
              <option value="" className="bg-dark-card">Seleciona um assunto</option>
              <option value="projeto" className="bg-dark-card">Projeto GIS / Planeamento</option>
              <option value="desenvolvimento" className="bg-dark-card">Desenvolvimento Web</option>
              <option value="consultoria" className="bg-dark-card">Consultoria</option>
              <option value="colaboracao" className="bg-dark-card">Colaboração</option>
              <option value="outro" className="bg-dark-card">Outro</option>
            </select>
            <AnimatePresence>
              {errors.subject && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-1 text-sm text-red-400 flex items-center gap-1"
                >
                  <AlertCircle className="w-4 h-4" />
                  {errors.subject}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Message */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-300"
              >
                {t('contact.message')} <span className="text-neon-magenta">*</span>
              </label>
              <span className={`text-xs ${
                formData.message.length > maxMessageLength
                  ? 'text-red-400'
                  : formData.message.length > maxMessageLength * 0.8
                  ? 'text-yellow-400'
                  : 'text-gray-400'
              }`}>
                {formData.message.length} / {maxMessageLength}
              </span>
            </div>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={6}
              maxLength={maxMessageLength}
              className={`w-full px-4 py-3 glass-strong border rounded-lg focus:outline-none focus:ring-2 text-white placeholder-gray-500 transition-all resize-none ${
                errors.message
                  ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20'
                  : 'border-white/10 focus:border-neon-cyan focus:ring-neon-cyan/20'
              }`}
              placeholder={t('contact.messagePlaceholder')}
            />
            <AnimatePresence>
              {errors.message && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-1 text-sm text-red-400 flex items-center gap-1"
                >
                  <AlertCircle className="w-4 h-4" />
                  {errors.message}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Error Message */}
          <AnimatePresence>
            {errors.submit && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex items-center gap-2 p-4 glass-strong border border-red-500/50 rounded-lg text-red-400"
              >
                <AlertCircle className="w-5 h-5" />
                <span>{errors.submit}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Success Message */}
          <AnimatePresence>
            {isSubmitted && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                className="flex items-center gap-2 p-4 glass-strong border border-green-500/50 rounded-lg text-green-400 relative overflow-hidden"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring' }}
                >
                  <CheckCircle className="w-5 h-5" />
                </motion.div>
                <span>{t('contact.success')}</span>
                <motion.div
                  initial={{ x: '-100%' }}
                  animate={{ x: '100%' }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-green-500/20 to-transparent"
                />
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            type="submit"
            disabled={isSubmitting || isSubmitted}
            whileHover={{ scale: isSubmitting || isSubmitted ? 1 : 1.05 }}
            whileTap={{ scale: isSubmitting || isSubmitted ? 1 : 0.95 }}
            className="w-full px-6 py-4 glass-strong border border-neon-cyan rounded-lg text-neon-cyan font-semibold hover:glow-cyan transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 relative overflow-hidden group"
          >
            {isSubmitting ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  className="w-5 h-5 border-2 border-neon-cyan border-t-transparent rounded-full"
                />
                {t('contact.sending')}
              </>
            ) : isSubmitted ? (
              <>
                <CheckCircle className="w-5 h-5" />
                Mensagem Enviada!
              </>
            ) : (
              <>
                <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                {t('contact.sendMessage')}
                <Sparkles className="w-4 h-4 absolute -top-1 -right-1 text-neon-magenta opacity-0 group-hover:opacity-100 transition-opacity" />
              </>
            )}
          </motion.button>
        </form>
      </motion.div>
    </div>
  )
}

