import React from 'react'
import { motion } from 'framer-motion'

const MorphingBlobs = () => {
  const blobs = Array.from({ length: 6 }, (_, i) => ({
    id: i,
    size: Math.random() * 200 + 150, // 150-350px (much larger)
    x: Math.random() * 80 + 10,
    y: Math.random() * 80 + 10,
    delay: i * 1.5,
    duration: Math.random() * 6 + 8, // 8-14s (faster)
  }))

  const colors = [
    'linear-gradient(45deg, rgba(34, 197, 94, 0.12), rgba(59, 130, 246, 0.12))',
    'linear-gradient(135deg, rgba(249, 115, 22, 0.12), rgba(147, 51, 234, 0.12))',
    'linear-gradient(225deg, rgba(59, 130, 246, 0.12), rgba(249, 115, 22, 0.12))',
    'linear-gradient(315deg, rgba(147, 51, 234, 0.12), rgba(34, 197, 94, 0.12))',
    'linear-gradient(90deg, rgba(236, 72, 153, 0.12), rgba(59, 130, 246, 0.12))',
    'linear-gradient(180deg, rgba(34, 197, 94, 0.12), rgba(236, 72, 153, 0.12))',
  ]

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {blobs.map((blob, index) => (
        <motion.div
          key={blob.id}
          className="absolute"
          style={{
            width: blob.size,
            height: blob.size,
            left: `${blob.x}%`,
            top: `${blob.y}%`,
          }}
          animate={{
            scale: [1, 1.4, 0.7, 1.2, 1],
            rotate: [0, 90, 180, 270, 360],
            x: [0, 60, -40, 30, 0],
            y: [0, -50, 30, -20, 0],
          }}
          transition={{
            duration: blob.duration,
            delay: blob.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div
            className="w-full h-full opacity-60"
            style={{
              background: colors[index % colors.length],
              clipPath: 'polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%)',
              filter: 'blur(15px)',
              zIndex: 1,
            }}
          />
          <div
            className="absolute inset-0 w-full h-full opacity-40"
            style={{
              background: colors[(index + 1) % colors.length],
              clipPath: 'circle(50% at 50% 50%)',
              filter: 'blur(25px)',
              zIndex: 0,
            }}
          />
        </motion.div>
      ))}
    </div>
  )
}

export default MorphingBlobs