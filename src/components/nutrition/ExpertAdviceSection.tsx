'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import AOS from 'aos'
import { Quote, Award, Heart, Droplets } from 'lucide-react'

const ExpertAdviceSection = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      mirror: true,
      easing: 'ease-in-out',
    })
  }, [])

  const expertAdvice = [
    {
      quote: "Iron and folic acid are essential during the second trimester. Include kontomire, spinach, and lean meats in your daily meals.",
      expert: "Obaatanpa Nutritionist",
      credential: "Registered Dietitian",
      icon: <Heart className="w-8 h-8 text-[#e67d82]" />,
      image: "/images/experts/user-1.png",
      tip: "Iron Intake"
    },
    {
      quote: "Stay hydrated — aim for 8 cups of water daily, especially if breastfeeding. Add lemon or cucumber for variety.",
      expert: "Dr. Ama Osei",
      credential: "Maternal Health Specialist",
      icon: <Droplets className="w-8 h-8 text-[#7da8e6]" />,
      image: "/images/experts/user-2.jpg",
      tip: "Hydration"
    }
  ]

  const trustIndicators = [
    {
      icon: <Award className="w-6 h-6 text-[#e67d82]" />,
      title: "Expert-Verified Content",
      description: "All advice reviewed by certified nutritionists"
    },
    {
      icon: <Heart className="w-6 h-6 text-[#7da8e6]" />,
      title: "24/7 Support",
      description: "Get help whenever you need it"
    },
    {
      icon: <Quote className="w-6 h-6 text-[#e67d82]" />,
      title: "Culturally Relevant",
      description: "Advice tailored to Ghanaian lifestyle"
    }
  ]

  return (
    <section className="py-16 bg-gradient-to-br from-pink-50 to-blue-50 dark:from-gray-800 dark:to-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 font-poppins">
            Expert Advice Snippets
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto font-lora">
            Get trusted nutrition guidance from our team of certified professionals
          </p>
        </div>

        {/* Expert Advice Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {expertAdvice.map((advice, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              data-aos="fade-up"
              data-aos-delay={index * 200}
            >
              {/* Quote Icon */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  {advice.icon}
                  <span className="text-sm font-semibold text-[#e67d82] uppercase tracking-wide">
                    {advice.tip}
                  </span>
                </div>
                <Quote className="w-8 h-8 text-gray-300 dark:text-gray-600" />
              </div>

              {/* Quote Text */}
              <blockquote className="text-lg text-gray-700 dark:text-gray-300 font-lora italic mb-6 leading-relaxed">
                "{advice.quote}"
              </blockquote>

              {/* Expert Info */}
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Image
                    src={advice.image}
                    alt={advice.expert}
                    width={60}
                    height={60}
                    className="w-15 h-15 rounded-full object-cover border-3 border-gradient-to-r from-[#e67d82] to-[#7da8e6]"
                  />
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white dark:border-gray-800 flex items-center justify-center">
                    <Award className="w-3 h-3 text-white" />
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white font-poppins">
                    {advice.expert}
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {advice.credential}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8" data-aos="fade-up" data-aos-delay="400">
          {trustIndicators.map((indicator, index) => (
            <div
              key={index}
              className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/80 dark:hover:bg-gray-800/80 transition-all duration-300"
              data-aos="fade-up"
              data-aos-delay={index * 100 + 500}
            >
              {/* Icon */}
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-white dark:bg-gray-700 rounded-full flex items-center justify-center shadow-lg">
                  {indicator.icon}
                </div>
              </div>

              {/* Title */}
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 font-poppins">
                {indicator.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 dark:text-gray-300 text-sm font-lora">
                {indicator.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16" data-aos="fade-up" data-aos-delay="600">
          <div className="bg-gradient-to-r from-[#e67d82] to-[#7da8e6] rounded-3xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4 font-poppins">
              Want personalized advice from our experts?
            </h3>
            <p className="text-lg mb-6 opacity-90 font-lora">
              Join Obaatanpa to get direct access to our team of nutritionists and maternal health specialists
            </p>
            <button 
              onClick={() => alert("You need to be logged in to access this feature.")}
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold bg-white text-[#e67d82] rounded-lg hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Get Expert Guidance
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ExpertAdviceSection
