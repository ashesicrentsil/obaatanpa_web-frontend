'use client'

import { useState } from 'react'
import { MapPin, Navigation, Search } from 'lucide-react'

const LocationSearch = () => {
  const [location, setLocation] = useState('')
  const [isDetecting, setIsDetecting] = useState(false)

  const handleUseLocation = () => {
    setIsDetecting(true)
    // Simulate GPS detection
    setTimeout(() => {
      setLocation('Accra, Greater Accra Region')
      setIsDetecting(false)
    }, 2000)
  }

  const popularLocations = [
    'Accra, Greater Accra',
    'Kumasi, Ashanti Region',
    'Cape Coast, Central Region',
    'Tamale, Northern Region',
    'Takoradi, Western Region',
    'Ho, Volta Region'
  ]

  return (
    <section className="py-16 bg-white dark:bg-gray-800 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12" data-aos="fade-up">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            📍 Where are you located?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Help us find the best hospitals and clinics near you
          </p>
        </div>

        {/* Location Input Section */}
        <div className="space-y-6" data-aos="fade-up" data-aos-delay="200">
          {/* GPS Location Button */}
          <div className="text-center">
            <button
              onClick={handleUseLocation}
              disabled={isDetecting}
              className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-[#F59297] to-[#7da8e6] text-white rounded-xl font-semibold hover:from-[#e67d82] hover:to-[#6b96d9] transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50"
            >
              {isDetecting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                  Detecting Location...
                </>
              ) : (
                <>
                  <Navigation className="w-5 h-5 mr-3" />
                  Use My Current Location
                </>
              )}
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center justify-center">
            <div className="border-t border-gray-200 dark:border-gray-600 flex-1"></div>
            <span className="px-4 text-sm text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800">or</span>
            <div className="border-t border-gray-200 dark:border-gray-600 flex-1"></div>
          </div>

          {/* Manual Location Input */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter your town or city (e.g. Accra, Kumasi, Cape Coast)"
              className="w-full pl-12 pr-4 py-4 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-[#F59297] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 text-lg"
            />
          </div>

          {/* Popular Locations */}
          <div>
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Popular locations:
            </p>
            <div className="flex flex-wrap gap-2">
              {popularLocations.map((loc) => (
                <button
                  key={loc}
                  onClick={() => setLocation(loc)}
                  className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm hover:bg-[#F59297] hover:text-white transition-colors duration-200"
                >
                  <MapPin className="w-3 h-3 inline mr-1" />
                  {loc}
                </button>
              ))}
            </div>
          </div>

          {/* Search Button */}
          {location && (
            <div className="text-center" data-aos="fade-up" data-aos-delay="300">
              <button className="inline-flex items-center justify-center px-8 py-3 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-lg font-semibold hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors duration-200">
                🔍 Search Hospitals in {location.split(',')[0]}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default LocationSearch
