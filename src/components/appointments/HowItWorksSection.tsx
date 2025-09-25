'use client'

import { useEffect } from 'react'
import AOS from 'aos'
import { UserPlus, MapPin, Calendar, CheckCircle } from 'lucide-react'

const HowItWorksSection = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      mirror: true,
      easing: 'ease-in-out',
    })
  }, [])

  const steps = [
    {
      number: "1️⃣",
      icon: <UserPlus className="w-8 h-8 text-white" />,
      title: "Sign up as a pregnant or new mother",
      description: "Create your account and tell us about your pregnancy journey"
    },
    {
      number: "2️⃣",
      icon: <MapPin className="w-8 h-8 text-white" />,
      title: "Select a nearby verified hospital",
      description: "Choose from our network of trusted healthcare facilities"
    },
    {
      number: "3️⃣",
      icon: <Calendar className="w-8 h-8 text-white" />,
      title: "Choose appointment type and date",
      description: "Pick the service you need and your preferred time slot"
    },
    {
      number: "4️⃣",
      icon: <CheckCircle className="w-8 h-8 text-white" />,
      title: "Get confirmation + reminders",
      description: "Receive instant confirmation and helpful appointment reminders"
    }
  ]

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 font-poppins">
            How It Works
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto font-lora">
            Getting the care you need is simple with our 4-step process
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative text-center"
              data-aos="fade-up"
              data-aos-delay={index * 150}
            >
              {/* Step Number Circle */}
              <div className="relative mb-6">
                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-[#e67d82] to-[#7da8e6] rounded-full flex items-center justify-center shadow-lg">
                  {step.icon}
                </div>
                {/* Step Number Badge */}
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md">
                  <span className="text-lg font-bold text-[#e67d82]">
                    {step.number}
                  </span>
                </div>
              </div>

              {/* Step Content */}
              <div className="space-y-3">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white font-poppins">
                  {step.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed font-lora">
                  {step.description}
                </p>
              </div>

              {/* Connector Arrow (except for last item) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 -right-4 transform translate-x-full">
                  <div className="w-8 h-0.5 bg-gradient-to-r from-[#e67d82] to-[#7da8e6]"></div>
                  <div className="absolute -right-1 -top-1 w-2 h-2 bg-[#7da8e6] rounded-full"></div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12" data-aos="fade-up" data-aos-delay="600">
          <button 
            onClick={() => alert("You need to be logged in to access this feature.")}
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold bg-gradient-to-r from-[#e67d82] to-[#7da8e6] text-white rounded-lg hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
          >
            Start Your Journey Today
          </button>
        </div>
      </div>
    </section>
  )
}

export default HowItWorksSection
