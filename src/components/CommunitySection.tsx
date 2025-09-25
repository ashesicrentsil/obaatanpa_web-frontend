'use client'

import { useState } from 'react'
import { Users, MessageCircle, Heart, Mail, Bell, ArrowRight, CheckCircle } from 'lucide-react'

const CommunitySection = () => {
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsSubscribed(true)
    setIsLoading(false)
    setEmail('')
  }

  const communityStats = [
    {
      icon: Users,
      number: '2,000+',
      label: 'Active Members',
      description: 'Ghanaian women supporting each other'
    },
    {
      icon: MessageCircle,
      number: '500+',
      label: 'Daily Conversations',
      description: 'Questions answered and experiences shared'
    },
    {
      icon: Heart,
      number: '50+',
      label: 'Expert Contributors',
      description: 'Midwives, doctors, and specialists'
    }
  ]

  return (
    <section className="py-20 bg-white dark:bg-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Community Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Left Content */}
          <div data-aos="fade-right">
            <div className="inline-flex items-center bg-primary-100 dark:bg-primary-900/30 rounded-full px-4 py-2 mb-4">
              <Users className="w-4 h-4 text-primary-600 dark:text-primary-400 mr-2" />
              <span className="text-primary-600 dark:text-primary-400 font-medium text-sm">Community</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Join Our{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-secondary-500">
                Supportive Community
              </span>
            </h2>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              Connect with fellow Ghanaian mothers, share experiences, ask questions, and receive support from our caring community of women who understand your journey.
            </p>

            {/* Community Stats */}
            <div className="space-y-6 mb-8">
              {communityStats.map((stat, index) => {
                const IconComponent = stat.icon
                return (
                  <div key={index} className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="flex items-baseline space-x-2">
                        <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                          {stat.number}
                        </span>
                        <span className="text-lg font-semibold text-gray-900 dark:text-white">
                          {stat.label}
                        </span>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        {stat.description}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>

            <button className="group inline-flex items-center bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-8 py-4 rounded-full font-semibold hover:from-primary-600 hover:to-secondary-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
              Join the Community
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>

          {/* Right Content - Community Preview */}
          <div className="relative" data-aos="fade-left" data-aos-delay="200">
            <div className="bg-gray-50 dark:bg-gray-700 rounded-3xl p-8 shadow-xl">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Recent Community Activity</h3>
              
              <div className="space-y-4">
                {/* Sample Community Posts */}
                <div className="bg-white dark:bg-gray-600 rounded-2xl p-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                      AM
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-semibold text-gray-900 dark:text-white text-sm">Akosua M.</span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">2 hours ago</span>
                      </div>
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        "Just had my 20-week scan! Baby is healthy and growing well. Thank you for all the nutrition tips! 💕"
                      </p>
                      <div className="flex items-center space-x-4 mt-2">
                        <button className="flex items-center space-x-1 text-xs text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">
                          <Heart className="w-3 h-3" />
                          <span>12</span>
                        </button>
                        <button className="flex items-center space-x-1 text-xs text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">
                          <MessageCircle className="w-3 h-3" />
                          <span>5</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-600 rounded-2xl p-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                      EO
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-semibold text-gray-900 dark:text-white text-sm">Efua O.</span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">4 hours ago</span>
                      </div>
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        "Any recommendations for good maternity hospitals in Kumasi? First-time mom here! 🤱"
                      </p>
                      <div className="flex items-center space-x-4 mt-2">
                        <button className="flex items-center space-x-1 text-xs text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">
                          <Heart className="w-3 h-3" />
                          <span>8</span>
                        </button>
                        <button className="flex items-center space-x-1 text-xs text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">
                          <MessageCircle className="w-3 h-3" />
                          <span>15</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-600 rounded-2xl p-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                      AB
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-semibold text-gray-900 dark:text-white text-sm">Adwoa B.</span>
                        <span className="bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 px-2 py-0.5 rounded-full text-xs font-medium">Midwife</span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">6 hours ago</span>
                      </div>
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        "Remember to stay hydrated during this harmattan season! It's especially important during pregnancy. 💧"
                      </p>
                      <div className="flex items-center space-x-4 mt-2">
                        <button className="flex items-center space-x-1 text-xs text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">
                          <Heart className="w-3 h-3" />
                          <span>25</span>
                        </button>
                        <button className="flex items-center space-x-1 text-xs text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">
                          <MessageCircle className="w-3 h-3" />
                          <span>8</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 text-center">
                <button className="text-primary-600 dark:text-primary-400 font-medium text-sm hover:text-primary-700 dark:hover:text-primary-300 transition-colors duration-200">
                  View all discussions →
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-3xl p-8 md:p-12 text-white" data-aos="fade-up">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center bg-white/20 rounded-full px-4 py-2 mb-6">
              <Mail className="w-4 h-4 mr-2" />
              <span className="font-medium text-sm">Weekly Newsletter</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Stay Connected with Weekly Tips
            </h2>
            
            <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
              Get expert advice on pregnancy stages, baby care, nutrition tips, and community highlights delivered to your inbox every week.
            </p>

            {!isSubscribed ? (
              <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto">
                <div className="flex flex-col sm:flex-row gap-4">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="flex-1 px-6 py-4 rounded-full text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-white/30"
                    required
                  />
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="bg-white text-primary-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                  >
                    {isLoading ? (
                      <div className="flex items-center">
                        <div className="spinner mr-2"></div>
                        Subscribing...
                      </div>
                    ) : (
                      'Subscribe Now'
                    )}
                  </button>
                </div>
              </form>
            ) : (
              <div className="max-w-md mx-auto bg-white/20 rounded-2xl p-6">
                <div className="flex items-center justify-center mb-4">
                  <CheckCircle className="w-12 h-12 text-green-300" />
                </div>
                <h3 className="text-xl font-bold mb-2">Welcome to our community!</h3>
                <p className="text-primary-100">
                  You'll receive your first newsletter within the next few days. Thank you for joining us!
                </p>
              </div>
            )}

            <div className="mt-8 flex flex-wrap justify-center items-center gap-6 text-sm text-primary-100">
              <div className="flex items-center">
                <Bell className="w-4 h-4 mr-2" />
                <span>Weekly delivery</span>
              </div>
              <div className="flex items-center">
                <Heart className="w-4 h-4 mr-2" />
                <span>Expert-curated content</span>
              </div>
              <div className="flex items-center">
                <Users className="w-4 h-4 mr-2" />
                <span>Community highlights</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CommunitySection
