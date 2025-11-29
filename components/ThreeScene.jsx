'use client'

import { OrbitControls, Stars } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { Suspense, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'

// 🗺️ MAPA TOPOGRÁFICO VIVO - Base conceitual
function TopographicTerrain() {
  const meshRef = useRef()
  const materialRef = useRef()

  useFrame((state) => {
    if (meshRef.current) {
      const positions = meshRef.current.geometry.attributes.position
      const time = state.clock.elapsedTime * 0.3

      // Criar ondas topográficas
      for (let i = 0; i < positions.count; i++) {
        const x = positions.getX(i)
        const y = positions.getY(i)
        
        const distance = Math.sqrt(x * x + y * y)
        const elevation = Math.sin(distance * 0.3 - time) * 2 + 
                         Math.cos(x * 0.2 + time * 0.5) * 1.5 +
                         Math.sin(y * 0.2 - time * 0.3) * 1.5
        
        positions.setZ(i, elevation)
      }
      positions.needsUpdate = true
    }

    // Animar cor do terreno
    if (materialRef.current) {
      const colorShift = (Math.sin(state.clock.elapsedTime * 0.2) + 1) / 2
      materialRef.current.color = new THREE.Color().setHSL(0.55 + colorShift * 0.15, 0.8, 0.4)
    }
  })

  return (
    <mesh ref={meshRef} position={[0, -8, -15]} rotation={[-Math.PI / 2.5, 0, 0]}>
      <planeGeometry args={[50, 50, 80, 80]} />
      <meshStandardMaterial
        ref={materialRef}
        color="#0080ff"
        wireframe
        transparent
        opacity={0.4}
        emissive="#0080ff"
        emissiveIntensity={0.5}
      />
    </mesh>
  )
}

// 🏙️ PRÉDIO WIREFRAME CRESCENTE
function GrowingBuilding({ position, height, color, delay = 0 }) {
  const meshRef = useRef()
  const [currentHeight, setCurrentHeight] = useState(0)

  useFrame((state) => {
    if (meshRef.current) {
      // Crescimento orgânico
      const targetHeight = height * (0.5 + Math.sin(state.clock.elapsedTime * 0.5 + delay) * 0.5)
      const newHeight = THREE.MathUtils.lerp(currentHeight, targetHeight, 0.05)
      setCurrentHeight(newHeight)
      
      meshRef.current.scale.y = newHeight / height
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.1
    }
  })

  return (
    <mesh ref={meshRef} position={[position[0], position[1] + height / 2, position[2]]}>
      <boxGeometry args={[0.8, height, 0.8]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={1.5}
        wireframe
        transparent
        opacity={0.7}
      />
    </mesh>
  )
}

// 🏙️ CIDADE COMPLETA
function WireframeCity() {
  const buildings = useMemo(() => {
    const b = []
    const gridSize = 5
    const spacing = 3
    
    for (let i = -gridSize; i <= gridSize; i++) {
      for (let j = -gridSize; j <= gridSize; j++) {
        if (Math.random() > 0.3) {
          const height = 2 + Math.random() * 6
          const x = i * spacing
          const z = j * spacing - 10
          const colors = ['#00ffff', '#ff00ff', '#0080ff']
          const color = colors[Math.floor(Math.random() * colors.length)]
          b.push({ position: [x, -5, z], height, color, delay: (i + j) * 0.3 })
        }
      }
    }
    return b
  }, [])

  return (
    <group>
      {buildings.map((building, i) => (
        <GrowingBuilding key={i} {...building} />
      ))}
    </group>
  )
}

// 📊 STREAM DE DADOS FLUINDO
function DataStream({ start, end, color, speed = 1 }) {
  const pointsRef = useRef()
  const particleCount = 30

  useFrame((state) => {
    if (pointsRef.current) {
      const positions = pointsRef.current.geometry.attributes.position.array
      const time = state.clock.elapsedTime * speed

      for (let i = 0; i < particleCount; i++) {
        const t = ((i / particleCount + time * 0.1) % 1)
        
        positions[i * 3] = THREE.MathUtils.lerp(start[0], end[0], t)
        positions[i * 3 + 1] = THREE.MathUtils.lerp(start[1], end[1], t) + Math.sin(t * Math.PI * 2) * 0.5
        positions[i * 3 + 2] = THREE.MathUtils.lerp(start[2], end[2], t)
      }
      
      pointsRef.current.geometry.attributes.position.needsUpdate = true
    }
  })

  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3)
    for (let i = 0; i < particleCount; i++) {
      const t = i / particleCount
      pos[i * 3] = THREE.MathUtils.lerp(start[0], end[0], t)
      pos[i * 3 + 1] = THREE.MathUtils.lerp(start[1], end[1], t)
      pos[i * 3 + 2] = THREE.MathUtils.lerp(start[2], end[2], t)
    }
    return pos
  }, [start, end])

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        color={color}
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  )
}

