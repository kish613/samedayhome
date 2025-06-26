import React, { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Label } from '@/components/ui/label.jsx'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx'
import { Textarea } from '@/components/ui/textarea.jsx'
import { Checkbox } from '@/components/ui/checkbox.jsx'
import { ArrowLeft, Home, User, Phone, Mail, Calendar, MapPin, Loader2, CheckCircle, AlertCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import { apiClient } from '../services/apiClient.js'
import OfferResult from './OfferResult.jsx'

function PropertyDetailsForm({ postcode, onBack }) {
  const [formData, setFormData] = useState({
    // Property Details
    doorNumber: '',
    fullAddress: '',
    postcode: postcode || '',
    propertyType: '',
    bedrooms: '',
    condition: '',
    
    // Contact Details
    fullName: '',
    email: '',
    phone: '',
    
    // Permissions
    contactPermission: false
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [offerResult, setOfferResult] = useState(null)
  const [error, setError] = useState(null)

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validate required fields
    if (!formData.doorNumber || !formData.fullAddress || !formData.propertyType || 
        !formData.bedrooms || !formData.condition || !formData.fullName || 
        !formData.email || !formData.phone || !formData.contactPermission) {
      setError('Please fill in all required fields and agree to be contacted.')
      return
    }
    
    setIsSubmitting(true)
    setError(null)
    
    try {
      console.log('Processing property valuation...', formData)
      
      // Process property offer using our Vercel API
      const result = await apiClient.processPropertyOffer(formData)
      
      if (result.success) {
        setOfferResult(result.data)
        console.log('Offer calculated successfully:', result.data)
      } else {
        // Use fallback if APIs failed
        setOfferResult({
          success: false,
          offer: result.fallback,
          message: result.message
        })
        console.log('Using fallback calculation:', result.fallback)
      }
      
    } catch (error) {
      console.error('Error processing offer:', error)
      setError('Sorry, we encountered an issue processing your request. Please try again or call us directly.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  }

  // Show offer result if calculation is complete
  if (offerResult) {
    return <OfferResult 
      offerData={offerResult} 
      propertyData={formData} 
      onBack={() => setOfferResult(null)}
      onStartNew={() => {
        setOfferResult(null)
        onBack()
      }}
    />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Header Section with Brand Consistency */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Button 
              variant="ghost" 
              onClick={onBack}
              className="mb-6 text-white hover:text-blue-200 hover:bg-white/10"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to postcode search
            </Button>
            
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mb-6"
              >
                <div className="mx-auto w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-10 w-10 text-white" />
                </div>
              </motion.div>
              
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Get Your Free Cash Offer
              </h1>
              <p className="text-xl md:text-2xl mb-4">
                Property in <span className="text-orange-400 font-bold">{postcode}</span>
              </p>
              <p className="text-blue-100 text-lg max-w-3xl mx-auto">
                Our AI-powered valuation system will analyze your property and provide you with a guaranteed cash offer within 2 hours
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Form Section */}
      <div className="container mx-auto px-4 max-w-6xl -mt-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Property Details Card */}
              <motion.div 
                variants={fadeInUp} 
                initial="initial" 
                animate="animate"
                className="relative"
              >
                <Card className="border-2 border-transparent hover:border-orange-500 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl bg-gradient-to-br from-white to-blue-50 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <CardHeader className="relative z-10">
                    <CardTitle className="flex items-center text-blue-900 text-xl">
                      <div className="bg-orange-100 rounded-full w-12 h-12 flex items-center justify-center mr-3 group-hover:bg-orange-500 transition-colors duration-300">
                        <Home className="h-6 w-6 text-orange-600 group-hover:text-white transition-colors duration-300" />
                      </div>
                      Property Details
                    </CardTitle>
                    <p className="text-gray-600 mt-2">Tell us about your property so we can provide an accurate valuation</p>
                  </CardHeader>
                  <CardContent className="space-y-6 relative z-10">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="doorNumber">Door Number *</Label>
                        <Input
                          id="doorNumber"
                          type="text"
                          placeholder="e.g. 123"
                          value={formData.doorNumber}
                          onChange={(e) => handleInputChange('doorNumber', e.target.value)}
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="postcode">Postcode *</Label>
                        <Input
                          id="postcode"
                          type="text"
                          placeholder="e.g. SW1A 1AA"
                          value={formData.postcode}
                          onChange={(e) => handleInputChange('postcode', e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="fullAddress">Full Address *</Label>
                      <Input
                        id="fullAddress"
                        type="text"
                        placeholder="e.g. Oak Street, London"
                        value={formData.fullAddress}
                        onChange={(e) => handleInputChange('fullAddress', e.target.value)}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="propertyType">House Type *</Label>
                        <Select value={formData.propertyType} onValueChange={(value) => handleInputChange('propertyType', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="detached">Detached</SelectItem>
                            <SelectItem value="semi-detached">Semi-detached</SelectItem>
                            <SelectItem value="terraced">Terraced</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="bedrooms">Number of Bedrooms *</Label>
                        <Select value={formData.bedrooms} onValueChange={(value) => handleInputChange('bedrooms', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">1</SelectItem>
                            <SelectItem value="2">2</SelectItem>
                            <SelectItem value="3">3</SelectItem>
                            <SelectItem value="4">4</SelectItem>
                            <SelectItem value="5+">5+</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="condition">Property Condition *</Label>
                      <Select value={formData.condition} onValueChange={(value) => handleInputChange('condition', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select condition" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="excellent">Excellent</SelectItem>
                          <SelectItem value="good">Good</SelectItem>
                          <SelectItem value="fair">Fair</SelectItem>
                          <SelectItem value="requires-work">Requires Work</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Contact Details Card */}
              <motion.div 
                variants={fadeInUp} 
                initial="initial" 
                animate="animate"
                className="relative"
              >
                <Card className="border-2 border-transparent hover:border-orange-500 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl bg-gradient-to-br from-white to-green-50 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <CardHeader className="relative z-10">
                    <CardTitle className="flex items-center text-blue-900 text-xl">
                      <div className="bg-green-100 rounded-full w-12 h-12 flex items-center justify-center mr-3 group-hover:bg-orange-500 transition-colors duration-300">
                        <User className="h-6 w-6 text-green-600 group-hover:text-white transition-colors duration-300" />
                      </div>
                      Contact Details
                    </CardTitle>
                    <p className="text-gray-600 mt-2">How can we reach you with your cash offer?</p>
                  </CardHeader>
                  <CardContent className="space-y-6 relative z-10">
                    <div>
                      <Label htmlFor="fullName">Full Name *</Label>
                      <Input
                        id="fullName"
                        type="text"
                        placeholder="Your full name"
                        value={formData.fullName}
                        onChange={(e) => handleInputChange('fullName', e.target.value)}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="07xxx xxx xxx"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        required
                      />
                    </div>

                    {/* Permission Checkbox */}
                    <div className="bg-gradient-to-r from-orange-50 to-blue-50 p-6 rounded-xl border border-orange-200">
                      <div className="flex items-start space-x-4">
                        <Checkbox
                          id="contactPermission"
                          checked={formData.contactPermission}
                          onCheckedChange={(checked) => handleInputChange('contactPermission', checked)}
                          className="mt-1"
                        />
                        <div className="flex-1">
                          <Label htmlFor="contactPermission" className="text-base font-semibold text-blue-900 cursor-pointer flex items-center">
                            <CheckCircle className="h-4 w-4 mr-2 text-orange-500" />
                            Permission to Contact *
                          </Label>
                          <p className="text-sm text-gray-700 mt-2 leading-relaxed">
                            I agree to be contacted by Same Day Home Buyer regarding my property enquiry. 
                            We will never share your details with third parties and you can unsubscribe at any time.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Trust Indicators */}
                    <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-xl border border-green-200">
                      <h4 className="font-bold text-blue-900 mb-3 flex items-center">
                        <div className="bg-green-500 rounded-full w-6 h-6 flex items-center justify-center mr-3">
                          <CheckCircle className="h-4 w-4 text-white" />
                        </div>
                        Your Information is Safe
                      </h4>
                      <ul className="text-sm text-gray-700 space-y-2">
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                          We never share your details with third parties
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                          No spam or unwanted marketing calls
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                          GDPR compliant data handling
                        </li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Error Display */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center"
              >
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                  <div className="flex items-center justify-center space-x-2 text-red-600">
                    <AlertCircle className="h-5 w-5" />
                    <span className="font-medium">Error</span>
                  </div>
                  <p className="text-red-700 mt-2">{error}</p>
                </div>
              </motion.div>
            )}

            {/* Submit Button Section */}
            <motion.div
              className="text-center py-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="bg-gradient-to-r from-blue-900 to-blue-700 rounded-2xl p-8 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold mb-4">Ready for Your Instant Cash Offer?</h3>
                  <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                    Our AI will analyze your property details and provide a guaranteed cash offer within minutes
                  </p>
                  
                  <Button 
                    type="submit" 
                    className="bg-orange-500 hover:bg-orange-600 text-white px-16 py-6 text-xl font-bold rounded-xl disabled:opacity-50 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                    disabled={isSubmitting || !formData.doorNumber || !formData.fullAddress || !formData.postcode || !formData.propertyType || !formData.bedrooms || !formData.condition || !formData.fullName || !formData.phone || !formData.email || !formData.contactPermission}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-3 h-6 w-6 animate-spin" />
                        Calculating Your Offer...
                      </>
                    ) : (
                      <>
                        Get My Free Cash Offer
                        <CheckCircle className="ml-3 h-6 w-6" />
                      </>
                    )}
                  </Button>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 text-sm">
                    <div className="flex items-center justify-center space-x-2">
                      <CheckCircle className="h-5 w-5 text-green-400" />
                      <span>Instant AI Analysis</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2">
                      <CheckCircle className="h-5 w-5 text-green-400" />
                      <span>No Hidden Fees</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2">
                      <CheckCircle className="h-5 w-5 text-green-400" />
                      <span>2-Hour Response</span>
                    </div>
                  </div>
                  
                  <p className="text-blue-200 mt-4 text-sm">
                    {isSubmitting 
                      ? 'Analyzing property data using 10+ market factors and AI intelligence...' 
                      : "Join thousands of satisfied customers who chose our AI-powered valuation service"
                    }
                  </p>
                </div>
              </div>
            </motion.div>
          </form>
        </motion.div>
      </div>
      
      {/* Bottom Trust Section */}
      <div className="bg-gray-50 py-16 mt-16">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-blue-900 mb-6">Why Choose Same Day Home Buyer?</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                  <CheckCircle className="h-8 w-8 text-orange-600" />
                </div>
                <h4 className="font-semibold text-blue-900 mb-2">Guaranteed Offers</h4>
                <p className="text-gray-600 text-sm">Every offer is backed by our commitment to complete</p>
              </div>
              <div className="text-center">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                  <Clock className="h-8 w-8 text-blue-600" />
                </div>
                <h4 className="font-semibold text-blue-900 mb-2">2-Hour Response</h4>
                <p className="text-gray-600 text-sm">Fast AI-powered analysis and instant decisions</p>
              </div>
              <div className="text-center">
                <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                  <Home className="h-8 w-8 text-green-600" />
                </div>
                <h4 className="font-semibold text-blue-900 mb-2">Any Condition</h4>
                <p className="text-gray-600 text-sm">We buy properties in any condition, as-is</p>
              </div>
              <div className="text-center">
                <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                  <CheckCircle className="h-8 w-8 text-purple-600" />
                </div>
                <h4 className="font-semibold text-blue-900 mb-2">Zero Fees</h4>
                <p className="text-gray-600 text-sm">No estate agent fees, legal costs, or hidden charges</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default PropertyDetailsForm