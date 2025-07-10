import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Calendar, ArrowRight, Clock, User } from 'lucide-react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent } from '@/components/ui/card.jsx'

const logoImg = 'https://res.cloudinary.com/dmns9ystn/image/upload/v1751291817/260by80_lgo_sameday_uibnpv.png'

const blogPosts = [
  {
    slug: 'sell-probate-house-uk',
    title: 'How to Sell a Probate Property Quickly in the UK',
    excerpt: 'Selling an inherited property can be complex. Learn the fastest ways to sell a probate house in the UK, including cash buyers, legal requirements, and tax considerations.',
    date: 'January 15, 2025',
    readTime: '7 min read',
    keywords: 'sell probate house UK, inherited house fast',
    category: 'Probate',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
  },
  {
    slug: 'avoid-repossession-uk',
    title: 'Avoiding Repossession: Your Options for a Fast House Sale',
    excerpt: 'Facing repossession? Discover your options for avoiding house repossession in the UK, including fast sale solutions and what to do if you cannot keep up with mortgage payments.',
    date: 'January 12, 2025',
    readTime: '6 min read',
    keywords: 'avoid house repossession UK, sell house quickly to stop repossession',
    category: 'Financial Distress',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
  },
  {
    slug: 'sell-disrepair-house',
    title: 'Selling a House in Poor Condition – Is a Cash Buyer Right for You?',
    excerpt: 'Got a property in disrepair? Learn whether a cash buyer is the right choice for selling your damaged property and how to maximise your return.',
    date: 'January 10, 2025',
    readTime: '5 min read',
    keywords: 'sell disrepair house, cash buyer for damaged property',
    category: 'Property Condition',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
  },
  {
    slug: 'sell-house-after-divorce-uk',
    title: 'Divorce and House Sale: How to Sell Fast and Move On',
    excerpt: 'Divorcing and need to sell your house quickly? Learn the fastest ways to sell property during separation in the UK and move forward with your life.',
    date: 'January 8, 2025',
    readTime: '6 min read',
    keywords: 'sell house after divorce UK, fast house sale during separation',
    category: 'Life Changes',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
  },
  {
    slug: 'emigration-house-sale',
    title: 'Relocating Abroad? Here\'s How to Sell Your Home Fast',
    excerpt: 'Moving abroad? Learn how to sell your UK property quickly before emigration, including timeline considerations and cash buyer advantages.',
    date: 'January 5, 2025',
    readTime: '5 min read',
    keywords: 'emigration house sale, fast home sale before moving abroad',
    category: 'Relocation',
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
  }
]

function BlogPage() {
  useEffect(() => {
    document.title = 'Property Selling Guide & Tips | Same Day Home Buyer Blog'
    
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Expert advice on selling property fast in the UK. Get tips on probate sales, avoiding repossession, selling damaged property, divorce sales and more.')
    }

    // Add Open Graph tags
    let ogTitle = document.querySelector('meta[property="og:title"]')
    if (!ogTitle) {
      ogTitle = document.createElement('meta')
      ogTitle.setAttribute('property', 'og:title')
      document.head.appendChild(ogTitle)
    }
    ogTitle.setAttribute('content', 'Property Selling Guide & Tips | Same Day Home Buyer Blog')

    let ogDescription = document.querySelector('meta[property="og:description"]')
    if (!ogDescription) {
      ogDescription = document.createElement('meta')
      ogDescription.setAttribute('property', 'og:description')
      document.head.appendChild(ogDescription)
    }
    ogDescription.setAttribute('content', 'Expert advice on selling property fast in the UK. Get tips on probate sales, avoiding repossession, selling damaged property, divorce sales and more.')

    // Add canonical URL
    let canonical = document.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      document.head.appendChild(canonical)
    }
    canonical.setAttribute('href', 'https://samedayhomebuyer.co.uk/blog')
  }, [])

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Link to="/">
              <motion.img 
                src={logoImg} 
                alt="Same Day Home Buyer" 
                className="h-24 w-auto cursor-pointer drop-shadow-md"
                whileHover={{ scale: 1.08, rotate: 3 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              />
            </Link>
            
            <nav className="hidden lg:flex items-center space-x-8">
              <Link to="/" className="text-gray-700 hover:text-blue-900 transition-colors font-medium">Home</Link>
              <Link to="/blog" className="text-blue-900 font-semibold">Blog</Link>
              <a href="#contact" className="text-gray-700 hover:text-blue-900 transition-colors font-medium">Contact</a>
            </nav>

            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-2 text-blue-900">
                <span className="font-semibold">0330 043 7570</span>
              </div>
              <Link to="/">
                <Button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold">
                  Free Cash Offer
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Property Selling <span className="text-orange-400">Expert Advice</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Get insider tips and expert guidance on selling your property fast in any situation
            </p>
          </motion.div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-xl transition-shadow duration-300 group">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img 
                      src={post.image}
                      alt={post.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-blue-900 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  
                  <CardContent className="p-6">
                    <div className="flex items-center text-gray-500 text-sm mb-3">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>{post.date}</span>
                      <Clock className="h-4 w-4 ml-4 mr-2" />
                      <span>{post.readTime}</span>
                    </div>
                    
                    <h2 className="text-xl font-bold mb-3 text-blue-900 group-hover:text-orange-500 transition-colors">
                      <Link to={`/blog/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h2>
                    
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    
                    <Link 
                      to={`/blog/${post.slug}`}
                      className="inline-flex items-center text-orange-500 hover:text-orange-600 font-semibold transition-colors"
                    >
                      Read More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </CardContent>
                </Card>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-blue-900">
            Need to Sell Your Property Fast?
          </h2>
          <p className="text-xl mb-8 text-gray-600 max-w-2xl mx-auto">
            Get a guaranteed cash offer for your property within 2 hours, regardless of condition or situation.
          </p>
          <Link to="/">
            <Button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold text-lg px-8 py-4">
              Get Your Free Cash Offer
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Same Day Home Buyer</h3>
              <p className="text-gray-400 mb-4">
                The UK's fastest property buying service. We buy any house in any condition.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
                <li><Link to="/blog" className="text-gray-400 hover:text-white transition-colors">Blog</Link></li>
                <li><Link to="/london" className="text-gray-400 hover:text-white transition-colors">London</Link></li>
                <li><Link to="/manchester" className="text-gray-400 hover:text-white transition-colors">Manchester</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Helpful Resources</h4>
              <ul className="space-y-2">
                <li><Link to="/blog/sell-probate-house-uk" className="text-gray-400 hover:text-white transition-colors">Selling a Probate House</Link></li>
                <li><Link to="/blog/avoid-repossession-uk" className="text-gray-400 hover:text-white transition-colors">Avoiding Repossession</Link></li>
                <li><Link to="/blog/sell-disrepair-house" className="text-gray-400 hover:text-white transition-colors">Selling Damaged Property</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
              <p className="text-gray-400 mb-2">Phone: 0330 043 7570</p>
              <p className="text-gray-400">Available 24/7</p>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 mt-8 text-center text-gray-400">
            <p>&copy; 2025 Same Day Home Buyer. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default BlogPage 