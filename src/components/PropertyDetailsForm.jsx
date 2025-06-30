import React, { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Label } from '@/components/ui/label.jsx'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx'
import { Checkbox } from '@/components/ui/checkbox.jsx'
import { ArrowLeft, Shield, Clock, Banknote, Loader2, CheckCircle, Star, Award, TrendingUp } from 'lucide-react'
import { motion } from 'framer-motion'
import { apiClient } from '../services/apiClient.js'
import OfferResult from './OfferResult.jsx'

// Import the same hero image as homepage
import heroImg from '../assets/uk_houses_hero.jpg'

// Custom form icon
const formIcon = 'https://res.cloudinary.com/dmns9ystn/image/upload/v1751049056/ChatGPT_Image_Jun_27_2025_06_57_52_PM_qdknfe.png'

function PropertyDetailsForm({ postcode, onBack }) {
  const [formData, setFormData] = useState({
    doorNumber: '',
    postcode: postcode || '',
    fullAddress: '',
    propertyType: '',
    bedrooms: '',
    condition: '',
    fullName: '',
    email: '',
    phone: '',
    contactPermission: false
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [showOfferResult, setShowOfferResult] = useState(false)
  const [offerResult, setOfferResult] = useState(null)

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.contactPermission) {
      setError('Please provide permission to contact you about this property enquiry.')
      return
    }

    setIsSubmitting(true)
    setError('')

    try {
      const submissionData = {
        ...formData,
        submittedAt: new Date().toISOString()
      }

      const response = await apiClient.submitPropertyValuation(submissionData)
      
      if (response.success) {
        setOfferResult(response.data)
        setShowOfferResult(true)
      } else {
        throw new Error(response.error || 'Failed to process your request')
      }
    } catch (error) {
      console.error('Form submission error:', error)
      setError(error.message || 'Unable to process your valuation request. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (showOfferResult && offerResult) {
    return <OfferResult result={offerResult} propertyDetails={formData} onStartNew={() => { setShowOfferResult(false); setOfferResult(null); }} />
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
              <Button 
                variant="ghost" 
                onClick={onBack}
                className="mb-8 text-white/80 hover:text-white hover:bg-white/10 border border-white/20 transition-all duration-300 ease-in-out transform hover:scale-105 hover:-translate-y-0.5"
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

        {/* Enhanced Form Section - Single Column for Better Mobile UX */}
        <div className="container mx-auto px-6 -mt-16 relative z-10 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit}>
              <div className="bg-white/70 backdrop-blur-md rounded-3xl shadow-2xl p-8 lg:p-12 border border-white/40 hover:shadow-3xl hover:bg-white/75 transition-all duration-500 ease-in-out">
                
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

                {/* Property Information Section */}
                <div className="space-y-8 mb-10">
                  <div className="border-l-4 border-orange-500 pl-6 hover:border-orange-600 hover:bg-orange-50/20 rounded-r-lg transition-all duration-300 ease-in-out transform hover:translate-x-1">
                    <h2 className="text-2xl font-bold text-slate-900 mb-2 flex items-center">
                      <img src={formIcon} alt="Property Icon" className="h-6 w-6 mr-3" />
                      Property Information
                    </h2>
                    <p className="text-slate-600">Provide accurate details for the most precise valuation</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-slate-800 font-semibold text-base">Property Number *</Label>
                      <Input
                        type="text"
                        placeholder="e.g. 42"
                        value={formData.doorNumber}
                        onChange={(e) => handleInputChange('doorNumber', e.target.value)}
                        className="h-14 border-2 border-slate-600 bg-white/90 backdrop-blur-sm focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 text-slate-900 placeholder:text-slate-500 font-medium hover:border-orange-400 hover:shadow-lg hover:bg-white/95 transition-all duration-300 ease-in-out transform hover:scale-[1.02]"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-slate-800 font-semibold text-base">Postcode *</Label>
                      <Input
                        type="text"
                        value={formData.postcode}
                        onChange={(e) => handleInputChange('postcode', e.target.value)}
                        className="h-14 border-2 border-slate-600 bg-slate-200/80 backdrop-blur-sm text-slate-900 font-medium"
                        readOnly
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-slate-800 font-semibold text-base">Full Address *</Label>
                    <Input
                      type="text"
                      placeholder="e.g. Downing Street, Westminster"
                      value={formData.fullAddress}
                      onChange={(e) => handleInputChange('fullAddress', e.target.value)}
                      className="h-14 border-2 border-slate-600 bg-white/90 backdrop-blur-sm focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 text-slate-900 placeholder:text-slate-500 font-medium hover:border-orange-400 hover:shadow-lg hover:bg-white/95 transition-all duration-300 ease-in-out transform hover:scale-[1.02]"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-slate-800 font-semibold text-base">Property Type *</Label>
                      <Select onValueChange={(value) => handleInputChange('propertyType', value)} required>
                        <SelectTrigger className="h-14 border-2 border-slate-600 bg-white/90 backdrop-blur-sm focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 text-slate-900 font-medium hover:border-orange-400 hover:shadow-lg hover:bg-white/95 transition-all duration-300 ease-in-out transform hover:scale-[1.02]">
                          <SelectValue placeholder="Select property type" />
                        </SelectTrigger>
                        <SelectContent className="bg-white/95 backdrop-blur-md border-2 border-slate-300">
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
                      <Label className="text-slate-800 font-semibold text-base">Number of Bedrooms *</Label>
                      <Select onValueChange={(value) => handleInputChange('bedrooms', value)} required>
                        <SelectTrigger className="h-14 border-2 border-slate-600 bg-white/90 backdrop-blur-sm focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 text-slate-900 font-medium hover:border-orange-400 hover:shadow-lg hover:bg-white/95 transition-all duration-300 ease-in-out transform hover:scale-[1.02]">
                          <SelectValue placeholder="Select bedrooms" />
                        </SelectTrigger>
                        <SelectContent className="bg-white/95 backdrop-blur-md border-2 border-slate-300">
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
                    <Label className="text-slate-800 font-semibold text-base">Property Condition *</Label>
                    <Select onValueChange={(value) => handleInputChange('condition', value)} required>
                      <SelectTrigger className="h-14 border-2 border-slate-600 bg-white/90 backdrop-blur-sm focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 text-slate-900 font-medium hover:border-orange-400 hover:shadow-lg hover:bg-white/95 transition-all duration-300 ease-in-out transform hover:scale-[1.02]">
                        <SelectValue placeholder="Select condition" />
                      </SelectTrigger>
                      <SelectContent className="bg-white/95 backdrop-blur-md border-2 border-slate-300">
                        <SelectItem value="excellent">Excellent - Recently renovated/new build</SelectItem>
                        <SelectItem value="good">Good - Well maintained, minor work needed</SelectItem>
                        <SelectItem value="fair">Fair - Some modernisation required</SelectItem>
                        <SelectItem value="poor">Poor - Significant renovation needed</SelectItem>
                        <SelectItem value="very-poor">Very Poor - Major structural work required</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Contact Information Section */}
                <div className="space-y-8 mb-10">
                  <div className="border-l-4 border-blue-500 pl-6 hover:border-blue-600 hover:bg-blue-50/20 rounded-r-lg transition-all duration-300 ease-in-out transform hover:translate-x-1">
                    <h2 className="text-2xl font-bold text-slate-900 mb-2 flex items-center">
                      <img src="https://res.cloudinary.com/dmns9ystn/image/upload/v1751286863/clipboard_lectern_zjmzsv.png" alt="Contact Information" className="h-6 w-6 mr-3" />
                      Contact Information
                    </h2>
                    <p className="text-slate-600">Secure details for your guaranteed offer delivery</p>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label className="text-slate-800 font-semibold text-base">Full Name *</Label>
                      <Input
                        type="text"
                        placeholder="Your full legal name"
                        value={formData.fullName}
                        onChange={(e) => handleInputChange('fullName', e.target.value)}
                        className="h-14 border-2 border-slate-600 bg-white/90 backdrop-blur-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-slate-900 placeholder:text-slate-500 font-medium hover:border-blue-400 hover:shadow-lg hover:bg-white/95 transition-all duration-300 ease-in-out transform hover:scale-[1.02]"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label className="text-slate-800 font-semibold text-base">Email Address *</Label>
                        <Input
                          type="email"
                          placeholder="your.name@email.com"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className="h-14 border-2 border-slate-600 bg-white/90 backdrop-blur-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-slate-900 placeholder:text-slate-500 font-medium hover:border-blue-400 hover:shadow-lg hover:bg-white/95 transition-all duration-300 ease-in-out transform hover:scale-[1.02]"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-slate-800 font-semibold text-base">Phone Number *</Label>
                        <Input
                          type="tel"
                          placeholder="07xxx xxx xxx"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          className="h-14 border-2 border-slate-600 bg-white/90 backdrop-blur-sm focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 text-slate-900 placeholder:text-slate-500 font-medium hover:border-orange-400 hover:shadow-lg hover:bg-white/95 transition-all duration-300 ease-in-out transform hover:scale-[1.02]"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Premium Trust Section with Better Visibility */}
                  <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl border-2 border-slate-300 hover:bg-white/90 hover:border-slate-400 hover:shadow-lg transition-all duration-300 ease-in-out transform hover:scale-[1.01]">
                    <div className="flex items-start space-x-4">
                      <Checkbox
                        id="contactPermission"
                        checked={formData.contactPermission}
                        onCheckedChange={(checked) => handleInputChange('contactPermission', checked)}
                        className="mt-1 border-2 border-slate-600 w-5 h-5"
                      />
                      <div className="flex-1 space-y-3">
                        <Label htmlFor="contactPermission" className="text-slate-900 font-semibold cursor-pointer text-base">
                          I authorize Same Day Home Buyer to contact me regarding this property enquiry *
                        </Label>
                        <div className="text-sm text-slate-700 space-y-2">
                          <div className="flex items-center space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                            <span>GDPR compliant - your data is fully protected</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                            <span>No third-party sharing - we value your privacy</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                            <span>Unsubscribe anytime - you're in control</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Submit Button - Clean and centered */}
                  <div className="text-center pt-6">
                    <Button 
                      type="submit" 
                      size="lg"
                      className="bg-orange-500 hover:bg-orange-600 text-white px-16 py-4 text-lg font-bold rounded-xl disabled:opacity-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 hover:-translate-y-1"
                      disabled={isSubmitting || !formData.doorNumber || !formData.fullAddress || !formData.postcode || !formData.propertyType || !formData.bedrooms || !formData.condition || !formData.fullName || !formData.phone || !formData.email || !formData.contactPermission}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-3 h-5 w-5 animate-spin" />
                          Processing Details...
                        </>
                      ) : (
                        'Submit Details'
                      )}
                    </Button>
                  </div>
                </div>

                {/* Error Display */}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8 bg-red-100/90 backdrop-blur-sm border-2 border-red-400 rounded-xl p-4 text-center"
                  >
                    <p className="text-red-800 font-semibold">{error}</p>
                  </motion.div>
                )}

                {/* Premium Features Section - Now after submit button */}
                <div className="mt-12 space-y-8">
                  <div className="bg-orange-50/90 backdrop-blur-sm p-8 rounded-xl border-2 border-orange-300 hover:bg-orange-50 hover:border-orange-400 hover:shadow-lg transition-all duration-300 ease-in-out transform hover:scale-[1.01]">
                    <h4 className="font-bold text-slate-900 mb-6 flex items-center text-xl text-center justify-center">
                      <Banknote className="h-6 w-6 mr-3 text-orange-600" />
                      Your Guaranteed Benefits
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-base text-slate-800">
                      <div className="flex items-center space-x-3 hover:bg-orange-100/50 p-2 rounded-lg transition-all duration-200 ease-in-out transform hover:scale-105">
                        <CheckCircle className="h-5 w-5 text-orange-600 flex-shrink-0" />
                        <span className="font-medium">2-hour decision guarantee</span>
                      </div>
                      <div className="flex items-center space-x-3 hover:bg-orange-100/50 p-2 rounded-lg transition-all duration-200 ease-in-out transform hover:scale-105">
                        <CheckCircle className="h-5 w-5 text-orange-600 flex-shrink-0" />
                        <span className="font-medium">No estate agent fees</span>
                      </div>
                      <div className="flex items-center space-x-3 hover:bg-orange-100/50 p-2 rounded-lg transition-all duration-200 ease-in-out transform hover:scale-105">
                        <CheckCircle className="h-5 w-5 text-orange-600 flex-shrink-0" />
                        <span className="font-medium">All legal costs covered</span>
                      </div>
                      <div className="flex items-center space-x-3 hover:bg-orange-100/50 p-2 rounded-lg transition-all duration-200 ease-in-out transform hover:scale-105">
                        <CheckCircle className="h-5 w-5 text-orange-600 flex-shrink-0" />
                        <span className="font-medium">24-hour completion available</span>
                      </div>
                    </div>
                  </div>

                  {/* Premium Promise Section */}
                  <div className="bg-gradient-to-r from-slate-900 to-blue-900 rounded-2xl p-8 text-white text-center">
                    <h3 className="text-2xl font-bold mb-4">Your Exclusive Cash Offer Promise</h3>
                    <p className="text-blue-100 mb-6 text-lg max-w-2xl mx-auto">
                      Our advanced AI system will analyze your property and deliver a guaranteed cash offer in under 2 hours
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                      <div className="flex items-center justify-center space-x-2">
                        <CheckCircle className="h-5 w-5 text-green-400" />
                        <span>Advanced AI Analysis</span>
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
                      {isSubmitting 
                        ? 'Analyzing market data, comparable sales, and property specifics...' 
                        : "Join 15,000+ satisfied property owners who chose our premium service"
                      }
                    </p>
                  </div>
                </div>
              </div>
            </form>
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
                    <img src="https://res.cloudinary.com/dmns9ystn/image/upload/v1751286323/award_no_bg_oc9rae.png" alt="Award" className="h-8 w-8" />
                  </div>
                  <h4 className="font-bold text-slate-900 mb-2 text-lg">Award Winning</h4>
                  <p className="text-slate-600 text-sm">Recognized industry leader with multiple awards for customer service excellence</p>
                </div>
              </div>
              
              <div className="text-center group">
                <div className="bg-white rounded-2xl p-6 shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                  <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <img src="https://res.cloudinary.com/dmns9ystn/image/upload/v1750761812/2_hour_clock_no_bg_fzxyai.png" alt="Lightning Fast" className="h-8 w-8" />
                  </div>
                  <h4 className="font-bold text-slate-900 mb-2 text-lg">Lightning Fast</h4>
                  <p className="text-slate-600 text-sm">2-hour decision guarantee with 24-hour completion available nationwide</p>
                </div>
              </div>
              
              <div className="text-center group">
                <div className="bg-white rounded-2xl p-6 shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                  <div className="bg-gradient-to-br from-green-500 to-emerald-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <img src="https://res.cloudinary.com/dmns9ystn/image/upload/v1751286321/approved_stamp_qi2reb.png" alt="Fully Regulated" className="h-8 w-8" />
                  </div>
                  <h4 className="font-bold text-slate-900 mb-2 text-lg">Fully Regulated</h4>
                  <p className="text-slate-600 text-sm">RICS regulated, fully insured, and compliant with all industry standards</p>
                </div>
              </div>
              
              <div className="text-center group">
                <div className="bg-white rounded-2xl p-6 shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                  <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <img src="https://res.cloudinary.com/dmns9ystn/image/upload/v1751286316/line_graph_la3r9u.png" alt="£500M+ Invested" className="h-8 w-8" />
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

export default PropertyDetailsForm