'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp, HelpCircle, Calendar, Shield, Users, Apple } from 'lucide-react'

const ContactFAQs = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)

  const faqs = [
    {
      icon: Calendar,
      question: "How do I book a hospital appointment?",
      answer: "You can book appointments through our Appointments page. Simply select your preferred hospital, choose an available time slot, and fill in your details. You'll receive a confirmation email and SMS reminder before your appointment.",
      color: "from-[#F59297] to-pink-600"
    },
    {
      icon: Apple,
      question: "Can I trust your nutritional plans?",
      answer: "Absolutely! All our nutritional plans are created and reviewed by certified nutritionists and healthcare professionals. They're specifically designed for Ghanaian mothers, incorporating local foods and cultural dietary practices.",
      color: "from-green-500 to-green-600"
    },
    {
      icon: Shield,
      question: "Is my health data private?",
      answer: "Yes, your privacy is our top priority. We use industry-standard encryption to protect your data and never share your personal health information with third parties without your explicit consent. Read our Privacy Policy for full details.",
      color: "from-[#7da8e6] to-blue-600"
    },
    {
      icon: Users,
      question: "How can I speak to a midwife?",
      answer: "You can connect with our certified midwives through the Expert Chat feature in the app, schedule a video consultation, or contact us directly. Our midwives are available Monday through Saturday to answer your questions and provide guidance.",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: HelpCircle,
      question: "What if I have a technical issue with the app?",
      answer: "For technical issues, please use the contact form above and select 'Technical Issue' as the subject. Include details about the problem and your device type. Our technical team typically responds within 24 hours with a solution.",
      color: "from-orange-500 to-orange-600"
    }
  ]

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index)
  }

  return (
    <section className="py-16 bg-white dark:bg-gray-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Quick answers to common questions. Can't find what you're looking for? 
            Use the contact form above to reach out to us directly.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-gray-50 dark:bg-gray-700 rounded-2xl border border-gray-200 dark:border-gray-600 overflow-hidden"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200"
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-10 h-10 bg-gradient-to-br ${faq.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                    <faq.icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {faq.question}
                  </h3>
                </div>
                {openFAQ === index ? (
                  <ChevronUp className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                )}
              </button>
              
              {openFAQ === index && (
                <div className="px-6 pb-4">
                  <div className="pl-14">
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Still Have Questions CTA */}
        <div className="text-center mt-12" data-aos="fade-up" data-aos-delay="500">
          <div className="bg-gradient-to-r from-[#F59297]/10 to-[#7da8e6]/10 dark:from-pink-900/20 dark:to-blue-900/20 rounded-2xl p-8">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Still Have Questions?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Our support team is here to help. Don't hesitate to reach out with any questions or concerns.
            </p>
            <button className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#F59297] to-[#7da8e6] text-white font-semibold rounded-xl hover:from-[#e67d82] hover:to-[#6b9ce6] transition-all duration-300 shadow-lg hover:shadow-xl">
              <HelpCircle className="w-5 h-5 mr-2" />
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactFAQs
