import { Utensils, Dumbbell, Calendar, Stethoscope, MessageCircle } from 'lucide-react'

interface QuickOverviewProps {
  trimesterData: {
    exerciseTip: string
  }
}

const QuickOverview = ({ trimesterData }: QuickOverviewProps) => {
  const overviewCards = [
    {
      icon: Utensils,
      color: 'orange-500',
      category: 'Nutrition',
      title: "Today's Meal Plan",
      description: 'Tap to view trimester-safe meals'
    },
    {
      icon: Dumbbell,
      color: 'green-500',
      category: 'Exercise',
      title: 'Safe Exercise Tip',
      description: trimesterData.exerciseTip
    },
    {
      icon: Calendar,
      color: 'blue-500',
      category: 'Schedule',
      title: 'Upcoming Appointment',
      description: 'Next visit: Dec 15, 2024'
    },
    {
      icon: Stethoscope,
      color: 'purple-500',
      category: 'Health',
      title: 'Weekly Health Tip',
      description: 'Monitor baby movements daily'
    },
    {
      icon: MessageCircle,
      color: '[#F59297]',
      category: 'Support',
      title: 'Ask a Midwife',
      description: 'Get expert advice anytime'
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
      {overviewCards.map((card, index) => (
        <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer">
          <div className="flex items-center justify-between mb-4">
            <card.icon className={`w-8 h-8 text-${card.color}`} />
            <span className="text-sm text-gray-500 dark:text-gray-400">{card.category}</span>
          </div>
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{card.title}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">{card.description}</p>
        </div>
      ))}
    </div>
  )
}

export default QuickOverview
