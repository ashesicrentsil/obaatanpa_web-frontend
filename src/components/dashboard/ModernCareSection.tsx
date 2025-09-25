'use client'

import { useState } from 'react'
import {
  BookOpen,
  Clock,
  Apple,
  MapPin,
  Phone,
  ClipboardList,
  AlertTriangle,
  CheckCircle,
  Heart,
  Mic,
  PenTool,
  Brain,
  ChevronRight,
  Star,
  Calendar,
  ArrowRight,
} from 'lucide-react'

interface Article {
  title: string
  time: string
  category: string
}

interface ModernCareSectionProps {
  trimesterData: {
    title: string
    articles: Article[]
    nutritionTip: string
  }
  emergencyInfo?: string
}

const ModernCareSection = ({ trimesterData, emergencyInfo }: ModernCareSectionProps) => {
  const [checklist, setChecklist] = useState({
    vitamins: false,
    water: false,
    exercise: false,
    sleep: false,
  })

  const handleChecklistToggle = (item: keyof typeof checklist) => {
    setChecklist((prev) => ({ ...prev, [item]: !prev[item] }))
  }

  // Define interface for checklist items
  interface ChecklistItem {
    key: keyof typeof checklist
    label: string
    icon: string // Renamed from emoji to icon for consistency
  }

  const checklistItems: ChecklistItem[] = [
    { key: 'vitamins', label: 'Take prenatal vitamins', icon: '💊' },
    { key: 'water', label: 'Drink 8 glasses of water', icon: '💧' },
    { key: 'exercise', label: 'Short walk or breathing exercise', icon: '🚶‍♀️' },
    { key: 'sleep', label: 'Sleep log', icon: '😴' },
  ]

  const wellnessTools = [
    {
      icon: Mic,
      title: 'Guided Breathing',
      description: 'Audio + Animation',
      color: 'from-[#7da8e6] to-[#F59297]',
      emoji: '🧘‍♀️',
    },
    {
      icon: PenTool,
      title: 'Journal Entry',
      description: 'Mood & Reflection',
      color: 'from-[#F59297] to-[#7da8e6]',
      emoji: '📝',
    },
    {
      icon: Brain,
      title: 'Mental Health Check',
      description: 'Self-Assessment',
      color: 'from-[#7da8e6] to-[#F59297]',
      emoji: '🧠',
    },
  ]

  const emergencyTools = [
    { icon: MapPin, title: 'Nearest Hospital', detail: '2.3 km', color: 'text-[#F59297]', emoji: '🏥' },
    { icon: Phone, title: 'Emergency Contact', detail: 'Call now', color: 'text-[#7da8e6]', emoji: '📞' },
    { icon: ClipboardList, title: 'Birth Plan Form', detail: 'Ready', color: 'text-[#F59297]', emoji: '📋' },
  ]

  const completedTasks = Object.values(checklist).filter(Boolean).length
  const progressPercentage = (completedTasks / 4) * 100

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Trimester Articles Section */}
      <section className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{trimesterData.title} Articles</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Expert-curated content tailored for your pregnancy journey
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trimesterData.articles.map((article, index) => (
            <div
              key={index}
              className="group bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100 dark:border-gray-700 hover:border-[#F59297]/30"
            >
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#F59297] to-[#7da8e6] rounded-2xl flex items-center justify-center flex-shrink-0">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2 group-hover:text-[#F59297] transition-colors">
                    {article.title}
                  </h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      <span>{article.time}</span>
                    </div>
                    <span className="bg-[#F59297]/10 text-[#F59297] px-3 py-1 rounded-full text-xs font-medium">
                      {article.category}
                    </span>
                  </div>
                  <div className="flex items-center text-[#F59297] font-medium text-sm group-hover:translate-x-1 transition-transform">
                    Read more <ArrowRight className="w-4 h-4 ml-1" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Nutrition & Daily Care Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Nutrition Focus */}
        <div className="bg-gradient-to-br from-[#F59297] to-[#7da8e6] rounded-3xl p-8 text-white">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mr-4">
              <Apple className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold">Nutrition This Week</h3>
              <p className="text-white/80">Personalized for your trimester</p>
            </div>
          </div>

          <div className="bg-white/10 rounded-2xl p-6 mb-6">
            <p className="text-white/90 leading-relaxed">{trimesterData.nutritionTip}</p>
          </div>

          <button className="w-full bg-white text-[#F59297] py-4 rounded-2xl font-bold hover:bg-white/90 transition-colors duration-200 flex items-center justify-center">
            <span>View Personalized Meal Plan</span>
            <ChevronRight className="w-5 h-5 ml-2" />
          </button>
        </div>

        {/* Daily Checklist */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Daily Checklist</h3>
              <p className="text-gray-600 dark:text-gray-400">Stay on track with your wellness</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-[#F59297]">{completedTasks}/4</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">completed</div>
            </div>
          </div>

          <div className="space-y-4 mb-6">
            {checklistItems.map((item) => (
              <label key={item.key} className="flex items-center cursor-pointer group">
                <div className="flex items-center space-x-4 flex-1">
                  <div className="text-2xl">{item.icon}</div> {/* Changed from item.emoji to item.icon */}
                  <div className="flex-1">
                    <span
                      className={`text-gray-900 dark:text-white font-medium ${
                        checklist[item.key] ? 'line-through text-gray-500 dark:text-gray-400' : ''
                      }`}
                    >
                      {item.label}
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={checklist[item.key]}
                    onChange={() => handleChecklistToggle(item.key)}
                    className="sr-only"
                  />
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                      checklist[item.key]
                        ? 'bg-[#F59297] border-[#F59297]'
                        : 'border-gray-300 dark:border-gray-600 group-hover:border-[#F59297]'
                    }`}
                  >
                    {checklist[item.key] && <CheckCircle className="w-4 h-4 text-white" />}
                  </div>
                </div>
              </label>
            ))}
          </div>

          <div className="bg-gray-50 dark:bg-gray-700 rounded-2xl p-4">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-gray-600 dark:text-gray-300 font-medium">Today's Progress</span>
              <span className="font-bold text-[#F59297]">{Math.round(progressPercentage)}%</span>
            </div>
            <div className="bg-gray-200 dark:bg-gray-600 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-[#F59297] to-[#7da8e6] h-3 rounded-full transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Tools & Wellness Support */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Emergency Tools */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg border border-gray-100 dark:border-gray-700">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-2xl flex items-center justify-center mr-4">
                <AlertTriangle className="w-6 h-6 text-red-500" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Stay Ready, Stay Safe</h3>
                <p className="text-gray-600 dark:text-gray-400">Emergency resources at your fingertips</p>
              </div>
            </div>

            {emergencyInfo && (
              <div className="mb-6 p-4 bg-orange-50 dark:bg-orange-900/20 border-l-4 border-orange-400 rounded-r-xl">
                <div className="flex items-start">
                  <AlertTriangle className="w-5 h-5 text-orange-500 mr-3 mt-0.5 flex-shrink-0" />
                  <p className="text-orange-700 dark:text-orange-300 font-medium">{emergencyInfo}</p>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {emergencyTools.map((tool, index) => (
                <button
                  key={index}
                  className="p-6 border-2 border-gray-200 dark:border-gray-700 rounded-2xl hover:border-[#F59297] hover:bg-[#F59297]/5 transition-all duration-200 group text-left"
                >
                  <div className="text-3xl mb-3">{tool.emoji}</div>
                  <h4 className="font-bold text-gray-900 dark:text-white mb-1 group-hover:text-[#F59297] transition-colors">
                    {tool.title}
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{tool.detail}</p>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Wellness Support */}
        <div className="bg-gradient-to-br from-[#7da8e6] to-[#F59297] rounded-3xl p-8 text-white">
          <div className="flex items-center mb-6">
            <Heart className="w-8 h-8 text-white mr-3" />
            <div>
              <h3 className="text-xl font-bold">Your Care Toolbox</h3>
              <p className="text-white/80">Mental wellness tools</p>
            </div>
          </div>

          <div className="space-y-4">
            {wellnessTools.map((tool, index) => (
              <button
                key={index}
                className="w-full p-4 bg-white/10 rounded-2xl hover:bg-white/20 transition-all duration-200 text-left group"
              >
                <div className="flex items-center space-x-4">
                  <div className="text-2xl">{tool.emoji}</div>
                  <div className="flex-1">
                    <h4 className="font-bold text-white mb-1">{tool.title}</h4>
                    <p className="text-white/80 text-sm">{tool.description}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-white/60 group-hover:text-white group-hover:translate-x-1 transition-all" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default ModernCareSection