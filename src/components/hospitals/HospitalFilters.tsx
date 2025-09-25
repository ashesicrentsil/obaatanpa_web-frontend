'use client'

import { useState } from 'react'
import { Filter, Search, Clock } from 'lucide-react'

const HospitalFilters = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedService, setSelectedService] = useState('all')
  const [selectedDistance, setSelectedDistance] = useState('all')
  const [selectedRating, setSelectedRating] = useState('all')
  const [selectedType, setSelectedType] = useState('all')
  const [showOpenOnly, setShowOpenOnly] = useState(false)

  const serviceTypes = [
    { value: 'all', label: '🏥 All Services', count: 45 },
    { value: 'antenatal', label: '🤰 Antenatal Care', count: 38 },
    { value: 'delivery', label: '👶 Delivery Services', count: 32 },
    { value: 'emergency', label: '🚨 Emergency Care', count: 28 },
    { value: 'childcare', label: '🍼 Child Care', count: 35 },
    { value: 'nicu', label: '🏥 NICU Available', count: 15 }
  ]

  const distanceOptions = [
    { value: 'all', label: '📍 Any Distance' },
    { value: '5', label: 'Within 5km' },
    { value: '10', label: 'Within 10km' },
    { value: '20', label: 'Within 20km' },
    { value: '50', label: 'Within 50km' }
  ]

  const ratingOptions = [
    { value: 'all', label: '⭐ All Ratings' },
    { value: '5', label: '⭐⭐⭐⭐⭐ 5 Stars' },
    { value: '4', label: '⭐⭐⭐⭐ 4+ Stars' },
    { value: '3', label: '⭐⭐⭐ 3+ Stars' }
  ]

  const hospitalTypes = [
    { value: 'all', label: '🏥 All Types' },
    { value: 'government', label: '🏛️ Government' },
    { value: 'private', label: '🏢 Private' },
    { value: 'clinic', label: '🏥 Clinic' },
    { value: 'specialist', label: '👩‍⚕️ Specialist Center' }
  ]

  return (
    <section className="py-12 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8" data-aos="fade-up">
          <div className="flex items-center">
            <Filter className="w-6 h-6 text-[#F59297] mr-3" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Filter & Search Hospitals
            </h2>
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Found 45 hospitals
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-8" data-aos="fade-up" data-aos-delay="100">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, area, or specialty..."
              className="w-full pl-12 pr-4 py-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#F59297] focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            />
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="space-y-6" data-aos="fade-up" data-aos-delay="200">
          {/* Service Type Filter */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Service Type</h3>
            <div className="flex flex-wrap gap-2">
              {serviceTypes.map((service) => (
                <button
                  key={service.value}
                  onClick={() => setSelectedService(service.value)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                    selectedService === service.value
                      ? 'bg-[#F59297] text-white'
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600 hover:border-[#F59297]'
                  }`}
                >
                  {service.label}
                  {service.count && (
                    <span className="ml-2 text-xs opacity-75">({service.count})</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Secondary Filters */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Distance Filter */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Distance</h3>
              <select
                value={selectedDistance}
                onChange={(e) => setSelectedDistance(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#F59297] focus:border-transparent"
              >
                {distanceOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Rating Filter */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Rating</h3>
              <select
                value={selectedRating}
                onChange={(e) => setSelectedRating(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#F59297] focus:border-transparent"
              >
                {ratingOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Hospital Type Filter */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Type</h3>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#F59297] focus:border-transparent"
              >
                {hospitalTypes.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Open Now Toggle */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Availability</h3>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={showOpenOnly}
                  onChange={(e) => setShowOpenOnly(e.target.checked)}
                  className="rounded border-gray-300 text-[#F59297] focus:ring-[#F59297]"
                />
                <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                  <Clock className="w-4 h-4 inline mr-1" />
                  Open Now
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Active Filters Summary */}
        {(selectedService !== 'all' || selectedDistance !== 'all' || selectedRating !== 'all' || selectedType !== 'all' || showOpenOnly) && (
          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg" data-aos="fade-up" data-aos-delay="300">
            <div className="flex items-center justify-between">
              <div className="flex items-center flex-wrap gap-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Active filters:</span>
                {selectedService !== 'all' && (
                  <span className="px-2 py-1 bg-[#F59297] text-white text-xs rounded-full">
                    {serviceTypes.find(s => s.value === selectedService)?.label}
                  </span>
                )}
                {selectedDistance !== 'all' && (
                  <span className="px-2 py-1 bg-[#F59297] text-white text-xs rounded-full">
                    Within {selectedDistance}km
                  </span>
                )}
                {showOpenOnly && (
                  <span className="px-2 py-1 bg-[#F59297] text-white text-xs rounded-full">
                    Open Now
                  </span>
                )}
              </div>
              <button
                onClick={() => {
                  setSelectedService('all')
                  setSelectedDistance('all')
                  setSelectedRating('all')
                  setSelectedType('all')
                  setShowOpenOnly(false)
                }}
                className="text-sm text-[#F59297] hover:text-[#e67d82] font-medium"
              >
                Clear all
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default HospitalFilters
