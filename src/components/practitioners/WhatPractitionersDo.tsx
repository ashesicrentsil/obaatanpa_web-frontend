'use client'

import { User, BookOpen, Calendar, BarChart3 } from 'lucide-react'

const WhatPractitionersDo = () => {
  const features = [
    {
      icon: User,
      title: "Build Your Profile",
      description: "Create a comprehensive professional profile showcasing your expertise, qualifications, and areas of specialization. Set your availability and consultation preferences.",
      preview: "Profile setup with photo, credentials, specializations, and availability calendar",
      color: "from-[#F59297] to-pink-600",
      bgColor: "bg-pink-50 dark:bg-pink-900/20"
    },
    {
      icon: BookOpen,
      title: "Share Expert Resources",
      description: "Contribute valuable health articles, care tips, and educational content. Help build a comprehensive knowledge base for Ghanaian mothers.",
      preview: "Content management system for articles, tips, and educational materials",
      color: "from-[#7da8e6] to-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-900/20"
    },
    {
      icon: Calendar,
      title: "Manage Your Schedule",
      description: "Efficiently manage appointments and consultations through our integrated scheduling system. Confirm bookings, set availability, and organize your patient calendar.",
      preview: "Interactive calendar with appointment management and patient scheduling",
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50 dark:bg-green-900/20"
    },
    {
      icon: BarChart3,
      title: "Track Your Impact",
      description: "Monitor your consultations, patient interactions, and impact metrics through a comprehensive dashboard. Track your contribution to maternal health in Ghana.",
      preview: "Analytics dashboard showing patient metrics, consultation history, and impact data",
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50 dark:bg-purple-900/20"
    }
  ]

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            What Practitioners Can Do
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Get a preview of the powerful tools and features available to healthcare professionals 
            on the Obaatanpa platform. Everything you need to provide exceptional care.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`${feature.bgColor} rounded-2xl p-8 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1`}
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="flex items-start space-x-6">
                <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                    {feature.description}
                  </p>
                  
                  {/* Feature Preview */}
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-600">
                    <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mb-2">
                      Feature Preview:
                    </p>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {feature.preview}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Platform Benefits */}
        <div className="mt-16 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700" data-aos="fade-up" data-aos-delay="400">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Platform Benefits for Practitioners
            </h3>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Beyond the core features, our platform offers additional benefits designed 
              to support your professional growth and impact.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-[#F59297] to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">💼</span>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Professional Growth
              </h4>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Build your reputation, expand your network, and grow your practice through our platform.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-[#7da8e6] to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">🤝</span>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Peer Collaboration
              </h4>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Connect with fellow healthcare professionals and collaborate on complex cases.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">📊</span>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Impact Tracking
              </h4>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                See the real impact of your work with detailed analytics and patient outcomes.
              </p>
            </div>
          </div>
        </div>

        {/* Getting Started */}
        <div className="text-center mt-12" data-aos="fade-up" data-aos-delay="500">
          <div className="bg-gradient-to-r from-[#F59297]/10 to-[#7da8e6]/10 dark:from-pink-900/20 dark:to-blue-900/20 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Ready to Get Started?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
              Join our network of healthcare professionals and start making a difference 
              in the lives of Ghanaian mothers today.
            </p>
            <button className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#F59297] to-[#7da8e6] text-white font-semibold rounded-xl hover:from-[#e67d82] hover:to-[#6b9ce6] transition-all duration-300 shadow-lg hover:shadow-xl">
              <User className="w-5 h-5 mr-2" />
              Create Your Profile
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WhatPractitionersDo
