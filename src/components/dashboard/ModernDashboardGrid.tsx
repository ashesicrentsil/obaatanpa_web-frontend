'use client'

import { useState } from 'react'
import { 
  Baby, 
  BookOpen, 
  MessageCircle, 
  Heart, 
  Calendar,
  Utensils,
  Shield,
  CheckCircle,
  TrendingUp,
  Clock,
  ChevronRight,
  Play,
  MoreHorizontal
} from 'lucide-react'

interface ModernDashboardGridProps {
  trimesterData: any
  week: number
  userName: string
}

const ModernDashboardGrid = ({ trimesterData, week, userName }: ModernDashboardGridProps) => {
  const [activeToolIndex, setActiveToolIndex] = useState(0)

  // Get tool icon emoji
  const getToolIcon = (title: string) => {
    const iconMap: { [key: string]: string } = {
      'Due Date Calculator': '📅',
      'Ovulation Calculator': '🌸',
      'Chinese Gender Predictor': '🔮',
      'Weight Gain Calculator': '⚖️',
      'Baby Registry': '📝',
      'Baby Products': '🛍️',
      'Pack My Hospital Bag': '🏥',
      'Create Birth Plan': '📋',
      'Feeding Tracker Preview': '🍼'
    }
    return iconMap[title] || '🔧'
  }

  const getBabyEmoji = (size: string) => {
    switch (size) {
      case 'lime': return '🟢'
      case 'mango': return '🥭'
      case 'watermelon': return '🍉'
      default: return '🥭'
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Modern Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Large Featured Card - Tools & Calculators */}
        <div className="lg:col-span-8">
          <div className="bg-gradient-to-br from-[#F59297] to-[#7da8e6] rounded-3xl p-8 text-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 opacity-50"></div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2">{trimesterData.title} Tools & Calculators</h2>
                  <p className="text-gray-300">Personalized pregnancy tools for week {week}</p>
                </div>
                <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                  <MoreHorizontal className="w-5 h-5" />
                </button>
              </div>

              {/* Tools Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {trimesterData.tools.slice(0, 6).map((tool: any, index: number) => (
                  <button
                    key={index}
                    onClick={() => setActiveToolIndex(index)}
                    className={`p-4 rounded-2xl transition-all duration-300 text-left ${
                      activeToolIndex === index 
                        ? 'bg-white/20 scale-105' 
                        : 'bg-white/10 hover:bg-white/15'
                    }`}
                  >
                    <div className="text-2xl mb-2">{getToolIcon(tool.title)}</div>
                    <h3 className="font-semibold text-sm mb-1">{tool.title}</h3>
                    <p className="text-xs text-gray-300 overflow-hidden">{tool.description}</p>
                  </button>
                ))}
              </div>

              {/* Progress Bar */}
              <div className="mt-6 flex items-center space-x-4">
                <div className="flex-1 bg-white/20 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-[#F59297] to-[#7da8e6] h-2 rounded-full transition-all duration-500"
                    style={{ width: `${(week / 40) * 100}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium">{week}/40 weeks</span>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Stats Card */}
        <div className="lg:col-span-4">
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900 dark:text-white">Your Progress</h3>
              <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                <MoreHorizontal className="w-4 h-4 text-gray-500" />
              </button>
            </div>

            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-r from-[#F59297] to-[#7da8e6] rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">👶</span>
              </div>
              <h4 className="font-bold text-gray-900 dark:text-white">{userName}</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">@week{week}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{week}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Weeks</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{40 - week}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">To Go</div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-xl">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">Appointments</span>
                </div>
                <span className="text-sm text-green-600 dark:text-green-400">Up to date</span>
              </div>
            </div>
          </div>
        </div>

        {/* Baby Development Card */}
        <div className="lg:col-span-5">
          <div className="bg-gradient-to-br from-[#7da8e6] to-[#F59297] rounded-3xl p-6 text-white relative overflow-hidden">
            <div className="absolute top-4 right-4">
              <button className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors">
                <Play className="w-4 h-4" />
              </button>
            </div>
            
            <div className="mb-4">
              <h3 className="text-lg font-bold mb-2">Your Baby This Week</h3>
              <p className="text-white/80">Week {week} Development</p>
            </div>

            <div className="flex items-center space-x-4 mb-4">
              <div className="text-4xl">{getBabyEmoji(trimesterData.babySize)}</div>
              <div>
                <p className="font-semibold">Size of a {trimesterData.babySize}</p>
                <p className="text-sm text-white/80">Growing strong!</p>
              </div>
            </div>

            <p className="text-sm text-white/80 mb-4 overflow-hidden">
              {trimesterData.development}
            </p>

            <button className="flex items-center text-sm font-medium hover:underline">
              Learn more <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          </div>
        </div>

        {/* Quick Stats Card */}
        <div className="lg:col-span-3">
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900 dark:text-white">Stats</h3>
              <select className="text-xs bg-transparent border border-gray-200 dark:border-gray-600 rounded-lg px-2 py-1">
                <option>Week</option>
                <option>Month</option>
              </select>
            </div>

            <div className="text-center mb-4">
              <div className="text-3xl font-bold text-gray-900 dark:text-white">+{Math.round((week/40)*100)}%</div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Progress</p>
            </div>

            {/* Mini Chart Placeholder */}
            <div className="h-20 bg-gradient-to-r from-[#F59297]/10 to-[#7da8e6]/10 dark:from-[#F59297]/20 dark:to-[#7da8e6]/20 rounded-xl mb-4 flex items-end justify-center">
              <div className="flex items-end space-x-1 h-full py-2">
                {[...Array(7)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-[#7da8e6] rounded-sm"
                    style={{
                      width: '8px',
                      height: `${Math.random() * 60 + 20}%`
                    }}
                  ></div>
                ))}
              </div>
            </div>

            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
              <span>Mon</span>
              <span>Wed</span>
              <span>Fri</span>
            </div>
          </div>
        </div>

        {/* Revenue/Health Card */}
        <div className="lg:col-span-4">
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-[#F59297]/10 dark:bg-[#F59297]/20 rounded-full flex items-center justify-center">
                <Heart className="w-5 h-5 text-[#F59297]" />
              </div>
              <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                <MoreHorizontal className="w-4 h-4 text-gray-500" />
              </button>
            </div>

            <h3 className="text-sm text-gray-500 dark:text-gray-400 mb-2">Health Score</h3>
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">95%</div>
            <div className="flex items-center text-sm text-[#7da8e6] dark:text-[#7da8e6] mb-4">
              <TrendingUp className="w-4 h-4 mr-1" />
              <span>+5% from last week</span>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Nutrition</span>
                <span className="font-medium text-gray-900 dark:text-white">92%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Exercise</span>
                <span className="font-medium text-gray-900 dark:text-white">88%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Sleep</span>
                <span className="font-medium text-gray-900 dark:text-white">95%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Community Chat Card */}
        <div className="lg:col-span-8">
          <div className="bg-gradient-to-r from-[#F59297] to-[#7da8e6] rounded-3xl p-6 text-white">
            <h3 className="text-xl font-bold mb-2">Do you have a question today?</h3>
            <p className="mb-4 text-white/90">
              💬 Tap to chat with a certified midwife, nurse, or nutritionist.
            </p>

            <div className="flex flex-wrap gap-3 mb-4">
              <button className="bg-white text-[#F59297] px-4 py-2 rounded-full text-sm font-medium hover:bg-white/90 transition-colors">
                Nutrition
              </button>
              <button className="bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-white/30 transition-colors">
                + Exercise
              </button>
              <button className="bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-white/30 transition-colors">
                + Sleep
              </button>
              <button className="bg-white text-[#F59297] px-4 py-2 rounded-full text-sm font-medium hover:bg-white/90 transition-colors">
                ✓ Prenatal Care
              </button>
              <button className="bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-white/30 transition-colors">
                + Baby Development
              </button>
              <button className="bg-white text-[#F59297] px-4 py-2 rounded-full text-sm font-medium hover:bg-white/90 transition-colors">
                ✓ Health Tracking
              </button>
            </div>

            <button className="bg-white text-[#F59297] px-6 py-3 rounded-full font-medium hover:bg-white/90 transition-colors flex items-center">
              <MessageCircle className="w-4 h-4 mr-2" />
              Start Chat
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}

export default ModernDashboardGrid
