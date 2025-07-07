import React from 'react';

const AnimatedLogo = ({ onLogoClick }) => {
  const handleLogoClick = () => {
    // You can pass a custom function via props, or default to window navigation
    if (onLogoClick) {
      onLogoClick();
    } else {
      window.location.href = '/';
    }
  };

  const styles = {
    sameDayLogoContainer: {
      height: '112px',
      width: 'auto',
      cursor: 'pointer',
      padding: '16px 20px',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      fontFamily: 'Poppins, sans-serif',
      animation: 'float 4s ease-in-out infinite'
    },
    sameDayLogoSvg: {
      height: '100px',
      width: 'auto',
      transition: 'transform 0.3s ease-in-out'
    }
  };

  return (
    <>
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-2px); }
        }
        
        .sameday-logo-container:hover {
          transform: translateY(-2px);
          animation-play-state: paused;
        }
        
        .sameday-logo-container:hover .sameday-logo-svg {
          transform: scale(1.05);
        }
        
        .sameday-logo-container:hover .hour-hand {
          transform: rotate(360deg);
        }
        
        .sameday-logo-container:hover .minute-hand {
          transform: rotate(720deg);
        }
        
        .sameday-logo-container:hover .logo-glow {
          filter: drop-shadow(0 0 15px #3b82f6) drop-shadow(0 0 10px #f97316);
        }
        
        .sameday-logo-container:hover .text-glow {
          fill: #1E40AF;
          filter: drop-shadow(0 0 8px #3b82f6);
        }
        
        .clock-hand {
          transition: transform 1s cubic-bezier(0.68, -0.55, 0.27, 1.55);
          transform-origin: center;
        }
        
        .logo-glow {
          transition: filter 0.4s ease-in-out;
        }
        
        .text-glow {
          transition: fill 0.4s ease-in-out;
        }
        
        .shimmer-text {
          fill: url(#shimmer-gradient);
        }
        
        .minute-hand {
          animation: tick 1s ease-in-out infinite alternate;
        }
        
        @keyframes tick {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(6deg); }
        }
        
        .particle {
          fill: #3B82F6;
          opacity: 0;
          animation: particle-trail 1s ease-out forwards;
        }
        
        .particle-orange {
          fill: #F97316;
          opacity: 0;
          animation: particle-trail 1s ease-out forwards;
        }
        
        @keyframes particle-trail {
          0% {
            opacity: 1;
            transform: scale(1);
          }
          100% {
            opacity: 0;
            transform: scale(0.2) translate(20px, -10px);
          }
        }
        
        .clock-face {
          transition: all 0.8s cubic-bezier(0.68, -0.55, 0.27, 1.55);
        }
        
        .speedometer {
          opacity: 0;
          transition: opacity 0.4s ease;
        }
        
        .house-details {
          transition: opacity 0.4s ease;
        }
        
        .sameday-logo-container:hover .clock-face {
          opacity: 0.3;
        }
        
        .sameday-logo-container:hover .speedometer {
          opacity: 1;
        }
        
        .sameday-logo-container:hover .house-details {
          opacity: 0;
        }
        
        .progress-fill {
          stroke-dasharray: 220;
          stroke-dashoffset: 220;
          transition: stroke-dashoffset 0.8s ease-out;
        }
        
        .sameday-logo-container:hover .progress-fill {
          stroke-dashoffset: 0;
        }
        
        .wave-text {
          animation-fill-mode: both;
        }
        
        .sameday-logo-container:hover .wave-text {
          animation: wave-bounce 0.8s ease-out;
        }
        
        @keyframes wave-bounce {
          0%, 100% {
            transform: translateY(0) scale(1);
          }
          50% {
            transform: translateY(-3px) scale(1.05);
          }
        }
        
        .sameday-logo-container:hover .letter-1 { animation-delay: 0s; }
        .sameday-logo-container:hover .letter-2 { animation-delay: 0.1s; }
        .sameday-logo-container:hover .letter-3 { animation-delay: 0.2s; }
        .sameday-logo-container:hover .letter-4 { animation-delay: 0.3s; }
        .sameday-logo-container:hover .letter-5 { animation-delay: 0.4s; }
        .sameday-logo-container:hover .letter-6 { animation-delay: 0.5s; }
        .sameday-logo-container:hover .letter-7 { animation-delay: 0.6s; }
        .sameday-logo-container:hover .letter-8 { animation-delay: 0.7s; }
        .sameday-logo-container:hover .letter-9 { animation-delay: 0.8s; }
        .sameday-logo-container:hover .letter-10 { animation-delay: 0.9s; }
        
        .main-text {
          font-weight: 800;
          letter-spacing: 2px;
        }
        
        .sub-text {
          font-weight: 600;
          letter-spacing: 1px;
        }
      `}</style>
      
      <div className="sameday-logo-container" style={styles.sameDayLogoContainer} onClick={handleLogoClick}>
        <svg className="sameday-logo-svg" style={styles.sameDayLogoSvg} viewBox="0 0 480 150" xmlns="http://www.w3.org/2000/svg">
          {/* Enhanced gradient definitions */}
          <defs>
            <linearGradient id="shimmer-gradient" x1="-200%" y1="0" x2="200%" y2="0">
              <stop offset="0%" stopColor="#F97316" />
              <stop offset="45%" stopColor="#F97316" />
              <stop offset="50%" stopColor="#ffffff" />
              <stop offset="55%" stopColor="#F97316" />
              <stop offset="100%" stopColor="#F97316" />
              <animate attributeName="x1" from="-200%" to="200%" dur="2s" repeatCount="indefinite" />
              <animate attributeName="x2" from="0%" to="400%" dur="2s" repeatCount="indefinite" />
            </linearGradient>
            
            {/* Gradient for house */}
            <linearGradient id="house-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#1E40AF" />
            </linearGradient>

            {/* Gradient for clock */}
            <linearGradient id="clock-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F97316" />
              <stop offset="100%" stopColor="#EA580C" />
            </linearGradient>
          </defs>

          {/* Logo Group: House and Clock */}
          <g className="logo-glow">
            {/* House with enhanced styling */}
            <path d="M65 55 L20 95 L20 135 L110 135 L110 95 L65 55 Z M65 45 L120 95 L120 145 L10 145 L10 95 Z" fill="url(#house-gradient)" stroke="#1E40AF" strokeWidth="2"/>
            
            {/* Window */}
            <rect x="85" y="110" width="15" height="15" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="1" className="house-details"/>
            
            {/* Door */}
            <rect x="50" y="115" width="12" height="20" fill="#92400E" stroke="#451A03" strokeWidth="1" className="house-details"/>
            <circle cx="59" cy="125" r="1" fill="#FCD34D" className="house-details"/>

            {/* Clock Face - will fade on hover */}
            <circle cx="65" cy="100" r="35" fill="rgba(255, 255, 255, 0.9)" stroke="url(#clock-gradient)" strokeWidth="6" className="clock-face"/>
            
            {/* Speedometer overlay - appears on hover */}
            <g className="speedometer">
              <path d="M 30 100 A 35 35 0 0 1 100 100" fill="none" stroke="#10B981" strokeWidth="8" strokeLinecap="round"/>
              <path d="M 30 100 A 35 35 0 0 1 100 100" fill="none" stroke="#059669" strokeWidth="6" strokeLinecap="round" className="progress-fill"/>
              <text x="65" y="120" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#059669">FAST</text>
            </g>
            
            {/* Clock numbers */}
            <text x="65" y="70" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#374151">12</text>
            <text x="95" y="105" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#374151">3</text>
            <text x="65" y="135" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#374151">6</text>
            <text x="35" y="105" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#374151">9</text>
            
            {/* Clock center */}
            <circle cx="65" cy="100" r="3" fill="#374151"/>
            
            {/* Clock Hands with particle trails */}
            <g className="clock-hand minute-hand">
               <line x1="65" y1="100" x2="65" y2="75" stroke="#374151" strokeWidth="2" strokeLinecap="round"/>
               {/* Minute hand particles */}
               <circle cx="65" cy="80" r="1.5" className="particle">
                 <animate attributeName="opacity" values="0;1;0" dur="1s" repeatCount="indefinite" begin="0s"/>
               </circle>
               <circle cx="67" cy="82" r="1" className="particle">
                 <animate attributeName="opacity" values="0;1;0" dur="1s" repeatCount="indefinite" begin="0.2s"/>
               </circle>
            </g>
            <g className="clock-hand hour-hand">
               <line x1="65" y1="100" x2="85" y2="100" stroke="#374151" strokeWidth="3" strokeLinecap="round"/>
               {/* Hour hand particles */}
               <circle cx="75" cy="100" r="1.5" className="particle-orange">
                 <animate attributeName="opacity" values="0;1;0" dur="1s" repeatCount="indefinite" begin="0s"/>
               </circle>
               <circle cx="78" cy="98" r="1" className="particle-orange">
                 <animate attributeName="opacity" values="0;1;0" dur="1s" repeatCount="indefinite" begin="0.3s"/>
               </circle>
            </g>
          </g>

          {/* Text Elements with wave animation - each letter gets individual animation */}
          <g>
            <text x="140" y="85" fontSize="48" className="main-text shimmer-text">
              <tspan className="wave-text letter-1">S</tspan>
              <tspan className="wave-text letter-2">A</tspan>
              <tspan className="wave-text letter-3">M</tspan>
              <tspan className="wave-text letter-4">E</tspan>
              <tspan className="wave-text letter-5"> </tspan>
              <tspan className="wave-text letter-6">D</tspan>
              <tspan className="wave-text letter-7">A</tspan>
              <tspan className="wave-text letter-8">Y</tspan>
            </text>
          </g>
          <g>
            <text x="140" y="115" fontSize="34" className="sub-text text-glow" fill="#3B82F6">
              <tspan className="wave-text letter-1">H</tspan>
              <tspan className="wave-text letter-2">o</tspan>
              <tspan className="wave-text letter-3">m</tspan>
              <tspan className="wave-text letter-4">e</tspan>
              <tspan className="wave-text letter-5"> </tspan>
              <tspan className="wave-text letter-6">B</tspan>
              <tspan className="wave-text letter-7">u</tspan>
              <tspan className="wave-text letter-8">y</tspan>
              <tspan className="wave-text letter-9">e</tspan>
              <tspan className="wave-text letter-10">r</tspan>
            </text>
          </g>
          
          {/* Decorative elements */}
          <circle cx="320" cy="30" r="3" fill="#F97316" opacity="0.7">
            <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" repeatCount="indefinite"/>
          </circle>
          <circle cx="330" cy="45" r="2" fill="#3B82F6" opacity="0.5">
            <animate attributeName="opacity" values="0.5;1;0.5" dur="2.5s" repeatCount="indefinite"/>
          </circle>
        </svg>
      </div>
    </>
  );
};

export default AnimatedLogo;
