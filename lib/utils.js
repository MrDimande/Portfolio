import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

/**
 * Detects the current festive season and returns decoration info
 * @returns {Object} { season: string, decoration: string, color: string }
 */
export function getFestiveSeason() {
  const now = new Date()
  const month = now.getMonth() + 1 // 1-12
  const day = now.getDate()
  
  // Christmas: December 1-31
  if (month === 12) {
    return {
      season: 'christmas',
      decoration: '🎅',
      color: 'text-red-500',
      description: 'Natal'
    }
  }
  
  // New Year: January 1-7
  if (month === 1 && day <= 7) {
    return {
      season: 'newyear',
      decoration: '🎉',
      color: 'text-yellow-400',
      description: 'Ano Novo'
    }
  }
  
  // Easter: March-April (simplified - check around April)
  if (month === 3 || month === 4) {
    // Simple check - could be improved with actual Easter calculation
    return {
      season: 'easter',
      decoration: '🐰',
      color: 'text-pink-400',
      description: 'Páscoa'
    }
  }
  
  // Halloween: October 20-31
  if (month === 10 && day >= 20) {
    return {
      season: 'halloween',
      decoration: '🎃',
      color: 'text-orange-500',
      description: 'Halloween'
    }
  }
  
  // No festive season
  return null
}

