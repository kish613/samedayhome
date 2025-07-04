import React from 'react';

const SameDayLogo = ({ className = "h-12 w-auto cursor-pointer", onLogoClick }) => {
  const handleLogoClick = () => {
    // You can pass a custom function via props, or default to window navigation
    if (onLogoClick) {
      onLogoClick();
    } else {
      window.location.href = '/';
    }
  };

  return (
    <>
      <style jsx>{`
        /* Same Day Home Buyer Logo Styles */
        .sameday-logo-container {
          height: 48px;
          width: auto;
          cursor: pointer;
          padding: 6px 12px;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border-radius: 8px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          font-family: 'Poppins', sans-serif;
        }

        .sameday-logo-container:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        .sameday-logo-svg {
          height: 36px;
          width: auto;
          transition: transform 0.3s ease-in-out;
        }

        /* Clock hand animations */
        .sameday-logo-svg .clock-hand {
          transition: transform 1s cubic-bezier(0.68, -0.55, 0.27, 1.55);
          transform-origin: center;
        }

        .sameday-logo-svg .logo-glow {
          transition: filter 0.4s ease-in-out;
        }
        
        .sameday-logo-svg .text-glow {
          transition: fill 0.4s ease-in-out;
        }

        /* Hover effects */
        .sameday-logo-container:hover .sameday-logo-svg {
          transform: scale(1.05);
        }

        .sameday-logo-container:hover .sameday-logo-svg .hour-hand {
          transform: rotate(360deg);
        }

        .sameday-logo-container:hover .sameday-logo-svg .minute-hand {
          transform: rotate(720deg);
        }
        
        .sameday-logo-container:hover .sameday-logo-svg .logo-glow {
          filter: drop-shadow(0 0 8px #3b82f6) drop-shadow(0 0 6px #f97316);
        }

        .sameday-logo-container:hover .sameday-logo-svg .text-glow {
          fill: #ffffff;
          filter: drop-shadow(0 0 4px #3b82f6);
        }

        /* Shimmer text effect */
        .shimmer-text {
          fill: url(#shimmer-gradient);
        }

        /* Pulse animation for continuous engagement - reduced for header */
        @keyframes pulse-glow {
          0%, 100% {
            filter: drop-shadow(0 0 2px rgba(59, 130, 246, 0.2));
          }
          50% {
            filter: drop-shadow(0 0 6px rgba(59, 130, 246, 0.4));
          }
        }

        /* Floating animation - reduced for header */
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-1px);
          }
        }

        .sameday-logo-container {
          animation: float 4s ease-in-out infinite, pulse-glow 3s ease-in-out infinite;
        }

        .sameday-logo-container:hover {
          animation-play-state: paused;
        }

        /* Enhanced clock tick animation */
        @keyframes tick {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(6deg); }
        }

        .minute-hand {
          animation: tick 1s ease-in-out infinite alternate;
        }

        /* Text styling */
        .main-text {
          font-weight: 800;
          letter-spacing: 1px;
        }

        .sub-text {
          font-weight: 600;
          letter-spacing: 0.5px;
        }
      `}</style>
      
      <div className={`sameday-logo-container ${className}`} onClick={handleLogoClick}>
        <svg className="sameday-logo-svg" viewBox="0 0 280 120" xmlns="http://www.w3.org/2000/svg">
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

          {/* Logo Group: House and Clock - scaled down for header */}
          <g className="logo-glow">
            {/* House with enhanced styling */}
            <path d="M45 40 L15 65 L15 95 L75 95 L75 65 L45 40 Z M45 35 L85 65 L85 105 L5 105 L5 65 Z" fill="url(#house-gradient)" stroke="#1E40AF" strokeWidth="1.5"/>
            
            {/* Window */}
            <rect x="60" y="80" width="10" height="10" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="0.8"/>
            
            {/* Door */}
            <rect x="35" y="85" width="8" height="15" fill="#92400E" stroke="#451A03" strokeWidth="0.8"/>
            <circle cx="41" cy="92" r="0.8" fill="#FCD34D"/>

            {/* Clock Face */}
            <circle cx="45" cy="70" r="25" fill="rgba(255, 255, 255, 0.9)" stroke="url(#clock-gradient)" strokeWidth="4"/>
            
            {/* Clock numbers */}
            <text x="45" y="50" textAnchor="middle" fontSize="7" fontWeight="bold" fill="#374151">12</text>
            <text x="65" y="75" textAnchor="middle" fontSize="7" fontWeight="bold" fill="#374151">3</text>
            <text x="45" y="95" textAnchor="middle" fontSize="7" fontWeight="bold" fill="#374151">6</text>
            <text x="25" y="75" textAnchor="middle" fontSize="7" fontWeight="bold" fill="#374151">9</text>
            
            {/* Clock center */}
            <circle cx="45" cy="70" r="2" fill="#374151"/>
            
            {/* Clock Hands */}
            <g className="clock-hand minute-hand">
               <line x1="45" y1="70" x2="45" y2="55" stroke="#374151" strokeWidth="1.5" strokeLinecap="round"/>
            </g>
            <g className="clock-hand hour-hand">
               <line x1="45" y1="70" x2="58" y2="70" stroke="#374151" strokeWidth="2" strokeLinecap="round"/>
            </g>
          </g>

          {/* Text Elements with header-appropriate sizing */}
          <text x="95" y="65" fontSize="16" className="main-text shimmer-text">SAME DAY</text>
          <text x="95" y="82" fontSize="11" className="sub-text text-glow" fill="#374151">Home Buyer</text>
          
          {/* Decorative elements - scaled down */}
          <circle cx="250" cy="25" r="2" fill="#F97316" opacity="0.7">
            <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" repeatCount="indefinite"/>
          </circle>
          <circle cx="260" cy="35" r="1.5" fill="#3B82F6" opacity="0.5">
            <animate attributeName="opacity" values="0.5;1;0.5" dur="2.5s" repeatCount="indefinite"/>
          </circle>
        </svg>
      </div>
    </>
  );
};

export default SameDayLogo; 