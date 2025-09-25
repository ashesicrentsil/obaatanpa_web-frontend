'use client'

import { Download } from 'lucide-react'

const ResourceTools = () => {
  const tools = [
    {
      id: 1,
      title: 'Weekly Pregnancy Checklist',
      description: 'Track your pregnancy milestones week by week with our comprehensive checklist.',
      emoji: '✅',
      fileType: 'PDF',
      fileSize: '2.1 MB',
      downloads: '12.5K',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20'
    },
    {
      id: 2,
      title: 'Baby Feeding Tracker',
      description: 'Monitor your baby\'s feeding schedule, diaper changes, and sleep patterns.',
      emoji: '🍼',
      fileType: 'PDF',
      fileSize: '1.8 MB',
      downloads: '8.9K',
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50 dark:bg-green-900/20'
    },
    {
      id: 3,
      title: 'Birth Plan Template',
      description: 'Create your personalized birth plan with our easy-to-use template.',
      emoji: '📋',
      fileType: 'PDF',
      fileSize: '1.2 MB',
      downloads: '15.2K',
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20'
    },
    {
      id: 4,
      title: 'Vaccination Schedule',
      description: 'Keep track of your baby\'s vaccination schedule and important health milestones.',
      emoji: '💉',
      fileType: 'PDF',
      fileSize: '900 KB',
      downloads: '11.3K',
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20'
    },
    {
      id: 5,
      title: 'Postpartum Recovery Guide',
      description: 'Essential information and checklists for your postpartum recovery journey.',
      emoji: '💖',
      fileType: 'PDF',
      fileSize: '3.2 MB',
      downloads: '9.7K',
      color: 'from-pink-500 to-pink-600',
      bgColor: 'bg-pink-50 dark:bg-pink-900/20'
    },
    {
      id: 6,
      title: 'Emergency Contact List',
      description: 'Printable emergency contact template for hospitals, doctors, and support.',
      emoji: '🚨',
      fileType: 'PDF',
      fileSize: '650 KB',
      downloads: '7.1K',
      color: 'from-red-500 to-red-600',
      bgColor: 'bg-red-50 dark:bg-red-900/20'
    }
  ]

  const handleDownload = (toolId: number, title: string) => {
    // Handle download logic here
    console.log(`Downloading: ${title}`)
    // You can implement actual download functionality
  }

  return (
    <section className="py-20 bg-white dark:bg-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16" data-aos="fade-up">
          <div className="inline-flex items-center bg-secondary-100 dark:bg-secondary-900/30 rounded-full px-4 py-2 mb-4">
            <Download className="w-4 h-4 text-secondary-600 dark:text-secondary-400 mr-2" />
            <span className="text-secondary-600 dark:text-secondary-400 font-medium text-sm">Free Downloads</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Resource Tools &{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-secondary-500">
              Downloadables
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Get practical tools and templates to help you stay organized throughout your pregnancy and motherhood journey.
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool, index) => {
            return (
              <div
                key={tool.id}
                className="group relative bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-200"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="flex items-start space-x-4">
                  {/* Emoji Icon */}
                  <div className="flex-shrink-0">
                    <span className="text-2xl">{tool.emoji}</span>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {tool.title}
                    </h3>

                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                      {tool.description}
                    </p>

                    {/* File Info */}
                    <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-500 mb-4">
                      <div className="flex items-center space-x-3">
                        <span className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-gray-700 dark:text-gray-300">
                          {tool.fileType}
                        </span>
                        <span>{tool.fileSize}</span>
                      </div>
                      <span className="text-gray-600 dark:text-gray-400">
                        {tool.downloads} downloads
                      </span>
                    </div>

                    {/* Download Button */}
                    <button
                      onClick={() => handleDownload(tool.id, tool.title)}
                      className="w-full bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 py-2.5 rounded-md text-sm font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors duration-200 flex items-center justify-center space-x-2"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download</span>
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16" data-aos="fade-up" data-aos-delay="400">
          <div className="bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 rounded-3xl p-8 md:p-12">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Need a Custom Tool?
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
              Can't find what you're looking for? Let us know what tools would be helpful for your journey.
            </p>
            <button className="bg-gradient-to-r from-primary-500 to-primary-600 text-white px-8 py-3 rounded-full font-semibold hover:from-primary-600 hover:to-primary-700 transition-all duration-300 shadow-lg hover:shadow-xl">
              Request a Tool
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ResourceTools
