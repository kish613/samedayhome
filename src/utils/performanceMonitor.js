/**
 * Performance monitoring utilities for mobile navigation
 * Tracks animation performance, touch responsiveness, and memory usage
 */

class PerformanceMonitor {
  constructor() {
    this.measurements = new Map();
    this.observers = new Map();
    this.isEnabled = 'performance' in window;
    this.thresholds = {
      animation: 16.67, // 60fps
      touch: 100, // Touch response should be under 100ms
      memory: 50 * 1024 * 1024, // 50MB memory threshold
      paint: 1000, // First paint should be under 1s
    };
  }

  /**
   * Start measuring a performance metric
   */
  startMeasurement(name) {
    if (!this.isEnabled) return;
    
    const measurement = {
      name,
      startTime: performance.now(),
      startMemory: this.getMemoryUsage(),
    };
    
    this.measurements.set(name, measurement);
    
    // Mark the start for Performance API
    performance.mark(`${name}-start`);
  }

  /**
   * End measuring a performance metric
   */
  endMeasurement(name) {
    if (!this.isEnabled || !this.measurements.has(name)) return null;
    
    const measurement = this.measurements.get(name);
    const endTime = performance.now();
    const endMemory = this.getMemoryUsage();
    
    const result = {
      name,
      duration: endTime - measurement.startTime,
      memoryDelta: endMemory - measurement.startMemory,
      timestamp: endTime,
    };
    
    // Mark the end and measure for Performance API
    performance.mark(`${name}-end`);
    performance.measure(name, `${name}-start`, `${name}-end`);
    
    // Check against thresholds
    this.checkThreshold(result);
    
    // Clean up
    this.measurements.delete(name);
    
    return result;
  }

  /**
   * Get current memory usage
   */
  getMemoryUsage() {
    if ('memory' in performance) {
      return performance.memory.usedJSHeapSize;
    }
    return 0;
  }

  /**
   * Check if measurement exceeds threshold
   */
  checkThreshold(result) {
    const threshold = this.thresholds[result.name.split('-')[0]];
    
    if (threshold && result.duration > threshold) {
      console.warn(`Performance threshold exceeded for ${result.name}:`, {
        duration: `${result.duration.toFixed(2)}ms`,
        threshold: `${threshold}ms`,
        memoryDelta: `${(result.memoryDelta / 1024 / 1024).toFixed(2)}MB`,
      });
    }
  }

  /**
   * Monitor animation frame rate
   */
  monitorFrameRate(callback, duration = 1000) {
    if (!this.isEnabled) return;
    
    let frames = 0;
    let lastTime = performance.now();
    const startTime = lastTime;
    
    const countFrame = (currentTime) => {
      frames++;
      
      if (currentTime - startTime < duration) {
        requestAnimationFrame(countFrame);
      } else {
        const fps = Math.round((frames * 1000) / (currentTime - startTime));
        callback({ fps, frames, duration: currentTime - startTime });
      }
    };
    
    requestAnimationFrame(countFrame);
  }

  /**
   * Monitor touch responsiveness
   */
  monitorTouchResponse(element) {
    if (!element || !this.isEnabled) return;
    
    const touchStartHandler = (e) => {
      this.startMeasurement('touch-response');
    };
    
    const touchEndHandler = (e) => {
      const result = this.endMeasurement('touch-response');
      if (result && result.duration > this.thresholds.touch) {
        console.warn('Slow touch response detected:', result);
      }
    };
    
    element.addEventListener('touchstart', touchStartHandler, { passive: true });
    element.addEventListener('touchend', touchEndHandler, { passive: true });
    
    // Return cleanup function
    return () => {
      element.removeEventListener('touchstart', touchStartHandler);
      element.removeEventListener('touchend', touchEndHandler);
    };
  }

  /**
   * Monitor scroll performance
   */
  monitorScrollPerformance() {
    if (!this.isEnabled) return;
    
    let isScrolling = false;
    let scrollStartTime = 0;
    
    const scrollHandler = () => {
      if (!isScrolling) {
        isScrolling = true;
        scrollStartTime = performance.now();
        this.startMeasurement('scroll-performance');
      }
      
      // Debounce scroll end detection
      clearTimeout(this.scrollTimeout);
      this.scrollTimeout = setTimeout(() => {
        isScrolling = false;
        const result = this.endMeasurement('scroll-performance');
        
        if (result && result.duration > 16.67) {
          console.warn('Janky scroll detected:', result);
        }
      }, 150);
    };
    
    window.addEventListener('scroll', scrollHandler, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', scrollHandler);
      clearTimeout(this.scrollTimeout);
    };
  }

