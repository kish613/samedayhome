import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, FileText, Mail, Phone, MapPin, Clock } from 'lucide-react';

const PrivacyPolicy = () => {
  const sections = [
    {
      title: "1. Information We Collect",
      icon: <FileText className="w-6 h-6" />,
      content: [
        {
          subtitle: "Personal Information",
          items: [
            "Name and contact details (email address, phone number)",
            "Property address and details",
            "Financial information related to property transactions",
            "Identification documents for legal compliance"
          ]
        },
        {
          subtitle: "Automatically Collected Information",
          items: [
            "IP address and device information",
            "Browser type and version",
            "Pages visited and time spent on our website",
            "Referral source"
          ]
        }
      ]
    },
    {
      title: "2. How We Use Your Information",
      icon: <Eye className="w-6 h-6" />,
      content: [
        {
          subtitle: "We use your information to:",
          items: [
            "Process your property sale inquiry and provide valuations",
            "Communicate with you about your property sale",
            "Complete legal and financial transactions",
            "Comply with legal and regulatory requirements",
            "Improve our services and website functionality",
            "Send relevant property market updates (with your consent)"
          ]
        }
      ]
    },
    {
      title: "3. Data Security",
      icon: <Lock className="w-6 h-6" />,
      content: [
        {
          subtitle: "We protect your data through:",
          items: [
            "SSL encryption for all data transmissions",
            "Secure servers with restricted access",
            "Regular security audits and updates",
            "Staff training on data protection",
            "Compliance with GDPR and UK data protection laws"
          ]
        }
      ]
    },
    {
      title: "4. Data Sharing",
      icon: <Shield className="w-6 h-6" />,
      content: [
        {
          subtitle: "We may share your information with:",
          items: [
            "Legal professionals (solicitors, conveyancers) involved in your property transaction",
            "Regulated financial institutions for payment processing",
            "Government agencies as required by law",
            "Service providers who assist in our operations (under strict confidentiality agreements)"
          ]
        },
        {
          subtitle: "We never:",
          items: [
            "Sell your personal data to third parties",
            "Share your information for marketing purposes without consent",
            "Transfer data outside the UK without adequate protection"
          ]
        }
      ]
    },
    {
      title: "5. Your Rights",
      icon: <Shield className="w-6 h-6" />,
      content: [
        {
          subtitle: "Under GDPR, you have the right to:",
          items: [
            "Access your personal data",
            "Correct inaccurate information",
            "Request deletion of your data",
            "Object to data processing",
            "Data portability",
            "Withdraw consent at any time"
          ]
        }
      ]
    },
    {
      title: "6. Data Retention",
      icon: <Clock className="w-6 h-6" />,
      content: [
        {
          subtitle: "We retain your data:",
          items: [
            "For active transactions: Duration of the property sale plus 6 years",
            "For inquiries: 12 months if no transaction proceeds",
            "For legal compliance: As required by law (typically 6-7 years)",
            "Marketing communications: Until you unsubscribe"
          ]
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Your privacy is important to us. This policy explains how Same Day Home Buyer collects, uses, and protects your personal information.
            </p>
            <p className="text-sm text-blue-200 mt-4">Last updated: January 2025</p>
          </motion.div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-blue-50 rounded-lg p-8 mb-12"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Commitment to Your Privacy</h2>
            <p className="text-gray-700 leading-relaxed">
              Same Day Home Buyer ("we", "our", or "us") is committed to protecting your privacy and ensuring your personal data is handled safely and responsibly. 
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our property buying services.
            </p>
            <p className="text-gray-700 leading-relaxed mt-4">
              We comply with the UK General Data Protection Regulation (UK GDPR) and the Data Protection Act 2018. 
              Our company registration number is [Company Number] and our registered address is London, United Kingdom.
            </p>
          </motion.div>

          {/* Policy Sections */}
          {sections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 + index * 0.1 }}
              className="mb-12"
            >
              <div className="flex items-center mb-6">
                <div className="bg-blue-900 text-white p-3 rounded-lg mr-4">
                  {section.icon}
                </div>
                <h2 className="text-2xl font-bold text-gray-900">{section.title}</h2>
              </div>
              
              {section.content.map((subsection, subIndex) => (
                <div key={subIndex} className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">{subsection.subtitle}</h3>
                  <ul className="space-y-2">
                    {subsection.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start">
                        <span className="text-blue-600 mr-2 mt-1">•</span>
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </motion.div>
          ))}

          {/* Cookies Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">7. Cookies and Tracking</h2>
            <p className="text-gray-700 mb-4">
              We use cookies and similar tracking technologies to enhance your experience on our website. These include:
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-start">
                <span className="text-blue-600 mr-2 mt-1">•</span>
                <span className="text-gray-700"><strong>Essential Cookies:</strong> Required for website functionality</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2 mt-1">•</span>
                <span className="text-gray-700"><strong>Analytics Cookies:</strong> Help us understand how visitors use our site</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2 mt-1">•</span>
                <span className="text-gray-700"><strong>Marketing Cookies:</strong> Used to deliver relevant advertisements (only with your consent)</span>
              </li>
            </ul>
            <p className="text-gray-700">
              You can manage your cookie preferences through your browser settings or by clicking "Cookie Settings" in our website footer.
            </p>
          </motion.div>

          {/* Contact Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="bg-gray-100 rounded-lg p-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Our Data Protection Team</h2>
            <p className="text-gray-700 mb-6">
              If you have any questions about this Privacy Policy or wish to exercise your data protection rights, please contact us:
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center">
                <Mail className="w-5 h-5 text-blue-600 mr-3" />
                <span className="text-gray-700">privacy@samedayhomebuyer.co.uk</span>
              </div>
              <div className="flex items-center">
                <Phone className="w-5 h-5 text-blue-600 mr-3" />
                <span className="text-gray-700">0330 043 7570</span>
              </div>
              <div className="flex items-center">
                <MapPin className="w-5 h-5 text-blue-600 mr-3" />
                <span className="text-gray-700">Same Day Home Buyer, London, United Kingdom</span>
              </div>
            </div>

            <div className="mt-8 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-gray-700">
                <strong>Supervisory Authority:</strong> You have the right to lodge a complaint with the Information Commissioner's Office (ICO) if you believe we have not handled your personal data appropriately. 
                Visit <span className="text-blue-600">ico.org.uk</span> for more information.
              </p>
            </div>
          </motion.div>

          {/* Updates Notice */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-12 text-center"
          >
            <p className="text-gray-600 text-sm">
              We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date. 
              We encourage you to review this Privacy Policy periodically.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;