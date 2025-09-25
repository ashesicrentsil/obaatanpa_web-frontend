'use client'

import { MapPin, Users, Smartphone, Heart } from 'lucide-react'

const WhatMakesUsDifferent = () => {
  const features = [
    {
      icon: MapPin,
      title: "Ghanaian-Focused Content",
      description: "Tailored specifically for Ghanaian mothers with local hospitals, traditional foods, and cultural practices in mind.",
      color: "from-[#F59297] to-pink-600",
      bgColor: "bg-pink-50 dark:bg-pink-900/20"
    },
    {
      icon: Users,
      title: "Backed by Real Midwives & Mothers",
      description: "Our content is created and verified by qualified Ghanaian healthcare professionals and experienced mothers.",
      color: "from-[#7da8e6] to-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-900/20"
    },
    {
      icon: Smartphone,
      title: "Easy Tools for Everything",
      description: "Simple, intuitive tools for nutrition tracking, hospital finder, appointment booking, and expert consultations.",
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50 dark:bg-purple-900/20"
    },
    {
      icon: Heart,
      title: "Built with Empathy & Understanding",
      description: "Every feature is designed with deep cultural understanding and genuine care for the Ghanaian motherhood experience.",
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50 dark:bg-green-900/20"
    }
  ]

  return (
    <section className="py-16 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            What Makes Obaatanpa Different
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            We're not just another health app. We're a platform built by Ghanaians, for Ghanaians, 
            with deep understanding of our unique needs and culture.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`${feature.bgColor} rounded-2xl p-8 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1`}
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="flex items-start space-x-4">
                <div className={`w-14 h-14 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg`}>
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12" data-aos="fade-up" data-aos-delay="400">
          <div className="bg-gradient-to-r from-[#F59297]/10 to-[#7da8e6]/10 dark:from-pink-900/20 dark:to-blue-900/20 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Experience the Difference
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
              Join thousands of Ghanaian mothers who have found their trusted companion in Obaatanpa. 
              Your journey to confident motherhood starts here.
            </p>
            <button className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#F59297] to-[#7da8e6] text-white font-semibold rounded-xl hover:from-[#e67d82] hover:to-[#6b9ce6] transition-all duration-300 shadow-lg hover:shadow-xl">
              <Heart className="w-5 h-5 mr-2" fill="currentColor" />
              Start Your Journey
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WhatMakesUsDifferent
