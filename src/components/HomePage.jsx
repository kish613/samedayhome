import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Card, CardContent } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Clock, Phone, Mail, CheckCircle, Star, ArrowRight, Home, Users, Award, TrendingUp, FileText, Calendar, MapPin, ChevronDown, Play } from 'lucide-react'
import { motion } from 'framer-motion'
import ProcessChart from './ProcessChart.jsx'
import PropertyDetailsForm from './PropertyDetailsForm.jsx'

// Import assets
const logoImg = 'https://res.cloudinary.com/dmns9ystn/image/upload/v1750951255/samedayssave_fnfu6n.png'
import heroImg from '../assets/uk_houses_hero.jpg'
import cashIcon from '../assets/cash_icon.png'
import cashGuaranteeIcon from '../assets/cash_guarantee_icon.png'

function HomePage() {
  const [address, setAddress] = useState('')
  const [isVisible, setIsVisible] = useState(false)
  const [activeTab, setActiveTab] = useState(0)
  const [showForm, setShowForm] = useState(false)
  const [submittedPostcode, setSubmittedPostcode] = useState('')

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!address.trim()) return
    
    // Basic postcode validation
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

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  }

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const comparisonData = [
    {
      method: 'Same Day Home Buyer',
      time: '2 Hours - 24 Hours',
      fees: '£0',
      guarantee: 'Yes',
      hassle: 'None',
      highlight: true
    },
    {
      method: 'Estate Agents',
      time: '3-6 Months',
      fees: '£3,000-£8,000',
      guarantee: 'No',
      hassle: 'High'
    },
    {
      method: 'Property Auctions',
      time: '4-8 Weeks',
      fees: '£2,000-£5,000',
      guarantee: 'No',
      hassle: 'Medium'
    },
    {
      method: 'Online Portals',
      time: '2-4 Months',
      fees: '£500-£2,000',
      guarantee: 'No',
      hassle: 'High'
    }
  ]

  // Show property details form if postcode submitted
  if (showForm) {
    return <PropertyDetailsForm postcode={submittedPostcode} onBack={handleBackToSearch} />
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Enhanced Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <motion.img 
                src={logoImg} 
                alt="Same Day Home Buyer" 
                className="h-24 w-auto cursor-pointer drop-shadow-md"
                whileHover={{ scale: 1.08, rotate: 3 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              />
            </div>
            
            <nav className="hidden lg:flex items-center space-x-8">
              <a href="#how-it-works" className="text-gray-700 hover:text-blue-900 transition-colors font-medium">How It Works</a>
              <a href="#why-us" className="text-gray-700 hover:text-blue-900 transition-colors font-medium">Why Choose Us</a>
              <a href="#comparison" className="text-gray-700 hover:text-blue-900 transition-colors font-medium">Compare Options</a>
              <a href="#testimonials" className="text-gray-700 hover:text-blue-900 transition-colors font-medium">Reviews</a>
              <a href="#faq" className="text-gray-700 hover:text-blue-900 transition-colors font-medium">FAQs</a>
            </nav>

            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-2 text-blue-900">
                <Phone className="h-4 w-4" />
                <span className="font-semibold">0333 090 6219</span>
              </div>
              <Button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold">
                Free Cash Offer
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Enhanced Hero Section */}
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
            <div className="mb-6">
              <Badge className="bg-orange-500 text-white px-4 py-2 text-lg font-semibold mb-4">
                UK's Fastest House Buyer
              </Badge>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Sell Your House Fast
              <span className="block text-orange-400">Decision in 2 Hours</span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto leading-relaxed">
              We buy any property in any condition across the UK. No fees, no hassle, guaranteed completion in 24 hours.
            </p>

            <motion.form 
              onSubmit={handleSubmit}
              className="max-w-2xl mx-auto mb-12 bg-white/10 backdrop-blur-sm rounded-2xl p-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <h3 className="text-xl font-semibold mb-4">Get Your FREE Cash Offer</h3>
              <div className="flex flex-col sm:flex-row gap-3">
                <Input
                  type="text"
                  placeholder="Enter your property postcode"
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
              <p className="text-sm mt-3 opacity-90">Free valuation • No obligation • 2-hour response</p>
            </motion.form>
          </motion.div>
        </div>
      </section>

      {/* City Links Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-6">
              We Buy Houses Across the UK
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Click on your city to see how we can help you sell your property fast.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.a
              href="/london"
              className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
              whileHover={{ y: -5 }}
            >
              <div className="text-center">
                <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-orange-500 transition-colors">
                  London
                </h3>
                <p className="text-slate-600 mb-4">
                  We buy houses in all London boroughs for cash. Fast completion guaranteed.
                </p>
                <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                  View London Page
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </motion.a>

            <motion.a
              href="/manchester"
              className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
              whileHover={{ y: -5 }}
            >
              <div className="text-center">
                <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-orange-500 transition-colors">
                  Manchester
                </h3>
                <p className="text-slate-600 mb-4">
                  Cash house buyers across Greater Manchester. Get your offer today.
                </p>
                <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                  View Manchester Page
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </motion.a>

            <motion.a
              href="/birmingham"
              className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
              whileHover={{ y: -5 }}
            >
              <div className="text-center">
                <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-orange-500 transition-colors">
                  Birmingham
                </h3>
                <p className="text-slate-600 mb-4">
                  We purchase properties across Birmingham quickly and hassle-free.
                </p>
                <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                  View Birmingham Page
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </motion.a>

            <motion.a
              href="/liverpool"
              className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
              whileHover={{ y: -5 }}
            >
              <div className="text-center">
                <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-orange-500 transition-colors">
                  Liverpool
                </h3>
                <p className="text-slate-600 mb-4">
                  Fast cash house sales across Liverpool and Merseyside.
                </p>
                <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                  View Liverpool Page
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </motion.a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage 