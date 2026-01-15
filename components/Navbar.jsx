'use client'

import AudioPlayer from '@/components/AudioPlayer'
import FestiveLogoEffect from '@/components/FestiveLogoEffect'
import LanguageSwitcher from '@/components/LanguageSwitcher'
import { useLanguage } from '@/contexts/LanguageContext'
import { AnimatePresence, motion } from 'framer-motion'
import { Briefcase, FolderKanban, Home, Mail, Menu, Settings, User, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Navbar() {
  const { t } = useLanguage()
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { href: '/', label: t('nav.home'), icon: Home },
    { href: '/about', label: t('nav.about'), icon: User },
    { href: '/experience', label: t('nav.experience'), icon: Briefcase },
    { href: '/projects', label: t('nav.projects'), icon: FolderKanban },
    { href: '/services', label: t('nav.services'), icon: Settings },
    { href: '/contact', label: t('nav.contact'), icon: Mail },
  ]

  const isActive = (href) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'glass-strong shadow-lg shadow-black/20 border-b border-white/5' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* Logo */}
          <Link href="/">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center relative h-10 sm:h-12 w-auto"
            >
              <FestiveLogoEffect>
                <Image
                  src="/ALD Logo.svg"
                  alt="Alberto Dimande Logo - Portfolio de Planificador Territorial"
                  width={48}
                  height={48}
                  className="h-10 sm:h-12 w-auto"
                  priority
                />
              </FestiveLogoEffect>
            </motion.div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.slice(0, -1).map((item, index) => {
              const active = isActive(item.href)
              return (
                <Link key={item.href} href={item.href}>
                  <motion.button
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all relative ${
                      active 
                        ? 'text-neon-cyan' 
                        : 'text-gray-300 hover:text-white'
                    }`}
                  >
                    {item.label}
                    {active && (
                      <motion.span
                        layoutId="activeTab"
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-neon-cyan rounded-full"
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    )}
                  </motion.button>
                </Link>
              )
            })}
            
            {/* Contacto Button - Destacado */}
            <Link href="/contact" className="ml-4">
              <motion.button
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 0 20px rgba(0, 255, 255, 0.4)"
                }}
                whileTap={{ scale: 0.95 }}
                className={`group relative px-5 py-2 rounded-lg text-sm font-bold transition-all duration-300 border-2 overflow-hidden ${
                  isActive('/contact')
                    ? 'border-neon-cyan text-neon-cyan bg-neon-cyan/10'
                    : 'border-neon-cyan/50 text-neon-cyan hover:border-neon-cyan glass-strong'
                }`}
              >
                <span className="relative z-10 flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  {t('nav.contact')}
                </span>
                {/* Hover gradient background */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-neon-cyan/10 via-neon-magenta/10 to-neon-cyan/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              </motion.button>
            </Link>
            
            <div className="ml-3 pl-3 border-l border-white/10 flex items-center gap-3">
              <LanguageSwitcher />
              <AudioPlayer />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-2">
            <LanguageSwitcher />
            <AudioPlayer />
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-lg glass border border-white/10 hover:border-neon-cyan transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 text-neon-cyan" />
              ) : (
                <Menu className="w-5 h-5 text-white" />
              )}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden glass-strong border-t border-white/10"
          >
            <div className="container mx-auto px-4 py-3 space-y-1">
              {navItems.map((item, index) => {
                const Icon = item.icon
                const active = isActive(item.href)
                return (
                  <Link key={item.href} href={item.href}>
                    <motion.button
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                        active 
                          ? 'text-neon-cyan bg-neon-cyan/10' 
                          : 'text-gray-300 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      {item.label}
                    </motion.button>
                  </Link>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

