'use client'

import { MessageCircle, Calendar, FileText } from 'lucide-react'

const NutritionistCTA = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-[#F59297] to-purple-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Need Personalized Nutrition Advice?
          </h2>
          <p className="text-xl text-pink-100 max-w-2xl mx-auto">
            Connect with certified nutritionists who understand your needs and local food culture
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center" data-aos="fade-up" data-aos-delay="100">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-3">Chat with a Nutritionist</h3>
            <p className="text-pink-100 mb-6">
              Get instant answers to your nutrition questions through our chat platform
            </p>
            <button className="bg-white text-[#F59297] px-6 py-3 rounded-full font-semibold hover:bg-pink-50 transition-all duration-300 shadow-lg hover:shadow-xl">
              Start Chat
            </button>
          </div>

          <div className="text-center" data-aos="fade-up" data-aos-delay="200">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-3">Book Nutrition Appointment</h3>
            <p className="text-pink-100 mb-6">
              Schedule a detailed consultation with our nutrition experts
            </p>
            <button className="bg-white text-[#F59297] px-6 py-3 rounded-full font-semibold hover:bg-pink-50 transition-all duration-300 shadow-lg hover:shadow-xl">
              Book Now
            </button>
          </div>

          <div className="text-center" data-aos="fade-up" data-aos-delay="300">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-3">Send Meal Plan Review</h3>
            <p className="text-pink-100 mb-6">
              Get your current meal plan reviewed and optimized by professionals
            </p>
            <button className="bg-white text-[#F59297] px-6 py-3 rounded-full font-semibold hover:bg-pink-50 transition-all duration-300 shadow-lg hover:shadow-xl">
              Send Plan
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default NutritionistCTA
