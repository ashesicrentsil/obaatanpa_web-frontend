'use client'

import Image from 'next/image'
import { MessageCircle, Clock, Heart, Headphones } from 'lucide-react'

const ContactHero = () => {
  return (
    <section className="relative pt-32 pb-20 bg-gradient-to-br from-pink-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900/10 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-20 h-20 bg-[#F59297] rounded-full"></div>
        <div className="absolute top-32 right-20 w-16 h-16 bg-[#7da8e6] rounded-full"></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-[#F59297] rounded-full"></div>
        <div className="absolute bottom-32 right-1/3 w-24 h-24 bg-blue-300 rounded-full"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left" data-aos="fade-right">
            {/* Trust Badge */}
            <div className="inline-flex items-center bg-white dark:bg-gray-800 rounded-full px-4 py-2 shadow-lg mb-6">
              <Heart className="w-4 h-4 text-[#F59297] mr-2" fill="currentColor" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                We're here to help
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              Need help or have a
              <span className="text-[#F59297] dark:text-[#F59297] block">question?</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              Contact the Obaatanpa team. We'll respond with care and speed.
            </p>

            {/* Response Time Info */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 mb-8 shadow-lg border border-gray-200 dark:border-gray-600">
              <div className="flex items-center mb-4">
                <Clock className="w-6 h-6 text-[#7da8e6] mr-3" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Response Time
                </h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#F59297] mb-1">24hrs</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Average Response</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#7da8e6] mb-1">Mon-Sat</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Support Days</div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button className="inline-flex items-center justify-center px-8 py-4 bg-[#F59297] text-white font-semibold rounded-xl hover:bg-[#e67d82] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                <MessageCircle className="w-5 h-5 mr-2" />
                Send Message
              </button>
              <button className="inline-flex items-center justify-center px-8 py-4 border-2 border-[#7da8e6] text-[#7da8e6] dark:text-[#7da8e6] font-semibold rounded-xl hover:bg-[#7da8e6] hover:text-white transition-all duration-300">
                <Headphones className="w-5 h-5 mr-2" />
                Live Chat
              </button>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative" data-aos="fade-left">
            <div className="relative z-10 mt-8">
              <Image
                src="/images/contact/woman-getting-help.png"
                alt="Ghanaian woman receiving support and assistance"
                width={600}
                height={500}
                className="w-full h-auto max-w-md lg:max-w-lg rounded-3xl shadow-2xl object-cover"
                priority
              />
            </div>
            
            {/* Floating Elements */}
            <div className="absolute -top-6 -right-6 bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-xl z-20" data-aos="fade-up" data-aos-delay="200">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-green-500" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">24/7</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Support Available</p>
                </div>
              </div>
            </div>
            
            <div className="absolute -bottom-6 -left-6 bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-xl z-20" data-aos="fade-up" data-aos-delay="400">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                  <Heart className="w-6 h-6 text-[#7da8e6]" fill="currentColor" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">Caring Team</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Ready to Help</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactHero
