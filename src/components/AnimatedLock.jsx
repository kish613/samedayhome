import React, { useState } from 'react';

const AnimatedLock = ({ size = 32, className = '' }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={`inline-block cursor-pointer transition-transform duration-300 ${isHovered ? 'scale-125' : 'scale-100'} ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        className="drop-shadow-lg"
      >
        {/* Gradient definitions */}
        <defs>
          {/* Dark blue gradient for lock body */}
          <linearGradient id="lockBodyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e3a8a" />
            <stop offset="30%" stopColor="#3b82f6" />
            <stop offset="70%" stopColor="#1e40af" />
            <stop offset="100%" stopColor="#1e3a8a" />
          </linearGradient>
          
          {/* Orange gradient for shackle */}
          <linearGradient id="shackleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fb923c" />
            <stop offset="30%" stopColor="#f97316" />
            <stop offset="70%" stopColor="#ea580c" />
            <stop offset="100%" stopColor="#c2410c" />
          </linearGradient>
          
          {/* Green gradient for checkmark */}
          <linearGradient id="checkGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22c55e" />
            <stop offset="50%" stopColor="#16a34a" />
            <stop offset="100%" stopColor="#15803d" />
          </linearGradient>
          
          {/* Shadow filter */}
          <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="2" dy="4" stdDeviation="3" floodColor="#000000" floodOpacity="0.3"/>
          </filter>
          
          {/* Inner shadow for 3D effect */}
          <filter id="innerShadow">
            <feOffset dx="0" dy="2"/>
            <feGaussianBlur stdDeviation="1" result="offset-blur"/>
            <feFlood floodColor="#000000" floodOpacity="0.2"/>
            <feComposite in2="offset-blur" operator="in"/>
            <feComposite in2="SourceGraphic" operator="over"/>
          </filter>
        </defs>
        
        {/* Lock shackle (top curved part) */}
        <path
          d="M 35 25 Q 35 15 50 15 Q 65 15 65 25 L 65 40 L 60 40 L 60 25 Q 60 20 50 20 Q 40 20 40 25 L 40 40 L 35 40 Z"
          fill="url(#shackleGradient)"
          filter="url(#shadow)"
          className="transition-all duration-300"
        />
        
        {/* Lock body */}
        <rect
          x="25"
          y="35"
          width="50"
          height="40"
          rx="8"
          ry="8"
          fill="url(#lockBodyGradient)"
          filter="url(#innerShadow)"
          className="transition-all duration-300"
        />
        
        {/* Highlight on lock body for 3D effect */}
        <rect
          x="28"
          y="38"
          width="44"
          height="6"
          rx="3"
          fill="rgba(255, 255, 255, 0.3)"
          className="transition-opacity duration-300"
        />
        
        {/* Lock keyhole */}
        <circle
          cx="50"
          cy="52"
          r="4"
          fill="rgba(0, 0, 0, 0.4)"
        />
        <rect
          x="49"
          y="56"
          width="2"
          height="8"
          fill="rgba(0, 0, 0, 0.4)"
        />
        
        {/* Checkmark circle background */}
        <circle
          cx="70"
          cy="70"
          r="15"
          fill="url(#checkGradient)"
          filter="url(#shadow)"
          className="transition-all duration-300 hover:scale-110"
        />
        
        {/* Checkmark highlight */}
        <circle
          cx="67"
          cy="67"
          r="3"
          fill="rgba(255, 255, 255, 0.4)"
        />
        
        {/* Animated checkmark */}
        <path
          d="M 62 70 L 68 76 L 78 64"
          fill="none"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="20"
          strokeDashoffset={isHovered ? "0" : "20"}
          className="transition-all duration-500 ease-out"
          style={{
            filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.3))'
          }}
        />
      </svg>
    </div>
  );
};

export default AnimatedLock;