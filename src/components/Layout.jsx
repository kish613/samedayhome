import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button.jsx';
import { Phone, Mail, ArrowRight } from 'lucide-react';
import AnimatedLogo from './AnimatedLogo.jsx';
import { motion } from 'framer-motion';
import MobileMenu from './mobile/MobileMenu.jsx';
import BottomNav from './mobile/BottomNav.jsx';

const logoImg = 'https://res.cloudinary.com/dmns9ystn/image/upload/v1751291817/260by80_lgo_sameday_uibnpv.png';

const Header = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCTAClick = () => {
    // Scroll to the main form on the homepage, or navigate if not on homepage
    if (window.location.pathname === '/') {
        const heroSection = document.querySelector('section');
        if (heroSection) {
            heroSection.scrollIntoView({ behavior: 'smooth' });
        }
    } else {
        navigate('/#hero');
    }
  };

  return (
    <header className={`sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm transition-all duration-300 ${isScrolled ? 'py-1 xl:py-3' : 'py-3'}`}>
      <div className="container mx-auto px-4">
        <div className={`flex items-center justify-between transition-all duration-300 ${isScrolled ? 'h-12 xl:h-20' : 'h-16 xl:h-28'}`}>
          <div className="flex items-center">
            <Link to="/">
              <AnimatedLogo />
            </Link>
          </div>
          
          <nav className="hidden xl:flex items-center space-x-4">
            <a 
              href="/#how-it-works" 
              className="text-gray-700 hover:text-blue-900 transition-all duration-300 font-medium text-lg whitespace-nowrap relative group hover:scale-105"
            >
              How It Works
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-blue-900 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a 
              href="/#why-us" 
              className="text-gray-700 hover:text-blue-900 transition-all duration-300 font-medium text-lg whitespace-nowrap relative group hover:scale-105"
            >
              Why Us
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-blue-900 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a 
              href="/#testimonials" 
              className="text-gray-700 hover:text-blue-900 transition-all duration-300 font-medium text-lg whitespace-nowrap relative group hover:scale-105"
            >
              Reviews
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-blue-900 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a 
              href="/#faq" 
              className="text-gray-700 hover:text-blue-900 transition-all duration-300 font-medium text-lg whitespace-nowrap relative group hover:scale-105"
            >
              FAQs
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-blue-900 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <Link 
              to="/blog" 
              className="text-gray-700 hover:text-blue-900 transition-all duration-300 font-medium text-lg whitespace-nowrap relative group hover:scale-105"
            >
              Blog
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-blue-900 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </nav>

          <div className="flex items-center space-x-2 xl:space-x-3">
            <div className="hidden lg:flex items-center space-x-2 text-blue-900">
              <Phone className="h-4 w-4" />
              <a 
                href="tel:03300437570" 
                className="font-semibold text-base whitespace-nowrap hover:text-blue-700 transition-colors duration-200 cursor-pointer"
              >
                0330 043 7570
              </a>
            </div>
            <Link 
              to="/refer" 
              className="hidden md:inline-flex bg-orange-500 hover:bg-orange-600 text-white font-semibold px-3 py-2 rounded-lg transition-colors text-base whitespace-nowrap"
            >
              Earn £500
            </Link>
            <Button 
              onClick={handleCTAClick}
              className="hidden xl:inline-flex bg-blue-900 hover:bg-blue-800 text-white font-semibold px-4 py-2 text-base whitespace-nowrap"
            >
              Get Offer
            </Button>
            <MobileMenu />
          </div>
        </div>
      </div>
    </header>
  );
};

const Footer = () => (
  <footer className="bg-gray-900 text-white py-16">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <div>
          <motion.img 
            src={logoImg} 
            alt="Same Day Home Buyer" 
            className="h-14 w-auto mb-4 cursor-pointer filter brightness-0 invert"
            whileHover={{ scale: 1.05, rotate: 2 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          />
          <p className="text-gray-400 mb-4 leading-relaxed">
            The UK's leading cash property buyer. Fast, fair, and reliable service since 2003.
          </p>
          <div className="flex items-center space-x-2 text-gray-400 mb-2">
            <Mail className="h-4 w-4" />
            <span>info@samedayhomebuyer.co.uk</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-400">
            <Phone className="h-4 w-4" />
            <a 
              href="tel:03300437570" 
              className="font-semibold text-base whitespace-nowrap hover:text-blue-700 transition-colors duration-200 cursor-pointer"
            >
              0330 043 7570
            </a>
          </div>
        </div>
        
        <div>
          <h4 className="font-semibold mb-4 text-lg">Quick Links</h4>
          <ul className="space-y-2 text-gray-400">
            <li><a href="/#how-it-works" className="hover:text-white transition-colors">How It Works</a></li>
            <li><a href="/#why-us" className="hover:text-white transition-colors">Why Choose Us</a></li>
            <li><a href="/#comparison" className="hover:text-white transition-colors">Compare Options</a></li>
            <li><a href="/#testimonials" className="hover:text-white transition-colors">Customer Reviews</a></li>
            <li><a href="/#faq" className="hover:text-white transition-colors">FAQs</a></li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-semibold mb-4 text-lg">Services</h4>
          <ul className="space-y-2 text-gray-400">
            <li>Cash House Purchases</li>
            <li>Probate Property Sales</li>
            <li>Distressed Property Sales</li>
            <li>Quick Property Valuations</li>
            <li>Auction Alternative</li>
            <li><Link to="/refer" className="hover:text-white transition-colors">Earn £500 - Refer Properties</Link></li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-semibold mb-4 text-lg">Service Areas</h4>
          <ul className="space-y-2 text-gray-400">
            <li><Link to="/london" className="hover:text-white transition-colors">London</Link></li>
            <li><Link to="/manchester" className="hover:text-white transition-colors">Manchester</Link></li>
            <li><Link to="/birmingham" className="hover:text-white transition-colors">Birmingham</Link></li>
            <li><Link to="/liverpool" className="hover:text-white transition-colors">Liverpool</Link></li>
            <li><Link to="/leeds" className="hover:text-white transition-colors">Leeds</Link></li>
            <li><Link to="/bristol" className="hover:text-white transition-colors">Bristol</Link></li>
            <li><Link to="/sheffield" className="hover:text-white transition-colors">Sheffield</Link></li>
            <li><Link to="/newcastle" className="hover:text-white transition-colors">Newcastle</Link></li>
            <li className="text-sm pt-2"><a href="/sitemap.xml" className="text-blue-400 hover:text-blue-300 transition-colors">View All Locations →</a></li>
          </ul>
        </div>
        
      </div>
      
      <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
        <p>
          &copy; 2025 Same Day Home Buyer. All rights reserved. | 
          <Link to="/privacy-policy" className="hover:text-white transition-colors mx-1">Privacy Policy</Link> | 
          <a href="#" className="hover:text-white transition-colors mx-1">Terms & Conditions</a> | 
          <a href="/sitemap.xml" className="hover:text-white transition-colors mx-1">Sitemap</a>
        </p>
      </div>
    </div>
  </footer>
);

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pb-16 xl:pb-0">{children}</main>
      <Footer />
      <BottomNav />
    </div>
  );
};

export default Layout; 