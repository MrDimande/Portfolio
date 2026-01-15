'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import { motion } from 'framer-motion'
import { Github, Instagram, Linkedin, Mail, MapPin, MessageCircle } from 'lucide-react'
import Link from 'next/link'

export default function Footer() {
  const { t } = useLanguage()
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    {
      name: 'GitHub',
      icon: Github,
      href: 'https://github.com/MrDimande',
      color: 'text-neon-cyan',
      hover: 'hover:glow-cyan',
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      href: 'https://www.linkedin.com/in/alberto-dimande-97817822b/',
      color: 'text-neon-blue',
      hover: 'hover:glow-blue',
    },
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      href: 'https://wa.me/258870883476',
      color: 'text-neon-magenta',
      hover: 'hover:glow-magenta',
    },
    {
      name: 'Instagram',
      icon: Instagram,
      href: 'https://instagram.com/mr.dimande',
      color: 'text-neon-magenta',
      hover: 'hover:glow-magenta',
    },
    {
      name: 'Email',
      icon: Mail,
      href: 'mailto:alberto.dimande@outlook.com',
      color: 'text-neon-cyan',
      hover: 'hover:glow-cyan',
    },
  ]

  return (
    <footer className="relative mt-20 glass-strong border-t border-white/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="font-orbitron font-bold text-2xl mb-4">
              <span className="text-neon-cyan">ALBERTO</span>{' '}
              <span className="text-neon-magenta">DIMANDE</span>
            </h3>
            <p className="text-gray-400 text-sm mb-4">
              {t('hero.subtitle')}
            </p>
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <MapPin className="w-4 h-4" />
              <span>{t('hero.location')}</span>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h4 className="font-semibold text-white mb-4">{t('footer.navigation')}</h4>
            <ul className="space-y-2">
              {[
                { href: '/', label: t('nav.home') },
                { href: '/about', label: t('nav.about') },
                { href: '/experience', label: t('nav.experience') },
                { href: '/projects', label: t('nav.projects') },
                { href: '/contact', label: t('nav.contact') },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-gray-400 hover:text-neon-cyan transition-colors text-sm"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="font-semibold text-white mb-4">{t('footer.connect')}</h4>
            <div className="flex flex-wrap gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <Link
                    key={social.name}
                    href={social.href}
                    target={social.href.startsWith('http') || social.href.startsWith('mailto') ? '_blank' : undefined}
                    rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    title={social.name}
                  >
                    <motion.div
                      whileHover={{ scale: 1.1, y: -5 }}
                      whileTap={{ scale: 0.95 }}
                      className={`w-12 h-12 rounded-full glass border border-white/10 flex items-center justify-center ${social.color} ${social.hover} transition-all cursor-pointer`}
                    >
                      <Icon className="w-5 h-5" />
                    </motion.div>
                  </Link>
                )
              })}
            </div>
          </motion.div>
        </div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 pt-8 border-t border-white/10 text-center text-gray-400 text-sm"
        >
          <p>
            © {currentYear} Alberto Dimande. {t('footer.rights')}
          </p>
          <p className="mt-2">
            {t('footer.designed')}{' '}
            <span className="text-neon-cyan">{t('footer.innovation')}</span> {t('footer.and')}{' '}
            <span className="text-neon-magenta">{t('footer.vision')}</span>
          </p>
          <div className="mt-4 flex justify-center gap-4">
            <Link href="/privacy" className="hover:text-neon-cyan transition-colors">
              Privacidade
            </Link>
            <span>•</span>
            <Link href="/terms" className="hover:text-neon-magenta transition-colors">
              Termos
            </Link>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}

