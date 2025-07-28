import React, { useState, useEffect, Suspense, lazy } from 'react'
import { Routes, Route, useNavigate, Link } from 'react-router-dom'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Card, CardContent } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Phone, Mail, CheckCircle, Star, ArrowRight, Users, TrendingUp, FileText, Calendar, MapPin, ChevronDown, Play } from 'lucide-react'
import { motion } from 'framer-motion'
import ProcessChart from './components/ProcessChart.jsx'
import PropertyDetailsForm from './components/PropertyDetailsForm.jsx'
import ThreeDPhotoCarouselDemo from './components/ThreeDCarousel.jsx'
import ValuationPage from './components/ValuationPage.jsx'
import AnimatedLogo from './components/AnimatedLogo.jsx'
import Layout from './components/Layout.jsx';
import AnimatedGrid from './components/AnimatedGrid.jsx';
import AnimatedTimelinePaths from './components/AnimatedTimelinePaths.jsx';
import BreathingGrid from './components/BreathingGrid.jsx';
import FloatingOrbs from './components/FloatingOrbs.jsx';
import MorphingBlobs from './components/MorphingBlobs.jsx';
import ParticleConstellation from './components/ParticleConstellation.jsx';
import SubtleBackgroundEnhancer from './components/SubtleBackgroundEnhancer.jsx';
import SubtleGeometricPattern from './components/SubtleGeometricPattern.jsx';
import TextureOverlay from './components/TextureOverlay.jsx';
import MinimalPatternOverlay from './components/MinimalPatternOverlay.jsx';

// Import mobile components
import MobileHero from './components/mobile/MobileHero.jsx';
import MobileComparisonCards from './components/mobile/MobileComparisonCards.jsx';
import MobileProcessCards from './components/mobile/MobileProcessCards.jsx';
import MobileTestimonials from './components/mobile/MobileTestimonials.jsx';
import MobileFAQ from './components/mobile/MobileFAQ.jsx';

// Lazy load landing pages
const LondonLandingPage = lazy(() => import('./components/LondonLandingPage.jsx'))
const ManchesterLandingPage = lazy(() => import('./components/ManchesterLandingPage.jsx'))
const BirminghamLandingPage = lazy(() => import('./components/BirminghamLandingPage.jsx'))
const LiverpoolLandingPage = lazy(() => import('./components/LiverpoolLandingPage.jsx'))
const LeedsLandingPage = lazy(() => import('./components/LeedsLandingPage.jsx'))
const BradfordLandingPage = lazy(() => import('./components/BradfordLandingPage.jsx'))
const CamdenLandingPage = lazy(() => import('./components/CamdenLandingPage.jsx'))
const NottinghamLandingPage = lazy(() => import('./components/NottinghamLandingPage.jsx'))
const LeicesterLandingPage = lazy(() => import('./components/LeicesterLandingPage.jsx'))
const SouthamptonLandingPage = lazy(() => import('./components/SouthamptonLandingPage.jsx'))
const SheffieldLandingPage = lazy(() => import('./components/SheffieldLandingPage.jsx'))
const NewcastleLandingPage = lazy(() => import('./components/NewcastleLandingPage.jsx'))
const BristolLandingPage = lazy(() => import('./components/BristolLandingPage.jsx'))
const LewishamLandingPage = lazy(() => import('./components/LewishamLandingPage.jsx'))
const CroydonLandingPage = lazy(() => import('./components/CroydonLandingPage.jsx'))
const HammersmithLandingPage = lazy(() => import('./components/HammersmithLandingPage.jsx'))
const HaveringLandingPage = lazy(() => import('./components/HaveringLandingPage.jsx'))
const RedbridgeLandingPage = lazy(() => import('./components/RedbridgeLandingPage.jsx'))
const BarnetLandingPage = lazy(() => import('./components/BarnetLandingPage.jsx'))
const HackneyLandingPage = lazy(() => import('./components/HackneyLandingPage.jsx'))
const EnfieldLandingPage = lazy(() => import('./components/EnfieldLandingPage.jsx'))
const CoventryLandingPage = lazy(() => import('./components/CoventryLandingPage.jsx'))
const WolverhamptonLandingPage = lazy(() => import('./components/WolverhamptonLandingPage.jsx'))
const SolihullLandingPage = lazy(() => import('./components/SolihullLandingPage.jsx'))
const WalsallLandingPage = lazy(() => import('./components/WalsallLandingPage.jsx'))
const WestBromwichLandingPage = lazy(() => import('./components/WestBromwichLandingPage.jsx'))
const DudleyLandingPage = lazy(() => import('./components/DudleyLandingPage.jsx'))

