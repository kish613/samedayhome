import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Simple rotating showcase of property images.
 * Autoplays through the supplied image list every 5 seconds.
 * Testimonials / owner details can be added later.
 */

const variants = {
  enter: (direction) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
    scale: 0.9,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction) => ({
    zIndex: 0,
    x: direction < 0 ? 300 : -300,
    opacity: 0,
    scale: 0.9,
  }),
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset, velocity) => {
  return Math.abs(offset) * velocity;
};

export default function PropertyShowcase({ images }) {
  const [[page, direction], setPage] = useState([0, 0]);

  // Wrap indexes to stay within bounds
  const imageIndex = ((page % images.length) + images.length) % images.length;

  const paginate = (newDirection) => {
    setPage([page + newDirection, newDirection]);
  };

  // Auto play every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => paginate(1), 5000);
    return () => clearInterval(timer);
  }, [page]);

  return (
    <div className="relative w-full max-w-4xl mx-auto h-[320px] sm:h-[380px] overflow-hidden">
      <AnimatePresence initial={false} custom={direction}>
        <motion.img
          key={page}
          src={images[imageIndex].src}
          alt={images[imageIndex].alt || 'Purchased Property'}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ x: { type: 'spring', stiffness: 300, damping: 30 }, opacity: { duration: 0.3 } }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);
            if (swipe < -swipeConfidenceThreshold) {
              paginate(1);
            } else if (swipe > swipeConfidenceThreshold) {
              paginate(-1);
            }
          }}
          className="absolute top-0 left-0 w-full h-full object-cover rounded-2xl shadow-lg"
        />
      </AnimatePresence>
      {/* Overlay caption placeholder */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white backdrop-blur-sm px-4 py-1 rounded-full text-sm">
        Recently Purchased Property
      </div>
    </div>
  );
}
