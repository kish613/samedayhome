import React from 'react'
import { motion } from 'framer-motion'

const DiagonalWaves = () => {
  const waves = Array.from({ length: 6 }, (_, i) => ({
    id: i,
    delay: i * 2,
    duration: 20 + i * 2,
    opacity: 0.02 + (i * 0.005),
  }))

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {waves.map((wave) => (
        <motion.div
          key={wave.id}
          className="absolute inset-0"
          style={{
            background: `repeating-linear-gradient(
              45deg,
              transparent,
              transparent 20px,
              rgba(249, 115, 22, ${wave.opacity * 4}) 22px,
              rgba(249, 115, 22, ${wave.opacity * 4}) 24px
            )`,
          }}
          animate={{
            x: [-100, 100],
          }}
          transition={{
            duration: wave.duration,
            delay: wave.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
      {/* Secondary layer with different angle */}
      {waves.map((wave) => (
        <motion.div
          key={`secondary-${wave.id}`}
          className="absolute inset-0"
          style={{
            background: `repeating-linear-gradient(
              -45deg,
              transparent,
              transparent 30px,
              rgba(59, 130, 246, ${wave.opacity * 2}) 32px,
              rgba(59, 130, 246, ${wave.opacity * 2}) 34px
            )`,
          }}
          animate={{
            x: [100, -100],
          }}
          transition={{
            duration: wave.duration + 5,
            delay: wave.delay + 1,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  )
}

export default DiagonalWaves