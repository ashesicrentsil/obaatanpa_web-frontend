'use client'

import Image from 'next/image'
import { BookOpen, Users, Heart } from 'lucide-react'

const OurStory = () => {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div data-aos="fade-right">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-[#F59297] to-[#7da8e6] rounded-xl flex items-center justify-center mr-4">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                Our Story
              </h2>
            </div>
            
            <div className="space-y-6 text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              <p>
                <strong className="text-[#F59297] dark:text-[#F59297]">Obaatanpa was born out of love</strong> — 
                and a deep understanding of the challenges Ghanaian women face during pregnancy and motherhood.
              </p>
              
              <p>
                From long hospital queues to the lack of personalized nutrition advice, from limited access 
                to expert guidance to the overwhelming amount of conflicting information online — we saw a gap 
                that needed to be filled with care, compassion, and cultural understanding.
              </p>
              
              <p>
                Whether you're a first-time mom in Kumasi navigating your pregnancy journey, a grandmother 
                in Tamale helping raise a baby, or a working mother in Accra trying to balance it all — 
                <strong className="text-[#7da8e6] dark:text-[#7da8e6]"> Obaatanpa is designed for you</strong>.
              </p>
              
              <p>
                We believe every Ghanaian woman deserves access to trusted maternal care, regardless of 
                her location, background, or circumstances. That's why we created this platform — 
                accessible, reliable, and made with your reality in mind.
              </p>
            </div>
            
            <div className="mt-8 grid grid-cols-2 gap-6">
              <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
                <div className="text-2xl font-bold text-[#F59297] mb-1">2023</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Founded</div>
              </div>
              <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
                <div className="text-2xl font-bold text-[#7da8e6] mb-1">5+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Regions Served</div>
              </div>
            </div>
          </div>
          
          {/* Right Image */}
          <div className="relative" data-aos="fade-left">
            <div className="relative">
              <Image
                src="/images/about/our-story-collage.png"
                alt="Collage showing Ghanaian mothers and healthcare workers"
                width={600}
                height={500}
                className="w-full h-auto rounded-2xl shadow-xl object-cover"
              />
              
              {/* Overlay Quote */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-xl p-4">
                <div className="flex items-start space-x-3">
                  <Heart className="w-6 h-6 text-[#F59297] mt-1 flex-shrink-0" fill="currentColor" />
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                      "Every mother deserves to feel supported and confident in her journey."
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      — The Obaatanpa Team
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-[#F59297]/20 to-[#7da8e6]/20 rounded-full blur-xl"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-[#7da8e6]/20 to-[#F59297]/20 rounded-full blur-xl"></div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default OurStory
