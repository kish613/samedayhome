import { useState, useEffect, useCallback } from 'react';
import { 
  isTouchDevice, 
  getDeviceType, 
  getViewportDimensions, 
  getOrientation,
  getSafeAreaInsets,
  throttle 
} from '../utils/mobileUtils';

/**
 * Custom hook for mobile detection and responsive behavior
 */
export const useMobile = () => {
  const [mobileState, setMobileState] = useState(() => ({
    isMobile: false,
    isTablet: false,
    isDesktop: false,
    isTouch: false,
    deviceType: 'desktop',
    orientation: 'portrait',
    viewport: { width: 0, height: 0 },
    safeArea: { top: 0, bottom: 0, left: 0, right: 0 },
  }));

  const updateMobileState = useCallback(() => {
    const viewport = getViewportDimensions();
    const deviceType = getDeviceType();
    const orientation = getOrientation();
    const safeArea = getSafeAreaInsets();
    const isTouch = isTouchDevice();

    setMobileState({
      isMobile: viewport.isMobile,
      isTablet: viewport.isTablet,
      isDesktop: viewport.isDesktop,
      isTouch,
      deviceType,
      orientation,
      viewport: { width: viewport.width, height: viewport.height },
      safeArea,
    });
  }, []);

  useEffect(() => {
    // Initial state
    updateMobileState();

    // Throttled resize handler
    const handleResize = throttle(updateMobileState, 150);

    // Orientation change handler
    const handleOrientationChange = () => {
      // Small delay to ensure viewport dimensions are updated
      setTimeout(updateMobileState, 100);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleOrientationChange);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleOrientationChange);
    };
  }, [updateMobileState]);

  return mobileState;
};

/**
 * Hook for mobile-specific breakpoint detection
 */
export const useBreakpoint = (breakpoint = 'md') => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const breakpoints = {
      xs: 475,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      '2xl': 1536,
    };

    const mediaQuery = window.matchMedia(`(min-width: ${breakpoints[breakpoint]}px)`);
    
    const handleChange = (e) => setMatches(e.matches);
    
    // Set initial value
    setMatches(mediaQuery.matches);
    
    // Listen for changes
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [breakpoint]);

  return matches;
};

/**
 * Hook for touch interaction handling
 */
export const useTouch = () => {
  const [touchState, setTouchState] = useState({
    isPressed: false,
    position: { x: 0, y: 0 },
    startPosition: { x: 0, y: 0 },
  });

  const handleTouchStart = useCallback((e) => {
    const touch = e.touches[0];
    const position = { x: touch.clientX, y: touch.clientY };
    
    setTouchState({
      isPressed: true,
      position,
      startPosition: position,
    });
  }, []);

  const handleTouchMove = useCallback((e) => {
    if (!touchState.isPressed) return;
    
    const touch = e.touches[0];
    const position = { x: touch.clientX, y: touch.clientY };
    
    setTouchState(prev => ({
      ...prev,
      position,
    }));
  }, [touchState.isPressed]);

  const handleTouchEnd = useCallback(() => {
    setTouchState(prev => ({
      ...prev,
      isPressed: false,
    }));
  }, []);

  const touchHandlers = {
    onTouchStart: handleTouchStart,
    onTouchMove: handleTouchMove,
    onTouchEnd: handleTouchEnd,
  };

  return { touchState, touchHandlers };
};

/**
 * Hook for mobile-optimized scroll behavior
 */
export const useMobileScroll = (threshold = 100) => {
  const [scrollState, setScrollState] = useState({
    scrollY: 0,
    isScrollingDown: false,
    isScrollingUp: false,
    hasScrolled: false,
    isAtTop: true,
    isAtBottom: false,
  });

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateScrollState = () => {
      const scrollY = window.scrollY;
      const documentHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;
      
      const isScrollingDown = scrollY > lastScrollY;
      const isScrollingUp = scrollY < lastScrollY;
      const hasScrolled = scrollY > threshold;
      const isAtTop = scrollY <= 10;
      const isAtBottom = scrollY + windowHeight >= documentHeight - 10;

      setScrollState({
        scrollY,
        isScrollingDown,
        isScrollingUp,
        hasScrolled,
        isAtTop,
        isAtBottom,
      });

      lastScrollY = scrollY;
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateScrollState);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial state
    updateScrollState();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return scrollState;
};

/**
 * Hook for mobile form optimization
 */
export const useMobileForm = () => {
  const { isMobile } = useMobile();
  
  const [formState, setFormState] = useState({
    activeField: null,
    keyboardVisible: false,
    viewportAdjusted: false,
  });

  const handleFieldFocus = useCallback((fieldName) => {
    setFormState(prev => ({
      ...prev,
      activeField: fieldName,
      keyboardVisible: true,
    }));

    // Adjust viewport for mobile keyboard
    if (isMobile) {
      setTimeout(() => {
        setFormState(prev => ({
          ...prev,
          viewportAdjusted: true,
        }));
      }, 300); // Wait for keyboard animation
    }
  }, [isMobile]);

  const handleFieldBlur = useCallback(() => {
    setFormState(prev => ({
      ...prev,
      activeField: null,
      keyboardVisible: false,
      viewportAdjusted: false,
    }));
  }, []);

  const scrollToField = useCallback((fieldElement) => {
    if (isMobile && fieldElement) {
      const rect = fieldElement.getBoundingClientRect();
      const scrollTop = window.pageYOffset + rect.top - 100; // 100px offset
      
      window.scrollTo({
        top: scrollTop,
        behavior: 'smooth',
      });
    }
  }, [isMobile]);

  return {
    formState,
    handleFieldFocus,
    handleFieldBlur,
    scrollToField,
    isMobile,
  };
};

/**
 * Hook for mobile navigation state
 */
export const useMobileNavigation = () => {
  const [navState, setNavState] = useState({
    isOpen: false,
    isAnimating: false,
  });

  const openNav = useCallback(() => {
    setNavState({ isOpen: true, isAnimating: true });
    
    // Prevent body scroll when nav is open
    document.body.style.overflow = 'hidden';
    
    setTimeout(() => {
      setNavState(prev => ({ ...prev, isAnimating: false }));
    }, 300);
  }, []);

  const closeNav = useCallback(() => {
    setNavState({ isOpen: false, isAnimating: true });
    
    // Restore body scroll
    document.body.style.overflow = '';
    
    setTimeout(() => {
      setNavState(prev => ({ ...prev, isAnimating: false }));
    }, 300);
  }, []);

  const toggleNav = useCallback(() => {
    if (navState.isOpen) {
      closeNav();
    } else {
      openNav();
    }
  }, [navState.isOpen, openNav, closeNav]);

  // Close nav on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && navState.isOpen) {
        closeNav();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [navState.isOpen, closeNav]);

  return {
    navState,
    openNav,
    closeNav,
    toggleNav,
  };
};

export default useMobile;