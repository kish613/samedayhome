import React, { useCallback } from 'react';
import { triggerHapticFeedback } from '../../utils/mobileUtils';

const HamburgerButton = ({ isOpen, onClick, className = '' }) => {
  // Handle click with haptic feedback
  const handleClick = useCallback(() => {
    triggerHapticFeedback('light');
    onClick();
  }, [onClick]);

  return (
    <button
      onClick={handleClick}
      className={`
        relative flex items-center justify-center
        bg-transparent border-none cursor-pointer
        focus:outline-none focus:ring-2 focus:ring-blue-900 focus:ring-offset-2
        hover:bg-blue-50 active:bg-blue-100
        rounded-md transition-all duration-300 ease-in-out touch-feedback
        ${className}
      `}
      style={{ 
        minWidth: '44px', 
        minHeight: '44px',
        width: '44px',
        height: '44px'
      }}
      aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
      aria-expanded={isOpen}
      aria-controls="mobile-navigation-overlay"
      aria-haspopup="true"
      type="button"
    >
      <div 
        className="w-6 h-6 flex flex-col justify-center items-center"
        aria-hidden="true"
      >
        {/* Top line */}
        <span
          className={`
            block w-6 h-0.5 bg-blue-900 transition-all duration-300 ease-in-out
            ${isOpen 
              ? 'rotate-45 translate-y-1.5' 
              : 'rotate-0 translate-y-0'
            }
          `}
          style={{
            transformOrigin: 'center'
          }}
        />
        
        {/* Middle line */}
        <span
          className={`
            block w-6 h-0.5 bg-blue-900 transition-all duration-300 ease-in-out
            my-1
            ${isOpen 
              ? 'opacity-0 scale-0' 
              : 'opacity-100 scale-100'
            }
          `}
        />
        
        {/* Bottom line */}
        <span
          className={`
            block w-6 h-0.5 bg-blue-900 transition-all duration-300 ease-in-out
            ${isOpen 
              ? '-rotate-45 -translate-y-1.5' 
              : 'rotate-0 translate-y-0'
            }
          `}
          style={{
            transformOrigin: 'center'
          }}
        />
      </div>
      
      {/* Screen reader text for state changes */}
      <span className="sr-only">
        {isOpen ? 'Navigation menu is open' : 'Navigation menu is closed'}
      </span>
    </button>
  );
};

export default HamburgerButton;