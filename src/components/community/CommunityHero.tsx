'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import AOS from 'aos'
import { Users, MessageCircle, Heart } from 'lucide-react'

const CommunityHero = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      mirror: true,
      easing: 'ease-in-out',
    })
  }, [])

  return (
    <section className="relative pt-40 pb-16 bg-gradient-to-br from-pink-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden">
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left" data-aos="fade-right" data-aos-duration="1000">
            {/* Trust Badge */}
            <div className="inline-flex items-center bg-white dark:bg-gray-800 rounded-full px-4 py-2 shadow-lg mb-6">
              <Users className="w-4 h-4 text-primary-500 mr-2" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Join thousands of mothers
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-secondary-500">
                Community Support
              </span>
              <br />
              <span className="text-3xl md:text-4xl lg:text-5xl text-gray-700 dark:text-gray-300">
                Connect, Share, Grow Together
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Join our supportive community of Ghanaian mothers. Share experiences, ask questions, and find the support you need on your motherhood journey.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
              <button className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-lg hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <MessageCircle className="w-5 h-5 mr-2" />
                Join Discussions
              </button>
              
              <button className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold border-2 border-primary-500 text-primary-500 rounded-lg hover:bg-primary-500 hover:text-white transition-all duration-300">
                <Heart className="w-5 h-5 mr-2" />
                Share Your Story
              </button>
            </div>

            {/* Community Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-200 dark:border-gray-700">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-primary-500 mb-1">5,000+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Active Members</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-secondary-500 mb-1">1,200+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Discussions</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-primary-500 mb-1">24/7</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Support</div>
              </div>
            </div>
          </div>

          {/* Right Content - Image */}
          <div className="relative" data-aos="fade-left" data-aos-delay="200">
            <div className="relative">
              <Image
                src="/images/community/community-hero.jpg"
                alt="Mothers supporting each other in community"
                width={600}
                height={500}
                className="w-full h-auto max-w-md lg:max-w-lg mx-auto rounded-3xl shadow-2xl object-cover"
              />
              
              {/* Floating Community Cards */}
              <div className="absolute -top-4 -left-4 bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-xl">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                    <MessageCircle className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-white">New Discussion</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">2 min ago</div>
                  </div>
                </div>
              </div>
              
              <div className="absolute -bottom-4 -right-4 bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-xl">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center">
                    <Heart className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-white">Support Given</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Just now</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CommunityHero
