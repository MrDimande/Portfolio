'use client'

import { motion } from 'framer-motion'
import { Cookie, Database, Eye, Lock, Shield } from 'lucide-react'
import Link from 'next/link'

export default function PrivacyPage() {
  const sections = [
    {
      icon: Database,
      title: 'Dados que Recolhemos',
      content: `Recolhemos apenas os dados estritamente necessários para o funcionamento do site:
      • Informações de contacto (nome, email) quando nos envia uma mensagem
      • Dados de navegação anónimos para análise de tráfego (via Vercel Analytics)
      • Preferências de idioma armazenadas localmente no seu navegador`
    },
    {
      icon: Eye,
      title: 'Como Usamos os Seus Dados',
      content: `Os dados recolhidos são utilizados exclusivamente para:
      • Responder às suas mensagens e pedidos de contacto
      • Melhorar a experiência de navegação no site
      • Análise estatística anónima do tráfego do site
      • Não vendemos nem partilhamos os seus dados com terceiros`
    },
    {
      icon: Lock,
      title: 'Segurança dos Dados',
      content: `Implementamos medidas de segurança para proteger os seus dados:
      • Comunicação encriptada via HTTPS
      • Armazenamento seguro em servidores da Vercel
      • Acesso restrito aos dados pessoais
      • Conformidade com as melhores práticas de segurança`
    },
    {
      icon: Cookie,
      title: 'Cookies',
      content: `Este site utiliza cookies essenciais para:
      • Guardar as suas preferências de idioma
      • Melhorar a performance do site
      • Análise anónima de tráfego (Vercel Analytics)
      Não utilizamos cookies de publicidade ou rastreamento de terceiros.`
    },
    {
      icon: Shield,
      title: 'Os Seus Direitos',
      content: `Tem o direito de:
      • Aceder aos seus dados pessoais
      • Solicitar a correcção ou eliminação dos seus dados
      • Retirar o consentimento a qualquer momento
      • Apresentar uma reclamação junto das autoridades de protecção de dados
      Para exercer estes direitos, contacte-nos através do formulário de contacto.`
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
            <span className="text-white">Política de </span>
            <span className="text-neon-cyan">Privacidade</span>
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
                  <div className="w-10 h-10 rounded-lg glass border border-neon-cyan flex items-center justify-center">
                    <Icon className="w-5 h-5 text-neon-cyan" />
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
          className="mt-12 text-center"
        >
          <p className="text-gray-400 mb-4">
            Ao utilizar este site, concorda com esta política de privacidade.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg glass border border-neon-cyan text-neon-cyan hover:glow-cyan transition-all"
          >
            Contacte-nos para mais informações
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
