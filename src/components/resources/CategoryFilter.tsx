'use client'

import { useState } from 'react'
import { Calendar, Baby, Utensils, Brain, Bed, HelpCircle } from 'lucide-react'

const CategoryFilter = () => {
  const [activeCategory, setActiveCategory] = useState('all')

  const categories = [
    {
      id: 'all',
      label: 'All Resources',
      icon: null,
      count: 500
    },
    {
      id: 'pregnancy',
      label: 'Pregnancy Week-by-Week',
      icon: Calendar,
      count: 120
    },
    {
      id: 'baby-care',
      label: 'Baby Care',
      icon: Baby,
      count: 85
    },
    {
      id: 'nutrition',
      label: 'Nutrition',
      icon: Utensils,
      count: 95
    },
    {
      id: 'mental-health',
      label: 'Mental Health',
      icon: Brain,
      count: 65
    },
    {
      id: 'postpartum',
      label: 'Postpartum Recovery',
      icon: Bed,
      count: 75
    },
    {
      id: 'faqs',
      label: 'FAQs / Common Issues',
      icon: HelpCircle,
      count: 60
    }
  ]

  return (
    <section className="sticky top-16 z-40 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Desktop Filter */}
        <div className="hidden lg:flex items-center justify-center space-x-2">
          {categories.map((category) => {
            const IconComponent = category.icon
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center space-x-2 px-4 py-3 rounded-full font-medium text-sm transition-all duration-300 whitespace-nowrap ${
                  activeCategory === category.id
                    ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg transform scale-105'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-primary-100 dark:hover:bg-primary-900/30 hover:text-primary-700 dark:hover:text-primary-300'
                }`}
              >
                {IconComponent && <IconComponent className="w-4 h-4" />}
                <span>{category.label}</span>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  activeCategory === category.id
                    ? 'bg-white/20 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                }`}>
                  {category.count}
                </span>
              </button>
            )
          })}
        </div>

        {/* Mobile Filter - Horizontal Scroll */}
        <div className="lg:hidden">
          <div className="flex space-x-3 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((category) => {
              const IconComponent = category.icon
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex items-center space-x-2 px-4 py-3 rounded-full font-medium text-sm transition-all duration-300 whitespace-nowrap flex-shrink-0 ${
                    activeCategory === category.id
                      ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  {IconComponent && <IconComponent className="w-4 h-4" />}
                  <span className="hidden sm:inline">{category.label}</span>
                  <span className="sm:hidden">{category.label.split(' ')[0]}</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    activeCategory === category.id
                      ? 'bg-white/20 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                  }`}>
                    {category.count}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Active Category Info */}
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {activeCategory === 'all' 
              ? 'Showing all resources across all categories'
              : `Showing ${categories.find(cat => cat.id === activeCategory)?.count} resources in ${categories.find(cat => cat.id === activeCategory)?.label}`
            }
          </p>
        </div>
      </div>

      {/* Custom scrollbar styles */}
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  )
}

export default CategoryFilter
