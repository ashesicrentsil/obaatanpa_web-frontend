'use client'

import { useEffect } from 'react'
import AOS from 'aos'
import { Hospital, Calendar, Bell, UserCheck } from 'lucide-react'

const WhyBookSection = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      mirror: true,
      easing: 'ease-in-out',
    })
  }, [])

  const features = [
    {
      icon: <Hospital className="w-12 h-12 text-[#e67d82]" />,
      title: "🏥 Verified Hospitals",
      description: "We work with licensed maternity hospitals across Ghana."
    },
    {
      icon: <Calendar className="w-12 h-12 text-[#7da8e6]" />,
      title: "📅 Flexible Booking",
      description: "Book appointments at your convenience — antenatal, checkups, postnatal, and more."
    },
    {
      icon: <Bell className="w-12 h-12 text-[#e67d82]" />,
      title: "🔔 Automatic Reminders",
      description: "Never miss an appointment — receive SMS, app, or email alerts."
    },
    {
      icon: <UserCheck className="w-12 h-12 text-[#7da8e6]" />,
      title: "👩🏾‍⚕️ Trusted Health Professionals",
      description: "Meet registered midwives, OB-GYNs, and pediatricians."
    }
  ]

  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 font-poppins">
            Why Book Through Obaatanpa?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto font-lora">
            Experience the difference with our comprehensive maternal care platform
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="text-center p-6 rounded-2xl bg-gray-50 dark:bg-gray-800 hover:bg-gradient-to-br hover:from-pink-50 hover:to-blue-50 dark:hover:from-gray-700 dark:hover:to-gray-600 transition-all duration-300 hover:shadow-lg hover:-translate-y-2"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              {/* Icon */}
              <div className="flex justify-center mb-4">
                {feature.icon}
              </div>

              {/* Title */}
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 font-poppins">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed font-lora">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhyBookSection
