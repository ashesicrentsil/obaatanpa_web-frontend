'use client'

import { Eye, Star, Globe, Sparkles } from 'lucide-react'

const OurVision = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-[#F59297]/5 via-white to-[#7da8e6]/5 dark:from-pink-900/10 dark:via-gray-900 dark:to-blue-900/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div data-aos="fade-up">
          <div className="w-16 h-16 bg-gradient-to-br from-[#7da8e6] to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Eye className="w-8 h-8 text-white" />
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
            Our Vision
          </h2>
          
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl mb-8">
            <blockquote className="text-xl md:text-2xl font-medium text-gray-800 dark:text-gray-200 leading-relaxed mb-6">
              "To become Ghana's most trusted digital maternal care companion — supporting every woman's 
              journey from conception to early motherhood with love and confidence."
            </blockquote>
            
            <div className="flex items-center justify-center space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="w-5 h-5 text-yellow-400" fill="currentColor" />
              ))}
              <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                Trusted by thousands
              </span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center" data-aos="fade-up" data-aos-delay="100">
              <div className="w-12 h-12 bg-gradient-to-br from-[#F59297] to-pink-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                National Reach
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Expanding across all regions of Ghana to reach every mother who needs support.
              </p>
            </div>
            
            <div className="text-center" data-aos="fade-up" data-aos-delay="200">
              <div className="w-12 h-12 bg-gradient-to-br from-[#7da8e6] to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Star className="w-6 h-6 text-white" fill="currentColor" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Excellence Standard
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Setting the gold standard for digital maternal healthcare in West Africa.
              </p>
            </div>
            
            <div className="text-center" data-aos="fade-up" data-aos-delay="300">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Innovation Leader
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Pioneering innovative solutions that blend technology with traditional care.
              </p>
            </div>
          </div>
          
          {/* Future Goals */}
          <div className="mt-12 bg-gradient-to-r from-[#F59297]/10 to-[#7da8e6]/10 dark:from-pink-900/20 dark:to-blue-900/20 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Looking Ahead
            </h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              By 2025, we envision Obaatanpa being the first choice for every Ghanaian mother seeking 
              reliable, culturally-sensitive maternal care guidance. We're building a future where 
              no mother feels alone in her journey.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default OurVision
