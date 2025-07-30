import React from 'react';
import { motion } from 'framer-motion';

const RadialPulseRings = () => {
  // Create multiple rings with different animation delays
  const rings = [
    { delay: 0, duration: 4 },
    { delay: 1, duration: 4 },
    { delay: 2, duration: 4 },
    { delay: 3, duration: 4 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Base gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-gray-50 to-indigo-50" />
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        {/* Color spreading rings */}
        {rings.map((ring, index) => (
          <motion.div
            key={`color-${index}`}
            className="absolute rounded-full bg-gradient-to-r from-blue-300/30 via-indigo-300/20 to-transparent"
            initial={{ 
              width: 100, 
              height: 100, 
              opacity: 0,
              x: '-50%',
              y: '-50%'
            }}
            animate={{ 
              width: 1400, 
              height: 1400, 
              opacity: [0, 0.4, 0.4, 0],
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
              filter: 'blur(40px)',
            }}
          />
        ))}
        
        {/* Border rings */}
        {rings.map((ring, index) => (
          <motion.div
            key={index}
            className="absolute rounded-full border-2 border-blue-400/30"
            initial={{ 
              width: 100, 
              height: 100, 
              opacity: 0,
              x: '-50%',
              y: '-50%'
            }}
            animate={{ 
              width: 1200, 
              height: 1200, 
              opacity: [0, 0.6, 0.6, 0],
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
              borderWidth: '2px',
              boxShadow: '0 0 20px rgba(59, 130, 246, 0.2)',
            }}
          />
        ))}
        
        {/* Inner color waves */}
        {rings.map((ring, index) => (
          <motion.div
            key={`inner-color-${index}`}
            className="absolute rounded-full bg-gradient-to-r from-indigo-400/20 via-blue-400/15 to-transparent"
            initial={{ 
              width: 30, 
              height: 30, 
              opacity: 0.5,
              x: '-50%',
              y: '-50%'
            }}
            animate={{ 
              width: 800, 
              height: 800, 
              opacity: 0,
              x: '-50%',
              y: '-50%'
            }}
            transition={{
              duration: ring.duration * 0.8,
              delay: ring.delay + 0.5,
              repeat: Infinity,
              ease: "easeOut"
            }}
            style={{
              left: '50%',
              top: '50%',
              filter: 'blur(30px)',
            }}
          />
        ))}
        
        {/* Center glow effect */}
        <motion.div
          className="absolute w-96 h-96 rounded-full"
          initial={{ scale: 0.8, opacity: 0.4 }}
          animate={{ scale: 1.2, opacity: 0.6 }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
          style={{
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            background: 'radial-gradient(circle, rgba(99, 102, 241, 0.2) 0%, rgba(59, 130, 246, 0.1) 40%, transparent 70%)',
            filter: 'blur(40px)',
          }}
        />
        
        {/* Static color spots for depth */}
        <div className="absolute w-64 h-64 rounded-full bg-blue-300/10 blur-3xl"
          style={{
            left: '50%',
            top: '50%',
            transform: 'translate(-80%, -30%)',
          }}
        />
        <div className="absolute w-48 h-48 rounded-full bg-indigo-300/10 blur-3xl"
          style={{
            left: '50%',
            top: '50%',
            transform: 'translate(60%, 40%)',
          }}
        />
      </div>
    </div>
  );
};

export default RadialPulseRings;