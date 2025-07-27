import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MobileFAQ = ({ faqData }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-12 px-4 bg-white">
      <div className="max-w-md mx-auto">
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Badge className="bg-blue-100 text-blue-900 px-3 py-1 text-xs font-semibold mb-3">
            FAQs
          </Badge>
          <h2 className="text-2xl font-bold text-blue-900 mb-2">Common Questions</h2>
          <p className="text-sm text-gray-600">Everything you need to know</p>
        </motion.div>

        <div className="space-y-3">
          {faqData.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              viewport={{ once: true }}
            >
              <Card className={`border transition-all duration-300 ${
                activeIndex === index 
                  ? 'border-orange-500 shadow-md' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}>
                <CardContent className="p-0">
                  <button
                    onClick={() => toggleAccordion(index)}
                    className="w-full px-4 py-4 text-left flex items-start justify-between gap-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 rounded-lg"
                  >
                    <div className="flex items-start gap-3 flex-1">
                      <HelpCircle className="h-5 w-5 text-blue-900 mt-0.5 flex-shrink-0" />
                      <h3 className="text-base font-semibold text-gray-900 pr-2">
                        {faq.question}
                      </h3>
                    </div>
                    <ChevronDown 
                      className={`h-5 w-5 text-gray-500 flex-shrink-0 transition-transform duration-300 ${
                        activeIndex === index ? 'rotate-180' : ''
                      }`} 
                    />
                  </button>

                  <AnimatePresence>
                    {activeIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-4 pb-4 pt-0">
                          <div className="border-t border-gray-100 pt-3">
                            <p className="text-sm text-gray-600 leading-relaxed pl-8">
                              {faq.answer}
                            </p>
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

        {/* Additional Help */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-8 text-center"
        >
          <p className="text-sm text-gray-600 mb-2">Still have questions?</p>
          <a 
            href="tel:03300437570" 
            className="text-blue-900 font-semibold hover:underline"
          >
            Call us at 0330 043 7570
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default MobileFAQ;