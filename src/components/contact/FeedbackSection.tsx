'use client'

import { useState } from 'react'
import { Star, Heart, Send, ThumbsUp } from 'lucide-react'

const FeedbackSection = () => {
  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [feedback, setFeedback] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleRatingClick = (value: number) => {
    setRating(value)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate submission
    setIsSubmitted(true)
    setTimeout(() => {
      setIsSubmitted(false)
      setRating(0)
      setFeedback('')
    }, 3000)
  }

  if (isSubmitted) {
    return (
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 text-center" data-aos="fade-up">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <ThumbsUp className="w-8 h-8 text-green-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Thank You for Your Feedback!
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Your feedback helps us improve Obaatanpa and serve mothers better. We truly appreciate your input!
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Your Feedback Matters
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Help us grow and serve better. Your experience and suggestions are invaluable to us.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700" data-aos="fade-up" data-aos-delay="200">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Rating Section */}
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                How would you rate your experience with Obaatanpa?
              </h3>
              <div className="flex justify-center space-x-2 mb-4">
                {[1, 2, 3, 4, 5].map((value) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => handleRatingClick(value)}
                    onMouseEnter={() => setHoveredRating(value)}
                    onMouseLeave={() => setHoveredRating(0)}
                    className="transition-transform duration-200 hover:scale-110"
                  >
                    <Star
                      className={`w-8 h-8 ${
                        value <= (hoveredRating || rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300 dark:text-gray-600'
                      }`}
                    />
                  </button>
                ))}
              </div>
              {rating > 0 && (
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {rating === 5 && "Excellent! We're thrilled you love Obaatanpa! 🎉"}
                  {rating === 4 && "Great! Thank you for the positive feedback! 😊"}
                  {rating === 3 && "Good! We'd love to know how we can improve."}
                  {rating === 2 && "We appreciate your honesty. Please tell us how we can do better."}
                  {rating === 1 && "We're sorry to hear that. Your feedback will help us improve."}
                </p>
              )}
            </div>

            {/* Feedback Text */}
            <div>
              <label htmlFor="feedback" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Tell us more about your experience (optional)
              </label>
              <textarea
                id="feedback"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-[#F59297] focus:border-transparent transition-colors duration-200 resize-none"
                placeholder="What did you like? What could we improve? Any suggestions?"
              />
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                disabled={rating === 0}
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#F59297] to-[#7da8e6] text-white font-semibold rounded-xl hover:from-[#e67d82] hover:to-[#6b9ce6] transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5 mr-2" />
                Submit Feedback
              </button>
            </div>
          </form>
        </div>

        {/* Additional Feedback Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-lg" data-aos="fade-up" data-aos-delay="300">
            <div className="w-12 h-12 bg-pink-100 dark:bg-pink-900/30 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Heart className="w-6 h-6 text-[#F59297]" fill="currentColor" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Feature Request</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Have an idea for a new feature? We'd love to hear it!
            </p>
            <button className="text-[#F59297] hover:text-[#e67d82] font-medium text-sm">
              Suggest Feature →
            </button>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-lg" data-aos="fade-up" data-aos-delay="400">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Star className="w-6 h-6 text-[#7da8e6]" fill="currentColor" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">App Store Review</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Love the app? Leave us a review on the app store!
            </p>
            <button className="text-[#7da8e6] hover:text-[#6b9ce6] font-medium text-sm">
              Rate on Store →
            </button>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-lg" data-aos="fade-up" data-aos-delay="500">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center mx-auto mb-4">
              <ThumbsUp className="w-6 h-6 text-green-500" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Share Your Story</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Share how Obaatanpa helped you on your journey.
            </p>
            <button className="text-green-500 hover:text-green-600 font-medium text-sm">
              Share Story →
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FeedbackSection
