'use client'

import Image from 'next/image'
import Link from 'next/link'
import { MessageCircle, Phone, Video, Clock, Users, Star } from 'lucide-react'

const ExpertsCTA = () => {
  const experts = [
    {
      id: 1,
      name: 'Dr. Akosua Mensah',
      title: 'Senior Obstetrician',
      image: '/images/experts/dr-akosua.png',
      rating: 4.9,
      consultations: '2.5K+'
    },
    {
      id: 2,
      name: 'Midwife Sarah Osei',
      title: 'Certified Midwife',
      image: '/images/experts/midwife-sarah.jpg',
      rating: 4.8,
      consultations: '1.8K+'
    },
    {
      id: 3,
      name: 'Dr. Kwame Asante',
      title: 'Pediatrician',
      image: '/images/experts/dr-kwame.jpg',
      rating: 4.9,
      consultations: '3.1K+'
    }
  ]

  const consultationOptions = [
    {
      icon: MessageCircle,
      title: 'Chat Consultation',
      description: 'Get instant answers via text chat',
      duration: 'Real-time',
      price: 'Free for first question',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Phone,
      title: 'Phone Call',
      description: 'Speak directly with an expert',
      duration: '15-30 minutes',
      price: 'GHS 50',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: Video,
      title: 'Video Consultation',
      description: 'Face-to-face consultation',
      duration: '30-45 minutes',
      price: 'GHS 80',
      color: 'from-purple-500 to-purple-600'
    }
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16" data-aos="fade-up">
          <div className="inline-flex items-center bg-primary-100 dark:bg-primary-900/30 rounded-full px-4 py-2 mb-4">
            <MessageCircle className="w-4 h-4 text-primary-600 dark:text-primary-400 mr-2" />
            <span className="text-primary-600 dark:text-primary-400 font-medium text-sm">Expert Support</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Have Questions About What{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-secondary-500">
              You Just Read?
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Don't let questions go unanswered. Chat with certified midwives and healthcare professionals who understand your journey.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Side - Consultation Options */}
          <div data-aos="fade-right">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-8">
              Choose Your Consultation Method
            </h3>
            
            <div className="space-y-6">
              {consultationOptions.map((option, index) => {
                const IconComponent = option.icon
                return (
                  <div
                    key={index}
                    className="group bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 dark:border-gray-700"
                  >
                    <div className="flex items-start space-x-4">
                      <div className={`flex-shrink-0 w-12 h-12 bg-gradient-to-r ${option.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                            {option.title}
                          </h4>
                          <span className="text-primary-600 dark:text-primary-400 font-bold">
                            {option.price}
                          </span>
                        </div>
                        
                        <p className="text-gray-600 dark:text-gray-300 mb-2">
                          {option.description}
                        </p>
                        
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                          <Clock className="w-4 h-4 mr-1" />
                          <span>{option.duration}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* CTA Button */}
            <div className="mt-8">
              <Link
                href="/ask-midwife"
                className="inline-flex items-center bg-gradient-to-r from-primary-500 to-primary-600 text-white px-8 py-4 rounded-full font-semibold hover:from-primary-600 hover:to-primary-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Ask a Midwife Now
              </Link>
            </div>
          </div>

          {/* Right Side - Expert Profiles */}
          <div data-aos="fade-left" data-aos-delay="200">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center lg:text-left">
              Meet Our Experts
            </h3>
            
            <div className="space-y-6">
              {experts.map((expert, index) => (
                <div
                  key={expert.id}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <div className="flex items-center space-x-4">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden">
                      <Image
                        src={expert.image}
                        alt={expert.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {expert.name}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">
                        {expert.title}
                      </p>
                      
                      <div className="flex items-center space-x-4 text-sm">
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-500 mr-1" fill="currentColor" />
                          <span className="text-gray-700 dark:text-gray-300">{expert.rating}</span>
                        </div>
                        <div className="flex items-center">
                          <Users className="w-4 h-4 text-gray-500 mr-1" />
                          <span className="text-gray-500 dark:text-gray-400">{expert.consultations} consultations</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex-shrink-0">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Trust Indicators */}
            <div className="mt-8 bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 rounded-2xl p-6">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">24/7</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Available</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">5K+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Happy Mothers</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">4.9★</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Average Rating</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ExpertsCTA
