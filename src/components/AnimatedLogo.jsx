import React from 'react'

const AnimatedLogo = ({ className = "h-12 w-auto cursor-pointer" }) => {
  const logoStyle = {
    transition: 'transform 0.3s ease-in-out',
    cursor: 'pointer'
  }

  const svgStyle = {
    width: '100%',
    height: 'auto',
    transition: 'transform 0.3s ease-in-out'
  }

  const clockHandStyle = {
    transition: 'transform 1s cubic-bezier(0.68, -0.55, 0.27, 1.55)',
    transformOrigin: 'center'
  }

  const handleMouseEnter = (e) => {
    const container = e.currentTarget
    const svg = container.querySelector('.sameday-logo')
    const hourHand = container.querySelector('.hour-hand')
    const minuteHand = container.querySelector('.minute-hand')
    const logoGlow = container.querySelector('.logo-glow')
    const textGlow = container.querySelector('.text-glow')

    if (svg) svg.style.transform = 'scale(1.05)'
    if (hourHand) hourHand.style.transform = 'rotate(360deg)'
    if (minuteHand) minuteHand.style.transform = 'rotate(720deg)'
    if (logoGlow) logoGlow.style.filter = 'drop-shadow(0 0 12px #3b82f6) drop-shadow(0 0 8px #f97316)'
    if (textGlow) {
      textGlow.style.fill = '#3b82f6'
      textGlow.style.filter = 'drop-shadow(0 0 5px #3b82f6)'
    }
  }

  const handleMouseLeave = (e) => {
    const container = e.currentTarget
    const svg = container.querySelector('.sameday-logo')
    const hourHand = container.querySelector('.hour-hand')
    const minuteHand = container.querySelector('.minute-hand')
    const logoGlow = container.querySelector('.logo-glow')
    const textGlow = container.querySelector('.text-glow')

    if (svg) svg.style.transform = 'scale(1)'
    if (hourHand) hourHand.style.transform = 'rotate(0deg)'
    if (minuteHand) minuteHand.style.transform = 'rotate(0deg)'
    if (logoGlow) logoGlow.style.filter = 'none'
    if (textGlow) {
      textGlow.style.fill = '#3B82F6'
      textGlow.style.filter = 'none'
    }
  }

  return (
    <div 
      className={className}
      style={logoStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >

      <svg className="sameday-logo" viewBox="0 0 300 150" xmlns="http://www.w3.org/2000/svg" style={svgStyle}>
        <defs>
          <linearGradient id="shimmer-gradient" x1="-200%" y1="0" x2="200%" y2="0">
            <stop offset="0%" stopColor="#F97316" />
            <stop offset="45%" stopColor="#F97316" />
            <stop offset="50%" stopColor="#3B82F6" />
            <stop offset="55%" stopColor="#F97316" />
            <stop offset="100%" stopColor="#F97316" />
            <animate attributeName="x1" from="-200%" to="200%" dur="2s" repeatCount="indefinite" />
            <animate attributeName="x2" from="0%" to="400%" dur="2s" repeatCount="indefinite" />
          </linearGradient>
        </defs>

        <g className="logo-glow" style={{ transition: 'filter 0.4s ease-in-out' }}>
          <path d="M65 55 L20 95 L20 135 L110 135 L110 95 L65 55 Z M65 45 L120 95 L120 145 L10 145 L10 95 Z" fill="#3B82F6"/>
          <path d="M95 60 L105 60 L105 80 L95 80 Z" fill="#3B82F6"/>

          <circle cx="65" cy="100" r="35" fill="none" stroke="#F97316" strokeWidth="8" strokeDasharray="110 110" strokeDashoffset="55"/>
          <circle cx="65" cy="100" r="35" fill="none" stroke="#3B82F6" strokeWidth="8" strokeDasharray="110 110" strokeDashoffset="-55"/>
          
          <g className="clock-hand minute-hand" style={clockHandStyle}>
             <line x1="65" y1="100" x2="65" y2="75" stroke="#111827" strokeWidth="3" strokeLinecap="round"/>
          </g>
          <g className="clock-hand hour-hand" style={clockHandStyle}>
             <line x1="65" y1="100" x2="85" y2="100" stroke="#111827" strokeWidth="3" strokeLinecap="round"/>
          </g>
        </g>

        <text x="130" y="90" fontSize="32" fontWeight="700" fill="url(#shimmer-gradient)">SAME DAY</text>
        <text x="130" y="125" fontSize="24" fontWeight="600" fill="#3B82F6" className="text-glow" style={{ transition: 'fill 0.4s ease-in-out' }}>Home Buyer</text>
      </svg>
    </div>
  )
}

export default AnimatedLogo 