'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import AOS from 'aos'
import { ArrowRight, Utensils, Heart, Star, CheckCircle } from 'lucide-react'

const NutritionMainCTASection = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      mirror: true,
      easing: 'ease-in-out',
    })
  }, [])

  const handleSignUp = () => {
    alert("You need to be logged in to access this feature.")
  }

  const handleLogin = () => {
    alert("You need to be logged in to access this feature.")
  }

  const benefits = [
    {
      icon: <Utensils className="w-6 h-6 text-white" />,
      text: "Personalized Meal Plans"
    },
    {
      icon: <Heart className="w-6 h-6 text-white" />,
      text: "Expert Nutrition Guidance"
    },
    {
      icon: <Star className="w-6 h-6 text-white" />,
      text: "Ghanaian Food Focus"
    }
  ]

  const features = [
    "Weekly customized meal plans",
    "Trimester-specific recommendations", 
    "Local ingredient shopping lists",
    "Expert nutritionist consultations",
    "Baby feeding guidance",
    "24/7 support community"
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-[#e67d82] via-[#7da8e6] to-[#F59297] relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-white/5 rounded-full blur-lg"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-white" data-aos="fade-right">
            {/* Main Heading */}
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight font-poppins">
              Get nutrition plans tailored to your body and stage of motherhood
            </h2>

            {/* Subheading */}
            <p className="text-xl text-white/90 mb-8 leading-relaxed font-lora">
              Join thousands of Ghanaian mothers who trust Obaatanpa for expert nutrition guidance throughout their motherhood journey.
            </p>

            {/* Benefits List */}
            <div className="flex flex-wrap gap-4 mb-8">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2"
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  {benefit.icon}
                  <span className="text-white font-medium">{benefit.text}</span>
                </div>
              ))}
            </div>

            {/* Feature List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3"
                  data-aos="fade-up"
                  data-aos-delay={index * 50}
                >
                  <CheckCircle className="w-5 h-5 text-white flex-shrink-0" />
                  <span className="text-white/90 font-lora">{feature}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleSignUp}
                className="group inline-flex items-center justify-center px-8 py-4 text-lg font-semibold bg-white text-[#e67d82] rounded-lg hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                🔘 Sign Up for Free
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
              
              <button
                onClick={handleLogin}
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold border-2 border-white text-white rounded-lg hover:bg-white hover:text-[#e67d82] transition-all duration-300"
              >
                🔘 Login to Get Started
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="mt-8 pt-8 border-t border-white/20">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-white">1000+</div>
                  <div className="text-white/80 text-sm">Meal Plans</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">100%</div>
                  <div className="text-white/80 text-sm">Free to Join</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">24/7</div>
                  <div className="text-white/80 text-sm">Expert Support</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Image */}
          <div className="relative" data-aos="fade-left" data-aos-delay="200">
            <div className="relative">
              <Image
                src="/images/nutrition/happy-mother-healthy-food.png"
                alt="Happy mother with healthy Ghanaian food and baby"
                width={600}
                height={500}
                className="w-full h-auto max-w-md lg:max-w-lg mx-auto rounded-3xl shadow-2xl object-cover"
              />
              
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 bg-white rounded-2xl p-4 shadow-xl">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-gray-700">Nutrition Plan Active</span>
                </div>
              </div>
              
              <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl p-4 shadow-xl">
                <div className="flex items-center space-x-2">
                  <Utensils className="w-4 h-4 text-[#e67d82]" />
                  <span className="text-sm font-medium text-gray-700">Meal Ready</span>
                </div>
              </div>

              {/* Success Badge */}
              <div className="absolute top-4 left-4 bg-gradient-to-r from-green-500 to-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                ✓ Healthy Choice
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default NutritionMainCTASection
