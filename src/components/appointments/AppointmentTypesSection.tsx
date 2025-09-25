'use client'

import { useEffect } from 'react'
import AOS from 'aos'
import { Heart, Baby, Stethoscope, Milk, Brain, Apple } from 'lucide-react'

const AppointmentTypesSection = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      mirror: true,
      easing: 'ease-in-out',
    })
  }, [])

  const appointmentTypes = [
    {
      icon: <Heart className="w-8 h-8 text-[#e67d82]" />,
      title: "Antenatal Checkups",
      description: "Regular pregnancy monitoring and prenatal care visits"
    },
    {
      icon: <Baby className="w-8 h-8 text-[#7da8e6]" />,
      title: "Postnatal Visits",
      description: "Post-delivery care for mother and baby health monitoring"
    },
    {
      icon: <Stethoscope className="w-8 h-8 text-[#e67d82]" />,
      title: "Pediatric Assessments",
      description: "Comprehensive health evaluations for your growing baby"
    },
    {
      icon: <Milk className="w-8 h-8 text-[#7da8e6]" />,
      title: "Lactation Support",
      description: "Expert guidance for breastfeeding and nursing challenges"
    },
    {
      icon: <Brain className="w-8 h-8 text-[#e67d82]" />,
      title: "Mental Health Sessions",
      description: "Emotional support and counseling for maternal wellbeing"
    },
    {
      icon: <Apple className="w-8 h-8 text-[#7da8e6]" />,
      title: "Nutrition Consultations",
      description: "Personalized dietary guidance for healthy pregnancy and recovery"
    }
  ]

  const handleBookAppointment = () => {
    alert("You need to be logged in to access this feature.")
  }

  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 font-poppins">
            Appointment Types Offered
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto font-lora">
            Comprehensive healthcare services tailored to your maternal journey
          </p>
        </div>

        {/* Appointment Types Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {appointmentTypes.map((type, index) => (
            <div
              key={index}
              className="group p-6 rounded-2xl border border-gray-200 dark:border-gray-700 hover:border-[#e67d82] bg-white dark:bg-gray-800 hover:bg-gradient-to-br hover:from-pink-50 hover:to-blue-50 dark:hover:from-gray-700 dark:hover:to-gray-600 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 cursor-pointer"
              data-aos="fade-up"
              data-aos-delay={index * 100}
              onClick={handleBookAppointment}
            >
              {/* Icon */}
              <div className="flex items-center justify-center w-16 h-16 bg-gray-100 dark:bg-gray-700 group-hover:bg-white dark:group-hover:bg-gray-600 rounded-2xl mb-4 transition-all duration-300">
                {type.icon}
              </div>

              {/* Title */}
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 font-poppins group-hover:text-[#e67d82] transition-colors duration-300">
                {type.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed font-lora mb-4">
                {type.description}
              </p>

              {/* Book Button */}
              <button 
                className="w-full py-2 px-4 text-sm font-medium text-[#e67d82] border border-[#e67d82] rounded-lg hover:bg-[#e67d82] hover:text-white transition-all duration-300 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0"
                onClick={(e) => {
                  e.stopPropagation()
                  handleBookAppointment()
                }}
              >
                Book Now
              </button>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12" data-aos="fade-up" data-aos-delay="600">
          <div className="bg-gradient-to-r from-[#e67d82] to-[#7da8e6] rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4 font-poppins">
              Can't find what you're looking for?
            </h3>
            <p className="text-lg mb-6 font-lora opacity-90">
              Contact our support team for specialized appointment types
            </p>
            <button 
              onClick={handleBookAppointment}
              className="inline-flex items-center justify-center px-8 py-3 text-lg font-semibold bg-white text-[#e67d82] rounded-lg hover:bg-gray-100 transition-all duration-300 shadow-lg"
            >
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AppointmentTypesSection
