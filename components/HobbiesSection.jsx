'use client'

import { motion } from 'framer-motion'
import { Music, Book, Camera, Gamepad2, Plane, Coffee, Code, MapPin } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

export default function HobbiesSection() {
  const { t } = useLanguage()

  const hobbies = [
    {
      name: 'Música',
      icon: Music,
      description: 'Explorar diferentes géneros musicais e descobrir novos artistas',
      borderColor: 'border-neon-cyan',
      textColor: 'text-neon-cyan',
    },
    {
      name: 'Leitura',
      icon: Book,
      description: 'Livros sobre urbanismo, tecnologia e ficção científica',
      borderColor: 'border-neon-magenta',
      textColor: 'text-neon-magenta',
    },
    {
      name: 'Fotografia',
      icon: Camera,
      description: 'Capturar a essência das cidades e paisagens urbanas',
      borderColor: 'border-neon-blue',
      textColor: 'text-neon-blue',
    },
    {
      name: 'Gaming',
      icon: Gamepad2,
      description: 'Estratégia e simulação urbana',
      borderColor: 'border-neon-cyan',
      textColor: 'text-neon-cyan',
    },
    {
      name: 'Viagens',
      icon: Plane,
      description: 'Explorar novas cidades e culturas',
      borderColor: 'border-neon-magenta',
      textColor: 'text-neon-magenta',
    },
    {
      name: 'Café',
      icon: Coffee,
      description: 'Apreciar um bom café enquanto trabalho ou leio',
      borderColor: 'border-neon-blue',
      textColor: 'text-neon-blue',
    },
    {
      name: 'Coding',
      icon: Code,
      description: 'Projetos pessoais e experimentação com novas tecnologias',
      borderColor: 'border-neon-cyan',
      textColor: 'text-neon-cyan',
    },
    {
      name: 'Exploração',
      icon: MapPin,
      description: 'Descobrir novos lugares e rotas na cidade',
      borderColor: 'border-neon-magenta',
      textColor: 'text-neon-magenta',
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="mt-16"
    >
      <h2 className="text-3xl font-bold text-center mb-12 font-orbitron">
        <span className="text-neon-cyan">Interesses</span>{' '}
        <span className="text-neon-magenta">&</span>{' '}
        <span className="text-neon-blue">Hobbies</span>
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {hobbies.map((hobby, index) => {
          const Icon = hobby.icon
          return (
            <motion.div
              key={hobby.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.1, y: -10, rotate: 5 }}
              className="glass-strong rounded-xl p-6 border border-white/10 hover:border-neon-cyan transition-all group cursor-pointer"
            >
              <div className={`w-16 h-16 mx-auto mb-4 rounded-full glass ${hobby.borderColor} border flex items-center justify-center group-hover:glow-cyan transition-all`}>
                <Icon className={`w-8 h-8 ${hobby.textColor}`} />
              </div>
              <h3 className="text-center font-bold text-white mb-2 group-hover:text-neon-cyan transition-colors">
                {hobby.name}
              </h3>
              <p className="text-center text-xs text-gray-400 leading-relaxed">
                {hobby.description}
              </p>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}
