'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Heart, Star } from 'lucide-react'
import AOS from 'aos'
import 'aos/dist/aos.css'

const HeroSection = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      mirror: true,
      easing: 'ease-in-out',
    })
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-pink-100 via-pink-50 to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('/images/hero-pattern.svg')] opacity-15 dark:opacity-5"></div>

      {/* Additional gradient overlay for more depth */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#F59297]/5 via-transparent to-[#7da8e6]/5"></div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-[#F59297]/30 rounded-full opacity-90 animate-bounce-gentle"></div>
      <div className="absolute bottom-20 right-10 w-16 h-16 bg-[#7da8e6]/30 rounded-full opacity-90 animate-bounce-gentle" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 left-20 w-12 h-12 bg-[#F59297]/35 rounded-full opacity-80 animate-bounce-gentle" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-32 right-32 w-8 h-8 bg-[#7da8e6]/35 rounded-full opacity-80 animate-bounce-gentle" style={{ animationDelay: '0.5s' }}></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-40 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left" data-aos="fade-right" data-aos-duration="1000">
            {/* Main Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              Welcome to{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F59297] to-[#7da8e6]">
                Obaatanpa
              </span>
              <br />
              <span className="text-2xl md:text-3xl lg:text-4xl text-gray-800 dark:text-gray-300">
                Your Pregnancy & Motherhood Companion
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-400 mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-medium">
              Care, Guidance, and Support — Every Step of the Way
            </p>

           {/* CTA Buttons */}
<div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-6">
  <Link
    href="/signup"
    className="group inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold bg-gradient-to-r from-[#F59297] to-[#7da8e6] text-white rounded-full hover:from-[#F59297]/90 hover:to-[#7da8e6]/90 transform hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg"
  >
    Get Started
    <ArrowRight className="ml-1.5 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
  </Link>

  <Link
    href="/resources"
    className="group inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold border border-[#F59297] text-[#F59297] dark:text-[#F59297] bg-white/90 rounded-full hover:bg-[#F59297] hover:text-white dark:hover:bg-[#F59297] dark:hover:text-white transform hover:scale-105 transition-all duration-300 shadow"
  >
    Explore Resources
  </Link>
</div>

          </div>

          {/* Center Content - Hero Image */}
          <div className="flex justify-center">
            <div className="relative" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200">
            <div className="relative">
              {/* Main Image Container */}
              <div className="relative w-96 h-96 md:w-[450px] md:h-[450px] lg:w-[600px] lg:h-[600px] overflow-hidden">
                <div className="absolute inset-0  z-10"></div>
                <Image
                  src="/images/hero/hero.png"
                  alt="Happy Ghanaian mother with baby"
                  fill
                  className="object-cover object-center"
                  priority
                  sizes="(max-width: 768px) 384px, (max-width: 1200px) 450px, 600px"
                />
              </div>

              {/* Floating Cards */}
              <div className="absolute -top-4 -left-4 bg-white/90 dark:bg-gray-800/20 backdrop-blur-sm rounded-xl p-3 shadow-md border border-white/50" data-aos="fade-up" data-aos-delay="600">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-[#F59297] to-[#F59297]/80 rounded-full flex items-center justify-center">
                    <Heart className="w-4 h-4 text-white" fill="currentColor" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-900 dark:text-white">Health Tracking</p>
                    <p className="text-xs text-gray-600 dark:text-gray-300">Monitor progress</p>
                  </div>
                </div>
              </div>

              {/* Testimonial Avatars */}
              <div className="absolute top-8 right-8 flex -space-x-2" data-aos="fade-up" data-aos-delay="700">
                <div className="w-8 h-8 rounded-full border-2 border-white overflow-hidden">
                  <Image src="/images/testimonials/user1.png" alt="User 1" width={32} height={32} className="w-full h-full object-cover" />
                </div>
                <div className="w-8 h-8 rounded-full border-2 border-white overflow-hidden">
                  <Image src="/images/testimonials/user2.png" alt="User 2" width={32} height={32} className="w-full h-full object-cover" />
                </div>
                <div className="w-8 h-8 rounded-full border-2 border-white overflow-hidden">
                  <Image src="/images/testimonials/user3.png" alt="User 3" width={32} height={32} className="w-full h-full object-cover" />
                </div>
                <div className="w-8 h-8 rounded-full border-2 border-white overflow-hidden">
                  <Image src="/images/testimonials/user4.png" alt="User 4" width={32} height={32} className="w-full h-full object-cover" />
                </div>
              </div>

             <div className="absolute top-16 right-8 w-fit bg-white/95 backdrop-blur-sm rounded-full px-4 py-1.5 shadow-md border border-white/50 flex flex-col items-center text-center space-y-0.5" data-aos="fade-up" data-aos-delay="800">
  <div className="flex items-center space-x-1">
    <span className="text-sm font-bold text-gray-900">2K+</span>
  </div>
  <p className="text-[10px] text-gray-500 leading-tight">Trusted Mothers</p>
</div>



              <div className="absolute -bottom-4 -right-4 bg-white/90 dark:bg-gray-800/20 backdrop-blur-sm rounded-xl p-3 shadow-md border border-white/50" data-aos="fade-up" data-aos-delay="800">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-[#7da8e6] to-[#7da8e6]/80 rounded-full flex items-center justify-center">
                    <Star className="w-4 h-4 text-white" fill="currentColor" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-900 dark:text-white">Expert Care</p>
                    <p className="text-xs text-gray-600 dark:text-gray-300">Professional guidance</p>
                  </div>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-1/4 -right-4 w-24 h-24 bg-gradient-to-br from-[#F59297]/20 to-[#F59297]/30 rounded-full opacity-90 blur-xl"></div>
              <div className="absolute bottom-1/4 -left-4 w-32 h-32 bg-gradient-to-br from-[#7da8e6]/20 to-[#7da8e6]/30 rounded-full opacity-90 blur-xl"></div>
            </div>
            </div>
          </div>

          {/* Right Content - Trust Indicators */}
          <div className="flex justify-center lg:justify-end" data-aos="fade-left" data-aos-duration="1000" data-aos-delay="400">
            <div className="bg-white/95 dark:bg-gray-800/20 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-pink-200/50 w-fit">
              <div className="flex flex-col gap-4 text-sm text-gray-800 dark:text-gray-300 font-medium">
                <div className="flex items-center">
                  <Heart className="w-4 h-4 text-[#F59297] mr-2" fill="currentColor" />
                  <span>Expert-verified content</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-green-500 rounded-full mr-2"></div>
                  <span>24/7 support available</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-[#7da8e6] rounded-full mr-2"></div>
                  <span>Culturally relevant</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="currentColor"
            className="text-white dark:text-gray-800"
          />
        </svg>
      </div>
    </section>
  )
}

export default HeroSection
