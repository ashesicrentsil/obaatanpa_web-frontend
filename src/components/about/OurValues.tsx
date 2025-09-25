'use client'

import { Heart, BookOpen, Globe, Shield } from 'lucide-react'

const OurValues = () => {
  const values = [
    {
      icon: Heart,
      title: "Compassion",
      subtitle: "Every mother deserves kindness",
      description: "We approach every interaction with empathy, understanding that each mother's journey is unique and deserves respect and care.",
      color: "from-[#F59297] to-pink-600",
      bgColor: "bg-pink-50 dark:bg-pink-900/20"
    },
    {
      icon: BookOpen,
      title: "Education",
      subtitle: "Informed moms make safer choices",
      description: "We believe knowledge is power. By providing accurate, culturally-relevant information, we empower mothers to make confident decisions.",
      color: "from-[#7da8e6] to-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-900/20"
    },
    {
      icon: Globe,
      title: "Accessibility",
      subtitle: "No woman left behind, no matter where",
      description: "Healthcare shouldn't depend on location or status. We're committed to reaching every Ghanaian mother, everywhere.",
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50 dark:bg-green-900/20"
    },
    {
      icon: Shield,
      title: "Privacy",
      subtitle: "Your journey is safe with us",
      description: "We protect your personal information with the highest standards of security and confidentiality. Your trust is sacred to us.",
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50 dark:bg-purple-900/20"
    }
  ]

  return (
    <section className="py-16 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Our Values
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            These core principles guide everything we do at Obaatanpa. They're not just words on a page — 
            they're the foundation of how we serve you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {values.map((value, index) => (
            <div
              key={index}
              className={`${value.bgColor} rounded-2xl p-8 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1`}
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="flex items-start space-x-6">
                <div className={`w-16 h-16 bg-gradient-to-br ${value.color} rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg`}>
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {value.title}
                  </h3>
                  <p className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-3">
                    {value.subtitle}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Values in Action */}
        <div className="mt-16 bg-gradient-to-r from-[#F59297]/5 to-[#7da8e6]/5 dark:from-pink-900/10 dark:to-blue-900/10 rounded-2xl p-8" data-aos="fade-up" data-aos-delay="400">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Values in Action
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              These aren't just ideals — they're reflected in every feature we build, 
              every interaction we design, and every piece of content we create.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-[#F59297] to-pink-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <span className="text-white font-bold text-lg">24/7</span>
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Always Available</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Support when you need it most</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-[#7da8e6] to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <span className="text-white font-bold text-lg">100%</span>
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Expert Verified</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">All content reviewed by professionals</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <span className="text-white font-bold text-lg">0</span>
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Cost Barriers</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Core features always free</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default OurValues
