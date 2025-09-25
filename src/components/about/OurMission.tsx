'use client'

import { Heart, Target, Sparkles } from 'lucide-react'

const OurMission = () => {
  return (
    <section className="py-16 bg-white dark:bg-gray-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div data-aos="fade-up">
          <div className="w-16 h-16 bg-gradient-to-br from-[#F59297] to-[#7da8e6] rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Heart className="w-8 h-8 text-white" fill="currentColor" />
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
            Our Mission
          </h2>
          
          <div className="bg-gradient-to-r from-[#F59297]/10 to-[#7da8e6]/10 dark:from-pink-900/20 dark:to-blue-900/20 rounded-2xl p-8 mb-8">
            <blockquote className="text-xl md:text-2xl font-medium text-gray-800 dark:text-gray-200 leading-relaxed">
              "To empower Ghanaian women with easy access to trusted maternal care, 
              local knowledge, and expert support — anytime, anywhere."
            </blockquote>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="text-center" data-aos="fade-up" data-aos-delay="100">
              <div className="w-12 h-12 bg-pink-100 dark:bg-pink-900/30 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Target className="w-6 h-6 text-[#F59297]" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Accessible Care
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Making maternal healthcare accessible to every Ghanaian woman, regardless of location or background.
              </p>
            </div>
            
            <div className="text-center" data-aos="fade-up" data-aos-delay="200">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Heart className="w-6 h-6 text-[#7da8e6]" fill="currentColor" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Trusted Support
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Providing expert-verified information and personalized guidance from qualified healthcare professionals.
              </p>
            </div>
            
            <div className="text-center" data-aos="fade-up" data-aos-delay="300">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Cultural Relevance
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Honoring Ghanaian traditions while providing modern, evidence-based maternal care guidance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default OurMission
