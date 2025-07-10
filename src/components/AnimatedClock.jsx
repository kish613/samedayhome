import React from 'react';

const AnimatedClock = ({ className = '' }) => {
  return (
    <div className={`relative group cursor-pointer clock-container ${className}`}>
      <style jsx>{`
        @keyframes spin-fast {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .minute-hand:hover {
          animation: spin-fast 1.5s linear infinite;
        }
        
        .hour-hand:hover {
          animation: spin-slow 3s linear infinite;
        }
        
        .clock-container:hover .minute-hand {
          animation: spin-fast 1.5s linear infinite;
        }
        
        .clock-container:hover .hour-hand {
          animation: spin-slow 3s linear infinite;
        }
      `}</style>
      
      {/* Clock container with 3D effect */}
      <div className="relative w-8 h-8 transform transition-all duration-300 ease-out group-hover:scale-110">
        {/* Multiple shadow layers for depth */}
        <div className="absolute inset-0 rounded-full bg-black opacity-30 blur-lg transform translate-x-1 translate-y-1"></div>
        <div className="absolute inset-0 rounded-full bg-black opacity-15 blur-md transform translate-x-0.5 translate-y-0.5"></div>
        
        {/* Clock face with blue metallic border */}
        <div className="relative w-8 h-8 rounded-full shadow-2xl border-2"
             style={{
               background: 'radial-gradient(circle at 30% 30%, #ffffff, #f8f9fa, #e9ecef, #dee2e6)',
               borderColor: '#3b82f6',
               boxShadow: '0 4px 12px rgba(0,0,0,0.3), inset 0 0.5px 0 rgba(255,255,255,0.8), inset 0 -0.5px 0 rgba(0,0,0,0.1)'
             }}>
          
          {/* Inner bezel with metallic shine */}
          <div className="absolute inset-0.5 rounded-full"
               style={{
                 background: 'conic-gradient(from 45deg, #f8f9fa, #ffffff, #f1f3f4, #ffffff, #f8f9fa)',
                 boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.1), inset 0 -1px 2px rgba(255,255,255,0.8)'
               }}></div>
          
          {/* Main clock face */}
          <div className="absolute inset-1 rounded-full"
               style={{
                 background: 'radial-gradient(circle at 25% 25%, #ffffff, #f8f9fa 40%, #e9ecef 70%, #dee2e6)',
                 boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.1)'
               }}></div>
          
          {/* Hour markers with 3D effect */}
          <div className="absolute inset-0 rounded-full">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full"
                style={{
                  width: '1px',
                  height: '3px',
                  background: 'linear-gradient(to bottom, #374151, #6b7280, #374151)',
                  top: '1px',
                  left: '50%',
                  transformOrigin: '50% 14px',
                  transform: `translateX(-50%) rotate(${i * 30}deg)`,
                  boxShadow: '0 0.5px 1px rgba(0,0,0,0.3), inset 0 0.5px 0 rgba(255,255,255,0.3)'
                }}
              />
            ))}
          </div>
          
          {/* Center dot with chrome effect */}
          <div className="absolute top-1/2 left-1/2 w-1.5 h-1.5 rounded-full transform -translate-x-1/2 -translate-y-1/2 z-30"
               style={{
                 background: 'radial-gradient(circle at 30% 30%, #fb923c, #ea580c, #c2410c, #9a3412)',
                 boxShadow: '0 1px 2px rgba(0,0,0,0.4), inset 0 0.5px 0 rgba(255,255,255,0.6), inset 0 -0.5px 0 rgba(0,0,0,0.2)'
               }}></div>
          
          {/* Hour hand with metallic 3D effect */}
          <div className="absolute top-1/2 left-1/2 origin-bottom z-20 hour-hand">
            <div 
              className="rounded-full"
              style={{
                width: '1.5px',
                height: '8px',
                marginLeft: '-0.75px',
                marginTop: '-8px',
                background: 'linear-gradient(to right, #c2410c, #fb923c, #fed7aa, #fb923c, #c2410c)',
                boxShadow: '0 1px 3px rgba(0,0,0,0.5), inset 0 0.5px 0 rgba(255,255,255,0.6), inset 0 -0.5px 0 rgba(0,0,0,0.3)',
              }}
            />
          </div>
          
          {/* Minute hand with metallic 3D effect */}
          <div className="absolute top-1/2 left-1/2 origin-bottom z-10 minute-hand">
            <div 
              className="rounded-full"
              style={{
                width: '1px',
                height: '11px',
                marginLeft: '-0.5px',
                marginTop: '-11px',
                background: 'linear-gradient(to right, #c2410c, #fb923c, #fed7aa, #fb923c, #c2410c)',
                boxShadow: '0 1px 3px rgba(0,0,0,0.5), inset 0 0.5px 0 rgba(255,255,255,0.6), inset 0 -0.5px 0 rgba(0,0,0,0.3)',
              }}
            />
          </div>
          
          {/* Multiple shine layers */}
          <div className="absolute inset-0 rounded-full pointer-events-none"
               style={{
                 background: 'conic-gradient(from 45deg, transparent, rgba(255,255,255,0.4), transparent, rgba(255,255,255,0.2), transparent)',
                 opacity: 0.7
               }}></div>
          
          {/* Primary highlight */}
          <div className="absolute top-0.5 left-0.5 w-3 h-3 rounded-full pointer-events-none"
               style={{
                 background: 'radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.4) 40%, transparent 70%)',
                 filter: 'blur(0.5px)'
               }}></div>
          
          {/* Secondary sparkle */}
          <div className="absolute top-1 right-1 w-1 h-1 rounded-full pointer-events-none"
               style={{
                 background: 'radial-gradient(circle, rgba(255,255,255,0.9) 0%, transparent 60%)',
                 filter: 'blur(0.25px)'
               }}></div>
        </div>
      </div>
    </div>
  );
};

export default AnimatedClock;