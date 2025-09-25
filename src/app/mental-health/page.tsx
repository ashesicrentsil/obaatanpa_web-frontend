'use client'

import { useState } from 'react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { Heart, Phone, MessageCircle, Book, Users, AlertTriangle, CheckCircle } from 'lucide-react'

export default function MentalHealthPage() {
  const [selectedCategory, setSelectedCategory] = useState('pregnancy')

  const categories = [
    { id: 'pregnancy', label: 'During Pregnancy', icon: '🤰' },
    { id: 'postpartum', label: 'After Birth', icon: '👶' },
    { id: 'general', label: 'General Wellness', icon: '💚' }
  ]

  const resources = {
    pregnancy: [
      {
        title: 'Managing Pregnancy Anxiety',
        description: 'Learn techniques to cope with common pregnancy worries and fears',
        type: 'Article',
        duration: '5 min read',
        tags: ['Anxiety', 'Coping Strategies']
      },
      {
        title: 'Mood Changes During Pregnancy',
        description: 'Understanding hormonal changes and their impact on emotions',
        type: 'Guide',
        duration: '8 min read',
        tags: ['Hormones', 'Emotions']
      },
      {
        title: 'Relaxation Techniques for Expectant Mothers',
        description: 'Breathing exercises and meditation practices for pregnancy',
        type: 'Video',
        duration: '15 min',
        tags: ['Relaxation', 'Meditation']
      }
    ],
    postpartum: [
      {
        title: 'Recognizing Postpartum Depression',
        description: 'Signs, symptoms, and when to seek professional help',
        type: 'Article',
        duration: '7 min read',
        tags: ['Depression', 'Warning Signs']
      },
      {
        title: 'Baby Blues vs. Postpartum Depression',
        description: 'Understanding the difference and knowing when to get help',
        type: 'Guide',
        duration: '6 min read',
        tags: ['Baby Blues', 'Depression']
      },
      {
        title: 'Building Your Support Network',
        description: 'Creating connections with other new mothers',
        type: 'Article',
        duration: '5 min read',
        tags: ['Support', 'Community']
      }
    ],
    general: [
      {
        title: 'Self-Care for New Mothers',
        description: 'Practical tips for taking care of yourself while caring for baby',
        type: 'Guide',
        duration: '10 min read',
        tags: ['Self-Care', 'Wellness']
      },
      {
        title: 'Mindfulness for Mothers',
        description: 'Simple mindfulness practices you can do anywhere',
        type: 'Video',
        duration: '12 min',
        tags: ['Mindfulness', 'Stress Relief']
      },
      {
        title: 'Sleep and Mental Health',
        description: 'The connection between rest and emotional wellbeing',
        type: 'Article',
        duration: '6 min read',
        tags: ['Sleep', 'Mental Health']
      }
    ]
  }

  const emergencyContacts = [
    {
      name: 'National Suicide Prevention Lifeline',
      number: '988',
      description: '24/7 crisis support'
    },
    {
      name: 'Postpartum Support International',
      number: '1-944-4773',
      description: 'Specialized maternal mental health support'
    },
    {
      name: 'Crisis Text Line',
      number: 'Text HOME to 741741',
      description: 'Free 24/7 crisis counseling'
    }
  ]

  const warningSignsPregnancy = [
    'Persistent sadness or crying',
    'Severe anxiety or panic attacks',
    'Difficulty bonding with your baby',
    'Thoughts of harming yourself or baby',
    'Inability to care for yourself or baby',
    'Extreme mood swings',
    'Loss of interest in activities'
  ]

  const selfCareTips = [
    {
      title: 'Practice Deep Breathing',
      description: 'Take 5 minutes daily for deep breathing exercises',
      icon: '🫁'
    },
    {
      title: 'Connect with Others',
      description: 'Reach out to friends, family, or support groups',
      icon: '👥'
    },
    {
      title: 'Get Moving',
      description: 'Light exercise like walking can boost mood',
      icon: '🚶‍♀️'
    },
    {
      title: 'Prioritize Sleep',
      description: 'Rest when possible, even if just for short periods',
      icon: '😴'
    },
    {
      title: 'Eat Nutritiously',
      description: 'Fuel your body with healthy, mood-supporting foods',
      icon: '🥗'
    },
    {
      title: 'Ask for Help',
      description: 'Don\'t hesitate to reach out when you need support',
      icon: '🤝'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-12 bg-gradient-to-br from-green-500 to-teal-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Mental Health & Wellness
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
            Supporting your emotional wellbeing during pregnancy and motherhood
          </p>
          <div className="flex items-center justify-center space-x-2 text-white/80">
            <Heart className="w-5 h-5" />
            <span>You are not alone in this journey</span>
          </div>
        </div>
      </section>

      {/* Emergency Banner */}
      <section className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center">
            <AlertTriangle className="w-6 h-6 text-red-500 mr-3" />
            <div>
              <p className="text-red-800 dark:text-red-200 font-medium">
                If you're having thoughts of harming yourself or your baby, please seek immediate help.
              </p>
              <p className="text-red-600 dark:text-red-300 text-sm">
                Call 988 (Suicide Prevention Lifeline) or go to your nearest emergency room.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Category Selector */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Mental Health Resources
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Find support and information tailored to your current stage
            </p>
          </div>

          <div className="flex justify-center mb-12">
            <div className="inline-flex bg-gray-100 dark:bg-gray-800 rounded-2xl p-1">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                    selectedCategory === category.id
                      ? 'bg-white dark:bg-gray-700 text-green-600 dark:text-green-400 shadow-md'
                      : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  <span className="mr-2">{category.icon}</span>
                  {category.label}
                </button>
              ))}
            </div>
          </div>

          {/* Resources Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {resources[selectedCategory as keyof typeof resources]?.map((resource, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    resource.type === 'Video' 
                      ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                      : resource.type === 'Guide'
                      ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                      : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                  }`}>
                    {resource.type}
                  </span>
                  <span className="text-sm text-gray-500">{resource.duration}</span>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {resource.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {resource.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {resource.tags.map((tag, i) => (
                    <span key={i} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-lg">
                      {tag}
                    </span>
                  ))}
                </div>

                <button className="w-full bg-gradient-to-r from-green-500 to-teal-600 text-white py-3 rounded-2xl font-semibold hover:shadow-lg transition-all duration-200">
                  {resource.type === 'Video' ? 'Watch Now' : 'Read More'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Self-Care Tips */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Daily Self-Care Tips
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Small steps you can take every day to support your mental health
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {selfCareTips.map((tip, index) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-2xl p-6 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                <div className="text-3xl mb-4">{tip.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {tip.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {tip.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Warning Signs */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                When to Seek Help
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                It's important to recognize when you might need professional support. These warning signs indicate it's time to reach out:
              </p>
              <ul className="space-y-3">
                {warningSignsPregnancy.map((sign, index) => (
                  <li key={index} className="flex items-start">
                    <AlertTriangle className="w-5 h-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">{sign}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Emergency Contacts
              </h2>
              <div className="space-y-4">
                {emergencyContacts.map((contact, index) => (
                  <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                      {contact.name}
                    </h3>
                    <div className="flex items-center mb-2">
                      <Phone className="w-4 h-4 text-green-500 mr-2" />
                      <span className="text-lg font-mono text-green-600 dark:text-green-400">
                        {contact.number}
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      {contact.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
