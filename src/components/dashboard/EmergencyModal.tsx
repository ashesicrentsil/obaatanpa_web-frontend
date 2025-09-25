import { AlertCircle, PhoneCall, MapPin, Phone, MessageCircle } from 'lucide-react'

interface EmergencyModalProps {
  isOpen: boolean
  onClose: () => void
}

const EmergencyModal = ({ isOpen, onClose }: EmergencyModalProps) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative bg-white dark:bg-gray-800 rounded-3xl shadow-2xl max-w-md w-full p-6">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-8 h-8 text-red-600 dark:text-red-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Emergency Help</h3>
            <p className="text-gray-600 dark:text-gray-300">Get immediate assistance when you need it most</p>
          </div>

          <div className="space-y-3">
            <button className="w-full flex items-center justify-center p-4 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors duration-200">
              <PhoneCall className="w-5 h-5 mr-3" />
              Call Nearest Hospital
            </button>

            <button className="w-full flex items-center justify-center p-4 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
              <MapPin className="w-5 h-5 mr-3 text-blue-500" />
              <span className="text-gray-900 dark:text-white">Share My Location</span>
            </button>

            <button className="w-full flex items-center justify-center p-4 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
              <Phone className="w-5 h-5 mr-3 text-green-500" />
              <span className="text-gray-900 dark:text-white">Call Emergency Contact</span>
            </button>

            <button className="w-full flex items-center justify-center p-4 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
              <MessageCircle className="w-5 h-5 mr-3 text-[#F59297]" />
              <span className="text-gray-900 dark:text-white">Message My Midwife</span>
            </button>
          </div>

          <button 
            onClick={onClose}
            className="w-full mt-6 py-3 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export default EmergencyModal
