/**
 * Mobile Navigation Performance Optimizer
 * Optimizes mobile navigation for smooth animations and responsive interactions
 */

import { 
  prefersReducedMotion, 
  getAnimationDuration, 
  throttle, 
  debounce,
  isTouchDevice,
  getDeviceType
} from './mobileUtils.js';
import performanceMonitor from './performanceMonitor.js';

class MobileNavigationOptimizer {
  constructor() {
    this.isOptimized = false;
    this.cleanupFunctions = [];
    this.animationFrameId = null;
    this.touchStartTime = 0;
    this.lastScrollY = 0;
    this.isScrolling = false;
    
    // Device-specific optimizations
    this.deviceOptimizations = {
      mobile: {
        animationDuration: 250,
        debounceDelay: 100,
        throttleDelay: 16,
      },
      tablet: {
        animationDuration: 300,
        debounceDelay: 150,
        throttleDelay: 16,
      },
      desktop: {
        animationDuration: 300,
        debounceDelay: 200,
        throttleDelay: 16,
      },
    };
  }

  /**
   * Initialize optimizations for mobile navigation
   */
  initialize() {
    if (this.isOptimized) return;
    
    this.setupPerformanceOptimizations();
    this.setupAnimationOptimizations();
    this.setupTouchOptimizations();
    this.setupScrollOptimizations();
    this.setupMemoryOptimizations();
    
    this.isOptimized = true;
    
    console.log('Mobile navigation optimizations initialized');
  }

  /**
   * Setup general performance optimizations
   */
  setupPerformanceOptimizations() {
    // Optimize CSS for hardware acceleration
    this.addCSSOptimizations();
    
    // Setup performance monitoring
    if (process.env.NODE_ENV === 'development') {
      this.setupPerformanceMonitoring();
    }
    
    // Optimize for different device types
    this.applyDeviceSpecificOptimizations();
  }

  /**
   * Add CSS optimizations for better performance
   */
  addCSSOptimizations() {
    const style = document.createElement('style');
    style.textContent = `
      /* Hardware acceleration for mobile navigation */
      .mobile-nav-overlay {
        transform: translateZ(0);
        backface-visibility: hidden;
        perspective: 1000px;
        will-change: transform, opacity;
      }
      
      .mobile-nav-panel {
        transform: translateZ(0);
        backface-visibility: hidden;
        will-change: transform;
      }
      
      .mobile-nav-link {
        transform: translateZ(0);
        will-change: transform, background-color;
      }
      
      /* Touch feedback optimization */
      .touch-feedback {
        -webkit-tap-highlight-color: transparent;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        user-select: none;
      }
      
      /* Smooth scrolling optimization */
      .mobile-scroll-smooth {
        -webkit-overflow-scrolling: touch;
        scroll-behavior: smooth;
      }
      
      /* Animation performance */
      .mobile-fade-in {
        animation: mobileNavFadeIn var(--animation-duration, 300ms) ease-out;
      }
      
      .mobile-slide-up {
        animation: mobileNavSlideUp var(--animation-duration, 300ms) ease-out;
      }
      
      @keyframes mobileNavFadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      
      @keyframes mobileNavSlideUp {
        from { 
          opacity: 0; 
          transform: translateY(20px); 
        }
        to { 
          opacity: 1; 
          transform: translateY(0); 
        }
      }
      
      /* Reduced motion support */
      @media (prefers-reduced-motion: reduce) {
        .mobile-nav-overlay,
        .mobile-nav-panel,
        .mobile-nav-link {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
        }
      }
      
      /* High contrast mode support */
      @media (prefers-contrast: high) {
        .mobile-nav-overlay {
          backdrop-filter: none;
          background-color: rgba(0, 0, 0, 0.8);
        }
        
        .mobile-nav-link {
          border-bottom: 1px solid currentColor;
        }
      }
      
      /* Touch target optimization */
      .touch-target {
        min-height: 44px;
        min-width: 44px;
        position: relative;
      }
      
      .touch-target::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        min-height: 44px;
        min-width: 44px;
        z-index: -1;
      }
      
      /* Ripple effect for touch feedback */
      .touch-ripple {
        position: relative;
        overflow: hidden;
      }
      
      .touch-ripple::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 0;
        height: 0;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: translate(-50%, -50%);
        transition: width 0.3s, height 0.3s;
      }
      
      .touch-ripple:active::after {
        width: 200px;
        height: 200px;
      }
    `;
    
    document.head.appendChild(style);
    
    this.cleanupFunctions.push(() => {
      document.head.removeChild(style);
    });
  }

