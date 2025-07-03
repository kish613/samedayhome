import React, { useState, useEffect } from 'react'
import { Routes, Route, useNavigate, Link } from 'react-router-dom'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Card, CardContent } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Phone, Mail, CheckCircle, Star, ArrowRight, Users, TrendingUp, FileText, Calendar, MapPin, ChevronDown, Play } from 'lucide-react'
import { motion } from 'framer-motion'
import ProcessChart from './components/ProcessChart.jsx'
import PropertyDetailsForm from './components/PropertyDetailsForm.jsx'
import ValuationPage from './components/ValuationPage.jsx'
import LondonLandingPage from './components/LondonLandingPage.jsx'
import ManchesterLandingPage from './components/ManchesterLandingPage.jsx'
import BirminghamLandingPage from './components/BirminghamLandingPage.jsx'
import LiverpoolLandingPage from './components/LiverpoolLandingPage.jsx'
import BlogPage from './components/BlogPage.jsx'
import SellProbateHouseUK from './components/blog/SellProbateHouseUK.jsx'
import AvoidRepossessionUK from './components/blog/AvoidRepossessionUK.jsx'
import SellDisrepairHouse from './components/blog/SellDisrepairHouse.jsx'
import SellHouseAfterDivorce from './components/blog/SellHouseAfterDivorce.jsx'
import EmigrationHouseSale from './components/blog/EmigrationHouseSale.jsx'
import ReferralPage from './components/ReferralPage.jsx'

import './App.css'

// Import assets
const logoImg = 'https://res.cloudinary.com/dmns9ystn/image/upload/v1751291817/260by80_lgo_sameday_uibnpv.png'
import heroImg from './assets/uk_houses_hero.jpg'

// Import local assets for Why Choose Us section  
import lightningFastIcon from './assets/speed_icon.png'
import cashGuaranteeIcon from './assets/cash_guarantee_icon.png'
import zeroFeesIcon from './assets/cash_icon.png'

// Custom Cloudinary icons for trust section
const calendarIcon = 'https://res.cloudinary.com/dmns9ystn/image/upload/v1750761812/calender_no_bg_icon_morvmr.png'
const housesIcon = 'https://res.cloudinary.com/dmns9ystn/image/upload/v1750761812/lots_of_houses_no_bg_wxee7u.png'
const moneyMountainIcon = 'https://res.cloudinary.com/dmns9ystn/image/upload/v1750761812/money_mount_no_bg_icon_hlcte7.png'
const clockIcon = 'https://res.cloudinary.com/dmns9ystn/image/upload/v1750761812/2_hour_clock_no_bg_fzxyai.png'

