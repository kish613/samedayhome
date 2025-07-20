import React from 'react';
import PropTypes from 'prop-types';

/**
 * MobileContainer component provides responsive container with mobile-optimized padding
 * and safe area handling for notched devices
 */
const MobileContainer = ({ 
  children, 
  padding = true, 
  maxWidth = 'lg',
  className = '',
  safeArea = true,
  ...props 
}) => {
  // Base container classes with mobile-first approach
  const baseClasses = 'w-full mx-auto';
  
  // Padding classes based on screen size and safe area requirements
  const paddingClasses = padding 
    ? safeArea 
      ? 'px-4 sm:px-6 lg:px-8 pt-safe-top pb-safe-bottom pl-safe-left pr-safe-right'
      : 'px-4 sm:px-6 lg:px-8'
    : '';
  
  // Max width variants for optimal mobile readability
  const maxWidthClasses = {
    'sm': 'max-w-sm',      // 384px - Very narrow content
    'md': 'max-w-md',      // 448px - Forms and narrow content
    'lg': 'max-w-2xl',     // 672px - Standard content width
    'xl': 'max-w-4xl',     // 896px - Wide content
    'full': 'max-w-full'   // Full width
  };
  
  const containerClasses = [
    baseClasses,
    paddingClasses,
    maxWidthClasses[maxWidth] || maxWidthClasses.lg,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={containerClasses} {...props}>
      {children}
    </div>
  );
};

MobileContainer.propTypes = {
  children: PropTypes.node.isRequired,
  padding: PropTypes.bool,
  maxWidth: PropTypes.oneOf(['sm', 'md', 'lg', 'xl', 'full']),
  className: PropTypes.string,
  safeArea: PropTypes.bool,
};

export default MobileContainer;