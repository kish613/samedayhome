import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { ArrowRight, CheckCircle, Star, Phone, Mail } from 'lucide-react'
import { motion } from 'framer-motion'
import PropertyDetailsForm from './PropertyDetailsForm.jsx'

// Import assets - same as homepage
const logoImg = 'https://res.cloudinary.com/dmns9ystn/image/upload/v1751291817/260by80_lgo_sameday_uibnpv.png'
import heroImg from '../assets/uk_houses_hero.jpg'

function SolihullLandingPage() {
  const [address, setAddress] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [submittedPostcode, setSubmittedPostcode] = useState('')

  useEffect(() => {
    document.title = 'Sell Your House Fast in Solihull | Cash House Buyers Solihull | Same Day Home Buyer'
    
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute('content', 'We buy houses fast in Solihull. Cash offers within 2 hours. No fees, no hassle. Sell your Solihull property quickly to trusted cash buyers.')
    }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!address.trim()) return
    
    const postcodeRegex = /^[A-Z]{1,2}[0-9][A-Z0-9]? ?[0-9][A-Z]{2}$/i
    if (!postcodeRegex.test(address.trim())) {
      alert('Please enter a valid UK postcode')
      return
    }
    
    setSubmittedPostcode(address.trim().toUpperCase())
    setShowForm(true)
  }

  const handleBackToSearch = () => {
    setShowForm(false)
    setAddress('')
    setSubmittedPostcode('')
  }

  if (showForm) {
    return <PropertyDetailsForm postcode={submittedPostcode} onBack={handleBackToSearch} />
  }

  return (
    <div className="min-h-screen bg-white">      {/* Hero Section - Solihull Specific */}
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
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="block text-orange-400">How to</span> Sell Your House Fast
              <span className="block text-orange-400">in Solihull</span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto leading-relaxed">
              Learn <strong>how to sell house fast UK</strong> in Solihull. We buy properties throughout Solihull and the West Midlands. 
              Cash offers within 2 hours, completion in 24 hours.
            </p>

            <motion.form 
              onSubmit={handleSubmit}
              className="max-w-2xl mx-auto mb-12 bg-white/10 backdrop-blur-sm rounded-2xl p-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <h3 className="text-xl font-semibold mb-4">Get Your FREE Solihull Property Valuation</h3>
              <div className="flex flex-col sm:flex-row gap-3">
                <Input
                  type="text"
                  placeholder="Enter your Solihull postcode"
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
              <p className="text-sm mt-3 opacity-90">Free Solihull property valuation • No obligation • 2-hour response</p>
            </motion.form>

            {/* Solihull Areas */}
            <motion.div 
              className="max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <h3 className="text-2xl font-bold mb-6">We Buy Properties Across Solihull & Surrounding Areas</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>Solihull Town Centre • Shirley • Olton • Hall Green</div>
                <div>Knowle • Dorridge • Balsall Common • Meriden</div>
                <div>Birmingham • Coventry • Warwick • Stratford-upon-Avon</div>
                <div>Redditch • Bromsgrove • Tamworth • Lichfield</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-12 text-blue-900">Why Solihull Property Owners Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-bold mb-4 text-blue-900">Lightning Fast</h3>
              <p className="text-gray-600">Cash offer for your Solihull property within 2 hours. Complete the sale in 24 hours.</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="text-4xl mb-4">💷</div>
              <h3 className="text-xl font-bold mb-4 text-blue-900">No Fees Ever</h3>
              <p className="text-gray-600">Zero estate agent fees, zero legal fees, zero hidden costs. What we offer is what you get.</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="text-4xl mb-4">🏠</div>
              <h3 className="text-xl font-bold mb-4 text-blue-900">Any Condition</h3>
              <p className="text-gray-600">We buy Solihull properties in any condition. No repairs needed, no cleaning required.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How to Sell Your House Fast in Solihull Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-blue-900">
              How to Sell Your House Fast in Solihull
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Follow these simple steps to <strong>sell your house quickly in Solihull</strong> with our proven process
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-orange-600">1</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-blue-900">Contact Us</h3>
              <p className="text-gray-600">Call or fill out our form to get started. We'll ask basic questions about your Solihull property.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-orange-600">2</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-blue-900">Quick Valuation</h3>
              <p className="text-gray-600">We'll value your property using Solihull market data and arrange a viewing if needed.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-orange-600">3</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-blue-900">Cash Offer</h3>
              <p className="text-gray-600">Receive a guaranteed cash offer within 2 hours. No obligation to accept.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-orange-600">4</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-blue-900">Complete Sale</h3>
              <p className="text-gray-600">We handle all paperwork and complete your Solihull property sale in 24 hours.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-900 to-blue-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Sell Your Solihull Property?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of Solihull property owners who have sold quickly with us. No obligation, no hassle, no fees.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-lg font-semibold">
              Get Free Solihull Property Valuation
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <div className="flex items-center space-x-2">
              <Phone className="h-5 w-5" />
              <span className="text-lg font-semibold">Call: 0330 043 7570</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <motion.img 
                src={logoImg} 
                alt="Same Day Home Buyer" 
                className="h-14 w-auto mb-4 cursor-pointer filter brightness-0 invert"
              />
              <p className="text-gray-400 mb-4">
                Solihull's trusted cash property buyer. Fast, fair, and reliable service.
              </p>
              <div className="flex items-center space-x-2 text-gray-400 mb-2">
                <Mail className="h-4 w-4" />
                <span>solihull@samedayhomebuyer.co.uk</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <Phone className="h-4 w-4" />
                <span>0330 043 7570</span>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-lg">Solihull Areas We Cover</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>Solihull Town Centre • Shirley</li>
                <li>Olton • Hall Green • Knowle</li>
                <li>Dorridge • Balsall Common • Meriden</li>
                <li>Birmingham • Coventry • Warwick</li>
                <li>All Solihull Postcodes</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-lg">Our Solihull Services</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>Cash House Purchases</li>
                <li>Solihull Probate Sales</li>
                <li>Quick Solihull Valuations</li>
                <li>Distressed Property Sales</li>
                <li>Investment Property Sales</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Same Day Home Buyer Solihull. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default SolihullLandingPage
