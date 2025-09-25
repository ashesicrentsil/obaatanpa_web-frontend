'use client'

import { UserPlus, LogIn, Heart, Shield, Users, Star } from 'lucide-react'

const PractitionerCTA = () => {
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
              Ready to reach more mothers
              <span className="block text-[#F59297] dark:text-[#F59297]">with your knowledge and care?</span>
            </h2>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed max-w-2xl mx-auto">
              Join the Obaatanpa network and become part of a community dedicated to improving 
              maternal health outcomes across Ghana. Your expertise can save lives.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <button className="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-[#F59297] to-[#7da8e6] text-white font-semibold rounded-xl hover:from-[#e67d82] hover:to-[#6b9ce6] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                <UserPlus className="w-5 h-5 mr-2" />
                Register as Practitioner
              </button>
              
              <button className="inline-flex items-center justify-center px-8 py-4 border-2 border-[#F59297] text-[#F59297] dark:text-[#F59297] font-semibold rounded-xl hover:bg-[#F59297] hover:text-white transition-all duration-300">
                <LogIn className="w-5 h-5 mr-2" />
                Log In
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="flex items-center justify-center space-x-3">
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <Shield className="w-5 h-5 text-green-500" />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-gray-900 dark:text-white text-sm">Verified Platform</p>
                  <p className="text-gray-600 dark:text-gray-400 text-xs">Secure & trusted</p>
                </div>
              </div>
              
              <div className="flex items-center justify-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                  <Users className="w-5 h-5 text-[#7da8e6]" />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-gray-900 dark:text-white text-sm">Growing Network</p>
                  <p className="text-gray-600 dark:text-gray-400 text-xs">50+ professionals</p>
                </div>
              </div>
              
              <div className="flex items-center justify-center space-x-3">
                <div className="w-10 h-10 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center">
                  <Star className="w-5 h-5 text-yellow-500" fill="currentColor" />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-gray-900 dark:text-white text-sm">High Impact</p>
                  <p className="text-gray-600 dark:text-gray-400 text-xs">2,000+ mothers helped</p>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700" data-aos="fade-up" data-aos-delay="100">
              <div className="w-12 h-12 bg-gradient-to-br from-[#F59297] to-pink-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <UserPlus className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                New to Obaatanpa?
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                Register as a verified practitioner and start helping mothers across Ghana. 
                Our verification process ensures quality and trust.
              </p>
              <button className="text-[#F59297] hover:text-[#e67d82] font-medium text-sm">
                Start Registration →
              </button>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700" data-aos="fade-up" data-aos-delay="200">
              <div className="w-12 h-12 bg-gradient-to-br from-[#7da8e6] to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <LogIn className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Already Registered?
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                Welcome back! Log in to access your dashboard, manage appointments, 
                and continue supporting mothers in your network.
              </p>
              <button className="text-[#7da8e6] hover:text-[#6b9ce6] font-medium text-sm">
                Access Dashboard →
              </button>
            </div>
          </div>

          {/* Support Information */}
          <div className="mt-8 bg-gradient-to-r from-[#F59297]/10 to-[#7da8e6]/10 dark:from-pink-900/20 dark:to-blue-900/20 rounded-2xl p-6 border border-gray-200 dark:border-gray-700" data-aos="fade-up" data-aos-delay="300">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
              Need Help Getting Started?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
              Our support team is here to help you through the registration process and answer any questions 
              about joining the Obaatanpa network.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="text-[#F59297] hover:text-[#e67d82] font-medium text-sm">
                📧 Contact Support
              </button>
              <button className="text-[#7da8e6] hover:text-[#6b9ce6] font-medium text-sm">
                📞 Schedule a Call
              </button>
              <button className="text-green-500 hover:text-green-600 font-medium text-sm">
                💬 Live Chat
              </button>
            </div>
          </div>

          {/* Final Message */}
          <div className="mt-8 text-center" data-aos="fade-up" data-aos-delay="400">
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Join us in building a healthier future for Ghanaian mothers and their families. 
              Together, we can make a lasting impact on maternal health across our nation.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PractitionerCTA
