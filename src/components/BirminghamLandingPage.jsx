import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Clock, CheckCircle, Star, ArrowRight, Award } from 'lucide-react'
import { motion } from 'framer-motion'

// Import assets - same as homepage
const logoImg = 'https://res.cloudinary.com/dmns9ystn/image/upload/v1750951255/samedayssave_fnfu6n.png'
import heroImg from '../assets/uk_houses_hero.jpg'

function BirminghamLandingPage() {
  const [address, setAddress] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    document.title = 'Sell Your House Fast in Birmingham | Cash House Buyers Birmingham | Same Day Home Buyer'
    
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute('content', 'We buy houses fast in Birmingham for cash. Sell your Birmingham property in 24 hours. No estate agent fees, no chains, guaranteed completion. Get your free cash offer today.')
    } else {
      const meta = document.createElement('meta')
      meta.name = 'description'
      meta.content = 'We buy houses fast in Birmingham for cash. Sell your Birmingham property in 24 hours. No estate agent fees, no chains, guaranteed completion. Get your free cash offer today.'
      document.getElementsByTagName('head')[0].appendChild(meta)
    }
  }, [])

  const handleGetOffer = () => {
    if (address.trim()) {
      navigate(`/valuation/${encodeURIComponent(address)}`)
    }
  }

  const birminghamAreas = [
    'Birmingham City Centre', 'Aston', 'Edgbaston', 'Selly Oak', 'Moseley', 'Kings Heath',
    'Harborne', 'Quinton', 'Northfield', 'Longbridge', 'Erdington', 'Sutton Coldfield',
    'Four Oaks', 'Boldmere', 'Wylde Green', 'Handsworth', 'Perry Barr', 'Great Barr',
    'Kingstanding', 'Castle Vale', 'Hodge Hill', 'Stechford', 'Yardley', 'Acocks Green'
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImg})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-blue-700/60"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-6 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <div className="mb-8">
              <img 
                src={logoImg} 
                alt="Same Day Home Buyer - Birmingham Cash House Buyers" 
                className="h-16 mx-auto mb-6"
              />
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Sell Your House Fast in
              <span className="block text-orange-400 mt-2">Birmingham</span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-8 text-blue-100 leading-relaxed max-w-3xl mx-auto">
              We buy properties in all areas of Birmingham for cash. Get your guaranteed offer in 2 hours, 
              complete in 24 hours. No estate agent fees, no chains, no hassle.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-2xl mx-auto mb-12">
              <Input
                type="text"
                placeholder="Enter your Birmingham property postcode"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="flex-1 h-14 text-blue-900 text-xl font-bold placeholder:text-blue-700 placeholder:font-semibold border-2 border-white/50 bg-white/90 backdrop-blur-sm focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
              />
              <Button 
                onClick={handleGetOffer}
                className="h-14 px-8 bg-orange-500 hover:bg-orange-600 text-white font-bold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200"
              >
                Get My Birmingham Cash Offer
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
            
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span>Trusted by 1,500+ Birmingham homeowners</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="h-5 w-5 text-yellow-400" />
                <span>4.8/5 rating from Birmingham clients</span>
              </div>
              <div className="flex items-center space-x-2">
                <Award className="h-5 w-5 text-orange-400" />
                <span>£65M+ invested in Birmingham properties</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Birmingham Areas We Cover */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-6">
              We Buy Houses Across Birmingham
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              From Birmingham city centre to suburban areas, we purchase properties across all districts of Birmingham.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {birminghamAreas.map((area, index) => (
              <motion.div
                key={area}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="bg-slate-50 rounded-lg p-4 text-center hover:bg-orange-50 hover:border-orange-200 border-2 border-transparent transition-all cursor-pointer"
              >
                <span className="text-slate-700 font-medium text-sm">{area}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-900 to-blue-700 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Sell Your Birmingham Property?
          </h2>
          <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
            Join thousands of satisfied Birmingham homeowners who chose the fast, hassle-free way to sell.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-2xl mx-auto mb-8">
            <Input
              type="text"
              placeholder="Enter your Birmingham postcode"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="flex-1 h-14 text-slate-900 text-lg border-2 border-white/50 bg-white/90"
            />
            <Button 
              onClick={handleGetOffer}
              className="h-14 px-8 bg-orange-500 hover:bg-orange-600 text-white font-bold text-lg"
            >
              Get My Cash Offer Now
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default BirminghamLandingPage 