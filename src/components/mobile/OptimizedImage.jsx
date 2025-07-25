import React from 'react';
import { useLazyImage, useResponsiveImage } from '@/hooks/useMobilePerformance.js';

const OptimizedImage = ({ 
  src, 
  mobileSrc, 
  alt, 
  className = '', 
  placeholder = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect width="400" height="300" fill="%23f3f4f6"/%3E%3C/svg%3E',
  priority = false,
  ...props 
}) => {
  // Use responsive image source
  const imageSrc = useResponsiveImage({
    mobile: mobileSrc || src,
    tablet: src,
    desktop: src
  });

  // Use lazy loading for non-priority images
  const { ref, src: loadedSrc, isLoaded, className: lazyClassName } = useLazyImage(
    imageSrc,
    placeholder
  );

  // For priority images, load immediately
  if (priority) {
    return (
      <img
        src={imageSrc}
        alt={alt}
        className={className}
        loading="eager"
        {...props}
      />
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <img
        ref={ref}
        src={loadedSrc}
        alt={alt}
        className={`w-full h-full object-cover ${lazyClassName}`}
        loading="lazy"
        {...props}
      />
      {!isLoaded && (
        <div className="absolute inset-0 animate-pulse bg-gray-200" />
      )}
    </div>
  );
};

export default OptimizedImage;