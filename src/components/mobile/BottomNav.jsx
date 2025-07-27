import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Phone, Star, Calculator } from 'lucide-react';
import { motion } from 'framer-motion';

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { 
      icon: Home, 
      label: 'Home', 
      action: () => navigate('/'),
      isActive: location.pathname === '/'
    },
    { 
      icon: Calculator, 
      label: 'Get Offer', 
      action: () => {
        if (location.pathname === '/') {
          const heroSection = document.querySelector('section');
          if (heroSection) {
            heroSection.scrollIntoView({ behavior: 'smooth' });
          }
        } else {
          navigate('/#hero');
        }
      },
      isPrimary: true
    },
    { 
      icon: Star, 
      label: 'Reviews', 
      action: () => {
        if (location.pathname === '/') {
          const testimonials = document.getElementById('testimonials');
          if (testimonials) {
            testimonials.scrollIntoView({ behavior: 'smooth' });
          }
        } else {
          navigate('/#testimonials');
        }
      }
    },
    { 
      icon: Phone, 
      label: 'Call', 
      action: () => window.location.href = 'tel:03300437570',
      isPhone: true
    }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 xl:hidden bg-white border-t border-gray-200 shadow-lg">
      <div className="grid grid-cols-4 h-16" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
        {navItems.map((item, index) => (
          <motion.button
            key={index}
            whileTap={{ scale: 0.95 }}
            onClick={item.action}
            className={`
              flex flex-col items-center justify-center space-y-1 relative overflow-hidden
              ${item.isPrimary ? 'bg-blue-900 text-white' : 'text-gray-600'}
              ${item.isActive ? 'text-blue-900' : ''}
              ${item.isPhone ? 'bg-green-50' : ''}
              transition-all duration-200
            `}
          >
            {/* Ripple effect container */}
            <span className="absolute inset-0 overflow-hidden">
              <span className="ripple-effect"></span>
            </span>
            
            {/* Icon with animation */}
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <item.icon 
                className={`h-5 w-5 ${item.isPhone ? 'text-green-600' : ''}`} 
              />
            </motion.div>
            
            {/* Label */}
            <span className={`text-xs font-medium ${item.isPhone ? 'text-green-600' : ''}`}>
              {item.label}
            </span>
            
            {/* Active indicator */}
            {item.isActive && (
              <motion.div
                layoutId="activeTab"
                className="absolute top-0 left-0 right-0 h-0.5 bg-blue-900"
                initial={false}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default BottomNav;