import React from 'react';
import { Card, CardContent } from '@/components/ui/card.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { CheckCircle, XCircle, Clock, PoundSterling, Shield, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const MobileComparisonCards = ({ comparisonData }) => {
  const getIcon = (type) => {
    switch(type) {
      case 'time': return Clock;
      case 'fees': return PoundSterling;
      case 'guarantee': return Shield;
      case 'hassle': return AlertCircle;
      default: return CheckCircle;
    }
  };

  const getMetricStyle = (metric, value) => {
    if (metric === 'fees') {
      return value === '£0' ? 'text-green-600' : 'text-red-600';
    }
    if (metric === 'guarantee') {
      return value === 'Yes' ? 'text-green-600' : 'text-red-600';
    }
    if (metric === 'hassle') {
      return value === 'None' ? 'text-green-600' : 
             value === 'Medium' ? 'text-yellow-600' : 'text-red-600';
    }
    return 'text-gray-600';
  };

  return (
    <section className="py-12 px-4">
      <div className="max-w-md mx-auto">
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Badge className="bg-blue-100 text-blue-900 px-3 py-1 text-xs font-semibold mb-3">
            Compare Options
          </Badge>
          <h2 className="text-2xl font-bold text-blue-900 mb-2">Why We're Different</h2>
          <p className="text-sm text-gray-600">See how we compare to traditional methods</p>
        </motion.div>

        <div className="space-y-4">
          {comparisonData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className={`${item.highlight ? 'border-2 border-orange-500 shadow-lg' : 'border border-gray-200'}`}>
                <CardContent className="p-4">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-3">
                    <h3 className={`font-semibold text-lg ${item.highlight ? 'text-orange-600' : 'text-gray-900'}`}>
                      {item.method}
                    </h3>
                    {item.highlight && (
                      <Badge className="bg-orange-100 text-orange-600 text-xs px-2 py-1">
                        Recommended
                      </Badge>
                    )}
                  </div>

                  {/* Metrics Grid */}
                  <div className="grid grid-cols-2 gap-3">
                    {/* Time to Complete */}
                    <div className="flex items-start space-x-2">
                      <Clock className="h-4 w-4 text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-xs text-gray-500">Time</p>
                        <p className={`text-sm font-medium ${getMetricStyle('time', item.time)}`}>
                          {item.time}
                        </p>
                      </div>
                    </div>

                    {/* Fees */}
                    <div className="flex items-start space-x-2">
                      <PoundSterling className="h-4 w-4 text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-xs text-gray-500">Fees</p>
                        <p className={`text-sm font-medium ${getMetricStyle('fees', item.fees)}`}>
                          {item.fees}
                        </p>
                      </div>
                    </div>

                    {/* Guarantee */}
                    <div className="flex items-start space-x-2">
                      <Shield className="h-4 w-4 text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-xs text-gray-500">Guaranteed</p>
                        <div className="flex items-center space-x-1">
                          {item.guarantee === 'Yes' ? (
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          ) : (
                            <XCircle className="h-4 w-4 text-red-600" />
                          )}
                          <span className={`text-sm font-medium ${getMetricStyle('guarantee', item.guarantee)}`}>
                            {item.guarantee}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Hassle Level */}
                    <div className="flex items-start space-x-2">
                      <AlertCircle className="h-4 w-4 text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-xs text-gray-500">Hassle</p>
                        <p className={`text-sm font-medium ${getMetricStyle('hassle', item.hassle)}`}>
                          {item.hassle}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Highlight CTA for recommended option */}
                  {item.highlight && (
                    <div className="mt-4 pt-3 border-t border-orange-100">
                      <p className="text-xs text-orange-600 font-medium text-center">
                        ✓ No estate agent fees ✓ Guaranteed completion ✓ Cash buyer
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MobileComparisonCards;