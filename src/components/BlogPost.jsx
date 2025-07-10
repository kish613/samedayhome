import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Calendar, Clock, ArrowLeft, ArrowRight, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent } from '@/components/ui/card.jsx'

const logoImg = 'https://res.cloudinary.com/dmns9ystn/image/upload/v1751291817/260by80_lgo_sameday_uibnpv.png'

function BlogPost({ 
  title, 
  content, 
  date, 
  readTime, 
  category, 
  image, 
  metaTitle, 
  metaDescription, 
  keywords,
  slug 
}) {
  useEffect(() => {
    document.title = metaTitle || title
    
    const metaDesc = document.querySelector('meta[name="description"]')
    if (metaDesc) {
      metaDesc.setAttribute('content', metaDescription)
    }

    // Add Open Graph tags
    let ogTitle = document.querySelector('meta[property="og:title"]')
    if (!ogTitle) {
      ogTitle = document.createElement('meta')
      ogTitle.setAttribute('property', 'og:title')
      document.head.appendChild(ogTitle)
    }
    ogTitle.setAttribute('content', metaTitle || title)

    let ogDescription = document.querySelector('meta[property="og:description"]')
    if (!ogDescription) {
      ogDescription = document.createElement('meta')
      ogDescription.setAttribute('property', 'og:description')
      document.head.appendChild(ogDescription)
    }
    ogDescription.setAttribute('content', metaDescription)

    let ogImage = document.querySelector('meta[property="og:image"]')
    if (!ogImage) {
      ogImage = document.createElement('meta')
      ogImage.setAttribute('property', 'og:image')
      document.head.appendChild(ogImage)
    }
    ogImage.setAttribute('content', image)

    // Add canonical URL
    let canonical = document.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      document.head.appendChild(canonical)
    }
    canonical.setAttribute('href', `https://samedayhomebuyer.co.uk/blog/${slug}`)

    // Add structured data
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": title,
      "description": metaDescription,
      "image": image,
      "author": {
        "@type": "Organization",
        "name": "Same Day Home Buyer"
      },
      "publisher": {
        "@type": "Organization", 
        "name": "Same Day Home Buyer",
        "logo": {
          "@type": "ImageObject",
          "url": logoImg
        }
      },
      "datePublished": date,
      "dateModified": date
    }

    let script = document.querySelector('script[type="application/ld+json"]')
    if (!script) {
      script = document.createElement('script')
      script.type = 'application/ld+json'
      document.head.appendChild(script)
    }
    script.textContent = JSON.stringify(structuredData)
  }, [title, metaTitle, metaDescription, image, slug, date])

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
              <Link to="/blog" className="text-gray-700 hover:text-blue-900 transition-colors font-medium">Blog</Link>
              <a href="#contact" className="text-gray-700 hover:text-blue-900 transition-colors font-medium">Contact</a>
            </nav>

            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-2 text-blue-900">
                <Phone className="h-4 w-4" />
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

      {/* Back to Blog */}
      <div className="bg-gray-50 py-4">
        <div className="container mx-auto px-4">
          <Link 
            to="/blog"
            className="inline-flex items-center text-blue-900 hover:text-orange-500 transition-colors font-medium"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Link>
        </div>
      </div>

      {/* Hero Image & Title */}
      <section className="relative">
        <div className="relative h-96 overflow-hidden">
          <img 
            src={image}
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="container mx-auto">
              <div className="mb-4">
                <span className="bg-blue-900 text-white px-4 py-2 rounded-full text-sm font-semibold">
                  {category}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                {title}
              </h1>
              <div className="flex items-center text-white/90 text-sm">
                <Calendar className="h-4 w-4 mr-2" />
                <span className="mr-6">{date}</span>
                <Clock className="h-4 w-4 mr-2" />
                <span>{readTime}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <article className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: content }} />
          </div>
        </div>
      </article>

      {/* CTA Section */}
      <section className="bg-blue-900 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Sell Your Property Fast?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Get a guaranteed cash offer for your property within 2 hours. No fees, no hassle, completion in 24 hours.
          </p>
          <Link to="/">
            <Button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold text-lg px-8 py-4">
              Get Your Free Cash Offer Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 text-sm opacity-75">
            <span>✓ 2-hour response guarantee</span>
            <span>✓ No hidden fees</span>
            <span>✓ Complete in 24 hours</span>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-12 text-blue-900">
            Related Articles
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <h4 className="font-bold mb-2 text-blue-900">
                  <Link to="/blog/avoid-repossession-uk" className="hover:text-orange-500 transition-colors">
                    Avoiding Repossession: Your Options
                  </Link>
                </h4>
                <p className="text-gray-600 text-sm">
                  Learn how to stop repossession and sell your house quickly...
                </p>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <h4 className="font-bold mb-2 text-blue-900">
                  <Link to="/blog/sell-disrepair-house" className="hover:text-orange-500 transition-colors">
                    Selling a House in Poor Condition
                  </Link>
                </h4>
                <p className="text-gray-600 text-sm">
                  Is a cash buyer right for your damaged property...
                </p>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <h4 className="font-bold mb-2 text-blue-900">
                  <Link to="/blog/sell-house-after-divorce-uk" className="hover:text-orange-500 transition-colors">
                    Divorce and House Sale
                  </Link>
                </h4>
                <p className="text-gray-600 text-sm">
                  How to sell fast during separation and move on...
                </p>
              </CardContent>
            </Card>
          </div>
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

export default BlogPost 