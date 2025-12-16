'use client'

import { motion } from 'framer-motion'
import { BarChart3, PieChart, TrendingUp } from 'lucide-react'

export default function PublicationStats({ publication }) {
  // Deterministic statistics data (no Math.random to avoid hydration errors)
  const topicStats = publication.topics?.map((topic, index) => ({
    name: topic,
    value: 60 + ((index * 17 + 13) % 40), // Deterministic value 60-100 based on index
    color: index % 3 === 0 ? 'neon-cyan' : index % 3 === 1 ? 'neon-magenta' : 'neon-blue'
  })) || []

  const readingStats = [
    { label: 'Introdução', percentage: 100 },
    { label: 'Metodologia', percentage: 85 },
    { label: 'Resultados', percentage: 70 },
    { label: 'Discussão', percentage: 55 },
    { label: 'Conclusão', percentage: 90 },
  ]

  return (
    <div className="glass-strong rounded-xl p-6 border border-white/10">
      <div className="flex items-center gap-2 mb-6">
        <BarChart3 className="w-6 h-6 text-neon-cyan" />
        <h3 className="text-lg font-bold text-white">Estatísticas do Artigo</h3>
      </div>

      {/* Topic Relevance Chart */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-400 mb-3 flex items-center gap-2">
          <PieChart className="w-4 h-4" />
          Relevância por Tópico
        </h4>
        <div className="space-y-3">
          {topicStats.slice(0, 5).map((topic, index) => (
            <div key={index}>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-gray-400">{topic.name}</span>
                <span className={`text-${topic.color}`}>{topic.value}%</span>
              </div>
              <div className="h-2 bg-dark-bg/50 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${topic.value}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: index * 0.1 }}
                  className={`h-full rounded-full ${
                    topic.color === 'neon-cyan' ? 'bg-gradient-to-r from-neon-cyan/50 to-neon-cyan' :
                    topic.color === 'neon-magenta' ? 'bg-gradient-to-r from-neon-magenta/50 to-neon-magenta' :
                    'bg-gradient-to-r from-neon-blue/50 to-neon-blue'
                  }`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reading Progress Simulation */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-400 mb-3 flex items-center gap-2">
          <TrendingUp className="w-4 h-4" />
          Estrutura do Documento
        </h4>
        <div className="flex items-end justify-between h-24 gap-2">
          {readingStats.map((stat, index) => (
            <div key={index} className="flex-1 flex flex-col items-center">
              <motion.div
                initial={{ height: 0 }}
                whileInView={{ height: `${stat.percentage}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="w-full bg-gradient-to-t from-neon-cyan to-neon-blue rounded-t"
                style={{ maxHeight: `${stat.percentage}%` }}
              />
              <span className="text-[10px] text-gray-500 mt-1 text-center truncate w-full">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="text-center p-3 rounded-lg bg-dark-bg/30 border border-white/5">
          <div className="text-xl font-bold text-neon-cyan">{publication.topics?.length || 0}</div>
          <div className="text-[10px] text-gray-500">Tópicos</div>
        </div>
        <div className="text-center p-3 rounded-lg bg-dark-bg/30 border border-white/5">
          <div className="text-xl font-bold text-neon-magenta">{publication.year}</div>
          <div className="text-[10px] text-gray-500">Ano</div>
        </div>
        <div className="text-center p-3 rounded-lg bg-dark-bg/30 border border-white/5">
          <div className="text-xl font-bold text-neon-blue">{publication.authors?.length || 1}</div>
          <div className="text-[10px] text-gray-500">Autor(es)</div>
        </div>
      </div>
    </div>
  )
}
