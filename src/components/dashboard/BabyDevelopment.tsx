import { Baby, BookOpen } from 'lucide-react'

interface BabyDevelopmentProps {
  trimesterData: {
    babySize: string
    development: string
  }
  week: number
}

const BabyDevelopment = ({ trimesterData, week }: BabyDevelopmentProps) => {
  const getBabyEmoji = (size: string) => {
    switch (size) {
      case 'lime': return '🟢'
      case 'mango': return '🥭'
      case 'watermelon': return '🍉'
      default: return '🥭'
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm">
      <div className="flex items-center mb-6">
        <Baby className="w-8 h-8 text-[#F59297] mr-3" />
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Your Baby This Week</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="bg-gradient-to-br from-[#F59297]/10 to-[#7da8e6]/10 rounded-2xl p-6 mb-4">
            <div className="text-center">
              <div className="text-4xl mb-2">{getBabyEmoji(trimesterData.babySize)}</div>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">Size of a {trimesterData.babySize}</p>
            </div>
          </div>
          <p className="text-gray-600 dark:text-gray-300 text-center">Week {week}</p>
        </div>
        
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-white mb-3">What's Developing</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">{trimesterData.development}</p>
          <button className="inline-flex items-center text-[#F59297] hover:text-[#e67d82] font-medium">
            <BookOpen className="w-4 h-4 mr-2" />
            Read More
          </button>
        </div>
      </div>
    </div>
  )
}

export default BabyDevelopment
