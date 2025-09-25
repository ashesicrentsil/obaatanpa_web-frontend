'use client'

import Image from 'next/image'
import { Hospital, BookOpen, Utensils, UserCheck, Calendar, MessageCircle } from 'lucide-react'

const WhyObaatanpaSection = () => {
  const features = [
    {
      icon: Hospital,
      title: 'Find Trusted Hospitals',
      description: 'Location-based hospital search with verified reviews and ratings from other mothers.',
      image: '/images/features/hospital-search.jpg',
      gradient: 'from-blue-600/80 to-blue-800/80'
    },
    {
      icon: BookOpen,
      title: 'Educational Resources',
      description: 'Comprehensive guides on baby care, breastfeeding, and pregnancy stages from experts.',
      image: '/images/features/educational-resources.jpg',
      gradient: 'from-green-600/80 to-green-800/80'
    },
    {
      icon: Utensils,
      title: 'Nutrition Plans',
      description: 'Culturally appropriate meal suggestions and nutrition guidance for Ghanaian mothers.',
      image: '/images/features/nutrition-plans.jpg',
      gradient: 'from-orange-600/80 to-orange-800/80'
    },
    {
      icon: UserCheck,
      title: 'Ask a Midwife',
      description: 'Get professional answers and guidance from certified midwives and healthcare experts.',
      image: '/images/features/ask-midwife.jpg',
      gradient: 'from-purple-600/80 to-purple-800/80'
    },
    {
      icon: Calendar,
      title: 'Appointments & Reminders',
      description: 'Stay on track with doctor visits, vaccinations, and important pregnancy milestones.',
      image: '/images/features/appointments.jpg',
      gradient: 'from-pink-600/80 to-pink-800/80'
    },
    {
      icon: MessageCircle,
      title: 'Community Support',
      description: 'Connect with other mothers, share experiences, and get support from the community.',
      image: '/images/features/community-support.jpg',
      gradient: 'from-indigo-600/80 to-indigo-800/80'
    }
  ]

  return (
    <section className="py-20 bg-white dark:bg-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16" data-aos="fade-up">
          <div className="inline-flex items-center bg-primary-100 dark:bg-primary-900/30 rounded-full px-4 py-2 mb-4">
            <span className="text-primary-600 dark:text-primary-400 font-medium text-sm">Why Choose Us</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Why <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-secondary-500">Obaatanpa</span>?
          </h2>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Your comprehensive companion for pregnancy, motherhood, and baby care — designed specifically for Ghanaian families with culturally relevant guidance and support.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon
            return (
              <div
                key={index}
                className="group relative rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 h-80"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                {/* Background Image */}
                <div className="absolute inset-0">
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-black/30 z-[1]" />
<div className={`absolute inset-0 bg-gradient-to-t ${feature.gradient} to-transparent opacity-80 z-[2] transition-opacity duration-300 group-hover:opacity-90`} />


                {/* Content Overlay */}
                <div className="relative z-10 h-full flex flex-col justify-end p-6 text-white">
                  {/* Icon */}
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold mb-3 group-hover:text-yellow-200 transition-colors duration-300">
                    {feature.title}
                  </h3>

                  <p className="text-white/90 leading-relaxed text-sm">
                    {feature.description}
                  </p>

                  {/* Hover Effect Arrow */}
                  <div className="mt-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <div className="inline-flex items-center text-yellow-200 font-medium text-sm">
                      Learn more
                      <svg className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16" data-aos="fade-up" data-aos-delay="600">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl p-8 text-white">
            <div className="text-center sm:text-left">
              <h3 className="text-2xl font-bold mb-2">Ready to start your journey?</h3>
              <p className="text-primary-100">Join thousands of mothers who trust Obaatanpa for their pregnancy care.</p>
            </div>
            <button className="bg-white text-primary-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-lg whitespace-nowrap">
              Get Started Today
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WhyObaatanpaSection
