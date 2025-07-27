import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { ChevronDown, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const MobileServiceAreas = () => {
  const [activeRegion, setActiveRegion] = useState(null);

  const serviceAreas = [
    {
      region: 'London & South East',
      areas: [
        { name: 'London', path: '/london' },
        { name: 'Camden', path: '/camden' },
        { name: 'Croydon', path: '/croydon' },
        { name: 'Hammersmith', path: '/hammersmith' },
        { name: 'Lewisham', path: '/lewisham' },
        { name: 'Southampton', path: '/southampton' }
      ]
    },
    {
      region: 'Midlands',
      areas: [
        { name: 'Birmingham', path: '/birmingham' },
        { name: 'Coventry', path: '/coventry' },
        { name: 'Leicester', path: '/leicester' },
        { name: 'Nottingham', path: '/nottingham' },
        { name: 'Wolverhampton', path: '/wolverhampton' },
        { name: 'Solihull', path: '/solihull' }
      ]
    },
    {
      region: 'North England',
      areas: [
        { name: 'Manchester', path: '/manchester' },
        { name: 'Liverpool', path: '/liverpool' },
        { name: 'Leeds', path: '/leeds' },
        { name: 'Bradford', path: '/bradford' },
        { name: 'Sheffield', path: '/sheffield' },
        { name: 'Newcastle', path: '/newcastle' }
      ]
    },
    {
      region: 'South West',
      areas: [
        { name: 'Bristol', path: '/bristol' }
      ]
    }
  ];

  const toggleRegion = (index) => {
    setActiveRegion(activeRegion === index ? null : index);
  };

  return (
    <section className="py-12 px-4 bg-gray-50">
      <div className="max-w-md mx-auto">
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Badge className="bg-blue-100 text-blue-900 px-3 py-1 text-xs font-semibold mb-3">
            Service Areas
          </Badge>
          <h2 className="text-2xl font-bold text-blue-900 mb-2">Where We Buy</h2>
          <p className="text-sm text-gray-600">We cover all major UK cities</p>
        </motion.div>

        <div className="space-y-3">
          {serviceAreas.map((region, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              viewport={{ once: true }}
            >
              <Card className={`border transition-all duration-300 ${
                activeRegion === index 
                  ? 'border-blue-500 shadow-md' 
                  : 'border-gray-200'
              }`}>
                <CardContent className="p-0">
                  <button
                    onClick={() => toggleRegion(index)}
                    className="w-full px-4 py-4 text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <MapPin className="h-5 w-5 text-blue-900" />
                      <h3 className="text-base font-semibold text-gray-900">
                        {region.region}
                      </h3>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500">{region.areas.length} areas</span>
                      <ChevronDown 
                        className={`h-5 w-5 text-gray-500 transition-transform duration-300 ${
                          activeRegion === index ? 'rotate-180' : ''
                        }`} 
                      />
                    </div>
                  </button>

                  <AnimatePresence>
                    {activeRegion === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-4 pb-4 pt-0">
                          <div className="border-t border-gray-100 pt-3">
                            <div className="grid grid-cols-2 gap-2">
                              {region.areas.map((area, areaIndex) => (
                                <Link
                                  key={areaIndex}
                                  to={area.path}
                                  className="text-sm text-blue-600 hover:text-blue-800 hover:underline py-1"
                                >
                                  {area.name}
                                </Link>
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* View All Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-6 text-center"
        >
          <a 
            href="/sitemap.xml" 
            className="text-blue-900 font-semibold hover:underline text-sm"
          >
            View all service areas →
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default MobileServiceAreas;