'use client'

import Image from 'next/image'
import { Quote, Heart, Users, Globe } from 'lucide-react'

const WhyJoinPractitioner = () => {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div data-aos="fade-right">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Why Join as a Practitioner?
            </h2>
            
            <div className="space-y-6 text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              <p>
                <strong className="text-[#F59297] dark:text-[#F59297]">Every day, thousands of Ghanaian women</strong> 
                struggle to access trusted guidance during their pregnancy and motherhood journey.
              </p>
              
              <p>
                With Obaatanpa, you can reach them safely and efficiently — wherever they are. 
                Your expertise can make a difference in the lives of mothers across Ghana, 
                from bustling Accra to remote villages in the Northern regions.
              </p>
              
              <p>
                Whether you're a midwife, nurse, doula, doctor, or nutritionist, 
                <strong className="text-[#7da8e6] dark:text-[#7da8e6]"> your voice matters here</strong>. 
                Join a community of healthcare professionals dedicated to improving maternal health outcomes.
              </p>
              
              <p>
                Together, we're building a network of care that transcends geographical boundaries 
                and ensures every Ghanaian mother has access to expert guidance when she needs it most.
              </p>
            </div>
            
            {/* Impact Stats */}
            <div className="mt-8 grid grid-cols-2 gap-6">
              <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
                <div className="text-2xl font-bold text-[#F59297] mb-1">10,000+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Women Need Your Help</div>
              </div>
              <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
                <div className="text-2xl font-bold text-[#7da8e6] mb-1">16</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Regions to Serve</div>
              </div>
            </div>
          </div>
          
          {/* Right Testimonial */}
          <div className="relative" data-aos="fade-left">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
              {/* Quote Icon */}
              <div className="w-12 h-12 bg-gradient-to-br from-[#F59297] to-[#7da8e6] rounded-xl flex items-center justify-center mb-6">
                <Quote className="w-6 h-6 text-white" />
              </div>
              
              {/* Testimonial */}
              <blockquote className="text-xl font-medium text-gray-800 dark:text-gray-200 mb-6 leading-relaxed">
                "I joined Obaatanpa to support women beyond my clinic. It's changed how I care for mothers — 
                I can now reach women in remote areas and provide guidance when they need it most. 
                The platform has truly transformed my practice."
              </blockquote>
              
              {/* Author */}
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-200 to-blue-200 rounded-full flex items-center justify-center">
                  <span className="text-2xl">👩🏽‍⚕️</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">Midwife Esi</p>
                  <p className="text-gray-600 dark:text-gray-400">Kumasi, Ashanti Region</p>
                  <div className="flex items-center mt-1">
                    <div className="flex space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span key={star} className="text-yellow-400">⭐</span>
                      ))}
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">Verified Practitioner</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-[#F59297]/20 to-[#7da8e6]/20 rounded-full blur-xl"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-[#7da8e6]/20 to-[#F59297]/20 rounded-full blur-xl"></div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16" data-aos="fade-up" data-aos-delay="400">
          <div className="bg-gradient-to-r from-[#F59297]/10 to-[#7da8e6]/10 dark:from-pink-900/20 dark:to-blue-900/20 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Ready to Make a Difference?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
              Join hundreds of healthcare professionals who are already making an impact through Obaatanpa. 
              Your expertise can help save lives and improve maternal health outcomes across Ghana.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#F59297] to-[#7da8e6] text-white font-semibold rounded-xl hover:from-[#e67d82] hover:to-[#6b9ce6] transition-all duration-300 shadow-lg hover:shadow-xl">
                <Users className="w-5 h-5 mr-2" />
                Join Our Network
              </button>
              <button className="inline-flex items-center px-8 py-4 border-2 border-[#F59297] text-[#F59297] dark:text-[#F59297] font-semibold rounded-xl hover:bg-[#F59297] hover:text-white transition-all duration-300">
                <Heart className="w-5 h-5 mr-2" fill="currentColor" />
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WhyJoinPractitioner
