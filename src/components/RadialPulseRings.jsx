import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const RadialPulseRings = ({ variant = 'default' }) => {
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
  const rings = isLowEndDevice
    ? [{ delay: 0, duration: 4 }, { delay: 2, duration: 4 }]
    : [{ delay: 0, duration: 4 }, { delay: 1, duration: 4 }, { delay: 2, duration: 4 }];

  const baseGradientStyle = variant === 'subtle'
    ? {
        background: 'linear-gradient(135deg, rgba(236, 244, 254, 0.18) 0%, rgba(239, 242, 245, 0.16) 52%, rgba(248, 249, 250, 0.2) 100%)',
        mixBlendMode: 'lighten',
        opacity: 0.08
      }
    : {
        background: 'linear-gradient(to bottom right, #eff6ff 0%, #f9fafb 50%, #eef2ff 100%)'
      };

  if (reducedMotion) {
    // Static background for accessibility
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: -1 }}>
        <div className="absolute inset-0" style={baseGradientStyle} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-gradient-radial from-blue-200/20 to-transparent" />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: -1 }}>
      {/* Base gradient background */}
      <div className="absolute inset-0" style={baseGradientStyle} />
      
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

