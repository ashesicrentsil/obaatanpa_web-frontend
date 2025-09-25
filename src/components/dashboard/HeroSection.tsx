interface HeroSectionProps {
  userName: string
  trimesterData: {
    emoji: string
    title: string
    focus: string
  }
  week: number
}

const HeroSection = ({ userName, trimesterData, week }: HeroSectionProps) => {
  // Calculate progress percentage based on week
  const getProgressPercentage = () => {
    if (trimesterData.title === 'First Trimester') return (week / 13) * 100
    if (trimesterData.title === 'Second Trimester') return ((week - 13) / 14) * 100
    return ((week - 27) / 13) * 100
  }

  // Get baby stats based on week
  const getBabyStats = () => {
    const stats = {
      height: '30 cm',
      weight: '600 g',
      heartbeat: '140',
      size: 'corn cob'
    }

    if (week <= 13) {
      stats.height = '7.5 cm'
      stats.weight = '23 g'
      stats.heartbeat = '160'
      stats.size = 'lime'
    } else if (week <= 27) {
      stats.height = '30 cm'
      stats.weight = '600 g'
      stats.heartbeat = '140'
      stats.size = 'corn cob'
    } else {
      stats.height = '45 cm'
      stats.weight = '2.5 kg'
      stats.heartbeat = '130'
      stats.size = 'watermelon'
    }

    return stats
  }

  const babyStats = getBabyStats()
  const progressPercentage = getProgressPercentage()

  return (
    <>
      {/* Inject custom CSS for breathing animation */}
      <style jsx>{`
        @keyframes breathe {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        .breathe-animation {
          animation: breathe 4s ease-in-out infinite;
        }
      `}</style>

    <div className="bg-gradient-to-br from-pink-100 via-pink-50 to-purple-50 dark:from-pink-900/20 dark:via-pink-800/10 dark:to-purple-900/20 rounded-3xl p-8 mb-8 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-4 right-4 w-32 h-32 bg-pink-300 rounded-full"></div>
        <div className="absolute bottom-4 left-4 w-24 h-24 bg-purple-300 rounded-full"></div>
      </div>

      <div className="relative grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
        {/* Left Column - Week Info */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center mb-2">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
              <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Pregnancy Week</span>
            </div>
            <h1 className="text-5xl font-bold text-[#F59297] mb-1">
              {week} Weeks
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              & {Math.floor(Math.random() * 7)} Days
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              {trimesterData.title} • {Math.round(progressPercentage)}% Complete
            </p>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
              <span>Week 1</span>
              <span>Week 40</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-[#F59297] to-purple-400 h-2 rounded-full transition-all duration-500"
                style={{ width: `${(week / 40) * 100}%` }}
              ></div>
            </div>
          </div>

          <button className="bg-[#F59297] text-white px-6 py-3 rounded-full font-medium hover:bg-[#e67d82] transition-colors duration-200">
            This Week's Details
          </button>
        </div>

        {/* Center Column - Baby Illustration */}
        <div className="flex justify-center">
          <div className="relative w-64 h-64">
            {/* Baby Image */}
            <img
              src="/images/dashboard/baby-development.png"
              alt={`Baby development at ${week} weeks`}
              className="w-full h-full object-contain transition-transform duration-300 hover:scale-110 drop-shadow-lg breathe-animation"
              onError={(e) => {
                // Fallback to emoji if image fails to load
                e.currentTarget.style.display = 'none';
                const fallbackElement = e.currentTarget.nextElementSibling as HTMLElement;
                if (fallbackElement) {
                  fallbackElement.style.display = 'flex';
                }
              }}
            />

            {/* Fallback emoji (hidden by default) */}
            <div className="text-8xl hidden items-center justify-center w-full h-full">👶🏽</div>

            {/* Floating animated elements */}
            <div className="absolute top-8 right-8 w-4 h-4 bg-pink-400 rounded-full animate-pulse opacity-60"></div>
            <div className="absolute bottom-12 left-8 w-3 h-3 bg-purple-400 rounded-full animate-pulse delay-300 opacity-60"></div>
            <div className="absolute top-16 left-6 w-2 h-2 bg-blue-400 rounded-full animate-ping delay-500 opacity-40"></div>
            <div className="absolute bottom-8 right-12 w-2 h-2 bg-yellow-400 rounded-full animate-ping delay-700 opacity-40"></div>
            <div className="absolute top-1/3 right-4 w-2 h-2 bg-green-400 rounded-full animate-ping delay-900 opacity-40"></div>
            <div className="absolute bottom-1/3 left-4 w-2 h-2 bg-orange-400 rounded-full animate-ping delay-1100 opacity-40"></div>

            {/* Decorative elements around the image */}
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-pink-400 to-purple-400 rounded-full animate-bounce delay-200 opacity-70"></div>
            <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full animate-bounce delay-500 opacity-70"></div>
            <div className="absolute top-1/2 -left-6 w-3 h-3 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full animate-pulse delay-1000 opacity-60"></div>
            <div className="absolute top-1/2 -right-6 w-3 h-3 bg-gradient-to-br from-green-400 to-emerald-400 rounded-full animate-pulse delay-1200 opacity-60"></div>
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gradient-to-br from-red-400 to-pink-400 rounded-full animate-bounce delay-800 opacity-50"></div>
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gradient-to-br from-indigo-400 to-blue-400 rounded-full animate-bounce delay-1400 opacity-50"></div>
          </div>
        </div>

        {/* Right Column - Baby Stats */}
        <div className="grid grid-cols-2 gap-4">
          {/* Baby's Height */}
          <div className="group relative">
            <div className="w-32 h-32 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30 rounded-full flex flex-col items-center justify-center relative overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg">
              {/* Animated background circles */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-2 right-2 w-4 h-4 bg-blue-300 rounded-full animate-ping"></div>
                <div className="absolute bottom-3 left-3 w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-500"></div>
              </div>

              {/* Content */}
              <div className="relative z-10 text-center">
                <div className="text-2xl mb-1">📏</div>
                <p className="text-lg font-bold text-gray-900 dark:text-white">{babyStats.height}</p>
                <p className="text-xs text-gray-600 dark:text-gray-300">Height</p>
              </div>

              {/* Hover tooltip */}
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                Size of a {babyStats.size}
              </div>
            </div>
          </div>

          {/* Baby's Weight */}
          <div className="group relative">
            <div className="w-32 h-32 bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900/30 dark:to-green-800/30 rounded-full flex flex-col items-center justify-center relative overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg">
              {/* Animated background circles */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-3 left-2 w-3 h-3 bg-green-300 rounded-full animate-bounce delay-200"></div>
                <div className="absolute bottom-2 right-3 w-2 h-2 bg-green-400 rounded-full animate-pulse delay-700"></div>
              </div>

              {/* Content */}
              <div className="relative z-10 text-center">
                <div className="text-2xl mb-1">⚖️</div>
                <p className="text-lg font-bold text-gray-900 dark:text-white">{babyStats.weight}</p>
                <p className="text-xs text-gray-600 dark:text-gray-300">Weight</p>
              </div>

              {/* Hover tooltip */}
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                Growing steadily
              </div>
            </div>
          </div>

          {/* Baby's Heartbeat */}
          <div className="group relative">
            <div className="w-32 h-32 bg-gradient-to-br from-red-100 to-pink-200 dark:from-red-900/30 dark:to-pink-800/30 rounded-full flex flex-col items-center justify-center relative overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg">
              {/* Animated heartbeat effect */}
              <div className="absolute inset-0 opacity-30">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-red-300 rounded-full animate-ping"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-red-400 rounded-full animate-ping delay-300"></div>
              </div>

              {/* Content */}
              <div className="relative z-10 text-center">
                <div className="text-2xl mb-1 animate-pulse">❤️</div>
                <p className="text-lg font-bold text-gray-900 dark:text-white">{babyStats.heartbeat}</p>
                <p className="text-xs text-gray-600 dark:text-gray-300">BPM</p>
              </div>

              {/* Hover tooltip */}
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                beats per minute
              </div>
            </div>
          </div>

          {/* Your Mood */}
          <div className="group relative">
            <div className="w-32 h-32 bg-gradient-to-br from-yellow-100 to-orange-200 dark:from-yellow-900/30 dark:to-orange-800/30 rounded-full flex flex-col items-center justify-center relative overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer">
              {/* Animated background sparkles */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-2 right-4 w-1 h-1 bg-yellow-400 rounded-full animate-ping delay-100"></div>
                <div className="absolute top-4 left-2 w-1 h-1 bg-orange-400 rounded-full animate-ping delay-400"></div>
                <div className="absolute bottom-3 right-2 w-1 h-1 bg-yellow-300 rounded-full animate-ping delay-600"></div>
                <div className="absolute bottom-2 left-4 w-1 h-1 bg-orange-300 rounded-full animate-ping delay-800"></div>
              </div>

              {/* Content */}
              <div className="relative z-10 text-center">
                <div className="text-2xl mb-1 transition-transform duration-200 hover:scale-110">😊</div>
                <p className="text-sm font-bold text-gray-900 dark:text-white">Happy</p>
                <p className="text-xs text-gray-600 dark:text-gray-300">Mood</p>
              </div>

              {/* Mood selector on hover */}
              <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <button className="text-lg hover:scale-125 transition-transform duration-200">😊</button>
                <button className="text-lg hover:scale-125 transition-transform duration-200">😌</button>
                <button className="text-lg hover:scale-125 transition-transform duration-200">😴</button>
                <button className="text-lg hover:scale-125 transition-transform duration-200">😋</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default HeroSection
