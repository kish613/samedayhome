import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const RadialPulseRings = () => {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isLowEndDevice, setIsLowEndDevice] = useState(false);

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);

    // Detect low-end devices
    const checkDevice = () => {
      const hasLowCores = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4;
      const hasLowMemory = navigator.deviceMemory && navigator.deviceMemory < 4;
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      
      setIsLowEndDevice(hasLowCores || hasLowMemory || isMobile);
    };

    checkDevice();
  }, []);

  // Reduce rings for performance
  const rings = isLowEndDevice ? 
    [{ delay: 0, duration: 4 }, { delay: 2, duration: 4 }] :
    [{ delay: 0, duration: 4 }, { delay: 1, duration: 4 }, { delay: 2, duration: 4 }];

  if (reducedMotion) {
    // Static background for accessibility
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-sky-50 to-stone-50" />
        
        {/* Paper Texture Overlay */}
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23e2e8f0' fill-opacity='0.3'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '20px 20px'
        }} />
        
        {/* Subtle Linen Texture */}
        <div className="absolute inset-0 opacity-20 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-gradient-radial from-blue-200/20 to-transparent" />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Base gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-sky-50 to-stone-50" />
      
      {/* Paper Texture Overlay */}
      <div className="absolute inset-0 opacity-30" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23e2e8f0' fill-opacity='0.3'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        backgroundSize: '20px 20px'
      }} />
      
      {/* Subtle Linen Texture */}
      <div className="absolute inset-0 opacity-20 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ 
          transform: 'translate(-50%, -50%) translateZ(0)',
          willChange: 'transform'
        }}
      >
        {/* Optimized color spreading rings */}
        {rings.map((ring, index) => (
          <motion.div
            key={`color-${index}`}
            className="absolute rounded-full"
            initial={{ 
              width: 100, 
              height: 100, 
              opacity: 0,
              x: '-50%',
              y: '-50%'
            }}
            animate={{ 
              width: isLowEndDevice ? 800 : 1000, 
              height: isLowEndDevice ? 800 : 1000, 
              opacity: [0, 0.3, 0.3, 0],
              x: '-50%',
              y: '-50%'
            }}
            transition={{
              duration: ring.duration,
              delay: ring.delay,
              repeat: Infinity,
              ease: "linear",
              times: [0, 0.1, 0.8, 1]
            }}
            style={{
              left: '50%',
              top: '50%',
              background: 'radial-gradient(circle, rgba(59, 130, 246, 0.25) 0%, rgba(99, 102, 241, 0.15) 50%, transparent 70%)',
              transform: 'translateZ(0)',
              willChange: 'transform, opacity, width, height',
              backfaceVisibility: 'hidden',
              perspective: 1000,
              contain: 'layout style paint'
            }}
          />
        ))}
        
        {/* Optimized border rings */}
        {rings.map((ring, index) => (
          <motion.div
            key={index}
            className="absolute rounded-full border-2"
            initial={{ 
              width: 100, 
              height: 100, 
              opacity: 0,
              x: '-50%',
              y: '-50%'
            }}
            animate={{ 
              width: isLowEndDevice ? 800 : 1000, 
              height: isLowEndDevice ? 800 : 1000, 
              opacity: [0, 0.5, 0.5, 0],
              x: '-50%',
              y: '-50%'
            }}
            transition={{
              duration: ring.duration,
              delay: ring.delay,
              repeat: Infinity,
              ease: "linear",
              times: [0, 0.1, 0.8, 1]
            }}
            style={{
              left: '50%',
              top: '50%',
              borderColor: 'rgba(59, 130, 246, 0.3)',
              boxShadow: isLowEndDevice ? 'none' : '0 0 10px rgba(59, 130, 246, 0.2)',
              transform: 'translateZ(0)',
              willChange: 'transform, opacity, width, height',
              backfaceVisibility: 'hidden',
              contain: 'layout style paint'
            }}
          />
        ))}
        
        {/* Optimized center glow - using gradient instead of blur */}
        <motion.div
          className="absolute w-64 h-64 rounded-full"
          initial={{ scale: 0.8, opacity: 0.3 }}
          animate={{ scale: 1.1, opacity: 0.5 }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
          style={{
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%) translateZ(0)',
            background: 'radial-gradient(circle, rgba(99, 102, 241, 0.3) 0%, rgba(59, 130, 246, 0.2) 30%, rgba(59, 130, 246, 0.1) 60%, transparent 100%)',
            willChange: 'transform, opacity',
            backfaceVisibility: 'hidden',
            contain: 'layout style paint'
          }}
        />
        
        {/* Static gradient spots - only on high-end devices */}
        {!isLowEndDevice && (
          <>
            <div 
              className="absolute w-48 h-48 rounded-full"
              style={{
                left: '50%',
                top: '50%',
                transform: 'translate(-80%, -30%) translateZ(0)',
                background: 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%)',
                backfaceVisibility: 'hidden'
              }}
            />
            <div 
              className="absolute w-40 h-40 rounded-full"
              style={{
                left: '50%',
                top: '50%',
                transform: 'translate(60%, 40%) translateZ(0)',
                background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)',
                backfaceVisibility: 'hidden'
              }}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default RadialPulseRings;