'use client'

import { useState } from 'react'
import { Map, List, MapPin, Star, Phone } from 'lucide-react'

const MapView = () => {
  const [showMap, setShowMap] = useState(false)

  const hospitals = [
    { id: 1, name: 'Ridge Hospital', lat: 5.5502, lng: -0.2174, rating: 4.5, distance: '2.3 km' },
    { id: 2, name: 'Korle-Bu Teaching Hospital', lat: 5.5398, lng: -0.2318, rating: 4.3, distance: '4.1 km' },
    { id: 3, name: 'Trust Hospital', lat: 5.5731, lng: -0.1969, rating: 4.7, distance: '3.7 km' },
    { id: 4, name: 'Nyaho Medical Centre', lat: 5.6037, lng: -0.1870, rating: 4.6, distance: '5.2 km' }
  ]

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8" data-aos="fade-up">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            🗺️ Map View
          </h2>
          
          {/* View Toggle */}
          <div className="flex items-center bg-white dark:bg-gray-800 rounded-lg p-1 border border-gray-200 dark:border-gray-600">
            <button
              onClick={() => setShowMap(false)}
              className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                !showMap 
                  ? 'bg-[#F59297] text-white' 
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <List className="w-4 h-4 mr-2" />
              List View
            </button>
            <button
              onClick={() => setShowMap(true)}
              className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                showMap 
                  ? 'bg-[#F59297] text-white' 
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <Map className="w-4 h-4 mr-2" />
              Map View
            </button>
          </div>
        </div>

        {showMap ? (
          /* Map Container */
          <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg" data-aos="fade-up" data-aos-delay="200">
            {/* Map Placeholder */}
            <div className="relative h-96 bg-gradient-to-br from-blue-100 to-green-100 dark:from-blue-900/30 dark:to-green-900/30 flex items-center justify-center">
              <div className="text-center">
                <Map className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Interactive Map
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Map integration with Google Maps or Mapbox would be implemented here
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  {hospitals.map((hospital) => (
                    <div
                      key={hospital.id}
                      className="bg-white dark:bg-gray-700 rounded-lg p-3 shadow-md border border-gray-200 dark:border-gray-600 min-w-[200px]"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
                            {hospital.name}
                          </h4>
                          <div className="flex items-center mt-1">
                            <Star className="w-3 h-3 text-yellow-400 fill-current mr-1" />
                            <span className="text-xs text-gray-600 dark:text-gray-400">
                              {hospital.rating}
                            </span>
                          </div>
                        </div>
                        <MapPin className="w-4 h-4 text-[#F59297]" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          📍 {hospital.distance}
                        </span>
                        <button className="bg-[#F59297] text-white px-2 py-1 rounded text-xs hover:bg-[#e67d82] transition-colors">
                          <Phone className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Map Controls */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-600">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-[#F59297] rounded-full mr-2"></div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">Your Location</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">Hospitals</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                    Zoom In
                  </button>
                  <button className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                    Reset View
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* List View Message */
          <div className="text-center py-12" data-aos="fade-up" data-aos-delay="200">
            <List className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
              List View Active
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Switch to Map View to see hospitals on an interactive map
            </p>
            <button
              onClick={() => setShowMap(true)}
              className="bg-[#F59297] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#e67d82] transition-colors duration-200"
            >
              <Map className="w-5 h-5 inline mr-2" />
              Show Map
            </button>
          </div>
        )}

        {/* Map Features */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6" data-aos="fade-up" data-aos-delay="400">
          <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600">
            <div className="text-3xl mb-3">🎯</div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Precise Location</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Get exact directions to hospitals with GPS navigation
            </p>
          </div>
          <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600">
            <div className="text-3xl mb-3">⏱️</div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Real-time Info</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              See current wait times and availability status
            </p>
          </div>
          <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600">
            <div className="text-3xl mb-3">🚗</div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Easy Navigation</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              One-tap directions with your preferred navigation app
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default MapView
