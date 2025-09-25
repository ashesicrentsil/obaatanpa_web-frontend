'use client'

import { useState } from 'react'
import { Baby, Heart, Calendar, Clock, Droplets, Scale, Ruler, Thermometer, Shield, BookOpen } from 'lucide-react'

interface BabyHealthPageProps {
  babyAge?: string
  motherName?: string
}

const BabyHealthPage = ({ babyAge, motherName = 'Mama' }: BabyHealthPageProps) => {
  const [activeSection, setActiveSection] = useState<'feeding' | 'development' | 'vaccinations' | 'growth'>('feeding')

  // Get age-appropriate content
  const getAgeContent = () => {
    // Safely parse babyAge, default to 0 if undefined or invalid
    const ageMonths = babyAge && typeof babyAge === 'string' && babyAge.includes('-')
      ? parseInt(babyAge.split('-')[0]) || 0
      : 0

    if (ageMonths <= 6) {
      return {
        feedingTitle: 'Breastfeeding & Formula',
        feedingContent: 'Exclusive breastfeeding recommended for first 6 months',
        developmentMilestones: [
          'Holds head up when on tummy',
          'Follows objects with eyes',
          'Smiles responsively',
          'Coos and makes sounds',
        ],
        nextVaccination: 'Pentavalent (2nd dose)',
        vaccinationDate: 'Due at 10 weeks',
      }
    } else {
      return {
        feedingTitle: 'Complementary Feeding',
        feedingContent: 'Continue breastfeeding while introducing solid foods',
        developmentMilestones: [
          'Sits without support',
          'Transfers objects between hands',
          'Responds to own name',
          'Shows stranger anxiety',
        ],
        nextVaccination: 'Measles vaccine',
        vaccinationDate: 'Due at 9 months',
      }
    }
  }

  const ageContent = getAgeContent()

  const healthSections = [
    {
      id: 'feeding',
      title: 'Feeding Guide',
      icon: Droplets,
      color: 'from-blue-500 to-blue-600',
    },
    {
      id: 'development',
      title: 'Development',
      icon: Baby,
      color: 'from-green-500 to-green-600',
    },
    {
      id: 'vaccinations',
      title: 'Vaccinations',
      icon: Shield,
      color: 'from-purple-500 to-purple-600',
    },
    {
      id: 'growth',
      title: 'Growth Tracking',
      icon: Scale,
      color: 'from-orange-500 to-orange-600',
    },
  ]

  const feedingSchedule = [
    { time: '6:00 AM', type: 'Breastfeed', duration: '15-20 mins', notes: 'Morning feed' },
    { time: '9:00 AM', type: 'Breastfeed', duration: '15-20 mins', notes: 'Mid-morning' },
    { time: '12:00 PM', type: 'Breastfeed + Solids', duration: '30 mins', notes: 'Lunch time' },
    { time: '3:00 PM', type: 'Breastfeed', duration: '15-20 mins', notes: 'Afternoon' },
    { time: '6:00 PM', type: 'Breastfeed + Solids', duration: '30 mins', notes: 'Dinner' },
    { time: '9:00 PM', type: 'Breastfeed', duration: '15-20 mins', notes: 'Bedtime feed' },
  ]

  const vaccinationSchedule = [
    { vaccine: 'BCG', age: 'At birth', status: 'completed' },
    { vaccine: 'Hepatitis B', age: 'At birth', status: 'completed' },
    { vaccine: 'Pentavalent (1st)', age: '6 weeks', status: 'completed' },
    { vaccine: 'Pneumococcal (1st)', age: '6 weeks', status: 'completed' },
    { vaccine: 'Rotavirus (1st)', age: '6 weeks', status: 'completed' },
    { vaccine: 'Pentavalent (2nd)', age: '10 weeks', status: 'upcoming' },
    { vaccine: 'Pneumococcal (2nd)', age: '10 weeks', status: 'upcoming' },
    { vaccine: 'Rotavirus (2nd)', age: '10 weeks', status: 'upcoming' },
  ]

  const growthData = [
    { metric: 'Weight', current: '6.2 kg', percentile: '75th', trend: 'up' },
    { metric: 'Height', current: '60 cm', percentile: '80th', trend: 'up' },
    { metric: 'Head Circumference', current: '42 cm', percentile: '70th', trend: 'up' },
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            👶 Baby Health Dashboard
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Track your baby&apos;s health, development, and feeding schedule all in one place.
          </p>
        </div>

        {/* Section Navigation */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {healthSections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id as 'feeding' | 'development' | 'vaccinations' | 'growth')}
                className={`p-4 rounded-2xl transition-all duration-300 ${
                  activeSection === section.id
                    ? 'bg-gradient-to-r ' + section.color + ' text-white shadow-lg'
                    : 'bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
                }`}
              >
                <section.icon className="w-6 h-6 mx-auto mb-2" />
                <p className="text-sm font-medium">{section.title}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Content Sections */}
        {activeSection === 'feeding' && (
          <div className="space-y-8">
            {/* Feeding Overview */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{ageContent.feedingTitle}</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">{ageContent.feedingContent}</p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-2xl">
                  <Droplets className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">8</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Feeds today</p>
                </div>
                <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-2xl">
                  <Clock className="w-8 h-8 text-green-500 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">20 min</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Last feed duration</p>
                </div>
                <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-2xl">
                  <Calendar className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">3h</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Next feed in</p>
                </div>
              </div>
            </div>

            {/* Feeding Schedule */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Today&apos;s Feeding Schedule</h3>
              <div className="space-y-3">
                {feedingSchedule.map((feed, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                        <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">{feed.time}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{feed.type}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{feed.duration}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{feed.notes}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeSection === 'development' && (
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Development Milestones</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Current Age Milestones</h3>
                <div className="space-y-3">
                  {ageContent.developmentMilestones.map((milestone, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300">{milestone}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Development Tips</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2">Tummy Time</h4>
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      Give your baby 15-30 minutes of supervised tummy time daily to strengthen neck and shoulder muscles.
                    </p>
                  </div>
                  <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <h4 className="font-medium text-purple-800 dark:text-purple-200 mb-2">Reading Together</h4>
                    <p className="text-sm text-purple-700 dark:text-purple-300">
                      Read colorful books and sing songs to support language development and bonding.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'vaccinations' && (
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Vaccination Schedule</h2>
            <div className="space-y-4">
              {vaccinationSchedule.map((vaccination, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between p-4 rounded-xl ${
                    vaccination.status === 'completed'
                      ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800'
                      : vaccination.status === 'upcoming'
                      ? 'bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800'
                      : 'bg-gray-50 dark:bg-gray-700'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        vaccination.status === 'completed'
                          ? 'bg-green-500 text-white'
                          : vaccination.status === 'upcoming'
                          ? 'bg-yellow-500 text-white'
                          : 'bg-gray-400 text-white'
                      }`}
                    >
                      {vaccination.status === 'completed' ? '✓' : vaccination.status === 'upcoming' ? '!' : '○'}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">{vaccination.vaccine}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{vaccination.age}</p>
                    </div>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      vaccination.status === 'completed'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200'
                        : vaccination.status === 'upcoming'
                        ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200'
                        : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                    }`}
                  >
                    {vaccination.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'growth' && (
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Growth Tracking</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {growthData.map((data, index) => (
                <div key={index} className="text-center p-6 bg-gray-50 dark:bg-gray-700 rounded-2xl">
                  <div className="w-16 h-16 bg-gradient-to-r from-[#F59297] to-[#7da8e6] rounded-full flex items-center justify-center mx-auto mb-4">
                    {data.metric === 'Weight' && <Scale className="w-8 h-8 text-white" />}
                    {data.metric === 'Height' && <Ruler className="w-8 h-8 text-white" />}
                    {data.metric === 'Head Circumference' && <Baby className="w-8 h-8 text-white" />}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{data.metric}</h3>
                  <p className="text-2xl font-bold text-[#F59297] mb-1">{data.current}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{data.percentile} percentile</p>
                  <div className="mt-3 flex items-center justify-center">
                    <span className="text-green-500 text-sm">↗ Growing well</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default BabyHealthPage