/**
 * Mobile utility functions for touch detection and device capabilities
 */

// Touch detection
export const isTouchDevice = () => {
  return (
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0 ||
    navigator.msMaxTouchPoints > 0
  );
};

// Device type detection
export const getDeviceType = () => {
  const width = window.innerWidth;
  
  if (width < 768) return 'mobile';
  if (width < 1024) return 'tablet';
  return 'desktop';
};

// Viewport dimensions
export const getViewportDimensions = () => {
  return {
    width: window.innerWidth,
    height: window.innerHeight,
    isMobile: window.innerWidth < 768,
    isTablet: window.innerWidth >= 768 && window.innerWidth < 1024,
    isDesktop: window.innerWidth >= 1024,
  };
};

// Safe area detection
export const getSafeAreaInsets = () => {
  const style = getComputedStyle(document.documentElement);
  
  return {
    top: parseInt(style.getPropertyValue('--safe-area-top').replace('px', '')) || 0,
    bottom: parseInt(style.getPropertyValue('--safe-area-bottom').replace('px', '')) || 0,
    left: parseInt(style.getPropertyValue('--safe-area-left').replace('px', '')) || 0,
    right: parseInt(style.getPropertyValue('--safe-area-right').replace('px', '')) || 0,
  };
};

// Orientation detection
export const getOrientation = () => {
  return window.innerHeight > window.innerWidth ? 'portrait' : 'landscape';
};

// iOS detection
export const isIOS = () => {
  return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
};

// Android detection
export const isAndroid = () => {
  return /Android/.test(navigator.userAgent);
};

// Mobile browser detection
export const getMobileBrowser = () => {
  const userAgent = navigator.userAgent;
  
  if (userAgent.includes('Chrome') && !userAgent.includes('Edg')) return 'chrome';
  if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) return 'safari';
  if (userAgent.includes('Firefox')) return 'firefox';
  if (userAgent.includes('Samsung')) return 'samsung';
  if (userAgent.includes('Edg')) return 'edge';
  
  return 'unknown';
};

// Network connection detection
export const getNetworkInfo = () => {
  if ('connection' in navigator) {
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    
    return {
      effectiveType: connection.effectiveType || 'unknown',
      downlink: connection.downlink || 0,
      rtt: connection.rtt || 0,
      saveData: connection.saveData || false,
    };
  }
  
  return {
    effectiveType: 'unknown',
    downlink: 0,
    rtt: 0,
    saveData: false,
  };
};

// Haptic feedback (if supported)
export const triggerHapticFeedback = (type = 'light') => {
  if ('vibrate' in navigator) {
    const patterns = {
      light: [10],
      medium: [20],
      heavy: [30],
      success: [10, 50, 10],
      error: [50, 50, 50],
    };
    
    navigator.vibrate(patterns[type] || patterns.light);
  }
};

// Prevent iOS zoom on input focus
export const preventIOSZoom = () => {
  if (isIOS()) {
    const viewport = document.querySelector('meta[name="viewport"]');
    if (viewport) {
      const content = viewport.getAttribute('content');
      if (!content.includes('user-scalable=no')) {
        viewport.setAttribute('content', content + ', user-scalable=no');
      }
    }
  }
};

// Restore iOS zoom capability
export const restoreIOSZoom = () => {
  if (isIOS()) {
    const viewport = document.querySelector('meta[name="viewport"]');
    if (viewport) {
      const content = viewport.getAttribute('content');
      viewport.setAttribute('content', content.replace(', user-scalable=no', ''));
    }
  }
};

// Scroll to element with mobile-optimized behavior
export const scrollToElement = (element, options = {}) => {
  const defaultOptions = {
    behavior: 'smooth',
    block: 'start',
    inline: 'nearest',
    ...options,
  };
  
  if (element) {
    // Add offset for mobile headers
    const isMobile = getViewportDimensions().isMobile;
    const offset = isMobile ? 80 : 0; // Account for mobile sticky header
    
    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset - offset;
    
    window.scrollTo({
      top: elementPosition,
      behavior: defaultOptions.behavior,
    });
  }
};

// Debounce function for touch events
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Throttle function for scroll events
export const throttle = (func, limit) => {
  let inThrottle;
  return function executedFunction(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// Mobile-optimized event listeners
export const addMobileEventListener = (element, eventType, handler, options = {}) => {
  const isTouchSupported = isTouchDevice();
  
  // Map touch events to appropriate handlers
  const eventMap = {
    click: isTouchSupported ? 'touchend' : 'click',
    hover: isTouchSupported ? 'touchstart' : 'mouseenter',
    leave: isTouchSupported ? 'touchend' : 'mouseleave',
  };
  
  const actualEvent = eventMap[eventType] || eventType;
  const mobileOptions = {
    passive: true,
    ...options,
  };
  
  element.addEventListener(actualEvent, handler, mobileOptions);
  
  // Return cleanup function
  return () => {
    element.removeEventListener(actualEvent, handler, mobileOptions);
  };
};

// Format phone numbers for tel: links
export const formatPhoneForTel = (phone) => {
  return phone.replace(/[^\d+]/g, '');
};

// Format email for mailto: links
export const formatEmailForMailto = (email, subject = '', body = '') => {
  const params = new URLSearchParams();
  if (subject) params.append('subject', subject);
  if (body) params.append('body', body);
  
  const queryString = params.toString();
  return `mailto:${email}${queryString ? '?' + queryString : ''}`;
};

// Check if Web Share API is supported
export const canShare = () => {
  return 'share' in navigator;
};

// Native sharing function
export const shareContent = async (data) => {
  if (canShare()) {
    try {
      await navigator.share(data);
      return true;
    } catch (error) {
      console.error('Error sharing:', error);
      return false;
    }
  }
  return false;
};

// Mobile-specific localStorage with error handling
export const mobileStorage = {
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error('Mobile storage set error:', error);
      return false;
    }
  },
  
  get: (key, defaultValue = null) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error('Mobile storage get error:', error);
      return defaultValue;
    }
  },
  
  remove: (key) => {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error('Mobile storage remove error:', error);
      return false;
    }
  },
};

// Performance monitoring for mobile
export const mobilePerformance = {
  measurePageLoad: () => {
    if ('performance' in window) {
      const navigation = performance.getEntriesByType('navigation')[0];
      return {
        domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
        loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
        firstPaint: performance.getEntriesByName('first-paint')[0]?.startTime || 0,
        firstContentfulPaint: performance.getEntriesByName('first-contentful-paint')[0]?.startTime || 0,
      };
    }
    return null;
  },
  
  measureInteraction: (name, startTime) => {
    if ('performance' in window) {
      const endTime = performance.now();
      const duration = endTime - startTime;
      
      // Log slow interactions (>100ms)
      if (duration > 100) {
        console.warn(`Slow mobile interaction: ${name} took ${duration.toFixed(2)}ms`);
      }
      
      return duration;
    }
    return 0;
  },
};

export default {
  isTouchDevice,
  getDeviceType,
  getViewportDimensions,
  getSafeAreaInsets,
  getOrientation,
  isIOS,
  isAndroid,
  getMobileBrowser,
  getNetworkInfo,
  triggerHapticFeedback,
  preventIOSZoom,
  restoreIOSZoom,
  scrollToElement,
  debounce,
  throttle,
  addMobileEventListener,
  formatPhoneForTel,
  formatEmailForMailto,
  canShare,
  shareContent,
  mobileStorage,
  mobilePerformance,
};