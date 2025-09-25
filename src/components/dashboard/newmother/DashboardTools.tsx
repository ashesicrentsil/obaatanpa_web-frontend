'use client'

import { 
  Milk, 
  Moon, 
  Syringe, 
  Camera, 
  Baby, 
  MessageCircle, 
  TrendingUp,
  Plus,
  Clock,
  Calendar
} from 'lucide-react'

interface DashboardToolsProps {
  babyAge?: string
  feedsToday?: number
  sleepHours?: number
  nextVaccine?: string
  nextVaccineDate?: string
}

const DashboardTools = ({ 
  babyAge, 
  feedsToday = 3, 
  sleepHours = 9, 
  nextVaccine = "6-month shots",
  nextVaccineDate = "Aug 3, 2025"
}: DashboardToolsProps) => {

  const handleToolClick = (toolId: string) => {
    console.log(`Opening tool: ${toolId}`)
    // Here you would open the specific tool/modal
  }

  const tools = [
    {
      id: 'feeding-tracker',
      icon: Milk,
      title: 'Feeding Tracker',
      description: `Today: ${feedsToday} feeds logged`,
      action: 'Log Feed',
      color: 'from-pink-500 to-pink-600',
      bgColor: 'bg-pink-50 dark:bg-pink-900/20'
    },
    {
      id: 'sleep-tracker',
      icon: Moon,
      title: 'Sleep Tracker',
      description: `Baby slept ${sleepHours}h total`,
      action: 'Log Sleep',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20'
    },
    {
      id: 'vaccination',
      icon: Syringe,
      title: 'Vaccination',
      description: `Next: ${nextVaccine} on ${nextVaccineDate}`,
      action: 'View Schedule',
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50 dark:bg-green-900/20'
    },
    {
      id: 'baby-journal',
      icon: Camera,
      title: 'Baby Journal',
      description: "Add today's memory",
      action: 'Add Memory',
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20'
    },
    {
      id: 'infant-activities',
      icon: Baby,
      title: 'Infant Activities',
      description: babyAge === '0-3' ? 'Tummy time: 10 mins' : 'Crawling practice: 15 mins',
      action: 'Try Activity',
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20'
    },
    {
      id: 'ask-midwife',
      icon: MessageCircle,
      title: 'Ask a Midwife',
      description: 'Get professional advice',
      action: 'Open Chat',
      color: 'from-teal-500 to-teal-600',
      bgColor: 'bg-teal-50 dark:bg-teal-900/20'
    },
    {
      id: 'growth-charts',
      icon: TrendingUp,
      title: 'Growth Charts',
      description: 'Track height & weight',
      action: 'View Charts',
      color: 'from-indigo-500 to-indigo-600',
      bgColor: 'bg-indigo-50 dark:bg-indigo-900/20'
    }
  ]

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Your Baby Care Tools
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Track, monitor, and support your baby's development with these essential tools
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {tools.map((tool) => (
            <div
              key={tool.id}
              className={`${tool.bgColor} rounded-2xl p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group`}
              onClick={() => handleToolClick(tool.id)}
            >
              {/* Icon */}
              <div className={`w-14 h-14 bg-gradient-to-r ${tool.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <tool.icon className="w-7 h-7 text-white" />
              </div>

              {/* Content */}
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-pink-600 transition-colors duration-300">
                {tool.title}
              </h3>
              
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 leading-relaxed">
                {tool.description}
              </p>

              {/* Action Button */}
              <button className={`w-full bg-gradient-to-r ${tool.color} text-white py-2 px-4 rounded-lg font-medium text-sm hover:shadow-md transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2`}>
                <Plus className="w-4 h-4" />
                <span>{tool.action}</span>
              </button>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mt-12 bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Quick Actions
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Emergency Contact */}
            <button 
              onClick={() => handleToolClick('emergency')}
              className="bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 rounded-xl p-4 hover:bg-red-100 dark:hover:bg-red-900/30 transition-all duration-300 group"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-lg">🚨</span>
                </div>
                <div className="text-left">
                  <p className="font-semibold text-red-700 dark:text-red-400">Emergency</p>
                  <p className="text-sm text-red-600 dark:text-red-500">Quick help</p>
                </div>
              </div>
            </button>

            {/* Schedule Appointment */}
            <button 
              onClick={() => handleToolClick('appointment')}
              className="bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-xl p-4 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-all duration-300 group"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-white" />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-blue-700 dark:text-blue-400">Book Appointment</p>
                  <p className="text-sm text-blue-600 dark:text-blue-500">Pediatric visit</p>
                </div>
              </div>
            </button>

            {/* Set Reminder */}
            <button 
              onClick={() => handleToolClick('reminder')}
              className="bg-green-50 dark:bg-green-900/20 border-2 border-green-200 dark:border-green-800 rounded-xl p-4 hover:bg-green-100 dark:hover:bg-green-900/30 transition-all duration-300 group"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                  <Clock className="w-5 h-5 text-white" />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-green-700 dark:text-green-400">Set Reminder</p>
                  <p className="text-sm text-green-600 dark:text-green-500">Feeding time</p>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default DashboardTools
