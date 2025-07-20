/**
 * Responsive utility functions for mobile-first layouts
 */

import { clsx } from 'clsx';

/**
 * Generate responsive classes based on breakpoints
 */
export const responsive = (classes) => {
  if (typeof classes === 'string') return classes;
  
  const breakpoints = ['', 'sm:', 'md:', 'lg:', 'xl:', '2xl:'];
  const responsiveClasses = [];
  
  Object.entries(classes).forEach(([breakpoint, classNames]) => {
    const prefix = breakpoint === 'base' ? '' : `${breakpoint}:`;
    const formattedClasses = Array.isArray(classNames) ? classNames.join(' ') : classNames;
    responsiveClasses.push(`${prefix}${formattedClasses}`);
  });
  
  return responsiveClasses.join(' ');
};

/**
 * Mobile-first container classes
 */
export const containerClasses = {
  mobile: 'px-4 mx-auto max-w-full',
  tablet: 'px-6 mx-auto max-w-4xl',
  desktop: 'px-8 mx-auto max-w-6xl',
  full: 'px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl',
};

/**
 * Mobile-optimized spacing classes
 */
export const spacingClasses = {
  section: {
    mobile: 'py-8',
    tablet: 'py-12',
    desktop: 'py-16',
    responsive: 'py-8 md:py-12 lg:py-16',
  },
  component: {
    mobile: 'p-4',
    tablet: 'p-6',
    desktop: 'p-8',
    responsive: 'p-4 md:p-6 lg:p-8',
  },
  gap: {
    mobile: 'gap-4',
    tablet: 'gap-6',
    desktop: 'gap-8',
    responsive: 'gap-4 md:gap-6 lg:gap-8',
  },
};

/**
 * Mobile-first grid classes
 */
export const gridClasses = {
  responsive: {
    '1-2-3': 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    '1-2-4': 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
    '1-3': 'grid-cols-1 lg:grid-cols-3',
    '2-4': 'grid-cols-2 lg:grid-cols-4',
    auto: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
  },
  gap: {
    mobile: 'gap-4',
    tablet: 'gap-6',
    desktop: 'gap-8',
    responsive: 'gap-4 md:gap-6 lg:gap-8',
  },
};

/**
 * Mobile-optimized typography classes
 */
export const typographyClasses = {
  heading: {
    h1: 'text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold',
    h2: 'text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold',
    h3: 'text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold',
    h4: 'text-base sm:text-lg md:text-xl lg:text-2xl font-semibold',
    h5: 'text-sm sm:text-base md:text-lg lg:text-xl font-medium',
    h6: 'text-sm sm:text-base md:text-lg font-medium',
  },
  body: {
    large: 'text-lg sm:text-xl leading-relaxed',
    base: 'text-base sm:text-lg leading-relaxed',
    small: 'text-sm sm:text-base leading-relaxed',
  },
  mobile: {
    min: 'text-base', // 16px minimum for iOS
    readable: 'text-base sm:text-lg leading-relaxed',
    compact: 'text-sm leading-tight',
  },
};

/**
 * Mobile-first button classes
 */
export const buttonClasses = {
  size: {
    sm: 'px-3 py-2 text-sm min-h-[36px]',
    md: 'px-4 py-2 text-base min-h-[44px]', // Touch-friendly
    lg: 'px-6 py-3 text-lg min-h-[48px]',
    xl: 'px-8 py-4 text-xl min-h-[52px]',
  },
  mobile: {
    touch: 'min-h-[44px] min-w-[44px] px-4 py-2 text-base',
    fullWidth: 'w-full min-h-[48px] px-4 py-3 text-lg',
    compact: 'px-3 py-2 text-sm min-h-[40px]',
  },
  spacing: {
    stack: 'space-y-3 sm:space-y-4',
    inline: 'space-x-2 sm:space-x-3',
  },
};

/**
 * Mobile-optimized form classes
 */
export const formClasses = {
  input: {
    base: 'w-full px-3 py-2 text-base min-h-[44px] border rounded-md',
    mobile: 'w-full px-4 py-3 text-base min-h-[48px] border rounded-lg',
    touch: 'w-full px-4 py-3 text-base min-h-[44px] border rounded-md touch-target',
  },
  label: {
    base: 'block text-sm font-medium mb-1',
    mobile: 'block text-base font-medium mb-2',
    floating: 'absolute left-3 top-3 text-sm text-gray-500 transition-all',
  },
  group: {
    mobile: 'space-y-4',
    tablet: 'space-y-6',
    responsive: 'space-y-4 md:space-y-6',
  },
  layout: {
    single: 'grid grid-cols-1 gap-4',
    double: 'grid grid-cols-1 sm:grid-cols-2 gap-4',
    responsive: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4',
  },
};

