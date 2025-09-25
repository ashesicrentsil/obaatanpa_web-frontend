import { AlertCircle, MessageCircle, Calendar } from 'lucide-react'

interface FloatingButtonsProps {
  onEmergencyClick: () => void
}

const FloatingButtons = ({ onEmergencyClick }: FloatingButtonsProps) => {
  return (
    <div className="fixed bottom-6 right-6 flex flex-col space-y-3">
      <button
        onClick={onEmergencyClick}
        className="w-16 h-16 bg-red-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center hover:scale-110 animate-pulse"
        title="Emergency Help"
      >
        <AlertCircle className="w-8 h-8" />
      </button>
      <button
        className="w-14 h-14 bg-[#F59297] text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center hover:scale-110"
        title="Chat with Midwife"
      >
        <MessageCircle className="w-6 h-6" />
      </button>
      <button
        className="w-14 h-14 bg-blue-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center hover:scale-110"
        title="Add Appointment"
      >
        <Calendar className="w-6 h-6" />
      </button>
    </div>
  )
}

export default FloatingButtons
