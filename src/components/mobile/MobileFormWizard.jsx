import React, { useState } from 'react';
import { Button } from '@/components/ui/button.jsx';
import { Input } from '@/components/ui/input.jsx';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, Check, Home, Building2, MapPin } from 'lucide-react';

const MobileFormWizard = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    postcode: '',
    propertyType: '',
    bedrooms: '',
    condition: '',
    timeline: ''
  });

  const steps = [
    {
      id: 'postcode',
      title: 'Property Location',
      subtitle: 'Enter your property postcode',
      field: 'postcode',
      type: 'input',
      placeholder: 'e.g., SW1A 1AA',
      inputMode: 'text',
      validation: (value) => {
        const postcodeRegex = /^[A-Z]{1,2}[0-9][A-Z0-9]? ?[0-9][A-Z]{2}$/i;
        return postcodeRegex.test(value.trim());
      },
      errorMessage: 'Please enter a valid UK postcode'
    },
    {
      id: 'propertyType',
      title: 'Property Type',
      subtitle: 'What type of property is it?',
      field: 'propertyType',
      type: 'cards',
      options: [
        { value: 'house', label: 'House', icon: Home },
        { value: 'flat', label: 'Flat', icon: Building2 },
        { value: 'bungalow', label: 'Bungalow', icon: Home },
        { value: 'other', label: 'Other', icon: MapPin }
      ]
    },
    {
      id: 'bedrooms',
      title: 'Number of Bedrooms',
      subtitle: 'How many bedrooms?',
      field: 'bedrooms',
      type: 'buttons',
      options: ['1', '2', '3', '4', '5+']
    },
    {
      id: 'condition',
      title: 'Property Condition',
      subtitle: 'Current condition of your property',
      field: 'condition',
      type: 'cards',
      options: [
        { value: 'excellent', label: 'Excellent', description: 'Move-in ready' },
        { value: 'good', label: 'Good', description: 'Minor updates needed' },
        { value: 'fair', label: 'Fair', description: 'Some repairs needed' },
        { value: 'poor', label: 'Poor', description: 'Major work required' }
      ]
    },
    {
      id: 'timeline',
      title: 'Selling Timeline',
      subtitle: 'How quickly do you need to sell?',
      field: 'timeline',
      type: 'cards',
      options: [
        { value: 'asap', label: 'ASAP', description: 'Within 7 days' },
        { value: '2weeks', label: '2 Weeks', description: 'Within 14 days' },
        { value: 'month', label: '1 Month', description: 'Within 30 days' },
        { value: 'flexible', label: 'Flexible', description: 'No rush' }
      ]
    }
  ];

  const currentStepData = steps[currentStep];
  const progress = ((currentStep + 1) / steps.length) * 100;

  const handleNext = () => {
    const value = formData[currentStepData.field];
    
    // Validate current step
    if (currentStepData.validation && !currentStepData.validation(value)) {
      return;
    }
    
    if (!value) return;

    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete(formData);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleInputChange = (value) => {
    setFormData({ ...formData, [currentStepData.field]: value });
  };

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0
    })
  };

  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col">
      {/* Progress Bar */}
      <div className="h-1 bg-gray-200">
        <motion.div
          className="h-full bg-gradient-to-r from-blue-500 to-blue-600"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleBack}
          disabled={currentStep === 0}
          className="rounded-full"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <span className="text-sm font-medium text-gray-600">
          Step {currentStep + 1} of {steps.length}
        </span>
        <div className="w-10" /> {/* Spacer for centering */}
      </div>

      {/* Form Content */}
      <div className="flex-1 overflow-y-auto">
        <AnimatePresence mode="wait" custom={currentStep}>
          <motion.div
            key={currentStep}
            custom={currentStep}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="p-6"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {currentStepData.title}
            </h2>
            <p className="text-gray-600 mb-8">
              {currentStepData.subtitle}
            </p>

            {/* Input Field */}
            {currentStepData.type === 'input' && (
              <div className="space-y-4">
                <Input
                  type="text"
                  placeholder={currentStepData.placeholder}
                  value={formData[currentStepData.field] || ''}
                  onChange={(e) => handleInputChange(e.target.value.toUpperCase())}
                  className="h-14 text-lg text-center"
                  inputMode={currentStepData.inputMode}
                  autoFocus
                />
                {currentStepData.errorMessage && formData[currentStepData.field] && 
                 !currentStepData.validation(formData[currentStepData.field]) && (
                  <p className="text-red-500 text-sm text-center">
                    {currentStepData.errorMessage}
                  </p>
                )}
              </div>
            )}

            {/* Button Options */}
            {currentStepData.type === 'buttons' && (
              <div className="grid grid-cols-3 gap-3">
                {currentStepData.options.map((option) => (
                  <Button
                    key={option}
                    variant={formData[currentStepData.field] === option ? 'default' : 'outline'}
                    className="h-16 text-lg font-medium"
                    onClick={() => handleInputChange(option)}
                  >
                    {option}
                  </Button>
                ))}
              </div>
            )}

            {/* Card Options */}
            {currentStepData.type === 'cards' && (
              <div className="space-y-3">
                {currentStepData.options.map((option) => (
                  <motion.button
                    key={option.value}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleInputChange(option.value)}
                    className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                      formData[currentStepData.field] === option.value
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      {option.icon && (
                        <option.icon className={`h-6 w-6 ${
                          formData[currentStepData.field] === option.value
                            ? 'text-blue-600'
                            : 'text-gray-500'
                        }`} />
                      )}
                      <div className="flex-1">
                        <h3 className={`font-medium ${
                          formData[currentStepData.field] === option.value
                            ? 'text-blue-900'
                            : 'text-gray-900'
                        }`}>
                          {option.label}
                        </h3>
                        {option.description && (
                          <p className="text-sm text-gray-500 mt-1">
                            {option.description}
                          </p>
                        )}
                      </div>
                      {formData[currentStepData.field] === option.value && (
                        <Check className="h-5 w-5 text-blue-600" />
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200 bg-gray-50">
        <Button
          onClick={handleNext}
          disabled={!formData[currentStepData.field]}
          className="w-full h-12 text-base font-semibold bg-blue-600 hover:bg-blue-700"
        >
          {currentStep === steps.length - 1 ? (
            <>
              Get My Cash Offer
              <Check className="ml-2 h-5 w-5" />
            </>
          ) : (
            <>
              Continue
              <ArrowRight className="ml-2 h-5 w-5" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default MobileFormWizard;