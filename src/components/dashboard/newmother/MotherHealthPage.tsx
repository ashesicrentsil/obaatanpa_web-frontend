'use client'

import { useState } from 'react'
import { Heart, Brain, Calendar, Activity, Thermometer, Droplets, Moon, Smile, AlertCircle, CheckCircle } from 'lucide-react'

interface MotherHealthPageProps {
  motherName?: string
  postpartumWeeks?: number
}

const MotherHealthPage = ({ motherName = "Mama", postpartumWeeks = 12 }: MotherHealthPageProps) => {
  const [activeSection, setActiveSection] = useState<'recovery' | 'mental-health' | 'checkups' | 'wellness'>('recovery')

  const healthSections = [
    {
      id: 'recovery',
      title: 'Recovery',
      icon: Heart,
      color: 'from-pink-500 to-pink-600'
    },
    {
      id: 'mental-health',
      title: 'Mental Health',
      icon: Brain,
      color: 'from-purple-500 to-purple-600'
    },
    {
      id: 'checkups',
      title: 'Check-ups',
      icon: Calendar,
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 'wellness',
      title: 'Wellness',
      icon: Activity,
      color: 'from-green-500 to-green-600'
    }
  ]

  const recoveryChecklist = [
    { item: 'Bleeding has reduced significantly', completed: true },
    { item: 'Able to walk without pain', completed: true },
    { item: 'Sleeping 4+ hours at night', completed: false },
    { item: 'Appetite has returned to normal', completed: true },
    { item: 'Energy levels improving', completed: false },
    { item: 'Mood is stable most days', completed: true }
  ]

  const mentalHealthTips = [
    {
      title: 'Baby Blues vs Postpartum Depression',
      description: 'Learn to recognize the difference and when to seek help',
      icon: '🧠',
      severity: 'info'
    },
    {
      title: 'Self-Care Strategies',
      description: 'Simple ways to care for yourself while caring for baby',
      icon: '💆🏽‍♀️',
      severity: 'success'
    },
    {
      title: 'Support Network',
      description: 'Building connections with other mothers and family',
      icon: '👥',
      severity: 'info'
    },
    {
      title: 'Warning Signs',
      description: 'When to contact your healthcare provider immediately',
      icon: '⚠️',
      severity: 'warning'
    }
  ]

  const upcomingCheckups = [
    {
      type: 'Postnatal Check-up',
      date: '2024-08-15',
      provider: 'Dr. Sarah Mensah',
      location: 'Ridge Hospital',
      status: 'scheduled'
    },
    {
      type: 'Mental Health Screening',
      date: '2024-08-22',
      provider: 'Counselor Ama Asante',
      location: 'Virtual Appointment',
      status: 'pending'
    }
  ]

  const wellnessActivities = [
    {
      activity: 'Gentle Walking',
      duration: '15-30 minutes',
      frequency: 'Daily',
      benefits: 'Improves circulation and mood',
      icon: '🚶🏽‍♀️'
    },
    {
      activity: 'Pelvic Floor Exercises',
      duration: '10 minutes',
      frequency: '3x daily',
      benefits: 'Strengthens core and prevents incontinence',
      icon: '🧘🏽‍♀️'
    },
    {
      activity: 'Deep Breathing',
      duration: '5 minutes',
      frequency: 'As needed',
      benefits: 'Reduces stress and anxiety',
      icon: '🫁'
    },
    {
      activity: 'Adequate Sleep',
      duration: '6-8 hours',
      frequency: 'Daily',
      benefits: 'Essential for recovery and mental health',
      icon: '😴'
    }
  ]

  const moodTracker = [
    { day: 'Mon', mood: 'good', energy: 'medium' },
    { day: 'Tue', mood: 'excellent', energy: 'high' },
    { day: 'Wed', mood: 'fair', energy: 'low' },
    { day: 'Thu', mood: 'good', energy: 'medium' },
    { day: 'Fri', mood: 'good', energy: 'high' },
    { day: 'Sat', mood: 'excellent', energy: 'high' },
    { day: 'Sun', mood: 'fair', energy: 'medium' }
  ]

  const getMoodColor = (mood: string) => {
    switch (mood) {
      case 'excellent': return 'bg-green-500'
      case 'good': return 'bg-blue-500'
      case 'fair': return 'bg-yellow-500'
      case 'poor': return 'bg-red-500'
      default: return 'bg-gray-400'
    }
  }

  const getEnergyHeight = (energy: string) => {
    switch (energy) {
      case 'high': return 'h-8'
      case 'medium': return 'h-6'
      case 'low': return 'h-4'
      default: return 'h-2'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            🤱🏽 Mother's Health Dashboard
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Your postpartum recovery and wellness journey, {motherName}. You're doing amazing!
          </p>
        </div>

        {/* Recovery Progress Banner */}
        <div className="bg-gradient-to-r from-[#F59297] to-[#7da8e6] rounded-3xl p-6 mb-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">Week {postpartumWeeks} Postpartum</h2>
              <p className="text-white/90">You're in the recovery phase. Focus on rest and gentle activities.</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">75%</div>
              <div className="text-sm text-white/80">Recovery Progress</div>
            </div>
          </div>
        </div>

        {/* Section Navigation */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {healthSections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id as any)}
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
        {activeSection === 'recovery' && (
          <div className="space-y-8">
            {/* Recovery Checklist */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Recovery Checklist</h2>
              <div className="space-y-4">
                {recoveryChecklist.map((item, index) => (
                  <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                      item.completed ? 'bg-green-500 text-white' : 'bg-gray-300 dark:bg-gray-600'
                    }`}>
                      {item.completed ? <CheckCircle className="w-4 h-4" /> : <div className="w-2 h-2 bg-white rounded-full" />}
                    </div>
                    <p className={`flex-1 ${
                      item.completed ? 'text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-400'
                    }`}>
                      {item.item}
                    </p>
                    {!item.completed && (
                      <button className="text-[#F59297] hover:text-[#e67d82] text-sm font-medium">
                        Mark Complete
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Daily Mood & Energy Tracker */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">This Week's Mood & Energy</h3>
              <div className="grid grid-cols-7 gap-4">
                {moodTracker.map((day, index) => (
                  <div key={index} className="text-center">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">{day.day}</p>
                    <div className="space-y-2">
                      <div className={`w-8 h-8 rounded-full mx-auto ${getMoodColor(day.mood)}`}></div>
                      <div className={`w-4 bg-blue-500 mx-auto rounded ${getEnergyHeight(day.energy)}`}></div>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 capitalize">{day.mood}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex justify-center space-x-6 text-xs text-gray-500 dark:text-gray-400">
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span>Excellent</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span>Good</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span>Fair</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'mental-health' && (
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Mental Health & Wellness</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mentalHealthTips.map((tip, index) => (
                <div key={index} className={`p-6 rounded-2xl border-2 ${
                  tip.severity === 'warning' 
                    ? 'border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-900/20'
                    : tip.severity === 'success'
                    ? 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20'
                    : 'border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-900/20'
                }`}>
                  <div className="flex items-start space-x-4">
                    <div className="text-3xl">{tip.icon}</div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{tip.title}</h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">{tip.description}</p>
                      <button className="mt-3 text-[#F59297] hover:text-[#e67d82] font-medium text-sm">
                        Learn More →
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'checkups' && (
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Upcoming Check-ups</h2>
            <div className="space-y-4">
              {upcomingCheckups.map((checkup, index) => (
                <div key={index} className="flex items-center justify-between p-6 bg-gray-50 dark:bg-gray-700 rounded-2xl">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-[#F59297] rounded-full flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{checkup.type}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{checkup.provider} • {checkup.location}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{new Date(checkup.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="text-[#F59297] hover:text-[#e67d82] font-medium text-sm">
                      Reschedule
                    </button>
                    <button className="bg-[#F59297] hover:bg-[#e67d82] text-white px-4 py-2 rounded-lg font-medium text-sm">
                      Confirm
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'wellness' && (
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Wellness Activities</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {wellnessActivities.map((activity, index) => (
                <div key={index} className="p-6 bg-gray-50 dark:bg-gray-700 rounded-2xl">
                  <div className="flex items-start space-x-4">
                    <div className="text-3xl">{activity.icon}</div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{activity.activity}</h3>
                      <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                        <p><strong>Duration:</strong> {activity.duration}</p>
                        <p><strong>Frequency:</strong> {activity.frequency}</p>
                        <p><strong>Benefits:</strong> {activity.benefits}</p>
                      </div>
                      <button className="mt-3 bg-[#F59297] hover:bg-[#e67d82] text-white px-4 py-2 rounded-lg font-medium text-sm">
                        Start Activity
                      </button>
                    </div>
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

export default MotherHealthPage
