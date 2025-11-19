'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, MapPin } from 'lucide-react'
import dynamic from 'next/dynamic'
import { useLanguage } from '@/contexts/LanguageContext'

// Dynamically import Leaflet to avoid SSR issues
const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
)
const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false }
)
const Marker = dynamic(
  () => import('react-leaflet').then((mod) => mod.Marker),
  { ssr: false }
)
const Popup = dynamic(
  () => import('react-leaflet').then((mod) => mod.Popup),
  { ssr: false }
)

// Import Leaflet CSS
import 'leaflet/dist/leaflet.css'

export default function GISMapModal({ isOpen, onClose, project, allProjects = [] }) {
  const { t } = useLanguage()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Filter GIS projects with locations
  const gisProjects = allProjects.filter(
    (p) => p.type === 'gis' && p.location
  )

  // Default center: Maputo, Mozambique
  const defaultCenter = [-25.9692, 32.5732]
  const center = project?.location
    ? [project.location.lat, project.location.lng]
    : defaultCenter

  if (!isOpen || !mounted) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="fixed inset-4 md:inset-8 lg:inset-16 z-50 flex items-center justify-center"
          >
            <div className="relative w-full h-full glass-strong rounded-2xl border border-neon-cyan/30 overflow-hidden flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <div>
                  <h2 className="text-2xl font-bold text-white font-orbitron">
                    <span className="text-neon-cyan">{project?.title || 'GIS Projects Map'}</span>
                  </h2>
                  <p className="text-gray-400 text-sm mt-1">
                    {project?.location?.address || 'Maputo, Moçambique'}
                  </p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="w-10 h-10 rounded-full glass border border-neon-cyan flex items-center justify-center text-neon-cyan hover:glow-cyan transition-all"
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>

              {/* Map Container */}
              <div className="flex-1 relative">
                {mounted && (
                  <MapContainer
                    center={center}
                    zoom={13}
                    style={{ height: '100%', width: '100%', zIndex: 0 }}
                    className="dark-map"
                  >
                    {/* Custom dark tile layer */}
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                      url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                    />

                    {/* Markers for all GIS projects */}
                    {gisProjects.map((proj, idx) => {
                      if (!proj.location) return null

                      // Create custom neon icon (only on client side)
                      let customIcon = null
                      if (typeof window !== 'undefined') {
                        const L = require('leaflet')
                        const isCurrentProject = project?.title === proj.title
                        const iconColor = isCurrentProject ? '#00ffff' : (idx % 2 === 0 ? '#00ffff' : '#ff00ff')
                        const shadowColor = isCurrentProject ? 'rgba(0, 255, 255, 0.8)' : (idx % 2 === 0 ? 'rgba(0, 255, 255, 0.8)' : 'rgba(255, 0, 255, 0.8)')

                        customIcon = L.divIcon({
                        className: 'custom-marker',
                        html: `
                          <div style="
                            width: 40px;
                            height: 40px;
                            border-radius: 50%;
                            background: ${iconColor}33;
                            border: 3px solid ${iconColor};
                            box-shadow: 0 0 20px ${shadowColor};
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            backdrop-filter: blur(10px);
                            animation: pulse 2s infinite;
                          ">
                            <div style="
                              width: 20px;
                              height: 20px;
                              border-radius: 50%;
                              background: ${iconColor};
                              box-shadow: 0 0 10px ${iconColor};
                            "></div>
                          </div>
                          <style>
                            @keyframes pulse {
                              0%, 100% { transform: scale(1); opacity: 1; }
                              50% { transform: scale(1.1); opacity: 0.8; }
                            }
                          </style>
                        `,
                          iconSize: [40, 40],
                          iconAnchor: [20, 40],
                          popupAnchor: [0, -40],
                        })
                      }

                      return (
                        <Marker
                          key={idx}
                          position={[proj.location.lat, proj.location.lng]}
                          icon={customIcon}
                        >
                          <Popup className="custom-popup">
                            <div className="p-4 glass-strong rounded-lg border border-neon-cyan/30 min-w-[200px]">
                              <h3 className="text-lg font-bold text-neon-cyan mb-2">
                                {proj.title}
                              </h3>
                              <p className="text-gray-300 text-sm mb-3">
                                {proj.description}
                              </p>
                              <div className="flex items-center gap-2 text-xs text-gray-400">
                                <MapPin className="w-3 h-3" />
                                <span>{proj.location.address}</span>
                              </div>
                              {proj.technologies && (
                                <div className="flex flex-wrap gap-1 mt-3">
                                  {proj.technologies.slice(0, 3).map((tech, techIdx) => (
                                    <span
                                      key={techIdx}
                                      className="px-2 py-1 rounded text-xs glass border border-neon-cyan/30 text-neon-cyan"
                                    >
                                      {tech}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>
                          </Popup>
                        </Marker>
                      )
                    })}
                  </MapContainer>
                )}

                {/* Info Panel Overlay */}
                <div className="absolute top-4 left-4 z-[1000]">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="glass-strong rounded-lg p-4 border border-neon-cyan/30 max-w-xs"
                  >
                    <h3 className="text-sm font-bold text-neon-cyan mb-2">
                      {t('projects.viewProject')}
                    </h3>
                    <p className="text-gray-300 text-xs mb-2">
                      {project?.description}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <MapPin className="w-3 h-3" />
                      <span>{project?.location?.address || 'Maputo'}</span>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

