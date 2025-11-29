'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronRight, Home } from 'lucide-react'
import { motion } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'

const routeNames = {
  'pt-MZ': {
    about: 'Sobre Mim',
    experience: 'Experiência',
    projects: 'Projectos',
    publications: 'Publicações',
    services: 'Serviços',
    contact: 'Contacto',
  },
  en: {
    about: 'About',
    experience: 'Experience',
    projects: 'Projects',
    publications: 'Publications',
    services: 'Services',
    contact: 'Contact',
  },
  es: {
    about: 'Sobre Mí',
    experience: 'Experiencia',
    projects: 'Proyectos',
    publications: 'Publicaciones',
    services: 'Servicios',
    contact: 'Contacto',
  },
}

export default function Breadcrumbs() {
  const pathname = usePathname()
  const { language } = useLanguage()

  if (pathname === '/') return null

  const segments = pathname.split('/').filter(Boolean)
  const names = routeNames[language] || routeNames['pt-MZ']

  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="container mx-auto px-4 pt-24 pb-4"
      aria-label="Breadcrumb"
    >
      <ol className="flex items-center gap-2 text-sm">
        <li>
          <Link
            href="/"
            className="flex items-center gap-1 text-gray-400 hover:text-neon-cyan transition-colors"
          >
            <Home className="w-4 h-4" />
            <span className="sr-only">Início</span>
          </Link>
        </li>
        {segments.map((segment, index) => {
          const href = '/' + segments.slice(0, index + 1).join('/')
          const isLast = index === segments.length - 1
          const name = names[segment] || segment

          return (
            <li key={segment} className="flex items-center gap-2">
              <ChevronRight className="w-4 h-4 text-gray-600" />
              {isLast ? (
                <span className="text-neon-cyan font-medium">{name}</span>
              ) : (
                <Link
                  href={href}
                  className="text-gray-400 hover:text-neon-cyan transition-colors"
                >
                  {name}
                </Link>
              )}
            </li>
          )
        })}
      </ol>
    </motion.nav>
  )
}
