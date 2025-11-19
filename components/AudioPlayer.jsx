'use client'

import { useState, useEffect, useRef } from 'react'
import { Volume2, VolumeX } from 'lucide-react'
import { motion } from 'framer-motion'

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const audioRef = useRef(null)
  const audioContextRef = useRef(null)
  const gainNodeRef = useRef(null)
  const fadeIntervalRef = useRef(null)

  useEffect(() => {
    // Initialize audio context for smooth fade
    const initAudio = async () => {
      try {
        // Create audio context for volume control
        const AudioContext = window.AudioContext || window.webkitAudioContext
        if (AudioContext) {
          audioContextRef.current = new AudioContext()
          gainNodeRef.current = audioContextRef.current.createGain()
          gainNodeRef.current.connect(audioContextRef.current.destination)
          gainNodeRef.current.gain.value = 0
        }

        // Load saved preference
        const savedPreference = localStorage.getItem('ambient-sound-enabled')
        if (savedPreference === 'true' && audioRef.current) {
          // User previously enabled sound, but don't autoplay
          setIsPlaying(false)
        }
        setIsLoading(false)
      } catch (error) {
        console.error('Error initializing audio:', error)
        setIsLoading(false)
      }
    }

    initAudio()

    return () => {
      // Cleanup
      if (fadeIntervalRef.current) {
        clearInterval(fadeIntervalRef.current)
      }
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  const fadeIn = () => {
    if (!audioRef.current || !gainNodeRef.current) return

    const targetVolume = 0.3 // 30% volume for ambient sound
    const fadeDuration = 2000 // 2 seconds
    const steps = 50
    const stepTime = fadeDuration / steps
    const volumeStep = targetVolume / steps

    let currentVolume = 0
    gainNodeRef.current.gain.value = 0

    fadeIntervalRef.current = setInterval(() => {
      currentVolume += volumeStep
      if (currentVolume >= targetVolume) {
        currentVolume = targetVolume
        clearInterval(fadeIntervalRef.current)
      }
      if (gainNodeRef.current) {
        gainNodeRef.current.gain.value = currentVolume
      }
    }, stepTime)
  }

  const fadeOut = (callback) => {
    if (!gainNodeRef.current) {
      if (callback) callback()
      return
    }

    const fadeDuration = 1500 // 1.5 seconds
    const steps = 50
    const stepTime = fadeDuration / steps
    const currentVolume = gainNodeRef.current.gain.value
    const volumeStep = currentVolume / steps

    let volume = currentVolume

    fadeIntervalRef.current = setInterval(() => {
      volume -= volumeStep
      if (volume <= 0) {
        volume = 0
        clearInterval(fadeIntervalRef.current)

        // Stop audio element if it exists
        if (audioRef.current) {
          if (audioRef.current.pause && typeof audioRef.current.pause === 'function') {
            audioRef.current.pause()
          } else if (audioRef.current.oscillator1) {
            // Stop synthetic sound oscillators
            try {
              audioRef.current.oscillator1.stop()
              audioRef.current.oscillator2.stop()
              audioRef.current.lfo.stop()
            } catch (e) {
              // Already stopped
            }
          }
        }

        if (callback) callback()
      }
      if (gainNodeRef.current) {
        gainNodeRef.current.gain.value = volume
      }
    }, stepTime)
  }

  const createSyntheticAmbientSound = () => {
    if (!audioContextRef.current) return null

    const context = audioContextRef.current
    const oscillator1 = context.createOscillator()
    const oscillator2 = context.createOscillator()
    const gainNode1 = context.createGain()
    const gainNode2 = context.createGain()
    const masterGain = gainNodeRef.current

    // Create two oscillators for a richer ambient sound
    oscillator1.type = 'sine'
    oscillator1.frequency.value = 110 // Low A note
    oscillator1.start()

    oscillator2.type = 'triangle'
    oscillator2.frequency.value = 220 // Higher frequency
    oscillator2.start()

    // Set initial volumes
    gainNode1.gain.value = 0.1
    gainNode2.gain.value = 0.08

    // Connect oscillators through gain nodes to master
    oscillator1.connect(gainNode1)
    oscillator2.connect(gainNode2)
    gainNode1.connect(masterGain)
    gainNode2.connect(masterGain)

    // Add subtle LFO for movement
    const lfo = context.createOscillator()
    const lfoGain = context.createGain()
    lfo.frequency.value = 0.1 // Very slow modulation
    lfoGain.gain.value = 2 // Small frequency variation
    lfo.connect(lfoGain)
    lfoGain.connect(oscillator1.frequency)
    lfoGain.connect(oscillator2.frequency)
    lfo.start()

    return { oscillator1, oscillator2, lfo, gainNode1, gainNode2 }
  }

  const toggleAudio = async () => {
    if (isLoading) return

    try {
      // Resume audio context if suspended (required by browsers)
      if (audioContextRef.current && audioContextRef.current.state === 'suspended') {
        await audioContextRef.current.resume()
      }

      if (isPlaying) {
        // Fade out and stop
        fadeOut(() => {
          setIsPlaying(false)
          localStorage.setItem('ambient-sound-enabled', 'false')

          // Cleanup handled in fadeOut callback
        })
      } else {
        // Try to use audio file first, fallback to synthetic sound
        if (!audioRef.current) {
          let audioCreated = false

          try {
            const audio = new Audio('/ambient-sound.mp3')
            audio.loop = true
            audio.preload = 'auto'

            // Connect to Web Audio API for volume control
            if (audioContextRef.current && gainNodeRef.current) {
              try {
                const source = audioContextRef.current.createMediaElementSource(audio)
                source.connect(gainNodeRef.current)
                audioRef.current = audio
                audioCreated = true

                // Try to play the audio file
                await audio.play()
              } catch (e) {
                // Connection failed or play failed, use synthetic instead
                audioCreated = false
              }
            }
          } catch (error) {
            // Audio file failed, will use synthetic
            audioCreated = false
          }

          // If audio file didn't work, create synthetic sound
          if (!audioCreated) {
            const synthetic = createSyntheticAmbientSound()
            if (synthetic) {
              audioRef.current = synthetic
            }
          }
        } else {
          // Resume existing audio
          if (audioRef.current.play && typeof audioRef.current.play === 'function') {
            // It's an HTML audio element
            try {
              await audioRef.current.play()
            } catch (e) {
              // Play failed, might need to recreate
              const synthetic = createSyntheticAmbientSound()
              if (synthetic) {
                audioRef.current = synthetic
              }
            }
          }
          // If it's synthetic sound, it's already playing (just needs fade in)
        }

        setIsPlaying(true)
        fadeIn()
        localStorage.setItem('ambient-sound-enabled', 'true')
      }
    } catch (error) {
      console.error('Error toggling audio:', error)
      // If all else fails, try synthetic sound
      if (!isPlaying) {
        const synthetic = createSyntheticAmbientSound()
        if (synthetic) {
          audioRef.current = synthetic
          setIsPlaying(true)
          fadeIn()
          localStorage.setItem('ambient-sound-enabled', 'true')
        }
      }
    }
  }

  return (
    <>
      {/* Toggle Button */}
      <motion.button
        onClick={toggleAudio}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="relative p-2 glass-strong border border-white/10 rounded-lg hover:border-neon-cyan transition-all group"
        aria-label={isPlaying ? 'Desativar som ambiente' : 'Ativar som ambiente'}
        disabled={isLoading}
        title={isPlaying ? 'Desativar som ambiente' : 'Ativar som ambiente'}
      >
        {isPlaying ? (
          <Volume2 className="w-5 h-5 text-neon-cyan group-hover:glow-cyan transition-all" />
        ) : (
          <VolumeX className="w-5 h-5 text-gray-400 group-hover:text-neon-cyan transition-all" />
        )}
        {isPlaying && (
          <motion.div
            className="absolute -top-1 -right-1 w-2 h-2 bg-neon-cyan rounded-full"
            animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        )}
      </motion.button>
    </>
  )
}

