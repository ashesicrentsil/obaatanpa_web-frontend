'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import AOS from 'aos'

const HospitalsHero = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      mirror: true,
      easing: 'ease-in-out',
    })
  }, [])

  const handleLoginRedirect = () => {
    alert("You need to be logged in to access this feature.")
  }

  return (
    <section className="relative pt-40 pb-16 bg-gradient-to-br from-pink-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden">
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left" data-aos="fade-right" data-aos-duration="1000">
            {/* Trust Badge */}
            <div className="inline-flex items-center bg-white dark:bg-gray-800 rounded-full px-4 py-2 shadow-lg mb-6">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                🏥 Verified healthcare providers
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-secondary-500">
                Find Trusted Hospitals
              </span>
              <br />
              <span className="text-3xl md:text-4xl lg:text-5xl text-gray-700 dark:text-gray-300">
                Near You
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Search verified antenatal and postnatal care centers across Ghana. Find the perfect hospital for your maternal care needs.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
              <button
                onClick={handleLoginRedirect}
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-lg hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              >
                🔘 Login to Start Searching
              </button>

              <button
                onClick={handleLoginRedirect}
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold border-2 border-primary-500 text-primary-500 rounded-lg hover:bg-primary-500 hover:text-white transition-all duration-300"
              >
                Browse Hospitals
              </button>
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className="relative flex justify-center lg:justify-end mt-8" data-aos="fade-left" data-aos-duration="1000" data-aos-delay="200">
            <div className="relative">
              <Image
                src="/images/hospitals/modern-maternity-clinic-ghana.png"
                alt="Modern, clean maternity clinic with nurse attending to mother in Ghana"
                width={600}
                height={500}
                className="w-full h-auto max-w-md lg:max-w-xl rounded-3xl shadow-2xl object-cover"
                priority
              />
              {/* Gradient overlay on image for better integration */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-3xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HospitalsHero
