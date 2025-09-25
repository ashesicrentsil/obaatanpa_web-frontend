'use client'

import { useState } from 'react'
import { Eye, Brain, Moon, Lightbulb, ChevronRight } from 'lucide-react'

interface WeeklyHighlightsProps {
  babyAge: string
}

const WeeklyHighlights = ({ babyAge }: WeeklyHighlightsProps) => {
  const [showDetails, setShowDetails] = useState(false)

  // Get age-specific highlights
  const getHighlights = (ageRange: string) => {
    switch (ageRange) {
      case '0-3':
        return {
          milestones: ['First social smiles', 'Follows objects with eyes', 'Lifts head during tummy time'],
          brainTip: 'Talk to your baby constantly - they\'re learning language patterns',
          sleepFocus: '16-20 hours daily (2-4 hour stretches)',
          weekTip: 'Skin-to-skin contact helps with bonding and temperature regulation'
        }
      case '3-6':
        return {
          milestones: ['Can roll over', 'Recognizes faces', 'Reaches for toys', 'Babbles and coos'],
          brainTip: 'Play peek-a-boo to support memory and cause-effect learning',
          sleepFocus: '14-16 hours daily (4-6 hour stretches at night)',
          weekTip: 'Sing or read aloud daily for language and emotional development'
        }
      case '6-12':
        return {
          milestones: ['Sits without support', 'Crawls or scoots', 'Says first words', 'Picks up small objects'],
          brainTip: 'Encourage exploration - baby-proof and let them discover safely',
          sleepFocus: '12-14 hours daily (6-8 hour stretches)',
          weekTip: 'Introduce finger foods and let baby self-feed to develop motor skills'
        }
      case '1-2':
        return {
          milestones: ['Walks independently', 'Says 10+ words', 'Follows simple commands', 'Shows preferences'],
          brainTip: 'Read picture books together and ask "Where is...?" questions',
          sleepFocus: '11-13 hours daily (10-12 hours at night + 1-2 naps)',
          weekTip: 'Encourage independence with simple choices like "red cup or blue cup?"'
        }
      default:
        return {
          milestones: ['Growing beautifully', 'Learning every day'],
          brainTip: 'Every interaction helps your baby\'s development',
          sleepFocus: 'Rest when baby rests',
          weekTip: 'Trust your instincts - you know your baby best'
        }
    }
  }

  const highlights = getHighlights(babyAge)

  const handleViewDetails = () => {
    setShowDetails(!showDetails)
  }

  return (
    <section className="py-12 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            This Week's Highlights
          </h2>
          <button
            onClick={handleViewDetails}
            className="flex items-center space-x-2 text-pink-600 hover:text-pink-700 font-medium transition-colors duration-200"
          >
            <span>View Details</span>
            <Eye className="w-5 h-5" />
          </button>
        </div>

        {/* Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Milestones */}
          <div className="bg-gradient-to-br from-pink-50 to-pink-100 dark:from-pink-900/20 dark:to-pink-800/20 rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl flex items-center justify-center">
                <span className="text-white text-xl">👣</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Milestones</h3>
            </div>
            <ul className="space-y-2">
              {highlights.milestones.map((milestone, index) => (
                <li key={index} className="text-sm text-gray-700 dark:text-gray-300 flex items-start space-x-2">
                  <span className="text-pink-500 mt-1">•</span>
                  <span>{milestone}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Brain Development */}
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Brain Development</h3>
            </div>
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
              {highlights.brainTip}
            </p>
          </div>

          {/* Sleep Focus */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                <Moon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Sleep Focus</h3>
            </div>
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
              {highlights.sleepFocus}
            </p>
          </div>

          {/* Tip of the Week */}
          <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                <Lightbulb className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Tip of the Week</h3>
            </div>
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
              {highlights.weekTip}
            </p>
          </div>
        </div>

        {/* Detailed View Modal/Expansion */}
        {showDetails && (
          <div className="mt-8 bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                Detailed Development Insights
              </h3>
              <button
                onClick={() => setShowDetails(false)}
                className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  What to Expect This Week
                </h4>
                <div className="space-y-3">
                  {highlights.milestones.map((milestone, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-pink-500 rounded-full flex items-center justify-center mt-0.5">
                        <span className="text-white text-xs">✓</span>
                      </div>
                      <div>
                        <p className="text-gray-700 dark:text-gray-300">{milestone}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          Every baby develops at their own pace!
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Activities to Try
                </h4>
                <div className="space-y-4">
                  <div className="bg-white dark:bg-gray-700 rounded-lg p-4">
                    <h5 className="font-medium text-gray-900 dark:text-white mb-2">Daily Routine</h5>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Consistent feeding, sleeping, and play times help your baby feel secure.
                    </p>
                  </div>
                  <div className="bg-white dark:bg-gray-700 rounded-lg p-4">
                    <h5 className="font-medium text-gray-900 dark:text-white mb-2">Bonding Time</h5>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      15-20 minutes of focused, phone-free interaction daily.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default WeeklyHighlights
