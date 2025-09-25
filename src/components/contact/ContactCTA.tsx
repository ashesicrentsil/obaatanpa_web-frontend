'use client'

import { MessageCircle, Phone, Heart, Clock, Shield, Users } from 'lucide-react'

const ContactCTA = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-[#F59297]/5 via-white to-[#7da8e6]/5 dark:from-pink-900/10 dark:via-gray-900 dark:to-blue-900/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div data-aos="fade-up">
          {/* Main CTA Content */}
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-12 shadow-xl border border-gray-200 dark:border-gray-700">
            <div className="w-20 h-20 bg-gradient-to-br from-[#F59297] to-[#7da8e6] rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-lg">
              <Heart className="w-10 h-10 text-white" fill="currentColor" />
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              Obaatanpa is here to support you
              <span className="block text-[#F59297] dark:text-[#F59297]">every step of the way</span>
            </h2>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed max-w-2xl mx-auto">
              Don't hesitate to reach out. Whether you have a question, need support, or want to share your experience — we're here for you.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <button className="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-[#F59297] to-[#7da8e6] text-white font-semibold rounded-xl hover:from-[#e67d82] hover:to-[#6b9ce6] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                <MessageCircle className="w-5 h-5 mr-2" />
                Send a Message
              </button>
              
              <button className="inline-flex items-center justify-center px-8 py-4 border-2 border-[#F59297] text-[#F59297] dark:text-[#F59297] font-semibold rounded-xl hover:bg-[#F59297] hover:text-white transition-all duration-300">
                <Phone className="w-5 h-5 mr-2" />
                Call Us
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="flex items-center justify-center space-x-3">
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <Clock className="w-5 h-5 text-green-500" />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-gray-900 dark:text-white text-sm">Quick Response</p>
                  <p className="text-gray-600 dark:text-gray-400 text-xs">Within 24 hours</p>
                </div>
              </div>
              
              <div className="flex items-center justify-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                  <Shield className="w-5 h-5 text-[#7da8e6]" />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-gray-900 dark:text-white text-sm">Secure & Private</p>
                  <p className="text-gray-600 dark:text-gray-400 text-xs">Your data is safe</p>
                </div>
              </div>
              
              <div className="flex items-center justify-center space-x-3">
                <div className="w-10 h-10 bg-pink-100 dark:bg-pink-900/30 rounded-full flex items-center justify-center">
                  <Users className="w-5 h-5 text-[#F59297]" />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-gray-900 dark:text-white text-sm">Expert Team</p>
                  <p className="text-gray-600 dark:text-gray-400 text-xs">Healthcare professionals</p>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Contact Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700" data-aos="fade-up" data-aos-delay="100">
              <div className="w-12 h-12 bg-gradient-to-br from-[#F59297] to-pink-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Live Chat Support
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                Get instant help from our support team. Available during business hours for immediate assistance.
              </p>
              <button className="text-[#F59297] hover:text-[#e67d82] font-medium text-sm">
                Start Chat →
              </button>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700" data-aos="fade-up" data-aos-delay="200">
              <div className="w-12 h-12 bg-gradient-to-br from-[#7da8e6] to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                WhatsApp Support
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                Prefer WhatsApp? Send us a message and we'll respond as quickly as possible.
              </p>
              <button className="text-[#7da8e6] hover:text-[#6b9ce6] font-medium text-sm">
                Message on WhatsApp →
              </button>
            </div>
          </div>

          {/* Emergency Reminder */}
          <div className="mt-8 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-6" data-aos="fade-up" data-aos-delay="300">
            <p className="text-red-800 dark:text-red-200 font-medium text-center">
              🚨 <strong>Remember:</strong> For medical emergencies, always call 112 or visit your nearest hospital immediately.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactCTA
