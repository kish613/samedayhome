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
import { propertyValuationService } from '../services/propertyValuation.js'
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
      
      // Process property offer using our valuation service
      const result = await propertyValuationService.processPropertyOffer(formData)
      
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
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="mb-8">
            <Button 
              variant="ghost" 
              onClick={onBack}
              className="mb-4 text-blue-900 hover:text-blue-700"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to postcode search
            </Button>
            
            <div className="text-center">
              <h1 className="text-4xl font-bold text-blue-900 mb-4">
                Get Your Free Cash Offer
              </h1>
              <p className="text-xl text-gray-600 mb-2">
                Property in <span className="font-semibold text-blue-900">{postcode}</span>
              </p>
              <p className="text-gray-500">
                Please provide your property details and contact information to receive your offer within 2 hours
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Property Details Card */}
              <motion.div variants={fadeInUp} initial="initial" animate="animate">
                <Card className="h-fit">
                  <CardHeader>
                    <CardTitle className="flex items-center text-blue-900">
                      <Home className="h-5 w-5 mr-2" />
                      Property Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
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
              <motion.div variants={fadeInUp} initial="initial" animate="animate">
                <Card className="h-fit">
                  <CardHeader>
                    <CardTitle className="flex items-center text-blue-900">
                      <User className="h-5 w-5 mr-2" />
                      Contact Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
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
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="flex items-start space-x-3">
                        <Checkbox
                          id="contactPermission"
                          checked={formData.contactPermission}
                          onCheckedChange={(checked) => handleInputChange('contactPermission', checked)}
                        />
                        <div className="flex-1">
                          <Label htmlFor="contactPermission" className="text-sm font-medium text-blue-900 cursor-pointer">
                            Permission to Contact *
                          </Label>
                          <p className="text-sm text-blue-700 mt-1">
                            I agree to be contacted by Same Day Home Buyer regarding my property enquiry. 
                            We will never share your details with third parties and you can unsubscribe at any time.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Trust Indicators */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-2">Your Information is Safe</h4>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• We never share your details with third parties</li>
                        <li>• No spam or unwanted marketing calls</li>
                        <li>• GDPR compliant data handling</li>
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

            {/* Submit Button */}
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Button 
                type="submit" 
                className="bg-orange-500 hover:bg-orange-600 text-white px-12 py-4 text-lg font-semibold disabled:opacity-50"
                disabled={isSubmitting || !formData.doorNumber || !formData.fullAddress || !formData.postcode || !formData.propertyType || !formData.bedrooms || !formData.condition || !formData.fullName || !formData.phone || !formData.email || !formData.contactPermission}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Calculating Your Offer...
                  </>
                ) : (
                  'Get My Free Cash Offer'
                )}
              </Button>
              <p className="text-sm text-gray-500 mt-3">
                {isSubmitting 
                  ? 'Analyzing property data and market comparables...' 
                  : "We'll calculate your offer instantly using AI-powered property analysis"
                }
              </p>
            </motion.div>
          </form>
        </motion.div>
      </div>
    </div>
  )
}

export default PropertyDetailsForm