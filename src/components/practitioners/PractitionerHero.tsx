'use client'

import Image from 'next/image'
import { LogIn, UserPlus, Heart, Users, Shield } from 'lucide-react'

const PractitionerHero = () => {
  return (
    <section className="relative pt-40 pb-16 bg-gradient-to-br from-pink-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden">
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left" data-aos="fade-right" data-aos-duration="1000">
            {/* Trust Badge */}
            <div className="inline-flex items-center bg-white dark:bg-gray-800 rounded-full px-4 py-2 shadow-lg mb-6">
              <Shield className="w-4 h-4 text-primary-500 mr-2" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                For verified healthcare professionals
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-secondary-500">
                Join Obaatanpa Network
              </span>
              <br />
              <span className="text-3xl md:text-4xl lg:text-5xl text-gray-700 dark:text-gray-300">
                Support Mothers, Share Expertise
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Your digital platform to reach more women, offer care remotely, and empower safe motherhood across Ghana.
            </p>

            {/* Stats */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 mb-8 shadow-lg border border-gray-200 dark:border-gray-600">
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#F59297] mb-1">2,000+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Mothers Served</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#7da8e6] mb-1">50+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Practitioners</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-500 mb-1">24/7</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Support</div>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button className="inline-flex items-center justify-center px-8 py-4 bg-[#F59297] text-white font-semibold rounded-xl hover:bg-[#e67d82] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                <UserPlus className="w-5 h-5 mr-2" />
                Become a Verified Practitioner
              </button>
              <button className="inline-flex items-center justify-center px-8 py-4 border-2 border-[#7da8e6] text-[#7da8e6] dark:text-[#7da8e6] font-semibold rounded-xl hover:bg-[#7da8e6] hover:text-white transition-all duration-300">
                <LogIn className="w-5 h-5 mr-2" />
                Login
              </button>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative" data-aos="fade-left">
            <div className="relative z-10">
              <Image
                src="/images/practitioners/midwife-helping-mother.jpg"
                alt="Midwife helping a pregnant woman - representing healthcare professionals on Obaatanpa"
                width={600}
                height={500}
                className="w-full h-auto rounded-2xl shadow-2xl object-cover"
                priority
              />
            </div>
            
            {/* Floating Elements */}
            <div className="absolute -top-6 -right-6 bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-xl z-20" data-aos="fade-up" data-aos-delay="200">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-green-500" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">Verified</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Professionals</p>
                </div>
              </div>
            </div>
            
            <div className="absolute -bottom-6 -left-6 bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-xl z-20" data-aos="fade-up" data-aos-delay="400">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-pink-100 dark:bg-pink-900/30 rounded-full flex items-center justify-center">
                  <Heart className="w-6 h-6 text-[#F59297]" fill="currentColor" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">Caring</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Community</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PractitionerHero