  /**
   * Monitor memory leaks
   */
  monitorMemoryLeaks(interval = 5000) {
    if (!this.isEnabled || !('memory' in performance)) return;
    
    const memoryHistory = [];
    
    const checkMemory = () => {
      const currentMemory = this.getMemoryUsage();
      memoryHistory.push({
        timestamp: Date.now(),
        memory: currentMemory,
      });
      
      // Keep only last 10 measurements
      if (memoryHistory.length > 10) {
        memoryHistory.shift();
      }
      
      // Check for memory growth trend
      if (memoryHistory.length >= 5) {
        const trend = this.calculateMemoryTrend(memoryHistory);
        if (trend > this.thresholds.memory) {
          console.warn('Potential memory leak detected:', {
            trend: `${(trend / 1024 / 1024).toFixed(2)}MB/check`,
            current: `${(currentMemory / 1024 / 1024).toFixed(2)}MB`,
          });
        }
      }
    };
    
    const intervalId = setInterval(checkMemory, interval);
    
    return () => clearInterval(intervalId);
  }

  /**
   * Calculate memory usage trend
   */
  calculateMemoryTrend(history) {
    if (history.length < 2) return 0;
    
    const recent = history.slice(-5);
    const oldest = recent[0];
    const newest = recent[recent.length - 1];
    
    return (newest.memory - oldest.memory) / recent.length;
  }

  /**
   * Monitor paint performance
   */
  monitorPaintPerformance() {
    if (!this.isEnabled) return;
    
    // Monitor First Paint and First Contentful Paint
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      
      entries.forEach((entry) => {
        if (entry.name === 'first-paint' || entry.name === 'first-contentful-paint') {
          if (entry.startTime > this.thresholds.paint) {
            console.warn(`Slow ${entry.name}:`, {
              time: `${entry.startTime.toFixed(2)}ms`,
              threshold: `${this.thresholds.paint}ms`,
            });
          }
        }
      });
    });
    
    observer.observe({ entryTypes: ['paint'] });
    
    return () => observer.disconnect();
  }

  /**
   * Monitor Long Tasks (blocking main thread)
   */
  monitorLongTasks() {
    if (!this.isEnabled || !('PerformanceObserver' in window)) return;
    
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      
      entries.forEach((entry) => {
        console.warn('Long task detected:', {
          duration: `${entry.duration.toFixed(2)}ms`,
          startTime: `${entry.startTime.toFixed(2)}ms`,
          name: entry.name,
        });
      });
    });
    
    try {
      observer.observe({ entryTypes: ['longtask'] });
      return () => observer.disconnect();
    } catch (e) {
      console.warn('Long task monitoring not supported');
      return () => {};
    }
  }

  /**
   * Get performance summary
   */
  getPerformanceSummary() {
    if (!this.isEnabled) return null;
    
    const navigation = performance.getEntriesByType('navigation')[0];
    const paint = performance.getEntriesByType('paint');
    const measures = performance.getEntriesByType('measure');
    
    return {
      navigation: navigation ? {
        domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
        loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
        domInteractive: navigation.domInteractive - navigation.navigationStart,
      } : null,
      paint: paint.reduce((acc, entry) => {
        acc[entry.name] = entry.startTime;
        return acc;
      }, {}),
      customMeasures: measures.map(measure => ({
        name: measure.name,
        duration: measure.duration,
      })),
      memory: this.getMemoryUsage(),
    };
  }

  /**
   * Export performance data
   */
  exportData() {
    const summary = this.getPerformanceSummary();
    const data = {
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight,
      },
      connection: this.getConnectionInfo(),
      performance: summary,
    };
    
    return JSON.stringify(data, null, 2);
  }

  /**
   * Get connection information
   */
  getConnectionInfo() {
    if ('connection' in navigator) {
      const conn = navigator.connection;
      return {
        effectiveType: conn.effectiveType,
        downlink: conn.downlink,
        rtt: conn.rtt,
        saveData: conn.saveData,
      };
    }
    return null;
  }

  /**
   * Clear all measurements and observers
   */
  cleanup() {
    this.measurements.clear();
    this.observers.forEach(cleanup => cleanup());
    this.observers.clear();
    
    // Clear performance marks and measures
    if (this.isEnabled) {
      performance.clearMarks();
      performance.clearMeasures();
    }
  }
}

// Create singleton instance
const performanceMonitor = new PerformanceMonitor();

// Auto-start monitoring in development
if (process.env.NODE_ENV === 'development') {
  // Monitor paint performance
  performanceMonitor.monitorPaintPerformance();
  
  // Monitor long tasks
  performanceMonitor.monitorLongTasks();
  
  // Monitor memory leaks
  performanceMonitor.monitorMemoryLeaks();
  
  // Monitor scroll performance
  performanceMonitor.monitorScrollPerformance();
}

export default performanceMonitor;

// Export individual functions for testing
export {
  PerformanceMonitor,
};