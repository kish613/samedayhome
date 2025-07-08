import React from 'react'
import { motion } from 'framer-motion'

const MorphingBlobs = () => {
  const blobs = Array.from({ length: 4 }, (_, i) => ({
    id: i,
    size: Math.random() * 150 + 100, // 100-250px
    x: Math.random() * 80 + 10,
    y: Math.random() * 80 + 10,
    delay: i * 2,
    duration: Math.random() * 8 + 12, // 12-20s
  }))

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {blobs.map((blob) => (
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
            scale: [1, 1.3, 0.8, 1],
            rotate: [0, 180, 360],
            x: [0, 50, -30, 0],
            y: [0, -40, 20, 0],
          }}
          transition={{
            duration: blob.duration,
            delay: blob.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div
            className="w-full h-full opacity-30 blur-xl"
            style={{
              background: 'linear-gradient(45deg, rgba(34, 197, 94, 0.06), rgba(59, 130, 246, 0.06), rgba(249, 115, 22, 0.06))',
              clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
              filter: 'blur(20px)',
              zIndex: 1,
            }}
          />
        </motion.div>
      ))}
    </div>
  )
}

export default MorphingBlobs