'use client'

import { MapPin, Navigation, Clock, Users } from 'lucide-react'

const MapLocation = () => {
  return (
    <section className="py-16 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Our Location
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            While we operate primarily as a digital platform, our team is based in Accra, Ghana, 
            serving mothers across the country.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Map Container */}
          <div className="relative" data-aos="fade-right">
            <div className="bg-gray-200 dark:bg-gray-700 rounded-2xl h-96 flex items-center justify-center relative overflow-hidden">
              {/* Placeholder for actual map */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#F59297]/20 to-[#7da8e6]/20"></div>
              <div className="relative z-10 text-center">
                <MapPin className="w-16 h-16 text-[#F59297] mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  Accra, Ghana
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Virtual Office Location
                </p>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute top-4 left-4 w-3 h-3 bg-[#F59297] rounded-full animate-pulse"></div>
              <div className="absolute bottom-6 right-6 w-2 h-2 bg-[#7da8e6] rounded-full animate-pulse"></div>
              <div className="absolute top-1/3 right-8 w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
            </div>
            
            {/* Map overlay info */}
            <div className="absolute bottom-4 left-4 right-4 bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#F59297] to-[#7da8e6] rounded-lg flex items-center justify-center">
                    <Navigation className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white text-sm">
                      Serving All of Ghana
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 text-xs">
                      Digital maternal care platform
                    </p>
                  </div>
                </div>
                <button className="text-[#F59297] hover:text-[#e67d82] font-medium text-sm">
                  Get Directions
                </button>
              </div>
            </div>
          </div>

          {/* Location Info */}
          <div className="space-y-6" data-aos="fade-left">
            <div className="bg-gray-50 dark:bg-gray-700 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Virtual Office Details
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-[#F59297] mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Address</p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Accra, Greater Accra Region, Ghana
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Clock className="w-5 h-5 text-[#7da8e6] mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Operating Hours</p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Monday - Saturday: 9:00 AM - 6:00 PM<br />
                      Sunday: Emergency support only
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Users className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Service Area</p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      All 16 regions of Ghana<br />
                      Remote consultations available
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Partner Locations */}
            <div className="bg-gradient-to-r from-[#F59297]/10 to-[#7da8e6]/10 dark:from-pink-900/20 dark:to-blue-900/20 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                Partner Healthcare Facilities
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                We work with healthcare facilities across Ghana to provide you with the best care.
              </p>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Greater Accra</p>
                  <p className="text-gray-600 dark:text-gray-400">15+ facilities</p>
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Ashanti</p>
                  <p className="text-gray-600 dark:text-gray-400">12+ facilities</p>
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Northern</p>
                  <p className="text-gray-600 dark:text-gray-400">8+ facilities</p>
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Western</p>
                  <p className="text-gray-600 dark:text-gray-400">10+ facilities</p>
                </div>
              </div>
              
              <button className="mt-4 text-[#F59297] hover:text-[#e67d82] font-medium text-sm">
                View All Partner Facilities →
              </button>
            </div>

            {/* Contact for Visits */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-600">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Need an In-Person Consultation?
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                While we operate digitally, we can arrange in-person consultations through our partner facilities.
              </p>
              <button className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-[#F59297] to-[#7da8e6] text-white font-medium rounded-lg hover:from-[#e67d82] hover:to-[#6b9ce6] transition-all duration-300 text-sm">
                <Users className="w-4 h-4 mr-2" />
                Schedule Consultation
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default MapLocation
