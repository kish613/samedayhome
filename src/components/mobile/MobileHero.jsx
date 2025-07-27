import React, { useState } from 'react';
import { Button } from '@/components/ui/button.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { ArrowRight, Phone } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const MobileHero = ({ heroImg }) => {
  const [address, setAddress] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!address.trim()) return;
    
    // Basic postcode validation
    const postcodeRegex = /^[A-Z]{1,2}[0-9][A-Z0-9]? ?[0-9][A-Z]{2}$/i;
    if (!postcodeRegex.test(address.trim())) {
      alert('Please enter a valid UK postcode');
      return;
    }
    
    // Navigate to valuation page with postcode
    navigate(`/valuation/${encodeURIComponent(address.trim().toUpperCase())}`);
  };

  return (
    <section className="relative min-h-[calc(100vh-64px)] flex flex-col overflow-hidden">
      {/* Background Image with Gradient */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: `url(${heroImg})`,
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/90 to-blue-700/80"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col justify-center px-4 py-8 text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          {/* Badge */}
          <Badge className="bg-orange-500 text-white px-3 py-1.5 text-sm font-semibold mb-4 inline-block">
            UK's Fastest House Buyer
          </Badge>

          {/* Title */}
          <h1 className="text-3xl font-bold mb-4 leading-tight">
            Sell Your House Fast
            <span className="block text-orange-400 mt-2">Cash Offer in 2 Hours</span>
          </h1>

          {/* Subtitle */}
          <p className="text-base mb-6 opacity-95 max-w-sm mx-auto">
            No fees, no hassle. Guaranteed completion in as little as 24 hours.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="max-w-sm mx-auto space-y-3">
            <Input
              type="text"
              placeholder="Enter your postcode"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="h-12 text-base text-gray-900"
              inputMode="text"
              autoComplete="postal-code"
            />
            <Button 
              type="submit"
              className="w-full h-12 bg-orange-500 hover:bg-orange-600 font-semibold text-base"
            >
              Get Cash Offer
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <p className="text-xs opacity-90 mt-2">
              Free valuation • No obligation • 2-hour response
            </p>
          </form>
        </motion.div>
      </div>

      {/* Sticky CTA Bar */}
      <div className="fixed bottom-16 left-0 right-0 z-40 bg-white border-t border-gray-200 shadow-lg p-3">
        <div className="container max-w-md mx-auto flex items-center justify-between gap-3">
          <Button 
            onClick={handleSubmit}
            className="flex-1 h-12 bg-orange-500 hover:bg-orange-600 font-semibold text-base"
          >
            Get Cash Offer
          </Button>
          <a
            href="tel:03300437570"
            className="flex items-center justify-center w-12 h-12 bg-green-50 hover:bg-green-100 rounded-lg transition-colors"
          >
            <Phone className="h-5 w-5 text-green-600" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default MobileHero;