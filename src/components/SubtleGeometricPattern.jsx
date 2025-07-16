import React from 'react'
import { motion } from 'framer-motion'

const SubtleGeometricPattern = ({ variant = 'dots', opacity = 0.03 }) => {
  const patterns = {
    dots: {
      backgroundImage: `radial-gradient(circle, rgba(59, 130, 246, ${opacity}) 1px, transparent 1px)`,
      backgroundSize: '20px 20px',
    },
    grid: {
      backgroundImage: `
        linear-gradient(rgba(59, 130, 246, ${opacity}) 1px, transparent 1px),
        linear-gradient(90deg, rgba(59, 130, 246, ${opacity}) 1px, transparent 1px)
      `,
      backgroundSize: '30px 30px',
    },
    diagonal: {
      backgroundImage: `repeating-linear-gradient(
        45deg,
        transparent,
        transparent 10px,
        rgba(59, 130, 246, ${opacity}) 10px,
        rgba(59, 130, 246, ${opacity}) 11px
      )`,
    },
    hexagon: {
      backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%233b82f6' fill-opacity='${opacity}'%3E%3Cpath d='M20 20l-8-4.64v-9.28L20 1.44l8 4.64v9.28L20 20zm8-14.64L20 1.44 12 5.36v9.28L20 20l8-4.64v-9.28z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
    },
    triangles: {
      backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%233b82f6' fill-opacity='${opacity}'%3E%3Cpath d='M30 6l12 21H18z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
    },
  }

  return (
    <motion.div
      className="absolute inset-0 pointer-events-none z-0"
      style={patterns[variant]}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
    />
  )
}

export default SubtleGeometricPattern