  /**
   * Setup animation optimizations
   */
  setupAnimationOptimizations() {
    const deviceType = getDeviceType();
    const optimizations = this.deviceOptimizations[deviceType];
    
    // Set CSS custom properties for animation duration
    document.documentElement.style.setProperty(
      '--animation-duration', 
      `${getAnimationDuration(optimizations.animationDuration)}ms`
    );
    
    // Optimize animation frame rate
    this.optimizeAnimationFrameRate();
  }

  /**
   * Optimize animation frame rate
   */
  optimizeAnimationFrameRate() {
    let lastFrameTime = 0;
    const targetFrameRate = 60;
    const frameInterval = 1000 / targetFrameRate;
    
    const optimizedRAF = (callback) => {
      const currentTime = performance.now();
      const timeSinceLastFrame = currentTime - lastFrameTime;
      
      if (timeSinceLastFrame >= frameInterval) {
        lastFrameTime = currentTime;
        return requestAnimationFrame(callback);
      } else {
        return setTimeout(() => {
          this.animationFrameId = requestAnimationFrame(callback);
        }, frameInterval - timeSinceLastFrame);
      }
    };
    
    // Store original RAF for cleanup
    const originalRAF = window.requestAnimationFrame;
    
    // Only apply optimization on mobile devices
    if (getDeviceType() === 'mobile') {
      window.requestAnimationFrame = optimizedRAF;
      
      this.cleanupFunctions.push(() => {
        window.requestAnimationFrame = originalRAF;
      });
    }
  }

  /**
   * Setup touch optimizations
   */
  setupTouchOptimizations() {
    if (!isTouchDevice()) return;
    
    // Optimize touch event handling
    this.optimizeTouchEvents();
    
    // Setup touch feedback
    this.setupTouchFeedback();
    
    // Prevent iOS zoom on input focus
    this.preventIOSZoom();
  }

  /**
   * Optimize touch event handling
   */
  optimizeTouchEvents() {
    const deviceType = getDeviceType();
    const optimizations = this.deviceOptimizations[deviceType];
    
    // Debounced touch handler
    const debouncedTouchHandler = debounce((e) => {
      // Handle touch with performance monitoring
      performanceMonitor.startMeasurement('touch-response');
      
      // Process touch event
      this.processTouchEvent(e);
      
      performanceMonitor.endMeasurement('touch-response');
    }, optimizations.debounceDelay);
    
    // Add optimized touch listeners
    document.addEventListener('touchstart', debouncedTouchHandler, { 
      passive: true,
      capture: false 
    });
    
    document.addEventListener('touchend', (e) => {
      const touchDuration = performance.now() - this.touchStartTime;
      
      // Log slow touches in development
      if (process.env.NODE_ENV === 'development' && touchDuration > 100) {
        console.warn(`Slow touch response: ${touchDuration.toFixed(2)}ms`);
      }
    }, { passive: true });
    
    this.cleanupFunctions.push(() => {
      document.removeEventListener('touchstart', debouncedTouchHandler);
    });
  }

  /**
   * Process touch event with optimizations
   */
  processTouchEvent(e) {
    this.touchStartTime = performance.now();
    
    // Add visual feedback
    const target = e.target.closest('.touch-feedback');
    if (target) {
      target.classList.add('touching');
      
      setTimeout(() => {
        target.classList.remove('touching');
      }, 150);
    }
  }

