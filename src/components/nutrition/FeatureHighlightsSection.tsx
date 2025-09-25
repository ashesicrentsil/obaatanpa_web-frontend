'use client'

import { useEffect } from 'react'
import AOS from 'aos'
import { 
  Calendar, 
  MapPin, 
  Droplets, 
  AlertTriangle, 
  ChefHat, 
  Baby,
  CheckCircle 
} from 'lucide-react'

const FeatureHighlightsSection = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      mirror: true,
      easing: 'ease-in-out',
    })
  }, [])

  const features = [
    {
      icon: <Calendar className="w-6 h-6 text-[#e67d82]" />,
      title: "Weekly meal recommendations",
      description: "Personalized meal plans updated every week"
    },
    {
      icon: <MapPin className="w-6 h-6 text-[#7da8e6]" />,
      title: "Culturally appropriate meal ideas",
      description: "Kenkey, kontomire, and other Ghanaian favorites"
    },
    {
      icon: <Droplets className="w-6 h-6 text-[#e67d82]" />,
      title: "Hydration reminders",
      description: "Stay properly hydrated throughout your journey"
    },
    {
      icon: <AlertTriangle className="w-6 h-6 text-[#7da8e6]" />,
      title: "Foods to avoid by trimester",
      description: "Safety guidelines for each stage of pregnancy"
    },
    {
      icon: <ChefHat className="w-6 h-6 text-[#e67d82]" />,
      title: "Recipes and snack ideas",
      description: "Easy-to-follow recipes with local ingredients"
    },
    {
      icon: <Baby className="w-6 h-6 text-[#7da8e6]" />,
      title: "Baby feeding starter tips",
      description: "Introduction to solids for babies 6+ months"
    }
  ]

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 font-poppins">
            What You'll Get
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto font-lora">
            Comprehensive nutrition support designed specifically for Ghanaian mothers
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              {/* Check Icon and Feature Icon */}
              <div className="flex items-center mb-4">
                <div className="flex items-center justify-center w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-full mr-3">
                  <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <div className="flex items-center justify-center w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full group-hover:bg-gradient-to-br group-hover:from-pink-100 group-hover:to-blue-100 dark:group-hover:from-gray-600 dark:group-hover:to-gray-500 transition-all duration-300">
                  {feature.icon}
                </div>
              </div>

              {/* Title */}
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 font-poppins group-hover:text-[#e67d82] transition-colors duration-300">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed font-lora">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom Stats */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8" data-aos="fade-up" data-aos-delay="600">
          <div className="text-center">
            <div className="text-3xl font-bold text-[#e67d82] mb-2">500+</div>
            <div className="text-gray-600 dark:text-gray-300 font-lora">Healthy Recipes</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-[#7da8e6] mb-2">100%</div>
            <div className="text-gray-600 dark:text-gray-300 font-lora">Ghanaian Focused</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-[#e67d82] mb-2">24/7</div>
            <div className="text-gray-600 dark:text-gray-300 font-lora">Expert Support</div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12" data-aos="fade-up" data-aos-delay="800">
          <button 
            onClick={() => alert("You need to be logged in to access this feature.")}
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold bg-gradient-to-r from-[#e67d82] to-[#7da8e6] text-white rounded-lg hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
          >
            Unlock All Features
          </button>
        </div>
      </div>
    </section>
  )
}

export default FeatureHighlightsSection
