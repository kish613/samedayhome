import React, { useEffect, useRef } from 'react'

function DataVisualizationBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    
    // Set canvas size
    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = 400
    }
    resize()
    window.addEventListener('resize', resize)

    // Data points for visualization
    const dataPoints = []
    const numPoints = 50
    
    // Initialize data points
    for (let i = 0; i < numPoints; i++) {
      dataPoints.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.3 + 0.1,
        pulsePhase: Math.random() * Math.PI * 2
      })
    }

    // Connection lines between nearby points
    const drawConnections = () => {
      dataPoints.forEach((point1, i) => {
        dataPoints.forEach((point2, j) => {
          if (i !== j) {
            const distance = Math.sqrt(
              Math.pow(point1.x - point2.x, 2) + 
              Math.pow(point1.y - point2.y, 2)
            )
            
            if (distance < 150) {
              const opacity = (1 - distance / 150) * 0.2
              ctx.beginPath()
              ctx.moveTo(point1.x, point1.y)
              ctx.lineTo(point2.x, point2.y)
              ctx.strokeStyle = `rgba(59, 130, 246, ${opacity})`
              ctx.lineWidth = 1
              ctx.stroke()
            }
          }
        })
      })
    }

    // Heatmap effect
    const drawHeatmap = (time) => {
      // Create gradient areas
      const gradient1 = ctx.createRadialGradient(
        canvas.width * 0.3, canvas.height * 0.3, 0,
        canvas.width * 0.3, canvas.height * 0.3, 200
      )
      gradient1.addColorStop(0, 'rgba(59, 130, 246, 0.1)')
      gradient1.addColorStop(1, 'rgba(59, 130, 246, 0)')
      
      const gradient2 = ctx.createRadialGradient(
        canvas.width * 0.7, canvas.height * 0.6, 0,
        canvas.width * 0.7, canvas.height * 0.6, 250
      )
      gradient2.addColorStop(0, 'rgba(139, 92, 246, 0.08)')
      gradient2.addColorStop(1, 'rgba(139, 92, 246, 0)')
      
      const gradient3 = ctx.createRadialGradient(
        canvas.width * 0.5, canvas.height * 0.8, 0,
        canvas.width * 0.5, canvas.height * 0.8, 180
      )
      gradient3.addColorStop(0, 'rgba(34, 197, 94, 0.06)')
      gradient3.addColorStop(1, 'rgba(34, 197, 94, 0)')
      
      // Animate gradients
      ctx.save()
      ctx.globalAlpha = Math.sin(time * 0.0005) * 0.2 + 0.8
      ctx.fillStyle = gradient1
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.restore()
      
      ctx.save()
      ctx.globalAlpha = Math.sin(time * 0.0007 + 1) * 0.2 + 0.8
      ctx.fillStyle = gradient2
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.restore()
      
      ctx.save()
      ctx.globalAlpha = Math.sin(time * 0.0003 + 2) * 0.2 + 0.8
      ctx.fillStyle = gradient3
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.restore()
    }

    // Animation loop
    let animationId
    const animate = (time) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Draw heatmap
      drawHeatmap(time)
      
      // Draw connections
      drawConnections()
      
      // Update and draw data points
      dataPoints.forEach(point => {
        // Update position
        point.x += point.vx
        point.y += point.vy
        
        // Bounce off edges
        if (point.x < 0 || point.x > canvas.width) point.vx *= -1
        if (point.y < 0 || point.y > canvas.height) point.vy *= -1
        
        // Keep within bounds
        point.x = Math.max(0, Math.min(canvas.width, point.x))
        point.y = Math.max(0, Math.min(canvas.height, point.y))
        
        // Draw point with pulsing effect
        const pulse = Math.sin(time * 0.003 + point.pulsePhase) * 0.5 + 0.5
        const size = point.size + pulse * 2
        const opacity = point.opacity + pulse * 0.1
        
        ctx.beginPath()
        ctx.arc(point.x, point.y, size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(59, 130, 246, ${opacity})`
        ctx.fill()
        
        // Add glow effect
        const glowGradient = ctx.createRadialGradient(
          point.x, point.y, 0,
          point.x, point.y, size * 3
        )
        glowGradient.addColorStop(0, `rgba(59, 130, 246, ${opacity * 0.5})`)
        glowGradient.addColorStop(1, 'rgba(59, 130, 246, 0)')
        ctx.fillStyle = glowGradient
        ctx.fill()
      })
      
      animationId = requestAnimationFrame(animate)
    }
    
    animate(0)

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full opacity-40"
      style={{ filter: 'blur(1px)' }}
    />
  )
}

export default DataVisualizationBackground