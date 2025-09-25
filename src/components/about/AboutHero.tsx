'use client'

import Image from 'next/image'
import { Heart, Users, ArrowDown } from 'lucide-react'

const AboutHero = () => {
  const scrollToTeam = () => {
    const teamSection = document.getElementById('meet-the-team')
    if (teamSection) {
      teamSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="relative pt-40 pb-16 bg-gradient-to-br from-pink-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden">
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left" data-aos="fade-right" data-aos-duration="1000">
            {/* Trust Badge */}
            <div className="inline-flex items-center bg-white dark:bg-gray-800 rounded-full px-4 py-2 shadow-lg mb-6">
              <Heart className="w-4 h-4 text-primary-500 mr-2" fill="currentColor" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Built with love for Ghanaian mothers
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-secondary-500">
                About Obaatanpa
              </span>
              <br />
              <span className="text-3xl md:text-4xl lg:text-5xl text-gray-700 dark:text-gray-300">
                Your Trusted Companion Through Motherhood
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              More than an app — we're a movement of care, empowering Ghanaian women with trusted maternal support, local knowledge, and expert guidance every step of the way.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button 
                onClick={scrollToTeam}
                className="inline-flex items-center justify-center px-8 py-4 bg-[#F59297] text-white font-semibold rounded-xl hover:bg-[#e67d82] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <Users className="w-5 h-5 mr-2" />
                Meet the Team
                <ArrowDown className="w-4 h-4 ml-2" />
              </button>
              <button className="inline-flex items-center justify-center px-8 py-4 border-2 border-[#7da8e6] text-[#7da8e6] dark:text-[#7da8e6] font-semibold rounded-xl hover:bg-[#7da8e6] hover:text-white transition-all duration-300">
                <Heart className="w-5 h-5 mr-2" />
                Our Mission
              </button>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative mt-8" data-aos="fade-left">
            <div className="relative z-10">
              <Image
                src="/images/about/ghanaian-mother-baby.png"
                alt="Ghanaian mother with her baby - representing the heart of Obaatanpa"
                width={600}
                height={500}
                className="w-full h-auto max-w-md lg:max-w-lg rounded-3xl shadow-2xl object-cover"
                priority
              />
            </div>
            
            {/* Floating Elements */}
            <div className="absolute -top-6 -right-6 bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-xl z-20" data-aos="fade-up" data-aos-delay="200">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-pink-100 dark:bg-pink-900/30 rounded-full flex items-center justify-center">
                  <Heart className="w-6 h-6 text-[#F59297] dark:text-[#F59297]" fill="currentColor" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">2,000+</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Mothers Supported</p>
                </div>
              </div>
            </div>
            
            <div className="absolute -bottom-6 -left-6 bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-xl z-20" data-aos="fade-up" data-aos-delay="400">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-[#7da8e6] dark:text-[#7da8e6]" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">Expert Team</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Midwives & Doctors</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutHero
