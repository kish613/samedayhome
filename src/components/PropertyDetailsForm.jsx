import React, { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Label } from '@/components/ui/label.jsx'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx'
import { Checkbox } from '@/components/ui/checkbox.jsx'
import { ArrowLeft, Building2, Shield, Clock, Banknote, Loader2, CheckCircle, Star, Award, TrendingUp } from 'lucide-react'
import { motion } from 'framer-motion'
import { apiClient } from '../services/apiClient.js'
import OfferResult from './OfferResult.jsx'

// Import the same hero image
import heroImg from '../assets/uk_houses_hero.jpg'

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
      setError('Please complete all required fields to proceed with your valuation.')
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
      setError('We apologize for the inconvenience. Please contact our team directly at 0333 090 6219 for immediate assistance.')
    } finally {
      setIsSubmitting(false)
    }
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
        <div className="text-white">
          <div className="container mx-auto px-6 py-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Button 
                variant="ghost" 
                onClick={onBack}
                className="mb-8 text-white/80 hover:text-white hover:bg-white/10 border border-white/20"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Return to Search
              </Button>
              
              <div className="text-center max-w-4xl mx-auto">
                <div className="flex items-center justify-center space-x-2 mb-6">
                  <Award className="h-8 w-8 text-orange-400" />
                  <span className="text-orange-400 font-semibold text-lg">Trusted by 15,000+ Property Owners</span>
                </div>
                
                <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
                  Exclusive Cash Offer
                  <span className="block text-orange-400 mt-2">For {postcode}</span>
                </h1>
                
                <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                  Our proprietary AI valuation system will analyze your property using 50+ market factors 
                  to deliver a guaranteed cash offer within 2 hours
                </p>
                
                <div className="flex items-center justify-center space-x-8 text-sm">
                  <div className="flex items-center space-x-2">
                    <Shield className="h-5 w-5 text-green-400" />
                    <span>RICS Regulated</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Star className="h-5 w-5 text-yellow-400" />
                    <span>4.9/5 Trustpilot</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="h-5 w-5 text-blue-400" />
                    <span>£500M+ Invested</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Premium Form Section with Enhanced Visibility */}
        <div className="container mx-auto px-6 py-8 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit}>
              <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 lg:p-12 border border-white/50">
                
                {/* Progress Indicators */}
                <div className="flex items-center justify-center mb-12">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm">1</div>
                      <span className="font-semibold text-slate-700">Property Details</span>
                    </div>
                    <div className="w-16 h-0.5 bg-slate-300"></div>
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm">2</div>
                      <span className="font-semibold text-slate-700">Contact Information</span>
                    </div>
                    <div className="w-16 h-0.5 bg-slate-300"></div>
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-slate-300 rounded-full flex items-center justify-center text-slate-500 font-bold text-sm">3</div>
                      <span className="font-medium text-slate-500">Instant Offer</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
                  
                  {/* Property Information */}
                  <div className="space-y-8">
                    <div className="border-l-4 border-orange-500 pl-6">
                      <h2 className="text-2xl font-bold text-slate-900 mb-2 flex items-center">
                        <Building2 className="h-6 w-6 mr-3 text-orange-500" />
                        Property Information
                      </h2>
                      <p className="text-slate-600">Provide accurate details for the most precise valuation</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label className="text-slate-700 font-semibold">Property Number</Label>
                        <Input
                          type="text"
                          placeholder="e.g. 42"
                          value={formData.doorNumber}
                          onChange={(e) => handleInputChange('doorNumber', e.target.value)}
                          className="h-12 border-2 border-slate-200 focus:border-orange-500 bg-white/90"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-slate-700 font-semibold">Postcode</Label>
                        <Input
                          type="text"
                          value={formData.postcode}
                          onChange={(e) => handleInputChange('postcode', e.target.value)}
                          className="h-12 border-2 border-slate-200 focus:border-orange-500 bg-slate-100"
                          readOnly
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-slate-700 font-semibold">Full Address</Label>
                      <Input
                        type="text"
                        placeholder="e.g. Downing Street, Westminster"
                        value={formData.fullAddress}
                        onChange={(e) => handleInputChange('fullAddress', e.target.value)}
                        className="h-12 border-2 border-slate-200 focus:border-orange-500 bg-white/90"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label className="text-slate-700 font-semibold">Property Type</Label>
                        <Select onValueChange={(value) => handleInputChange('propertyType', value)} required>
                          <SelectTrigger className="h-12 border-2 border-slate-200 focus:border-orange-500 bg-white/90">
                            <SelectValue placeholder="Select property type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="detached-house">Detached House</SelectItem>
                            <SelectItem value="semi-detached-house">Semi-Detached House</SelectItem>
                            <SelectItem value="terraced-house">Terraced House</SelectItem>
                            <SelectItem value="flat-apartment">Flat/Apartment</SelectItem>
                            <SelectItem value="bungalow">Bungalow</SelectItem>
                            <SelectItem value="maisonette">Maisonette</SelectItem>
                            <SelectItem value="cottage">Cottage</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-slate-700 font-semibold">Number of Bedrooms</Label>
                        <Select onValueChange={(value) => handleInputChange('bedrooms', value)} required>
                          <SelectTrigger className="h-12 border-2 border-slate-200 focus:border-orange-500 bg-white/90">
                            <SelectValue placeholder="Select bedrooms" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="studio">Studio</SelectItem>
                            <SelectItem value="1">1 Bedroom</SelectItem>
                            <SelectItem value="2">2 Bedrooms</SelectItem>
                            <SelectItem value="3">3 Bedrooms</SelectItem>
                            <SelectItem value="4">4 Bedrooms</SelectItem>
                            <SelectItem value="5">5 Bedrooms</SelectItem>
                            <SelectItem value="6+">6+ Bedrooms</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-slate-700 font-semibold">Property Condition</Label>
                      <Select onValueChange={(value) => handleInputChange('condition', value)} required>
                        <SelectTrigger className="h-12 border-2 border-slate-200 focus:border-orange-500 bg-white/90">
                          <SelectValue placeholder="Select condition" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="excellent">Excellent - Recently renovated/new build</SelectItem>
                          <SelectItem value="good">Good - Well maintained, minor work needed</SelectItem>
                          <SelectItem value="fair">Fair - Some modernisation required</SelectItem>
                          <SelectItem value="poor">Poor - Significant renovation needed</SelectItem>
                          <SelectItem value="very-poor">Very Poor - Major structural work required</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Contact Information & Submission */}
                  <div className="space-y-8">
                    <div className="border-l-4 border-blue-500 pl-6">
                      <h2 className="text-2xl font-bold text-slate-900 mb-2 flex items-center">
                        <Banknote className="h-6 w-6 mr-3 text-blue-500" />
                        Contact Details
                      </h2>
                      <p className="text-slate-600">We'll send your instant cash offer to these details</p>
                    </div>

                    <div className="space-y-6">
                      <div className="space-y-2">
                        <Label className="text-slate-700 font-semibold">Full Name</Label>
                        <Input
                          type="text"
                          placeholder="Your full name"
                          value={formData.fullName}
                          onChange={(e) => handleInputChange('fullName', e.target.value)}
                          className="h-12 border-2 border-slate-200 focus:border-blue-500 bg-white/90"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-slate-700 font-semibold">Email Address</Label>
                        <Input
                          type="email"
                          placeholder="your.email@example.com"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className="h-12 border-2 border-slate-200 focus:border-blue-500 bg-white/90"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-slate-700 font-semibold">Phone Number</Label>
                        <Input
                          type="tel"
                          placeholder="07xxx xxx xxx"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          className="h-12 border-2 border-slate-200 focus:border-blue-500 bg-white/90"
                          required
                        />
                      </div>

                      <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                        <div className="flex items-start space-x-3">
                          <Checkbox
                            id="contact-permission"
                            checked={formData.contactPermission}
                            onCheckedChange={(checked) => handleInputChange('contactPermission', checked)}
                            className="mt-1"
                            required
                          />
                          <div className="space-y-1">
                            <Label 
                              htmlFor="contact-permission"
                              className="text-sm font-medium text-slate-700 cursor-pointer leading-relaxed"
                            >
                              I consent to being contacted by Same Day Home Buyer regarding my property enquiry. 
                              I understand this is required to receive my free valuation and cash offer.
                            </Label>
                            <p className="text-xs text-slate-500">
                              We respect your privacy and will never share your details with third parties.
                            </p>
                          </div>
                        </div>
                      </div>

                      {error && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                          <p className="text-red-600 text-sm">{error}</p>
                        </div>
                      )}

                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full h-14 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="h-5 w-5 mr-3 animate-spin" />
                            Processing Your Valuation...
                          </>
                        ) : (
                          <>
                            <Clock className="h-5 w-5 mr-3" />
                            Get My Instant Cash Offer
                          </>
                        )}
                      </Button>

                      <div className="text-center space-y-3">
                        <div className="flex items-center justify-center space-x-6 text-sm text-slate-600">
                          <div className="flex items-center space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span>2-Hour Response</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span>No Obligation</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span>Zero Fees</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Awards & Trust Indicators Footer */}
                <div className="mt-12 pt-8 border-t border-slate-200">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
                    <div className="flex flex-col items-center space-y-2">
                      <Award className="h-8 w-8 text-orange-500" />
                      <span className="font-semibold text-slate-700">Award-Winning Service</span>
                      <span className="text-sm text-slate-500">Industry Recognition</span>
                    </div>
                    <div className="flex flex-col items-center space-y-2">
                      <Shield className="h-8 w-8 text-blue-500" />
                      <span className="font-semibold text-slate-700">RICS Regulated</span>
                      <span className="text-sm text-slate-500">Professional Standards</span>
                    </div>
                    <div className="flex flex-col items-center space-y-2">
                      <Star className="h-8 w-8 text-yellow-500" />
                      <span className="font-semibold text-slate-700">4.9/5 Trustpilot</span>
                      <span className="text-sm text-slate-500">Customer Satisfaction</span>
                    </div>
                    <div className="flex flex-col items-center space-y-2">
                      <TrendingUp className="h-8 w-8 text-green-500" />
                      <span className="font-semibold text-slate-700">£500M+ Invested</span>
                      <span className="text-sm text-slate-500">Financial Security</span>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default PropertyDetailsForm