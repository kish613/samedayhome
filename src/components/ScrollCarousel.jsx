import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const ScrollCarousel = ({ images }) => {
  const containerRef = useRef(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  
  // Track page scroll
  const { scrollY } = useScroll();
  
  // Transform scroll to rotation - every 100px of scroll = 10 degrees of rotation
  const rotation = useTransform(scrollY, [0, 3600], [0, 360]);
  
  const imageCount = images.length;
  const angleStep = 360 / imageCount;
  
  return (
    <div 
      ref={containerRef} 
      className="relative w-full h-[600px] flex items-center justify-center overflow-visible"
    >
      {/* 3D Scene Container */}
      <div className="relative w-full h-full" style={{ perspective: '800px' }}>
        
        {/* Rotating Carousel */}
        <motion.div 
          className="absolute inset-0 flex items-center justify-center"
          style={{
            transformStyle: 'preserve-3d',
            transform: 'translateZ(-450px)',
            rotateY: rotation
          }}
        >
          {images.map((image, index) => {
            const angleY = angleStep * index;
            const isHovered = hoveredIndex === index;
            
            return (
              <div
                key={index}
                className="absolute"
                style={{
                  transform: `rotateY(${angleY}deg) translateZ(450px)`,
                  transformStyle: 'preserve-3d',
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className={`
                  relative w-[160px] h-[160px] rounded-2xl overflow-hidden 
                  shadow-xl cursor-pointer transition-all duration-300
                  ${isHovered ? 'shadow-2xl ring-4 ring-blue-400 scale-105' : ''}
                `}>
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Text Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                    <h3 className="text-sm font-bold mb-0.5">Recently Purchased</h3>
                    <p className="text-xs opacity-90">
                      {image.completionDays} days to complete
                    </p>
                  </div>
                  
                  {/* Hover Effect Overlay */}
                  <div
                    className={`absolute inset-0 bg-blue-600/20 transition-opacity duration-300 ${
                      isHovered ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
      
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 to-white/50 -z-10" />
      
    </div>
  );
};

export default ScrollCarousel;