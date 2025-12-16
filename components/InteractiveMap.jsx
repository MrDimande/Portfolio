'use client'

import { motion } from 'framer-motion'
import { ExternalLink, Layers, MapPin, ZoomIn, ZoomOut } from 'lucide-react'
import { useState } from 'react'

export default function InteractiveMap({ publication }) {
  // Use publication's geoLocation if available, otherwise use default Maputo
  const geoData = publication.geoLocation || {
    name: 'Maputo, Moçambique',
    center: { lat: -25.9692, lng: 32.5732 },
    zoom: 12,
    points: [
      { name: 'Maputo', lat: -25.9692, lng: 32.5732, description: 'Capital de Moçambique' },
    ]
  }

  const [zoom, setZoom] = useState(geoData.zoom || 13)
  const [selectedLayer, setSelectedLayer] = useState('satellite')
  
  const mapCenter = geoData.center
  const locations = geoData.points || []

  const layers = [
    { id: 'satellite', name: 'Satélite', icon: '🛰️' },
    { id: 'streets', name: 'Ruas', icon: '🛣️' },
  ]

  const handleZoomIn = () => setZoom(Math.min(zoom + 1, 18))
  const handleZoomOut = () => setZoom(Math.max(zoom - 1, 5))

  // Google Maps link for full view
  const googleMapsUrl = `https://www.google.com/maps/@${mapCenter.lat},${mapCenter.lng},${zoom}z/data=!3m1!1e3`

  // Calculate bounding box for OpenStreetMap embed
  const delta = 0.02 * (18 - zoom) / 10 // Adjust based on zoom level
  const bbox = {
    minLng: mapCenter.lng - delta,
    minLat: mapCenter.lat - delta,
    maxLng: mapCenter.lng + delta,
    maxLat: mapCenter.lat + delta,
  }

  return (
    <div className="glass-strong rounded-xl p-4 border border-white/10 overflow-hidden">
      {/* Header with area name */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-neon-cyan" />
          <h3 className="text-base font-bold text-white">Área de Estudo</h3>
        </div>
        <span className="text-[10px] text-neon-cyan bg-neon-cyan/10 px-2 py-0.5 rounded-full border border-neon-cyan/30">
          {geoData.name}
        </span>
      </div>

      {/* Map Container with real tiles */}
      <div className="relative aspect-[4/3] rounded-lg overflow-hidden border border-white/10">
        {/* Real Map from OpenStreetMap */}
        <iframe
          src={`https://www.openstreetmap.org/export/embed.html?bbox=${bbox.minLng},${bbox.minLat},${bbox.maxLng},${bbox.maxLat}&layer=${selectedLayer === 'satellite' ? 'hot' : 'mapnik'}&marker=${mapCenter.lat},${mapCenter.lng}`}
          className="absolute inset-0 w-full h-full border-0"
          style={{ filter: selectedLayer === 'satellite' ? 'saturate(1.2) contrast(1.1)' : 'none' }}
          loading="lazy"
          title={`Mapa de ${geoData.name}`}
        />

        {/* Overlay gradient */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-dark-bg/30 via-transparent to-transparent" />

        {/* Location Markers */}
        <div className="absolute inset-0 pointer-events-none">
          {locations.map((location, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5 + index * 0.2, type: 'spring' }}
              className="absolute pointer-events-auto"
              style={{
                left: `${20 + (index * 30)}%`,
                top: `${30 + (index % 2 === 0 ? 5 : 25)}%`,
              }}
            >
              <motion.div
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                className="relative group cursor-pointer"
              >
                <div className="w-5 h-5 rounded-full bg-neon-cyan flex items-center justify-center shadow-lg shadow-neon-cyan/50 border-2 border-white">
                  <MapPin className="w-3 h-3 text-dark-bg" />
                </div>
                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-1 rounded bg-dark-bg/95 border border-neon-cyan/30 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20">
                  <p className="text-[10px] font-medium text-white">{location.name}</p>
                  <p className="text-[8px] text-gray-400">{location.description}</p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Zoom Controls */}
        <div className="absolute right-2 top-2 flex flex-col gap-1">
          <motion.button
            onClick={handleZoomIn}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-7 h-7 rounded glass border border-white/30 flex items-center justify-center text-white hover:border-neon-cyan transition-colors bg-dark-bg/70"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </motion.button>
          <motion.button
            onClick={handleZoomOut}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-7 h-7 rounded glass border border-white/30 flex items-center justify-center text-white hover:border-neon-cyan transition-colors bg-dark-bg/70"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </motion.button>
        </div>

        {/* Coordinates */}
        <div className="absolute left-2 bottom-2 px-2 py-0.5 rounded glass border border-white/20 text-[9px] text-white font-mono bg-dark-bg/70">
          {Math.abs(mapCenter.lat).toFixed(4)}°{mapCenter.lat < 0 ? 'S' : 'N'}, {Math.abs(mapCenter.lng).toFixed(4)}°{mapCenter.lng < 0 ? 'W' : 'E'}
        </div>

        {/* Open Full Map Button */}
        <a
          href={googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute right-2 bottom-2"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-2 py-0.5 rounded glass border border-neon-cyan/50 text-[9px] text-neon-cyan flex items-center gap-1 bg-dark-bg/70"
          >
            <ExternalLink className="w-2.5 h-2.5" />
            Abrir no Maps
          </motion.div>
        </a>
      </div>

      {/* Layer Selector */}
      <div className="flex flex-wrap items-center gap-2 mt-3">
        <div className="flex items-center gap-1">
          <Layers className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-[10px] text-gray-400">Camadas:</span>
        </div>
        <div className="flex gap-1.5">
          {layers.map((layer) => (
            <motion.button
              key={layer.id}
              onClick={() => setSelectedLayer(layer.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-2 py-1 rounded text-[10px] flex items-center gap-1 transition-all ${
                selectedLayer === layer.id
                  ? 'bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/30'
                  : 'glass border border-white/10 text-gray-400 hover:border-white/30'
              }`}
            >
              <span>{layer.icon}</span>
              {layer.name}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Study Points List */}
      <div className="mt-3 p-2 rounded-lg bg-dark-bg/30 border border-white/5">
        <div className="text-[9px] text-gray-500 mb-1.5">Pontos de estudo:</div>
        <div className="flex flex-wrap gap-1.5">
          {locations.map((loc, i) => (
            <span 
              key={i} 
              className="px-2 py-0.5 rounded-full text-[9px] bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/20"
            >
              📍 {loc.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
