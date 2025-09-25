'use client'

import { useEffect, useState } from 'react'
import AOS from 'aos'
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react'

const HospitalFAQSection = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(0)

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      mirror: true,
      easing: 'ease-in-out',
    })
  }, [])

  const faqs = [
    {
      question: "How does Obaatanpa verify hospitals?",
      answer: "We work directly with the Ghana Health Service to verify all hospitals on our platform. Each facility must be licensed, meet our quality standards, and have qualified maternal healthcare professionals. We also conduct regular reviews and updates to ensure continued compliance."
    },
    {
      question: "Can I book for someone else?",
      answer: "Yes, you can book appointments for family members or friends. During the booking process, you'll be able to enter their details and specify that you're booking on their behalf. However, the patient will need to provide identification and consent at the hospital."
    },
    {
      question: "Are appointments free?",
      answer: "Creating an account and searching for hospitals is completely free. You only pay for the actual medical services provided by the hospital. Some hospitals may charge a small booking fee, which will be clearly displayed before you confirm your appointment."
    },
    {
      question: "Will I receive reminders?",
      answer: "Yes! Once you book an appointment, you'll automatically receive reminders via SMS, email, or push notifications. Reminders are sent 24 hours before and 2 hours before your appointment to ensure you never miss important healthcare visits."
    },
    {
      question: "What if I need to cancel or reschedule?",
      answer: "You can easily cancel or reschedule appointments through your Obaatanpa dashboard. We recommend doing so at least 24 hours in advance. Some hospitals may have specific cancellation policies, which will be shown when you book."
    },
    {
      question: "How accurate are the hospital reviews?",
      answer: "All reviews come from verified patients who have actually visited the hospitals through our platform. We have systems in place to detect and prevent fake reviews. Each review is also moderated to ensure it provides helpful, constructive feedback."
    },
    {
      question: "Can I see hospital availability in real-time?",
      answer: "Yes, our platform shows real-time availability for most partner hospitals. You can see available appointment slots and book immediately. For hospitals that don't offer real-time booking, we'll help coordinate your appointment and confirm the details."
    },
    {
      question: "What if there's an emergency?",
      answer: "For medical emergencies, please call 911 or go to your nearest emergency room immediately. Our platform is designed for scheduled appointments and routine care. However, we do provide emergency contact information for quick access to urgent care facilities."
    }
  ]

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index)
  }

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-700">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16" data-aos="fade-up">
          <div className="flex items-center justify-center mb-4">
            <HelpCircle className="w-8 h-8 text-[#e67d82] mr-3" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white font-poppins">
              Frequently Asked Questions
            </h2>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto font-lora">
            Get answers to common questions about finding and booking hospitals through Obaatanpa
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden hover:border-[#e67d82] transition-all duration-300 bg-white dark:bg-gray-800"
              data-aos="fade-up"
              data-aos-delay={index * 50}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-300"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white font-poppins pr-4">
                  {faq.question}
                </h3>
                <div className="flex-shrink-0">
                  {openFAQ === index ? (
                    <ChevronUp className="w-5 h-5 text-[#e67d82]" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                  )}
                </div>
              </button>
              
              {openFAQ === index && (
                <div className="px-6 pb-4">
                  <div className="pt-2 border-t border-gray-100 dark:border-gray-700">
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed font-lora">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact Support CTA */}
        <div className="text-center mt-12" data-aos="fade-up" data-aos-delay="400">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 font-poppins">
              Still have questions?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6 font-lora">
              Our support team is here to help you find the perfect hospital and book your appointments.
            </p>
            <button 
              onClick={() => alert("You need to be logged in to access this feature.")}
              className="inline-flex items-center justify-center px-6 py-3 text-base font-semibold bg-[#e67d82] text-white rounded-lg hover:bg-[#d66b70] transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HospitalFAQSection
