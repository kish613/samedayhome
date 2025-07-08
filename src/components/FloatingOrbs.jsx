import React from 'react'
import { motion } from 'framer-motion'

const FloatingOrbs = () => {
  const orbs = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    size: Math.random() * 120 + 80, // 80-200px (larger)
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 3,
    duration: Math.random() * 8 + 10, // 10-18s (faster)
    color: i % 4 === 0 ? 'blue' : i % 4 === 1 ? 'orange' : i % 4 === 2 ? 'purple' : 'green'
  }))

  const getGradient = (color) => {
    switch (color) {
      case 'blue':
        return 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, rgba(59, 130, 246, 0.08) 50%, rgba(59, 130, 246, 0.03) 80%, transparent 100%)'
      case 'orange':
        return 'radial-gradient(circle, rgba(249, 115, 22, 0.15) 0%, rgba(249, 115, 22, 0.08) 50%, rgba(249, 115, 22, 0.03) 80%, transparent 100%)'
      case 'purple':
        return 'radial-gradient(circle, rgba(147, 51, 234, 0.15) 0%, rgba(147, 51, 234, 0.08) 50%, rgba(147, 51, 234, 0.03) 80%, transparent 100%)'
      case 'green':
        return 'radial-gradient(circle, rgba(34, 197, 94, 0.15) 0%, rgba(34, 197, 94, 0.08) 50%, rgba(34, 197, 94, 0.03) 80%, transparent 100%)'
      default:
        return 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, rgba(59, 130, 246, 0.08) 50%, rgba(59, 130, 246, 0.03) 80%, transparent 100%)'
    }
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {orbs.map((orb) => (
        <motion.div
          key={orb.id}
          className="absolute rounded-full"
          style={{
            width: orb.size,
            height: orb.size,
            left: `${orb.x}%`,
            top: `${orb.y}%`,
            background: getGradient(orb.color),
            zIndex: 1,
            filter: 'blur(8px)',
          }}
          animate={{
            y: [0, -60, 0],
            x: [0, Math.random() > 0.5 ? 40 : -40, 0],
            scale: [1, 1.3, 0.8, 1],
            opacity: [0.3, 0.7, 0.4, 0.3],
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