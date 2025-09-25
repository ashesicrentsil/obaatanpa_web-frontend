import { MessageCircle, Stethoscope, Bot, Users } from 'lucide-react'

interface CommunityChatProps {
  chatVisible?: boolean
}

const CommunityChat = ({ chatVisible = false }: CommunityChatProps) => {
  const chatOptions = [
    {
      icon: Stethoscope,
      color: '[#F59297]',
      title: 'Ask a Midwife',
      description: 'Secure Chat',
      featured: true
    },
    {
      icon: Bot,
      color: 'blue-500',
      title: 'AI Assistant',
      description: 'Quick Answers',
      featured: false
    },
    {
      icon: Users,
      color: 'green-500',
      title: 'Join the Community',
      description: 'Forum & WhatsApp',
      featured: false
    }
  ]

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
      <div className="flex items-center mb-4">
        <MessageCircle className="w-6 h-6 text-[#F59297] mr-2" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {chatVisible ? "Do you have a question today?" : "Need to Talk? You're Not Alone."}
        </h3>
      </div>

      {chatVisible && (
        <div className="mb-4 p-4 bg-[#F59297]/5 border border-[#F59297]/20 rounded-lg">
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
            💬 Tap to chat with a certified midwife, nurse, or nutritionist.
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            If chat is not real-time, you'll receive a reply within 24 hours.
          </p>
        </div>
      )}

      <div className="space-y-3">
        {chatOptions.map((option, index) => (
          <button
            key={index}
            className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors duration-200 ${
              option.featured || (chatVisible && option.title === 'Ask a Midwife')
                ? 'bg-[#F59297]/10 border border-[#F59297]/20 hover:bg-[#F59297]/20'
                : 'border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            <div className="flex items-center">
              <option.icon className={`w-5 h-5 text-${option.color} mr-3`} />
              <span className={`${option.featured || (chatVisible && option.title === 'Ask a Midwife') ? 'font-medium' : ''} text-gray-900 dark:text-white`}>
                {option.title}
              </span>
            </div>
            <span className={`text-sm ${
              option.featured || (chatVisible && option.title === 'Ask a Midwife') ? 'text-[#F59297]' : 'text-gray-500 dark:text-gray-400'
            }`}>
              {option.description}
            </span>
          </button>
        ))}
      </div>

      {/* Community Feed Section */}
      <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
        <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
          "Other moms in your stage are talking about..."
        </h4>
        <div className="space-y-2">
          <button className="w-full text-left p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200">
            <p className="text-sm text-gray-900 dark:text-white">Join Discussion Forum</p>
          </button>
          <button className="w-full text-left p-3 bg-green-50 dark:bg-green-900/20 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors duration-200">
            <p className="text-sm text-green-700 dark:text-green-300">Join WhatsApp Group</p>
          </button>
        </div>
      </div>
    </div>
  )
}

export default CommunityChat
