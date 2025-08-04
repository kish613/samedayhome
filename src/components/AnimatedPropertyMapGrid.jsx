import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

const AnimatedPropertyMapGrid = () => {
  const canvasRef = useRef(null)
  
  // Major UK cities with normalized coordinates (0-1 range)
  const ukCities = [
    { name: 'London', x: 0.55, y: 0.85, recentSales: 12 },
    { name: 'Birmingham', x: 0.45, y: 0.65, recentSales: 8 },
    { name: 'Manchester', x: 0.45, y: 0.55, recentSales: 10 },
    { name: 'Liverpool', x: 0.4, y: 0.55, recentSales: 7 },
    { name: 'Leeds', x: 0.48, y: 0.52, recentSales: 6 },
    { name: 'Sheffield', x: 0.48, y: 0.58, recentSales: 5 },
    { name: 'Bristol', x: 0.42, y: 0.82, recentSales: 9 },
    { name: 'Newcastle', x: 0.48, y: 0.35, recentSales: 5 },
    { name: 'Glasgow', x: 0.35, y: 0.25, recentSales: 8 },
    { name: 'Edinburgh', x: 0.4, y: 0.27, recentSales: 7 },
    { name: 'Cardiff', x: 0.38, y: 0.83, recentSales: 6 },
    { name: 'Nottingham', x: 0.5, y: 0.62, recentSales: 4 },
    { name: 'Leicester', x: 0.5, y: 0.65, recentSales: 5 },
    { name: 'Southampton', x: 0.5, y: 0.88, recentSales: 6 },
    { name: 'Norwich', x: 0.62, y: 0.65, recentSales: 3 },
    { name: 'Aberdeen', x: 0.45, y: 0.15, recentSales: 4 },
    { name: 'Belfast', x: 0.25, y: 0.4, recentSales: 5 },
    { name: 'Plymouth', x: 0.35, y: 0.9, recentSales: 4 },
    { name: 'York', x: 0.5, y: 0.5, recentSales: 3 },
    { name: 'Oxford', x: 0.5, y: 0.77, recentSales: 5 }
  ]

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    const updateCanvasSize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio
      canvas.height = canvas.offsetHeight * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }
    
    updateCanvasSize()
    window.addEventListener('resize', updateCanvasSize)
    
    // Animation variables
    const pulsingDots = ukCities.map((city, index) => ({
      ...city,
      pulsePhase: Math.random() * Math.PI * 2,
      pulseSpeed: 0.02 + Math.random() * 0.01,
      baseRadius: 3 + city.recentSales * 0.5,
      connectionPhase: index * 0.5
    }))
    
    // Draw UK outline (simplified)
    const drawUKOutline = () => {
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.2)' // blue-500 with low opacity
      ctx.lineWidth = 2
      ctx.setLineDash([5, 5])
      
      const width = canvas.offsetWidth
      const height = canvas.offsetHeight
      
      // Simplified UK shape
      ctx.beginPath()
      ctx.moveTo(width * 0.5, height * 0.1) // Scotland top
      ctx.lineTo(width * 0.35, height * 0.25) // West Scotland
      ctx.lineTo(width * 0.3, height * 0.35) // Northern Ireland area
      ctx.lineTo(width * 0.35, height * 0.45) // Irish Sea
      ctx.lineTo(width * 0.3, height * 0.55) // Wales west
      ctx.lineTo(width * 0.35, height * 0.75) // Southwest England
      ctx.lineTo(width * 0.4, height * 0.9) // Cornwall
      ctx.lineTo(width * 0.5, height * 0.95) // South coast
      ctx.lineTo(width * 0.6, height * 0.9) // Southeast
      ctx.lineTo(width * 0.65, height * 0.85) // East Anglia
      ctx.lineTo(width * 0.65, height * 0.7) // East coast
      ctx.lineTo(width * 0.6, height * 0.5) // Northeast
      ctx.lineTo(width * 0.55, height * 0.3) // Scotland east
      ctx.lineTo(width * 0.5, height * 0.1) // Back to top
      ctx.closePath()
      ctx.stroke()
      ctx.setLineDash([])
    }
    
    // Draw connections between cities
    const drawConnections = (timestamp) => {
      ctx.strokeStyle = 'rgba(251, 146, 60, 0.1)' // orange-400 with low opacity
      ctx.lineWidth = 1
      
      const width = canvas.offsetWidth
      const height = canvas.offsetHeight
      
      // Draw connections between nearby cities
      pulsingDots.forEach((city1, i) => {
        pulsingDots.forEach((city2, j) => {
          if (i >= j) return
          
          const distance = Math.sqrt(
            Math.pow((city1.x - city2.x) * width, 2) + 
            Math.pow((city1.y - city2.y) * height, 2)
          )
          
          if (distance < 150) {
            const opacity = Math.sin(timestamp * 0.001 + city1.connectionPhase) * 0.1 + 0.1
            ctx.strokeStyle = `rgba(251, 146, 60, ${opacity})`
            ctx.beginPath()
            ctx.moveTo(city1.x * width, city1.y * height)
            ctx.lineTo(city2.x * width, city2.y * height)
            ctx.stroke()
          }
        })
      })
    }
    
    // Animation loop
    let animationId
    const animate = (timestamp) => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight)
      
      // Draw UK outline
      drawUKOutline()
      
      // Draw connections
      drawConnections(timestamp)
      
      // Draw cities
      const width = canvas.offsetWidth
      const height = canvas.offsetHeight
      
      pulsingDots.forEach(dot => {
        const x = dot.x * width
        const y = dot.y * height
        
        // Update pulse
        dot.pulsePhase += dot.pulseSpeed
        const pulseScale = 1 + Math.sin(dot.pulsePhase) * 0.3
        
        // Outer pulsing ring
        ctx.beginPath()
        ctx.arc(x, y, dot.baseRadius * pulseScale * 2, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(251, 146, 60, 0.1)' // orange-400
        ctx.fill()
        
        // Middle ring
        ctx.beginPath()
        ctx.arc(x, y, dot.baseRadius * pulseScale * 1.5, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(251, 146, 60, 0.2)'
        ctx.fill()
        
        // Inner dot
        ctx.beginPath()
        ctx.arc(x, y, dot.baseRadius, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(251, 146, 60, 0.8)'
        ctx.fill()
        
        // City name on hover effect (always show for larger cities)
        if (dot.recentSales > 7) {
          ctx.font = '10px Inter, sans-serif'
          ctx.fillStyle = 'rgba(59, 130, 246, 0.7)'
          ctx.textAlign = 'center'
          ctx.fillText(dot.name, x, y - dot.baseRadius * 2 - 5)
          ctx.fillText(`${dot.recentSales} recent sales`, x, y - dot.baseRadius * 2 + 5)
        }
      })
      
      animationId = requestAnimationFrame(animate)
    }
    
    animate(0)
    
    return () => {
      window.removeEventListener('resize', updateCanvasSize)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-blue-50/30 to-orange-50/20" />
      
      {/* Canvas for animated map */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ mixBlendMode: 'multiply' }}
      />
      
      {/* Overlay gradient for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-50/50 via-transparent to-transparent pointer-events-none" />
      
      {/* Animated text overlay */}
      <motion.div
        className="absolute top-10 right-10 text-right"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <div className="bg-white/80 backdrop-blur-sm rounded-lg px-4 py-2 shadow-lg">
          <p className="text-sm font-semibold text-blue-900">Live Activity Map</p>
          <p className="text-xs text-gray-600">Recent property purchases across the UK</p>
        </div>
      </motion.div>
    </div>
  )
}

export default AnimatedPropertyMapGrid