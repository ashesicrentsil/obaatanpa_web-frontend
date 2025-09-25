'use client'

import { Heart, ArrowRight, MessageCircle, Star } from 'lucide-react'

const AboutCTA = () => {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div data-aos="fade-up">
          {/* Main CTA Content */}
          <div className="bg-gradient-to-br from-[#F59297]/10 via-white to-[#7da8e6]/10 dark:from-pink-900/20 dark:via-gray-800 dark:to-blue-900/20 rounded-3xl p-12 shadow-xl border border-gray-200 dark:border-gray-700">
            <div className="w-20 h-20 bg-gradient-to-br from-[#F59297] to-[#7da8e6] rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-lg">
              <Heart className="w-10 h-10 text-white" fill="currentColor" />
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              <span className="text-[#F59297] dark:text-[#F59297]">Obaatanpa</span> means 
              <span className="block">"a good woman"</span>
            </h2>
            
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              And we believe every mother is one.
            </p>
            
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-10 leading-relaxed max-w-3xl mx-auto">
              Join us as we build a healthier, more supported generation of Ghanaian mothers. 
              Your journey to confident motherhood starts here, and you're never alone.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <button className="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-[#F59297] to-[#7da8e6] text-white font-semibold rounded-xl hover:from-[#e67d82] hover:to-[#6b9ce6] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                <Heart className="w-5 h-5 mr-2" fill="currentColor" />
                Start Your Journey
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
              
              <button className="inline-flex items-center justify-center px-8 py-4 border-2 border-[#F59297] text-[#F59297] dark:text-[#F59297] font-semibold rounded-xl hover:bg-[#F59297] hover:text-white transition-all duration-300">
                <MessageCircle className="w-5 h-5 mr-2" />
                Contact Us
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center">
                <div className="flex mr-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-4 h-4 text-yellow-400" fill="currentColor" />
                  ))}
                </div>
                <span>Trusted by 2,000+ mothers</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-green-500 rounded-full mr-2"></div>
                <span>Expert-verified content</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-blue-500 rounded-full mr-2"></div>
                <span>Always free core features</span>
              </div>
            </div>
          </div>

          {/* Secondary CTAs */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1" data-aos="fade-up" data-aos-delay="100">
              <div className="w-12 h-12 bg-pink-100 dark:bg-pink-900/30 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Heart className="w-6 h-6 text-[#F59297]" fill="currentColor" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                For Mothers
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                Get personalized support, expert advice, and connect with other mothers.
              </p>
              <button className="text-[#F59297] hover:text-[#e67d82] font-medium text-sm">
                Learn More →
              </button>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1" data-aos="fade-up" data-aos-delay="200">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-6 h-6 text-[#7da8e6]" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                For Healthcare Providers
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                Join our network of trusted professionals serving Ghanaian mothers.
              </p>
              <button className="text-[#7da8e6] hover:text-[#6b9ce6] font-medium text-sm">
                Partner With Us →
              </button>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1" data-aos="fade-up" data-aos-delay="300">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Star className="w-6 h-6 text-green-500" fill="currentColor" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                For Organizations
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                Support maternal health initiatives in your community.
              </p>
              <button className="text-green-500 hover:text-green-600 font-medium text-sm">
                Get Involved →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutCTA
