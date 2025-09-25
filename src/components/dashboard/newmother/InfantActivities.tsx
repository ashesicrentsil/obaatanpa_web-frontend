'use client'

import { useState } from 'react'
import { Play, Clock, Star, CheckCircle, Baby, Heart, Brain, Smile } from 'lucide-react'

interface InfantActivitiesProps {
  babyAge: string
}

const InfantActivities = ({ babyAge }: InfantActivitiesProps) => {
  const [activeActivity, setActiveActivity] = useState<string | null>(null)
  const [completedActivities, setCompletedActivities] = useState<string[]>([])

  // Get age-specific activities
  const getActivities = (ageRange: string) => {
    switch (ageRange) {
      case '0-3':
        return [
          {
            id: 'tummy-time',
            title: 'Tummy Time',
            duration: '5-10 minutes',
            description: 'Helps strengthen neck and shoulder muscles',
            instructions: [
              'Place baby on their tummy on a firm surface',
              'Stay close and interact with baby',
              'Start with 3-5 minutes, gradually increase',
              'Do this 2-3 times daily when baby is awake and alert'
            ],
            benefits: ['Strengthens neck muscles', 'Prevents flat head syndrome', 'Develops motor skills'],
            icon: Baby,
            color: 'from-pink-500 to-pink-600'
          },
          {
            id: 'mirror-time',
            title: 'Mirror Face Time',
            duration: '5-10 minutes',
            description: 'Encourages visual tracking and self-recognition',
            instructions: [
              'Hold baby in front of a safe mirror',
              'Point to baby\'s reflection',
              'Make faces and expressions',
              'Talk about what you see: "Look at those beautiful eyes!"'
            ],
            benefits: ['Visual development', 'Self-awareness', 'Social interaction'],
            icon: Smile,
            color: 'from-blue-500 to-blue-600'
          },
          {
            id: 'texture-play',
            title: 'Soft Texture Exploration',
            duration: '10-15 minutes',
            description: 'Introduces different textures for sensory development',
            instructions: [
              'Gather soft fabrics (silk, cotton, fleece)',
              'Gently brush against baby\'s hands and feet',
              'Let baby grasp different textures',
              'Describe the textures: "This is soft and smooth"'
            ],
            benefits: ['Sensory development', 'Tactile awareness', 'Brain stimulation'],
            icon: Heart,
            color: 'from-purple-500 to-purple-600'
          }
        ]
      case '3-6':
        return [
          {
            id: 'reach-grasp',
            title: 'Reach and Grasp Play',
            duration: '10-15 minutes',
            description: 'Develops hand-eye coordination and motor skills',
            instructions: [
              'Place colorful toys just within baby\'s reach',
              'Encourage reaching by moving toys slowly',
              'Let baby grasp and explore objects',
              'Use toys with different shapes and textures'
            ],
            benefits: ['Hand-eye coordination', 'Motor development', 'Problem solving'],
            icon: Baby,
            color: 'from-green-500 to-green-600'
          },
          {
            id: 'peek-a-boo',
            title: 'Peek-a-Boo Games',
            duration: '5-10 minutes',
            description: 'Teaches object permanence and cause-effect',
            instructions: [
              'Cover your face with your hands',
              'Say "Where did Mommy go?"',
              'Uncover and say "Peek-a-boo!"',
              'Try hiding behind a blanket or cloth'
            ],
            benefits: ['Object permanence', 'Memory development', 'Social bonding'],
            icon: Smile,
            color: 'from-yellow-500 to-orange-500'
          },
          {
            id: 'rolling-practice',
            title: 'Rolling Practice',
            duration: '10-15 minutes',
            description: 'Encourages rolling over and core strength',
            instructions: [
              'Place baby on their back on a soft surface',
              'Hold a toy to one side to encourage turning',
              'Gently help baby roll if needed',
              'Celebrate each attempt with praise'
            ],
            benefits: ['Core strength', 'Gross motor skills', 'Spatial awareness'],
            icon: Brain,
            color: 'from-teal-500 to-cyan-500'
          }
        ]
      case '6-12':
        return [
          {
            id: 'crawling-course',
            title: 'Crawling Obstacle Course',
            duration: '15-20 minutes',
            description: 'Encourages crawling and exploration',
            instructions: [
              'Create safe obstacles with pillows and cushions',
              'Place toys at different points to motivate movement',
              'Crawl alongside baby to demonstrate',
              'Make it fun with music and encouragement'
            ],
            benefits: ['Gross motor skills', 'Problem solving', 'Confidence building'],
            icon: Baby,
            color: 'from-red-500 to-pink-500'
          },
          {
            id: 'clapping-games',
            title: 'Clapping and Music',
            duration: '10-15 minutes',
            description: 'Develops rhythm and fine motor skills',
            instructions: [
              'Sing simple songs while clapping',
              'Help baby clap their hands together',
              'Use different rhythms and speeds',
              'Try "Pat-a-cake" and other nursery rhymes'
            ],
            benefits: ['Fine motor skills', 'Rhythm development', 'Language skills'],
            icon: Heart,
            color: 'from-indigo-500 to-purple-500'
          },
          {
            id: 'container-play',
            title: 'Container and Object Play',
            duration: '15-20 minutes',
            description: 'Teaches cause-effect and problem solving',
            instructions: [
              'Provide safe containers and objects to put in/take out',
              'Show baby how to drop objects in containers',
              'Let baby explore independently',
              'Use different sized containers and objects'
            ],
            benefits: ['Problem solving', 'Fine motor skills', 'Cognitive development'],
            icon: Brain,
            color: 'from-emerald-500 to-teal-500'
          }
        ]
      default:
        return []
    }
  }

  const activities = getActivities(babyAge)

  const handleStartActivity = (activityId: string) => {
    setActiveActivity(activityId)
  }

  const handleCompleteActivity = (activityId: string) => {
    setCompletedActivities(prev => [...prev, activityId])
    setActiveActivity(null)
  }

  const isCompleted = (activityId: string) => completedActivities.includes(activityId)

  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Infant Activities & Exercises
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Age-appropriate activities to support your baby's physical and cognitive development
          </p>
        </div>

        {/* Activities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
            >
              {/* Activity Header */}
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 bg-gradient-to-r ${activity.color} rounded-xl flex items-center justify-center`}>
                  <activity.icon className="w-6 h-6 text-white" />
                </div>
                {isCompleted(activity.id) && (
                  <CheckCircle className="w-6 h-6 text-green-500" />
                )}
              </div>

              {/* Activity Info */}
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                {activity.title}
              </h3>
              
              <div className="flex items-center space-x-2 mb-3">
                <Clock className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-600 dark:text-gray-400">{activity.duration}</span>
              </div>

              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 leading-relaxed">
                {activity.description}
              </p>

              {/* Benefits */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Benefits:</h4>
                <div className="flex flex-wrap gap-1">
                  {activity.benefits.map((benefit, index) => (
                    <span
                      key={index}
                      className="text-xs bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full"
                    >
                      {benefit}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              {activeActivity === activity.id ? (
                <div className="space-y-3">
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                    <h5 className="font-semibold text-blue-900 dark:text-blue-400 mb-2">Instructions:</h5>
                    <ol className="text-sm text-blue-800 dark:text-blue-300 space-y-1">
                      {activity.instructions.map((instruction, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <span className="font-medium">{index + 1}.</span>
                          <span>{instruction}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                  <button
                    onClick={() => handleCompleteActivity(activity.id)}
                    className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center space-x-2"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>Mark Complete</span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => handleStartActivity(activity.id)}
                  disabled={isCompleted(activity.id)}
                  className={`w-full py-2 px-4 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center space-x-2 ${
                    isCompleted(activity.id)
                      ? 'bg-green-100 text-green-700 cursor-not-allowed'
                      : `bg-gradient-to-r ${activity.color} text-white hover:shadow-md`
                  }`}
                >
                  {isCompleted(activity.id) ? (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      <span>Completed</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4" />
                      <span>Start Activity</span>
                    </>
                  )}
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Progress Summary */}
        <div className="mt-12 bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Today's Activity Progress
          </h3>
          <div className="flex items-center justify-center space-x-8">
            <div>
              <div className="text-3xl font-bold text-pink-600 mb-1">{completedActivities.length}</div>
              <div className="text-gray-600 dark:text-gray-400">Completed</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-1">{activities.length}</div>
              <div className="text-gray-600 dark:text-gray-400">Total Activities</div>
            </div>
          </div>
          <div className="mt-4">
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-pink-500 to-purple-600 h-3 rounded-full transition-all duration-500"
                style={{ width: `${(completedActivities.length / activities.length) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default InfantActivities
