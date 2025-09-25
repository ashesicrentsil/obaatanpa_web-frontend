'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Clock, User, ArrowRight, Star, Bookmark } from 'lucide-react'

const FeaturedGuides = () => {
  const featuredGuides = [
    {
      id: 1,
      title: 'What to Expect in Your First Trimester',
      excerpt: 'A comprehensive guide to the first 12 weeks of pregnancy, covering symptoms, development, and important milestones.',
      image: '/images/resources/first-trimester.jpg',
      author: 'Dr. Akosua Mensah',
      readTime: '8 min read',
      category: 'Pregnancy',
      rating: 4.9,
      featured: true,
      href: '/resources/first-trimester-guide'
    },
    {
      id: 2,
      title: '10 Baby Bathing Mistakes New Moms Make',
      excerpt: 'Learn the proper techniques for bathing your newborn safely and avoid these common mistakes that new mothers often make.',
      image: '/images/resources/baby-bathing.jpg',
      author: 'Midwife Sarah Osei',
      readTime: '6 min read',
      category: 'Baby Care',
      rating: 4.8,
      featured: true,
      href: '/resources/baby-bathing-guide'
    },
    {
      id: 3,
      title: 'Foods That Boost Breastmilk Naturally',
      excerpt: 'Discover traditional Ghanaian foods and modern nutrition tips that can help increase your milk supply naturally.',
      image: '/images/resources/breastfeeding-foods.jpg',
      author: 'Nutritionist Ama Boateng',
      readTime: '5 min read',
      category: 'Nutrition',
      rating: 4.9,
      featured: true,
      href: '/resources/breastfeeding-nutrition'
    }
  ]

  return (
    <section className="py-16 bg-white dark:bg-gray-800 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12" data-aos="fade-up">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Featured Guides
          </h2>

          {/* Category Filter Buttons */}
          <div className="flex flex-wrap gap-3 mb-8">
            <button className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
              📖 Pregnancy Week-by-Week
            </button>
            <button className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
              🍼 Baby Care
            </button>
            <button className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
              🥗 Nutrition
            </button>
            <button className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
              🧠 Mental Health
            </button>
          </div>
        </div>

        {/* Featured Guides Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {featuredGuides.map((guide, index) => (
            <Link
              key={guide.id}
              href={guide.href}
              className="group block"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <article className="bg-white dark:bg-gray-700 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 dark:border-gray-600">
                {/* Simple Illustration */}
                <div className="relative h-40 bg-gradient-to-br from-pink-100 to-orange-100 dark:from-gray-600 dark:to-gray-700 flex items-center justify-center">
                  {index === 0 && (
                    <svg width="120" height="80" viewBox="0 0 120 80" className="opacity-80">
                      {/* Simple pregnant woman illustration */}
                      <g>
                        <ellipse cx="60" cy="35" rx="20" ry="25" fill="#E67D82"/>
                        <circle cx="60" cy="25" r="12" fill="#D69E2E"/>
                        <circle cx="56" cy="22" r="1.5" fill="#2D3748"/>
                        <circle cx="64" cy="22" r="1.5" fill="#2D3748"/>
                        <path d="M56 28 Q60 32 64 28" stroke="#2D3748" strokeWidth="1" fill="none"/>
                        <ellipse cx="60" cy="50" rx="15" ry="12" fill="#F7FAFC"/>
                      </g>
                    </svg>
                  )}
                  {index === 1 && (
                    <svg width="120" height="80" viewBox="0 0 120 80" className="opacity-80">
                      {/* Simple baby illustration */}
                      <g>
                        <circle cx="60" cy="35" r="18" fill="#D69E2E"/>
                        <circle cx="56" cy="30" r="1.5" fill="#2D3748"/>
                        <circle cx="64" cy="30" r="1.5" fill="#2D3748"/>
                        <path d="M56 38 Q60 42 64 38" stroke="#2D3748" strokeWidth="1" fill="none"/>
                        <ellipse cx="60" cy="55" rx="12" ry="8" fill="#7DA8E6"/>
                      </g>
                    </svg>
                  )}
                  {index === 2 && (
                    <svg width="120" height="80" viewBox="0 0 120 80" className="opacity-80">
                      {/* Simple food illustration */}
                      <g>
                        <circle cx="50" cy="40" r="8" fill="#F56565"/>
                        <rect x="65" y="35" width="6" height="10" fill="#68D391"/>
                        <ellipse cx="80" cy="40" rx="6" ry="4" fill="#ED8936"/>
                      </g>
                    </svg>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                    {guide.title}
                  </h3>

                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 leading-relaxed line-clamp-2">
                    Brief preview text
                  </p>
                </div>
              </article>
            </Link>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12" data-aos="fade-up" data-aos-delay="400">
          <Link
            href="/resources/all"
            className="inline-flex items-center bg-gradient-to-r from-primary-500 to-primary-600 text-white px-8 py-4 rounded-full font-semibold hover:from-primary-600 hover:to-primary-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            View All Resources
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>
    </section>
  )
}

export default FeaturedGuides
