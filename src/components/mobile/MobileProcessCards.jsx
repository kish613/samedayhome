import React from 'react';
import { Card, CardContent } from '@/components/ui/card.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { MapPin, Calculator, CheckCircle, Home } from 'lucide-react';
import { motion } from 'framer-motion';

const MobileProcessCards = () => {
  const steps = [
    {
      number: 1,
      icon: MapPin,
      title: 'Submit Postcode',
      description: 'Enter your property postcode to get started',
      color: 'bg-blue-500'
    },
    {
      number: 2,
      icon: Calculator,
      title: 'Get Cash Offer',
      description: 'Receive a fair cash offer within 2 hours',
      color: 'bg-orange-500'
    },
    {
      number: 3,
      icon: CheckCircle,
      title: 'Accept Offer',
      description: 'Review and accept with no obligation',
      color: 'bg-green-500'
    },
    {
      number: 4,
      icon: Home,
      title: 'Complete Sale',
      description: 'Complete in as little as 24 hours',
      color: 'bg-purple-500'
    }
  ];

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
            Simple Process
          </Badge>
          <h2 className="text-2xl font-bold text-blue-900 mb-2">How It Works</h2>
          <p className="text-sm text-gray-600">4 simple steps to sell your house fast</p>
        </motion.div>

        <div className="space-y-4">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-4">
                    {/* Step Number & Icon */}
                    <div className="relative">
                      <div className={`w-12 h-12 ${step.color} rounded-full flex items-center justify-center`}>
                        <step.icon className="h-6 w-6 text-white" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-sm">
                        <span className="text-xs font-bold text-gray-700">{step.number}</span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">{step.title}</h3>
                      <p className="text-sm text-gray-600">{step.description}</p>
                    </div>
                  </div>

                  {/* Connecting Line (except for last item) */}
                  {index < steps.length - 1 && (
                    <div className="ml-6 mt-4 h-8 border-l-2 border-dashed border-gray-300"></div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* CTA at bottom */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-8 text-center"
        >
          <p className="text-sm text-gray-600 mb-2">Ready to get started?</p>
          <p className="text-lg font-semibold text-blue-900">Enter your postcode above</p>
        </motion.div>
      </div>
    </section>
  );
};

export default MobileProcessCards;