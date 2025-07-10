import React from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { CheckCircle, ArrowLeft, Phone, Mail, Home, TrendingDown, AlertTriangle, BarChart3, RefreshCw, Users, Banknote, Clock, Shield, Star, Award } from 'lucide-react'
import { motion } from 'framer-motion'

// Import the same hero image as homepage for consistency
import heroImg from '../assets/uk_houses_hero.jpg'
import AnimatedMedal from './AnimatedMedal.jsx'
import AnimatedClock from './AnimatedClock.jsx'
import AnimatedLock from './AnimatedLock.jsx'
import AnimatedGoldPound from './AnimatedGoldPound.jsx'

function OfferResult({ offerData, propertyData, onBack, onStartNew }) {
  const { offer, success } = offerData.data || offerData
  
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      maximumFractionDigits: 0
    }).format(amount)
  }

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  }

  return (
    <div className="min-h-screen bg-slate-50 relative">
      {/* Hero Background with Same Image and Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImg})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-blue-700/60"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10">
        {/* Premium Header */}
        <div className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 text-white">
          <div className="container mx-auto px-6 py-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center justify-between mb-8">
                <Button 
                  variant="ghost" 
                  onClick={onBack}
                  className="text-white/80 hover:text-white hover:bg-white/10 border border-white/20 transition-all duration-300 ease-in-out transform hover:scale-105"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Modify Details
                </Button>
                <Button 
                  variant="ghost" 
                  onClick={onStartNew}
                  className="text-white/80 hover:text-white hover:bg-white/10 border border-white/20 transition-all duration-300 ease-in-out transform hover:scale-105"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Get Another Offer
                </Button>
              </div>
              
              <div className="text-center max-w-4xl mx-auto">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="mb-6"
                >
                  <div className="mx-auto w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-12 w-12 text-green-600" />
                  </div>
                </motion.div>
                
                <div className="flex items-center justify-center space-x-2 mb-6">
                  <Award className="h-8 w-8 text-orange-400" />
                  <span className="text-orange-400 font-semibold text-lg">Guaranteed Cash Offer Approved</span>
                </div>
                
                <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
                  🎉 Your Cash Offer is Ready!
                </h1>
                
                <p className="text-xl text-blue-100 mb-2 leading-relaxed">
                  {propertyData.doorNumber} {propertyData.fullAddress}, {propertyData.postcode}
                </p>
                <p className="text-blue-200 mb-8">
                  {propertyData.propertyType} • {propertyData.bedrooms} bedrooms • {propertyData.condition} condition
                </p>
                
                <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-8 text-xs sm:text-sm">
                  <div className="flex items-center space-x-2">
                    <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-green-400" />
                    <span>RICS Regulated</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Star className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-400" />
                    <span>4.9/5 Trustpilot</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400" />
                    <span>2-Hour Decision</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-6 -mt-16 relative z-10 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >

            {/* Main Offer Display */}
            <motion.div
              variants={fadeInUp}
              initial="initial"
              animate="animate"
              className="mb-8"
            >
              <div className="bg-white/70 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-white/40 hover:shadow-3xl hover:bg-white/75 transition-all duration-500">
                <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white overflow-hidden rounded-2xl relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-green-600/90"></div>
                  <div className="relative p-8 text-center">
                    <div className="mb-4">
                      <Banknote className="h-16 w-16 mx-auto mb-4 text-white/80" />
                    </div>
                    <h2 className="text-2xl font-semibold mb-2 text-white/90">Your Same Day Cash Offer</h2>
                    <div className="text-6xl md:text-7xl font-bold mb-4 text-white">
                      {formatCurrency(offer.cash_offer)}
                    </div>
                    <p className="text-xl text-white/90 mb-6">
                      Ready to complete in 24-48 hours
                    </p>
                    
                    {/* Key Benefits */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                      <div className="flex items-center justify-center space-x-2 text-white/90">
                        <Clock className="h-5 w-5" />
                        <span className="font-medium">Same Day Decision</span>
                      </div>
                      <div className="flex items-center justify-center space-x-2 text-white/90">
                        <Shield className="h-5 w-5" />
                        <span className="font-medium">No Chain Required</span>
                      </div>
                      <div className="flex items-center justify-center space-x-2 text-white/90">
                        <Banknote className="h-5 w-5" />
                        <span className="font-medium">Zero Fees</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Property Summary */}
            <motion.div
              variants={fadeInUp}
              initial="initial"
              animate="animate"
              transition={{ delay: 0.2 }}
              className="mb-8"
            >
              <div className="bg-white/70 backdrop-blur-md rounded-3xl shadow-lg p-8 border border-white/40 hover:shadow-xl hover:bg-white/75 transition-all duration-500">
                <div className="border-l-4 border-blue-500 pl-6 mb-6">
                  <h2 className="text-2xl font-bold text-slate-900 mb-2 flex items-center">
                    <Home className="h-6 w-6 mr-3" />
                    Property Summary
                  </h2>
                  <p className="text-slate-600">Details of your valued property</p>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div className="p-4 bg-blue-50/80 backdrop-blur-sm rounded-xl hover:bg-blue-50 transition-all duration-300">
                    <div className="text-sm text-gray-600 mb-1">Type</div>
                    <div className="font-semibold text-blue-900 capitalize">{propertyData.propertyType}</div>
                  </div>
                  <div className="p-4 bg-green-50/80 backdrop-blur-sm rounded-xl hover:bg-green-50 transition-all duration-300">
                    <div className="text-sm text-gray-600 mb-1">Bedrooms</div>
                    <div className="font-semibold text-green-900">{propertyData.bedrooms}</div>
                  </div>
                  <div className="p-4 bg-purple-50/80 backdrop-blur-sm rounded-xl hover:bg-purple-50 transition-all duration-300">
                    <div className="text-sm text-gray-600 mb-1">Condition</div>
                    <div className="font-semibold text-purple-900 capitalize">{propertyData.condition}</div>
                  </div>
                  <div className="p-4 bg-orange-50/80 backdrop-blur-sm rounded-xl hover:bg-orange-50 transition-all duration-300">
                    <div className="text-sm text-gray-600 mb-1">Postcode</div>
                    <div className="font-semibold text-orange-900">{propertyData.postcode}</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Next Steps */}
            <motion.div
              variants={fadeInUp}
              initial="initial"
              animate="animate"
              transition={{ delay: 0.3 }}
              className="mb-8"
            >
              <div className="bg-white/70 backdrop-blur-md rounded-3xl shadow-lg p-8 border border-white/40 hover:shadow-xl hover:bg-white/75 transition-all duration-500">
                <div className="border-l-4 border-green-500 pl-6 mb-6">
                  <h2 className="text-2xl font-bold text-slate-900 mb-2 flex items-center">
                    🚀 What Happens Next?
                  </h2>
                  <p className="text-slate-600">Your journey to a quick sale begins now</p>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 p-4 bg-green-50/80 backdrop-blur-sm rounded-xl hover:bg-green-50 transition-all duration-300">
                    <div className="w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-sm">1</div>
                    <span className="text-green-800 font-medium">Our team will call you within <strong>2 hours</strong> to confirm details</span>
                  </div>
                  <div className="flex items-center space-x-4 p-4 bg-green-50/80 backdrop-blur-sm rounded-xl hover:bg-green-50 transition-all duration-300">
                    <div className="w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-sm">2</div>
                    <span className="text-green-800 font-medium">We'll arrange a <strong>quick property inspection</strong> (if needed)</span>
                  </div>
                  <div className="flex items-center space-x-4 p-4 bg-green-50/80 backdrop-blur-sm rounded-xl hover:bg-green-50 transition-all duration-300">
                    <div className="w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-sm">3</div>
                    <span className="text-green-800 font-medium">Complete the sale in <strong>24-48 hours</strong> with cash in your bank</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              variants={fadeInUp}
              initial="initial"
              animate="animate"
              transition={{ delay: 0.4 }}
              className="mb-8"
            >
              <div className="bg-white/70 backdrop-blur-md rounded-3xl shadow-lg p-8 border border-white/40 hover:shadow-xl hover:bg-white/75 transition-all duration-500">
                <div className="border-l-4 border-blue-500 pl-6 mb-6">
                  <h2 className="text-2xl font-bold text-slate-900 mb-2 flex items-center">
                    We'll Contact You At:
                  </h2>
                  <p className="text-slate-600">Your dedicated property advisor will reach out soon</p>
                </div>
                
                <div className="text-center">
                  <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 mb-6">
                    <div className="flex items-center space-x-3 p-4 bg-blue-50/80 backdrop-blur-sm rounded-xl hover:bg-blue-50 transition-all duration-300">
                      <Phone className="h-5 w-5 text-blue-600" />
                      <span className="font-medium text-blue-700">{propertyData.phone}</span>
                    </div>
                    <div className="flex items-center space-x-3 p-4 bg-blue-50/80 backdrop-blur-sm rounded-xl hover:bg-blue-50 transition-all duration-300">
                      <Mail className="h-5 w-5 text-blue-600" />
                      <span className="font-medium text-blue-700">{propertyData.email}</span>
                    </div>
                  </div>
                  <p className="text-slate-600 text-sm">
                    Hello <strong>{propertyData.fullName}</strong>, expect our call soon!
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Premium Promise Section */}
            <motion.div
              variants={fadeInUp}
              initial="initial"
              animate="animate"
              transition={{ delay: 0.5 }}
              className="mb-8"
            >
              <div className="bg-gradient-to-r from-slate-900 to-blue-900 rounded-3xl p-8 text-white text-center">
                <h3 className="text-2xl font-bold mb-4">Your Premium Service Promise</h3>
                <p className="text-blue-100 mb-6 text-lg max-w-2xl mx-auto">
                  We're committed to providing you with the UK's fastest, most professional property buying service
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                  <div className="flex items-center justify-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-400" />
                    <span>Expert Market Analysis</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-400" />
                    <span>Guaranteed Completion</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-400" />
                    <span>Zero Hidden Costs</span>
                  </div>
                </div>
                
                <p className="text-blue-200 mt-6 text-sm">
                  Questions? Call us directly at <strong>0330 043 7570</strong> for immediate assistance
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Premium Footer Section */}
        <div className="bg-slate-100 py-16 mt-16">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-slate-900 mb-4">Why 15,000+ Property Owners Choose Us</h3>
              <p className="text-slate-600 text-lg max-w-3xl mx-auto">
                We're not just another house buying service. We're the UK's most trusted and experienced cash property buyers.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
              <div className="text-center group">
                <div className="bg-white rounded-2xl p-6 shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                  <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <AnimatedMedal className="scale-150" />
                  </div>
                  <h4 className="font-bold text-slate-900 mb-2 text-lg">Award Winning</h4>
                  <p className="text-slate-600 text-sm">Recognized industry leader with multiple awards for customer service excellence</p>
                </div>
              </div>
              
              <div className="text-center group">
                <div className="bg-white rounded-2xl p-6 shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                  <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <AnimatedClock className="scale-125" />
                  </div>
                  <h4 className="font-bold text-slate-900 mb-2 text-lg">Lightning Fast</h4>
                  <p className="text-slate-600 text-sm">2-hour decision guarantee with 24-hour completion available nationwide</p>
                </div>
              </div>
              
              <div className="text-center group">
                <div className="bg-white rounded-2xl p-6 shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                  <div className="bg-gradient-to-br from-green-500 to-emerald-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <AnimatedLock size={32} />
                  </div>
                  <h4 className="font-bold text-slate-900 mb-2 text-lg">Fully Regulated</h4>
                  <p className="text-slate-600 text-sm">RICS regulated, fully insured, and compliant with all industry standards</p>
                </div>
              </div>
              
              <div className="text-center group">
                <div className="bg-white rounded-2xl p-6 shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                  <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <AnimatedGoldPound size={32} />
                  </div>
                  <h4 className="font-bold text-slate-900 mb-2 text-lg">£500M+ Invested</h4>
                  <p className="text-slate-600 text-sm">Massive investment fund ready to complete on your property immediately</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OfferResult