/**
 * Mobile navigation classes
 */
export const navigationClasses = {
  mobile: {
    overlay: 'fixed inset-0 z-50 bg-white',
    menu: 'flex flex-col space-y-4 p-6',
    item: 'block py-3 px-4 text-lg font-medium min-h-[44px] touch-target',
    toggle: 'p-2 min-h-[44px] min-w-[44px] touch-target',
  },
  desktop: {
    menu: 'hidden md:flex md:space-x-6',
    item: 'px-3 py-2 text-base font-medium hover:text-blue-600',
  },
  sticky: {
    header: 'sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b',
    mobile: 'sticky top-0 z-40 bg-white shadow-sm',
  },
};

/**
 * Mobile card classes
 */
export const cardClasses = {
  base: 'bg-white rounded-lg border shadow-sm',
  mobile: {
    compact: 'bg-white rounded-lg border shadow-sm p-4',
    comfortable: 'bg-white rounded-lg border shadow-sm p-6',
    touch: 'bg-white rounded-lg border shadow-sm p-4 touch-feedback',
  },
  spacing: {
    stack: 'space-y-4 md:space-y-6',
    grid: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6',
  },
  hover: {
    lift: 'transition-transform hover:scale-105 hover:shadow-lg',
    glow: 'transition-shadow hover:shadow-xl',
    none: '', // For mobile devices
  },
};

/**
 * Utility function to combine responsive classes
 */
export const cn = (...classes) => {
  return clsx(classes);
};

/**
 * Generate mobile-first responsive classes
 */
export const mobileFirst = (mobileClass, desktopClass, breakpoint = 'md') => {
  return `${mobileClass} ${breakpoint}:${desktopClass}`;
};

/**
 * Generate touch-friendly classes
 */
export const touchFriendly = (baseClasses = '') => {
  return cn(
    baseClasses,
    'min-h-[44px] min-w-[44px]',
    'touch-target touch-feedback',
    'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
  );
};

/**
 * Generate safe area classes
 */
export const safeArea = (sides = 'all') => {
  const sideClasses = {
    all: 'safe-area-inset',
    top: 'safe-area-top',
    bottom: 'safe-area-bottom',
    left: 'safe-area-left',
    right: 'safe-area-right',
    horizontal: 'safe-area-left safe-area-right',
    vertical: 'safe-area-top safe-area-bottom',
  };
  
  return sideClasses[sides] || sideClasses.all;
};

/**
 * Generate mobile-optimized animation classes
 */
export const mobileAnimation = (type = 'fade') => {
  const animations = {
    fade: 'mobile-fade-in',
    slideUp: 'mobile-slide-up',
    bounce: 'mobile-bounce',
    none: '', // For reduced motion
  };
  
  return cn(
    animations[type],
    'motion-reduce:animate-none' // Respect reduced motion preference
  );
};

/**
 * Responsive image classes
 */
export const imageClasses = {
  responsive: 'w-full h-auto',
  cover: 'w-full h-full object-cover',
  contain: 'w-full h-full object-contain',
  mobile: {
    hero: 'w-full h-48 sm:h-64 md:h-80 lg:h-96 object-cover',
    card: 'w-full h-32 sm:h-40 md:h-48 object-cover',
    thumbnail: 'w-16 h-16 sm:w-20 sm:h-20 object-cover rounded',
  },
};

/**
 * Mobile-specific utility classes
 */
export const mobileUtils = {
  hideOnMobile: 'hidden md:block',
  showOnMobile: 'block md:hidden',
  touchOnly: 'touch-device-only',
  nonTouchOnly: 'non-touch-device-only',
  preventZoom: 'prevent-zoom',
  scrollSmooth: 'mobile-scroll-smooth',
  noHover: 'mobile-no-hover',
};

export default {
  responsive,
  containerClasses,
  spacingClasses,
  gridClasses,
  typographyClasses,
  buttonClasses,
  formClasses,
  navigationClasses,
  cardClasses,
  cn,
  mobileFirst,
  touchFriendly,
  safeArea,
  mobileAnimation,
  imageClasses,
  mobileUtils,
};