'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import AOS from 'aos'
import { ChevronLeft, ChevronRight, Star, MapPin, Clock, Phone, Lock } from 'lucide-react'

const SampleHospitalsSection = () => {
  const [currentHospital, setCurrentHospital] = useState(0)

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      mirror: true,
      easing: 'ease-in-out',
    })
  }, [])

  const sampleHospitals = [
    {
      name: "Mercy Women's Hospital",
      location: "Accra",
      region: "Greater Accra",
      image: "/images/hospitals/mercy-womens-hospital.jpg",
      rating: 4.5,
      reviewCount: 43,
      services: ["Antenatal", "Postnatal", "Baby Weighing", "24/7"],
      tags: ["Antenatal", "24/7", "Ultrasound"],
      distance: "2.3 km away",
      phone: "+233 20 123 4567",
      description: "Leading maternity hospital with modern facilities and experienced staff."
    },
    {
      name: "Ridge Hospital Maternity Wing",
      location: "Accra",
      region: "Greater Accra", 
      image: "/images/hospitals/ridge-hospital.jpg",
      rating: 4.8,
      reviewCount: 67,
      services: ["Antenatal", "Emergency", "NICU", "Laboratory"],
      tags: ["Emergency", "NICU", "Laboratory"],
      distance: "1.8 km away",
      phone: "+233 30 987 6543",
      description: "Government hospital with comprehensive maternity and newborn care services."
    },
    {
      name: "Tema General Hospital",
      location: "Tema",
      region: "Greater Accra",
      image: "/images/hospitals/tema-general.jpg", 
      rating: 4.2,
      reviewCount: 29,
      services: ["Antenatal", "Postnatal", "Pharmacy", "Ultrasound"],
      tags: ["Antenatal", "Pharmacy", "Ultrasound"],
      distance: "5.1 km away",
      phone: "+233 24 555 7890",
      description: "Well-equipped hospital serving the Tema community with quality maternal care."
    }
  ]

  const nextHospital = () => {
    setCurrentHospital((prev) => (prev + 1) % sampleHospitals.length)
  }

  const prevHospital = () => {
    setCurrentHospital((prev) => (prev - 1 + sampleHospitals.length) % sampleHospitals.length)
  }

  const handleLoginRedirect = () => {
    alert("You need to be logged in to access this feature.")
  }

  // Auto-rotate hospitals
  useEffect(() => {
    const interval = setInterval(nextHospital, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 font-poppins">
            Sample Hospitals Near You
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto font-lora">
            Preview of verified maternity hospitals in our network
          </p>
        </div>

        {/* Hospital Carousel */}
        <div className="relative max-w-5xl mx-auto" data-aos="fade-up" data-aos-delay="200">
          <div className="bg-gradient-to-br from-pink-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 rounded-3xl shadow-2xl p-8 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#e67d82]/10 to-[#7da8e6]/10 rounded-full -translate-y-16 translate-x-16"></div>
            
            {/* Current Hospital */}
            <div className="relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                {/* Hospital Image */}
                <div className="relative">
                  <Image
                    src={sampleHospitals[currentHospital].image}
                    alt={sampleHospitals[currentHospital].name}
                    width={500}
                    height={300}
                    className="w-full h-64 object-cover rounded-2xl shadow-lg"
                  />
                  
                  {/* Distance Badge */}
                  <div className="absolute top-4 left-4 bg-white dark:bg-gray-800 px-3 py-1 rounded-full text-sm font-semibold text-gray-700 dark:text-gray-300 shadow-lg">
                    📍 {sampleHospitals[currentHospital].distance}
                  </div>

                  {/* Blur Overlay */}
                  <div className="absolute inset-0 bg-white/30 dark:bg-gray-900/30 backdrop-blur-[2px] rounded-2xl flex items-center justify-center">
                    <div className="text-center">
                      <Lock className="w-12 h-12 text-gray-600 dark:text-gray-400 mx-auto mb-2" />
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Login to view full details</p>
                    </div>
                  </div>
                </div>

                {/* Hospital Details */}
                <div>
                  {/* Hospital Name & Location */}
                  <div className="mb-4">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 font-poppins">
                      🏥 {sampleHospitals[currentHospital].name}
                    </h3>
                    <div className="flex items-center text-gray-600 dark:text-gray-300 mb-2">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span>{sampleHospitals[currentHospital].location}, {sampleHospitals[currentHospital].region}</span>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center mb-4">
                    <div className="flex items-center mr-4">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-5 h-5 ${
                            i < Math.floor(sampleHospitals[currentHospital].rating) 
                              ? 'text-yellow-400 fill-current' 
                              : 'text-gray-300 dark:text-gray-600'
                          }`} 
                        />
                      ))}
                    </div>
                    <span className="text-lg font-semibold text-gray-900 dark:text-white">
                      {sampleHospitals[currentHospital].rating}
                    </span>
                    <span className="text-gray-600 dark:text-gray-300 ml-2">
                      ({sampleHospitals[currentHospital].reviewCount} Reviews)
                    </span>
                  </div>

                  {/* Services Tags */}
                  <div className="mb-4">
                    <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Services:</p>
                    <div className="flex flex-wrap gap-2">
                      {sampleHospitals[currentHospital].tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-gradient-to-r from-[#e67d82]/20 to-[#7da8e6]/20 text-[#e67d82] dark:text-[#e67d82] rounded-full text-sm font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 dark:text-gray-300 mb-6 font-lora">
                    {sampleHospitals[currentHospital].description}
                  </p>

                  {/* Action Button */}
                  <button
                    onClick={handleLoginRedirect}
                    className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-[#e67d82] to-[#7da8e6] text-white rounded-lg hover:shadow-lg transition-all duration-300 font-semibold"
                  >
                    <Lock className="w-4 h-4 mr-2" />
                    🔒 Login to Book
                  </button>
                </div>
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevHospital}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white dark:bg-gray-700 rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-600 transition-all duration-300 hover:scale-110"
            >
              <ChevronLeft className="w-6 h-6 text-gray-600 dark:text-gray-300" />
            </button>
            <button
              onClick={nextHospital}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white dark:bg-gray-700 rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-600 transition-all duration-300 hover:scale-110"
            >
              <ChevronRight className="w-6 h-6 text-gray-600 dark:text-gray-300" />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {sampleHospitals.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentHospital(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentHospital
                    ? 'bg-[#e67d82] scale-125'
                    : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12" data-aos="fade-up" data-aos-delay="400">
          <div className="bg-gradient-to-r from-[#e67d82]/10 to-[#7da8e6]/10 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 font-poppins">
              🔒 Login to view more hospitals
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6 font-lora">
              Access our complete directory of verified hospitals with detailed information, reviews, and booking options.
            </p>
            <button 
              onClick={handleLoginRedirect}
              className="inline-flex items-center justify-center px-8 py-3 text-lg font-semibold bg-gradient-to-r from-[#e67d82] to-[#7da8e6] text-white rounded-lg hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
            >
              View All Hospitals
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SampleHospitalsSection