// 📊 MÚLTIPLOS STREAMS DE DADOS
function DataFlows() {
  const streams = useMemo(() => [
    { start: [-8, 0, -8], end: [8, 2, -8], color: '#00ffff', speed: 1.2 },
    { start: [8, 0, -12], end: [-8, 2, -12], color: '#ff00ff', speed: 0.9 },
    { start: [-6, 1, -6], end: [6, 3, -14], color: '#0080ff', speed: 1.5 },
    { start: [6, 1, -6], end: [-6, 3, -14], color: '#00ffff', speed: 1.1 },
    { start: [0, 0, -5], end: [0, 4, -15], color: '#ff00ff', speed: 1.3 },
  ], [])

  return (
    <>
      {streams.map((stream, i) => (
        <DataStream key={i} {...stream} />
      ))}
    </>
  )
}

// 🧠 NÓ DA REDE NEURAL
function NeuralNode({ position, color }) {
  const meshRef = useRef()

  useFrame((state) => {
    if (meshRef.current) {
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 2 + position[0]) * 0.3
      meshRef.current.scale.setScalar(pulse * 0.3)
    }
  })

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[1, 16, 16]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={2}
        transparent
        opacity={0.8}
      />
    </mesh>
  )
}

// 🧠 REDE NEURAL COMPLETA
function NeuralNetwork() {
  const nodes = useMemo(() => {
    const n = []
    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * Math.PI * 2
      const radius = 8
      const x = Math.cos(angle) * radius
      const z = Math.sin(angle) * radius - 10
      const y = -2 + Math.random() * 4
      const colors = ['#00ffff', '#ff00ff', '#0080ff']
      n.push({ 
        position: [x, y, z], 
        color: colors[i % 3] 
      })
    }
    return n
  }, [])

  const linesRef = useRef()

  useFrame((state) => {
    if (linesRef.current) {
      const linePositions = []
      
      // Conectar nós próximos
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].position[0] - nodes[j].position[0]
          const dy = nodes[i].position[1] - nodes[j].position[1]
          const dz = nodes[i].position[2] - nodes[j].position[2]
          const distance = Math.sqrt(dx * dx + dy * dy + dz * dz)

          if (distance < 12) {
            linePositions.push(...nodes[i].position, ...nodes[j].position)
          }
        }
      }

      if (linesRef.current.geometry) {
        linesRef.current.geometry.setAttribute(
          'position',
          new THREE.Float32BufferAttribute(linePositions, 3)
        )
      }
    }
  })

  return (
    <>
      {nodes.map((node, i) => (
        <NeuralNode key={i} {...node} />
      ))}
      <lineSegments ref={linesRef}>
        <bufferGeometry />
        <lineBasicMaterial
          color="#00ffff"
          transparent
          opacity={0.25}
        />
      </lineSegments>
    </>
  )
}

// 📍 PIN DE LOCALIZAÇÃO FLUTUANTE
function LocationPin({ position, label }) {
  const groupRef = useRef()
  const haloRef = useRef()

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2 + position[0]) * 0.5
      groupRef.current.rotation.y = state.clock.elapsedTime
    }
    
    if (haloRef.current) {
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 3) * 0.3
      haloRef.current.scale.setScalar(pulse)
    }
  })

  return (
    <group ref={groupRef} position={position}>
      {/* Pin */}
      <mesh position={[0, 0.5, 0]}>
        <coneGeometry args={[0.2, 0.8, 8]} />
        <meshStandardMaterial
          color="#ff00ff"
          emissive="#ff00ff"
          emissiveIntensity={2}
        />
      </mesh>
      
      {/* Halo */}
      <mesh ref={haloRef} position={[0, 0, 0]}>
        <ringGeometry args={[0.4, 0.6, 32]} />
        <meshBasicMaterial
          color="#ff00ff"
          transparent
          opacity={0.3}
          side={THREE.DoubleSide}
        />
      </mesh>
      
      {/* Base sphere */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial
          color="#ff00ff"
          emissive="#ff00ff"
          emissiveIntensity={2}
        />
      </mesh>
    </group>
  )
}

