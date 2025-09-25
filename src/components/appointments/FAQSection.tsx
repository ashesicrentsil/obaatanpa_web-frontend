'use client'

import { useEffect, useState } from 'react'
import AOS from 'aos'
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react'

const FAQSection = () => {
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
      question: "Is Obaatanpa available in my region?",
      answer: "Obaatanpa currently serves major cities across Ghana including Accra, Kumasi, Tamale, Cape Coast, and Takoradi. We're continuously expanding to reach more communities. Check our hospital directory to see if we have partner facilities in your area."
    },
    {
      question: "Are the hospitals verified?",
      answer: "Yes, absolutely! All hospitals and healthcare facilities on our platform undergo a rigorous verification process. We ensure they are licensed, meet our quality standards, and have qualified maternal healthcare professionals. Your safety and quality of care are our top priorities."
    },
    {
      question: "What types of appointments can I book?",
      answer: "You can book various appointments including antenatal checkups, postnatal visits, pediatric assessments, lactation support sessions, mental health consultations, and nutrition counseling. We cover the full spectrum of maternal and child healthcare needs."
    },
    {
      question: "Is booking free?",
      answer: "Creating an account and booking appointments through Obaatanpa is completely free. You only pay for the actual medical services provided by the healthcare facility. We believe access to quality healthcare should be barrier-free."
    },
    {
      question: "How do appointment reminders work?",
      answer: "Once you book an appointment, you'll receive automatic reminders via SMS, email, or push notifications (if you have our app). Reminders are sent 24 hours before and 2 hours before your appointment to ensure you never miss important healthcare visits."
    },
    {
      question: "Can I reschedule or cancel appointments?",
      answer: "Yes, you can easily reschedule or cancel appointments through your dashboard. We recommend doing so at least 24 hours in advance to allow other mothers to book that slot. Some facilities may have specific cancellation policies."
    },
    {
      question: "What if I have an emergency?",
      answer: "For medical emergencies, please call 911 or go to your nearest emergency room immediately. Obaatanpa is designed for scheduled appointments and routine care. However, our platform includes emergency contact information for quick access to urgent care facilities."
    },
    {
      question: "Do you support multiple languages?",
      answer: "Currently, our platform is available in English and we're working on adding local Ghanaian languages including Twi, Ga, and Ewe. Our partner hospitals often have staff who speak local languages to ensure comfortable communication."
    }
  ]

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index)
  }

  return (
    <section className="py-16 bg-white dark:bg-gray-900">
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
            Get answers to common questions about booking appointments and using Obaatanpa
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
          <div className="bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 font-poppins">
              Still have questions?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6 font-lora">
              Our support team is here to help you with any concerns about booking appointments or using our platform.
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

export default FAQSection
