import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button.jsx';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet.jsx';
import { Phone, Menu, X, Home, HelpCircle, Star, MessageSquare, BookOpen, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const menuItems = [
    { href: '/#how-it-works', label: 'How It Works', icon: HelpCircle },
    { href: '/#why-us', label: 'Why Us', icon: Star },
    { href: '/#testimonials', label: 'Reviews', icon: MessageSquare },
    { href: '/#faq', label: 'FAQs', icon: BookOpen },
    { href: '/blog', label: 'Blog', icon: BookOpen, isRoute: true }
  ];

  const handleNavClick = (href, isRoute) => {
    setIsOpen(false);
    if (isRoute) {
      navigate(href);
    } else {
      if (location.pathname === '/') {
        // If on homepage, scroll to section
        const sectionId = href.split('#')[1];
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        // If not on homepage, navigate to homepage with hash
        navigate(href);
      }
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon"
          className="xl:hidden relative w-10 h-10 rounded-lg hover:bg-gray-100 transition-colors"
          aria-label="Open menu"
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="h-6 w-6" />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Menu className="h-6 w-6" />
              </motion.div>
            )}
          </AnimatePresence>
        </Button>
      </SheetTrigger>
      <SheetContent 
        side="right" 
        className="w-[85vw] max-w-[400px] p-0 overflow-y-auto"
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Menu</h2>
              <SheetClose asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <X className="h-5 w-5" />
                </Button>
              </SheetClose>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 px-4 py-6">
            <div className="space-y-1">
              {menuItems.map((item, index) => (
                <motion.button
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => handleNavClick(item.href, item.isRoute)}
                  className="w-full flex items-center justify-between px-4 py-4 rounded-lg hover:bg-gray-50 transition-colors group"
                >
                  <div className="flex items-center space-x-3">
                    <item.icon className="h-5 w-5 text-gray-500 group-hover:text-blue-900 transition-colors" />
                    <span className="text-base font-medium text-gray-700 group-hover:text-blue-900 transition-colors">
                      {item.label}
                    </span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-blue-900 transition-colors" />
                </motion.button>
              ))}
            </div>

            {/* Call Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-8 px-4"
            >
              <a
                href="tel:03300437570"
                className="flex items-center justify-center space-x-2 w-full bg-green-50 hover:bg-green-100 text-green-700 font-semibold py-4 rounded-lg transition-colors"
              >
                <Phone className="h-5 w-5" />
                <span>Call 0330 043 7570</span>
              </a>
            </motion.div>

            {/* Referral Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-4 px-4"
            >
              <Link
                to="/refer"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-4 rounded-lg transition-colors"
              >
                Earn £500 - Refer a Property
              </Link>
            </motion.div>
          </nav>

        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;