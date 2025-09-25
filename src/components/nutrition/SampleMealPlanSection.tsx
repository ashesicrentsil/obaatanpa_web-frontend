'use client'

import { useEffect } from 'react'
import AOS from 'aos'
import { Lock, Utensils, Clock, Star } from 'lucide-react'

const SampleMealPlanSection = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      mirror: true,
      easing: 'ease-in-out',
    })
  }, [])

  const sampleMeals = [
    {
      time: "Breakfast",
      icon: "🌅",
      meal: "Oats with banana + peanut paste",
      description: "Rich in fiber and healthy fats"
    },
    {
      time: "Lunch",
      icon: "☀️",
      meal: "Kontomire stew with boiled yam",
      description: "High in iron and folate"
    },
    {
      time: "Dinner",
      icon: "🌙",
      meal: "Light soup with okra and garden eggs",
      description: "Easy to digest, nutrient-rich"
    },
    {
      time: "Snacks",
      icon: "🍎",
      meal: "Boiled eggs, pawpaw slices",
      description: "Protein and vitamin C boost"
    }
  ]

  const lockedFeatures = [
    "Complete weekly meal plans",
    "Trimester-specific recommendations",
    "Shopping lists with local ingredients",
    "Nutritional breakdown for each meal",
    "Alternative meal options",
    "Portion size guidelines"
  ]

  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 font-poppins">
            Sample Preview of a Meal Plan
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto font-lora">
            Get a taste of what you'll unlock with personalized nutrition plans
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Sample Meal Plan */}
          <div data-aos="fade-right">
            <div className="bg-gradient-to-br from-pink-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 rounded-3xl p-8 shadow-xl">
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white font-poppins">
                    🍲 Sample Day
                  </h3>
                  <p className="text-[#e67d82] font-medium">Second Trimester</p>
                </div>
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>

              {/* Meal List */}
              <div className="space-y-6">
                {sampleMeals.map((meal, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-4 p-4 bg-white dark:bg-gray-800 rounded-2xl shadow-sm"
                    data-aos="fade-up"
                    data-aos-delay={index * 100}
                  >
                    {/* Time Icon */}
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-[#e67d82] to-[#7da8e6] rounded-full flex items-center justify-center text-white text-xl">
                      {meal.icon}
                    </div>

                    {/* Meal Details */}
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                          {meal.time}
                        </span>
                      </div>
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-1 font-poppins">
                        {meal.meal}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300 font-lora">
                        {meal.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Locked Features */}
          <div data-aos="fade-left" data-aos-delay="200">
            <div className="relative">
              {/* Blurred/Faded Section */}
              <div className="bg-gray-100 dark:bg-gray-800 rounded-3xl p-8 relative overflow-hidden">
                {/* Blur Overlay */}
                <div className="absolute inset-0 bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm z-10 rounded-3xl"></div>
                
                {/* Lock Icon */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
                  <div className="w-20 h-20 bg-gradient-to-br from-[#e67d82] to-[#7da8e6] rounded-full flex items-center justify-center shadow-2xl">
                    <Lock className="w-10 h-10 text-white" />
                  </div>
                </div>

                {/* Content Behind Blur */}
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white font-poppins mb-6">
                    🔒 Login to unlock your full personalized meal plan
                  </h3>
                  
                  {lockedFeatures.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <Utensils className="w-5 h-5 text-[#e67d82]" />
                      <span className="text-gray-700 dark:text-gray-300 font-lora">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Button */}
              <div className="text-center mt-8">
                <button 
                  onClick={() => alert("You need to be logged in to access this feature.")}
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold bg-gradient-to-r from-[#e67d82] to-[#7da8e6] text-white rounded-lg hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                >
                  <Lock className="w-5 h-5 mr-2" />
                  Unlock Full Meal Plans
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Info */}
        <div className="mt-16 text-center" data-aos="fade-up" data-aos-delay="400">
          <div className="bg-gradient-to-r from-[#e67d82]/10 to-[#7da8e6]/10 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 font-poppins">
              This is just a preview!
            </h3>
            <p className="text-gray-600 dark:text-gray-300 font-lora mb-6">
              Our full meal plans include detailed recipes, nutritional information, shopping lists, and alternatives for every meal. 
              Each plan is customized based on your trimester, dietary preferences, and health goals.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center space-x-2 bg-white dark:bg-gray-800 px-4 py-2 rounded-full">
                <span className="text-2xl">📱</span>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Mobile Friendly</span>
              </div>
              <div className="flex items-center space-x-2 bg-white dark:bg-gray-800 px-4 py-2 rounded-full">
                <span className="text-2xl">🇬🇭</span>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Ghanaian Focused</span>
              </div>
              <div className="flex items-center space-x-2 bg-white dark:bg-gray-800 px-4 py-2 rounded-full">
                <span className="text-2xl">👩‍⚕️</span>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Expert Approved</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SampleMealPlanSection
