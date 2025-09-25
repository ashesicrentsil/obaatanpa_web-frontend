'use client'

import { useState } from 'react'
import { createPortal } from 'react-dom'
import { X, Calendar, Clock, Target } from 'lucide-react'

interface PregnancyData {
  pregnancyWeek: number
  trimester: string
  dueDate?: string
  lastMenstrualPeriod?: string
  calculationMethod: 'due-date' | 'lmp' | 'current-week'
  commonSymptoms?: string
  currentDay?: number
  fetalDevelopment?: string
  milestones?: string
}

interface PregnancyWeekCalculatorProps {
  isOpen: boolean
  onClose: () => void
  onComplete: (pregnancyData: PregnancyData) => void
}

const PregnancyWeekCalculator = ({ isOpen, onClose, onComplete }: PregnancyWeekCalculatorProps) => {
  const [selectedMethod, setSelectedMethod] = useState<'due-date' | 'lmp' | 'current-week' | null>(null)
  const [formData, setFormData] = useState({
    dueDate: '',
    lastMenstrualPeriod: '',
    currentWeek: '',
    cycleLength: '28' // Default cycle length for LMP
  })
  const [showResponse, setShowResponse] = useState(false)
  const [responseMessage, setResponseMessage] = useState('')
  const [pregnancyData, setPregnancyData] = useState<PregnancyData | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  if (!isOpen) return null

  const calculatePregnancyWeekLocally = (method: string, data: any): number => {
    const today = new Date()
    
    switch (method) {
      case 'due-date':
        const dueDate = new Date(data.dueDate)
        if (isNaN(dueDate.getTime())) return 1
        const daysDiff = Math.floor((dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
        const weeksRemaining = Math.floor(daysDiff / 7)
        return Math.max(1, Math.min(40, 40 - weeksRemaining))
        
      case 'lmp':
        const lmpDate = new Date(data.lastMenstrualPeriod)
        if (isNaN(lmpDate.getTime())) return 1
        const daysSinceLMP = Math.floor((today.getTime() - lmpDate.getTime()) / (1000 * 60 * 60 * 24))
        return Math.max(1, Math.min(40, Math.floor(daysSinceLMP / 7)))
        
      case 'current-week':
        const week = parseInt(data.currentWeek)
        return isNaN(week) ? 1 : Math.max(1, Math.min(40, week))
        
      default:
        return 1
    }
  }

  const getTrimesterFromWeek = (week: number): string => {
    if (week <= 13) return 'first'
    if (week <= 27) return 'second'
    return 'third'
  }

  const handleSubmit = async () => {
    if (!selectedMethod) {
      setResponseMessage('Please select a calculation method.')
      setShowResponse(true)
      return
    }

    // Validate input fields
    if (selectedMethod === 'due-date') {
      if (!formData.dueDate) {
        setResponseMessage('Please enter your expected due date.')
        setShowResponse(true)
        return
      }
      const dueDate = new Date(formData.dueDate)
      const today = new Date()
      const maxDate = new Date(today.getTime() + 280 * 24 * 60 * 60 * 1000)
      if (isNaN(dueDate.getTime()) || dueDate < today || dueDate > maxDate) {
        setResponseMessage('Please enter a valid due date between today and 40 weeks from now.')
        setShowResponse(true)
        return
      }
    }
    if (selectedMethod === 'lmp') {
      if (!formData.lastMenstrualPeriod) {
        setResponseMessage('Please enter the first day of your last menstrual period.')
        setShowResponse(true)
        return
      }
      if (!formData.cycleLength || parseInt(formData.cycleLength) < 21 || parseInt(formData.cycleLength) > 35) {
        setResponseMessage('Please enter a valid cycle length between 21 and 35 days.')
        setShowResponse(true)
        return
      }
      const lmpDate = new Date(formData.lastMenstrualPeriod)
      const today = new Date()
      if (isNaN(lmpDate.getTime()) || lmpDate > today) {
        setResponseMessage('Please enter a valid last menstrual period date before today.')
        setShowResponse(true)
        return
      }
    }
    if (selectedMethod === 'current-week' && !formData.currentWeek) {
      setResponseMessage('Please select your current pregnancy week.')
      setShowResponse(true)
      return
    }

    const token = localStorage.getItem('authToken')
    if (!token && selectedMethod !== 'current-week') {
      setResponseMessage('Authentication token is missing. Please log in first.')
      setShowResponse(true)
      return
    }

    setIsLoading(true)
    try {
      let result: any = {}
      let pregnancyWeek = 1
      let trimester = 'first'

      if (selectedMethod === 'due-date') {
        const response = await fetch('https://obaatanpa-backend.onrender.com/info/pw/conception_date/calculate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ conception_date: formData.dueDate })
        })
        result = await response.json()
        if (!response.ok) {
          if (response.status === 401) {
            throw new Error('Unauthorized: Invalid or expired token. Please log in again.')
          }
          throw new Error(result.message || 'Failed to calculate pregnancy week.')
        }
        pregnancyWeek = result.current_week
        trimester = getTrimesterFromWeek(pregnancyWeek)
      } else if (selectedMethod === 'lmp') {
        const response = await fetch('https://obaatanpa-backend.onrender.com/info/pw/menstrual_date/calculate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            last_period_date: formData.lastMenstrualPeriod,
            cycle_length: parseInt(formData.cycleLength)
          })
        })
        result = await response.json()
        if (!response.ok) {
          if (response.status === 401) {
            throw new Error('Unauthorized: Invalid or expired token. Please log in again.')
          }
          throw new Error(result.message || 'Failed to calculate pregnancy week.')
        }
        pregnancyWeek = result.current_week
        trimester = getTrimesterFromWeek(pregnancyWeek)
      } else {
        pregnancyWeek = calculatePregnancyWeekLocally('current-week', formData)
        trimester = getTrimesterFromWeek(pregnancyWeek)
        result = {
          common_symptoms: `Week ${pregnancyWeek} of pregnancy.`,
          current_day: 1,
          current_week: pregnancyWeek,
          fetal_development: `Development details for week ${pregnancyWeek}.`,
          milestones: `Milestones for week ${pregnancyWeek}.`
        }
      }

      const data: PregnancyData = {
        pregnancyWeek,
        trimester,
        calculationMethod: selectedMethod,
        commonSymptoms: result.common_symptoms,
        currentDay: result.current_day,
        fetalDevelopment: result.fetal_development,
        milestones: result.milestones,
        ...(selectedMethod === 'due-date' && { dueDate: formData.dueDate }),
        ...(selectedMethod === 'lmp' && { lastMenstrualPeriod: formData.lastMenstrualPeriod })
      }

      setPregnancyData(data)
      setResponseMessage(`
        Week ${result.current_week}, Day ${result.current_day} (${trimester} trimester)
        Symptoms: ${result.common_symptoms}
        Fetal Development: ${result.fetal_development}
        Milestones: ${result.milestones}
      `)
      setShowResponse(true)
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      setResponseMessage('Error calculating pregnancy week: ' + errorMessage)
      setShowResponse(true)
    } finally {
      setIsLoading(false)
    }
  }

  const handleResponseClose = () => {
    setShowResponse(false)
    if (pregnancyData) {
      onComplete(pregnancyData)
      onClose()
    }
  }

  const methods = [
    {
      id: 'due-date',
      icon: Calendar,
      title: 'Due Date',
      description: 'I know my expected delivery date',
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 'lmp',
      icon: Clock,
      title: 'Last Menstrual Period',
      description: 'I know the first day of my last period',
      color: 'from-pink-500 to-pink-600'
    },
    {
      id: 'current-week',
      icon: Target,
      title: 'Current Pregnancy Week',
      description: 'I know how many weeks pregnant I am',
      color: 'from-purple-500 to-purple-600'
    }
  ]

  const modalContent = (
    <div className="fixed inset-0 z-[99999] overflow-y-auto bg-black/50 backdrop-blur-sm">
      {/* Response Popup */}
      {showResponse && (
        <div
          className="fixed inset-0 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          style={{ zIndex: 100000 }}
        >
          <div
            className="relative bg-gradient-to-br from-[#F59297] to-[#7da8e6] rounded-3xl shadow-2xl max-w-lg w-full p-8 transform transition-all duration-300 scale-100 hover:scale-105"
          >
            {/* Decorative Image */}
            <div className="flex justify-center mb-6">
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                alt="Pregnancy Illustration"
                className="w-32 h-32 rounded-full border-4 border-white shadow-md object-cover"
              />
            </div>

            {/* Header */}
            <h3 className="text-2xl font-bold text-white text-center mb-4">
              Your Pregnancy Journey
            </h3>

            {/* Response Content */}
            <div className="bg-white/90 dark:bg-gray-800/90 rounded-2xl p-6 mb-6">
              <p className="text-lg text-gray-900 dark:text-white whitespace-pre-line leading-relaxed">
                {responseMessage.split('\n').map((line, index) => (
                  <span key={index} className={line.startsWith('Week') ? 'font-semibold text-[#F59297]' : ''}>
                    {line}
                    <br />
                  </span>
                ))}
              </p>
            </div>

            {/* Okay Button */}
            <button
              onClick={handleResponseClose}
              className="w-full bg-white text-[#F59297] py-3 rounded-xl font-semibold text-lg hover:bg-gray-100 dark:hover:bg-gray-200 transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <span>Okay</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Decorative Element */}
            <div className="absolute -top-3 -left-3 w-8 h-8 bg-white rounded-full opacity-30" />
            <div className="absolute -bottom-3 -right-3 w-8 h-8 bg-white rounded-full opacity-30" />
          </div>
        </div>
      )}

      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="relative bg-white dark:bg-gray-800 rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
          >
            <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>

          <div className="p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-[#F59297] to-[#7da8e6] rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🤰</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Help us know you better
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Choose how you'd like to calculate your pregnancy week
              </p>
            </div>

            {/* Method Selection */}
            {!selectedMethod ? (
              <div className="space-y-4">
                {methods.map((method) => (
                  <button
                    key={method.id}
                    onClick={() => setSelectedMethod(method.id as any)}
                    className="w-full p-6 border-2 border-gray-200 dark:border-gray-600 rounded-2xl hover:border-[#F59297] transition-all duration-300 text-left group"
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 bg-gradient-to-r ${method.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        <method.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                          {method.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                          {method.description}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              /* Input Form */
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {methods.find(m => m.id === selectedMethod)?.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {methods.find(m => m.id === selectedMethod)?.description}
                  </p>
                </div>

                {selectedMethod === 'due-date' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Expected Due Date *
                    </label>
                    <input
                      type="date"
                      value={formData.dueDate}
                      onChange={(e) => setFormData(prev => ({ ...prev, dueDate: e.target.value }))}
                      min={new Date().toISOString().split('T')[0]}
                      max={new Date(Date.now() + 280 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#F59297] focus:border-transparent"
                      required
                    />
                  </div>
                )}

                {selectedMethod === 'lmp' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        First Day of Last Menstrual Period *
                      </label>
                      <input
                        type="date"
                        value={formData.lastMenstrualPeriod}
                        onChange={(e) => setFormData(prev => ({ ...prev, lastMenstrualPeriod: e.target.value }))}
                        max={new Date().toISOString().split('T')[0]}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#F59297] focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Menstrual Cycle Length (days) *
                      </label>
                      <input
                        type="number"
                        value={formData.cycleLength}
                        onChange={(e) => setFormData(prev => ({ ...prev, cycleLength: e.target.value }))}
                        min="21"
                        max="35"
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#F59297] focus:border-transparent"
                        placeholder="e.g., 28"
                        required
                      />
                    </div>
                  </>
                )}

                {selectedMethod === 'current-week' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Current Pregnancy Week *
                    </label>
                    <select
                      value={formData.currentWeek}
                      onChange={(e) => setFormData(prev => ({ ...prev, currentWeek: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#F59297] focus:border-transparent"
                      required
                    >
                      <option value="">Select week</option>
                      {Array.from({ length: 40 }, (_, i) => i + 1).map(week => (
                        <option key={week} value={week}>
                          Week {week} {week <= 13 ? '(1st Trimester)' : week <= 27 ? '(2nd Trimester)' : '(3rd Trimester)'}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <div className="flex space-x-4">
                  <button
                    onClick={() => setSelectedMethod(null)}
                    className="flex-1 py-3 px-6 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                    disabled={isLoading}
                  >
                    Back
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={
                      isLoading ||
                      (selectedMethod === 'due-date' && !formData.dueDate) ||
                      (selectedMethod === 'lmp' && (!formData.lastMenstrualPeriod || !formData.cycleLength)) ||
                      (selectedMethod === 'current-week' && !formData.currentWeek)
                    }
                    className="flex-1 bg-gradient-to-r from-[#F59297] to-[#7da8e6] text-white py-3 px-6 rounded-xl font-semibold hover:from-[#e67d82] hover:to-[#6b9ce6] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Calculating...
                      </>
                    ) : (
                      'Calculate My Week'
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )

  return createPortal(modalContent, document.body)
}

export default PregnancyWeekCalculator