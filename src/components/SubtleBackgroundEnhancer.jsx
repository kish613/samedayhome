import React from 'react'
import { motion } from 'framer-motion'
import SubtleGeometricPattern from './SubtleGeometricPattern'
import TextureOverlay from './TextureOverlay'
import MinimalPatternOverlay from './MinimalPatternOverlay'

const SubtleBackgroundEnhancer = ({ 
  variant = 'default',
  intensity = 'light',
  enableTexture = true,
  enablePattern = true,
  className = ''
}) => {
  const intensityLevels = {
    minimal: { opacity: 0.015, textureIntensity: 0.01 },
    light: { opacity: 0.025, textureIntensity: 0.02 },
    medium: { opacity: 0.04, textureIntensity: 0.03 },
  }

  const variants = {
    default: {
      geometricPattern: 'dots',
      textureType: 'noise',
      minimalPattern: 'subtle-grid',
    },
    elegant: {
      geometricPattern: 'hexagon',
      textureType: 'paper',
      minimalPattern: 'diamond-grid',
    },
    modern: {
      geometricPattern: 'triangles',
      textureType: 'fabric',
      minimalPattern: 'cross-hatch',
    },
    minimal: {
      geometricPattern: 'grid',
      textureType: 'linen',
      minimalPattern: 'micro-dots',
    },
  }

  const config = variants[variant] || variants.default
  const levels = intensityLevels[intensity] || intensityLevels.light

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none z-0 ${className}`}>
      {enablePattern && (
        <>
          <SubtleGeometricPattern 
            variant={config.geometricPattern} 
            opacity={levels.opacity} 
          />
          <MinimalPatternOverlay 
            pattern={config.minimalPattern} 
            opacity={levels.opacity * 0.8} 
          />
        </>
      )}
      {enableTexture && (
        <TextureOverlay 
          type={config.textureType} 
          intensity={levels.textureIntensity} 
        />
      )}
      
      {/* Subtle gradient overlay for depth */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle at 20% 20%, rgba(59, 130, 246, ${levels.opacity * 0.5}) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(147, 51, 234, ${levels.opacity * 0.3}) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, rgba(249, 115, 22, ${levels.opacity * 0.2}) 0%, transparent 70%)
          `,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 3, ease: "easeOut" }}
      />
    </div>
  )
}

export default SubtleBackgroundEnhancer