function HomePage() {
  const [address, setAddress] = useState('')
  const [isVisible, setIsVisible] = useState(false)
  const [activeTab, setActiveTab] = useState(0)
  const [showForm, setShowForm] = useState(false)
  const [submittedPostcode, setSubmittedPostcode] = useState('')
  const navigate = useNavigate()

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
    
    // Navigate to valuation page with postcode
    navigate(`/valuation/${encodeURIComponent(address.trim().toUpperCase())}`)
  }

  const handleCTAClick = () => {
    // Scroll to the main form on the homepage
    const heroSection = document.querySelector('section')
    if (heroSection) {
      heroSection.scrollIntoView({ behavior: 'smooth' })
    }
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



  return (
    <div className="min-h-screen bg-white">
      {/* Clean Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <img 
                src={logoImg} 
                alt="Same Day Home Buyer" 
                className="h-12 w-auto cursor-pointer"
              />
            </div>
            
            <nav className="hidden lg:flex items-center space-x-6">
              <a 
                href="#how-it-works" 
                className="text-gray-700 hover:text-blue-900 transition-colors font-medium"
              >
                How It Works
              </a>
              <a 
                href="#why-us" 
                className="text-gray-700 hover:text-blue-900 transition-colors font-medium"
              >
                Why Choose Us
              </a>
              <a 
                href="#comparison" 
                className="text-gray-700 hover:text-blue-900 transition-colors font-medium"
              >
                Compare Options
              </a>
              <a 
                href="#testimonials" 
                className="text-gray-700 hover:text-blue-900 transition-colors font-medium"
              >
                Reviews
              </a>
              <a 
                href="#faq" 
                className="text-gray-700 hover:text-blue-900 transition-colors font-medium"
              >
                FAQs
              </a>
              <Link 
                to="/blog" 
                className="text-gray-700 hover:text-blue-900 transition-colors font-medium"
              >
                Blog
              </Link>
              <Link 
                to="/refer" 
                className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-4 py-2 rounded-lg transition-colors"
              >
                Earn £100
              </Link>
            </nav>

            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-2 text-blue-900">
                <Phone className="h-4 w-4" />
                <span className="font-semibold">0333 090 6219</span>
              </div>
              <Button 
                onClick={handleCTAClick}
                className="bg-orange-500 hover:bg-orange-600 text-white font-semibold"
              >
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

            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto"
              variants={staggerChildren}
              initial="initial"
              animate="animate"
            >
              <motion.div variants={fadeInUp} className="flex items-center justify-center space-x-3 bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <CheckCircle className="h-6 w-6 text-green-400" />
                <span className="font-medium">Cash in 24 hours</span>
              </motion.div>
              <motion.div variants={fadeInUp} className="flex items-center justify-center space-x-3 bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <CheckCircle className="h-6 w-6 text-green-400" />
                <span className="font-medium">No estate agent fees</span>
              </motion.div>
              <motion.div variants={fadeInUp} className="flex items-center justify-center space-x-3 bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <CheckCircle className="h-6 w-6 text-green-400" />
                <span className="font-medium">Any condition accepted</span>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Trust Indicators with Media Mentions */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50/30 relative overflow-hidden">
        {/* Trust Seal Watermark */}
        <div 
          className="absolute inset-0 bg-no-repeat bg-center bg-contain opacity-[0.04] pointer-events-none"
          style={{ 
            backgroundImage: 'url(/uk_houses_hero.jpg)',
            backgroundSize: '500px 500px'
          }}
        />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-blue-900 mb-4">Trusted by Thousands</h2>
            <div className="flex items-center justify-center space-x-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-6 w-6 fill-yellow-400 text-yellow-400" />
              ))}
              <span className="ml-2 text-lg font-semibold text-green-600">4.9/5 on Trustpilot</span>
            </div>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.div 
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <motion.div 
                className="bg-blue-900 text-white rounded-full w-20 h-20 flex items-center justify-center mb-4"
                whileHover={{ 
                  scale: 1.1,
                  rotate: [0, -10, 10, -10, 0],
                  transition: { duration: 0.5 }
                }}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ 
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  delay: 0.2
                }}
                viewport={{ once: true }}
              >
                <img src={calendarIcon} alt="Calendar Icon" className="h-10 w-10" />
              </motion.div>
              <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent mb-2">20+</h3>
              <p className="text-gray-600 font-medium">Years Experience</p>
            </motion.div>
            <motion.div 
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <motion.div 
                className="bg-blue-900 text-white rounded-full w-20 h-20 flex items-center justify-center mb-4"
                whileHover={{ 
                  scale: 1.1,
                  y: [-2, -8, -2],
                  transition: { duration: 0.6, repeat: Infinity, repeatType: "reverse" }
                }}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ 
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  delay: 0.3
                }}
                viewport={{ once: true }}
              >
                <img src={housesIcon} alt="Houses Icon" className="h-10 w-10" />
              </motion.div>
              <h3 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-2">15,000+</h3>
              <p className="text-gray-600 font-medium">Properties Bought</p>
            </motion.div>
            <motion.div 
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <motion.div 
                className="bg-blue-900 text-white rounded-full w-20 h-20 flex items-center justify-center mb-4"
                whileHover={{ 
                  scale: 1.1,
                  rotate: [0, 360],
                  transition: { duration: 1 }
                }}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ 
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  delay: 0.4
                }}
                viewport={{ once: true }}
              >
                <img src={moneyMountainIcon} alt="Money Mountain Icon" className="h-10 w-10" />
              </motion.div>
              <h3 className="text-3xl font-bold bg-gradient-to-r from-green-500 to-green-700 bg-clip-text text-transparent mb-2">£500M+</h3>
              <p className="text-gray-600 font-medium">Total Invested</p>
            </motion.div>
            <motion.div 
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <motion.div 
                className="bg-blue-900 text-white rounded-full w-20 h-20 flex items-center justify-center mb-4"
                whileHover={{ 
                  scale: 1.1,
                  rotate: [0, -45, 45, 0],
                  transition: { duration: 0.8 }
                }}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ 
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  delay: 0.5
                }}
                viewport={{ once: true }}
              >
                <img src={clockIcon} alt="Clock Icon" className="h-10 w-10" />
              </motion.div>
              <h3 className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-amber-600 bg-clip-text text-transparent mb-2">2 Hours</h3>
              <p className="text-gray-600 font-medium">Average Decision Time</p>
            </motion.div>
          </motion.div>



          {/* Trust Badges */}
          <motion.div 
            className="mt-12 flex flex-col md:flex-row items-center justify-center gap-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <motion.div 
              className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 rounded-xl p-4 flex items-center space-x-4 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              whileHover={{ y: -5 }}
            >
              <img 
                src="https://res.cloudinary.com/dmns9ystn/image/upload/v1751322237/nabp_no_bg_ul5cyq.png" 
                alt="NAPB Approved" 
                className="h-16 w-auto"
              />
              <div>
                <p className="text-green-700 font-bold">NAPB Approved</p>
                <p className="text-gray-600 text-sm">National Association of Property Buyers</p>
              </div>
            </motion.div>
            
            <motion.div 
              className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-300 rounded-xl p-4 flex items-center space-x-4 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              whileHover={{ y: -5 }}
            >
              <img 
                src="https://res.cloudinary.com/dmns9ystn/image/upload/v1751322237/rics_no_bg_e2gx0k.png" 
                alt="RICS Regulated" 
                className="h-16 w-auto"
              />
              <div>
                <p className="text-blue-700 font-bold">RICS Regulated</p>
                <p className="text-gray-600 text-sm">Royal Institution of Chartered Surveyors</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Benefits Section */}
      <section id="why-us" className="py-20 bg-gradient-to-br from-white via-blue-50/20 to-white relative overflow-hidden">
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-[0.02]" style={{backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.4"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'}}></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-blue-900 mb-4">
              Why Choose Same Day Home Buyer?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We offer the UK's fastest, most reliable cash house buying service with guaranteed completion.
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={staggerChildren}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <motion.div variants={fadeInUp}>
              <Card className="h-full border-2 border-transparent hover:border-orange-500 transition-all duration-300 transform hover:-translate-y-3 hover:shadow-2xl relative overflow-hidden group">
                {/* Background Image */}
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundImage: 'url(/modern_uk_house.jpg)' }}
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-white/85 group-hover:bg-white/75 transition-all duration-300"></div>
                {/* Content */}
                <CardContent className="p-8 text-center relative z-10">
                  <div className="mb-6">
                    <div className="bg-orange-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto group-hover:bg-orange-500 transition-colors duration-300">
                      <img src={lightningFastIcon} alt="Lightning Fast Icon" className="h-16 w-16" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-blue-900 mb-4 group-hover:text-orange-500 transition-colors duration-300">Lightning Fast</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Get your cash offer within 2 hours and complete the sale in as little as 24 hours. No waiting around for months.
                  </p>
                  <Badge variant="secondary" className="bg-orange-100 text-orange-700 group-hover:bg-orange-500 group-hover:text-white transition-colors duration-300 px-4 py-2">
                    2 Hour Decision
                  </Badge>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="h-full border-2 border-transparent hover:border-orange-500 transition-all duration-300 transform hover:-translate-y-3 hover:shadow-2xl relative overflow-hidden group">
                {/* Background Image */}
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundImage: 'url(/property_bg_1.webp)' }}
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-white/85 group-hover:bg-white/75 transition-all duration-300"></div>
                {/* Content */}
                <CardContent className="p-8 text-center relative z-10">
                  <div className="mb-6">
                    <div className="bg-green-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto group-hover:bg-orange-500 transition-colors duration-300">
                      <img src={cashGuaranteeIcon} alt="Cash Guarantee Icon" className="h-16 w-16" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-blue-900 mb-4 group-hover:text-orange-500 transition-colors duration-300">Cash Guarantee</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    We buy with our own cash funds. No chain, no mortgage delays, no fall-throughs. Guaranteed completion.
                  </p>
                  <Badge variant="secondary" className="bg-green-100 text-green-700 group-hover:bg-orange-500 group-hover:text-white transition-colors duration-300 px-4 py-2">
                    100% Cash
                  </Badge>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="h-full border-2 border-transparent hover:border-orange-500 transition-all duration-300 transform hover:-translate-y-3 hover:shadow-2xl relative overflow-hidden group">
                {/* Background Image */}
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundImage: 'url(/property_bg_2.jpg)' }}
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-white/85 group-hover:bg-white/75 transition-all duration-300"></div>
                {/* Content */}
                <CardContent className="p-8 text-center relative z-10">
                  <div className="mb-6">
                    <div className="bg-blue-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto group-hover:bg-orange-500 transition-colors duration-300">
                      <img src={zeroFeesIcon} alt="Zero Fees Icon" className="h-16 w-16" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-blue-900 mb-4 group-hover:text-orange-500 transition-colors duration-300">Zero Fees</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    We pay all legal fees and costs. No estate agent fees, no surveys, no hidden charges. What we offer is what you get.
                  </p>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-700 group-hover:bg-orange-500 group-hover:text-white transition-colors duration-300 px-4 py-2">
                    No Hidden Costs
                  </Badge>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Comparison Section */}
      <section id="comparison" className="py-20 relative overflow-hidden min-h-screen">
        {/* Visual Metrics Background */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-70"
          style={{ backgroundImage: 'url(/uk_houses_hero.jpg)' }}
        />
        {/* Light overlay for readability */}
        <div className="absolute inset-0 bg-white/15"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-blue-900 mb-4">
              Compare Your Options
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See how we stack up against traditional selling methods. The choice is clear.
            </p>
          </motion.div>

          <motion.div 
            className="overflow-x-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <table className="w-full bg-white/30 backdrop-blur-lg rounded-2xl shadow-lg overflow-hidden border border-white/40">
              <thead className="bg-blue-900/70 backdrop-blur-sm text-white">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold">Selling Method</th>
                  <th className="px-6 py-4 text-center font-semibold">Time to Complete</th>
                  <th className="px-6 py-4 text-center font-semibold">Total Fees</th>
                  <th className="px-6 py-4 text-center font-semibold">Guaranteed Sale</th>
                  <th className="px-6 py-4 text-center font-semibold">Hassle Level</th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, index) => (
                  <tr key={index} className={`${row.highlight ? 'bg-green-500/20 backdrop-blur-sm border-l-4 border-green-500' : 'hover:bg-white/30 backdrop-blur-sm'} transition-all duration-300`}>
                    <td className={`px-6 py-4 font-semibold ${row.highlight ? 'text-green-700' : 'text-gray-900'}`}>
                      {row.method}
                      {row.highlight && <Badge className="ml-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-sm">BEST CHOICE</Badge>}
                    </td>
                    <td className={`px-6 py-4 text-center ${row.highlight ? 'text-green-700 font-medium' : ''}`}>{row.time}</td>
                    <td className={`px-6 py-4 text-center ${row.highlight ? 'text-green-700 font-medium' : ''}`}>
                      <span className={row.fees === '£0' ? 'text-green-600 font-bold' : 'text-red-600'}>
                        {row.fees}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      {row.guarantee === 'Yes' ? (
                        <div className="flex items-center justify-center">
                          <div className="bg-green-100/60 backdrop-blur-sm rounded-full p-1">
                            <CheckCircle className="h-5 w-5 text-green-600" />
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center">
                          <div className="bg-red-100/60 backdrop-blur-sm rounded-full p-1">
                            <span className="text-red-600 font-bold text-lg">✗</span>
                          </div>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Badge 
                        className={
                          row.hassle === 'None' 
                            ? 'bg-green-100/60 text-green-700 border-green-300/60 backdrop-blur-sm' 
                            : row.hassle === 'Medium' 
                            ? 'bg-amber-100/60 text-amber-700 border-amber-300/60 backdrop-blur-sm' 
                            : 'bg-red-100/60 text-red-700 border-red-300/60 backdrop-blur-sm'
                        }
                      >
                        {row.hassle}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>
      </section>

      {/* Process Chart Section */}
      <section className="py-20 bg-gradient-to-br from-white to-gray-50/30">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-blue-900 mb-4">
              Our Streamlined Process
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience a hassle-free journey from enquiry to completion with our transparent 4-step process.
            </p>
          </motion.div>
          <ProcessChart />
        </div>
      </section>

      {/* Enhanced Testimonials */}
      <section id="testimonials" className="py-20 bg-gradient-to-br from-blue-50/30 to-gray-50">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-blue-900 mb-4">
              What Our Customers Say
            </h2>
            <div className="flex items-center justify-center space-x-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-6 w-6 fill-yellow-400 text-yellow-400" />
              ))}
              <span className="ml-2 text-lg font-semibold text-green-600">4.9/5 from 2,847 reviews</span>
            </div>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerChildren}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <motion.div variants={fadeInUp}>
              <Card className="h-full hover:shadow-2xl transition-all duration-500 relative overflow-hidden bg-transparent group perspective-1000 hover:scale-105 hover:-translate-y-2">
                {/* Property Background */}
                <div 
                  className="absolute inset-0 bg-cover bg-center blur-sm transition-all duration-500 group-hover:blur-md group-hover:scale-110"
                  style={{ backgroundImage: 'url(/property_bg_1.webp)' }}
                />
                <CardContent className="p-6 relative z-10 bg-transparent">
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6 h-52 flex flex-col justify-between transition-all duration-500 group-hover:bg-white/30 group-hover:backdrop-blur-md group-hover:scale-105 group-hover:shadow-xl">
                    <div>
                      <div className="flex items-center space-x-1 mb-4 transition-all duration-300 group-hover:scale-110">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <p className="text-gray-700 mb-4 italic font-medium leading-relaxed transition-all duration-300 group-hover:text-gray-800 group-hover:font-semibold group-hover:scale-105">
                        "Absolutely fantastic service. They delivered exactly what they promised - cash offer in 2 hours and completion in just 3 days. Couldn't be happier with the process!"
                      </p>
                    </div>
                    <div className="flex items-center space-x-3 transition-all duration-300 group-hover:scale-105">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-blue-200">
                        <span className="text-blue-600 font-semibold">SM</span>
                      </div>
                      <div>
                        <div className="font-semibold text-blue-900 transition-all duration-300 group-hover:text-blue-800">Sarah M.</div>
                        <div className="text-sm text-gray-600 transition-all duration-300 group-hover:text-gray-700">London • Verified Purchase</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="h-full hover:shadow-2xl transition-all duration-500 relative overflow-hidden bg-transparent group perspective-1000 hover:scale-105 hover:-translate-y-2">
                {/* Property Background */}
                <div 
                  className="absolute inset-0 bg-cover bg-center blur-sm transition-all duration-500 group-hover:blur-md group-hover:scale-110"
                  style={{ backgroundImage: 'url(/property_bg_2.jpg)' }}
                />
                <CardContent className="p-6 relative z-10 bg-transparent">
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6 h-52 flex flex-col justify-between transition-all duration-500 group-hover:bg-white/30 group-hover:backdrop-blur-md group-hover:scale-105 group-hover:shadow-xl">
                    <div>
                      <div className="flex items-center space-x-1 mb-4 transition-all duration-300 group-hover:scale-110">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <p className="text-gray-700 mb-4 italic font-medium leading-relaxed transition-all duration-300 group-hover:text-gray-800 group-hover:font-semibold group-hover:scale-105">
                        "After months of trying to sell through traditional estate agents, Same Day Home Buyer sorted everything in just one week. Incredibly professional and completely stress-free experience."
                      </p>
                    </div>
                    <div className="flex items-center space-x-3 transition-all duration-300 group-hover:scale-105">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-green-200">
                        <span className="text-green-600 font-semibold">JT</span>
                      </div>
                      <div>
                        <div className="font-semibold text-blue-900 transition-all duration-300 group-hover:text-blue-800">James T.</div>
                        <div className="text-sm text-gray-600 transition-all duration-300 group-hover:text-gray-700">Manchester • Verified Purchase</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="h-full hover:shadow-2xl transition-all duration-500 relative overflow-hidden bg-transparent group perspective-1000 hover:scale-105 hover:-translate-y-2">
                {/* Property Background */}
                <div 
                  className="absolute inset-0 bg-cover bg-center blur-sm transition-all duration-500 group-hover:blur-md group-hover:scale-110"
                  style={{ backgroundImage: 'url(/property_bg_3.jpg)' }}
                />
                <CardContent className="p-6 relative z-10 bg-transparent">
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6 h-52 flex flex-col justify-between transition-all duration-500 group-hover:bg-white/30 group-hover:backdrop-blur-md group-hover:scale-105 group-hover:shadow-xl">
                    <div>
                      <div className="flex items-center space-x-1 mb-4 transition-all duration-300 group-hover:scale-110">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <p className="text-gray-700 mb-4 italic font-medium leading-relaxed transition-all duration-300 group-hover:text-gray-800 group-hover:font-semibold group-hover:scale-105">
                        "Needed to sell quickly due to unexpected financial difficulties. They were incredibly understanding, completely fair with pricing, and amazingly fast with the entire process. Highly recommended!"
                      </p>
                    </div>
                    <div className="flex items-center space-x-3 transition-all duration-300 group-hover:scale-105">
                      <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-purple-200">
                        <span className="text-purple-600 font-semibold">ER</span>
                      </div>
                      <div>
                        <div className="font-semibold text-blue-900 transition-all duration-300 group-hover:text-blue-800">Emma R.</div>
                        <div className="text-sm text-gray-600 transition-all duration-300 group-hover:text-gray-700">Birmingham • Verified Purchase</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Badge className="bg-blue-100 text-blue-900 px-4 py-2 text-sm font-semibold mb-4">
              FAQ
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to know about selling your house to us
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-6">
            {[
              {
                question: "How quickly can you complete?",
                answer: "We can provide a cash offer within 2 hours and complete the purchase in as little as 24 hours. Most transactions complete within 2-3 weeks, depending on your preferred timeline."
              },
              {
                question: "Do you charge any fees?",
                answer: "No, we don't charge any fees whatsoever. No estate agent fees, no legal costs, no survey fees, no administrative charges. The offer we make is the amount you receive."
              },
              {
                question: "What types of properties do you buy?",
                answer: "We buy all types of residential properties including houses, flats, bungalows, and maisonettes in any condition. Whether your property needs extensive renovation or is move-in ready, we're interested."
              },
              {
                question: "How do you calculate your offers?",
                answer: "Our offers are based on current market values, property condition, location, and local comparable sales. We use AI-powered analysis combined with local market expertise to ensure fair and competitive offers."
              },
              {
                question: "Is there any obligation?",
                answer: "Absolutely none. Our valuation service is completely free with no obligation to proceed. You can accept or decline our offer with no pressure or consequences."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="border-2 border-transparent hover:border-orange-500 transition-all duration-300">
                  <CardContent className="p-6">
                    <button
                      className="w-full text-left"
                      onClick={() => setActiveTab(activeTab === index ? -1 : index)}
                    >
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-blue-900">{faq.question}</h3>
                        <ChevronDown className={`h-5 w-5 text-gray-500 transform transition-transform duration-200 ${activeTab === index ? 'rotate-180' : ''}`} />
                      </div>
                    </button>
                    {activeTab === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-4 pt-4 border-t border-gray-200"
                      >
                        <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                      </motion.div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-900 to-blue-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Sell Your House Fast?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Get your free cash offer today. No obligation, no hassle, no fees. Join thousands of satisfied customers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <Button 
                onClick={handleCTAClick}
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-lg font-semibold"
              >
                Get Free Cash Offer
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <div className="flex items-center space-x-2">
                <Phone className="h-5 w-5" />
                <span className="text-lg font-semibold">Call: 0333 090 6219</span>
              </div>
            </div>
            <div className="flex items-center space-x-8 text-sm opacity-90">
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
          </motion.div>
        </div>
      </section>

      {/* Enhanced Footer */}
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
                <span>0333 090 6219</span>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-lg">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a></li>
                <li><a href="#why-us" className="hover:text-white transition-colors">Why Choose Us</a></li>
                <li><a href="#comparison" className="hover:text-white transition-colors">Compare Options</a></li>
                <li><a href="#testimonials" className="hover:text-white transition-colors">Customer Reviews</a></li>
                <li><a href="#faq" className="hover:text-white transition-colors">FAQs</a></li>
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
                <li><Link to="/refer" className="hover:text-white transition-colors">Earn £100 - Refer Properties</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-lg">Trust & Security</h4>
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-green-900/20 to-emerald-900/20 border border-green-700 rounded-lg p-3 flex items-center space-x-3">
                  <img 
                    src="https://res.cloudinary.com/dmns9ystn/image/upload/v1751322237/nabp_no_bg_ul5cyq.png" 
                    alt="NAPB Approved" 
                    className="h-12 w-auto"
                  />
                  <div>
                    <p className="text-green-300 font-medium text-sm">NAPB Approved</p>
                    <p className="text-gray-400 text-xs">National Association of Property Buyers</p>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-blue-900/20 to-indigo-900/20 border border-blue-700 rounded-lg p-3 flex items-center space-x-3">
                  <img 
                    src="https://res.cloudinary.com/dmns9ystn/image/upload/v1751322237/rics_no_bg_e2gx0k.png" 
                    alt="RICS Regulated" 
                    className="h-12 w-auto"
                  />
                  <div>
                    <p className="text-blue-300 font-medium text-sm">RICS Regulated</p>
                    <p className="text-gray-400 text-xs">Royal Institution of Chartered Surveyors</p>
                  </div>
                </div>
                <p className="text-gray-400 text-sm mt-4">
                  Fully insured and regulated for your peace of mind.
                </p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Same Day Home Buyer. All rights reserved. | Privacy Policy | Terms & Conditions</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/valuation/:postcode" element={<ValuationPage />} />
      <Route path="/refer" element={<ReferralPage />} />
      <Route path="/london" element={<LondonLandingPage />} />
      <Route path="/manchester" element={<ManchesterLandingPage />} />
      <Route path="/birmingham" element={<BirminghamLandingPage />} />
      <Route path="/liverpool" element={<LiverpoolLandingPage />} />
      <Route path="/blog" element={<BlogPage />} />
      <Route path="/blog/sell-probate-house-uk" element={<SellProbateHouseUK />} />
      <Route path="/blog/avoid-repossession-uk" element={<AvoidRepossessionUK />} />
      <Route path="/blog/sell-disrepair-house" element={<SellDisrepairHouse />} />
      <Route path="/blog/sell-house-after-divorce-uk" element={<SellHouseAfterDivorce />} />
      <Route path="/blog/emigration-house-sale" element={<EmigrationHouseSale />} />
    </Routes>
  )
}

export default App

