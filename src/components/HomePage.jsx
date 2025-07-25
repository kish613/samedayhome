import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Card, CardContent } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Clock, Phone, Mail, CheckCircle, Star, ArrowRight, Home, Users, Award, TrendingUp, FileText, Calendar, MapPin, ChevronDown, Play } from 'lucide-react'
import { motion } from 'framer-motion'
import ProcessChart from './ProcessChart.jsx'
import FloatingOrbs from './FloatingOrbs.jsx'
import MorphingBlobs from './MorphingBlobs.jsx'
import ParticleConstellation from './ParticleConstellation.jsx'
import DiagonalWaves from './DiagonalWaves.jsx'
import BreathingGrid from './BreathingGrid.jsx'
import { EnhancedCard, EnhancedCardContent } from './EnhancedCard.jsx'
import '../components/mobile/mobile-styles.css'

// Import assets
const logoImg = 'https://res.cloudinary.com/dmns9ystn/image/upload/v1751291817/260by80_lgo_sameday_uibnpv.png'
import heroImg from '../assets/uk_houses_hero.jpg'
import cashIcon from '../assets/cash_icon.png'
import cashGuaranteeIcon from '../assets/cash_guarantee_icon.png'

function HomePage() {
  const [address, setAddress] = useState('')
  const [isVisible, setIsVisible] = useState(false)
  const [activeTab, setActiveTab] = useState(0)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [showFAB, setShowFAB] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    setIsVisible(true)
    
    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    // FAB scroll detection
    const handleScroll = () => {
      setShowFAB(window.scrollY > 300)
    }
    window.addEventListener('scroll', handleScroll)
    
    // Testimonial rotation
    const testimonialInterval = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % 6)
    }, 4000)
    
    return () => {
      window.removeEventListener('resize', checkMobile)
      window.removeEventListener('scroll', handleScroll)
      clearInterval(testimonialInterval)
    }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!address.trim()) return
    
    // Basic postcode validation
    const postcodeRegex = /^[A-Z]{1,2}[0-9][A-Z0-9]? ?[0-9][A-Z]{2}$/i
    if (!postcodeRegex.test(address.trim())) {
      alert('Please enter a valid UK postcode')
      return
    }
    
    // Navigate to valuation page with postcode
    navigate(`/valuation/${encodeURIComponent(address.trim().toUpperCase())}`)
  }

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  }

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const testimonialData = [
    {
      name: "Sarah Johnson", location: "Manchester", rating: 5, days: 3,
      text: "Absolutely incredible service! They completed my house purchase in just 16 days. No estate agent fees, no stress, just a smooth transaction from start to finish.",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b25da2ff?w=64&h=64&fit=crop&crop=face"
    },
    {
      name: "Michael Chen", location: "Birmingham", rating: 5, days: 5,
      text: "I was skeptical at first, but they delivered exactly what they promised. Got my cash offer in 90 minutes and completed in 3 weeks. Highly recommended!",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face"
    },
    {
      name: "Emma Thompson", location: "Leeds", rating: 5, days: 7,
      text: "After 8 months trying to sell through estate agents, I found these guys. Sold my house in 2 weeks with zero hassle. Wish I'd found them sooner!",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face"
    },
    {
      name: "David Wilson", location: "Liverpool", rating: 5, days: 4,
      text: "Fantastic experience from start to finish. Quick, professional, and exactly what they promised. Completed in under 2 weeks!",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face"
    },
    {
      name: "Lisa Parker", location: "London", rating: 5, days: 6,
      text: "Professional service that delivered on every promise. Cash in hand within a week. Would definitely recommend to anyone.",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=64&h=64&fit=crop&crop=face"
    },
    {
      name: "James Mitchell", location: "Bristol", rating: 5, days: 8,
      text: "Exceeded all expectations. Quick, fair offer and hassle-free completion. Couldn't have asked for better service.",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=64&h=64&fit=crop&crop=face"
    }
  ]

  const comparisonData = [
    {
      method: 'Same Day Home Buyer',
      time: '2 Hours - 24 Hours',
      fees: '£0',
      guarantee: 'Yes',
      hassle: 'None',
      highlight: true
    },
    {
      method: 'Estate Agents',
      time: '3-6 Months',
      fees: '£3,000-£8,000',
      guarantee: 'No',
      hassle: 'High'
    },
    {
      method: 'Property Auctions',
      time: '4-8 Weeks',
      fees: '£2,000-£5,000',
      guarantee: 'No',
      hassle: 'Medium'
    },
    {
      method: 'Online Portals',
      time: '2-4 Months',
      fees: '£500-£2,000',
      guarantee: 'No',
      hassle: 'High'
    }
  ]

  return (
    <div className="min-h-screen">
      {/* FAQ Schema Markup */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "How quickly can you complete?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "We can provide a cash offer within 2 hours and complete the purchase in as little as 24 hours. Most transactions complete within 2-3 weeks, depending on your preferred timeline."
              }
            },
            {
              "@type": "Question", 
              "name": "Do you charge any fees?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "No, we don't charge any fees whatsoever. No estate agent fees, no legal costs, no survey fees, no administrative charges. The offer we make is the amount you receive."
              }
            },
            {
              "@type": "Question",
              "name": "What types of properties do you buy?", 
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "We buy all types of residential properties including houses, flats, bungalows, and maisonettes in any condition. Whether your property needs extensive renovation or is move-in ready, we're interested."
              }
            },
            {
              "@type": "Question",
              "name": "How do you calculate your offers?",
              "acceptedAnswer": {
                "@type": "Answer", 
                "text": "Our offers are based on current market values, property condition, location, and local comparable sales. We use advanced market analysis combined with local market expertise to ensure fair and competitive offers."
              }
            },
            {
              "@type": "Question",
              "name": "Is there any obligation?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Absolutely none. Our valuation service is completely free with no obligation to proceed. You can accept or decline our offer with no pressure or consequences."
              }
            }
          ]
        })
      }} />

      {/* HowTo Schema Markup */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "HowTo",
          "name": "How to Sell Your House Fast for Cash in the UK",
          "description": "Learn how to sell your house fast in the UK with our step-by-step guide. Get cash offers within 2 hours and complete in 24 hours.",
          "image": "https://samedayhomebuyer.co.uk/hero-image.jpg",
          "totalTime": "PT24H",
          "estimatedCost": {
            "@type": "MonetaryAmount",
            "currency": "GBP",
            "value": "0"
          },
          "supply": [
            {
              "@type": "HowToSupply",
              "name": "Property Details"
            },
            {
              "@type": "HowToSupply", 
              "name": "Property Documents"
            }
          ],
          "tool": [
            {
              "@type": "HowToTool",
              "name": "Cash Buyer Service"
            }
          ],
          "step": [
            {
              "@type": "HowToStep",
              "name": "Contact Cash Buyer",
              "text": "Contact a reputable cash buyer and provide basic property details including postcode, property type, and condition.",
              "image": "https://samedayhomebuyer.co.uk/step1.jpg",
              "url": "https://samedayhomebuyer.co.uk#step1"
            },
            {
              "@type": "HowToStep",
              "name": "Receive Cash Offer",
              "text": "Get a guaranteed cash offer within 2 hours based on current market values and property condition.",
              "image": "https://samedayhomebuyer.co.uk/step2.jpg",
              "url": "https://samedayhomebuyer.co.uk#step2"
            },
            {
              "@type": "HowToStep",
              "name": "Accept Offer",
              "text": "Review and accept the cash offer with no obligation. All legal costs and fees are covered.",
              "image": "https://samedayhomebuyer.co.uk/step3.jpg",
              "url": "https://samedayhomebuyer.co.uk#step3"
            },
            {
              "@type": "HowToStep",
              "name": "Complete Sale",
              "text": "Complete the house sale in 24 hours with guaranteed completion and immediate cash payment.",
              "image": "https://samedayhomebuyer.co.uk/step4.jpg",
              "url": "https://samedayhomebuyer.co.uk#step4"
            }
          ]
        })
      }} />

      {/* Clean Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center">
              <img 
                src={logoImg} 
                alt="Same Day Home Buyer" 
                className="h-6 w-auto cursor-pointer"
              />
            </div>
            
            <nav className="hidden xl:flex items-center space-x-4">
              <a href="#how-it-works" className="text-gray-700 hover:text-blue-900 transition-colors font-medium text-sm whitespace-nowrap">How It Works</a>
              <a href="#why-us" className="text-gray-700 hover:text-blue-900 transition-colors font-medium text-sm whitespace-nowrap">Why Us</a>
              <a href="#comparison" className="text-gray-700 hover:text-blue-900 transition-colors font-medium text-sm whitespace-nowrap">Compare</a>
              <a href="#testimonials" className="text-gray-700 hover:text-blue-900 transition-colors font-medium text-sm whitespace-nowrap">Reviews</a>
              <a href="#faq" className="text-gray-700 hover:text-blue-900 transition-colors font-medium text-sm whitespace-nowrap">FAQs</a>
            </nav>

            <div className="flex items-center space-x-3">
              <div className="hidden lg:flex items-center space-x-2 text-blue-900">
                <Phone className="h-4 w-4" />
                <span className="font-semibold text-sm whitespace-nowrap">0330 043 7570</span>
              </div>
              <Button 
                onClick={() => {
                  // Scroll to the main form on the homepage
                  const heroSection = document.querySelector('section')
                  if (heroSection) {
                    heroSection.scrollIntoView({ behavior: 'smooth' })
                  }
                }}
                className="bg-blue-900 hover:bg-blue-800 text-white font-semibold px-4 py-2 text-sm whitespace-nowrap"
              >
                Get Offer
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Enhanced Hero Section */}
      <section className={`relative flex items-center justify-center overflow-hidden ${isMobile ? 'hero-mobile' : 'min-h-screen'}`}>
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: `url(${heroImg})`,
            backgroundPosition: isMobile ? 'center' : 'center center'
          }}
        >
          <div className={`absolute inset-0 ${isMobile ? 'mobile-gradient-simple bg-gradient-to-b from-blue-900/85 to-blue-700/70' : 'bg-gradient-to-r from-blue-900/80 to-blue-700/60'}`}></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-6">
              <Badge className="bg-orange-500 text-white px-4 py-2 text-lg font-semibold mb-4">
                UK's Fastest House Buyer
              </Badge>
            </div>
            
            <h1 className={`font-bold mb-6 leading-tight ${isMobile ? 'hero-title-mobile' : 'text-5xl md:text-7xl'}`}>
              <span className="block text-orange-400">How to</span> Sell My House Fast
              <span className="block text-orange-400">Cash Offer in 2 Hours</span>
            </h1>
            
            <p className={`mb-8 max-w-4xl mx-auto leading-relaxed ${isMobile ? 'hero-subtitle-mobile' : 'text-xl md:text-2xl'}`}>
              Learn <strong>how to sell house fast</strong> and <strong>how to sell house quickly</strong> in the UK. We buy any property in any condition across the UK. No fees, no hassle, guaranteed completion in 24 hours.
            </p>

            <motion.form 
              onSubmit={handleSubmit}
              className={`max-w-2xl mx-auto mb-12 rounded-2xl ${isMobile ? 'form-mobile mobile-backdrop-light' : 'bg-white/10 backdrop-blur-sm p-8'}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <h3 className={`font-semibold mb-4 ${isMobile ? 'text-lg' : 'text-xl'}`}>Get Your FREE Cash Offer</h3>
              <div className="flex flex-col gap-3">
                <Input
                  type="text"
                  placeholder="Enter your property postcode"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className={`flex-1 text-gray-900 ${isMobile ? 'form-input-mobile' : 'h-14 text-lg'}`}
                  inputMode="text"
                  autoComplete="postal-code"
                />
                <Button 
                  type="submit"
                  className={`bg-orange-500 hover:bg-orange-600 font-semibold touch-target ${isMobile ? 'form-button-mobile' : 'h-14 px-8 text-lg'}`}
                >
                  Get Cash Offer
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
              <p className={`mt-3 opacity-90 ${isMobile ? 'text-xs' : 'text-sm'}`}>Free valuation • No obligation • 2-hour response</p>
            </motion.form>

            <motion.div 
              className={`grid gap-6 max-w-5xl mx-auto ${isMobile ? 'grid-cols-1 gap-4' : 'grid-cols-1 md:grid-cols-3'}`}
              variants={staggerChildren}
              initial="initial"
              animate="animate"
            >
              <motion.div variants={fadeInUp}>
                <EnhancedCard variant="benefit" className={`text-center ${isMobile ? 'bg-white/15 mobile-backdrop-light' : 'bg-white/10 backdrop-blur-sm'}`}>
                  <EnhancedCardContent className={isMobile ? 'benefit-card-mobile' : 'p-6'}>
                    <Clock className={`text-orange-400 mx-auto ${isMobile ? 'benefit-icon-mobile' : 'h-12 w-12 mb-4'}`} />
                    <h4 className={`font-semibold ${isMobile ? 'benefit-title-mobile' : 'text-xl mb-2'}`}>2-Hour Decision</h4>
                    <p className={`text-blue-100 ${isMobile ? 'benefit-text-mobile' : ''}`}>Fast cash offers with guaranteed completion</p>
                  </EnhancedCardContent>
                </EnhancedCard>
              </motion.div>
              
              <motion.div variants={fadeInUp}>
                <EnhancedCard variant="benefit" className={`text-center ${isMobile ? 'bg-white/15 mobile-backdrop-light' : 'bg-white/10 backdrop-blur-sm'}`}>
                  <EnhancedCardContent className={isMobile ? 'benefit-card-mobile' : 'p-6'}>
                    <CheckCircle className={`text-green-400 mx-auto ${isMobile ? 'benefit-icon-mobile' : 'h-12 w-12 mb-4'}`} />
                    <h4 className={`font-semibold ${isMobile ? 'benefit-title-mobile' : 'text-xl mb-2'}`}>No Fees</h4>
                    <p className={`text-blue-100 ${isMobile ? 'benefit-text-mobile' : ''}`}>Zero estate agent fees or hidden costs</p>
                  </EnhancedCardContent>
                </EnhancedCard>
              </motion.div>
              
              <motion.div variants={fadeInUp}>
                <EnhancedCard variant="benefit" className={`text-center ${isMobile ? 'bg-white/15 mobile-backdrop-light' : 'bg-white/10 backdrop-blur-sm'}`}>
                  <EnhancedCardContent className={isMobile ? 'benefit-card-mobile' : 'p-6'}>
                    <Home className={`text-blue-400 mx-auto ${isMobile ? 'benefit-icon-mobile' : 'h-12 w-12 mb-4'}`} />
                    <h4 className={`font-semibold ${isMobile ? 'benefit-title-mobile' : 'text-xl mb-2'}`}>Any Condition</h4>
                    <p className={`text-blue-100 ${isMobile ? 'benefit-text-mobile' : ''}`}>We buy properties in any state, as-is</p>
                  </EnhancedCardContent>
                </EnhancedCard>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-gradient-to-br from-blue-50/20 to-gray-50/30 relative overflow-hidden">
        {!isMobile && <FloatingOrbs />}
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Badge className="bg-blue-100 text-blue-900 px-4 py-2 text-sm font-semibold mb-4">
              Simple Process
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our streamlined process gets you from inquiry to cash in hand faster than anyone else in the UK
            </p>
          </motion.div>

          <ProcessChart />
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section id="why-us" className="py-20 bg-gradient-to-br from-green-50/10 to-white/50 relative overflow-hidden">
        {!isMobile && <MorphingBlobs />}
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Badge className="bg-orange-100 text-orange-900 px-4 py-2 text-sm font-semibold mb-4">
              Why Choose Us
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4">The UK's Most Trusted Cash Buyers</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Over 15,000 satisfied customers have chosen us to sell their properties quickly and hassle-free
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
                  <div className="bg-orange-100 rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                    <Clock className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-blue-900 mb-2">Lightning Fast Service</h3>
                    <p className="text-gray-600">Get a guaranteed cash offer within 2 hours and complete in as little as 24 hours.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-green-100 rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-blue-900 mb-2">No Hidden Costs</h3>
                    <p className="text-gray-600">Zero estate agent fees, no legal costs, no survey fees. What we offer is what you get.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                    <Award className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-blue-900 mb-2">Award-Winning Service</h3>
                    <p className="text-gray-600">Recognised industry leader with 4.9/5 Trustpilot rating.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-purple-100 rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                    <Users className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-blue-900 mb-2">15,000+ Happy Customers</h3>
                    <p className="text-gray-600">Join thousands of satisfied property owners who chose our premium service.</p>
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
                  <img src={cashGuaranteeIcon} alt="Guaranteed cash offer backed by £500M+ investment fund" className="h-16 w-16 mb-4" />
                  <h3 className="text-2xl font-bold mb-2">£500M+ Investment Fund</h3>
                  <p className="text-blue-100">Our massive investment fund means we can complete on any property, any time.</p>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Properties Purchased</span>
                    <span className="font-bold">15,000+</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Average Completion Time</span>
                    <span className="font-bold">18 Days</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Customer Satisfaction</span>
                    <span className="font-bold">98.7%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Trustpilot Rating</span>
                    <div className="flex items-center space-x-1">
                      <span className="font-bold">4.9</span>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mid-Content CTA */}
      <section className="py-16 bg-gradient-to-r from-orange-500 to-orange-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl md:text-3xl font-bold mb-4">Ready to Start? Get Your Free Offer Now!</h3>
            <p className="text-lg mb-6 text-orange-100">Join 15,000+ satisfied customers who chose the smart option</p>
            <Button 
              onClick={handleSubmit}
              className="bg-white text-orange-600 hover:bg-gray-100 h-12 px-8 font-semibold text-lg"
            >
              Get My Free Offer Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Comparison Table Section */}
      <section id="comparison" className="py-20 bg-gradient-to-br from-amber-50/20 to-gray-50/30 relative overflow-hidden">
        <DiagonalWaves />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Badge className="bg-green-100 text-green-900 px-4 py-2 text-sm font-semibold mb-4">
              Compare Options
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4">Why We're the Smart Choice</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See how we compare to traditional selling methods and why thousands choose us
            </p>
          </motion.div>

          <motion.div 
            className="overflow-x-auto"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="min-w-full bg-white/30 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden">
              <table className="min-w-full">
                <thead className="bg-gradient-to-r from-blue-900 to-blue-700 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Selling Method</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold">Time to Complete</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold">Total Fees</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold">Guarantee</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold">Hassle Level</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.map((item, index) => (
                    <tr key={index} className={`${item.highlight ? 'bg-orange-50 border-l-4 border-orange-500' : 'bg-white'} ${index !== comparisonData.length - 1 ? 'border-b border-gray-200' : ''}`}>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          {item.highlight && <Award className="h-5 w-5 text-orange-500 mr-2" />}
                          <span className={`font-semibold ${item.highlight ? 'text-orange-600' : 'text-gray-900'}`}>
                            {item.method}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className={`px-3 py-1 rounded-full text-sm ${item.highlight ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-700'}`}>
                          {item.time}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center font-semibold">
                        <span className={item.highlight ? 'text-green-600' : 'text-gray-900'}>
                          {item.fees}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className={`px-3 py-1 rounded-full text-sm ${item.guarantee === 'Yes' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {item.guarantee}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className={`px-3 py-1 rounded-full text-sm ${
                          item.hassle === 'None' ? 'bg-green-100 text-green-800' :
                          item.hassle === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {item.hassle}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Second Mid-Content CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl md:text-3xl font-bold mb-4">Choose the Smart Option - Get Free Quote</h3>
            <p className="text-lg mb-6 text-blue-100">See why thousands choose us over traditional estate agents</p>
            <Button 
              onClick={handleSubmit}
              className="bg-white text-blue-600 hover:bg-gray-100 h-12 px-8 font-semibold text-lg"
            >
              Get My Smart Quote
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Testimonials Carousel */}
      <section id="testimonials" className="py-20 bg-gradient-to-br from-purple-50/20 to-white/50 relative overflow-hidden">
        <ParticleConstellation />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Badge className="bg-purple-100 text-purple-900 px-4 py-2 text-sm font-semibold mb-4">
              Customer Reviews
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4">What Our Customers Say</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-4">
              4.9/5 from 2,847 reviews - Don't just take our word for it
            </p>
            <div className="flex items-center justify-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-6 w-6 fill-yellow-400 text-yellow-400" />
              ))}
              <span className="ml-2 text-lg font-semibold text-blue-900">4.9/5</span>
            </div>
          </motion.div>

          <div className="relative">
            <div className="overflow-hidden rounded-2xl">
              <motion.div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentTestimonial * (100 / 3)}%)` }}
              >
                {testimonialData.map((testimonial, index) => {
                  // Property background images matching locations
                  const propertyImages = [
                    '/property_bg_1.webp', // Terrace
                    '/property_bg_2.jpg', // Victorian  
                    '/property_bg_3.jpg'  // Bungalow
                  ];
                  
                  return (
                  <div key={index} className="w-1/3 flex-shrink-0 px-4">
                    <EnhancedCard variant="testimonial" className="h-full relative overflow-hidden bg-transparent transition-all duration-300 hover:transform hover:scale-105 hover:shadow-2xl group">
                      {/* Property Background - Full Card Blur */}
                      <div 
                        className="absolute inset-0 bg-cover bg-center blur-sm"
                        style={{ backgroundImage: `url(${propertyImages[index % propertyImages.length]})` }}
                      />
                      <EnhancedCardContent className="p-6 relative z-10 bg-transparent">
                        <div className="flex items-center mb-4">
                          <img 
                            src={testimonial.avatar} 
                            alt={`Photo of ${testimonial.name}`}
                            className="w-12 h-12 rounded-full mr-4 border-2 border-purple-200"
                          />
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <div className="flex relative">
                                <div className="absolute inset-0 bg-yellow-400 rounded-full blur-sm opacity-30 animate-pulse"></div>
                                {[...Array(testimonial.rating)].map((_, i) => (
                                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400 relative z-10 animate-pulse" style={{ animationDelay: `${i * 0.1}s` }} />
                                ))}
                              </div>
                              <Badge className={`text-xs font-bold px-3 py-1 flex items-center gap-1 ${
                                testimonial.days <= 7 
                                  ? 'bg-gradient-to-r from-green-400 to-green-600 text-white shadow-lg' 
                                  : testimonial.days <= 14 
                                  ? 'bg-gradient-to-r from-amber-400 to-amber-600 text-white shadow-lg'
                                  : 'bg-gradient-to-r from-blue-400 to-blue-600 text-white shadow-lg'
                              }`}>
                                <Clock className="h-3 w-3" />
                                {testimonial.days} days
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className="relative mb-6">
                          <span className="text-4xl text-purple-300 absolute -top-2 -left-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500">"</span>
                          <p className="text-gray-600 italic leading-relaxed pl-4">
                            <span className="opacity-0 animate-fade-in" style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
                              {testimonial.text}
                            </span>
                          </p>
                          <span className="text-4xl text-purple-300 absolute -bottom-4 -right-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500">"</span>
                        </div>
                        <div className="border-t pt-4">
                          <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-sm">
                            <div className="font-semibold text-blue-900">{testimonial.name}</div>
                            <div className="text-sm text-gray-600 flex items-center mt-1">
                              <MapPin className="h-3 w-3 mr-1" />
                              {testimonial.location} • 
                              <div className="flex items-center ml-1 bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-semibold">
                                <CheckCircle className="h-3 w-3 mr-1" />
                                Verified Purchase
                              </div>
                            </div>
                          </div>
                        </div>
                      </EnhancedCardContent>
                    </EnhancedCard>
                  </div>
                  );
                })}
              </motion.div>
            </div>
            
            {/* Carousel Controls */}
            <div className="flex justify-center mt-8 space-x-2">
              {[...Array(testimonialData.length)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                    index === currentTestimonial ? 'bg-purple-600' : 'bg-purple-200'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-gray-50/60 relative overflow-hidden">
        <BreathingGrid />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Badge className="bg-blue-100 text-blue-900 px-4 py-2 text-sm font-semibold mb-4">
              FAQ
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to know about selling your house to us
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-6">
            {[
              {
                question: "How to sell house fast in the UK?",
                answer: "To sell your house fast in the UK, choose a cash buyer like us. We can provide a cash offer within 2 hours and complete the purchase in as little as 24 hours. Most transactions complete within 2-3 weeks, depending on your preferred timeline."
              },
              {
                question: "How to sell house quickly without estate agent?",
                answer: "You can sell your house quickly without an estate agent by working directly with cash buyers. We eliminate the need for estate agents, saving you time and money. No viewings, no chain complications, and no estate agent fees."
              },
              {
                question: "How to sell house for cash without fees?",
                answer: "Selling for cash with us means no fees whatsoever. No estate agent fees, no legal costs, no survey fees, no administrative charges. The offer we make is the amount you receive in your bank account."
              },
              {
                question: "How to sell house in 7 days or less?",
                answer: "To sell your house in 7 days, we offer express completion services. After accepting our cash offer, we can complete the legal process within 7 days if needed. Most standard completions take 2-3 weeks, but urgent sales can be fast-tracked."
              },
              {
                question: "How to get a quick house sale with guaranteed completion?",
                answer: "A quick house sale with guaranteed completion is achieved through cash buyers who don't rely on mortgage approvals or property chains. We guarantee completion once contracts are signed, eliminating the risk of sale fall-throughs."
              },
              {
                question: "How to find legitimate cash buyers for your property?",
                answer: "Finding legitimate cash buyers requires checking their credentials, reviews, and track record. We have 2,847+ five-star reviews and have successfully completed over 15,000 property purchases since 2015."
              },
              {
                question: "How to sell house urgently in any condition?",
                answer: "To sell your house urgently in any condition, contact cash buyers who specialize in quick purchases. We buy all types of residential properties including houses, flats, bungalows, and maisonettes in any condition - from move-in ready to requiring extensive renovation."
              },
              {
                question: "How to sell house without survey or chain complications?",
                answer: "Cash buyers eliminate survey delays and chain complications by purchasing with cash reserves. We conduct our own rapid property assessment and aren't dependent on mortgage approvals or other property sales, ensuring a smooth, fast transaction."
              },
              {
                question: "How to avoid repossession by selling house fast?",
                answer: "To avoid repossession, you need to sell your house before the repossession date. We can help by providing immediate cash offers and completing purchases quickly, often within 2-3 weeks, helping you clear mortgage arrears and avoid repossession."
              },
              {
                question: "How to sell inherited house or probate property quickly?",
                answer: "To sell an inherited house or probate property quickly, work with experienced cash buyers who understand probate law. We can guide you through the legal requirements and complete the purchase once probate is granted, offering a hassle-free solution for inherited properties."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="border-2 border-transparent hover:border-orange-500 transition-all duration-300">
                  <CardContent className="p-6">
                    <button
                      className="w-full text-left"
                      onClick={() => setActiveTab(activeTab === index ? -1 : index)}
                    >
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-blue-900">{faq.question}</h3>
                        <ChevronDown className={`h-5 w-5 text-gray-500 transform transition-transform duration-200 ${activeTab === index ? 'rotate-180' : ''}`} />
                      </div>
                    </button>
                    {activeTab === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-4 pt-4 border-t border-gray-200"
                      >
                        <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                      </motion.div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-900 to-blue-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Sell My House Fast?</h2>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-blue-100">
              Join 15,000+ satisfied customers who chose the fastest, hassle-free way to sell their property
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-lg mx-auto mb-8">
              <Input
                type="text"
                placeholder="Enter your postcode"
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
                <span>2-Hour Response</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span>No Obligation</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span>Zero Fees</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <img src={logoImg} alt="Same Day Home Buyer" className="h-16 w-auto mb-4" />
              <p className="text-gray-400 text-sm">
                The UK's most trusted cash property buyers. Fast, fair, and hassle-free.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a></li>
                <li><a href="#why-us" className="hover:text-white transition-colors">Why Choose Us</a></li>
                <li><a href="#comparison" className="hover:text-white transition-colors">Compare Options</a></li>
                <li><a href="#testimonials" className="hover:text-white transition-colors">Reviews</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Contact Info</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-center space-x-2">
                  <Phone className="h-4 w-4" />
                  <span>0330 043 7570</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Mail className="h-4 w-4" />
                  <span>info@samedayhomebuyer.co.uk</span>
                </li>
                <li className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4" />
                  <span>UK Wide Service</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms & Conditions</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Cookie Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">GDPR Compliance</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 Same Day Home Buyer. All rights reserved. | Licensed Property Buyers</p>
          </div>
        </div>
      </footer>

      {/* Floating Action Button */}
      {showFAB && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          className="fixed bottom-6 right-6 z-50"
        >
          <Button 
            onClick={handleSubmit}
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-full w-16 h-16 shadow-lg hover:shadow-xl transition-all duration-300 animate-bounce"
          >
            <ArrowRight className="h-6 w-6" />
          </Button>
          <div className="absolute -top-12 right-0 bg-gray-900 text-white text-xs px-3 py-1 rounded whitespace-nowrap">
            Get Free Offer
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default HomePage 