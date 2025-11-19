// Sound Effects System for Interactive Elements
// Uses Web Audio API to generate subtle futuristic sounds

class SoundEffects {
  constructor() {
    this.audioContext = null
    this.masterGain = null
    this.enabled = true
    this.volume = 0.15 // 15% volume for subtlety
    this.init()
  }

  init() {
    if (typeof window === 'undefined') return

    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext
      if (AudioContext) {
        this.audioContext = new AudioContext()
        this.masterGain = this.audioContext.createGain()
        this.masterGain.gain.value = this.volume
        this.masterGain.connect(this.audioContext.destination)

        // Check if user has interacted (required by browsers)
        const enableOnInteraction = () => {
          if (this.audioContext.state === 'suspended') {
            this.audioContext.resume()
          }
          document.removeEventListener('click', enableOnInteraction)
          document.removeEventListener('touchstart', enableOnInteraction)
        }
        document.addEventListener('click', enableOnInteraction)
        document.addEventListener('touchstart', enableOnInteraction)
      }
    } catch (error) {
      console.warn('Sound effects not available:', error)
      this.enabled = false
    }
  }

  // Play a click sound
  playClick() {
    if (!this.enabled || !this.audioContext) return
    this.playTone(800, 0.05, 'sine')
  }

  // Play a hover sound
  playHover() {
    if (!this.enabled || !this.audioContext) return
    this.playTone(600, 0.08, 'sine')
  }

  // Play a success sound
  playSuccess() {
    if (!this.enabled || !this.audioContext) return
    this.playChord([523.25, 659.25, 783.99], 0.15) // C major chord
  }

  // Play an error sound
  playError() {
    if (!this.enabled || !this.audioContext) return
    this.playTone(200, 0.1, 'sawtooth')
  }

  // Play a notification sound
  playNotification() {
    if (!this.enabled || !this.audioContext) return
    this.playTone(440, 0.1, 'square')
  }

  // Play a swipe/transition sound
  playSwipe() {
    if (!this.enabled || !this.audioContext) return
    this.playSweep(400, 800, 0.1)
  }

  // Generic tone player
  playTone(frequency, duration, type = 'sine') {
    if (!this.audioContext || this.audioContext.state === 'suspended') return

    try {
      const oscillator = this.audioContext.createOscillator()
      const gainNode = this.audioContext.createGain()

      oscillator.type = type
      oscillator.frequency.value = frequency

      gainNode.gain.setValueAtTime(0, this.audioContext.currentTime)
      gainNode.gain.linearRampToValueAtTime(this.volume * 0.5, this.audioContext.currentTime + 0.01)
      gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration)

      oscillator.connect(gainNode)
      gainNode.connect(this.masterGain)

      oscillator.start(this.audioContext.currentTime)
      oscillator.stop(this.audioContext.currentTime + duration)
    } catch (error) {
      // Silently fail if audio context is not available
    }
  }

  // Play a chord (multiple frequencies)
  playChord(frequencies, duration) {
    if (!this.audioContext || this.audioContext.state === 'suspended') return

    try {
      frequencies.forEach((freq, index) => {
        setTimeout(() => {
          this.playTone(freq, duration * 0.8, 'sine')
        }, index * 20)
      })
    } catch (error) {
      // Silently fail
    }
  }

  // Play a frequency sweep
  playSweep(startFreq, endFreq, duration) {
    if (!this.audioContext || this.audioContext.state === 'suspended') return

    try {
      const oscillator = this.audioContext.createOscillator()
      const gainNode = this.audioContext.createGain()

      oscillator.type = 'sine'
      oscillator.frequency.setValueAtTime(startFreq, this.audioContext.currentTime)
      oscillator.frequency.exponentialRampToValueAtTime(endFreq, this.audioContext.currentTime + duration)

      gainNode.gain.setValueAtTime(0, this.audioContext.currentTime)
      gainNode.gain.linearRampToValueAtTime(this.volume * 0.3, this.audioContext.currentTime + 0.01)
      gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration)

      oscillator.connect(gainNode)
      gainNode.connect(this.masterGain)

      oscillator.start(this.audioContext.currentTime)
      oscillator.stop(this.audioContext.currentTime + duration)
    } catch (error) {
      // Silently fail
    }
  }

  // Set volume (0 to 1)
  setVolume(volume) {
    this.volume = Math.max(0, Math.min(1, volume))
    if (this.masterGain) {
      this.masterGain.gain.value = this.volume
    }
  }

  // Enable/disable sound effects
  setEnabled(enabled) {
    this.enabled = enabled
    // Save preference
    if (typeof window !== 'undefined') {
      localStorage.setItem('sound-effects-enabled', enabled ? 'true' : 'false')
    }
  }

  // Load preference from localStorage
  loadPreference() {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('sound-effects-enabled')
      if (saved !== null) {
        this.enabled = saved === 'true'
      }
    }
  }
}

// Create singleton instance
let soundEffectsInstance = null

export const getSoundEffects = () => {
  if (typeof window === 'undefined') return null

  if (!soundEffectsInstance) {
    soundEffectsInstance = new SoundEffects()
    soundEffectsInstance.loadPreference()
  }
  return soundEffectsInstance
}

export default getSoundEffects

