'use client'

import { useEffect, useState } from 'react'
import AOS from 'aos'
import { Search, MapPin, Filter, Lock, X } from 'lucide-react'

const PreviewSearchSection = () => {
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      mirror: true,
      easing: 'ease-in-out',
    })
  }, [])

  const handleSearchClick = () => {
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
  }

  const searchFilters = [
    "Antenatal Care",
    "Postnatal Care", 
    "24/7 Emergency",
    "Ultrasound",
    "Laboratory",
    "Pharmacy"
  ]

  return (
    <>
      <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-12" data-aos="fade-up">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 font-poppins">
              Find Your Perfect Hospital
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto font-lora">
              Search by location, specialty, or services to find the best maternity care near you
            </p>
          </div>

          {/* Mock Search Interface */}
          <div className="max-w-4xl mx-auto" data-aos="fade-up" data-aos-delay="200">
            {/* Search Bar */}
            <div className="relative mb-8">
              <div 
                onClick={handleSearchClick}
                className="flex items-center w-full p-4 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border-2 border-gray-200 dark:border-gray-700 hover:border-[#e67d82] transition-all duration-300 cursor-pointer group"
              >
                <MapPin className="w-6 h-6 text-gray-400 mr-3 group-hover:text-[#e67d82] transition-colors duration-300" />
                <input
                  type="text"
                  placeholder="📍 Search for hospitals by location or specialty..."
                  className="flex-1 text-lg text-gray-500 dark:text-gray-400 bg-transparent border-none outline-none cursor-pointer"
                  readOnly
                />
                <Search className="w-6 h-6 text-gray-400 ml-3 group-hover:text-[#e67d82] transition-colors duration-300" />
              </div>
            </div>

            {/* Filter Tags */}
            <div className="flex flex-wrap gap-3 justify-center mb-8">
              {searchFilters.map((filter, index) => (
                <button
                  key={index}
                  onClick={handleSearchClick}
                  className="inline-flex items-center px-4 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full border border-gray-200 dark:border-gray-700 hover:border-[#e67d82] hover:text-[#e67d82] transition-all duration-300 cursor-pointer"
                  data-aos="fade-up"
                  data-aos-delay={index * 50}
                >
                  <Filter className="w-4 h-4 mr-2" />
                  {filter}
                </button>
              ))}
            </div>

            {/* Search Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleSearchClick}
                className="inline-flex items-center justify-center px-8 py-3 text-lg font-semibold bg-gradient-to-r from-[#e67d82] to-[#7da8e6] text-white rounded-lg hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              >
                <Search className="w-5 h-5 mr-2" />
                Search Hospitals
              </button>
              
              <button
                onClick={handleSearchClick}
                className="inline-flex items-center justify-center px-8 py-3 text-lg font-semibold border-2 border-[#e67d82] text-[#e67d82] dark:text-[#e67d82] rounded-lg hover:bg-[#e67d82] hover:text-white transition-all duration-300"
              >
                <MapPin className="w-5 h-5 mr-2" />
                View on Map
              </button>
            </div>

            {/* Info Banner */}
            <div className="mt-8 bg-blue-50 dark:bg-gray-800 border border-blue-200 dark:border-gray-700 rounded-2xl p-6 text-center" data-aos="fade-up" data-aos-delay="400">
              <div className="flex items-center justify-center mb-3">
                <Lock className="w-6 h-6 text-blue-600 dark:text-blue-400 mr-2" />
                <span className="text-lg font-semibold text-blue-800 dark:text-blue-300">
                  🔒 This content is only available to registered Obaatanpa users.
                </span>
              </div>
              <p className="text-blue-700 dark:text-blue-300 font-lora">
                Sign up or log in to access our full hospital directory and booking features
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Login Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 max-w-md w-full relative shadow-2xl">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-300"
            >
              <X className="w-4 h-4 text-gray-600 dark:text-gray-300" />
            </button>

            {/* Modal Content */}
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-[#e67d82] to-[#7da8e6] rounded-full flex items-center justify-center mx-auto mb-6">
                <Lock className="w-8 h-8 text-white" />
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 font-poppins">
                🔒 Please login to find and book a hospital near you.
              </h3>
              
              <p className="text-gray-600 dark:text-gray-300 mb-8 font-lora">
                This feature is available to registered users. Please log in or sign up to continue.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={closeModal}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-[#e67d82] to-[#7da8e6] text-white rounded-lg hover:shadow-lg transition-all duration-300 font-semibold"
                >
                  Login
                </button>
                <button
                  onClick={closeModal}
                  className="flex-1 px-6 py-3 border-2 border-[#e67d82] text-[#e67d82] rounded-lg hover:bg-[#e67d82] hover:text-white transition-all duration-300 font-semibold"
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default PreviewSearchSection
