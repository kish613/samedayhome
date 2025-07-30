import React, { useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Phone, ArrowRight } from 'lucide-react';
import { scrollToElement, triggerHapticFeedback, prefersReducedMotion, getAnimationDuration } from '../../utils/mobileUtils';

/**
 * MobileNavigationOverlay component provides full-screen mobile navigation
 * with smooth animations and touch-optimized interactions
 */
const MobileNavigationOverlay = ({ id, isOpen, onClose, className = '' }) => {
  const overlayRef = useRef(null);
  const firstLinkRef = useRef(null);
  const closeButtonRef = useRef(null);
  const navigationRefs = useRef([]);
  const phoneRef = useRef(null);

  // Navigation items matching the desktop navigation
  const navigationItems = [
    { href: '#how-it-works', label: 'How It Works' },
    { href: '#purchased-properties', label: 'Why Us' },
    { href: '#comparison', label: 'Compare' },
    { href: '#testimonials', label: 'Reviews' },
    { href: '#faq', label: 'FAQs' }
  ];

  // Handle navigation link clicks with haptic feedback
  const handleLinkClick = useCallback((href) => {
    // Provide haptic feedback for touch interactions
    triggerHapticFeedback('light');
    
    // Close the navigation overlay
    onClose();
    
    // Smooth scroll to the target section
    setTimeout(() => {
      const targetElement = document.querySelector(href);
      if (targetElement) {
        scrollToElement(targetElement, { behavior: 'smooth' });
      }
    }, getAnimationDuration(300)); // Wait for close animation to start
  }, [onClose]);

  // Handle backdrop click to close navigation with haptic feedback
  const handleBackdropClick = useCallback((e) => {
    if (e.target === overlayRef.current) {
      triggerHapticFeedback('light');
      onClose();
    }
  }, [onClose]);

  // Handle close button click with haptic feedback
  const handleCloseClick = useCallback(() => {
    triggerHapticFeedback('light');
    onClose();
  }, [onClose]);

  // Enhanced focus management for accessibility
  useEffect(() => {
    if (isOpen) {
      // Focus the close button when overlay opens for better accessibility
      setTimeout(() => {
        closeButtonRef.current?.focus();
      }, getAnimationDuration(300)); // Wait for animation to complete
    }
  }, [isOpen]);

  // Focus trap management
  const handleKeyDown = useCallback((e) => {
    if (!isOpen) return;

    const focusableElements = [
      closeButtonRef.current,
      ...navigationRefs.current.filter(Boolean),
      phoneRef.current
    ].filter(Boolean);

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (e.key === 'Tab') {
      if (e.shiftKey) {
        // Shift + Tab (backward)
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        // Tab (forward)
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    }
  }, [isOpen]);

  // Add keyboard event listener for focus trap
  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, handleKeyDown]);

  // Note: Escape key handling is managed by useMobileNavigation hook

  // Animation variants with reduced motion support
  const animationDuration = getAnimationDuration(300) / 1000; // Convert to seconds for framer-motion
  const reducedMotion = prefersReducedMotion();

  const overlayVariants = {
    hidden: {
      opacity: 0,
      transition: {
        duration: reducedMotion ? 0.1 : animationDuration,
        ease: 'easeInOut'
      }
    },
    visible: {
      opacity: 1,
      transition: {
        duration: reducedMotion ? 0.1 : animationDuration,
        ease: 'easeInOut'
      }
    }
  };

  const panelVariants = {
    hidden: {
      x: reducedMotion ? 0 : '100%',
      opacity: reducedMotion ? 0 : 1,
      scale: reducedMotion ? 0.95 : 1,
      transition: {
        duration: reducedMotion ? 0.15 : animationDuration,
        ease: reducedMotion ? 'easeOut' : 'easeInOut'
      }
    },
    visible: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: reducedMotion ? 0.15 : animationDuration,
        ease: reducedMotion ? 'easeOut' : 'easeInOut'
      }
    }
  };

  const linkVariants = {
    hidden: {
      opacity: reducedMotion ? 0 : 0,
      x: reducedMotion ? 0 : 20,
      y: reducedMotion ? 0 : 10
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: reducedMotion ? 0.1 : 0.3,
        ease: 'easeOut'
      }
    }
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reducedMotion ? 0 : 0.08,
        delayChildren: reducedMotion ? 0 : 0.15
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          id={id}
          ref={overlayRef}
          className={`fixed inset-0 z-50 xl:hidden ${className}`}
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={handleBackdropClick}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation menu"
          aria-describedby="nav-description"
        >
          {/* Backdrop with blur effect */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          
          {/* Navigation Panel */}
          <motion.div
            className="absolute right-0 top-0 h-full w-4/5 max-w-sm bg-white shadow-2xl border-l border-gray-200"
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {/* Header with close button */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 mobile-nav-header">
              <div>
                <h2 id="nav-title" className="text-lg font-semibold text-white">Navigation</h2>
                <p id="nav-description" className="text-sm text-blue-100 sr-only">
                  Use arrow keys to navigate, Enter to select, or Escape to close
                </p>
              </div>
              <button
                ref={closeButtonRef}
                onClick={handleCloseClick}
                className="p-3 rounded-full hover:bg-white/10 active:bg-white/20 transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-900 touch-feedback"
                aria-label="Close navigation menu"
                style={{ minWidth: '44px', minHeight: '44px' }}
              >
                <X className="h-6 w-6 text-white" />
              </button>
            </div>

            {/* Navigation Links */}
            <motion.nav
              className="flex flex-col py-4"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              role="navigation"
              aria-labelledby="nav-title"
            >
              {navigationItems.map((item, index) => (
                <motion.button
                  key={item.href}
                  ref={(el) => {
                    navigationRefs.current[index] = el;
                    if (index === 0) firstLinkRef.current = el;
                  }}
                  onClick={() => handleLinkClick(item.href)}
                  className="flex items-center px-6 py-4 text-left text-gray-700 hover:text-blue-900 hover:bg-blue-50 active:bg-blue-100 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-900 focus:ring-inset focus:bg-blue-50 nav-touch-feedback touch-ripple border-b border-gray-100 last:border-b-0 mobile-nav-link"
                  variants={linkVariants}
                  style={{ 
                    minHeight: '56px', // Increased for better touch targets
                    minWidth: '44px'
                  }}
                  aria-describedby={`nav-item-${index}-desc`}
                  role="menuitem"
                >
                  <div className="flex flex-col w-full">
                    <span className="font-medium text-lg leading-tight text-gray-900 mobile-text-min">{item.label}</span>
                    <span 
                      id={`nav-item-${index}-desc`} 
                      className="text-xs text-gray-500 sr-only"
                    >
                      Navigate to {item.label} section
                    </span>
                  </div>
                  <ArrowRight className="h-4 w-4 text-gray-400 ml-auto opacity-60" />
                </motion.button>
              ))}
            </motion.nav>

            {/* Contact Information */}
            <motion.div
              className="mt-auto p-6 border-t border-gray-200 mobile-nav-contact"
              variants={linkVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.4 }}
            >
              <div className="text-center">
                <div className="flex items-center justify-center space-x-3 text-blue-900 mb-2">
                  <Phone className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
                  <span className="text-sm font-medium text-blue-800">Need Help?</span>
                </div>
                <a
                  ref={phoneRef}
                  href="tel:03300437570"
                  className="inline-block font-bold text-xl text-blue-900 hover:text-blue-800 active:text-blue-900 transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-900 focus:ring-offset-2 rounded-lg px-4 py-2 touch-feedback bg-white shadow-sm hover:shadow-md"
                  style={{ minHeight: '44px', minWidth: '44px' }}
                  aria-label="Call us at 0330 043 7570 for immediate assistance"
                  onClick={() => triggerHapticFeedback('light')}
                >
                  0330 043 7570
                </a>
                <p className="text-sm text-blue-700 mt-2 font-medium" aria-hidden="true">
                  Call for immediate assistance
                </p>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileNavigationOverlay;