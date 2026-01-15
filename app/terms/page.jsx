'use client'

import { motion } from 'framer-motion'
import { AlertTriangle, Copyright, FileText, Scale, Shield } from 'lucide-react'
import Link from 'next/link'

export default function TermsPage() {
  const sections = [
    {
      icon: FileText,
      title: 'Termos de Utilização',
      content: `Ao aceder e utilizar este website (dimande.vercel.app), aceita estar vinculado a estes termos e condições. Este site é um portfolio pessoal e profissional de Alberto Dimande, apresentando trabalhos, publicações e serviços oferecidos.`
    },
    {
      icon: Copyright,
      title: 'Propriedade Intelectual',
      content: `Todo o conteúdo deste site, incluindo mas não limitado a:
      • Textos, artigos e publicações académicas
      • Imagens, gráficos e design visual
      • Código fonte e elementos interactivos
      • Logótipos e marcas
      
      São propriedade de Alberto Dimande ou dos respectivos autores citados, protegidos por direitos de autor e propriedade intelectual.`
    },
    {
      icon: Scale,
      title: 'Uso Permitido',
      content: `É permitido:
      • Visualizar e navegar pelo conteúdo do site
      • Partilhar links para páginas do site
      • Citar trechos com devida atribuição
      
      Não é permitido sem autorização prévia:
      • Reproduzir ou distribuir conteúdo para fins comerciais
      • Modificar ou criar trabalhos derivados
      • Utilizar o conteúdo de forma que viole direitos de terceiros`
    },
    {
      icon: Shield,
      title: 'Limitação de Responsabilidade',
      content: `Este site é fornecido "tal como está":
      • Não garantimos que o site esteja livre de erros ou interrupções
      • As informações são fornecidas para fins informativos apenas
      • Artigos académicos representam opiniões do autor na data de publicação
      • Links externos são fornecidos como conveniência e não constituem endosso`
    },
    {
      icon: AlertTriangle,
      title: 'Alterações aos Termos',
      content: `Reservamo-nos o direito de modificar estes termos a qualquer momento. Alterações significativas serão indicadas pela actualização da data de "última modificação". O uso continuado do site após alterações constitui aceitação dos novos termos.`
    }
  ]

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold font-orbitron mb-4">
            <span className="text-white">Termos e </span>
            <span className="text-neon-magenta">Condições</span>
          </h1>
          <p className="text-gray-400 text-lg">
            Última actualização: Janeiro 2025
          </p>
        </motion.div>

        <div className="space-y-8">
          {sections.map((section, index) => {
            const Icon = section.icon
            return (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass-strong rounded-xl p-6 border border-white/10"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg glass border border-neon-magenta flex items-center justify-center">
                    <Icon className="w-5 h-5 text-neon-magenta" />
                  </div>
                  <h2 className="text-xl font-bold text-white font-orbitron">
                    {section.title}
                  </h2>
                </div>
                <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                  {section.content}
                </p>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center space-y-4"
        >
          <p className="text-gray-400">
            Ao utilizar este site, declara ter lido e aceite estes termos.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/privacy"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg glass border border-neon-cyan text-neon-cyan hover:glow-cyan transition-all"
            >
              Política de Privacidade
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg glass border border-neon-magenta text-neon-magenta hover:glow-magenta transition-all"
            >
              Contacte-nos
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
