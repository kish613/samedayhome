import React from 'react';

const AnimatedGoldPound = ({ size = 32, className = '' }) => {
  return (
    <div className={`inline-block cursor-pointer select-none ${className}`}>
      <div className="relative perspective-1000" style={{ width: size, height: size }}>
        <div className="w-full h-full transform-gpu transition-all duration-500 hover:scale-125 hover:rotate-y-12 hover:rotate-x-6 transform-style-preserve-3d group">
          {/* Main £ symbol with 3D effect */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              {/* Shadow layers for 3D depth */}
              <div className="absolute top-0.5 left-0.5 font-bold text-yellow-900 opacity-30 transform translate-z-[-10px]" style={{ fontSize: size * 0.75 }}>
                £
              </div>
              <div className="absolute top-0.25 left-0.25 font-bold text-yellow-800 opacity-50 transform translate-z-[-5px]" style={{ fontSize: size * 0.75 }}>
                £
              </div>
              
              {/* Main gold £ symbol */}
              <div className="relative font-bold bg-gradient-to-br from-yellow-200 via-yellow-400 to-yellow-600 bg-clip-text text-transparent filter drop-shadow-lg" style={{ fontSize: size * 0.75 }}>
                £
              </div>
              
              {/* Shine overlay */}
              <div className="absolute inset-0 font-bold bg-gradient-to-r from-transparent via-white to-transparent bg-clip-text text-transparent opacity-0 group-hover:opacity-40 transition-all duration-700 transform -skew-x-12 animate-shine" style={{ fontSize: size * 0.75 }}>
                £
              </div>
              
              {/* Highlight edge */}
              <div className="absolute -top-px -left-px font-bold text-yellow-100 opacity-60 transform translate-z-[2px]" style={{ fontSize: size * 0.75 }}>
                £
              </div>
            </div>
          </div>
          
          {/* Floating sparkles */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-700">
            <div className="absolute w-0.5 h-0.5 bg-yellow-300 rounded-full animate-pulse" style={{ top: size * 0.1, left: size * 0.3 }}></div>
            <div className="absolute w-1 h-1 bg-yellow-200 rounded-full animate-pulse delay-150" style={{ top: size * 0.25, right: size * 0.15 }}></div>
            <div className="absolute w-0.5 h-0.5 bg-yellow-400 rounded-full animate-pulse delay-300" style={{ bottom: size * 0.2, left: size * 0.15 }}></div>
            <div className="absolute w-1 h-1 bg-yellow-300 rounded-full animate-pulse delay-450" style={{ bottom: size * 0.15, right: size * 0.3 }}></div>
            <div className="absolute w-0.25 h-0.25 bg-white rounded-full animate-pulse delay-600" style={{ top: size * 0.4, left: size * 0.45 }}></div>
            <div className="absolute w-0.25 h-0.25 bg-white rounded-full animate-pulse delay-750" style={{ top: size * 0.15, right: size * 0.45 }}></div>
          </div>
          
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-radial from-yellow-400/20 via-yellow-500/10 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 scale-150"></div>
        </div>
      </div>
      
      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-preserve-3d {
          transform-style: preserve-3d;
        }
        .rotate-y-12 {
          transform: rotateY(12deg) rotateX(6deg) scale(1.25);
        }
        .translate-z-[-10px] {
          transform: translateZ(-10px);
        }
        .translate-z-[-5px] {
          transform: translateZ(-5px);
        }
        .translate-z-[2px] {
          transform: translateZ(2px);
        }
        .animate-shine {
          animation: shine 2s ease-in-out infinite;
        }
        @keyframes shine {
          0% { transform: translateX(-100%) skewX(-12deg); }
          50% { transform: translateX(100%) skewX(-12deg); }
          100% { transform: translateX(-100%) skewX(-12deg); }
        }
        .bg-gradient-radial {
          background: radial-gradient(circle, var(--tw-gradient-stops));
        }
      `}</style>
    </div>
  );
};

export default AnimatedGoldPound;