// Lazy load legal pages
const PrivacyPolicy = lazy(() => import('./components/PrivacyPolicy.jsx'))

// Lazy load blog pages
const BlogPage = lazy(() => import('./components/BlogPage.jsx'))
const SellProbateHouseUK = lazy(() => import('./components/blog/SellProbateHouseUK.jsx'))
const AvoidRepossessionUK = lazy(() => import('./components/blog/AvoidRepossessionUK.jsx'))
const SellDisrepairHouse = lazy(() => import('./components/blog/SellDisrepairHouse.jsx'))
const SellHouseAfterDivorce = lazy(() => import('./components/blog/SellHouseAfterDivorce.jsx'))
const EmigrationHouseSale = lazy(() => import('./components/blog/EmigrationHouseSale.jsx'))
const HowToFindCashBuyers = lazy(() => import('./components/blog/HowToFindCashBuyers.jsx'))
const SellHouseWithoutFees = lazy(() => import('./components/blog/SellHouseWithoutFees.jsx'))
const SellHouseWithoutChain = lazy(() => import('./components/blog/SellHouseWithoutChain.jsx'))

// Lazy load referral page
const ReferralPage = lazy(() => import('./components/ReferralPage.jsx'));

import './App.css'

// Import assets
const logoImg = 'https://res.cloudinary.com/dmns9ystn/image/upload/v1751291817/260by80_lgo_sameday_uibnpv.png'
import heroImg from './assets/uk_houses_hero.jpg'

// Import local assets for Why Choose Us section  
const lightningFastIcon = 'https://res.cloudinary.com/dmns9ystn/image/upload/v1751620946/ChatGPT_Image_Jul_4_2025_10_21_11_AM_h76xph.png'
const cashGuaranteeIcon = 'https://res.cloudinary.com/dmns9ystn/image/upload/v1751620945/ChatGPT_Image_Jul_4_2025_10_21_20_AM_glkfbw.png'
const zeroFeesIcon = 'https://res.cloudinary.com/dmns9ystn/image/upload/v1751620946/ChatGPT_Image_Jul_4_2025_10_20_48_AM_gemhrq.png'

// Custom Cloudinary icons for trust section
const calendarIcon = 'https://res.cloudinary.com/dmns9ystn/image/upload/v1750761812/calender_no_bg_icon_morvmr.png'
const housesIcon = 'https://res.cloudinary.com/dmns9ystn/image/upload/v1750761812/lots_of_houses_no_bg_wxee7u.png'
const moneyMountainIcon = 'https://res.cloudinary.com/dmns9ystn/image/upload/v1750761812/money_mount_no_bg_icon_hlcte7.png'
const clockIcon = 'https://res.cloudinary.com/dmns9ystn/image/upload/v1750761812/2_hour_clock_no_bg_fzxyai.png'

