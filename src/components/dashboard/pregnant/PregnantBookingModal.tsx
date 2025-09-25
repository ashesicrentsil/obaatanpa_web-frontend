'use client'

import { useState, useEffect } from 'react'
import { X, Calendar, Clock, Hospital, Stethoscope, Search, AlertCircle } from 'lucide-react'
import axios from 'axios'

interface PregnantBookingModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (formData: {
    hospital_name: string
    date: string
    time: string
    reason: string
  }) => void
  pregnancyWeek: number
  trimester: string
}

interface Hospital {
  id: number
  name: string
  email: string
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://obaatanpa-backend.onrender.com'

const PregnantBookingModal = ({ isOpen, onClose, onSubmit, pregnancyWeek, trimester }: PregnantBookingModalProps) => {
  const [formData, setFormData] = useState({
    hospital_name: '',
    date: '',
    time: '',
    reason: ''
  })
  const [hospitalSearch, setHospitalSearch] = useState('')
  const [hospitals, setHospitals] = useState<Hospital[]>([])
  const [showHospitals, setShowHospitals] = useState(false)
  const [hospitalError, setHospitalError] = useState<string | null>(null)
  const [authToken, setAuthToken] = useState<string | null>(null)

  // Load token from localStorage
  useEffect(() => {
    const token = localStorage.getItem('authToken')
    if (token) {
      setAuthToken(token)
    }
  }, [])

  // Fetch hospitals when "View Hospitals" is clicked
  const fetchHospitals = async () => {
    if (!authToken) {
      setHospitalError('Please log in to view hospitals.')
      return
    }
    try {
      const response = await axios.get<Hospital[]>(`${API_URL}/admin/hospitals/get`, {
        headers: { Authorization: `Bearer ${authToken}` }
      })
      setHospitals(response.data)
      setShowHospitals(true)
      setHospitalError(null)
    } catch (err: any) {
      console.error('Fetch Hospitals Error:', {
        message: err.message,
        status: err.response?.status,
        data: err.response?.data || 'No response data'
      })
      setHospitalError(err.response?.status === 404 
        ? 'Hospital service not found. Please check if the server is running.'
        : 'Failed to fetch hospitals. Please try again later.')
    }
  }

  // Filter hospitals based on search input
  const filteredHospitals = hospitals.filter(hospital =>
    hospital.name.toLowerCase().includes(hospitalSearch.toLowerCase())
  )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleHospitalSelect = (hospitalName: string) => {
    setFormData(prev => ({ ...prev, hospital_name: hospitalName }))
    setHospitalSearch(hospitalName) // Set search input to selected hospital
    setShowHospitals(false)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.hospital_name || !formData.date || !formData.time || !formData.reason) {
      setHospitalError('Please fill in all required fields.')
      return
    }
    onSubmit(formData)
    setFormData({ hospital_name: '', date: '', time: '', reason: '' })
    setHospitalSearch('')
    setShowHospitals(false)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={onClose}>
      <div 
        className="bg-white dark:bg-gray-800 rounded-3xl p-8 max-w-lg w-full mx-4 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Book Appointment</h2>
          <button 
            onClick={onClose}
            className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="mb-4">
          <p className="text-gray-600 dark:text-gray-400">
            Booking for {trimester} Trimester (Week {pregnancyWeek})
          </p>
        </div>

        {hospitalError && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-4 mb-4">
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5" />
              <p className="text-red-800 dark:text-red-200">{hospitalError}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="flex items-center space-x-2 text-gray-900 dark:text-white font-medium mb-2">
              <Hospital className="w-5 h-5" />
              <span>Hospital</span>
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                name="hospital_search"
                value={hospitalSearch}
                onChange={(e) => setHospitalSearch(e.target.value)}
                className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#F59297] focus:border-transparent"
                placeholder="Search for a hospital..."
              />
              <button
                type="button"
                onClick={fetchHospitals}
                className="px-3 py-1.5 rounded-xl bg-[#F59297] text-white text-sm font-semibold hover:bg-[#e67d82] transition-colors"
              >
                View Hospitals
              </button>
            </div>
            <input
              type="hidden"
              name="hospital_name"
              value={formData.hospital_name}
            />
            {showHospitals && (
              <div className="mt-2 max-h-40 overflow-y-auto border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700">
                {filteredHospitals.length === 0 ? (
                  <p className="p-3 text-gray-600 dark:text-gray-400">No hospitals found.</p>
                ) : (
                  filteredHospitals.map(hospital => (
                    <button
                      key={hospital.id}
                      type="button"
                      onClick={() => handleHospitalSelect(hospital.name)}
                      className="w-full p-3 text-left text-gray-900 dark:text-white hover:bg-[#F59297]/10 dark:hover:bg-[#F59297]/20 transition-colors"
                    >
                      {hospital.name}
                    </button>
                  ))
                )}
              </div>
            )}
          </div>

          <div>
            <label className="flex items-center space-x-2 text-gray-900 dark:text-white font-medium mb-2">
              <Calendar className="w-5 h-5" />
              <span>Date</span>
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#F59297] focus:border-transparent"
              required
              min={new Date().toISOString().split('T')[0]}
            />
          </div>

          <div>
            <label className="flex items-center space-x-2 text-gray-900 dark:text-white font-medium mb-2">
              <Clock className="w-5 h-5" />
              <span>Time</span>
            </label>
            <select
              name="time"
              value={formData.time}
              onChange={handleChange}
              className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#F59297] focus:border-transparent"
              required
            >
              <option value="">Select a time</option>
              {['08:00', '09:00', '10:00', '10:30', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'].map(time => (
                <option key={time} value={time}>{time}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="flex items-center space-x-2 text-gray-900 dark:text-white font-medium mb-2">
              <Stethoscope className="w-5 h-5" />
              <span>Reason</span>
            </label>
            <input
              type="text"
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#F59297] focus:border-transparent"
              placeholder="e.g., Prenatal checkup"
              required
            />
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 rounded-2xl bg-gray-200 dark:bg-gray-600 text-gray-900 dark:text-white font-semibold hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 rounded-2xl bg-[#F59297] text-white font-semibold hover:bg-[#e67d82] transition-colors"
            >
              Confirm Appointment
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default PregnantBookingModal