  /**
   * Setup touch feedback system
   */
  setupTouchFeedback() {
    const style = document.createElement('style');
    style.textContent = `
      .touch-feedback.touching {
        transform: scale(0.98);
        opacity: 0.8;
        transition: transform 0.1s ease-out, opacity 0.1s ease-out;
      }
      
      .nav-touch-feedback:active {
        background-color: rgba(59, 130, 246, 0.1);
        transform: scale(0.99);
      }
    `;
    
    document.head.appendChild(style);
    
    this.cleanupFunctions.push(() => {
      document.head.removeChild(style);
    });
  }

  /**
   * Prevent iOS zoom on input focus
   */
  preventIOSZoom() {
    if (!/iPad|iPhone|iPod/.test(navigator.userAgent)) return;
    
    const viewport = document.querySelector('meta[name="viewport"]');
    if (!viewport) return;
    
    const originalContent = viewport.getAttribute('content');
    
    const preventZoom = () => {
      viewport.setAttribute('content', originalContent + ', user-scalable=no');
    };
    
    const restoreZoom = () => {
      viewport.setAttribute('content', originalContent);
    };
    
    document.addEventListener('focusin', preventZoom);
    document.addEventListener('focusout', restoreZoom);
    
    this.cleanupFunctions.push(() => {
      document.removeEventListener('focusin', preventZoom);
      document.removeEventListener('focusout', restoreZoom);
      viewport.setAttribute('content', originalContent);
    });
  }

  /**
   * Setup scroll optimizations
   */
  setupScrollOptimizations() {
    const deviceType = getDeviceType();
    const optimizations = this.deviceOptimizations[deviceType];
    
    // Throttled scroll handler
    const throttledScrollHandler = throttle(() => {
      this.handleOptimizedScroll();
    }, optimizations.throttleDelay);
    
    window.addEventListener('scroll', throttledScrollHandler, { passive: true });
    
    this.cleanupFunctions.push(() => {
      window.removeEventListener('scroll', throttledScrollHandler);
    });
  }

  /**
   * Handle optimized scroll events
   */
  handleOptimizedScroll() {
    const currentScrollY = window.scrollY;
    const scrollDelta = currentScrollY - this.lastScrollY;
    
    // Update scroll state
    this.isScrolling = true;
    
    // Clear scroll timeout
    clearTimeout(this.scrollTimeout);
    
    // Set scroll end timeout
    this.scrollTimeout = setTimeout(() => {
      this.isScrolling = false;
    }, 150);
    
    // Update last scroll position
    this.lastScrollY = currentScrollY;
    
    // Optimize scroll performance
    this.optimizeScrollPerformance(scrollDelta);
  }

  /**
   * Optimize scroll performance
   */
  optimizeScrollPerformance(scrollDelta) {
    // Disable hover effects during scroll on mobile
    if (getDeviceType() === 'mobile' && Math.abs(scrollDelta) > 5) {
      document.body.classList.add('scrolling');
      
      clearTimeout(this.scrollEndTimeout);
      this.scrollEndTimeout = setTimeout(() => {
        document.body.classList.remove('scrolling');
      }, 200);
    }
  }

  /**
   * Setup memory optimizations
   */
  setupMemoryOptimizations() {
    // Cleanup unused event listeners
    this.setupEventListenerCleanup();
    
    // Optimize DOM queries
    this.optimizeDOMQueries();
    
    // Setup memory leak detection
    if (process.env.NODE_ENV === 'development') {
      this.setupMemoryLeakDetection();
    }
  }

  /**
   * Setup event listener cleanup
   */
  setupEventListenerCleanup() {
    const eventListeners = new WeakMap();
    
    // Override addEventListener to track listeners
    const originalAddEventListener = EventTarget.prototype.addEventListener;
    EventTarget.prototype.addEventListener = function(type, listener, options) {
      if (!eventListeners.has(this)) {
        eventListeners.set(this, []);
      }
      eventListeners.get(this).push({ type, listener, options });
      
      return originalAddEventListener.call(this, type, listener, options);
    };
    
    // Cleanup function
    this.cleanupFunctions.push(() => {
      EventTarget.prototype.addEventListener = originalAddEventListener;
    });
  }

