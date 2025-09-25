'use client'

import { Milk, Clock, Droplets, Baby, AlertCircle, CheckCircle } from 'lucide-react'

interface FeedingGuideProps {
  babyAge?: string
}

const FeedingGuide = ({ babyAge }: FeedingGuideProps) => {
  
  // Get age-specific feeding information
  const getFeedingInfo = (ageRange: string) => {
    switch (ageRange) {
      case '0-3':
        return {
          title: 'Exclusive Breastfeeding/Formula (0-3 months)',
          mainFood: 'Breast milk or formula only',
          frequency: '8-12 times per day (every 2-3 hours)',
          amount: '60-120ml per feed (if formula feeding)',
          waterIntake: 'No additional water needed',
          tips: [
            'Feed on demand - baby knows when they\'re hungry',
            'Burp baby after every feed to prevent gas',
            'Watch for hunger cues: rooting, sucking motions, fussiness',
            'Wet diapers 6+ times daily indicates good hydration'
          ],
          schedule: [
            { time: '6:00 AM', activity: 'Morning feed' },
            { time: '9:00 AM', activity: 'Mid-morning feed' },
            { time: '12:00 PM', activity: 'Lunch feed' },
            { time: '3:00 PM', activity: 'Afternoon feed' },
            { time: '6:00 PM', activity: 'Evening feed' },
            { time: '9:00 PM', activity: 'Bedtime feed' },
            { time: '12:00 AM', activity: 'Night feed' },
            { time: '3:00 AM', activity: 'Early morning feed' }
          ]
        }
      case '3-6':
        return {
          title: 'Exclusive Breastfeeding/Formula (3-6 months)',
          mainFood: 'Breast milk or formula only',
          frequency: '6-8 times per day (every 3-4 hours)',
          amount: '120-180ml per feed (if formula feeding)',
          waterIntake: 'No additional water needed',
          tips: [
            'Baby may start sleeping longer between night feeds',
            'Growth spurts may increase feeding frequency temporarily',
            'Continue burping after feeds',
            'Baby may show interest in food but wait until 6 months'
          ],
          schedule: [
            { time: '6:00 AM', activity: 'Morning feed' },
            { time: '10:00 AM', activity: 'Mid-morning feed' },
            { time: '2:00 PM', activity: 'Afternoon feed' },
            { time: '6:00 PM', activity: 'Evening feed' },
            { time: '10:00 PM', activity: 'Bedtime feed' },
            { time: '2:00 AM', activity: 'Night feed (may skip)' }
          ]
        }
      case '6-12':
        return {
          title: 'Starting Solids + Milk (6-12 months)',
          mainFood: 'Breast milk/formula + pureed foods',
          frequency: '4-6 milk feeds + 2-3 solid meals',
          amount: '180-240ml per milk feed',
          waterIntake: 'Small sips of water with meals',
          tips: [
            'Start with single-ingredient purees (sweet potato, banana)',
            'Introduce new foods one at a time, wait 3-5 days',
            'Watch for allergic reactions: rash, vomiting, diarrhea',
            'Let baby explore food with hands - it\'s messy but important!'
          ],
          schedule: [
            { time: '7:00 AM', activity: 'Morning milk feed' },
            { time: '9:00 AM', activity: 'Breakfast (puree)' },
            { time: '11:00 AM', activity: 'Mid-morning milk' },
            { time: '1:00 PM', activity: 'Lunch (puree + finger foods)' },
            { time: '3:00 PM', activity: 'Afternoon milk' },
            { time: '5:30 PM', activity: 'Dinner (family foods, mashed)' },
            { time: '7:00 PM', activity: 'Bedtime milk feed' }
          ]
        }
      case '1-2':
        return {
          title: 'Family Foods + Milk (12+ months)',
          mainFood: 'Regular family foods + milk',
          frequency: '3 meals + 2 snacks + 2-3 milk feeds',
          amount: '200-250ml per milk feed',
          waterIntake: 'Water throughout the day',
          tips: [
            'Offer variety - baby may need to try foods 10+ times',
            'Cut foods into small pieces to prevent choking',
            'Encourage self-feeding with spoon and fork',
            'Family mealtimes help develop social eating skills'
          ],
          schedule: [
            { time: '7:00 AM', activity: 'Breakfast + milk' },
            { time: '10:00 AM', activity: 'Morning snack' },
            { time: '12:30 PM', activity: 'Lunch + water' },
            { time: '3:00 PM', activity: 'Afternoon snack + milk' },
            { time: '6:00 PM', activity: 'Dinner + water' },
            { time: '7:30 PM', activity: 'Bedtime milk' }
          ]
        }
      default:
        return {
          title: 'Feeding Guide',
          mainFood: 'Age-appropriate nutrition',
          frequency: 'Regular feeding schedule',
          amount: 'As needed',
          waterIntake: 'Stay hydrated',
          tips: ['Consult your pediatrician for specific guidance'],
          schedule: []
        }
    }
  }

  const feedingInfo = getFeedingInfo(babyAge)

  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            {feedingInfo.title}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Age-specific feeding guidance for your baby's healthy development
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Feeding Overview */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
              Feeding Overview
            </h3>
            
            <div className="space-y-6">
              {/* Main Food */}
              <div className="bg-pink-50 dark:bg-pink-900/20 rounded-2xl p-6">
                <div className="flex items-center space-x-3 mb-3">
                  <Milk className="w-6 h-6 text-pink-600" />
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Main Nutrition</h4>
                </div>
                <p className="text-gray-700 dark:text-gray-300">{feedingInfo.mainFood}</p>
              </div>

              {/* Frequency */}
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-6">
                <div className="flex items-center space-x-3 mb-3">
                  <Clock className="w-6 h-6 text-blue-600" />
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Frequency</h4>
                </div>
                <p className="text-gray-700 dark:text-gray-300">{feedingInfo.frequency}</p>
              </div>

              {/* Amount */}
              <div className="bg-green-50 dark:bg-green-900/20 rounded-2xl p-6">
                <div className="flex items-center space-x-3 mb-3">
                  <Baby className="w-6 h-6 text-green-600" />
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Amount per Feed</h4>
                </div>
                <p className="text-gray-700 dark:text-gray-300">{feedingInfo.amount}</p>
              </div>

              {/* Water Intake */}
              <div className="bg-cyan-50 dark:bg-cyan-900/20 rounded-2xl p-6">
                <div className="flex items-center space-x-3 mb-3">
                  <Droplets className="w-6 h-6 text-cyan-600" />
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Water Intake</h4>
                </div>
                <p className="text-gray-700 dark:text-gray-300">{feedingInfo.waterIntake}</p>
              </div>
            </div>
          </div>

          {/* Sample Schedule & Tips */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
              Sample Daily Schedule
            </h3>
            
            {/* Schedule */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 mb-8">
              <div className="space-y-3">
                {feedingInfo.schedule.map((item, index) => (
                  <div key={index} className="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
                    <span className="font-medium text-gray-900 dark:text-white">{item.time}</span>
                    <span className="text-gray-600 dark:text-gray-400">{item.activity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tips */}
            <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              Important Tips
            </h4>
            <div className="space-y-4">
              {feedingInfo.tips.map((tip, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">{tip}</p>
                </div>
              ))}
            </div>

            {/* Warning */}
            <div className="mt-8 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-4">
              <div className="flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                <div>
                  <h5 className="font-semibold text-yellow-800 dark:text-yellow-400 mb-1">Remember</h5>
                  <p className="text-yellow-700 dark:text-yellow-300 text-sm">
                    Every baby is different. These are guidelines. Consult your pediatrician for advice.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FeedingGuide
