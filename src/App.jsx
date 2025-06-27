import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Card, CardContent } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Clock, Phone, Mail, CheckCircle, Star, ArrowRight, Home, Users, Award, TrendingUp, FileText, Calendar, MapPin, ChevronDown, Play } from 'lucide-react'
import { motion } from 'framer-motion'
import ProcessChart from './components/ProcessChart.jsx'
import PropertyDetailsForm from './components/PropertyDetailsForm.jsx'
import './App.css'

// Import assets
const logoImg = 'https://res.cloudinary.com/dmns9ystn/image/upload/v1750951255/samedayssave_fnfu6n.png'
import heroImg from './assets/uk_houses_hero.jpg'
import cashIcon from './assets/cash_icon.png'
import cashGuaranteeIcon from './assets/cash_guarantee_icon.png'

function App() {
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
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
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
              <span className="ml-2 text-lg font-semibold">4.9/5 on Trustpilot</span>
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
                <Award className="h-10 w-10" />
              </motion.div>
              <h3 className="text-3xl font-bold text-blue-900 mb-2">20+</h3>
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
                <Home className="h-10 w-10" />
              </motion.div>
              <h3 className="text-3xl font-bold text-blue-900 mb-2">15,000+</h3>
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
                <img src={cashIcon} alt="Cash Icon" className="h-10 w-10" />
              </motion.div>
              <h3 className="text-3xl font-bold text-blue-900 mb-2">£500M+</h3>
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
                <Clock className="h-10 w-10" />
              </motion.div>
              <h3 className="text-3xl font-bold text-blue-900 mb-2">2 Hours</h3>
              <p className="text-gray-600 font-medium">Average Decision Time</p>
            </motion.div>
          </motion.div>

          {/* As Featured In */}
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <p className="text-gray-600 mb-6 font-medium">As featured in:</p>
            <div className="flex items-center justify-center space-x-8 opacity-60">
              <div className="text-2xl font-bold text-gray-700">BBC</div>
              <div className="text-2xl font-bold text-gray-700">The Times</div>
              <div className="text-2xl font-bold text-gray-700">Telegraph</div>
              <div className="text-2xl font-bold text-gray-700">Guardian</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Benefits Section */}
      <section id="why-us" className="py-20">
        <div className="container mx-auto px-4">
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
              <Card className="h-full border-2 border-transparent hover:border-orange-500 transition-all duration-300 transform hover:-translate-y-3 hover:shadow-2xl relative overflow-hidden group bg-gradient-to-br from-white to-blue-50">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <CardContent className="p-8 text-center relative z-10">
                  <div className="mb-6">
                    <div className="bg-orange-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto group-hover:bg-orange-500 transition-colors duration-300">
                      <img src={cashIcon} alt="Lightning Fast Icon" className="h-16 w-16" />
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
              <Card className="h-full border-2 border-transparent hover:border-orange-500 transition-all duration-300 transform hover:-translate-y-3 hover:shadow-2xl relative overflow-hidden group bg-gradient-to-br from-white to-green-50">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
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
              <Card className="h-full border-2 border-transparent hover:border-orange-500 transition-all duration-300 transform hover:-translate-y-3 hover:shadow-2xl relative overflow-hidden group bg-gradient-to-br from-white to-purple-50">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <CardContent className="p-8 text-center relative z-10">
                  <div className="mb-6">
                    <div className="bg-blue-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto group-hover:bg-orange-500 transition-colors duration-300">
                      <img src={cashIcon} alt="Zero Fees Icon" className="h-16 w-16" />
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
      <section id="comparison" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
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
            <table className="w-full bg-white rounded-2xl shadow-lg overflow-hidden">
              <thead className="bg-blue-900 text-white">
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
                  <tr key={index} className={`${row.highlight ? 'bg-orange-50 border-l-4 border-orange-500' : 'hover:bg-gray-50'} transition-colors`}>
                    <td className={`px-6 py-4 font-semibold ${row.highlight ? 'text-orange-600' : 'text-gray-900'}`}>
                      {row.method}
                      {row.highlight && <Badge className="ml-2 bg-orange-500 text-white">BEST CHOICE</Badge>}
                    </td>
                    <td className="px-6 py-4 text-center">{row.time}</td>
                    <td className="px-6 py-4 text-center">
                      {row.fees}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {row.guarantee === 'Yes' ? (
                        <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                      ) : (
                        <span className="text-red-500">✗</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Badge variant={row.hassle === 'None' ? 'default' : row.hassle === 'Medium' ? 'secondary' : 'destructive'}>
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
      <section className="py-20">
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
      <section id="testimonials" className="py-20 bg-gray-50">
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
              <span className="ml-2 text-lg font-semibold">4.9/5 from 2,847 reviews</span>
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
              <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4 italic">
                    "Absolutely fantastic service. They did exactly what they promised - cash offer in 2 hours and completed in 3 days. Couldn't be happier!"
                  </p>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-semibold">SM</span>
                    </div>
                    <div>
                      <div className="font-semibold text-blue-900">Sarah M.</div>
                      <div className="text-sm text-gray-500">London • Verified Purchase</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4 italic">
                    "After months of trying to sell through estate agents, Same Day Home Buyer sorted everything in a week. Professional and stress-free."
                  </p>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-600 font-semibold">JT</span>
                    </div>
                    <div>
                      <div className="font-semibold text-blue-900">James T.</div>
                      <div className="text-sm text-gray-500">Manchester • Verified Purchase</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4 italic">
                    "Needed to sell quickly due to financial difficulties. They were understanding, fair, and incredibly fast. Highly recommended."
                  </p>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                      <span className="text-purple-600 font-semibold">ER</span>
                    </div>
                    <div>
                      <div className="font-semibold text-blue-900">Emma R.</div>
                      <div className="text-sm text-gray-500">Birmingham • Verified Purchase</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
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
              <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-lg font-semibold">
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
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-lg">Trust & Security</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="bg-green-900 text-green-300 border-green-700">
                    NAPB Approved
                  </Badge>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="bg-blue-900 text-blue-300 border-blue-700">
                    RICS Regulated
                  </Badge>
                </div>
                <p className="text-gray-400 text-sm">
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

export default App

