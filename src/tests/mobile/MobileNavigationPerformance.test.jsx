/**
 * Mobile Navigation Performance Tests
 * Tests for animation smoothness, touch responsiveness, and accessibility
 */

import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import userEvent from '@testing-library/user-event';
import MobileNavigationOverlay from '../../components/mobile/MobileNavigationOverlay.jsx';
import HamburgerButton from '../../components/mobile/HamburgerButton.jsx';
import { useMobileNavigation } from '../../hooks/useMobile.js';

// Mock framer-motion for performance testing
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }) => children,
}));

// Mock mobile utilities
vi.mock('../../utils/mobileUtils.js', () => ({
  triggerHapticFeedback: vi.fn(),
  scrollToElement: vi.fn(),
  prefersReducedMotion: vi.fn(() => false),
  getAnimationDuration: vi.fn((duration) => duration),
}));

// Performance monitoring utilities
const performanceMonitor = {
  startTime: 0,
  measurements: [],
  
  start() {
    this.startTime = performance.now();
  },
  
  end(label) {
    const duration = performance.now() - this.startTime;
    this.measurements.push({ label, duration });
    return duration;
  },
  
  getAverageDuration(label) {
    const measurements = this.measurements.filter(m => m.label === label);
    return measurements.reduce((sum, m) => sum + m.duration, 0) / measurements.length;
  },
  
  reset() {
    this.measurements = [];
  }
};

describe('Mobile Navigation Performance Tests', () => {
  let mockProps;
  
  beforeEach(() => {
    mockProps = {
      isOpen: false,
      onClose: vi.fn(),
      id: 'mobile-navigation-overlay'
    };
    
    performanceMonitor.reset();
    
    // Mock performance API
    global.performance = {
      now: vi.fn(() => Date.now()),
      mark: vi.fn(),
      measure: vi.fn(),
      getEntriesByType: vi.fn(() => []),
      getEntriesByName: vi.fn(() => []),
    };
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('Animation Performance', () => {
    it('should complete open animation within 300ms', async () => {
      const { rerender } = render(<MobileNavigationOverlay {...mockProps} />);
      
      performanceMonitor.start();
      
      // Trigger open animation
      rerender(<MobileNavigationOverlay {...mockProps} isOpen={true} />);
      
      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument();
      });
      
      const duration = performanceMonitor.end('open-animation');
      expect(duration).toBeLessThan(350); // Allow 50ms buffer
    });

    it('should complete close animation within 300ms', async () => {
      const { rerender } = render(<MobileNavigationOverlay {...mockProps} isOpen={true} />);
      
      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument();
      });
      
      performanceMonitor.start();
      
      // Trigger close animation
      rerender(<MobileNavigationOverlay {...mockProps} isOpen={false} />);
      
      const duration = performanceMonitor.end('close-animation');
      expect(duration).toBeLessThan(350); // Allow 50ms buffer
    });

    it('should handle rapid open/close cycles without performance degradation', async () => {
      const { rerender } = render(<MobileNavigationOverlay {...mockProps} />);
      
      const durations = [];
      
      // Test 5 rapid cycles
      for (let i = 0; i < 5; i++) {
        performanceMonitor.start();
        
        rerender(<MobileNavigationOverlay {...mockProps} isOpen={true} />);
        await waitFor(() => screen.getByRole('dialog'));
        
        rerender(<MobileNavigationOverlay {...mockProps} isOpen={false} />);
        
        durations.push(performanceMonitor.end(`cycle-${i}`));
      }
      
      // Each cycle should be consistent (no degradation)
      const avgDuration = durations.reduce((sum, d) => sum + d, 0) / durations.length;
      const maxDeviation = Math.max(...durations) - Math.min(...durations);
      
      expect(maxDeviation).toBeLessThan(avgDuration * 0.5); // Max 50% deviation
    });
  });

  describe('Touch Responsiveness', () => {
    it('should respond to touch events within 16ms (60fps)', async () => {
      const user = userEvent.setup();
      render(<HamburgerButton isOpen={false} onClick={mockProps.onClose} />);
      
      const button = screen.getByRole('button');
      
      performanceMonitor.start();
      
      await act(async () => {
        await user.click(button);
      });
      
      const duration = performanceMonitor.end('touch-response');
      expect(duration).toBeLessThan(16); // 60fps = 16.67ms per frame
    });

    it('should handle multiple rapid touches without lag', async () => {
      const user = userEvent.setup();
      render(<HamburgerButton isOpen={false} onClick={mockProps.onClose} />);
      
      const button = screen.getByRole('button');
      const touchDurations = [];
      
      // Simulate rapid touches
      for (let i = 0; i < 10; i++) {
        performanceMonitor.start();
        
        await act(async () => {
          await user.click(button);
        });
        
        touchDurations.push(performanceMonitor.end(`touch-${i}`));
      }
      
      // All touches should be responsive
      touchDurations.forEach(duration => {
        expect(duration).toBeLessThan(50); // Allow some variance for test environment
      });
    });

    it('should maintain touch target size of minimum 44px', () => {
      render(<HamburgerButton isOpen={false} onClick={mockProps.onClose} />);
      
      const button = screen.getByRole('button');
      const styles = window.getComputedStyle(button);
      
      expect(parseInt(styles.minWidth)).toBeGreaterThanOrEqual(44);
      expect(parseInt(styles.minHeight)).toBeGreaterThanOrEqual(44);
    });
  });

  describe('Memory Management', () => {
    it('should properly cleanup event listeners on unmount', () => {
      const addEventListenerSpy = vi.spyOn(document, 'addEventListener');
      const removeEventListenerSpy = vi.spyOn(document, 'removeEventListener');
      
      const { unmount } = render(<MobileNavigationOverlay {...mockProps} isOpen={true} />);
      
      const addedListeners = addEventListenerSpy.mock.calls.length;
      
      unmount();
      
      const removedListeners = removeEventListenerSpy.mock.calls.length;
      
      // Should remove at least as many listeners as added
      expect(removedListeners).toBeGreaterThanOrEqual(addedListeners);
    });

    it('should not create memory leaks with repeated mount/unmount', () => {
      const initialMemory = performance.memory?.usedJSHeapSize || 0;
      
      // Mount and unmount multiple times
      for (let i = 0; i < 100; i++) {
        const { unmount } = render(<MobileNavigationOverlay {...mockProps} isOpen={true} />);
        unmount();
      }
      
      // Force garbage collection if available
      if (global.gc) {
        global.gc();
      }
      
      const finalMemory = performance.memory?.usedJSHeapSize || 0;
      const memoryIncrease = finalMemory - initialMemory;
      
      // Memory increase should be minimal (less than 1MB)
      expect(memoryIncrease).toBeLessThan(1024 * 1024);
    });
  });

  describe('Accessibility Performance', () => {
    it('should announce state changes to screen readers quickly', async () => {
      const { rerender } = render(<MobileNavigationOverlay {...mockProps} />);
      
      performanceMonitor.start();
      
      rerender(<MobileNavigationOverlay {...mockProps} isOpen={true} />);
      
      await waitFor(() => {
        const dialog = screen.getByRole('dialog');
        expect(dialog).toHaveAttribute('aria-modal', 'true');
      });
      
      const duration = performanceMonitor.end('aria-update');
      expect(duration).toBeLessThan(100); // Screen reader updates should be immediate
    });

    it('should maintain focus management performance', async () => {
      render(<MobileNavigationOverlay {...mockProps} isOpen={true} />);
      
      const focusableElements = screen.getAllByRole('button');
      
      performanceMonitor.start();
      
      // Test focus cycling
      for (const element of focusableElements) {
        element.focus();
      }
      
      const duration = performanceMonitor.end('focus-cycle');
      expect(duration).toBeLessThan(50); // Focus changes should be immediate
    });

    it('should handle keyboard navigation without lag', async () => {
      const user = userEvent.setup();
      render(<MobileNavigationOverlay {...mockProps} isOpen={true} />);
      
      performanceMonitor.start();
      
      // Test Tab navigation
      await act(async () => {
        await user.keyboard('{Tab}{Tab}{Tab}');
      });
      
      const duration = performanceMonitor.end('keyboard-nav');
      expect(duration).toBeLessThan(100);
    });
  });

  describe('Device-Specific Performance', () => {
    it('should adapt animation duration for reduced motion preference', () => {
      const { prefersReducedMotion, getAnimationDuration } = require('../../utils/mobileUtils.js');
      
      // Mock reduced motion preference
      prefersReducedMotion.mockReturnValue(true);
      getAnimationDuration.mockReturnValue(0);
      
      render(<MobileNavigationOverlay {...mockProps} isOpen={true} />);
      
      expect(getAnimationDuration).toHaveBeenCalledWith(300);
    });

    it('should handle low-end device performance gracefully', async () => {
      // Mock slow device by adding artificial delay
      const originalRAF = window.requestAnimationFrame;
      window.requestAnimationFrame = (callback) => {
        setTimeout(callback, 32); // Simulate 30fps instead of 60fps
      };
      
      const { rerender } = render(<MobileNavigationOverlay {...mockProps} />);
      
      performanceMonitor.start();
      
      rerender(<MobileNavigationOverlay {...mockProps} isOpen={true} />);
      
      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument();
      });
      
      const duration = performanceMonitor.end('slow-device');
      
      // Should still complete within reasonable time even on slow devices
      expect(duration).toBeLessThan(1000);
      
      // Restore original RAF
      window.requestAnimationFrame = originalRAF;
    });
  });

  describe('Network Performance', () => {
    it('should not make unnecessary network requests during navigation', () => {
      const fetchSpy = vi.spyOn(global, 'fetch');
      
      const { rerender } = render(<MobileNavigationOverlay {...mockProps} />);
      
      // Open and close navigation multiple times
      rerender(<MobileNavigationOverlay {...mockProps} isOpen={true} />);
      rerender(<MobileNavigationOverlay {...mockProps} isOpen={false} />);
      rerender(<MobileNavigationOverlay {...mockProps} isOpen={true} />);
      
      expect(fetchSpy).not.toHaveBeenCalled();
    });

    it('should handle offline scenarios gracefully', () => {
      // Mock offline state
      Object.defineProperty(navigator, 'onLine', {
        writable: true,
        value: false,
      });
      
      expect(() => {
        render(<MobileNavigationOverlay {...mockProps} isOpen={true} />);
      }).not.toThrow();
      
      // Restore online state
      Object.defineProperty(navigator, 'onLine', {
        writable: true,
        value: true,
      });
    });
  });
});

describe('Mobile Navigation Hook Performance', () => {
  it('should handle state updates efficiently', () => {
    const TestComponent = () => {
      const { navState, toggleNav } = useMobileNavigation();
      return (
        <div>
          <span data-testid="nav-state">{navState.isOpen.toString()}</span>
          <button onClick={toggleNav}>Toggle</button>
        </div>
      );
    };
    
    const { rerender } = render(<TestComponent />);
    
    performanceMonitor.start();
    
    // Multiple rapid state changes
    for (let i = 0; i < 10; i++) {
      fireEvent.click(screen.getByRole('button'));
      rerender(<TestComponent />);
    }
    
    const duration = performanceMonitor.end('hook-updates');
    expect(duration).toBeLessThan(100);
  });
});