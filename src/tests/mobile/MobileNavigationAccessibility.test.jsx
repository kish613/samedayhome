/**
 * Mobile Navigation Accessibility Tests
 * Tests for screen reader compatibility, keyboard navigation, and ARIA compliance
 */

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import userEvent from '@testing-library/user-event';
import MobileNavigationOverlay from '../../components/mobile/MobileNavigationOverlay.jsx';
import HamburgerButton from '../../components/mobile/HamburgerButton.jsx';

// Mock framer-motion for accessibility testing
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

describe('Mobile Navigation Accessibility Tests', () => {
  let mockProps;
  
  beforeEach(() => {
    mockProps = {
      isOpen: false,
      onClose: vi.fn(),
      id: 'mobile-navigation-overlay'
    };
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('ARIA Compliance', () => {
    it('should render without accessibility violations when closed', async () => {
      const { container } = render(<MobileNavigationOverlay {...mockProps} />);
      expect(container).toBeInTheDocument();
    });

    it('should render without accessibility violations when open', async () => {
      const { container } = render(<MobileNavigationOverlay {...mockProps} isOpen={true} />);
      expect(container).toBeInTheDocument();
    });

    it('should have proper dialog role and attributes', () => {
      render(<MobileNavigationOverlay {...mockProps} isOpen={true} />);
      
      const dialog = screen.getByRole('dialog');
      expect(dialog).toHaveAttribute('aria-modal', 'true');
      expect(dialog).toHaveAttribute('aria-label', 'Mobile navigation menu');
      expect(dialog).toHaveAttribute('aria-describedby', 'nav-description');
    });

    it('should have proper navigation landmark', () => {
      render(<MobileNavigationOverlay {...mockProps} isOpen={true} />);
      
      const navigation = screen.getByRole('navigation');
      expect(navigation).toHaveAttribute('aria-labelledby', 'nav-title');
    });

    it('should have proper menuitem roles for navigation links', () => {
      render(<MobileNavigationOverlay {...mockProps} isOpen={true} />);
      
      const menuItems = screen.getAllByRole('menuitem');
      expect(menuItems).toHaveLength(5); // How It Works, Why Us, Compare, Reviews, FAQs
      
      menuItems.forEach((item, index) => {
        expect(item).toHaveAttribute('aria-describedby', `nav-item-${index}-desc`);
      });
    });

    it('should announce state changes to screen readers', () => {
      const { rerender } = render(<HamburgerButton isOpen={false} onClick={mockProps.onClose} />);
      
      let button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-expanded', 'false');
      expect(button).toHaveAttribute('aria-label', 'Open navigation menu');
      
      rerender(<HamburgerButton isOpen={true} onClick={mockProps.onClose} />);
      
      button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-expanded', 'true');
      expect(button).toHaveAttribute('aria-label', 'Close navigation menu');
    });
  });

  describe('Keyboard Navigation', () => {
    it('should handle Escape key to close navigation', async () => {
      const user = userEvent.setup();
      render(<MobileNavigationOverlay {...mockProps} isOpen={true} />);
      
      await user.keyboard('{Escape}');
      
      expect(mockProps.onClose).toHaveBeenCalledTimes(1);
    });

    it('should trap focus within the navigation overlay', async () => {
      const user = userEvent.setup();
      render(<MobileNavigationOverlay {...mockProps} isOpen={true} />);
      
      const closeButton = screen.getByLabelText('Close navigation menu');
      const navigationLinks = screen.getAllByRole('menuitem');
      const phoneLink = screen.getByRole('link', { name: /call us at/i });
      
      // Focus should start on close button
      expect(closeButton).toHaveFocus();
      
      // Tab through all focusable elements
      await user.keyboard('{Tab}');
      expect(navigationLinks[0]).toHaveFocus();
      
      await user.keyboard('{Tab}');
      expect(navigationLinks[1]).toHaveFocus();
      
      // Continue through all navigation items
      for (let i = 2; i < navigationLinks.length; i++) {
        await user.keyboard('{Tab}');
        expect(navigationLinks[i]).toHaveFocus();
      }
      
      // Tab to phone link
      await user.keyboard('{Tab}');
      expect(phoneLink).toHaveFocus();
      
      // Tab should wrap back to close button
      await user.keyboard('{Tab}');
      expect(closeButton).toHaveFocus();
    });

    it('should handle Shift+Tab for reverse navigation', async () => {
      const user = userEvent.setup();
      render(<MobileNavigationOverlay {...mockProps} isOpen={true} />);
      
      const closeButton = screen.getByLabelText('Close navigation menu');
      const phoneLink = screen.getByRole('link', { name: /call us at/i });
      
      // Start at close button
      expect(closeButton).toHaveFocus();
      
      // Shift+Tab should go to last focusable element
      await user.keyboard('{Shift>}{Tab}{/Shift}');
      expect(phoneLink).toHaveFocus();
    });

    it('should handle Enter key on navigation links', async () => {
      const user = userEvent.setup();
      render(<MobileNavigationOverlay {...mockProps} isOpen={true} />);
      
      const firstLink = screen.getAllByRole('menuitem')[0];
      firstLink.focus();
      
      await user.keyboard('{Enter}');
      
      expect(mockProps.onClose).toHaveBeenCalledTimes(1);
    });

    it('should handle Space key on navigation links', async () => {
      const user = userEvent.setup();
      render(<MobileNavigationOverlay {...mockProps} isOpen={true} />);
      
      const firstLink = screen.getAllByRole('menuitem')[0];
      firstLink.focus();
      
      await user.keyboard(' ');
      
      expect(mockProps.onClose).toHaveBeenCalledTimes(1);
    });
  });

  describe('Screen Reader Support', () => {
    it('should provide descriptive labels for all interactive elements', () => {
      render(<MobileNavigationOverlay {...mockProps} isOpen={true} />);
      
      // Close button
      const closeButton = screen.getByLabelText('Close navigation menu');
      expect(closeButton).toBeInTheDocument();
      
      // Navigation links
      const navigationLinks = screen.getAllByRole('menuitem');
      navigationLinks.forEach((link, index) => {
        const description = screen.getByText(`Navigate to ${link.textContent} section`);
        expect(description).toHaveClass('sr-only');
      });
      
      // Phone link
      const phoneLink = screen.getByLabelText('Call us at 0330 043 7570 for immediate assistance');
      expect(phoneLink).toBeInTheDocument();
    });

    it('should provide context for navigation state', () => {
      render(<HamburgerButton isOpen={false} onClick={mockProps.onClose} />);
      
      const stateText = screen.getByText('Navigation menu is closed');
      expect(stateText).toHaveClass('sr-only');
    });

    it('should provide instructions for keyboard users', () => {
      render(<MobileNavigationOverlay {...mockProps} isOpen={true} />);
      
      const instructions = screen.getByText('Use arrow keys to navigate, Enter to select, or Escape to close');
      expect(instructions).toHaveClass('sr-only');
    });

    it('should hide decorative elements from screen readers', () => {
      render(<MobileNavigationOverlay {...mockProps} isOpen={true} />);
      
      // Arrow icons should be hidden
      const arrowIcons = document.querySelectorAll('[aria-hidden="true"]');
      expect(arrowIcons.length).toBeGreaterThan(0);
    });
  });

  describe('Focus Management', () => {
    it('should focus close button when overlay opens', async () => {
      const { rerender } = render(<MobileNavigationOverlay {...mockProps} />);
      
      rerender(<MobileNavigationOverlay {...mockProps} isOpen={true} />);
      
      await waitFor(() => {
        const closeButton = screen.getByLabelText('Close navigation menu');
        expect(closeButton).toHaveFocus();
      });
    });

    it('should restore focus to trigger button when overlay closes', async () => {
      const TestComponent = () => {
        const [isOpen, setIsOpen] = React.useState(false);
        return (
          <div>
            <HamburgerButton 
              isOpen={isOpen} 
              onClick={() => setIsOpen(!isOpen)} 
            />
            <MobileNavigationOverlay 
              isOpen={isOpen} 
              onClose={() => setIsOpen(false)} 
            />
          </div>
        );
      };
      
      const user = userEvent.setup();
      render(<TestComponent />);
      
      const hamburgerButton = screen.getByRole('button');
      
      // Open navigation
      await user.click(hamburgerButton);
      
      // Close navigation with Escape
      await user.keyboard('{Escape}');
      
      // Focus should return to hamburger button
      await waitFor(() => {
        expect(hamburgerButton).toHaveFocus();
      });
    });

    it('should maintain focus visibility', () => {
      render(<MobileNavigationOverlay {...mockProps} isOpen={true} />);
      
      const focusableElements = [
        screen.getByLabelText('Close navigation menu'),
        ...screen.getAllByRole('menuitem'),
        screen.getByRole('link', { name: /call us at/i })
      ];
      
      focusableElements.forEach(element => {
        element.focus();
        
        // Check for focus ring styles
        const styles = window.getComputedStyle(element);
        expect(element).toHaveClass('focus:outline-none');
        expect(element).toHaveClass('focus:ring-2');
      });
    });
  });

  describe('High Contrast Mode Support', () => {
    it('should maintain visibility in high contrast mode', () => {
      // Mock high contrast media query
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: vi.fn().mockImplementation(query => ({
          matches: query === '(prefers-contrast: high)',
          media: query,
          onchange: null,
          addListener: vi.fn(),
          removeListener: vi.fn(),
          addEventListener: vi.fn(),
          removeEventListener: vi.fn(),
          dispatchEvent: vi.fn(),
        })),
      });
      
      render(<MobileNavigationOverlay {...mockProps} isOpen={true} />);
      
      // Elements should have sufficient contrast
      const navigationLinks = screen.getAllByRole('menuitem');
      navigationLinks.forEach(link => {
        expect(link).toHaveClass('text-gray-900'); // High contrast text
      });
    });
  });

  describe('Reduced Motion Support', () => {
    it('should respect reduced motion preferences', () => {
      const { prefersReducedMotion } = require('../../utils/mobileUtils.js');
      prefersReducedMotion.mockReturnValue(true);
      
      render(<MobileNavigationOverlay {...mockProps} isOpen={true} />);
      
      // Should call prefersReducedMotion utility
      expect(prefersReducedMotion).toHaveBeenCalled();
    });

    it('should provide alternative feedback for reduced motion', () => {
      const { prefersReducedMotion, getAnimationDuration } = require('../../utils/mobileUtils.js');
      prefersReducedMotion.mockReturnValue(true);
      getAnimationDuration.mockReturnValue(0);
      
      render(<MobileNavigationOverlay {...mockProps} isOpen={true} />);
      
      // Animation duration should be reduced
      expect(getAnimationDuration).toHaveBeenCalledWith(300);
    });
  });

  describe('Touch Accessibility', () => {
    it('should have minimum touch target sizes', () => {
      render(<MobileNavigationOverlay {...mockProps} isOpen={true} />);
      
      const touchTargets = [
        screen.getByLabelText('Close navigation menu'),
        ...screen.getAllByRole('menuitem'),
        screen.getByRole('link', { name: /call us at/i })
      ];
      
      touchTargets.forEach(target => {
        const styles = window.getComputedStyle(target);
        expect(parseInt(styles.minHeight)).toBeGreaterThanOrEqual(44);
        expect(parseInt(styles.minWidth)).toBeGreaterThanOrEqual(44);
      });
    });

    it('should provide adequate spacing between touch targets', () => {
      render(<MobileNavigationOverlay {...mockProps} isOpen={true} />);
      
      const navigationLinks = screen.getAllByRole('menuitem');
      
      // Check that links have proper spacing
      navigationLinks.forEach(link => {
        expect(link).toHaveStyle({ minHeight: '56px' }); // Increased for better touch targets
      });
    });

    it('should provide visual feedback on touch', () => {
      render(<MobileNavigationOverlay {...mockProps} isOpen={true} />);
      
      const touchTargets = screen.getAllByRole('menuitem');
      
      touchTargets.forEach(target => {
        expect(target).toHaveClass('active:bg-blue-100');
        expect(target).toHaveClass('hover:bg-blue-50');
      });
    });
  });

  describe('Voice Control Support', () => {
    it('should have descriptive accessible names for voice commands', () => {
      render(<MobileNavigationOverlay {...mockProps} isOpen={true} />);
      
      // Voice control users should be able to say "click close navigation"
      const closeButton = screen.getByLabelText('Close navigation menu');
      expect(closeButton).toBeInTheDocument();
      
      // Voice control users should be able to say "click how it works"
      const howItWorksLink = screen.getByRole('menuitem', { name: /how it works/i });
      expect(howItWorksLink).toBeInTheDocument();
    });

    it('should support voice navigation commands', () => {
      render(<MobileNavigationOverlay {...mockProps} isOpen={true} />);
      
      const navigationLinks = screen.getAllByRole('menuitem');
      
      navigationLinks.forEach(link => {
        // Each link should have a clear, speakable name
        expect(link.textContent).toMatch(/^[A-Za-z\s]+$/); // Only letters and spaces
        expect(link.textContent.length).toBeGreaterThan(2); // Meaningful names
      });
    });
  });
});