  /**
   * Optimize DOM queries
   */
  optimizeDOMQueries() {
    const queryCache = new Map();
    
    // Cache frequently used selectors
    const cachedQuerySelector = (selector) => {
      if (queryCache.has(selector)) {
        return queryCache.get(selector);
      }
      
      const element = document.querySelector(selector);
      queryCache.set(selector, element);
      
      return element;
    };
    
    // Clear cache on DOM mutations
    const observer = new MutationObserver(() => {
      queryCache.clear();
    });
    
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
    
    this.cleanupFunctions.push(() => {
      observer.disconnect();
      queryCache.clear();
    });
  }

  /**
   * Setup memory leak detection
   */
  setupMemoryLeakDetection() {
    let lastMemoryUsage = 0;
    
    const checkMemoryUsage = () => {
      if ('memory' in performance) {
        const currentMemory = performance.memory.usedJSHeapSize;
        const memoryIncrease = currentMemory - lastMemoryUsage;
        
        if (memoryIncrease > 5 * 1024 * 1024) { // 5MB increase
          console.warn('Potential memory leak detected:', {
            increase: `${(memoryIncrease / 1024 / 1024).toFixed(2)}MB`,
            total: `${(currentMemory / 1024 / 1024).toFixed(2)}MB`,
          });
        }
        
        lastMemoryUsage = currentMemory;
      }
    };
    
    const memoryCheckInterval = setInterval(checkMemoryUsage, 10000);
    
    this.cleanupFunctions.push(() => {
      clearInterval(memoryCheckInterval);
    });
  }

  /**
   * Setup performance monitoring
   */
  setupPerformanceMonitoring() {
    // Monitor navigation performance
    performanceMonitor.monitorFrameRate((result) => {
      if (result.fps < 45) {
        console.warn('Low frame rate detected:', result);
      }
    });
    
    // Monitor touch responsiveness
    const navigationElements = document.querySelectorAll('.mobile-nav-link, .touch-feedback');
    navigationElements.forEach(element => {
      performanceMonitor.monitorTouchResponse(element);
    });
  }

  /**
   * Apply device-specific optimizations
   */
  applyDeviceSpecificOptimizations() {
    const deviceType = getDeviceType();
    const optimizations = this.deviceOptimizations[deviceType];
    
    // Apply device-specific CSS
    document.documentElement.setAttribute('data-device-type', deviceType);
    
    // Adjust animation settings
    if (deviceType === 'mobile') {
      // Reduce animation complexity on mobile
      document.documentElement.style.setProperty('--blur-amount', '2px');
      document.documentElement.style.setProperty('--shadow-complexity', '0 4px 6px rgba(0, 0, 0, 0.1)');
    } else {
      document.documentElement.style.setProperty('--blur-amount', '8px');
      document.documentElement.style.setProperty('--shadow-complexity', '0 10px 25px rgba(0, 0, 0, 0.15)');
    }
  }

  /**
   * Get optimization status
   */
  getStatus() {
    return {
      isOptimized: this.isOptimized,
      deviceType: getDeviceType(),
      touchDevice: isTouchDevice(),
      reducedMotion: prefersReducedMotion(),
      cleanupFunctions: this.cleanupFunctions.length,
    };
  }

  /**
   * Cleanup all optimizations
   */
  cleanup() {
    // Run all cleanup functions
    this.cleanupFunctions.forEach(cleanup => {
      try {
        cleanup();
      } catch (error) {
        console.error('Error during optimization cleanup:', error);
      }
    });
    
    // Clear arrays and reset state
    this.cleanupFunctions = [];
    this.isOptimized = false;
    
    // Cancel any pending animation frames
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
    
    // Clear timeouts
    clearTimeout(this.scrollTimeout);
    clearTimeout(this.scrollEndTimeout);
    
    console.log('Mobile navigation optimizations cleaned up');
  }
}

// Create singleton instance
const mobileNavigationOptimizer = new MobileNavigationOptimizer();

// Auto-initialize in production
if (process.env.NODE_ENV === 'production') {
  // Initialize after DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      mobileNavigationOptimizer.initialize();
    });
  } else {
    mobileNavigationOptimizer.initialize();
  }
}

export default mobileNavigationOptimizer;