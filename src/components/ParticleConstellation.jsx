import React, { useEffect, useRef } from 'react'

const ParticleConstellation = () => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    const particles = []
    const particleCount = 80 // More particles

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Create particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        radius: Math.random() * 3 + 1.5, // Larger particles
        opacity: Math.random() * 0.6 + 0.3, // Higher opacity
        color: Math.random() < 0.3 ? 'blue' : Math.random() < 0.6 ? 'orange' : 'purple',
      })
    }

    const getParticleColor = (color, opacity) => {
      switch (color) {
        case 'blue':
          return `rgba(59, 130, 246, ${opacity})`
        case 'orange':
          return `rgba(249, 115, 22, ${opacity})`
        case 'purple':
          return `rgba(147, 51, 234, ${opacity})`
        default:
          return `rgba(59, 130, 246, ${opacity})`
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw particles
      particles.forEach((particle, i) => {
        particle.x += particle.vx
        particle.y += particle.vy

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width
        if (particle.x > canvas.width) particle.x = 0
        if (particle.y < 0) particle.y = canvas.height
        if (particle.y > canvas.height) particle.y = 0

        // Draw particle with glow effect
        ctx.shadowBlur = 10
        ctx.shadowColor = getParticleColor(particle.color, 0.8)
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
        ctx.fillStyle = getParticleColor(particle.color, particle.opacity)
        ctx.fill()
        ctx.shadowBlur = 0

        // Draw connections
        particles.forEach((otherParticle, j) => {
          if (i !== j) {
            const distance = Math.sqrt(
              Math.pow(particle.x - otherParticle.x, 2) +
              Math.pow(particle.y - otherParticle.y, 2)
            )

            if (distance < 120) { // Longer connections
              const connectionOpacity = 0.4 * (1 - distance / 120)
              ctx.beginPath()
              ctx.moveTo(particle.x, particle.y)
              ctx.lineTo(otherParticle.x, otherParticle.y)
              ctx.strokeStyle = `rgba(59, 130, 246, ${connectionOpacity})`
              ctx.lineWidth = 1.5
              ctx.stroke()
            }
          }
        })
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full opacity-80 z-0"
      style={{ pointerEvents: 'none' }}
    />
  )
}

export default ParticleConstellation