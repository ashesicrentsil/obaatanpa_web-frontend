'use client'

import { useEffect } from 'react'
import AOS from 'aos'
import { Shield, Calendar, MapPin, Star } from 'lucide-react'

const HospitalBenefitsSection = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      mirror: true,
      easing: 'ease-in-out',
    })
  }, [])

  const benefits = [
    {
      icon: <Shield className="w-12 h-12 text-[#e67d82]" />,
      title: "✅ Verified Facilities",
      description: "Only hospitals registered and approved by the Ghana Health Service."
    },
    {
      icon: <Calendar className="w-12 h-12 text-[#7da8e6]" />,
      title: "✅ Easy Booking",
      description: "Book antenatal, postnatal, and checkup appointments online."
    },
    {
      icon: <MapPin className="w-12 h-12 text-[#e67d82]" />,
      title: "✅ Based on Location",
      description: "Auto-detects your region to show nearby care centers."
    },
    {
      icon: <Star className="w-12 h-12 text-[#7da8e6]" />,
      title: "✅ Ratings & Reviews",
      description: "See what other mothers say about their experience."
    }
  ]

  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 font-poppins">
            Benefits of Using Obaatanpa's Hospital Finder
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto font-lora">
            Why thousands of Ghanaian mothers trust our platform to find quality healthcare
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="text-center p-6 rounded-2xl bg-gray-50 dark:bg-gray-800 hover:bg-gradient-to-br hover:from-pink-50 hover:to-blue-50 dark:hover:from-gray-700 dark:hover:to-gray-600 transition-all duration-300 hover:shadow-lg hover:-translate-y-2"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              {/* Icon */}
              <div className="flex justify-center mb-4">
                {benefit.icon}
              </div>

              {/* Title */}
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 font-poppins">
                {benefit.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed font-lora">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom Stats */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8" data-aos="fade-up" data-aos-delay="600">
          <div className="text-center">
            <div className="text-3xl font-bold text-[#e67d82] mb-2">50+</div>
            <div className="text-gray-600 dark:text-gray-300 font-lora">Verified Hospitals</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-[#7da8e6] mb-2">1000+</div>
            <div className="text-gray-600 dark:text-gray-300 font-lora">Happy Mothers</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-[#e67d82] mb-2">24/7</div>
            <div className="text-gray-600 dark:text-gray-300 font-lora">Support Available</div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12" data-aos="fade-up" data-aos-delay="800">
          <button 
            onClick={() => alert("You need to be logged in to access this feature.")}
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold bg-gradient-to-r from-[#e67d82] to-[#7da8e6] text-white rounded-lg hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
          >
            Start Finding Hospitals
          </button>
        </div>
      </div>
    </section>
  )
}

export default HospitalBenefitsSection
