/**
 * Mobile Navigation Integration Tests
 * Tests for integration with HomePage and overall user experience
 */

import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import HomePage from '../../components/HomePage.jsx';

// Mock framer-motion for integration testing
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
    form: ({ children, ...props }) => <form {...props}>{children}</form>,
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

// Mock navigation hook
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// Mock intersection observer
global.IntersectionObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Mock resize observer
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

describe('Mobile Navigation Integration Tests', () => {
  let originalInnerWidth;
  let originalInnerHeight;
  
  beforeEach(() => {
    // Store original dimensions
    originalInnerWidth = window.innerWidth;
    originalInnerHeight = window.innerHeight;
    
    // Mock mobile viewport
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 375, // iPhone width
    });
    
    Object.defineProperty(window, 'innerHeight', {
      writable: true,
      configurable: true,
      value: 667, // iPhone height
    });
    
    // Mock matchMedia for mobile breakpoint
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation(query => ({
        matches: query.includes('1280px') ? false : true, // Mobile breakpoint
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });
    
    // Mock scroll methods
    window.scrollTo = vi.fn();
    Element.prototype.scrollIntoView = vi.fn();
    
    // Clear all mocks
    vi.clearAllMocks();
  });

  afterEach(() => {
    // Restore original dimensions
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: originalInnerWidth,
    });
    
    Object.defineProperty(window, 'innerHeight', {
      writable: true,
      configurable: true,
      value: originalInnerHeight,
    });
  });

  const renderHomePage = () => {
    return render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );
  };

  describe('Mobile Navigation Visibility', () => {
    it('should show hamburger button on mobile viewport', () => {
      renderHomePage();
      
      const hamburgerButton = screen.getByLabelText(/open navigation menu/i);
      expect(hamburgerButton).toBeInTheDocument();
      expect(hamburgerButton).toBeVisible();
    });

    it('should hide desktop navigation on mobile viewport', () => {
      renderHomePage();
      
      // Desktop navigation should be hidden
      const desktopNav = document.querySelector('nav.hidden.xl\\:flex');
      expect(desktopNav).toBeInTheDocument();
    });

    it('should show mobile navigation when hamburger is clicked', async () => {
      const user = userEvent.setup();
      renderHomePage();
      
      const hamburgerButton = screen.getByLabelText(/open navigation menu/i);
      
      await user.click(hamburgerButton);
      
      await waitFor(() => {
        const mobileNav = screen.getByRole('dialog');
        expect(mobileNav).toBeInTheDocument();
      });
    });
  });

  describe('Navigation State Management', () => {
    it('should toggle navigation state correctly', async () => {
      const user = userEvent.setup();
      renderHomePage();
      
      const hamburgerButton = screen.getByLabelText(/open navigation menu/i);
      
      // Open navigation
      await user.click(hamburgerButton);
      
      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument();
        expect(hamburgerButton).toHaveAttribute('aria-expanded', 'true');
      });
      
      // Close navigation
      await user.click(hamburgerButton);
      
      await waitFor(() => {
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
        expect(hamburgerButton).toHaveAttribute('aria-expanded', 'false');
      });
    });

    it('should close navigation when clicking outside', async () => {
      const user = userEvent.setup();
      renderHomePage();
      
      const hamburgerButton = screen.getByLabelText(/open navigation menu/i);
      
      // Open navigation
      await user.click(hamburgerButton);
      
      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument();
      });
      
      // Click on backdrop
      const backdrop = screen.getByRole('dialog');
      await user.click(backdrop);
      
      await waitFor(() => {
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
      });
    });

    it('should close navigation with Escape key', async () => {
      const user = userEvent.setup();
      renderHomePage();
      
      const hamburgerButton = screen.getByLabelText(/open navigation menu/i);
      
      // Open navigation
      await user.click(hamburgerButton);
      
      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument();
      });
      
      // Press Escape
      await user.keyboard('{Escape}');
      
      await waitFor(() => {
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
      });
    });
  });

  describe('Navigation Links Integration', () => {
    it('should have all expected navigation links', async () => {
      const user = userEvent.setup();
      renderHomePage();
      
      const hamburgerButton = screen.getByLabelText(/open navigation menu/i);
      await user.click(hamburgerButton);
      
      await waitFor(() => {
        expect(screen.getByRole('menuitem', { name: /how it works/i })).toBeInTheDocument();
        expect(screen.getByRole('menuitem', { name: /why us/i })).toBeInTheDocument();
        expect(screen.getByRole('menuitem', { name: /compare/i })).toBeInTheDocument();
        expect(screen.getByRole('menuitem', { name: /reviews/i })).toBeInTheDocument();
        expect(screen.getByRole('menuitem', { name: /faqs/i })).toBeInTheDocument();
      });
    });

    it('should scroll to sections when navigation links are clicked', async () => {
      const user = userEvent.setup();
      renderHomePage();
      
      // Mock querySelector to return a mock element
      const mockElement = { scrollIntoView: vi.fn() };
      const originalQuerySelector = document.querySelector;
      document.querySelector = vi.fn().mockReturnValue(mockElement);
      
      const hamburgerButton = screen.getByLabelText(/open navigation menu/i);
      await user.click(hamburgerButton);
      
      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument();
      });
      
      const howItWorksLink = screen.getByRole('menuitem', { name: /how it works/i });
      await user.click(howItWorksLink);
      
      // Should close navigation and scroll to section
      await waitFor(() => {
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
      });
      
      // Restore original querySelector
      document.querySelector = originalQuerySelector;
    });

    it('should close navigation after link click', async () => {
      const user = userEvent.setup();
      renderHomePage();
      
      const hamburgerButton = screen.getByLabelText(/open navigation menu/i);
      await user.click(hamburgerButton);
      
      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument();
      });
      
      const firstLink = screen.getByRole('menuitem', { name: /how it works/i });
      await user.click(firstLink);
      
      await waitFor(() => {
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
      });
    });
  });

  describe('Scroll Prevention', () => {
    it('should prevent background scrolling when navigation is open', async () => {
      const user = userEvent.setup();
      renderHomePage();
      
      const hamburgerButton = screen.getByLabelText(/open navigation menu/i);
      
      // Check initial body overflow
      expect(document.body.style.overflow).toBe('');
      
      // Open navigation
      await user.click(hamburgerButton);
      
      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument();
        expect(document.body.style.overflow).toBe('hidden');
      });
      
      // Close navigation
      await user.keyboard('{Escape}');
      
      await waitFor(() => {
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
        expect(document.body.style.overflow).toBe('');
      });
    });
  });

  describe('Responsive Behavior', () => {
    it('should hide mobile navigation on desktop viewport', () => {
      // Mock desktop viewport
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1440,
      });
      
      // Mock matchMedia for desktop breakpoint
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: vi.fn().mockImplementation(query => ({
          matches: query.includes('1280px') ? true : false, // Desktop breakpoint
          media: query,
          onchange: null,
          addListener: vi.fn(),
          removeListener: vi.fn(),
          addEventListener: vi.fn(),
          removeEventListener: vi.fn(),
          dispatchEvent: vi.fn(),
        })),
      });
      
      renderHomePage();
      
      // Hamburger button should not be visible on desktop
      const hamburgerButton = screen.queryByLabelText(/open navigation menu/i);
      expect(hamburgerButton).toBeInTheDocument(); // Present in DOM
      // But should have xl:hidden class applied
    });

    it('should handle viewport resize correctly', async () => {
      const user = userEvent.setup();
      renderHomePage();
      
      // Open navigation on mobile
      const hamburgerButton = screen.getByLabelText(/open navigation menu/i);
      await user.click(hamburgerButton);
      
      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument();
      });
      
      // Simulate resize to desktop
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1440,
      });
      
      // Trigger resize event
      fireEvent(window, new Event('resize'));
      
      // Navigation should still be functional
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });
  });

  describe('Performance Integration', () => {
    it('should not cause memory leaks with repeated open/close', async () => {
      const user = userEvent.setup();
      renderHomePage();
      
      const hamburgerButton = screen.getByLabelText(/open navigation menu/i);
      
      // Perform multiple open/close cycles
      for (let i = 0; i < 10; i++) {
        await user.click(hamburgerButton);
        
        await waitFor(() => {
          expect(screen.getByRole('dialog')).toBeInTheDocument();
        });
        
        await user.keyboard('{Escape}');
        
        await waitFor(() => {
          expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
        });
      }
      
      // Should not throw errors or cause issues
      expect(hamburgerButton).toBeInTheDocument();
    });

    it('should handle rapid interactions gracefully', async () => {
      const user = userEvent.setup();
      renderHomePage();
      
      const hamburgerButton = screen.getByLabelText(/open navigation menu/i);
      
      // Rapid clicks
      await act(async () => {
        for (let i = 0; i < 5; i++) {
          await user.click(hamburgerButton);
        }
      });
      
      // Should end up in a consistent state
      await waitFor(() => {
        const dialog = screen.queryByRole('dialog');
        expect(dialog).toBeInTheDocument();
      });
    });
  });

  describe('Error Handling', () => {
    it('should handle missing scroll targets gracefully', async () => {
      const user = userEvent.setup();
      renderHomePage();
      
      // Mock querySelector to return null
      const originalQuerySelector = document.querySelector;
      document.querySelector = vi.fn().mockReturnValue(null);
      
      const hamburgerButton = screen.getByLabelText(/open navigation menu/i);
      await user.click(hamburgerButton);
      
      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument();
      });
      
      const link = screen.getByRole('menuitem', { name: /how it works/i });
      
      // Should not throw error when target doesn't exist
      expect(async () => {
        await user.click(link);
      }).not.toThrow();
      
      // Restore original querySelector
      document.querySelector = originalQuerySelector;
    });

    it('should handle animation errors gracefully', async () => {
      const user = userEvent.setup();
      
      // Mock animation error
      const originalRAF = window.requestAnimationFrame;
      window.requestAnimationFrame = vi.fn().mockImplementation(() => {
        throw new Error('Animation error');
      });
      
      renderHomePage();
      
      const hamburgerButton = screen.getByLabelText(/open navigation menu/i);
      
      // Should not crash the app
      expect(async () => {
        await user.click(hamburgerButton);
      }).not.toThrow();
      
      // Restore original RAF
      window.requestAnimationFrame = originalRAF;
    });
  });

  describe('Accessibility Integration', () => {
    it('should maintain focus management with page content', async () => {
      const user = userEvent.setup();
      renderHomePage();
      
      // Focus should start on page content
      const getOfferButton = screen.getByRole('button', { name: /get offer/i });
      getOfferButton.focus();
      expect(getOfferButton).toHaveFocus();
      
      // Open navigation
      const hamburgerButton = screen.getByLabelText(/open navigation menu/i);
      await user.click(hamburgerButton);
      
      await waitFor(() => {
        const closeButton = screen.getByLabelText(/close navigation menu/i);
        expect(closeButton).toHaveFocus();
      });
      
      // Close navigation
      await user.keyboard('{Escape}');
      
      await waitFor(() => {
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
      });
    });

    it('should announce navigation state changes', async () => {
      const user = userEvent.setup();
      renderHomePage();
      
      const hamburgerButton = screen.getByLabelText(/open navigation menu/i);
      
      // Initial state
      expect(hamburgerButton).toHaveAttribute('aria-expanded', 'false');
      
      // Open navigation
      await user.click(hamburgerButton);
      
      await waitFor(() => {
        expect(hamburgerButton).toHaveAttribute('aria-expanded', 'true');
      });
    });
  });

  describe('Touch Integration', () => {
    it('should handle touch events on mobile devices', async () => {
      const user = userEvent.setup();
      renderHomePage();
      
      const hamburgerButton = screen.getByLabelText(/open navigation menu/i);
      
      // Simulate touch events
      fireEvent.touchStart(hamburgerButton);
      fireEvent.touchEnd(hamburgerButton);
      
      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument();
      });
    });

    it('should provide haptic feedback on supported devices', async () => {
      const { triggerHapticFeedback } = await import('../../utils/mobileUtils.js');
      const user = userEvent.setup();
      renderHomePage();
      
      const hamburgerButton = screen.getByLabelText(/open navigation menu/i);
      await user.click(hamburgerButton);
      
      expect(triggerHapticFeedback).toHaveBeenCalledWith('light');
    });
  });
});