import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TouchRipple = ({ children, className = '', disabled = false }) => {
  const [ripples, setRipples] = useState([]);
  const containerRef = useRef(null);

  const addRipple = (event) => {
    if (disabled) return;

    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    const newRipple = {
      x,
      y,
      size,
      id: Date.now()
    };

    setRipples(prev => [...prev, newRipple]);

    // Remove ripple after animation
    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
    }, 600);
  };

  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    addRipple(touch);
  };

  const handleMouseDown = (e) => {
    // Only add ripple on primary mouse button
    if (e.button === 0) {
      addRipple(e);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      onTouchStart={handleTouchStart}
      onMouseDown={handleMouseDown}
      style={{ WebkitTapHighlightColor: 'transparent' }}
    >
      {children}
      <AnimatePresence>
        {ripples.map(ripple => (
          <motion.span
            key={ripple.id}
            className="absolute pointer-events-none"
            style={{
              left: ripple.x,
              top: ripple.y,
              width: ripple.size,
              height: ripple.size,
            }}
            initial={{ scale: 0, opacity: 0.3 }}
            animate={{ scale: 2, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <span
              className="block w-full h-full rounded-full bg-white"
              style={{ background: 'rgba(255, 255, 255, 0.5)' }}
            />
          </motion.span>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default TouchRipple;