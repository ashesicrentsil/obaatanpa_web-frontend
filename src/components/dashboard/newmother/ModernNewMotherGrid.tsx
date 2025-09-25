'use client'

import { useState } from 'react'
import { 
  Baby, 
  Heart, 
  Calendar,
  Clock,
  Milk,
  Moon,
  Syringe,
  Camera,
  MessageCircle,
  TrendingUp,
  Play,
  MoreHorizontal,
  CheckCircle,
  ChevronRight
} from 'lucide-react'
import { useRouter } from 'next/navigation'

interface ModernNewMotherGridProps {
  babyAge: string
  userName: string
  feedsToday?: number
  sleepHours?: number
  nextVaccine?: string
  nextVaccineDate?: string
}

const ModernNewMotherGrid = ({ 
  babyAge, 
  userName,
  feedsToday = 3, 
  sleepHours = 9, 
  nextVaccine = "6-month shots",
  nextVaccineDate = "Aug 3, 2025"
}: ModernNewMotherGridProps) => {
  const [activeToolIndex, setActiveToolIndex] = useState(0)
  const router = useRouter()

  // Baby care tools based on age
  const getBabyCareTools = () => {
    const baseTools = [
      { id: 'feeding-tracker', icon: '🍼', title: 'Feeding Tracker', description: 'Log feeds and bottles' },
      { id: 'sleep-tracker', icon: '😴', title: 'Sleep Tracker', description: 'Track sleep patterns' },
      { id: 'diaper-log', icon: '👶', title: 'Diaper Log', description: 'Monitor diaper changes' },
      { id: 'growth-chart', icon: '📏', title: 'Growth Chart', description: 'Track height & weight' },
      { id: 'vaccination', icon: '💉', title: 'Vaccinations', description: 'Upcoming shots' },
      { id: 'baby-journal', icon: '📸', title: 'Baby Journal', description: 'Capture memories' }
    ]
    return baseTools
  }

  const tools = getBabyCareTools()

  // Get age-specific milestones
  const getAgeMilestones = () => {
    const ageMonths = parseInt(babyAge.split('-')[0]) || 0
    
    if (ageMonths <= 3) {
      return {
        current: ['Lifting head during tummy time', 'Following objects with eyes', 'Smiling responsively'],
        upcoming: ['Rolling over', 'Reaching for toys', 'Babbling sounds']
      }
    } else if (ageMonths <= 6) {
      return {
        current: ['Sitting with support', 'Rolling both ways', 'Babbling'],
        upcoming: ['Sitting without support', 'Crawling', 'First words']
      }
    } else {
      return {
        current: ['Crawling', 'Pulling to stand', 'First words'],
        upcoming: ['Walking', 'More words', 'Following simple commands']
      }
    }
  }

  const milestones = getAgeMilestones()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Modern Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Large Featured Card - Baby Care Tools */}
        <div className="lg:col-span-8">
          <div className="bg-gradient-to-br from-[#F59297] to-[#7da8e6] rounded-3xl p-8 text-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 opacity-50"></div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Your Baby Care Tools</h2>
                  <p className="text-white/80">Track, monitor, and support your baby's development</p>
                </div>
                <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                  <MoreHorizontal className="w-5 h-5" />
                </button>
              </div>

              {/* Tools Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {tools.slice(0, 6).map((tool, index) => (
                  <button
                    key={index}
                    onClick={() => router.push(`/dashboard/new-mother/${tools[index].id}`)}
                    className={`p-4 rounded-2xl transition-all duration-300 text-left hover:scale-105 ${
                      activeToolIndex === index 
                        ? 'bg-white/20 scale-105' 
                        : 'bg-white/10 hover:bg-white/15'
                    }`}
                  >
                    <div className="text-2xl mb-2">{tool.icon}</div>
                    <h3 className="font-semibold text-sm mb-1">{tool.title}</h3>
                    <p className="text-xs text-white/80 overflow-hidden">{tool.description}</p>
                  </button>
                ))}
              </div>

              {/* Daily Stats */}
              <div className="mt-6 grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold">{feedsToday}</div>
                  <div className="text-xs text-white/80">Feeds Today</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{sleepHours}h</div>
                  <div className="text-xs text-white/80">Sleep Last Night</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">6</div>
                  <div className="text-xs text-white/80">Diapers Today</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Stats Card */}
        <div className="lg:col-span-4">
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900 dark:text-white">Baby Profile</h3>
              <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                <MoreHorizontal className="w-4 h-4 text-gray-500" />
              </button>
            </div>

            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-r from-[#F59297] to-[#7da8e6] rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">👶</span>
              </div>
              <h4 className="font-bold text-gray-900 dark:text-white">{userName}'s Baby</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">{babyAge} months old</p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">6.2</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">kg</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">60</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">cm</div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-xl">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">Vaccinations</span>
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
              <h3 className="text-lg font-bold mb-2">Development Milestones</h3>
              <p className="text-white/80">{babyAge} months development</p>
            </div>

            <div className="mb-4">
              <h4 className="font-semibold mb-2">Current Milestones</h4>
              <div className="space-y-1">
                {milestones.current.slice(0, 2).map((milestone, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-white/20 rounded-full flex items-center justify-center">
                      <span className="text-xs">✓</span>
                    </div>
                    <span className="text-sm text-white/90">{milestone}</span>
                  </div>
                ))}
              </div>
            </div>

            <button className="flex items-center text-sm font-medium hover:underline">
              View all milestones <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          </div>
        </div>

        {/* Quick Stats Card */}
        <div className="lg:col-span-3">
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900 dark:text-white">This Week</h3>
              <select className="text-xs bg-transparent border border-gray-200 dark:border-gray-600 rounded-lg px-2 py-1">
                <option>Week</option>
                <option>Month</option>
              </select>
            </div>

            <div className="text-center mb-4">
              <div className="text-3xl font-bold text-gray-900 dark:text-white">+12%</div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Growth</p>
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

        {/* Health Score Card */}
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

            <h3 className="text-sm text-gray-500 dark:text-gray-400 mb-2">Baby's Health</h3>
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Excellent</div>
            <div className="flex items-center text-sm text-[#7da8e6] dark:text-[#7da8e6] mb-4">
              <TrendingUp className="w-4 h-4 mr-1" />
              <span>Growing well</span>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Feeding</span>
                <span className="font-medium text-gray-900 dark:text-white">Great</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Sleep</span>
                <span className="font-medium text-gray-900 dark:text-white">Good</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Development</span>
                <span className="font-medium text-gray-900 dark:text-white">On track</span>
              </div>
            </div>
          </div>
        </div>

        {/* Ask Expert Card */}
        <div className="lg:col-span-8">
          <div className="bg-gradient-to-r from-[#F59297] to-[#7da8e6] rounded-3xl p-6 text-white">
            <h3 className="text-xl font-bold mb-2">Need parenting advice today?</h3>
            <p className="mb-4 text-white/90">
              💬 Connect with pediatricians, lactation consultants, and child development experts.
            </p>
            
            <div className="flex flex-wrap gap-3 mb-4">
              <button className="bg-white text-[#F59297] px-4 py-2 rounded-full text-sm font-medium hover:bg-white/90 transition-colors">
                Feeding
              </button>
              <button className="bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-white/30 transition-colors">
                + Sleep
              </button>
              <button className="bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-white/30 transition-colors">
                + Development
              </button>
              <button className="bg-white text-[#F59297] px-4 py-2 rounded-full text-sm font-medium hover:bg-white/90 transition-colors">
                ✓ Health
              </button>
              <button className="bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-white/30 transition-colors">
                + Behavior
              </button>
              <button className="bg-white text-[#F59297] px-4 py-2 rounded-full text-sm font-medium hover:bg-white/90 transition-colors">
                ✓ Nutrition
              </button>
            </div>

            <button className="bg-white text-[#F59297] px-6 py-3 rounded-full font-medium hover:bg-white/90 transition-colors flex items-center">
              <MessageCircle className="w-4 h-4 mr-2" />
              Ask an Expert
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}

export default ModernNewMotherGrid
