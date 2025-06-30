import React from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { CheckCircle, ArrowLeft, Phone, Mail, Home, TrendingDown, AlertTriangle, BarChart3, RefreshCw, Users, Banknote, Clock, Shield } from 'lucide-react'
import { motion } from 'framer-motion'

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 py-8">
      <div className="container mx-auto px-4 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="text-center mb-8">
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
            
            <h1 className="text-4xl font-bold text-blue-900 mb-4">
              🎉 Your Cash Offer is Ready!
            </h1>
            <p className="text-xl text-gray-600 mb-2">
              {propertyData.doorNumber} {propertyData.fullAddress}, {propertyData.postcode}
            </p>
            <p className="text-gray-500">
              {propertyData.propertyType} • {propertyData.bedrooms} bedrooms • {propertyData.condition} condition
            </p>
          </div>

          {/* Main Offer Display */}
          <motion.div
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            className="mb-8"
          >
            <Card className="border-0 shadow-2xl bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-green-600/90"></div>
              <CardContent className="relative p-8 text-center">
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
              </CardContent>
            </Card>
          </motion.div>

          {/* Property Summary */}
          <motion.div
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center text-blue-900">
                  <Home className="h-5 w-5 mr-2" />
                  Property Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <div className="text-sm text-gray-600">Type</div>
                    <div className="font-semibold text-blue-900 capitalize">{propertyData.propertyType}</div>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <div className="text-sm text-gray-600">Bedrooms</div>
                    <div className="font-semibold text-green-900">{propertyData.bedrooms}</div>
                  </div>
                  <div className="p-3 bg-purple-50 rounded-lg">
                    <div className="text-sm text-gray-600">Condition</div>
                    <div className="font-semibold text-purple-900 capitalize">{propertyData.condition}</div>
                  </div>
                  <div className="p-3 bg-orange-50 rounded-lg">
                    <div className="text-sm text-gray-600">Postcode</div>
                    <div className="font-semibold text-orange-900">{propertyData.postcode}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Next Steps */}
          <motion.div
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            transition={{ delay: 0.3 }}
            className="mb-8"
          >
            <Card className="shadow-lg bg-green-50 border-green-200">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-green-900 mb-4 text-center">🚀 What Happens Next?</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-sm">1</div>
                    <span className="text-green-800">Our team will call you within <strong>2 hours</strong> to confirm details</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-sm">2</div>
                    <span className="text-green-800">We'll arrange a <strong>quick property inspection</strong> (if needed)</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-sm">3</div>
                    <span className="text-green-800">Complete the sale in <strong>24-48 hours</strong> with cash in your bank</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            transition={{ delay: 0.4 }}
            className="mb-8"
          >
            <Card className="shadow-lg border-blue-200">
              <CardContent className="p-6 text-center">
                <h3 className="text-lg font-semibold text-blue-900 mb-4">We'll Contact You At:</h3>
                <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-8">
                  <div className="flex items-center space-x-2 text-blue-700">
                    <Phone className="h-4 w-4" />
                    <span className="font-medium">{propertyData.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-blue-700">
                    <Mail className="h-4 w-4" />
                    <span className="font-medium">{propertyData.email}</span>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mt-4">
                  Hello <strong>{propertyData.fullName}</strong>, expect our call soon!
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            transition={{ delay: 0.5 }}
            className="text-center space-y-4"
          >
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={onBack}
                variant="outline" 
                className="px-8 py-3 text-lg"
              >
                <ArrowLeft className="mr-2 h-5 w-5" />
                Modify Property Details
              </Button>
              <Button 
                onClick={onStartNew}
                variant="outline" 
                className="px-8 py-3 text-lg"
              >
                <RefreshCw className="mr-2 h-5 w-5" />
                Get Another Offer
              </Button>
            </div>
            
            <p className="text-gray-500 text-sm mt-6">
              Questions? Call us directly at <strong>0800 123 4567</strong> for immediate assistance
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default OfferResult