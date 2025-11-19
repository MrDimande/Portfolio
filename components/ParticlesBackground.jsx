'use client'

import { useCallback, useMemo } from 'react'
import dynamic from 'next/dynamic'

// Dynamic import to avoid SSR issues
const Particles = dynamic(
  () => import('@tsparticles/react').then((mod) => mod.default),
  { ssr: false }
)

export default function ParticlesBackground() {
  const particlesInit = useCallback(async (engine) => {
    if (typeof window !== 'undefined') {
      const { loadSlim } = await import('@tsparticles/slim')
      await loadSlim(engine)
    }
  }, [])

  const options = useMemo(
    () => ({
      background: {
        color: {
          value: 'transparent',
        },
      },
      fpsLimit: 60,
      interactivity: {
        events: {
          onHover: {
            enable: true,
            mode: 'repulse',
          },
          resize: {
            enable: true,
          },
        },
        modes: {
          repulse: {
            distance: 80,
            duration: 0.3,
            speed: 0.8,
            factor: 0.5,
          },
        },
      },
      particles: {
        color: {
          value: ['#00ffff', '#ff00ff'],
        },
        links: {
          color: {
            value: ['#00ffff', '#ff00ff'],
          },
          distance: 120,
          enable: true,
          opacity: 0.15,
          width: 0.8,
          triangles: {
            enable: false,
          },
        },
        move: {
          direction: 'none',
          enable: true,
          outModes: {
            default: 'out',
          },
          random: true,
          speed: 0.3,
          straight: false,
          attract: {
            enable: false,
          },
        },
        number: {
          density: {
            enable: true,
            area: 1000,
          },
          value: 40,
        },
        opacity: {
          value: 0.25,
          random: {
            enable: true,
            minimumValue: 0.1,
          },
          animation: {
            enable: true,
            speed: 0.3,
            minimumValue: 0.1,
            sync: false,
          },
        },
        shape: {
          type: 'circle',
        },
        size: {
          value: { min: 1, max: 2.5 },
          random: {
            enable: true,
            minimumValue: 0.8,
          },
          animation: {
            enable: true,
            speed: 1.5,
            minimumValue: 0.5,
            sync: false,
          },
        },
      },
      detectRetina: true,
      smooth: true,
      pauseOnBlur: true,
      pauseOnOutsideViewport: true,
    }),
    []
  )

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={options}
        className="w-full h-full"
        style={{
          opacity: 0.35,
        }}
      />
    </div>
  )
}