function HomePage() {
  const [address, setAddress] = useState('')
  const [isVisible, setIsVisible] = useState(false)
  const [activeTab, setActiveTab] = useState(0)
  const [showForm, setShowForm] = useState(false)
  const [submittedPostcode, setSubmittedPostcode] = useState('')
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
    
    return () => window.removeEventListener('resize', checkMobile)
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

  const handleCTAClick = () => {
    // Scroll to the main form on the homepage
    const heroSection = document.querySelector('section')
    if (heroSection) {
      heroSection.scrollIntoView({ behavior: 'smooth' })
    }
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

  const testimonialData = [
    {
      name: "Sarah M.",
      location: "London",
      rating: 5,
      days: 3,
      text: "Absolutely fantastic service. They delivered exactly what they promised - cash offer in 2 hours and completion in just 3 days. Couldn't be happier with the process!",
      avatar: "SM"
    },
    {
      name: "David K.",
      location: "Manchester",
      rating: 5,
      days: 5,
      text: "After months trying to sell through estate agents, I called these guys. Within a week I had cash in my bank. Zero fees, zero hassle - exactly as advertised!",
      avatar: "DK"
    },
    {
      name: "Emma T.",
      location: "Birmingham",
      rating: 5,
      days: 7,
      text: "Professional, fast, and fair. The whole process was transparent from start to finish. They handled everything and completed the purchase in under a week.",
      avatar: "ET"
    }
  ]

  const faqData = [
    {
      question: "How quickly can you complete?",
      answer: "We can provide a cash offer within 2 hours and complete the purchase in as little as 24 hours. Most transactions complete within 2-3 weeks, depending on your preferred timeline."
    },
    {
      question: "Do you charge any fees?",
      answer: "No, we don't charge any fees whatsoever. No estate agent fees, no legal costs, no survey fees, no administrative charges. The offer we make is the amount you receive."
    },
    {
      question: "What types of properties do you buy?",
      answer: "We buy all types of residential properties including houses, flats, bungalows, and maisonettes in any condition. Whether your property needs extensive renovation or is move-in ready, we're interested."
    },
    {
      question: "How do you calculate your offers?",
      answer: "Our offers are based on current market values, property condition, location, and local comparable sales. We use advanced market analysis combined with local market expertise to ensure fair and competitive offers."
    },
    {
      question: "Is there any obligation?",
      answer: "Absolutely none. Our valuation service is completely free with no obligation to proceed. You can accept or decline our offer with no pressure or consequences."
    }
  ]



  return (
    <div className="min-h-screen">
      {/* Hero Section - Mobile or Desktop */}
      {isMobile ? (
        <MobileHero heroImg={heroImg} />
      ) : (
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
                  UK's Fastest House Buyer
                </Badge>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                Sell Your House Fast
                <span className="block text-orange-400">Decision in 2 Hours</span>
              </h1>
              
              <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto leading-relaxed">
                We buy any property in any condition across the UK. No fees, no hassle, guaranteed completion in 24 hours.
              </p>

              <motion.form 
                onSubmit={handleSubmit}
                className="max-w-2xl mx-auto mb-12 bg-white/10 backdrop-blur-sm rounded-2xl p-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <h3 className="text-xl font-semibold mb-4">Get Your FREE Cash Offer</h3>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Input
                    type="text"
                    placeholder="Enter your property postcode"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="flex-1 h-14 text-blue-900 text-xl font-bold placeholder:text-blue-700 placeholder:font-semibold border-2 border-white/50 bg-white/90 backdrop-blur-sm focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
                  />
                  <Button 
                    type="submit"
                    className="bg-orange-500 hover:bg-orange-600 h-14 px-8 font-semibold text-lg"
                  >
                    Get Cash Offer
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
                <p className="text-sm mt-3 opacity-90">Free valuation • No obligation • 2-hour response</p>
              </motion.form>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-sm">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <span>No Estate Agent Fees</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <span className="font-semibold">We Pay All Legal Fees</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <span>Guaranteed Cash Offer</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Property Showcase Section */}
      <section className="bg-gray-50 py-16 relative">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-blue-900 mb-4">Recent Property Purchases</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              See some of the properties we've recently purchased from satisfied homeowners across the UK.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <ThreeDPhotoCarouselDemo 
              images={[
                {
                  src: 'https://res.cloudinary.com/dmns9ystn/image/upload/v1753721222/20220929_113443_Original_ociqkl.jpg',
                  alt: 'Property purchased in UK'
                },
                {
                  src: 'https://res.cloudinary.com/dmns9ystn/image/upload/v1753721223/20221026_151152_Original_jl41gs.jpg',
                  alt: 'Property purchased in UK'
                },
                {
                  src: 'https://res.cloudinary.com/dmns9ystn/image/upload/v1753721221/20220901_145237_Original_jrwbhe.jpg',
                  alt: 'Property purchased in UK'
                },
                {
                  src: 'https://res.cloudinary.com/dmns9ystn/image/upload/v1753721223/20221025_154328_Original_ggbbyw.jpg',
                  alt: 'Property purchased in UK'
                },
                {
                  src: 'https://res.cloudinary.com/dmns9ystn/image/upload/v1753721222/20221026_151152_Original_1_nn5qc9.jpg',
                  alt: 'Property purchased in UK'
                },
                {
                  src: 'https://res.cloudinary.com/dmns9ystn/image/upload/v1753721222/20220929_152032_Original_phjvgw.jpg',
                  alt: 'Property purchased in UK'
                },
                {
                  src: 'https://res.cloudinary.com/dmns9ystn/image/upload/v1753721222/20221025_154328_Original_1_iihhze.jpg',
                  alt: 'Property purchased in UK'
                },
                {
                  src: 'https://res.cloudinary.com/dmns9ystn/image/upload/v1753721221/20220901_170611_Original_f5emzz.jpg',
                  alt: 'Property purchased in UK'
                },
                {
                  src: 'https://res.cloudinary.com/dmns9ystn/image/upload/v1753721222/20220929_152032_Original_1_cwtwvt.jpg',
                  alt: 'Property purchased in UK'
                },
                {
                  src: 'https://res.cloudinary.com/dmns9ystn/image/upload/v1753721220/20220901_134103_Original_1_fgqxy5.jpg',
                  alt: 'Property purchased in UK'
                },
                {
                  src: 'https://res.cloudinary.com/dmns9ystn/image/upload/v1753721221/20220901_145237_Original_1_gj61en.jpg',
                  alt: 'Property purchased in UK'
                },
                {
                  src: 'https://res.cloudinary.com/dmns9ystn/image/upload/v1753721220/20220831_124356_Original_jaimwa.jpg',
                  alt: 'Property purchased in UK'
                },
                {
                  src: 'https://res.cloudinary.com/dmns9ystn/image/upload/v1753721220/20220830_180153_Original_oi5tsa.jpg',
                  alt: 'Property purchased in UK'
                },
                {
                  src: 'https://res.cloudinary.com/dmns9ystn/image/upload/v1753721220/20220830_180153_Original_1_w15zrw.jpg',
                  alt: 'Property purchased in UK'
                },
                {
                  src: 'https://res.cloudinary.com/dmns9ystn/image/upload/v1753721220/20220831_124356_Original_1_krqrs0.jpg',
                  alt: 'Property purchased in UK'
                },
                {
                  src: 'https://res.cloudinary.com/dmns9ystn/image/upload/v1753721219/20220815_114245_Original_2_is9go4.jpg',
                  alt: 'Property purchased in UK'
                },
                {
                  src: 'https://res.cloudinary.com/dmns9ystn/image/upload/v1753721219/20220810_133732_Original_2_lr7xen.jpg',
                  alt: 'Property purchased in UK'
                },
                {
                  src: 'https://res.cloudinary.com/dmns9ystn/image/upload/v1753721219/20220810_121309_Original_ygkfcd.jpg',
                  alt: 'Property purchased in UK'
                },
                {
                  src: 'https://res.cloudinary.com/dmns9ystn/image/upload/v1753721217/20220810_133732_Original_1_p2kza6.jpg',
                  alt: 'Property purchased in UK'
                }
              ]}
            />
          </motion.div>
        </div>
      </section>

      {/* Enhanced Benefits Section */}
      <section id="why-us" className="py-20 bg-white relative overflow-hidden">
        <BreathingGrid />
        <SubtleBackgroundEnhancer variant="elegant" intensity="light" />
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-[0.02]" style={{backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.4"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'}}></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-blue-900 mb-4">
              Why Choose Same Day Home Buyer?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We offer the UK's fastest, most reliable cash house buying service with guaranteed completion.
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={staggerChildren}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <motion.div variants={fadeInUp}>
              <Card className="h-full border-2 border-transparent hover:border-orange-500 transition-all duration-300 transform hover:-translate-y-3 hover:shadow-2xl relative overflow-hidden group">
                {/* Background Image */}
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundImage: 'url(/modern_uk_house.jpg)' }}
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-white/85 group-hover:bg-white/75 transition-all duration-300"></div>
                {/* Content */}
                <CardContent className="p-8 text-center relative z-10">
                  <div className="mb-6">
                    <div className="bg-orange-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto group-hover:bg-orange-500 transition-colors duration-300">
                      <img src={lightningFastIcon} alt="Lightning fast property sale process - immediate cash offer" className="h-16 w-16" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-blue-900 mb-4 group-hover:text-orange-500 transition-colors duration-300">Lightning Fast</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Get your cash offer within 2 hours and complete the sale in as little as 24 hours. No waiting around for months.
                  </p>
                  <Badge variant="secondary" className="bg-orange-100 text-orange-700 group-hover:bg-orange-500 group-hover:text-white transition-colors duration-300 px-4 py-2">
                    2 Hour Decision
                  </Badge>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="h-full border-2 border-transparent hover:border-orange-500 transition-all duration-300 transform hover:-translate-y-3 hover:shadow-2xl relative overflow-hidden group">
                {/* Background Image */}
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundImage: 'url(/property_bg_1.webp)' }}
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-white/85 group-hover:bg-white/75 transition-all duration-300"></div>
                {/* Content */}
                <CardContent className="p-8 text-center relative z-10">
                  <div className="mb-6">
                    <div className="bg-green-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto group-hover:bg-orange-500 transition-colors duration-300">
                      <img src={cashGuaranteeIcon} alt="Guaranteed cash offer for your property - no chain delays" className="h-16 w-16" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-blue-900 mb-4 group-hover:text-orange-500 transition-colors duration-300">Cash Guarantee</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    We buy with our own cash funds. No chain, no mortgage delays, no fall-throughs. Guaranteed completion.
                  </p>
                  <Badge variant="secondary" className="bg-green-100 text-green-700 group-hover:bg-orange-500 group-hover:text-white transition-colors duration-300 px-4 py-2">
                    100% Cash
                  </Badge>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="h-full border-2 border-transparent hover:border-orange-500 transition-all duration-300 transform hover:-translate-y-3 hover:shadow-2xl relative overflow-hidden group">
                {/* Background Image */}
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundImage: 'url(/property_bg_2.jpg)' }}
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-white/85 group-hover:bg-white/75 transition-all duration-300"></div>
                {/* Content */}
                <CardContent className="p-8 text-center relative z-10">
                  <div className="mb-6">
                    <div className="bg-blue-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto group-hover:bg-orange-500 transition-colors duration-300">
                      <img src={zeroFeesIcon} alt="No hidden fees or charges - we cover all costs" className="h-16 w-16" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-blue-900 mb-4 group-hover:text-orange-500 transition-colors duration-300">Zero Fees</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    We pay all legal fees and costs. No estate agent fees, no surveys, no hidden charges. What we offer is what you get.
                  </p>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-700 group-hover:bg-orange-500 group-hover:text-white transition-colors duration-300 px-4 py-2">
                    No Hidden Costs
                  </Badge>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Comparison Section - Mobile Cards or Desktop Table */}
      {isMobile ? (
        <MobileComparisonCards comparisonData={comparisonData} />
      ) : (
        <section id="comparison" className="py-20 relative overflow-hidden min-h-screen">
          {/* Visual Metrics Background */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-70"
            style={{ backgroundImage: 'url(/uk_houses_hero.jpg)' }}
          />
          {/* Light overlay for readability */}
          <div className="absolute inset-0 bg-white/15"></div>
          <div className="container mx-auto px-4 relative z-10">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-blue-900 mb-4">
                Compare Your Options
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                See how we stack up against traditional selling methods. The choice is clear.
              </p>
            </motion.div>

          <motion.div 
            className="overflow-x-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <table className="w-full bg-white/30 backdrop-blur-lg rounded-2xl shadow-lg overflow-hidden border border-white/40">
              <thead className="bg-blue-900/70 backdrop-blur-sm text-white">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold">Selling Method</th>
                  <th className="px-6 py-4 text-center font-semibold">Time to Complete</th>
                  <th className="px-6 py-4 text-center font-semibold">Total Fees</th>
                  <th className="px-6 py-4 text-center font-semibold">Guaranteed Sale</th>
                  <th className="px-6 py-4 text-center font-semibold">Hassle Level</th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, index) => (
                  <tr key={index} className={`${row.highlight ? 'bg-green-500/20 backdrop-blur-sm border-l-4 border-green-500' : 'hover:bg-white/30 backdrop-blur-sm'} transition-all duration-300`}>
                    <td className={`px-6 py-4 font-semibold ${row.highlight ? 'text-green-700' : 'text-gray-900'}`}>
                      {row.method}
                      {row.highlight && <Badge className="ml-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-sm">BEST CHOICE</Badge>}
                    </td>
                    <td className={`px-6 py-4 text-center ${row.highlight ? 'text-green-700 font-medium' : ''}`}>{row.time}</td>
                    <td className={`px-6 py-4 text-center ${row.highlight ? 'text-green-700 font-medium' : ''}`}>
                      <span className={row.fees === '£0' ? 'text-green-600 font-bold' : 'text-red-600'}>
                        {row.fees}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      {row.guarantee === 'Yes' ? (
                        <div className="flex items-center justify-center">
                          <div className="bg-green-100/60 backdrop-blur-sm rounded-full p-1">
                            <CheckCircle className="h-5 w-5 text-green-600" />
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center">
                          <div className="bg-red-100/60 backdrop-blur-sm rounded-full p-1">
                            <span className="text-red-600 font-bold text-lg">✗</span>
                          </div>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Badge 
                        className={
                          row.hassle === 'None' 
                            ? 'bg-green-100/60 text-green-700 border-green-300/60 backdrop-blur-sm' 
                            : row.hassle === 'Medium' 
                            ? 'bg-amber-100/60 text-amber-700 border-amber-300/60 backdrop-blur-sm' 
                            : 'bg-red-100/60 text-red-700 border-red-300/60 backdrop-blur-sm'
                        }
                      >
                        {row.hassle}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>
      </section>
      )}

      {/* Process Section - Mobile Cards or Desktop Chart */}
      {isMobile ? (
        <MobileProcessCards />
      ) : (
        <section className="py-20 bg-white relative overflow-hidden">
          <AnimatedTimelinePaths />
          <SubtleBackgroundEnhancer variant="modern" intensity="minimal" />
          <div className="container mx-auto px-4 relative z-10">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-blue-900 mb-4">
                Our Streamlined Process
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Experience a hassle-free journey from enquiry to completion with our transparent 4-step process.
              </p>
            </motion.div>
            <ProcessChart />
          </div>
        </section>
      )}

      {/* Testimonials Section - Mobile Slider or Desktop Grid */}
      {isMobile ? (
        <MobileTestimonials testimonialData={testimonialData} />
      ) : (
        <section id="testimonials" className="py-20 bg-white relative overflow-hidden">
          <MorphingBlobs />
          <SubtleBackgroundEnhancer variant="default" intensity="minimal" />
          <div className="container mx-auto px-4 relative z-10">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-blue-900 mb-4">
                What Our Customers Say
              </h2>
              <div className="flex items-center justify-center space-x-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-6 w-6 fill-yellow-400 text-yellow-400" />
                ))}
                <span className="ml-2 text-lg font-semibold text-green-600">4.9/5 from 2,847 reviews</span>
              </div>
            </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerChildren}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <motion.div variants={fadeInUp}>
              <Card className="h-full hover:shadow-2xl transition-all duration-500 relative overflow-hidden bg-transparent group perspective-1000 hover:scale-105 hover:-translate-y-2">
                {/* Property Background */}
                <div 
                  className="absolute inset-0 bg-cover bg-center blur-sm transition-all duration-500 group-hover:blur-md group-hover:scale-110"
                  style={{ backgroundImage: 'url(/property_bg_1.webp)' }}
                />
                <CardContent className="p-6 relative z-10 bg-transparent">
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6 h-52 flex flex-col justify-between transition-all duration-500 group-hover:bg-white/30 group-hover:backdrop-blur-md group-hover:scale-105 group-hover:shadow-xl">
                    <div>
                      <div className="flex items-center space-x-1 mb-4 transition-all duration-300 group-hover:scale-110">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <p className="text-gray-700 mb-4 italic font-medium leading-relaxed transition-all duration-300 group-hover:text-gray-800 group-hover:font-semibold group-hover:scale-105">
                        "Absolutely fantastic service. They delivered exactly what they promised - cash offer in 2 hours and completion in just 3 days. Couldn't be happier with the process!"
                      </p>
                    </div>
                    <div className="flex items-center space-x-3 transition-all duration-300 group-hover:scale-105">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-blue-200">
                        <span className="text-blue-600 font-semibold">SM</span>
                      </div>
                      <div>
                        <div className="font-semibold text-blue-900 transition-all duration-300 group-hover:text-blue-800">Sarah M.</div>
                        <div className="text-sm text-gray-600 transition-all duration-300 group-hover:text-gray-700">London • Verified Purchase</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="h-full hover:shadow-2xl transition-all duration-500 relative overflow-hidden bg-transparent group perspective-1000 hover:scale-105 hover:-translate-y-2">
                {/* Property Background */}
                <div 
                  className="absolute inset-0 bg-cover bg-center blur-sm transition-all duration-500 group-hover:blur-md group-hover:scale-110"
                  style={{ backgroundImage: 'url(/property_bg_2.jpg)' }}
                />
                <CardContent className="p-6 relative z-10 bg-transparent">
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6 h-52 flex flex-col justify-between transition-all duration-500 group-hover:bg-white/30 group-hover:backdrop-blur-md group-hover:scale-105 group-hover:shadow-xl">
                    <div>
                      <div className="flex items-center space-x-1 mb-4 transition-all duration-300 group-hover:scale-110">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <p className="text-gray-700 mb-4 italic font-medium leading-relaxed transition-all duration-300 group-hover:text-gray-800 group-hover:font-semibold group-hover:scale-105">
                        "After months of trying to sell through traditional estate agents, Same Day Home Buyer sorted everything in just one week. Incredibly professional and completely stress-free experience."
                      </p>
                    </div>
                    <div className="flex items-center space-x-3 transition-all duration-300 group-hover:scale-105">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-green-200">
                        <span className="text-green-600 font-semibold">JT</span>
                      </div>
                      <div>
                        <div className="font-semibold text-blue-900 transition-all duration-300 group-hover:text-blue-800">James T.</div>
                        <div className="text-sm text-gray-600 transition-all duration-300 group-hover:text-gray-700">Manchester • Verified Purchase</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="h-full hover:shadow-2xl transition-all duration-500 relative overflow-hidden bg-transparent group perspective-1000 hover:scale-105 hover:-translate-y-2">
                {/* Property Background */}
                <div 
                  className="absolute inset-0 bg-cover bg-center blur-sm transition-all duration-500 group-hover:blur-md group-hover:scale-110"
                  style={{ backgroundImage: 'url(/property_bg_3.jpg)' }}
                />
                <CardContent className="p-6 relative z-10 bg-transparent">
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6 h-52 flex flex-col justify-between transition-all duration-500 group-hover:bg-white/30 group-hover:backdrop-blur-md group-hover:scale-105 group-hover:shadow-xl">
                    <div>
                      <div className="flex items-center space-x-1 mb-4 transition-all duration-300 group-hover:scale-110">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <p className="text-gray-700 mb-4 italic font-medium leading-relaxed transition-all duration-300 group-hover:text-gray-800 group-hover:font-semibold group-hover:scale-105">
                        "Needed to sell quickly due to unexpected financial difficulties. They were incredibly understanding, completely fair with pricing, and amazingly fast with the entire process. Highly recommended!"
                      </p>
                    </div>
                    <div className="flex items-center space-x-3 transition-all duration-300 group-hover:scale-105">
                      <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-purple-200">
                        <span className="text-purple-600 font-semibold">ER</span>
                      </div>
                      <div>
                        <div className="font-semibold text-blue-900 transition-all duration-300 group-hover:text-blue-800">Emma R.</div>
                        <div className="text-sm text-gray-600 transition-all duration-300 group-hover:text-gray-700">Birmingham • Verified Purchase</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>
      )}

      {/* FAQ Section - Mobile Accordion or Desktop Cards */}
      {isMobile ? (
        <MobileFAQ faqData={faqData} />
      ) : (
        <section id="faq" className="py-20 bg-gray-50 relative overflow-hidden">
          <ParticleConstellation />
          <div
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{ backgroundImage: 'url(https://res.cloudinary.com/dmns9ystn/image/upload/v1751634505/5d290aa3-b4da-48a5-ab3c-f2aae3b619c8_sr7ast.png)' }}
          ></div>
          <div className="container mx-auto px-4 relative z-10">
            <motion.div 
              className="text-center mb-12"
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
              {faqData.map((faq, index) => (
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
      )}

      {/* Enhanced CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-900 to-blue-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Sell Your House Fast?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Get your free cash offer today. No obligation, no hassle, no fees. Join thousands of satisfied customers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <Button 
                onClick={handleCTAClick}
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-lg font-semibold"
              >
                Get Free Cash Offer
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <div className="flex items-center space-x-2">
                <Phone className="h-5 w-5" />
                <span className="text-lg font-semibold">Call: 0330 043 7570</span>
              </div>
            </div>
            <div className="flex items-center space-x-8 text-sm opacity-90">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4" />
                <span>2-hour response</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4" />
                <span>No obligation</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4" />
                <span>Free service</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  )
}

// Loading component for lazy-loaded routes
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
      <p className="mt-4 text-gray-600">Loading...</p>
    </div>
  </div>
)

function App() {
  return (
    <Layout>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/valuation/:postcode" element={<ValuationPage />} />
          <Route path="/propertysubmitted" element={<PropertyDetailsForm />} />
          <Route path="/london" element={<LondonLandingPage />} />
          <Route path="/manchester" element={<ManchesterLandingPage />} />
          <Route path="/birmingham" element={<BirminghamLandingPage />} />
          <Route path="/liverpool" element={<LiverpoolLandingPage />} />
          <Route path="/leeds" element={<LeedsLandingPage />} />
          <Route path="/bradford" element={<BradfordLandingPage />} />
          <Route path="/camden" element={<CamdenLandingPage />} />
          <Route path="/nottingham" element={<NottinghamLandingPage />} />
          <Route path="/leicester" element={<LeicesterLandingPage />} />
          <Route path="/southampton" element={<SouthamptonLandingPage />} />
          <Route path="/sheffield" element={<SheffieldLandingPage />} />
          <Route path="/newcastle" element={<NewcastleLandingPage />} />
          <Route path="/bristol" element={<BristolLandingPage />} />
          <Route path="/lewisham" element={<LewishamLandingPage />} />
          <Route path="/croydon" element={<CroydonLandingPage />} />
          <Route path="/hammersmith" element={<HammersmithLandingPage />} />
          <Route path="/havering" element={<HaveringLandingPage />} />
          <Route path="/redbridge" element={<RedbridgeLandingPage />} />
          <Route path="/barnet" element={<BarnetLandingPage />} />
          <Route path="/hackney" element={<HackneyLandingPage />} />
          <Route path="/enfield" element={<EnfieldLandingPage />} />
          <Route path="/coventry" element={<CoventryLandingPage />} />
          <Route path="/wolverhampton" element={<WolverhamptonLandingPage />} />
          <Route path="/solihull" element={<SolihullLandingPage />} />
          <Route path="/walsall" element={<WalsallLandingPage />} />
          <Route path="/west-bromwich" element={<WestBromwichLandingPage />} />
          <Route path="/dudley" element={<DudleyLandingPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/how-to-find-cash-buyers" element={<HowToFindCashBuyers />} />
          <Route path="/blog/how-to-sell-house-without-fees" element={<SellHouseWithoutFees />} />
          <Route path="/blog/how-to-sell-house-without-chain" element={<SellHouseWithoutChain />} />
          <Route path="/blog/sell-probate-house-uk" element={<SellProbateHouseUK />} />
          <Route path="/blog/avoid-repossession-uk" element={<AvoidRepossessionUK />} />
          <Route path="/blog/sell-disrepair-house" element={<SellDisrepairHouse />} />
          <Route path="/blog/sell-house-after-divorce-uk" element={<SellHouseAfterDivorce />} />
          <Route path="/blog/emigration-house-sale" element={<EmigrationHouseSale />} />
          <Route path="/blog/how-to-sell-a-house-due-to-emigration" element={<EmigrationHouseSale />} />
          <Route path="/blog/how-to-sell-a-house-after-a-divorce" element={<SellHouseAfterDivorce />} />
          <Route path="/blog/how-to-sell-a-house-in-disrepair" element={<SellDisrepairHouse />} />
          <Route path="/blog/how-to-avoid-repossession-of-your-house" element={<AvoidRepossessionUK />} />
          <Route path="/refer" element={<ReferralPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        </Routes>
      </Suspense>
    </Layout>
  )
}

export default App
