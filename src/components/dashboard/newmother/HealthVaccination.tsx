'use client'

import { Calendar, MapPin, Phone, CheckCircle, Clock, AlertTriangle } from 'lucide-react'

interface HealthVaccinationProps {
  babyAge: string
  nextVaccine?: string
  nextVaccineDate?: string
  clinic?: string
}

const HealthVaccination = ({ 
  babyAge, 
  nextVaccine = "Pentavalent (2nd Dose)",
  nextVaccineDate = "August 3, 2025",
  clinic = "Korle Bu Clinic – Room 12"
}: HealthVaccinationProps) => {

  // Ghana Health Service vaccination schedule
  const getVaccinationSchedule = (ageRange: string) => {
    const baseSchedule = [
      { age: 'Birth', vaccines: ['BCG', 'Hepatitis B (1st dose)', 'OPV 0'], status: 'completed' },
      { age: '6 weeks', vaccines: ['Pentavalent (1st dose)', 'OPV 1', 'Pneumococcal (1st dose)', 'Rotavirus (1st dose)'], status: 'completed' },
      { age: '10 weeks', vaccines: ['Pentavalent (2nd dose)', 'OPV 2', 'Pneumococcal (2nd dose)', 'Rotavirus (2nd dose)'], status: 'upcoming' },
      { age: '14 weeks', vaccines: ['Pentavalent (3rd dose)', 'OPV 3', 'Pneumococcal (3rd dose)', 'Rotavirus (3rd dose)'], status: 'pending' },
      { age: '6 months', vaccines: ['Vitamin A (1st dose)'], status: 'pending' },
      { age: '9 months', vaccines: ['Measles (1st dose)', 'Yellow Fever', 'Meningitis A'], status: 'pending' },
      { age: '12 months', vaccines: ['Vitamin A (2nd dose)'], status: 'pending' },
      { age: '18 months', vaccines: ['Measles (2nd dose)', 'DPT Booster', 'OPV Booster'], status: 'pending' }
    ]

    // Mark vaccines as completed based on baby's age
    switch (ageRange) {
      case '0-3':
        return baseSchedule.map((item, index) => ({
          ...item,
          status: index <= 1 ? 'completed' : index === 2 ? 'upcoming' : 'pending'
        }))
      case '3-6':
        return baseSchedule.map((item, index) => ({
          ...item,
          status: index <= 3 ? 'completed' : index === 4 ? 'upcoming' : 'pending'
        }))
      case '6-12':
        return baseSchedule.map((item, index) => ({
          ...item,
          status: index <= 5 ? 'completed' : index === 6 ? 'upcoming' : 'pending'
        }))
      default:
        return baseSchedule
    }
  }

  const schedule = getVaccinationSchedule(babyAge)
  const upcomingVaccine = schedule.find(item => item.status === 'upcoming')

  const handleAction = (action: string) => {
    console.log(`Vaccination action: ${action}`)
    // Here you would handle the specific action
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case 'upcoming':
        return <Clock className="w-5 h-5 text-orange-500" />
      case 'pending':
        return <AlertTriangle className="w-5 h-5 text-gray-400" />
      default:
        return <Clock className="w-5 h-5 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
      case 'upcoming':
        return 'bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800'
      case 'pending':
        return 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700'
      default:
        return 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700'
    }
  }

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Health & Vaccination
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Keep your baby protected with Ghana Health Service recommended vaccines
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Next Vaccine Card */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Next Vaccination
            </h3>
            
            {upcomingVaccine ? (
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border-l-4 border-orange-500">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {nextVaccine}
                    </h4>
                    <div className="flex items-center space-x-2 text-orange-600 mb-4">
                      <Calendar className="w-5 h-5" />
                      <span className="font-medium">{nextVaccineDate}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                      <MapPin className="w-5 h-5" />
                      <span>{clinic}</span>
                    </div>
                  </div>
                  <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center">
                    <span className="text-2xl">💉</span>
                  </div>
                </div>

                {/* Vaccines in this appointment */}
                <div className="mb-6">
                  <h5 className="font-semibold text-gray-900 dark:text-white mb-3">Vaccines included:</h5>
                  <div className="space-y-2">
                    {upcomingVaccine.vaccines.map((vaccine, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                        <span className="text-gray-700 dark:text-gray-300">{vaccine}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button
                    onClick={() => handleAction('view-schedule')}
                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg font-medium text-sm transition-colors duration-200 flex items-center justify-center space-x-2"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>View Full Schedule</span>
                  </button>
                  
                  <button
                    onClick={() => handleAction('mark-done')}
                    className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg font-medium text-sm transition-colors duration-200 flex items-center justify-center space-x-2"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>Mark As Done</span>
                  </button>
                  
                  <button
                    onClick={() => handleAction('call-clinic')}
                    className="bg-pink-500 hover:bg-pink-600 text-white py-2 px-4 rounded-lg font-medium text-sm transition-colors duration-200 flex items-center justify-center space-x-2"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Call Clinic</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-green-50 dark:bg-green-900/20 rounded-2xl p-8 text-center">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-500" />
                </div>
                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  All Up to Date!
                </h4>
                <p className="text-gray-600 dark:text-gray-400">
                  Your baby is current with all recommended vaccinations for their age.
                </p>
              </div>
            )}
          </div>

          {/* Vaccination Schedule */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Vaccination Schedule
            </h3>
            
            <div className="space-y-4">
              {schedule.map((item, index) => (
                <div
                  key={index}
                  className={`border rounded-xl p-4 transition-all duration-200 ${getStatusColor(item.status)}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        {getStatusIcon(item.status)}
                        <h4 className="font-semibold text-gray-900 dark:text-white">
                          {item.age}
                        </h4>
                      </div>
                      <div className="space-y-1">
                        {item.vaccines.map((vaccine, vIndex) => (
                          <p key={vIndex} className="text-sm text-gray-600 dark:text-gray-400">
                            • {vaccine}
                          </p>
                        ))}
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                        item.status === 'completed' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                          : item.status === 'upcoming'
                          ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400'
                          : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400'
                      }`}>
                        {item.status === 'completed' ? 'Done' : item.status === 'upcoming' ? 'Next' : 'Pending'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Ghana Health Service Note */}
            <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
              <h5 className="font-semibold text-blue-800 dark:text-blue-400 mb-2">
                🇬🇭 Ghana Health Service Schedule
              </h5>
              <p className="text-blue-700 dark:text-blue-300 text-sm">
                This schedule follows Ghana Health Service recommendations. All vaccines are free at government health facilities.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HealthVaccination
