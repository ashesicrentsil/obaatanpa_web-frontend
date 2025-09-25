'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import AOS from 'aos'
import { Heart, Utensils, Baby } from 'lucide-react'

const WhyNutritionMattersSection = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      mirror: true,
      easing: 'ease-in-out',
    })
  }, [])

  const nutritionCards = [
    {
      icon: <Heart className="w-12 h-12 text-[#e67d82]" />,
      emoji: "🥦",
      title: "Pregnancy Nutrition",
      description: "Get trimester-based meal suggestions to support your baby's development.",
      image: "/images/nutrition/pregnancy-nutrition.jpg"
    },
    {
      icon: <Utensils className="w-12 h-12 text-[#7da8e6]" />,
      emoji: "🍽️",
      title: "Postpartum & Breastfeeding",
      description: "Boost recovery and milk production with balanced Ghanaian meals.",
      image: "/images/nutrition/postpartum-nutrition.jpg"
    },
    {
      icon: <Baby className="w-12 h-12 text-[#e67d82]" />,
      emoji: "🍼",
      title: "Baby Feeding Guidance",
      description: "Learn when and how to introduce solids after birth.",
      image: "/images/nutrition/baby-feeding.jpg"
    }
  ]

  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 font-poppins">
            Why Nutrition Matters
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto font-lora">
            Proper nutrition is essential at every stage of your motherhood journey
          </p>
        </div>

        {/* Nutrition Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {nutritionCards.map((card, index) => (
            <div
              key={index}
              className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden"
              data-aos="fade-up"
              data-aos-delay={index * 150}
            >
              {/* Card Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={card.image}
                  alt={card.title}
                  width={400}
                  height={200}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                
                {/* Emoji Badge */}
                <div className="absolute top-4 left-4 w-12 h-12 bg-white/90 dark:bg-gray-800/90 rounded-full flex items-center justify-center text-2xl">
                  {card.emoji}
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6">
                {/* Icon */}
                <div className="flex justify-center mb-4">
                  {card.icon}
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 text-center font-poppins">
                  {card.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 dark:text-gray-300 text-center leading-relaxed font-lora">
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12" data-aos="fade-up" data-aos-delay="600">
          <div className="bg-gradient-to-r from-[#e67d82]/10 to-[#7da8e6]/10 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 font-poppins">
              Ready to start your nutrition journey?
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 font-lora">
              Get personalized meal plans and expert guidance tailored to your stage of motherhood
            </p>
            <button 
              onClick={() => alert("You need to be logged in to access this feature.")}
              className="inline-flex items-center justify-center px-8 py-3 text-lg font-semibold bg-gradient-to-r from-[#e67d82] to-[#7da8e6] text-white rounded-lg hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
            >
              Get Started Today
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WhyNutritionMattersSection
