'use client'

import { Phone, AlertTriangle, MapPin, Clock } from 'lucide-react'

const EmergencyStrip = () => {
  const emergencyContacts = [
    {
      name: 'Ghana Ambulance Service',
      number: '112',
      description: 'National Emergency Number',
      icon: '🚑'
    },
    {
      name: 'Police Emergency',
      number: '191',
      description: 'Police Emergency Line',
      icon: '👮‍♀️'
    },
    {
      name: 'Fire Service',
      number: '192',
      description: 'Fire Emergency',
      icon: '🚒'
    }
  ]

  const nearestEmergencyHospitals = [
    {
      name: 'Ridge Hospital Emergency',
      distance: '2.3 km',
      phone: '+233 30 222 5401',
      status: 'Open 24/7'
    },
    {
      name: 'Korle-Bu Emergency',
      distance: '4.1 km', 
      phone: '+233 30 202 5401',
      status: 'Open 24/7'
    }
  ]

  return (
    <section className="py-12 bg-red-50 dark:bg-red-900/20 border-t-4 border-red-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Emergency Header */}
        <div className="text-center mb-8" data-aos="fade-up">
          <div className="flex items-center justify-center mb-4">
            <AlertTriangle className="w-8 h-8 text-red-600 dark:text-red-400 mr-3" />
            <h2 className="text-3xl font-bold text-red-900 dark:text-red-100">
              Emergency Help
            </h2>
          </div>
          <p className="text-lg text-red-800 dark:text-red-200 max-w-3xl mx-auto">
            Need urgent medical assistance? Contact emergency services immediately or find the nearest emergency hospital.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Emergency Contacts */}
          <div data-aos="fade-up" data-aos-delay="200">
            <h3 className="text-xl font-bold text-red-900 dark:text-red-100 mb-6 flex items-center">
              <Phone className="w-6 h-6 mr-2" />
              Emergency Hotlines
            </h3>
            <div className="space-y-4">
              {emergencyContacts.map((contact, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-lg p-4 border-l-4 border-red-500 shadow-md"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="text-2xl mr-3">{contact.icon}</span>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">
                          {contact.name}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {contact.description}
                        </p>
                      </div>
                    </div>
                    <a
                      href={`tel:${contact.number}`}
                      className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-bold text-lg transition-colors duration-200 flex items-center"
                    >
                      <Phone className="w-5 h-5 mr-2" />
                      {contact.number}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Nearest Emergency Hospitals */}
          <div data-aos="fade-up" data-aos-delay="400">
            <h3 className="text-xl font-bold text-red-900 dark:text-red-100 mb-6 flex items-center">
              <MapPin className="w-6 h-6 mr-2" />
              Nearest Emergency Hospitals
            </h3>
            <div className="space-y-4">
              {nearestEmergencyHospitals.map((hospital, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-600 shadow-md"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        🏥 {hospital.name}
                      </h4>
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mt-1">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span>{hospital.distance} away</span>
                        <Clock className="w-4 h-4 ml-3 mr-1" />
                        <span>{hospital.status}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <a
                        href={`tel:${hospital.phone}`}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors duration-200 flex items-center"
                      >
                        <Phone className="w-4 h-4 mr-1" />
                        Call
                      </a>
                      <button className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors duration-200 flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        Directions
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Emergency Tips */}
            <div className="mt-6 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
              <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2 flex items-center">
                💡 Emergency Tips
              </h4>
              <ul className="text-sm text-yellow-700 dark:text-yellow-300 space-y-1">
                <li>• Stay calm and speak clearly when calling emergency services</li>
                <li>• Provide your exact location and describe the emergency</li>
                <li>• Don't hang up until the operator tells you to</li>
                <li>• If possible, have someone meet the ambulance at the entrance</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12" data-aos="fade-up" data-aos-delay="600">
          <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              🚨 In Case of Emergency
            </h3>
            <p className="text-lg mb-6 opacity-90">
              Don't wait - call for help immediately. Every second counts in an emergency.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:112"
                className="bg-white text-red-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center"
              >
                <Phone className="w-6 h-6 mr-2" />
                Call 112 - Ambulance
              </a>
              <button className="bg-red-800 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-red-900 transition-colors duration-200 flex items-center justify-center">
                <MapPin className="w-6 h-6 mr-2" />
                Find Nearest Hospital
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default EmergencyStrip
