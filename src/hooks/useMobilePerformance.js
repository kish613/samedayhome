import { useEffect, useState, useRef, useCallback } from 'react';

// Hook for lazy loading images with blur-up effect
export const useLazyImage = (src, placeholder = null) => {
  const [imageSrc, setImageSrc] = useState(placeholder);
  const [imageRef, setImageRef] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const observer = useRef(null);

  const cleanupObserver = useCallback(() => {
    if (observer.current) {
      observer.current.disconnect();
    }
  }, []);

  const observeImage = useCallback((node) => {
    cleanupObserver();
    
    if (!node) return;
    
    observer.current = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = new Image();
            img.src = src;
            img.onload = () => {
              setImageSrc(src);
              setIsLoaded(true);
            };
            cleanupObserver();
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );
    
    observer.current.observe(node);
  }, [src, cleanupObserver]);

  useEffect(() => {
    if (imageRef) {
      observeImage(imageRef);
    }
    
    return cleanupObserver;
  }, [imageRef, observeImage, cleanupObserver]);

  return {
    ref: setImageRef,
    src: imageSrc,
    isLoaded,
    className: `transition-all duration-500 ${isLoaded ? 'blur-0' : 'blur-sm'}`
  };
};

// Hook for detecting mobile device and performance capabilities
export const useMobileDevice = () => {
  const [deviceInfo, setDeviceInfo] = useState({
    isMobile: false,
    isTablet: false,
    isTouchDevice: false,
    isSlowConnection: false,
    preferredReducedMotion: false,
    screenSize: 'desktop'
  });

  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth;
      const isMobile = width <= 768;
      const isTablet = width > 768 && width <= 1024;
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      
      // Check connection speed
      const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
      const isSlowConnection = connection ? 
        connection.saveData || connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g' : 
        false;
      
      // Check motion preference
      const preferredReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      
      // Determine screen size category
      let screenSize = 'desktop';
      if (isMobile) screenSize = 'mobile';
      else if (isTablet) screenSize = 'tablet';

      setDeviceInfo({
        isMobile,
        isTablet,
        isTouchDevice,
        isSlowConnection,
        preferredReducedMotion,
        screenSize
      });
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  return deviceInfo;
};

// Hook for viewport-based animations
export const useViewportAnimation = (threshold = 0.1) => {
  const [isInView, setIsInView] = useState(false);
  const elementRef = useRef(null);
  const observerRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold, rootMargin: '50px' }
    );

    observerRef.current.observe(element);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [threshold]);

  return { ref: elementRef, isInView };
};

// Performance-optimized scroll handler
export const useOptimizedScroll = (callback, delay = 100) => {
  const timeoutRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        if (rafRef.current) {
          cancelAnimationFrame(rafRef.current);
        }

        rafRef.current = requestAnimationFrame(() => {
          callback();
        });
      }, delay);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [callback, delay]);
};

// Hook for responsive images
export const useResponsiveImage = (imageSizes) => {
  const { screenSize } = useMobileDevice();
  
  const getImageSrc = useCallback(() => {
    if (imageSizes[screenSize]) {
      return imageSizes[screenSize];
    }
    // Fallback to desktop if specific size not available
    return imageSizes.desktop || imageSizes.mobile || '';
  }, [screenSize, imageSizes]);

  return getImageSrc();
};