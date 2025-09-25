'use client'

import { useState } from 'react'
import { Send, CheckCircle, User, Mail, Phone, MessageSquare } from 'lucide-react'

const ContactForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    agreeToPrivacy: false
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const subjects = [
    'Technical Issue',
    'Feedback',
    'Health Question',
    'Partnership',
    'General Inquiry',
    'Other'
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsSubmitted(true)
    setIsSubmitting(false)
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        agreeToPrivacy: false
      })
    }, 3000)
  }

  if (isSubmitted) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700" data-aos="fade-up">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Thank You!
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Your message has been sent successfully. We'll get back to you within 24 hours.
          </p>
          <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4">
            <p className="text-green-700 dark:text-green-400 text-sm">
              📧 A confirmation email has been sent to your inbox.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700" data-aos="fade-up">
      <div className="flex items-center mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-[#F59297] to-[#7da8e6] rounded-xl flex items-center justify-center mr-4">
          <MessageSquare className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Send us a Message
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Full Name */}
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            <User className="w-4 h-4 inline mr-2" />
            Full Name *
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-[#F59297] focus:border-transparent transition-colors duration-200"
            placeholder="Enter your full name"
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            <Mail className="w-4 h-4 inline mr-2" />
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-[#F59297] focus:border-transparent transition-colors duration-200"
            placeholder="your.email@example.com"
          />
        </div>

        {/* Phone Number */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            <Phone className="w-4 h-4 inline mr-2" />
            Phone Number (Optional)
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-[#F59297] focus:border-transparent transition-colors duration-200"
            placeholder="+233 XX XXX XXXX"
          />
        </div>

        {/* Subject */}
        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Subject *
          </label>
          <select
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#F59297] focus:border-transparent transition-colors duration-200"
          >
            <option value="">Select a subject</option>
            {subjects.map((subject) => (
              <option key={subject} value={subject}>
                {subject}
              </option>
            ))}
          </select>
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Message *
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            required
            rows={5}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-[#F59297] focus:border-transparent transition-colors duration-200 resize-none"
            placeholder="Tell us how we can help you..."
          />
        </div>

        {/* Privacy Agreement */}
        <div className="flex items-start space-x-3">
          <input
            type="checkbox"
            id="agreeToPrivacy"
            name="agreeToPrivacy"
            checked={formData.agreeToPrivacy}
            onChange={handleInputChange}
            required
            className="mt-1 w-4 h-4 text-[#F59297] border-gray-300 rounded focus:ring-[#F59297]"
          />
          <label htmlFor="agreeToPrivacy" className="text-sm text-gray-600 dark:text-gray-300">
            I agree to the{' '}
            <a href="/privacy" className="text-[#F59297] hover:text-[#e67d82] underline">
              privacy policy
            </a>{' '}
            and consent to the processing of my personal data.
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting || !formData.agreeToPrivacy}
          className="w-full bg-gradient-to-r from-[#F59297] to-[#7da8e6] text-white py-4 rounded-xl font-semibold hover:from-[#e67d82] hover:to-[#6b9ce6] transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Sending...
            </>
          ) : (
            <>
              <Send className="w-5 h-5 mr-2" />
              Send Message
            </>
          )}
        </button>
      </form>
    </div>
  )
}

export default ContactForm
