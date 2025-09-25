'use client'

import Image from 'next/image'
import { Search, BookOpen, Heart } from 'lucide-react'

interface BlogHeroProps {
  searchQuery: string
  setSearchQuery: (query: string) => void
}

const BlogHero = ({ searchQuery, setSearchQuery }: BlogHeroProps) => {
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
                Stories from real mothers
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-secondary-500">
                Stories & Inspiration
              </span>
              <br />
              <span className="text-3xl md:text-4xl lg:text-5xl text-gray-700 dark:text-gray-300">
                for Your Motherhood Journey
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              From our experts and real Ghanaian mothers — read, learn, and grow with Obaatanpa. Discover trusted advice and heartwarming stories.
            </p>

            {/* Search Bar */}
            <div className="relative max-w-md mx-auto lg:mx-0 mb-8">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search articles, tips, stories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-[#F59297] focus:border-transparent shadow-lg"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-lg hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <BookOpen className="w-5 h-5 mr-2" />
                Browse Articles
              </button>
              <button className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold border-2 border-primary-500 text-primary-500 rounded-lg hover:bg-primary-500 hover:text-white transition-all duration-300">
                <Heart className="w-5 h-5 mr-2" />
                Share Your Story
              </button>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative mt-8" data-aos="fade-left">
            <div className="relative z-10">
              <Image
                src="/images/blog/mother-reading.png"
                alt="Ghanaian mother reading and learning about pregnancy"
                width={600}
                height={500}
                className="w-full h-auto max-w-md lg:max-w-lg rounded-3xl shadow-2xl object-cover"
                priority
              />
            </div>
            {/* Floating Elements */}
            <div className="absolute -top-6 -right-6 bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-xl z-20" data-aos="fade-up" data-aos-delay="200">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-pink-100 dark:bg-pink-900/30 rounded-full flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-[#F59297] dark:text-[#F59297]" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">Expert Articles</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Trusted advice</p>
                </div>
              </div>
            </div>
            
            <div className="absolute -bottom-6 -left-6 bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-xl z-20" data-aos="fade-up" data-aos-delay="400">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                  <Heart className="w-6 h-6 text-[#7da8e6] dark:text-[#7da8e6]" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">Real Stories</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">From mothers</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BlogHero
