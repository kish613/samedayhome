import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { Star, ChevronLeft, ChevronRight, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MobileTestimonials = ({ testimonialData }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  // Auto-advance testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonialData.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonialData.length]);

  // Handle touch events for swipe
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      setCurrentIndex((prev) => (prev + 1) % testimonialData.length);
    }
    if (isRightSwipe) {
      setCurrentIndex((prev) => (prev - 1 + testimonialData.length) % testimonialData.length);
    }
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonialData.length) % testimonialData.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonialData.length);
  };

  return (
    <section className="py-12 px-4 bg-purple-50/30">
      <div className="max-w-md mx-auto">
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Badge className="bg-purple-100 text-purple-900 px-3 py-1 text-xs font-semibold mb-3">
            Customer Reviews
          </Badge>
          <h2 className="text-2xl font-bold text-blue-900 mb-2">What People Say</h2>
          <div className="flex items-center justify-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            ))}
            <span className="ml-2 text-sm font-semibold text-gray-700">4.9/5 (2,847 reviews)</span>
          </div>
        </motion.div>

        {/* Testimonial Slider */}
        <div 
          className="relative"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      {testimonialData[currentIndex].avatar.startsWith('http') ? (
                        <img 
                          src={testimonialData[currentIndex].avatar} 
                          alt={testimonialData[currentIndex].name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 font-semibold">{testimonialData[currentIndex].avatar}</span>
                        </div>
                      )}
                      <div>
                        <h4 className="font-semibold text-gray-900">
                          {testimonialData[currentIndex].name}
                        </h4>
                        <p className="text-sm text-gray-500">
                          {testimonialData[currentIndex].location}
                        </p>
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-700 text-xs px-2 py-1 flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {testimonialData[currentIndex].days} days
                    </Badge>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center mb-3">
                    {[...Array(testimonialData[currentIndex].rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>

                  {/* Review Text */}
                  <p className="text-gray-700 text-sm leading-relaxed">
                    "{testimonialData[currentIndex].text}"
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          <button
            onClick={goToPrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center"
          >
            <ChevronLeft className="h-4 w-4 text-gray-600" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center"
          >
            <ChevronRight className="h-4 w-4 text-gray-600" />
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex items-center justify-center space-x-2 mt-6">
          {testimonialData.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 transition-all duration-300 rounded-full ${
                index === currentIndex 
                  ? 'w-6 bg-blue-900' 
                  : 'w-2 bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MobileTestimonials;