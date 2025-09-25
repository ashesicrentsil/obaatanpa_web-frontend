'use client'

import { PenTool, Heart, Users, Award } from 'lucide-react'

const ShareStorySection = () => {
  const benefits = [
    {
      icon: Heart,
      title: "Inspire Others",
      description: "Your story could be exactly what another mother needs to hear"
    },
    {
      icon: Users,
      title: "Build Community",
      description: "Connect with other mothers who share similar experiences"
    },
    {
      icon: Award,
      title: "Expert Review",
      description: "All submissions are reviewed by our medical team for accuracy"
    }
  ]

  return (
    <section className="py-16 bg-gradient-to-br from-[#F59297]/10 via-white to-[#7da8e6]/10 dark:from-pink-900/20 dark:via-gray-800 dark:to-blue-900/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div data-aos="fade-right">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Share Your 
              <span className="text-[#F59297] dark:text-[#F59297]"> Motherhood Story</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              Want to share your motherhood story or tips? Submit your blog post and inspire others. 
              Your experiences matter and can help fellow mothers on their journey.
            </p>

            <div className="space-y-6 mb-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-[#F59297] to-[#7da8e6] rounded-xl flex items-center justify-center">
                    <benefit.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <button className="inline-flex items-center px-8 py-4 bg-[#F59297] text-white font-semibold rounded-xl hover:bg-[#e67d82] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              <PenTool className="w-5 h-5 mr-2" />
              Submit Your Story
            </button>
          </div>

          {/* Right Form Preview */}
          <div className="bg-white dark:bg-gray-700 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-600" data-aos="fade-left">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Story Submission Form
            </h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your name (or 'Anonymous')"
                  className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-[#F59297] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Story Title
                </label>
                <input
                  type="text"
                  placeholder="Give your story a compelling title"
                  className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-[#F59297] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Category
                </label>
                <select className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#F59297] focus:border-transparent">
                  <option value="">Select a category</option>
                  <option value="pregnancy">Pregnancy</option>
                  <option value="birth-story">Birth Story</option>
                  <option value="postpartum">Postpartum</option>
                  <option value="parenting-tips">Parenting Tips</option>
                  <option value="mental-health">Mental Health</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Your Story
                </label>
                <textarea
                  rows={4}
                  placeholder="Share your experience, tips, or advice..."
                  className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-[#F59297] focus:border-transparent resize-none"
                />
              </div>

              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  id="consent"
                  className="mt-1 w-4 h-4 text-[#F59297] border-gray-300 rounded focus:ring-[#F59297]"
                />
                <label htmlFor="consent" className="text-sm text-gray-600 dark:text-gray-300">
                  I consent to having my story reviewed and potentially published on the Obaatanpa blog. 
                  I understand that all submissions are moderated before publication.
                </label>
              </div>

              <button className="w-full bg-gradient-to-r from-[#F59297] to-[#7da8e6] text-white py-4 rounded-xl font-semibold hover:from-[#e67d82] hover:to-[#6b9ce6] transition-all duration-300 shadow-lg hover:shadow-xl">
                Submit for Review
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ShareStorySection
