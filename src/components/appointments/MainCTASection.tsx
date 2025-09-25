'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import AOS from 'aos'
import { ArrowRight, Heart, Shield, Users } from 'lucide-react'

const MainCTASection = () => {
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
      icon: <Heart className="w-6 h-6 text-white" />,
      text: "Personalized Care"
    },
    {
      icon: <Shield className="w-6 h-6 text-white" />,
      text: "Verified Professionals"
    },
    {
      icon: <Users className="w-6 h-6 text-white" />,
      text: "Community Support"
    }
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
              Ready to take control of your pregnancy journey?
            </h2>

            {/* Subheading */}
            <p className="text-xl text-white/90 mb-8 leading-relaxed font-lora">
              Sign up today to access personalized care and support from Ghana's most trusted maternal healthcare platform.
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

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleSignUp}
                className="group inline-flex items-center justify-center px-8 py-4 text-lg font-semibold bg-white text-[#e67d82] rounded-lg hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                🔘 Sign Up
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
              
              <button
                onClick={handleLogin}
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold border-2 border-white text-white rounded-lg hover:bg-white hover:text-[#e67d82] transition-all duration-300"
              >
                🔘 Login
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="mt-8 pt-8 border-t border-white/20">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-white">500+</div>
                  <div className="text-white/80 text-sm">Happy Mothers</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">50+</div>
                  <div className="text-white/80 text-sm">Partner Hospitals</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">24/7</div>
                  <div className="text-white/80 text-sm">Support Available</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Image */}
          <div className="relative" data-aos="fade-left" data-aos-delay="200">
            <div className="relative">
              <Image
                src="/images/appointments/happy-pregnant-woman-phone.png"
                alt="Happy pregnant woman using phone to book appointment"
                width={600}
                height={500}
                className="w-full h-auto max-w-md lg:max-w-lg mx-auto rounded-3xl shadow-2xl object-cover"
              />
              
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 bg-white rounded-2xl p-4 shadow-xl">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-gray-700">Appointment Confirmed</span>
                </div>
              </div>
              
              <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl p-4 shadow-xl">
                <div className="flex items-center space-x-2">
                  <Heart className="w-4 h-4 text-[#e67d82]" />
                  <span className="text-sm font-medium text-gray-700">Care Team Ready</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default MainCTASection
