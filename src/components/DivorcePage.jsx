import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Clock, Phone, Mail, CheckCircle, Star, ArrowRight, Home, Users, Award, TrendingUp, FileText, Calendar, MapPin, Scale, Shield, Banknote, Heart, UserX } from 'lucide-react'
import { motion } from 'framer-motion'

const logoImg = 'https://res.cloudinary.com/dmns9ystn/image/upload/v1751291817/260by80_lgo_sameday_uibnpv.png'
import heroImg from '../assets/uk_houses_hero.jpg'

function DivorcePage() {
  const [address, setAddress] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!address.trim()) return
    
    const postcodeRegex = /^[A-Z]{1,2}[0-9][A-Z0-9]? ?[0-9][A-Z]{2}$/i
    if (!postcodeRegex.test(address.trim())) {
      alert('Please enter a valid UK postcode')
      return
    }
    
    navigate(`/valuation/${encodeURIComponent(address.trim().toUpperCase())}`)
  }

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Divorce Page Schema Markup */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Quick House Sale During Divorce - Fast Property Division",
          "description": "Sell your house quickly during divorce proceedings. Fast cash offers, expert guidance, discreet service to help resolve property division.",
          "provider": {
            "@type": "Organization",
            "name": "Same Day Home Buyer"
          },
          "areaServed": {
            "@type": "Country", 
            "name": "United Kingdom"
          },
          "serviceType": "Divorce Property Sales"
        })
      }} />

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center">
              <img 
                src={logoImg} 
                alt="Same Day Home Buyer" 
                className="h-6 w-auto cursor-pointer"
                onClick={() => navigate('/')}
              />
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="hidden lg:flex items-center space-x-2 text-blue-900">
                <Phone className="h-4 w-4" />
                <span className="font-semibold text-sm">0330 043 7570</span>
              </div>
              <Button 
                onClick={handleSubmit}
                className="bg-blue-900 hover:bg-blue-800 text-white font-semibold px-4 py-2 text-sm"
              >
                Get Offer
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
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
                Divorce Property Specialists
              </Badge>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Quick House Sale
              <span className="block text-orange-400">During Divorce</span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto leading-relaxed">
              Discreet, fast property division solution. Cash offer in 2 hours, complete in weeks not months - reducing stress during difficult times.
            </p>

            <motion.form 
              onSubmit={handleSubmit}
              className="max-w-2xl mx-auto mb-12 bg-white/10 backdrop-blur-sm rounded-2xl p-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <h3 className="text-xl font-semibold mb-4">Get Your Confidential Property Valuation</h3>
              <div className="flex flex-col sm:flex-row gap-3">
                <Input
                  type="text"
                  placeholder="Enter property postcode"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="flex-1 h-14 text-gray-900 text-lg"
                />
                <Button 
                  type="submit"
                  className="bg-orange-500 hover:bg-orange-600 h-14 px-8 font-semibold text-lg"
                >
                  Get Cash Offer
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
              <p className="text-sm mt-3 opacity-90">Confidential service • No obligation • Fast resolution</p>
            </motion.form>

            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto"
              initial="initial"
              animate="animate"
            >
              <motion.div variants={fadeInUp} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
                <Shield className="h-12 w-12 text-orange-400 mx-auto mb-4" />
                <h4 className="text-xl font-semibold mb-2">Confidential Service</h4>
                <p className="text-blue-100">Discreet handling of sensitive situations</p>
              </motion.div>
              
              <motion.div variants={fadeInUp} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
                <Clock className="h-12 w-12 text-green-400 mx-auto mb-4" />
                <h4 className="text-xl font-semibold mb-2">Fast Resolution</h4>
                <p className="text-blue-100">Quick property division without delays</p>
              </motion.div>
              
              <motion.div variants={fadeInUp} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
                <Scale className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                <h4 className="text-xl font-semibold mb-2">Fair Settlement</h4>
                <p className="text-blue-100">Equitable offers for clean asset division</p>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Divorce Challenges Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50/30 to-gray-50">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Badge className="bg-blue-100 text-blue-900 px-4 py-2 text-sm font-semibold mb-4">
              Divorce Property Challenges
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4">Why Property Division Is Complicated</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Understanding the unique challenges of selling property during divorce and how we provide solutions
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="bg-red-100 rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                    <Clock className="h-6 w-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-blue-900 mb-2">Time Pressure</h3>
                    <p className="text-gray-600">Court deadlines, financial pressure, and the need to move on require quick property resolution.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-yellow-100 rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                    <UserX className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-blue-900 mb-2">Coordination Difficulties</h3>
                    <p className="text-gray-600">Both parties must agree on estate agents, viewings, and offers - creating delays and tension.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-purple-100 rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                    <Banknote className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-blue-900 mb-2">Financial Strain</h3>
                    <p className="text-gray-600">Maintaining two households while paying mortgage, legal fees, and estate agent commissions.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-orange-100 rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                    <Heart className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-blue-900 mb-2">Emotional Stress</h3>
                    <p className="text-gray-600">Dealing with viewings, negotiations, and the property sale adds stress to an already difficult time.</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-blue-900 to-blue-700 rounded-2xl p-8 text-white">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold mb-2">Our Divorce Solution</h3>
                  <p className="text-blue-100">We provide a clean, fast, confidential property sale that works for both parties.</p>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Single Point of Contact</span>
                    <CheckCircle className="h-5 w-5 text-green-400" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>No Viewings Required</span>
                    <CheckCircle className="h-5 w-5 text-green-400" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Fast 2-3 Week Completion</span>
                    <CheckCircle className="h-5 w-5 text-green-400" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>All Legal Costs Covered</span>
                    <CheckCircle className="h-5 w-5 text-green-400" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Confidential Process</span>
                    <CheckCircle className="h-5 w-5 text-green-400" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Clear Asset Division</span>
                    <CheckCircle className="h-5 w-5 text-green-400" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Badge className="bg-green-100 text-green-900 px-4 py-2 text-sm font-semibold mb-4">
              Divorce Benefits
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4">Why Choose Us For Divorce Sales</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Specialized service designed specifically for couples going through property division
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Neutral Third Party",
                description: "We act as an impartial buyer, removing the need for both parties to coordinate viewings, negotiations, or decisions.",
                icon: Scale,
                color: "blue"
              },
              {
                title: "Clean Financial Split", 
                description: "Clear cash transaction makes asset division simple. No ongoing mortgage, maintenance, or selling complications.",
                icon: Banknote,
                color: "green"
              },
              {
                title: "Privacy Protection",
                description: "Confidential service protects your privacy. No estate agent boards, no public marketing, no intrusive viewings.",
                icon: Shield,
                color: "purple"
              },
              {
                title: "Stress Reduction",
                description: "Remove property sale stress from your divorce. We handle everything while you focus on moving forward.",
                icon: Heart,
                color: "orange"
              },
              {
                title: "Legal Compliance",
                description: "Our legal team ensures all requirements are met for court proceedings and financial settlements.",
                icon: FileText,
                color: "red"
              },
              {
                title: "Fast Resolution",
                description: "Complete in 2-3 weeks instead of months. Get your equity quickly to secure new housing or settle debts.",
                icon: Clock,
                color: "teal"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full border-2 border-transparent hover:border-blue-500 transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <div className={`bg-${item.color}-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4`}>
                      <item.icon className={`h-8 w-8 text-${item.color}-600`} />
                    </div>
                    <h3 className="text-xl font-semibold text-blue-900 mb-3">{item.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{item.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50/30">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Badge className="bg-orange-100 text-orange-900 px-4 py-2 text-sm font-semibold mb-4">
              Simple Process
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4">How We Handle Divorce Property Sales</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our streamlined process removes complications and gets you a fast, fair resolution
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: "1",
                title: "Confidential Consultation",
                description: "Free consultation to understand your situation, timeline, and requirements. Complete confidentiality assured.",
                icon: Shield
              },
              {
                step: "2", 
                title: "Property Valuation",
                description: "Professional valuation considering current market conditions and divorce timeline pressures.",
                icon: Home
              },
              {
                step: "3",
                title: "Fair Cash Offer",
                description: "Guaranteed cash offer within 2 hours. Fair market assessment that works for both parties' settlement.",
                icon: Banknote
              },
              {
                step: "4",
                title: "Quick Completion",
                description: "Complete in 2-3 weeks. We coordinate with solicitors and handle all legal requirements for you.",
                icon: CheckCircle
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full border-2 border-transparent hover:border-orange-500 transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <div className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <item.icon className="h-8 w-8 text-orange-600" />
                    </div>
                    <div className="bg-blue-900 text-white rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-4 text-sm font-bold">
                      {item.step}
                    </div>
                    <h3 className="text-xl font-semibold text-blue-900 mb-3">{item.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{item.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-900 to-blue-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready for a Quick, Fair Property Sale?</h2>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-blue-100">
              Get a confidential consultation and cash offer in 2 hours - removing property stress from your divorce
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-lg mx-auto mb-8">
              <Input
                type="text"
                placeholder="Enter property postcode"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="h-14 text-gray-900 text-lg"
              />
              <Button 
                onClick={handleSubmit}
                className="bg-orange-500 hover:bg-orange-600 h-14 px-8 font-semibold text-lg whitespace-nowrap"
              >
                Get My Offer
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
            
            <div className="flex items-center justify-center space-x-8 text-sm text-blue-200">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span>Confidential</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span>No Obligation</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span>Fast Resolution</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <img src={logoImg} alt="Same Day Home Buyer" className="h-16 w-auto mx-auto mb-4" />
            <p className="text-gray-400 text-sm mb-4">
              Divorce property specialists - making difficult times easier
            </p>
            <div className="flex items-center justify-center space-x-8 text-sm text-gray-400">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>0330 043 7570</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>info@samedayhomebuyer.co.uk</span>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 Same Day Home Buyer. All rights reserved. | Confidential Divorce Property Sales</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default DivorcePage