'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Phone, MapPin, Star, Clock, Calendar, Navigation, Heart } from 'lucide-react'

const HospitalListings = () => {
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('grid')

  const hospitals = [
    {
      id: 1,
      name: 'Ridge Hospital',
      address: 'Castle Road, Ridge, Accra',
      distance: '2.3 km',
      rating: 4.5,
      reviews: 324,
      openHours: '24/7',
      isOpen: true,
      phone: '+233 30 222 5401',
      services: ['Antenatal', 'Delivery', 'Emergency', 'NICU'],
      badges: ['MoH-Approved', '24/7 Emergency'],
      type: 'Government',
      image: '/images/hospitals/ridge-hospital.jpeg'
    },
    {
      id: 2,
      name: 'Korle-Bu Teaching Hospital',
      address: 'Guggisberg Ave, Korle-Bu, Accra',
      distance: '4.1 km',
      rating: 4.3,
      reviews: 567,
      openHours: '24/7',
      isOpen: true,
      phone: '+233 30 202 5401',
      services: ['Antenatal', 'Delivery', 'Emergency', 'NICU', 'Specialist Care'],
      badges: ['MoH-Approved', 'Teaching Hospital', 'NICU Available'],
      type: 'Government',
      image: '/images/hospitals/korle-bu.webp'
    },
    {
      id: 3,
      name: 'Trust Hospital',
      address: 'Dzorwulu, Accra',
      distance: '3.7 km',
      rating: 4.7,
      reviews: 189,
      openHours: '6:00 AM - 10:00 PM',
      isOpen: true,
      phone: '+233 30 251 0005',
      services: ['Antenatal', 'Delivery', 'Child Care'],
      badges: ['Mother-Recommended', 'Baby-Friendly'],
      type: 'Private',
      image: '/images/hospitals/trust-hospital.jpeg'
    },
    {
      id: 4,
      name: 'Nyaho Medical Centre',
      address: 'Airport Residential Area, Accra',
      distance: '5.2 km',
      rating: 4.6,
      reviews: 245,
      openHours: '24/7',
      isOpen: true,
      phone: '+233 30 274 1191',
      services: ['Antenatal', 'Delivery', 'Emergency', 'Child Care'],
      badges: ['Private Excellence', 'Modern Facilities'],
      type: 'Private',
      image: '/images/hospitals/nyaho-medical.jpeg'
    },
    {
      id: 5,
      name: 'Lister Hospital',
      address: 'Dansoman, Accra',
      distance: '6.8 km',
      rating: 4.2,
      reviews: 156,
      openHours: '6:00 AM - 8:00 PM',
      isOpen: false,
      phone: '+233 30 230 2323',
      services: ['Antenatal', 'Child Care', 'General Medicine'],
      badges: ['Community Focused'],
      type: 'Private',
      image: '/images/hospitals/lister-hospital.jpeg'
    },
    {
      id: 6,
      name: 'Tema General Hospital',
      address: 'Community 2, Tema',
      distance: '18.5 km',
      rating: 4.1,
      reviews: 298,
      openHours: '24/7',
      isOpen: true,
      phone: '+233 30 320 2323',
      services: ['Antenatal', 'Delivery', 'Emergency'],
      badges: ['MoH-Approved', 'Regional Center'],
      type: 'Government',
      image: '/images/hospitals/tema-general.jpeg'
    }
  ]

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case 'MoH-Approved': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
      case 'Mother-Recommended': return 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-400'
      case 'Baby-Friendly': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
      case '24/7 Emergency': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
      case 'NICU Available': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
    }
  }

  return (
    <section className="py-16 bg-white dark:bg-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8" data-aos="fade-up">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            🏥 Hospitals Near You
          </h2>
          
          {/* View Toggle */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-[#F59297] text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'}`}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-[#F59297] text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'}`}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 8a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 12a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 16a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Hospital Cards */}
        <div className={`${viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}`}>
          {hospitals.map((hospital, index) => (
            <div
              key={hospital.id}
              className={`bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 hover:border-[#F59297] dark:hover:border-[#F59297] transition-all duration-200 ${
                viewMode === 'list' ? 'flex items-center space-x-6 p-6' : 'p-6'
              }`}
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              {/* Hospital Image */}
              {viewMode === 'grid' && (
                <div className="w-full h-32 bg-gray-100 dark:bg-gray-600 rounded-lg mb-4 overflow-hidden">
                  <Image
                    src={hospital.image}
                    alt={`${hospital.name} exterior`}
                    width={400}
                    height={128}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}

              {viewMode === 'list' && (
                <div className="w-20 h-20 bg-gray-100 dark:bg-gray-600 rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src={hospital.image}
                    alt={`${hospital.name} exterior`}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}

              <div className={viewMode === 'list' ? 'flex-1' : ''}>
                {/* Hospital Header */}
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                      {hospital.name}
                    </h3>
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-2">
                      <MapPin className="w-4 h-4 mr-1" />
                      {hospital.address}
                    </div>
                  </div>
                  <button className="p-2 text-gray-400 hover:text-[#F59297] transition-colors">
                    <Heart className="w-5 h-5" />
                  </button>
                </div>

                {/* Rating & Distance */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(hospital.rating)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                      {hospital.rating} ({hospital.reviews} reviews)
                    </span>
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    📍 {hospital.distance}
                  </span>
                </div>

                {/* Status & Hours */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1 text-gray-400" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {hospital.openHours}
                    </span>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    hospital.isOpen 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
                      : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                  }`}>
                    {hospital.isOpen ? '🟢 Open' : '🔴 Closed'}
                  </span>
                </div>

                {/* Services */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-1">
                    {hospital.services.slice(0, 3).map((service) => (
                      <span
                        key={service}
                        className="px-2 py-1 bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300 text-xs rounded"
                      >
                        {service}
                      </span>
                    ))}
                    {hospital.services.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300 text-xs rounded">
                        +{hospital.services.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Badges */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-1">
                    {hospital.badges.slice(0, 2).map((badge) => (
                      <span
                        key={badge}
                        className={`px-2 py-1 text-xs rounded-full font-medium ${getBadgeColor(badge)}`}
                      >
                        {badge}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center space-x-2">
                  <a
                    href={`tel:${hospital.phone}`}
                    className="flex-1 bg-[#F59297] text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-[#e67d82] transition-colors duration-200 flex items-center justify-center"
                  >
                    <Phone className="w-4 h-4 mr-1" />
                    Call
                  </a>
                  <button className="flex-1 bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300 py-2 px-3 rounded-lg text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-500 transition-colors duration-200 flex items-center justify-center">
                    <Navigation className="w-4 h-4 mr-1" />
                    Directions
                  </button>
                  <Link
                    href={`/hospitals/${hospital.id}`}
                    className="flex-1 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 py-2 px-3 rounded-lg text-sm font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors duration-200 flex items-center justify-center"
                  >
                    <Calendar className="w-4 h-4 mr-1" />
                    Book
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-12" data-aos="fade-up" data-aos-delay="400">
          <button className="bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors duration-200">
            Load More Hospitals
          </button>
        </div>
      </div>
    </section>
  )
}

export default HospitalListings
