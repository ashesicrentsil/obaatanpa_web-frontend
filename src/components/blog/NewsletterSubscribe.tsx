'use client'

import { Mail, CheckCircle, Bell } from 'lucide-react'

const NewsletterSubscribe = () => {
  const benefits = [
    "Weekly expert articles delivered to your inbox",
    "Real mother stories and experiences",
    "Practical tips for every stage of motherhood",
    "Early access to new features and resources"
  ]

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div data-aos="fade-up">
          <div className="w-16 h-16 bg-gradient-to-br from-[#F59297] to-[#7da8e6] rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Mail className="w-8 h-8 text-white" />
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Stay Updated with Our Newsletter
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Get our latest blogs in your inbox — tips, stories, and expert advice every week. 
            Join thousands of Ghanaian mothers on their journey.
          </p>

          {/* Benefits List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 max-w-2xl mx-auto">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center text-left">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                <span className="text-gray-600 dark:text-gray-300">{benefit}</span>
              </div>
            ))}
          </div>

          {/* Newsletter Form */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-200 dark:border-gray-700 max-w-md mx-auto">
            <div className="flex items-center justify-center mb-4">
              <Bell className="w-5 h-5 text-[#F59297] mr-2" />
              <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                Join 5,000+ mothers
              </span>
            </div>
            
            <div className="space-y-4">
              <input
                type="email"
                placeholder="Enter your email address"
                className="w-full px-4 py-4 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-[#F59297] focus:border-transparent"
              />
              <button className="w-full bg-gradient-to-r from-[#F59297] to-[#7da8e6] text-white py-4 rounded-xl font-semibold hover:from-[#e67d82] hover:to-[#6b9ce6] transition-all duration-300 shadow-lg hover:shadow-xl">
                Subscribe Now
              </button>
            </div>
            
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default NewsletterSubscribe
