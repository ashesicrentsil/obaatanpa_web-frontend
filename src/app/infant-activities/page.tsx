'use client'

import { useState } from 'react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { Calendar, Clock, Star, Play, Download } from 'lucide-react'

export default function InfantActivitiesPage() {
  const [selectedAge, setSelectedAge] = useState('0-3')

  const ageGroups = [
    { id: '0-3', label: '0-3 months', description: 'Newborn activities' },
    { id: '3-6', label: '3-6 months', description: 'Early development' },
    { id: '6-9', label: '6-9 months', description: 'Sitting & exploring' },
    { id: '9-12', label: '9-12 months', description: 'Mobile & curious' }
  ]

  const activities = {
    '0-3': [
      {
        title: 'Tummy Time',
        description: 'Essential for neck and shoulder strength development',
        duration: '5-10 minutes',
        difficulty: 'Easy',
        benefits: ['Strengthens neck muscles', 'Prevents flat head syndrome', 'Improves motor skills'],
        instructions: [
          'Place baby on their tummy on a firm surface',
          'Stay close and interact with baby',
          'Start with 3-5 minutes, gradually increase',
          'Do this 2-3 times daily when baby is awake and alert'
        ]
      },
      {
        title: 'High Contrast Visual Stimulation',
        description: 'Black and white patterns to stimulate developing vision',
        duration: '10-15 minutes',
        difficulty: 'Easy',
        benefits: ['Stimulates visual development', 'Improves focus', 'Encourages tracking'],
        instructions: [
          'Show black and white cards or books',
          'Hold 8-12 inches from baby\'s face',
          'Move slowly from side to side',
          'Watch for baby\'s eye movements and responses'
        ]
      },
      {
        title: 'Gentle Massage',
        description: 'Soothing touch to promote bonding and relaxation',
        duration: '10-20 minutes',
        difficulty: 'Easy',
        benefits: ['Promotes bonding', 'Improves circulation', 'Aids digestion'],
        instructions: [
          'Use gentle, warm oil suitable for babies',
          'Start with legs and arms using gentle strokes',
          'Massage tummy in clockwise circles',
          'Keep room warm and baby comfortable'
        ]
      }
    ],
    '3-6': [
      {
        title: 'Reaching and Grasping Games',
        description: 'Encourage baby to reach for colorful toys',
        duration: '15-20 minutes',
        difficulty: 'Easy',
        benefits: ['Develops hand-eye coordination', 'Strengthens arm muscles', 'Improves focus'],
        instructions: [
          'Place colorful toys within baby\'s reach',
          'Encourage reaching by moving toys slowly',
          'Celebrate when baby grasps objects',
          'Use toys with different textures'
        ]
      },
      {
        title: 'Peek-a-Boo',
        description: 'Classic game that teaches object permanence',
        duration: '5-10 minutes',
        difficulty: 'Easy',
        benefits: ['Teaches object permanence', 'Develops social skills', 'Encourages laughter'],
        instructions: [
          'Cover your face with hands or cloth',
          'Say "peek-a-boo!" when revealing your face',
          'Watch for baby\'s anticipation and smiles',
          'Vary the timing to keep it interesting'
        ]
      }
    ],
    '6-9': [
      {
        title: 'Sitting Practice',
        description: 'Help baby develop sitting balance and core strength',
        duration: '10-15 minutes',
        difficulty: 'Medium',
        benefits: ['Develops core strength', 'Improves balance', 'Enhances spatial awareness'],
        instructions: [
          'Support baby in sitting position with pillows',
          'Place toys in front to encourage reaching',
          'Gradually reduce support as baby gains strength',
          'Always supervise closely'
        ]
      },
      {
        title: 'Cause and Effect Toys',
        description: 'Toys that respond to baby\'s actions',
        duration: '15-20 minutes',
        difficulty: 'Medium',
        benefits: ['Teaches cause and effect', 'Develops problem-solving', 'Improves motor skills'],
        instructions: [
          'Provide toys that make sounds when pressed',
          'Show baby how the toy works',
          'Let baby explore and discover',
          'Celebrate their discoveries'
        ]
      }
    ],
    '9-12': [
      {
        title: 'Crawling Obstacle Course',
        description: 'Safe obstacles to encourage movement and exploration',
        duration: '20-30 minutes',
        difficulty: 'Medium',
        benefits: ['Develops gross motor skills', 'Improves coordination', 'Builds confidence'],
        instructions: [
          'Create safe obstacles with pillows and cushions',
          'Place favorite toys as motivation',
          'Crawl alongside baby to demonstrate',
          'Ensure all obstacles are baby-safe'
        ]
      },
      {
        title: 'Simple Puzzle Play',
        description: 'Large piece puzzles to develop problem-solving skills',
        duration: '10-15 minutes',
        difficulty: 'Medium',
        benefits: ['Develops problem-solving', 'Improves fine motor skills', 'Enhances concentration'],
        instructions: [
          'Start with 2-3 large pieces',
          'Guide baby\'s hand to help initially',
          'Celebrate successful placements',
          'Gradually increase difficulty'
        ]
      }
    ]
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-12 bg-gradient-to-br from-[#F59297] to-[#7da8e6] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Infant Activities & Development
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
            Age-appropriate activities to support your baby's growth and development
          </p>
        </div>
      </section>

      {/* Age Group Selector */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Choose Your Baby's Age
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Select your baby's age group to see activities tailored for their developmental stage
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
            {ageGroups.map((group) => (
              <button
                key={group.id}
                onClick={() => setSelectedAge(group.id)}
                className={`p-6 rounded-2xl border-2 transition-all duration-200 ${
                  selectedAge === group.id
                    ? 'border-[#F59297] bg-[#F59297]/10 text-[#F59297]'
                    : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:border-[#F59297]/50'
                }`}
              >
                <h3 className="font-bold text-lg mb-2">{group.label}</h3>
                <p className="text-sm opacity-80">{group.description}</p>
              </button>
            ))}
          </div>

          {/* Activities Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {activities[selectedAge as keyof typeof activities]?.map((activity, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {activity.title}
                  </h3>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-500">{activity.duration}</span>
                  </div>
                </div>
                
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {activity.description}
                </p>
                
                <div className="mb-4">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                    activity.difficulty === 'Easy' 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                  }`}>
                    {activity.difficulty}
                  </span>
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Benefits:</h4>
                  <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                    {activity.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-center">
                        <Star className="w-3 h-3 text-[#F59297] mr-2 flex-shrink-0" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Instructions:</h4>
                  <ol className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                    {activity.instructions.map((instruction, i) => (
                      <li key={i} className="flex">
                        <span className="text-[#F59297] font-medium mr-2">{i + 1}.</span>
                        {instruction}
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="flex space-x-2">
                  <button className="flex-1 bg-gradient-to-r from-[#F59297] to-[#7da8e6] text-white py-2 px-4 rounded-lg font-medium hover:shadow-lg transition-all duration-200 flex items-center justify-center">
                    <Play className="w-4 h-4 mr-2" />
                    Try Activity
                  </button>
                  <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
