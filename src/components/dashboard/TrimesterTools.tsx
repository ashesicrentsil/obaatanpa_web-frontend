interface Tool {
  icon: any
  title: string
  description: string
  color: string
}

interface TrimesterToolsProps {
  trimesterData: {
    title: string
    tools: Tool[]
  }
}

const TrimesterTools = ({ trimesterData }: TrimesterToolsProps) => {
  // Define tool icons and emojis based on tool type
  const getToolIcon = (title: string, color: string) => {
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

  const getColorClasses = (color: string) => {
    const colorMap = {
      'blue': {
        bg: 'from-blue-100 to-blue-50 dark:from-blue-900/30 dark:to-blue-800/20',
        border: 'border-blue-200 dark:border-blue-700/50',
        text: 'text-blue-700 dark:text-blue-300'
      },
      'green': {
        bg: 'from-green-100 to-green-50 dark:from-green-900/30 dark:to-green-800/20',
        border: 'border-green-200 dark:border-green-700/50',
        text: 'text-green-700 dark:text-green-300'
      },
      'purple': {
        bg: 'from-purple-100 to-purple-50 dark:from-purple-900/30 dark:to-purple-800/20',
        border: 'border-purple-200 dark:border-purple-700/50',
        text: 'text-purple-700 dark:text-purple-300'
      },
      'pink': {
        bg: 'from-pink-100 to-pink-50 dark:from-pink-900/30 dark:to-pink-800/20',
        border: 'border-pink-200 dark:border-pink-700/50',
        text: 'text-pink-700 dark:text-pink-300'
      },
      'orange': {
        bg: 'from-orange-100 to-orange-50 dark:from-orange-900/30 dark:to-orange-800/20',
        border: 'border-orange-200 dark:border-orange-700/50',
        text: 'text-orange-700 dark:text-orange-300'
      }
    }

    return colorMap[color as keyof typeof colorMap] || colorMap.blue
  }

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          {trimesterData.title} Tools & Calculators
        </h2>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500 dark:text-gray-400">Personalized for you</span>
          <div className="w-2 h-2 bg-[#F59297] rounded-full"></div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {trimesterData.tools.map((tool, index) => {
          const colorClasses = getColorClasses(tool.color)
          const toolIcon = getToolIcon(tool.title, tool.color)

          return (
            <div
              key={index}
              className={`bg-gradient-to-r ${colorClasses.bg} ${colorClasses.border} border rounded-2xl p-4 hover:shadow-lg transition-all duration-300 cursor-pointer group hover:scale-[1.02]`}
            >
              <div className="flex items-center space-x-4">
                {/* Icon Container */}
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-white/80 dark:bg-gray-800/80 rounded-xl flex items-center justify-center shadow-sm">
                    <span className="text-2xl">{toolIcon}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3 className={`font-semibold ${colorClasses.text} mb-1 group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-200`}>
                    {tool.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                    {tool.description}
                  </p>
                </div>

                {/* Arrow/Action Indicator */}
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-white/60 dark:bg-gray-700/60 rounded-full flex items-center justify-center group-hover:bg-white dark:group-hover:bg-gray-600 transition-all duration-200">
                    <svg
                      className="w-4 h-4 text-gray-600 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-200"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default TrimesterTools
