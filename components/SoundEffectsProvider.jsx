'use client'

import { useEffect } from 'react'
import { getSoundEffects } from '@/lib/soundEffects'

export default function SoundEffectsProvider({ children }) {
  useEffect(() => {
    // Initialize sound effects system
    const sounds = getSoundEffects()

    // Add event listeners for interactive elements
    const handleClick = (e) => {
      const target = e.target
      // Check if target is a valid DOM element
      if (!target || !(target instanceof Element)) return

      if (
        target.tagName === 'BUTTON' ||
        target.closest('button') ||
        target.closest('a') ||
        target.closest('[role="button"]')
      ) {
        sounds?.playClick()
      }
    }

    const handleMouseEnter = (e) => {
      const target = e.target
      // Check if target is a valid DOM element
      if (!target || !(target instanceof Element)) return

      if (
        target.tagName === 'BUTTON' ||
        target.closest('button') ||
        target.closest('a') ||
        target.closest('[role="button"]')
      ) {
        sounds?.playHover()
      }
    }

    // Add listeners
    document.addEventListener('click', handleClick, true)
    document.addEventListener('mouseenter', handleMouseEnter, { capture: true, passive: true })

    return () => {
      document.removeEventListener('click', handleClick, true)
      document.removeEventListener('mouseenter', handleMouseEnter, { capture: true })
    }
  }, [])

  return <>{children}</>
}

