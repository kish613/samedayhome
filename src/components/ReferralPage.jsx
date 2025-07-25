import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Textarea } from '@/components/ui/textarea.jsx'
import { Card, CardContent } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Checkbox } from '@/components/ui/checkbox.jsx'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx'
import { Phone, Mail, CheckCircle, Gift, Clock, Home, FileText } from 'lucide-react'
import { HelmetProvider, Helmet } from 'react-helmet-async';
import FloatingOrbs from './FloatingOrbs.jsx'
import BreathingGrid from './BreathingGrid.jsx'
import heroImg from '../assets/uk_houses_hero.jpg'

// Import existing logo
const logoImg = 'https://res.cloudinary.com/dmns9ystn/image/upload/v1751291817/260by80_lgo_sameday_uibnpv.png'

function ReferralPage() {
  const [formData, setFormData] = useState({
    propertyAddress: '',
    contactName: '',
    contactPhone: '',
    contactEmail: '',
    propertyType: '',
    ownerContact: '',
    additionalNotes: '',
    termsAccept: false
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validate required fields
    const requiredFields = ['propertyAddress', 'contactName', 'contactPhone', 'contactEmail', 'propertyType']
    const missingFields = requiredFields.filter(field => !formData[field])
    
    if (missingFields.length > 0) {
      alert('Please fill in all required fields')
      return
    }
    
    if (!formData.termsAccept) {
      alert('Please accept the terms and conditions')
      return
    }
    
    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/referral-submission', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })
      
      if (response.ok) {
        alert('Thank you! Your referral has been submitted. We\'ll analyze it within 2 hours and contact you with updates.')
        setFormData({
          propertyAddress: '',
          contactName: '',
          contactPhone: '',
          contactEmail: '',
          propertyType: '',
          ownerContact: '',
          additionalNotes: '',
          termsAccept: false
        })
      } else {
        throw new Error('Submission failed')
      }
    } catch (error) {
      alert('Sorry, there was an error submitting your referral. Please try again or contact us directly.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const scrollToTerms = () => {
    document.getElementById('terms').scrollIntoView({
      behavior: 'smooth'
    })
  }

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  }

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Earn £500 Amazon Voucher - Same Day Home Buyer Referral Program</title>
        <meta name="description" content="Earn £500 Amazon voucher for quality property leads. Submit insolvency, probate, or derelict properties and get rewarded when we verify the lead." />
        <meta name="keywords" content="property referral, earn money, Amazon voucher, property leads, insolvency, probate, derelict properties" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Earn £500 Amazon Voucher - Property Lead Referral" />
        <meta property="og:description" content="Submit quality property leads and earn £500 Amazon vouchers. We analyze leads within 2 hours." />
        <meta property="og:url" content="https://samedayhome.vercel.app/refer" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Earn £500 Amazon Voucher - Property Lead Referral" />
        <meta name="twitter:description" content="Submit quality property leads and earn £500 Amazon vouchers." />
      </Helmet>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white" style={{ backgroundImage: `url(${heroImg})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-blue-700/60"></div>
        <FloatingOrbs />
        <BreathingGrid />
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              <span className="text-orange-400">Earn £500 Amazon Voucher</span>
              <br />
              <span className="text-white">for Quality Property Leads</span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto leading-relaxed">
              Refer a property lead that meets our criteria and receive a £500 Amazon voucher when we complete our purchase
            </p>

            <motion.div 
              className="flex flex-col md:flex-row items-center justify-center gap-8 mb-12"
              variants={staggerChildren}
              initial="initial"
              animate="animate"
            >
              <motion.div variants={fadeInUp} className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <Home className="h-6 w-6 text-orange-400" />
                <span className="font-medium">Insolvency, Probate & Derelict Properties</span>
              </motion.div>
              <motion.div variants={fadeInUp} className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <Clock className="h-6 w-6 text-orange-400" />
                <span className="font-medium">2-Hour Analysis Promise</span>
              </motion.div>
              <motion.div variants={fadeInUp} className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <Gift className="h-6 w-6 text-orange-400" />
                <span className="font-medium">£500 Amazon Voucher Reward</span>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-blue-900 mb-4">How It Works</h2>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
            variants={staggerChildren}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <motion.div variants={fadeInUp} className="text-center">
              <Card className="h-full border-2 border-transparent hover:border-orange-500 transition-all duration-300 transform hover:-translate-y-3 hover:shadow-2xl">
                <CardContent className="p-8">
                  <div className="relative mb-6">
                    <div className="bg-orange-500 rounded-full w-20 h-20 flex items-center justify-center mx-auto">
                      <FileText className="h-10 w-10 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 bg-blue-900 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">
                      1
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-blue-900 mb-4">Submit Property Details</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Provide property address, contact details, and situation (insolvency, probate, or derelict)
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp} className="text-center">
              <Card className="h-full border-2 border-transparent hover:border-orange-500 transition-all duration-300 transform hover:-translate-y-3 hover:shadow-2xl">
                <CardContent className="p-8">
                  <div className="relative mb-6">
                    <div className="bg-orange-500 rounded-full w-20 h-20 flex items-center justify-center mx-auto">
                      <Clock className="h-10 w-10 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 bg-blue-900 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">
                      2
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-blue-900 mb-4">We Analyze in 2 Hours</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Our team verifies the lead quality and contacts the property owner within 2 hours
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp} className="text-center">
              <Card className="h-full border-2 border-transparent hover:border-orange-500 transition-all duration-300 transform hover:-translate-y-3 hover:shadow-2xl">
                <CardContent className="p-8">
                  <div className="relative mb-6">
                    <div className="bg-orange-500 rounded-full w-20 h-20 flex items-center justify-center mx-auto">
                      <Gift className="h-10 w-10 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 bg-blue-900 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">
                      3
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-blue-900 mb-4">Receive £500 Amazon Voucher</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Get your voucher within 24 hours of lead verification and successful contact
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="bg-white shadow-xl">
                <CardContent className="p-8">
                  <h2 className="text-3xl font-bold text-center text-blue-900 mb-8">Submit Your Property Lead</h2>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="propertyAddress" className="block text-sm font-medium text-gray-700 mb-2">
                        Property Address *
                      </label>
                      <Input
                        id="propertyAddress"
                        type="text"
                        placeholder="Enter full property address including postcode"
                        value={formData.propertyAddress}
                        onChange={(e) => handleInputChange('propertyAddress', e.target.value)}
                        required
                        className="h-12"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="contactName" className="block text-sm font-medium text-gray-700 mb-2">
                          Your Name *
                        </label>
                        <Input
                          id="contactName"
                          type="text"
                          placeholder="Your full name"
                          value={formData.contactName}
                          onChange={(e) => handleInputChange('contactName', e.target.value)}
                          required
                          className="h-12"
                        />
                      </div>
                      <div>
                        <label htmlFor="contactPhone" className="block text-sm font-medium text-gray-700 mb-2">
                          Your Phone Number *
                        </label>
                        <Input
                          id="contactPhone"
                          type="tel"
                          placeholder="Your contact number"
                          value={formData.contactPhone}
                          onChange={(e) => handleInputChange('contactPhone', e.target.value)}
                          required
                          className="h-12"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700 mb-2">
                        Your Email Address *
                      </label>
                      <Input
                        id="contactEmail"
                        type="email"
                        placeholder="your.email@example.com"
                        value={formData.contactEmail}
                        onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                        required
                        className="h-12"
                      />
                    </div>

                    <div>
                      <label htmlFor="propertyType" className="block text-sm font-medium text-gray-700 mb-2">
                        Property Situation *
                      </label>
                      <Select value={formData.propertyType} onValueChange={(value) => handleInputChange('propertyType', value)}>
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder="Select property situation" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="insolvency">Insolvency/Bankruptcy</SelectItem>
                          <SelectItem value="probate">Probate/Estate Sale</SelectItem>
                          <SelectItem value="derelict">Derelict/Abandoned Property</SelectItem>
                          <SelectItem value="other">Other (please specify in notes)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label htmlFor="ownerContact" className="block text-sm font-medium text-gray-700 mb-2">
                        Property Owner Contact Details
                      </label>
                      <Textarea
                        id="ownerContact"
                        placeholder="Property owner name, phone, email (if known)"
                        value={formData.ownerContact}
                        onChange={(e) => handleInputChange('ownerContact', e.target.value)}
                        rows={3}
                      />
                    </div>

                    <div>
                      <label htmlFor="additionalNotes" className="block text-sm font-medium text-gray-700 mb-2">
                        Additional Information
                      </label>
                      <Textarea
                        id="additionalNotes"
                        placeholder="Any additional details about the property or situation"
                        value={formData.additionalNotes}
                        onChange={(e) => handleInputChange('additionalNotes', e.target.value)}
                        rows={3}
                      />
                    </div>

                    <div className="flex items-start space-x-3">
                      <Checkbox
                        id="termsAccept"
                        checked={formData.termsAccept}
                        onCheckedChange={(checked) => handleInputChange('termsAccept', checked)}
                        required
                      />
                      <label htmlFor="termsAccept" className="text-sm text-gray-700 leading-relaxed">
                        I agree to the{' '}
                        <button
                          type="button"
                          onClick={scrollToTerms}
                          className="text-orange-500 hover:text-orange-600 underline"
                        >
                          Terms & Conditions
                        </button>
                        {' '}and confirm this information is accurate
                      </label>
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 text-lg"
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit Lead for £500 Reward'}
                    </Button>
                  </form>

                  <div className="mt-6 text-center text-sm text-gray-600 space-y-2">
                    <p className="flex items-center justify-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Your information is secure and will only be used to process your referral
                    </p>
                    <p className="flex items-center justify-center">
                      <Clock className="h-4 w-4 text-blue-500 mr-2" />
                      We'll respond within 2 hours during business hours
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Terms & Conditions Section */}
      <section id="terms" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-center text-blue-900 mb-12">Terms & Conditions</h2>
            
            <div className="max-w-4xl mx-auto space-y-8">
              <div>
                <h3 className="text-xl font-bold text-blue-900 mb-4">Eligibility & Requirements</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    Property must be insolvency, probate, or derelict situation
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    Contact details must be accurate and verifiable
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    Property owner must be genuinely interested in selling
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    Lead must not be duplicate or previously known to us
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    We reserve the right to verify all information provided
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-blue-900 mb-4">Reward Payment</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    £500 Amazon voucher paid within 24 hours of lead verification
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    Verification includes successful contact with property owner
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    Voucher delivered via email to address provided
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    No cash alternative available
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    One reward per unique property address
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-blue-900 mb-4">General Terms</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    Same Day Home Buyer reserves the right to modify or terminate this program
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    All decisions regarding lead quality are final
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    Personal data handled in accordance with GDPR
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    Program subject to UK law and jurisdiction
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  )
}

export default ReferralPage