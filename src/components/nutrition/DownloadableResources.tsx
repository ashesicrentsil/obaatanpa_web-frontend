'use client'

import { Download, Shield, AlertTriangle } from 'lucide-react'

const DownloadableResources = () => {
  return (
    <section className="py-16 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Downloadable Resources
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Take these helpful guides with you - print or save to your phone
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-2xl border border-blue-200 dark:border-blue-800 hover:shadow-lg transition-all duration-300" data-aos="fade-up" data-aos-delay="100">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4">
              <Download className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Weekly Meal Plans</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Complete PDF meal plans for each trimester with shopping lists and prep tips
            </p>
            <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300">
              Download PDF
            </button>
          </div>

          <div className="bg-gradient-to-br from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20 p-6 rounded-2xl border border-pink-200 dark:border-pink-800 hover:shadow-lg transition-all duration-300" data-aos="fade-up" data-aos-delay="200">
            <div className="w-12 h-12 bg-pink-100 dark:bg-pink-900/30 rounded-full flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-[#F59297] dark:text-[#F59297]" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Pregnancy Nutrition Checklist</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Essential nutrients checklist to ensure you're getting everything you need
            </p>
            <button className="w-full bg-[#F59297] text-white py-3 rounded-lg font-semibold hover:bg-[#e67d82] transition-colors duration-300">
              Download Checklist
            </button>
          </div>

          <div className="bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 p-6 rounded-2xl border border-red-200 dark:border-red-800 hover:shadow-lg transition-all duration-300" data-aos="fade-up" data-aos-delay="300">
            <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-4">
              <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">What to Eat vs. Avoid</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Quick reference guide for safe and unsafe foods during pregnancy
            </p>
            <button className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors duration-300">
              Download Guide
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default DownloadableResources
