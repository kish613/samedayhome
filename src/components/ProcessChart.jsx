import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

const processSteps = [
  {
    id: 1,
    title: 'Initial Enquiry & Valuation',
    description: 'We gather essential details about your property to provide a swift, no-obligation cash valuation.',
  },
  {
    id: 2,
    title: 'Rapid Offer Presentation',
    description: 'Within two hours, we present a competitive cash offer, reflecting our commitment to speed and efficiency.',
  },
  {
    id: 3,
    title: 'Immediate Exchange & Fee Coverage',
    description: 'Upon your acceptance, we proceed with an immediate exchange of contracts and cover all associated legal fees, ensuring a seamless transaction.',
  },
  {
    id: 4,
    title: 'Flexible Completion',
    description: 'We finalize the sale at a time that perfectly suits your schedule, providing ultimate convenience and control.',
  },
];

const ProcessChart = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    show: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      className="relative flex flex-col md:flex-row justify-between items-center py-12 px-4"
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
    >

      {processSteps.map((step, index) => (
        <motion.div
          key={step.id}
          className="relative z-10 flex flex-col items-center text-center mb-12 md:mb-0 md:w-1/4 px-4"
          variants={itemVariants}
        >
          <div className="relative">
            <div className="w-16 h-16 rounded-full bg-blue-900 flex items-center justify-center text-white text-2xl font-bold border-4 border-white shadow-lg">
              {step.id}
            </div>
          </div>
          <h3 className="mt-6 text-xl font-semibold text-blue-900">{step.title}</h3>
          <p className="mt-2 text-gray-600">{step.description}</p>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default ProcessChart;


