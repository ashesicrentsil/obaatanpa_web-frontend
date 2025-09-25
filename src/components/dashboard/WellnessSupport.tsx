import { Heart, Mic, PenTool, Brain } from 'lucide-react'

const WellnessSupport = () => {
  const wellnessTools = [
    {
      icon: Mic,
      color: 'blue-500',
      title: 'Guided Breathing',
      description: 'Audio + Animation'
    },
    {
      icon: PenTool,
      color: 'green-500',
      title: 'Journal Entry',
      description: 'Mood & Reflection'
    },
    {
      icon: Brain,
      color: 'purple-500',
      title: 'Mental Health Check',
      description: 'Self-Assessment'
    }
  ]

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
      <div className="flex items-center mb-4">
        <Heart className="w-6 h-6 text-[#F59297] mr-2" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Your Care Toolbox</h3>
      </div>
      
      <div className="space-y-3">
        {wellnessTools.map((tool, index) => (
          <button key={index} className="w-full flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
            <div className="flex items-center">
              <tool.icon className={`w-5 h-5 text-${tool.color} mr-3`} />
              <span className="text-gray-900 dark:text-white">{tool.title}</span>
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400">{tool.description}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default WellnessSupport
