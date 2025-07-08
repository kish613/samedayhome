import React from 'react'
import { motion } from 'framer-motion'

const FloatingOrbs = () => {
  const orbs = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    size: Math.random() * 80 + 40, // 40-120px
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 5,
    duration: Math.random() * 10 + 15, // 15-25s
    color: i % 3 === 0 ? 'blue' : i % 3 === 1 ? 'orange' : 'purple'
  }))

  const getGradient = (color) => {
    switch (color) {
      case 'blue':
        return 'radial-gradient(circle, rgba(59, 130, 246, 0.03) 0%, rgba(59, 130, 246, 0.01) 70%, transparent 100%)'
      case 'orange':
        return 'radial-gradient(circle, rgba(249, 115, 22, 0.03) 0%, rgba(249, 115, 22, 0.01) 70%, transparent 100%)'
      case 'purple':
        return 'radial-gradient(circle, rgba(147, 51, 234, 0.03) 0%, rgba(147, 51, 234, 0.01) 70%, transparent 100%)'
      default:
        return 'radial-gradient(circle, rgba(59, 130, 246, 0.03) 0%, rgba(59, 130, 246, 0.01) 70%, transparent 100%)'
    }
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {orbs.map((orb) => (
        <motion.div
          key={orb.id}
          className="absolute rounded-full blur-sm"
          style={{
            width: orb.size,
            height: orb.size,
            left: `${orb.x}%`,
            top: `${orb.y}%`,
            background: getGradient(orb.color),
            zIndex: 1,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() > 0.5 ? 20 : -20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: orb.duration,
            delay: orb.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}

export default FloatingOrbs