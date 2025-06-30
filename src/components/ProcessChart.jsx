import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

const processSteps = [
  {
    id: 1,
    title: 'Initial Enquiry & Valuation',
    description: 'We gather essential details about your property to provide a swift, no-obligation cash valuation tailored to your specific circumstances.',
    backgroundImage: 'https://res.cloudinary.com/dmns9ystn/image/upload/v1751323402/Gemini_Generated_Image_pmwtpdpmwtpdpmwt_sz9czd.jpg'
  },
  {
    id: 2,
    title: 'Rapid Offer Presentation',
    description: 'Within two hours, we present a competitive cash offer, reflecting our commitment to speed and efficiency in property transactions.',
    backgroundImage: 'https://res.cloudinary.com/dmns9ystn/image/upload/v1751323402/Gemini_Generated_Image_bqbqnjbqbqnjbqbq_recdvx.jpg'
  },
  {
    id: 3,
    title: 'Immediate Exchange & Fee Coverage',
    description: 'Upon your acceptance, we proceed with immediate exchange of contracts and cover all associated legal fees for seamless completion.',
    backgroundImage: 'https://res.cloudinary.com/dmns9ystn/image/upload/v1751323401/Gemini_Generated_Image_1f6ewr1f6ewr1f6e_se5z8d.jpg'
  },
  {
    id: 4,
    title: 'Flexible Completion',
    description: 'We finalize the sale at a time that perfectly suits your schedule, providing ultimate convenience and control throughout the process.',
    backgroundImage: 'https://res.cloudinary.com/dmns9ystn/image/upload/v1751323401/Gemini_Generated_Image_91zbav91zbav91zb_yfo26y.jpg'
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
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 py-12 px-4"
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
    >
      {processSteps.map((step, index) => (
        <motion.div
          key={step.id}
          className="relative group cursor-pointer"
          variants={itemVariants}
          whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
        >
          {/* Card with background image */}
          <div className="relative h-80 rounded-xl overflow-hidden shadow-lg">
            {/* Background Image */}
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
              style={{ backgroundImage: `url(${step.backgroundImage})` }}
            />
            
            {/* Light overlay for image visibility */}
            <div className="absolute inset-0 bg-white/30 transition-opacity duration-300" />
            
            {/* Step number badge */}
            <div className="absolute top-4 left-4 w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white text-xl font-bold shadow-lg z-10">
              {step.id}
            </div>
            
            {/* Content overlay */}
            <div className="absolute inset-0 p-6 flex flex-col justify-end">
              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-white/40 transition-all duration-300 group-hover:bg-white/95 group-hover:backdrop-blur-md min-h-[120px] flex flex-col justify-between">
                <h3 className="text-lg font-semibold text-blue-900 mb-2 leading-tight">
                  {step.title}
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed flex-1">
                  {step.description}
                </p>
              </div>
            </div>
            
            {/* Hover effect border */}
            <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-400 rounded-xl transition-colors duration-300" />
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default ProcessChart;


