'use client'

import Image from 'next/image'
import { Search, BookOpen, Heart, Star } from 'lucide-react'
import { useState } from 'react'

const ResourcesHero = () => {
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery)
      // Handle search functionality here
    }
  }

  return (
    <section className="relative pt-40 pb-16 bg-gradient-to-br from-pink-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden">
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left" data-aos="fade-right" data-aos-duration="1000">
            {/* Trust Badge */}
            <div className="inline-flex items-center bg-white dark:bg-gray-800 rounded-full px-4 py-2 shadow-lg mb-6">
              <BookOpen className="w-4 h-4 text-primary-500 mr-2" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Expert-verified resources
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-secondary-500">
                Empowering You
              </span>
              <br />
              <span className="text-3xl md:text-4xl lg:text-5xl text-gray-700 dark:text-gray-300">
                With Knowledge for Every Step of Motherhood
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Browse articles, tips, and expert advice tailored to your pregnancy and baby journey.
            </p>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="mb-8">
              <div className="relative max-w-md mx-auto lg:mx-0">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for topics, articles, or questions..."
                  className="w-full pl-12 pr-4 py-4 text-lg border border-gray-300 dark:border-gray-600 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 shadow-lg"
                />
              </div>
            </form>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center">
                <Heart className="w-4 h-4 text-primary-500 mr-2" fill="currentColor" />
                <span>500+ articles</span>
              </div>
              <div className="flex items-center">
                <Star className="w-4 h-4 text-yellow-500 mr-2" fill="currentColor" />
                <span>Expert-reviewed</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-green-500 rounded-full mr-2"></div>
                <span>Updated weekly</span>
              </div>
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className="relative flex justify-center lg:justify-end" data-aos="fade-left" data-aos-duration="1000" data-aos-delay="200">
            <Image
              src="/images/resources/hero-reading-mother.png"
              alt="Ghanaian mother reading pregnancy resources"
              width={600}
              height={450}
              className="w-full h-auto max-w-lg lg:max-w-xl rounded-3xl shadow-2xl object-cover"
              priority
            />
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="currentColor"
            className="text-white dark:text-gray-800"
          />
        </svg>
      </div>
    </section>
  )
}

export default ResourcesHero
