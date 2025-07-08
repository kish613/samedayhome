import React from 'react'
import { motion } from 'framer-motion'

const AnimatedTimelinePaths = () => {
  // Define path data for different timeline routes
  const paths = [
    {
      id: 1,
      path: "M 0 40 Q 200 20 400 60 Q 600 100 800 40 Q 1000 10 1200 80",
      delay: 0,
      duration: 15,
      strokeWidth: 2,
      opacity: 0.3
    },
    {
      id: 2,
      path: "M 0 120 Q 300 80 600 140 Q 900 180 1200 120",
      delay: 3,
      duration: 18,
      strokeWidth: 1.5,
      opacity: 0.25
    },
    {
      id: 3,
      path: "M 0 200 Q 250 160 500 220 Q 750 260 1000 200 Q 1200 180 1400 240",
      delay: 6,
      duration: 20,
      strokeWidth: 2,
      opacity: 0.2
    },
    {
      id: 4,
      path: "M 0 300 Q 400 250 800 320 Q 1200 350 1600 300",
      delay: 9,
      duration: 16,
      strokeWidth: 1,
      opacity: 0.15
    }
  ]

  // Moving dots that travel along the paths
  const movingDots = [
    {
      id: 1,
      pathId: 1,
      delay: 2,
      duration: 12,
      size: 4,
      color: 'rgba(59, 130, 246, 0.6)'
    },
    {
      id: 2,
      pathId: 2,
      delay: 8,
      duration: 14,
      size: 3,
      color: 'rgba(59, 130, 246, 0.4)'
    },
    {
      id: 3,
      pathId: 3,
      delay: 14,
      duration: 16,
      size: 3.5,
      color: 'rgba(59, 130, 246, 0.5)'
    },
    {
      id: 4,
      pathId: 4,
      delay: 5,
      duration: 18,
      size: 2.5,
      color: 'rgba(59, 130, 246, 0.3)'
    }
  ]

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1200 400"
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Animated Timeline Paths */}
        {paths.map((pathData) => (
          <motion.path
            key={pathData.id}
            d={pathData.path}
            fill="none"
            stroke="rgba(59, 130, 246, 0.3)"
            strokeWidth={pathData.strokeWidth}
            opacity={pathData.opacity}
            strokeLinecap="round"
            strokeDasharray="10,5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ 
              pathLength: [0, 1, 1, 0],
              opacity: [0, pathData.opacity, pathData.opacity, 0]
            }}
            transition={{
              duration: pathData.duration,
              delay: pathData.delay,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}

        {/* Moving Dots */}
        {movingDots.map((dot) => {
          const path = paths.find(p => p.id === dot.pathId)
          return (
            <motion.circle
              key={dot.id}
              r={dot.size}
              fill={dot.color}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 1, 0] }}
              transition={{
                duration: dot.duration,
                delay: dot.delay,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <motion.animateMotion
                dur={`${dot.duration}s`}
                repeatCount="indefinite"
                begin={`${dot.delay}s`}
              >
                <mpath href={`#path-${dot.pathId}`} />
              </motion.animateMotion>
            </motion.circle>
          )
        })}

        {/* Hidden paths for motion references */}
        <defs>
          {paths.map((pathData) => (
            <path
              key={`path-${pathData.id}`}
              id={`path-${pathData.id}`}
              d={pathData.path}
            />
          ))}
        </defs>
      </svg>

      {/* Additional floating elements */}
      <div className="absolute inset-0">
        {Array.from({ length: 8 }, (_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              x: [0, Math.random() > 0.5 ? 15 : -15, 0],
              opacity: [0, 0.6, 0]
            }}
            transition={{
              duration: Math.random() * 3 + 4,
              delay: Math.random() * 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default AnimatedTimelinePaths