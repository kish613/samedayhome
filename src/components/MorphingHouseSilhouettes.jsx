import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

const MorphingHouseSilhouettes = () => {
  const svgRef = useRef(null)
  
  // Different house types with their path data
  const houseTypes = [
    {
      name: 'Detached',
      path: 'M 50 150 L 50 80 L 80 50 L 120 50 L 150 80 L 150 150 L 120 150 L 120 110 L 80 110 L 80 150 Z M 70 90 L 70 100 L 90 100 L 90 90 Z M 110 90 L 110 100 L 130 100 L 130 90 Z',
      color: 'rgba(59, 130, 246, 0.15)'
    },
    {
      name: 'Semi-Detached',
      path: 'M 30 150 L 30 75 L 60 45 L 90 45 L 120 75 L 120 150 L 90 150 L 90 110 L 60 110 L 60 150 Z M 45 85 L 45 95 L 55 95 L 55 85 Z M 95 85 L 95 95 L 105 95 L 105 85 Z',
      color: 'rgba(251, 146, 60, 0.15)'
    },
    {
      name: 'Terraced',
      path: 'M 40 150 L 40 70 L 60 50 L 80 50 L 100 70 L 100 150 L 80 150 L 80 120 L 60 120 L 60 150 Z M 50 80 L 50 90 L 60 90 L 60 80 Z M 80 80 L 80 90 L 90 90 L 90 80 Z',
      color: 'rgba(34, 197, 94, 0.15)'
    },
    {
      name: 'Bungalow',
      path: 'M 20 150 L 20 90 L 50 60 L 130 60 L 160 90 L 160 150 L 130 150 L 130 120 L 50 120 L 50 150 Z M 40 95 L 40 105 L 60 105 L 60 95 Z M 120 95 L 120 105 L 140 105 L 140 95 Z',
      color: 'rgba(168, 85, 247, 0.15)'
    },
    {
      name: 'Flat',
      path: 'M 50 150 L 50 40 L 110 40 L 110 150 Z M 60 50 L 60 60 L 70 60 L 70 50 Z M 90 50 L 90 60 L 100 60 L 100 50 Z M 60 75 L 60 85 L 70 85 L 70 75 Z M 90 75 L 90 85 L 100 85 L 100 75 Z M 60 100 L 60 110 L 70 110 L 70 100 Z M 90 100 L 90 110 L 100 110 L 100 100 Z',
      color: 'rgba(236, 72, 153, 0.15)'
    }
  ]

  useEffect(() => {
    const svg = svgRef.current
    if (!svg) return

    // Create multiple house instances with random positions and animations
    const houseInstances = []
    const numHouses = 12
    
    for (let i = 0; i < numHouses; i++) {
      const houseType = houseTypes[Math.floor(Math.random() * houseTypes.length)]
      const scale = 0.5 + Math.random() * 0.8
      const x = Math.random() * 100
      const y = Math.random() * 100
      const morphDelay = Math.random() * 5
      const morphDuration = 15 + Math.random() * 10
      
      houseInstances.push({
        ...houseType,
        scale,
        x,
        y,
        morphDelay,
        morphDuration,
        opacity: 0.05 + Math.random() * 0.15
      })
    }

    return () => {
      // Cleanup if needed
    }
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Base gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-blue-50/30" />
      
      {/* SVG container for morphing houses */}
      <svg
        ref={svgRef}
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Define gradients for each house type */}
          <linearGradient id="detachedGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#1E40AF" stopOpacity="0.1" />
          </linearGradient>
          
          <linearGradient id="semiGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F97316" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#EA580C" stopOpacity="0.1" />
          </linearGradient>
          
          <linearGradient id="terracedGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22C55E" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#16A34A" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        
        {/* Static house silhouettes with morphing animations */}
        <g className="house-group-1">
          <motion.path
            d="M 10 80 L 10 50 L 25 35 L 40 50 L 40 80 L 30 80 L 30 65 L 20 65 L 20 80 Z"
            fill="url(#detachedGradient)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ 
              pathLength: 1, 
              opacity: [0, 0.15, 0.15, 0],
              d: [
                "M 10 80 L 10 50 L 25 35 L 40 50 L 40 80 L 30 80 L 30 65 L 20 65 L 20 80 Z",
                "M 15 85 L 15 55 L 25 40 L 35 55 L 35 85 L 30 85 L 30 70 L 20 70 L 20 85 Z",
                "M 12 82 L 12 52 L 27 37 L 42 52 L 42 82 L 32 82 L 32 67 L 22 67 L 22 82 Z",
                "M 10 80 L 10 50 L 25 35 L 40 50 L 40 80 L 30 80 L 30 65 L 20 65 L 20 80 Z"
              ]
            }}
            transition={{ 
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </g>
        
        <g className="house-group-2">
          <motion.path
            d="M 60 90 L 60 60 L 75 45 L 90 60 L 90 90 L 80 90 L 80 75 L 70 75 L 70 90 Z"
            fill="url(#semiGradient)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ 
              pathLength: 1, 
              opacity: [0, 0.12, 0.12, 0],
              d: [
                "M 60 90 L 60 60 L 75 45 L 90 60 L 90 90 L 80 90 L 80 75 L 70 75 L 70 90 Z",
                "M 58 88 L 58 58 L 75 43 L 92 58 L 92 88 L 82 88 L 82 73 L 68 73 L 68 88 Z",
                "M 62 92 L 62 62 L 75 47 L 88 62 L 88 92 L 78 92 L 78 77 L 72 77 L 72 92 Z",
                "M 60 90 L 60 60 L 75 45 L 90 60 L 90 90 L 80 90 L 80 75 L 70 75 L 70 90 Z"
              ]
            }}
            transition={{ 
              duration: 18,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 3
            }}
          />
        </g>
        
        <g className="house-group-3">
          <motion.path
            d="M 35 70 L 35 40 L 50 25 L 65 40 L 65 70 L 55 70 L 55 55 L 45 55 L 45 70 Z"
            fill="url(#terracedGradient)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ 
              pathLength: 1, 
              opacity: [0, 0.1, 0.1, 0],
              d: [
                "M 35 70 L 35 40 L 50 25 L 65 40 L 65 70 L 55 70 L 55 55 L 45 55 L 45 70 Z",
                "M 33 68 L 33 38 L 50 23 L 67 38 L 67 68 L 57 68 L 57 53 L 43 53 L 43 68 Z",
                "M 37 72 L 37 42 L 50 27 L 63 42 L 63 72 L 53 72 L 53 57 L 47 57 L 47 72 Z",
                "M 35 70 L 35 40 L 50 25 L 65 40 L 65 70 L 55 70 L 55 55 L 45 55 L 45 70 Z"
              ]
            }}
            transition={{ 
              duration: 22,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 5
            }}
          />
        </g>
        
        {/* Additional morphing houses */}
        <g className="house-group-4">
          <motion.path
            d="M 20 95 L 20 75 L 30 65 L 40 75 L 40 95 Z"
            fill="rgba(168, 85, 247, 0.08)"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: [0, 1, 1, 0],
              opacity: [0, 0.08, 0.08, 0],
              x: [0, 5, -5, 0],
              y: [0, -3, 3, 0]
            }}
            transition={{ 
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 7
            }}
          />
        </g>
        
        <g className="house-group-5">
          <motion.path
            d="M 70 35 L 70 15 L 85 5 L 100 15 L 100 35 Z"
            fill="rgba(236, 72, 153, 0.06)"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: [0, 1.2, 1.2, 0],
              opacity: [0, 0.06, 0.06, 0],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ 
              duration: 28,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 10
            }}
          />
        </g>
      </svg>
      
      {/* Overlay gradient for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-white/50 via-transparent to-transparent pointer-events-none" />
      
      {/* Animated text overlay */}
      <motion.div
        className="absolute bottom-10 left-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <div className="bg-white/70 backdrop-blur-sm rounded-lg px-4 py-2 shadow-sm">
          <p className="text-xs font-medium text-gray-600">All Property Types Welcome</p>
          <p className="text-xs text-gray-500">Detached • Semi • Terraced • Flats • Bungalows</p>
        </div>
      </motion.div>
    </div>
  )
}

export default MorphingHouseSilhouettes