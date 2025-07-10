import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Clock, Phone, Mail, CheckCircle, Star, ArrowRight, Home, Users, Award, TrendingUp, FileText, Calendar, MapPin, Scale, Shield, Banknote, Heart, Zap, TreePine } from 'lucide-react'
import { motion } from 'framer-motion'

const logoImg = 'https://res.cloudinary.com/dmns9ystn/image/upload/v1751291817/260by80_lgo_sameday_uibnpv.png'
import heroImg from '../assets/uk_houses_hero.jpg'

function DownsizingPage() {
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
      {/* Downsizing Page Schema Markup */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Downsize House Fast - Quick Sale for Smaller Property",
          "description": "Sell your large family home quickly to downsize. Fast cash offers for empty nesters, retirees, and those seeking simpler living.",
          "provider": {
            "@type": "Organization",
            "name": "Same Day Home Buyer"
          },
          "areaServed": {
            "@type": "Country", 
            "name": "United Kingdom"
          },
          "serviceType": "Downsizing Property Sales"
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
                Downsizing Specialists
              </Badge>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Downsize House Fast
              <span className="block text-orange-400">Start Your New Chapter</span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto leading-relaxed">
              Sell your large family home quickly and move to your perfect smaller property. Cash offer in 2 hours, hassle-free process for your new lifestyle.
            </p>

            <motion.form 
              onSubmit={handleSubmit}
              className="max-w-2xl mx-auto mb-12 bg-white/10 backdrop-blur-sm rounded-2xl p-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <h3 className="text-xl font-semibold mb-4">Get Your FREE Downsizing Property Valuation</h3>
              <div className="flex flex-col sm:flex-row gap-3">
                <Input
                  type="text"
                  placeholder="Enter your family home postcode"
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
              <p className="text-sm mt-3 opacity-90">Downsizing guidance • No obligation • Fast cash release</p>
            </motion.form>

            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto"
              initial="initial"
              animate="animate"
            >
              <motion.div variants={fadeInUp} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
                <TreePine className="h-12 w-12 text-orange-400 mx-auto mb-4" />
                <h4 className="text-xl font-semibold mb-2">Simpler Living</h4>
                <p className="text-blue-100">Release equity for your perfect smaller home</p>
              </motion.div>
              
              <motion.div variants={fadeInUp} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
                <Zap className="h-12 w-12 text-green-400 mx-auto mb-4" />
                <h4 className="text-xl font-semibold mb-2">Quick Transition</h4>
                <p className="text-blue-100">Fast sale enables immediate downsizing move</p>
              </motion.div>
              
              <motion.div variants={fadeInUp} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
                <Banknote className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                <h4 className="text-xl font-semibold mb-2">Cash Release</h4>
                <p className="text-blue-100">Free up equity for retirement or lifestyle</p>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Downsizing Reasons Section */}
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
              Why People Downsize
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4">Ready for Your New Chapter?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Life changes and downsizing offers exciting opportunities for simpler, more enjoyable living
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
                  <div className="bg-green-100 rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                    <Users className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-blue-900 mb-2">Empty Nest Syndrome</h3>
                    <p className="text-gray-600">Children have moved out, leaving a large family home that feels too big and expensive to maintain.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                    <Calendar className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-blue-900 mb-2">Retirement Planning</h3>
                    <p className="text-gray-600">Approaching or entering retirement, wanting to reduce expenses and release equity for the future.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-purple-100 rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                    <Home className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-blue-900 mb-2">Maintenance Burden</h3>
                    <p className="text-gray-600">Large homes require significant upkeep, repairs, and cleaning that becomes overwhelming over time.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-orange-100 rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-blue-900 mb-2">Location Change</h3>
                    <p className="text-gray-600">Desire to move closer to family, better transport links, or preferred retirement areas.</p>
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
                  <h3 className="text-2xl font-bold mb-2">Downsizing Benefits</h3>
                  <p className="text-blue-100">Unlock the advantages of right-sizing your home for your current lifestyle.</p>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Lower Monthly Costs</span>
                    <CheckCircle className="h-5 w-5 text-green-400" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Released Equity</span>
                    <CheckCircle className="h-5 w-5 text-green-400" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Less Maintenance</span>
                    <CheckCircle className="h-5 w-5 text-green-400" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Better Location Options</span>
                    <CheckCircle className="h-5 w-5 text-green-400" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Simplified Living</span>
                    <CheckCircle className="h-5 w-5 text-green-400" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Enhanced Lifestyle</span>
                    <CheckCircle className="h-5 w-5 text-green-400" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
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
              Downsizing Advantages
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4">Why Choose Us for Downsizing</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We understand the unique needs of downsizers and provide a service tailored to your transition
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Quick Cash Release",
                description: "Fast sale releases equity immediately, giving you buying power for your perfect smaller property without chain complications.",
                icon: Banknote,
                color: "green"
              },
              {
                title: "No Chain Delays", 
                description: "Avoid the stress of property chains. Sell quickly to us, then buy your new home with cash at your own pace.",
                icon: Zap,
                color: "blue"
              },
              {
                title: "Any Condition Accepted",
                description: "Don't worry about updating or modernizing your family home. We buy properties in any condition, saving you time and money.",
                icon: Home,
                color: "purple"
              },
              {
                title: "Flexible Timing",
                description: "Complete when it suits you. Whether you need to move quickly or require time to find your new home, we adapt to your timeline.",
                icon: Clock,
                color: "orange"
              },
              {
                title: "Expert Guidance",
                description: "Our team understands downsizing challenges and provides expert advice throughout your transition process.",
                icon: Award,
                color: "red"
              },
              {
                title: "Stress-Free Process",
                description: "No viewings, no lengthy sales process, no uncertainty. A simple, guaranteed sale that removes stress from your move.",
                icon: Heart,
                color: "pink"
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
            <h2 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4">Your Downsizing Journey</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A straightforward process designed specifically for downsizers seeking a quick, reliable sale
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: "1",
                title: "Free Consultation",
                description: "Discuss your downsizing plans, timeline, and ideal outcome. We provide expert guidance and a free property assessment.",
                icon: Users
              },
              {
                step: "2", 
                title: "Property Valuation",
                description: "Professional valuation of your family home considering current market conditions and your downsizing timeline.",
                icon: Home
              },
              {
                step: "3",
                title: "Guaranteed Offer",
                description: "Cash offer within 2 hours. Fair market value that gives you the equity needed for your new smaller home.",
                icon: Banknote
              },
              {
                step: "4",
                title: "Flexible Completion",
                description: "Complete when it suits your downsizing plans. Quick 2-week completion or longer if you need time to find your new home.",
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

      {/* Success Stories Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Badge className="bg-purple-100 text-purple-900 px-4 py-2 text-sm font-semibold mb-4">
              Success Stories
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4">Happy Downsizers</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real stories from customers who successfully downsized with our help
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Margaret & John",
                location: "Surrey",
                story: "Sold our 4-bedroom family home in 3 weeks. The equity helped us buy a lovely 2-bedroom bungalow with no chain stress. Perfect for retirement!",
                savings: "£180,000 equity released"
              },
              {
                name: "Patricia",
                location: "Manchester", 
                story: "After my husband passed, the house felt too big. Same Day Home Buyer made everything simple during a difficult time. Now I'm happily settled in a modern flat.",
                savings: "Moved within 6 weeks"
              },
              {
                name: "Robert & Carol",
                location: "Bristol",
                story: "Our children moved away and we wanted to be closer to grandchildren. Quick sale meant we could buy near them without waiting months for a traditional sale.",
                savings: "No chain delays"
              }
            ].map((story, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full border-2 border-transparent hover:border-purple-500 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="bg-purple-100 rounded-full w-12 h-12 flex items-center justify-center mr-4">
                        <Heart className="h-6 w-6 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-blue-900">{story.name}</h3>
                        <p className="text-sm text-gray-500">{story.location}</p>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-4 italic">"{story.story}"</p>
                    <div className="bg-green-50 rounded-lg p-3">
                      <p className="text-green-800 font-semibold text-sm">{story.savings}</p>
                    </div>
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
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Start Your Downsizing Journey?</h2>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-blue-100">
              Get your free valuation and discover how much equity you can release for your new lifestyle
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-lg mx-auto mb-8">
              <Input
                type="text"
                placeholder="Enter your family home postcode"
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
                <span>Quick Cash Release</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span>No Chain Stress</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span>Flexible Timing</span>
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
              Downsizing specialists - helping you start your new chapter
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
            <p>&copy; 2024 Same Day Home Buyer. All rights reserved. | RICS Regulated | Downsizing Property Specialists</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default DownsizingPage