'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import AOS from 'aos'

const DownloadAppSection = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      mirror: true,
      easing: 'ease-in-out',
    })
  }, [])

  return (
    <section className="py-20 bg-gradient-to-br from-pink-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-visible">
      <div className="max-w-[100vw] mx-auto px-4 sm:px-6 lg:px-12 overflow-visible">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-4 items-center overflow-visible">
          {/* Left Content */}
          <div className="text-center lg:text-left" data-aos="fade-right" data-aos-duration="1000">
            <div className="inline-flex items-center bg-white dark:bg-gray-800 rounded-full pl-4 py-2 shadow-lg mb-6">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                📱 Download Now
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-secondary-500">
                Take charge of your
              </span>
              <br />
              <span className="text-3xl md:text-4xl lg:text-5xl text-gray-700 dark:text-gray-300">
                maternal health journey
              </span>
            </h2>

            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Download Obaatanpa now and get personalized care, expert guidance, and community support right in your pocket.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
              <button className="inline-flex items-center justify-center px-6 py-3 bg-black text-white rounded-xl hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                    </svg>
                  </div>
                  <div className="text-left">
                    <div className="text-xs text-gray-300">Download on the</div>
                    <div className="text-lg font-semibold">App Store</div>
                  </div>
                </div>
              </button>

              <button className="inline-flex items-center justify-center px-6 py-3 bg-black text-white rounded-xl hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                      <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                    </svg>
                  </div>
                  <div className="text-left">
                    <div className="text-xs text-gray-300">Get it on</div>
                    <div className="text-lg font-semibold">Google Play</div>
                  </div>
                </div>
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>24/7 Expert Support</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Personalized Care</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span>Community Support</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                <span>Hospital Finder</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span>Nutrition Plans</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span>Appointment Booking</span>
              </div>
            </div>
          </div>

          {/* Right Content - Phones */}
          <div
            className="w-full relative flex justify-center lg:justify-end items-end px-4 lg:px-0 py-16 overflow-visible"
            data-aos="fade-left"
            data-aos-duration="1000"
            data-aos-delay="200"
          >
            <div className="flex justify-center items-end space-x-8 overflow-visible -mr-12">
              <div className="relative transform rotate-12 hover:rotate-6 transition-transform duration-500">
                <Image
                  src="/images/app-mockups/phone-1-welcome.png"
                  alt="Obaatanpa App Welcome Screen"
                  width={200}
                  height={400}
                  className="w-48 h-96 rounded-3xl shadow-2xl object-cover"
                  priority
                />
              </div>

              <div className="relative z-10 transform hover:scale-105 transition-transform duration-500">
                <Image
                  src="/images/app-mockups/phone-2-dashboard.png"
                  alt="Obaatanpa App Dashboard"
                  width={240}
                  height={480}
                  className="w-56 h-auto rounded-3xl shadow-2xl object-cover"
                  style={{ height: '28rem' }}
                  priority
                />
              </div>

              <div className="relative transform -rotate-12 hover:-rotate-6 transition-transform duration-500">
                <Image
                  src="/images/app-mockups/phone-3-community.png"
                  alt="Obaatanpa App Community Chat"
                  width={200}
                  height={400}
                  className="w-48 h-96 rounded-3xl shadow-2xl object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default DownloadAppSection
