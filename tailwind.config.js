/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      // Mobile-first breakpoints
      'sm': '640px',   // Small tablets and large phones
      'md': '768px',   // Tablets
      'lg': '1024px',  // Small desktops
      'xl': '1280px',  // Large desktops
      '2xl': '1536px', // Extra large desktops
      
      // Custom mobile breakpoints
      'xs': '475px',   // Large phones
      'mobile': '320px', // Small phones
      'tablet': '768px', // Tablets
      'desktop': '1024px', // Desktops
    },
    extend: {
      // Mobile-specific spacing
      spacing: {
        'touch': '44px', // Minimum touch target size
        'mobile-padding': '16px',
        'mobile-margin': '12px',
        'safe-top': 'env(safe-area-inset-top)',
        'safe-bottom': 'env(safe-area-inset-bottom)',
        'safe-left': 'env(safe-area-inset-left)',
        'safe-right': 'env(safe-area-inset-right)',
      },
      
      // Mobile-optimized font sizes
      fontSize: {
        'mobile-xs': ['12px', { lineHeight: '16px' }],
        'mobile-sm': ['14px', { lineHeight: '20px' }],
        'mobile-base': ['16px', { lineHeight: '24px' }], // Minimum for iOS zoom prevention
        'mobile-lg': ['18px', { lineHeight: '28px' }],
        'mobile-xl': ['20px', { lineHeight: '32px' }],
        'mobile-2xl': ['24px', { lineHeight: '36px' }],
        'mobile-3xl': ['30px', { lineHeight: '42px' }],
      },
      
      // Touch-friendly dimensions
      minHeight: {
        'touch': '44px',
        'mobile-input': '48px',
        'mobile-button': '44px',
      },
      
      minWidth: {
        'touch': '44px',
        'mobile-button': '120px',
      },
      
      // Mobile-specific animations
      animation: {
        'slide-in-right': 'slideInRight 0.3s ease-out',
        'slide-out-right': 'slideOutRight 0.3s ease-in',
        'fade-in-up': 'fadeInUp 0.4s ease-out',
        'bounce-gentle': 'bounceGentle 0.6s ease-out',
      },
      
      keyframes: {
        slideInRight: {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideOutRight: {
          '0%': { transform: 'translateX(0)', opacity: '1' },
          '100%': { transform: 'translateX(100%)', opacity: '0' },
        },
        fadeInUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        bounceGentle: {
          '0%, 20%, 53%, 80%, 100%': { transform: 'translate3d(0,0,0)' },
          '40%, 43%': { transform: 'translate3d(0,-8px,0)' },
          '70%': { transform: 'translate3d(0,-4px,0)' },
          '90%': { transform: 'translate3d(0,-2px,0)' },
        },
      },
      
      // Mobile-specific backdrop blur
      backdropBlur: {
        'mobile': '8px',
      },
      
      // Safe area utilities
      padding: {
        'safe': 'env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left)',
        'safe-top': 'env(safe-area-inset-top)',
        'safe-bottom': 'env(safe-area-inset-bottom)',
        'safe-left': 'env(safe-area-inset-left)',
        'safe-right': 'env(safe-area-inset-right)',
      },
    },
  },
  plugins: [],
}