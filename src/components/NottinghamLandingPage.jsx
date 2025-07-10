import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { ArrowRight, CheckCircle, Star, Phone, Mail } from 'lucide-react'
import { motion } from 'framer-motion'
import PropertyDetailsForm from './PropertyDetailsForm.jsx'

// Import assets - same as homepage
const logoImg = 'https://res.cloudinary.com/dmns9ystn/image/upload/v1751291817/260by80_lgo_sameday_uibnpv.png'
import heroImg from '../assets/uk_houses_hero.jpg'

function NottinghamLandingPage() {
  const [address, setAddress] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [submittedPostcode, setSubmittedPostcode] = useState('')

  useEffect(() => {
    document.title = 'Sell Your House Fast in Nottingham | Cash House Buyers Nottingham | Same Day Home Buyer'
    
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute('content', 'We buy houses fast in Nottingham. Cash offers within 2 hours. No fees, no hassle. Sell your Nottingham property quickly to trusted cash buyers in Nottinghamshire.')
    }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!address.trim()) return
    
    const postcodeRegex = /^[A-Z]{1,2}[0-9][A-Z0-9]? ?[0-9][A-Z]{2}$/i
    if (!postcodeRegex.test(address.trim())) {
      alert('Please enter a valid UK postcode')
      return
    }
    
    setSubmittedPostcode(address.trim().toUpperCase())
    setShowForm(true)
  }

  const handleBackToSearch = () => {
    setShowForm(false)
    setAddress('')
    setSubmittedPostcode('')
  }

  if (showForm) {
    return <PropertyDetailsForm postcode={submittedPostcode} onBack={handleBackToSearch} />
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center">
              <motion.img 
                src={logoImg} 
                alt="Same Day Home Buyer" 
                className="h-6 w-auto cursor-pointer"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              />
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="hidden lg:flex items-center space-x-2 text-blue-900">
                <Phone className="h-4 w-4" />
                <span className="font-semibold text-sm whitespace-nowrap">0330 043 7570</span>
              </div>
              <Button className="bg-blue-900 hover:bg-blue-800 text-white font-semibold px-4 py-2 text-sm whitespace-nowrap">
                Get Offer
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section - Nottingham Specific */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImg})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-blue-700/60"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Sell Your House Fast
              <span className="block text-orange-400">in Nottingham</span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto leading-relaxed">
              We buy properties across Nottingham and Nottinghamshire. From city centre to West Bridgford, Beeston to Carlton. 
              Cash offers within 2 hours, completion in 24 hours.
            </p>

            <motion.form 
              onSubmit={handleSubmit}
              className="max-w-2xl mx-auto mb-12 bg-white/10 backdrop-blur-sm rounded-2xl p-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <h3 className="text-xl font-semibold mb-4">Get Your FREE Nottingham Property Valuation</h3>
              <div className="flex flex-col sm:flex-row gap-3">
                <Input
                  type="text"
                  placeholder="Enter your Nottingham postcode"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="flex-1 h-14 text-blue-900 text-xl font-bold placeholder:text-blue-700 placeholder:font-semibold border-2 border-white/50 bg-white/90 backdrop-blur-sm focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
                />
                <Button 
                  type="submit"
                  className="bg-orange-500 hover:bg-orange-600 h-14 px-8 font-semibold text-lg"
                >
                  Get Cash Offer
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
              <p className="text-sm mt-3 opacity-90">Free Nottingham property valuation • No obligation • 2-hour response</p>
            </motion.form>

            {/* Nottingham Areas */}
            <motion.div 
              className="max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <h3 className="text-2xl font-bold mb-6">We Buy Properties Across All Nottingham Areas</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>City Centre • The Park • Lace Market • Hockley</div>
                <div>West Bridgford • Beeston • Clifton • Wilford</div>
                <div>Carlton • Gedling • Arnold • Mapperley</div>
                <div>Bulwell • Aspley • Wollaton • Radford</div>
              </div>
            </motion.div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-8 mt-8 text-xs sm:text-sm">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-400" />
                <span>2-hour response</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-400" />
                <span>No fees or charges</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-400" />
                <span>Any condition accepted</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Nottingham Residents Choose Same Day Home Buyer</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We've helped thousands of homeowners in Nottingham and Nottinghamshire sell quickly and hassle-free
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              className="bg-white rounded-xl p-8 shadow-lg text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Lightning Fast Process</h3>
              <p className="text-gray-600">
                Get your cash offer within 2 hours and complete your Nottingham house sale in just 24 hours. No lengthy chains or delays.
              </p>
            </motion.div>

            <motion.div 
              className="bg-white rounded-xl p-8 shadow-lg text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Star className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Local Nottingham Experts</h3>
              <p className="text-gray-600">
                Our team knows Nottingham property market inside out. From NG1 to NG16, we understand local property values and trends.
              </p>
            </motion.div>

            <motion.div 
              className="bg-white rounded-xl p-8 shadow-lg text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Mail className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Zero Fees & Hassle</h3>
              <p className="text-gray-600">
                No estate agent fees, legal costs, or hidden charges. We handle everything for your Nottingham property sale.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Sell Your Nottingham Property?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied Nottingham homeowners who chose our fast, reliable service
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Button 
              onClick={() => document.querySelector('input').focus()}
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-lg font-semibold"
            >
              Get Free Cash Offer
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <div className="flex items-center space-x-2">
              <Phone className="h-5 w-5" />
              <span className="text-lg font-semibold">Call: 0330 043 7570</span>
            </div>
          </div>
          <div className="flex items-center space-x-8 text-sm opacity-90 justify-center">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4" />
              <span>2-hour response</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4" />
              <span>No obligation</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4" />
              <span>Free service</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <motion.img 
                src={logoImg} 
                alt="Same Day Home Buyer" 
                className="h-8 w-auto mb-4 cursor-pointer filter brightness-0 invert"
                whileHover={{ scale: 1.05, rotate: 2 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              />
              <p className="text-gray-400 mb-4 leading-relaxed">
                Nottingham's leading cash property buyer. Fast, fair, and reliable service.
              </p>
              <div className="flex items-center space-x-2 text-gray-400 mb-2">
                <Mail className="h-4 w-4" />
                <span>info@samedayhomebuyer.co.uk</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <Phone className="h-4 w-4" />
                <span>0330 043 7570</span>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-lg">Nottingham Areas</h4>
              <ul className="space-y-2 text-gray-400">
                <li>City Centre</li>
                <li>West Bridgford</li>
                <li>Beeston</li>
                <li>Carlton</li>
                <li>The Park</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-lg">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Fast House Sales Nottingham</li>
                <li>Cash Property Buyers</li>
                <li>Quick Property Valuations</li>
                <li>Probate Property Sales</li>
                <li>Auction Alternative</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-lg">Contact</h4>
              <p className="text-gray-400 text-sm">
                Serving all Nottingham postcodes: NG1 to NG16
              </p>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Same Day Home Buyer. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default NottinghamLandingPage