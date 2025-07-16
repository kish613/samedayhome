import React from 'react'
import { motion } from 'framer-motion'

const MinimalPatternOverlay = ({ pattern = 'subtle-grid', opacity = 0.025 }) => {
  const patterns = {
    'subtle-grid': {
      backgroundImage: `
        linear-gradient(rgba(59, 130, 246, ${opacity}) 0.5px, transparent 0.5px),
        linear-gradient(90deg, rgba(59, 130, 246, ${opacity}) 0.5px, transparent 0.5px)
      `,
      backgroundSize: '40px 40px',
    },
    'micro-dots': {
      backgroundImage: `radial-gradient(circle, rgba(59, 130, 246, ${opacity}) 0.5px, transparent 0.5px)`,
      backgroundSize: '15px 15px',
    },
    'fine-lines': {
      backgroundImage: `repeating-linear-gradient(
        0deg,
        transparent,
        transparent 19px,
        rgba(59, 130, 246, ${opacity}) 19px,
        rgba(59, 130, 246, ${opacity}) 20px
      )`,
    },
    'cross-hatch': {
      backgroundImage: `
        repeating-linear-gradient(
          45deg,
          transparent,
          transparent 14px,
          rgba(59, 130, 246, ${opacity * 0.7}) 14px,
          rgba(59, 130, 246, ${opacity * 0.7}) 15px
        ),
        repeating-linear-gradient(
          -45deg,
          transparent,
          transparent 14px,
          rgba(59, 130, 246, ${opacity * 0.7}) 14px,
          rgba(59, 130, 246, ${opacity * 0.7}) 15px
        )
      `,
    },
    'diamond-grid': {
      backgroundImage: `url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%233b82f6' fill-opacity='${opacity}'%3E%3Cpath d='M15 0l7.5 7.5L15 15 7.5 7.5z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
    },
    'plus-pattern': {
      backgroundImage: `url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%233b82f6' fill-opacity='${opacity}'%3E%3Cpath d='M12 0v24M0 12h24'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
    },
  }

  return (
    <motion.div
      className="absolute inset-0 pointer-events-none z-0"
      style={patterns[pattern]}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2, ease: "easeOut" }}
    />
  )
}

export default MinimalPatternOverlay