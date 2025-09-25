'use client'

import { useState } from 'react'
import { Mail, Gift, Calendar, BookOpen, Heart, CheckCircle } from 'lucide-react'

const NewsletterCTA = () => {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !name) return

    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsSubscribed(true)
      setIsLoading(false)
      setEmail('')
      setName('')
    }, 2000)
  }

  const benefits = [
    {
      icon: Calendar,
      title: 'Weekly Tips',
      description: 'Get personalized tips based on your pregnancy week'
    },
    {
      icon: BookOpen,
      title: 'Latest Articles',
      description: 'Be the first to read our newest resources'
    },
    {
      icon: Gift,
      title: 'Exclusive Content',
      description: 'Access subscriber-only guides and checklists'
    },
    {
      icon: Heart,
      title: 'Community Updates',
      description: 'Stay connected with our growing community'
    }
  ]

  if (isSubscribed) {
    return (
      <section className="py-20 bg-gradient-to-br from-green-50 via-white to-emerald-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-12 shadow-2xl border border-gray-100 dark:border-gray-700" data-aos="zoom-in">
            <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Welcome to the Obaatanpa Family! 🎉
            </h2>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Thank you for subscribing! Check your email for a welcome message with your first exclusive resource.
            </p>
            
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-6">
              <p className="text-green-700 dark:text-green-300 font-medium">
                🎁 Your free "New Mom Survival Kit" is on its way to your inbox!
              </p>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-2xl border border-gray-100 dark:border-gray-700">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Left Side - Content */}
            <div className="p-8 md:p-12" data-aos="fade-right">
              <div className="inline-flex items-center bg-primary-100 dark:bg-primary-900/30 rounded-full px-4 py-2 mb-6">
                <Mail className="w-4 h-4 text-primary-600 dark:text-primary-400 mr-2" />
                <span className="text-primary-600 dark:text-primary-400 font-medium text-sm">Free Newsletter</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Want Weekly Tips &{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-secondary-500">
                  Updates?
                </span>
              </h2>
              
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                Join over 10,000 Ghanaian mothers who receive our weekly newsletter with personalized tips, latest articles, and exclusive resources.
              </p>

              {/* Benefits */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {benefits.map((benefit, index) => {
                  const IconComponent = benefit.icon
                  return (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
                        <IconComponent className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
                          {benefit.title}
                        </h4>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">
                          {benefit.description}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Trust Indicators */}
              <div className="flex items-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  <span>10K+ subscribers</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                  <span>No spam, ever</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                  <span>Unsubscribe anytime</span>
                </div>
              </div>
            </div>

            {/* Right Side - Form */}
            <div className="bg-gradient-to-br from-primary-500 to-secondary-600 p-8 md:p-12 flex items-center" data-aos="fade-left" data-aos-delay="200">
              <div className="w-full">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
                    <Gift className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Get Your Free Welcome Gift!
                  </h3>
                  <p className="text-white/90">
                    Subscribe now and receive our "New Mom Survival Kit" instantly
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your first name"
                      className="w-full px-4 py-4 rounded-xl border-0 focus:outline-none focus:ring-2 focus:ring-white/50 bg-white/10 backdrop-blur-sm text-white placeholder-white/70 text-lg"
                      required
                    />
                  </div>
                  
                  <div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Your email address"
                      className="w-full px-4 py-4 rounded-xl border-0 focus:outline-none focus:ring-2 focus:ring-white/50 bg-white/10 backdrop-blur-sm text-white placeholder-white/70 text-lg"
                      required
                    />
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-white text-primary-600 py-4 rounded-xl font-bold text-lg hover:bg-gray-50 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <div className="w-5 h-5 border-2 border-primary-600 border-t-transparent rounded-full animate-spin mr-2"></div>
                        Subscribing...
                      </div>
                    ) : (
                      'Subscribe & Get Free Gift'
                    )}
                  </button>
                </form>

                <p className="text-white/70 text-xs text-center mt-4">
                  By subscribing, you agree to our Privacy Policy and Terms of Service.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default NewsletterCTA
