'use client'

import { AlertTriangle, Phone, MapPin } from 'lucide-react'

const EmergencyBanner = () => {
  return (
    <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center" data-aos="fade-down">
          <div className="flex items-center space-x-3">
            <AlertTriangle className="w-6 h-6 text-red-500 flex-shrink-0" />
            <div className="text-center sm:text-left">
              <p className="text-red-800 dark:text-red-200 font-medium">
                🚨 <strong>Medical Emergency?</strong> Call 112 immediately or visit the nearest hospital.
              </p>
              <p className="text-red-600 dark:text-red-300 text-sm mt-1">
                For non-emergency questions, use the contact form below or reach out through our support channels.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmergencyBanner
