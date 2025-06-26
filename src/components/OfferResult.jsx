import React from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { CheckCircle, ArrowLeft, Phone, Mail, Home, TrendingDown, AlertTriangle, BarChart3, RefreshCw, Users } from 'lucide-react'
import { motion } from 'framer-motion'

function OfferResult({ offerData, propertyData, onBack, onStartNew }) {
  const { offer, success } = offerData
  
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
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
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
              <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
            </motion.div>
            
            <h1 className="text-4xl font-bold text-blue-900 mb-4">
              Your Cash Offer is Ready!
            </h1>
            <p className="text-xl text-gray-600 mb-2">
              Property: {propertyData.doorNumber} {propertyData.fullAddress}, {propertyData.postcode}
            </p>
            <p className="text-gray-500">
              {success ? 'Calculated using live market data and AI analysis' : 'Estimated using property characteristics'}
            </p>
          </div>

          {/* Main Offer Card */}
          <motion.div
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            className="mb-8"
          >
            <Card className="border-2 border-orange-200 bg-gradient-to-br from-orange-50 to-white">
              <CardContent className="p-8 text-center">
                <div className="mb-6">
                  <Badge className="bg-orange-500 text-white px-4 py-2 text-lg font-semibold mb-4">
                    INSTANT CASH OFFER
                  </Badge>
                </div>
                
                <div className="mb-6">
                  <div className="text-6xl font-bold text-blue-900 mb-2">
                    {formatCurrency(offer.cash_offer)}
                  </div>
                  <div className="text-xl text-gray-600">
                    Cash in your account within 24 hours
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-white/80 rounded-lg p-4">
                    <div className="text-sm text-gray-600 mb-1">Market Value</div>
                    <div className="text-2xl font-bold text-blue-900">
                      {formatCurrency(offer.market_value)}
                    </div>
                  </div>
                  <div className="bg-white/80 rounded-lg p-4">
                    <div className="text-sm text-gray-600 mb-1">Our Discount</div>
                    <div className="text-2xl font-bold text-orange-600">
                      {offer.discount_percentage}%
                    </div>
                  </div>
                  <div className="bg-white/80 rounded-lg p-4">
                    <div className="text-sm text-gray-600 mb-1">You Save</div>
                    <div className="text-2xl font-bold text-green-600">
                      £0 Fees
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-lg font-semibold">
                    <Phone className="mr-2 h-5 w-5" />
                    Accept Offer - Call Now
                  </Button>
                  <Button variant="outline" className="border-orange-500 text-orange-600 hover:bg-orange-50 px-8 py-4 text-lg font-semibold">
                    <Mail className="mr-2 h-5 w-5" />
                    Email Me Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Analysis Details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            
            {/* Property Analysis */}
            <motion.div
              variants={fadeInUp}
              initial="initial"
              animate="animate"
              transition={{ delay: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-blue-900">
                    <Home className="h-5 w-5 mr-2" />
                    Property Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Type:</span>
                      <span className="ml-2 font-medium capitalize">{propertyData.propertyType}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Bedrooms:</span>
                      <span className="ml-2 font-medium">{propertyData.bedrooms}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Condition:</span>
                      <span className="ml-2 font-medium capitalize">{propertyData.condition}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Postcode:</span>
                      <span className="ml-2 font-medium">{propertyData.postcode}</span>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-900 mb-2">Valuation Reasoning</h4>
                    <p className="text-sm text-blue-700">
                      {offer.reasoning}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Market Analysis */}
            <motion.div
              variants={fadeInUp}
              initial="initial"
              animate="animate"
              transition={{ delay: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-blue-900">
                    <BarChart3 className="h-5 w-5 mr-2" />
                    Market Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {offer.comparable_analysis && (
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-2">Comparable Properties</h4>
                      <p className="text-sm text-gray-700">
                        {offer.comparable_analysis}
                      </p>
                    </div>
                  )}
                  
                  {offer.risk_factors && offer.risk_factors.length > 0 && (
                    <div className="bg-yellow-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-yellow-800 mb-2 flex items-center">
                        <AlertTriangle className="h-4 w-4 mr-2" />
                        Risk Factors Considered
                      </h4>
                      <ul className="text-sm text-yellow-700 space-y-1">
                        {offer.risk_factors.map((factor, index) => (
                          <li key={index}>• {factor}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {!success && (
                    <div className="bg-amber-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-amber-800 mb-2">Estimation Notice</h4>
                      <p className="text-sm text-amber-700">
                        This is an estimated offer based on property characteristics. 
                        Our team will verify with live market data and provide a final offer.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Why Choose Us */}
          <motion.div
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            transition={{ delay: 0.4 }}
            className="mb-8"
          >
            <Card className="bg-blue-900 text-white">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6 text-center">Why Choose Our Cash Offer?</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="h-8 w-8" />
                    </div>
                    <h4 className="font-semibold mb-2">Guaranteed Completion</h4>
                    <p className="text-blue-100 text-sm">No chain, no mortgage, no fall-throughs</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <TrendingDown className="h-8 w-8" />
                    </div>
                    <h4 className="font-semibold mb-2">Zero Fees</h4>
                    <p className="text-blue-100 text-sm">We cover all legal costs and charges</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <Users className="h-8 w-8" />
                    </div>
                    <h4 className="font-semibold mb-2">Expert Team</h4>
                    <p className="text-blue-100 text-sm">20+ years of property buying experience</p>
                  </div>
                </div>
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
                className="px-6 py-3"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Modify Details
              </Button>
              <Button 
                onClick={onStartNew}
                variant="outline" 
                className="px-6 py-3"
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                New Property
              </Button>
            </div>
            
            <div className="mt-6 p-4 bg-white rounded-lg border">
              <p className="text-gray-600 text-sm mb-2">
                <strong>Next Steps:</strong> Our team will contact {propertyData.fullName} within 2 hours to confirm details and arrange completion.
              </p>
              <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
                <span>📞 {propertyData.phone}</span>
                <span>📧 {propertyData.email}</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default OfferResult