// 📍 CONSTELAÇÃO DE PINS
function LocationPins() {
  const pins = useMemo(() => [
    { position: [-6, 0, -8], label: 'Maputo' },
    { position: [6, 1, -12], label: 'Matola' },
    { position: [-4, 2, -14], label: 'Boane' },
    { position: [5, 0, -6], label: 'KaTembe' },
    { position: [0, 1, -10], label: 'Centro' },
  ], [])

  return (
    <>
      {pins.map((pin, i) => (
        <LocationPin key={i} {...pin} />
      ))}
    </>
  )
}

// 📐 GRID DE COORDENADAS
function CoordinateGrid() {
  const gridRef = useRef()

  useFrame((state) => {
    if (gridRef.current) {
      gridRef.current.rotation.y = state.clock.elapsedTime * 0.05
      const opacity = 0.15 + Math.sin(state.clock.elapsedTime * 0.5) * 0.05
      gridRef.current.material.opacity = opacity
    }
  })

  return (
    <mesh ref={gridRef} position={[0, -5, -10]}>
      <ringGeometry args={[15, 16, 64]} />
      <meshBasicMaterial
        color="#00ffff"
        transparent
        opacity={0.15}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}

// ✨ PARTÍCULAS DE INFORMAÇÃO AMBIENTE
function AmbientDataParticles() {
  const particlesRef = useRef()
  const particleCount = 200

  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3)
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 40
      pos[i * 3 + 1] = (Math.random() - 0.5) * 40
      pos[i * 3 + 2] = (Math.random() - 0.5) * 40 - 10
    }
    return pos
  }, [])

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.02
    }
  })

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#ffffff"
        transparent
        opacity={0.4}
        sizeAttenuation
      />
    </points>
  )
}

// 💫 LUZ DINÂMICA QUE ORBITA
function OrbitalLight({ color, radius, speed, height }) {
  const lightRef = useRef()

  useFrame((state) => {
    if (lightRef.current) {
      const angle = state.clock.elapsedTime * speed
      lightRef.current.position.x = Math.cos(angle) * radius
      lightRef.current.position.z = Math.sin(angle) * radius - 10
      lightRef.current.position.y = height
    }
  })

  return (
    <pointLight
      ref={lightRef}
      color={color}
      intensity={2}
      distance={25}
    />
  )
}

export default function ThreeScene() {
  return (
    <div className="w-full h-full">
      <Suspense fallback={null}>
        <Canvas
          camera={{ position: [0, 5, 20], fov: 65 }}
          gl={{ alpha: true, antialias: true }}
        >
          {/* 🌟 Iluminação Conceitual */}
          <ambientLight intensity={0.3} />
          <pointLight position={[0, 10, -10]} intensity={1.5} color="#00ffff" />
          <pointLight position={[0, -5, -10]} intensity={1} color="#ff00ff" />
          <spotLight position={[15, 15, 0]} intensity={2} color="#0080ff" angle={0.6} penumbra={1} />
          <spotLight position={[-15, 15, -20]} intensity={2} color="#00ffff" angle={0.6} penumbra={1} />
          
          {/* Luzes orbitais */}
          <OrbitalLight color="#00ffff" radius={12} speed={0.3} height={8} />
          <OrbitalLight color="#ff00ff" radius={15} speed={-0.2} height={5} />

          {/* ⭐ Estrelas de fundo */}
          <Stars radius={250} depth={120} count={15000} factor={10} fade speed={2.5} />

          {/* 🗺️ Camada 1: Mapa Topográfico */}
          <TopographicTerrain />

          {/* 📐 Grid de Coordenadas */}
          <CoordinateGrid />

          {/* 🏙️ Camada 2: Cidade Wireframe */}
          <WireframeCity />

          {/* 📊 Camada 3: Fluxos de Dados */}
          <DataFlows />

          {/* 🧠 Camada 4: Rede Neural */}
          <NeuralNetwork />

          {/* 📍 Camada 5: Pins de Localização */}
          <LocationPins />

          {/* ✨ Partículas Ambiente */}
          <AmbientDataParticles />

          {/* 🎮 Controles */}
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.3}
            minPolarAngle={Math.PI / 6}
            maxPolarAngle={Math.PI / 2}
            target={[0, 0, -10]}
          />
        </Canvas>
      </Suspense>
    </div>
  )
}
