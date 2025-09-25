import { MapPin, Phone, ClipboardList, AlertTriangle } from 'lucide-react'

interface EmergencyToolsProps {
  emergencyInfo?: string
}

const EmergencyTools = ({ emergencyInfo }: EmergencyToolsProps) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Stay Ready, Stay Safe</h3>

      {emergencyInfo && (
        <div className="mb-4 p-3 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg">
          <div className="flex items-start">
            <AlertTriangle className="w-5 h-5 text-orange-500 mr-2 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-orange-700 dark:text-orange-300">{emergencyInfo}</p>
          </div>
        </div>
      )}

      <div className="space-y-3">
        <button className="w-full flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
          <div className="flex items-center">
            <MapPin className="w-5 h-5 text-red-500 mr-3" />
            <span className="text-gray-900 dark:text-white">Nearest Hospital</span>
          </div>
          <span className="text-sm text-gray-500 dark:text-gray-400">2.3 km</span>
        </button>

        <button className="w-full flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
          <div className="flex items-center">
            <Phone className="w-5 h-5 text-blue-500 mr-3" />
            <span className="text-gray-900 dark:text-white">Emergency Contact</span>
          </div>
        </button>

        <button className="w-full flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
          <div className="flex items-center">
            <ClipboardList className="w-5 h-5 text-purple-500 mr-3" />
            <span className="text-gray-900 dark:text-white">Birth Plan Form</span>
          </div>
        </button>
      </div>
    </div>
  )
}

export default EmergencyTools
