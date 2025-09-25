'use client'

import { useState, useEffect } from 'react'
import { Calendar, Clock, MapPin, Plus, Bell, Edit, X, CheckCircle, AlertCircle, Phone, Video, Star, FileText } from 'lucide-react'
import PregnantBookingModal from './PregnantBookingModal'
import axios from 'axios'

// New import for the reschedule modal
import PregnantRescheduleModal from './PregnantRescheduleModal'

interface PregnantAppointmentsPageProps {
  pregnancyWeek: number
  trimester: string
  motherName?: string
}

interface Appointment {
  id: string
  type: string
  date: string
  time: string
  hospital: string
  practitioner: string
  status: 'assigned' | 'pending' | 'cancelled' | 'completed' | 'missed'
  mode: 'in-person' | 'virtual'
  reason?: string
  notes?: string
  rating?: number
  feedback?: string
}

interface AppointmentResponse {
  appointment_id: number
  date: string
  time: string
  hospital_id: number
  hospital_name: string
  status: string
  patient_id: number
  doctor_id: number | null
  doctor_name: string
  reason?: string
}

interface GetAppointmentsResponse {
  status: string
  message: string
  appointments: AppointmentResponse[]
}

interface BookAppointmentData {
  hospital_name: string
  date: string
  time: string
  reason: string
}

interface BookAppointmentResponse {
  message: string
  appointment_id: number
  hospital_id: number
  hospital_name: string
  date: string
  time: string
  status: string
  created_at: string
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://obaatanpa-backend.onrender.com'

const PregnantAppointmentsPage = ({ pregnancyWeek, trimester, motherName = "Mama" }: PregnantAppointmentsPageProps) => {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'calendar' | 'history'>('upcoming')
  const [showBookingForm, setShowBookingForm] = useState(false)
  const [showRescheduleForm, setShowRescheduleForm] = useState(false) // New state for reschedule modal
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null) // New state for reschedule appointment
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [error, setError] = useState<string | null>(null)
  const [authToken, setAuthToken] = useState<string | null>(null)

  // Load token from localStorage
  useEffect(() => {
    const token = localStorage.getItem('authToken')
    if (token) {
      setAuthToken(token)
    }
  }, [])

  // Fetch appointments when tab changes to 'upcoming' or 'history'
  useEffect(() => {
    if (activeTab === 'upcoming' || activeTab === 'history') {
      const fetchAppointments = async () => {
        if (!authToken) {
          setError('Please log in to fetch appointments.')
          return
        }
        try {
          const response = await axios.get<GetAppointmentsResponse>(`${API_URL}/appointment/get`, {
            headers: { Authorization: `Bearer ${authToken}` }
          })
          const fetchedAppointments: Appointment[] = response.data.appointments
            .filter((apt: AppointmentResponse) => apt.status === 'pending' || apt.status === 'completed')
            .map((apt: AppointmentResponse) => ({
              id: apt.appointment_id.toString(),
              type: apt.reason ? apt.reason.replace(/\b\w/g, (l: string) => l.toUpperCase()) : 'Antenatal Visit',
              date: apt.date,
              time: apt.time.slice(0, 5), // Remove seconds
              hospital: apt.hospital_name,
              practitioner: apt.doctor_name || 'To be assigned',
              status: apt.status as 'pending' | 'completed',
              mode: 'in-person', // Default, as backend doesn't provide mode
              reason: apt.reason || undefined,
              notes: undefined,
              rating: undefined,
              feedback: undefined
            }))
          setAppointments(fetchedAppointments)
          setError(null)
        } catch (err: any) {
          console.error('Get Appointments Error:', {
            message: err.message,
            status: err.response?.status,
            data: err.response?.data || 'No response data'
          })
          setError(err.response?.status === 404 
            ? 'Appointment service not found. Please check if the server is running.'
            : 'Failed to fetch appointments. Please try again later.')
        }
      }
      fetchAppointments()
    }
  }, [activeTab, authToken])

  // Get smart suggestions based on pregnancy week
  const getSmartSuggestions = () => {
    if (pregnancyWeek <= 12) {
      return [
        {
          title: "First trimester scan recommended",
          action: "Book Ultrasound",
          icon: "🩻",
          urgent: true,
          description: "Confirm pregnancy and check development"
        },
        {
          title: "Initial antenatal visit due",
          action: "Book Antenatal",
          icon: "🩺",
          urgent: true,
          description: "Start your pregnancy care journey"
        }
      ]
    } else if (pregnancyWeek <= 20) {
      return [
        {
          title: "Anatomy scan due (18-22 weeks)",
          action: "Book Ultrasound",
          icon: "👶",
          urgent: true,
          description: "Detailed scan to check baby's development"
        },
        {
          title: "Monthly antenatal checkup",
          action: "Book Antenatal",
          icon: "📋",
          urgent: false,
          description: "Regular monitoring of your pregnancy"
        }
      ]
    } else if (pregnancyWeek <= 28) {
      return [
        {
          title: "Glucose screening test",
          action: "Book Blood Test",
          icon: "🩸",
          urgent: true,
          description: "Screen for gestational diabetes"
        },
        {
          title: "Growth scan recommended",
          action: "Book Ultrasound",
          icon: "📏",
          urgent: false,
          description: "Check baby's growth and position"
        }
      ]
    } else {
      return [
        {
          title: "Weekly antenatal visits",
          action: "Book Antenatal",
          icon: "📅",
          urgent: true,
          description: "Close monitoring as you approach delivery"
        },
        {
          title: "Birth preparation class",
          action: "Book Class",
          icon: "🎓",
          urgent: false,
          description: "Prepare for labor and delivery"
        }
      ]
    }
  }

  const smartSuggestions = getSmartSuggestions()

  const upcomingAppointments = appointments.filter(apt => 
    apt.status === 'assigned' || apt.status === 'pending'
  ).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  const pastAppointments = appointments.filter(apt => 
    apt.status === 'completed' || apt.status === 'cancelled' || apt.status === 'missed'
  ).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  const nextAppointment = upcomingAppointments[0]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'assigned': return 'text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-200'
      case 'pending': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30 dark:text-yellow-200'
      case 'cancelled': return 'text-red-600 bg-red-100 dark:bg-red-900/30 dark:text-red-200'
      case 'completed': return 'text-blue-600 bg-blue-100 dark:bg-blue-900/30 dark:text-blue-200'
      case 'missed': return 'text-gray-600 bg-gray-100 dark:bg-gray-700 dark:text-gray-300'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'assigned': return <CheckCircle className="w-4 h-4" />
      case 'pending': return <Clock className="w-4 h-4" />
      case 'cancelled': return <X className="w-4 h-4" />
      case 'completed': return <CheckCircle className="w-4 h-4" />
      case 'missed': return <AlertCircle className="w-4 h-4" />
      default: return <AlertCircle className="w-4 h-4" />
    }
  }

  const handleCancelAppointment = async (id: string) => {
    if (!authToken) {
      setError('Please log in to cancel an appointment.')
      return
    }
    try {
      await axios.delete(`${API_URL}/appointment/delete/${id}`, {
        headers: { Authorization: `Bearer ${authToken}` }
      })
      // Remove the appointment from the state
      setAppointments(prev => prev.filter(apt => apt.id !== id))
      setError(null)
    } catch (err: any) {
      console.error('Cancel Appointment Error:', {
        message: err.message,
        status: err.response?.status,
        data: err.response?.data || 'No response data'
      })
      const errorMessage = err.response?.status === 401
        ? 'Your session has expired. Please log in again.'
        : err.response?.status === 404
        ? 'Appointment not found. It may have already been deleted.'
        : `Failed to cancel appointment: ${err.response?.data?.message || 'Please try again later.'}`
      setError(errorMessage)
      if (err.response?.status === 401) {
        localStorage.removeItem('currentUser')
        localStorage.removeItem('authToken')
        setAuthToken(null)
      }
    }
  }

  const handleRescheduleAppointment = (appointment: Appointment) => {
    setSelectedAppointment(appointment)
    setShowRescheduleForm(true)
  }

  const handleRescheduleSubmit = async (formData: BookAppointmentData) => {
    if (!authToken || !selectedAppointment) {
      setError('Please log in to reschedule an appointment.')
      return
    }
    try {
      const response = await axios.put(`${API_URL}/appointment/update/${selectedAppointment.id}`, formData, {
        headers: { Authorization: `Bearer ${authToken}` }
      })
      const updatedAppointment: Appointment = {
        ...selectedAppointment,
        type: formData.reason.replace(/\b\w/g, (l: string) => l.toUpperCase()),
        date: formData.date,
        time: formData.time.slice(0, 5), // Remove seconds
        hospital: formData.hospital_name,
        reason: formData.reason,
        status: response.data.status || selectedAppointment.status // Use backend status if provided
      }
      setAppointments(prev => prev.map(apt => apt.id === selectedAppointment.id ? updatedAppointment : apt))
      setShowRescheduleForm(false)
      setSelectedAppointment(null)
      setError(null)
    } catch (err: any) {
      console.error('Reschedule Appointment Error:', {
        message: err.message,
        status: err.response?.status,
        data: err.response?.data || 'No response data'
      })
      const errorMessage = err.response?.status === 401
        ? 'Your session has expired. Please log in again.'
        : err.response?.status === 404
        ? 'Appointment not found. Please try again.'
        : `Failed to reschedule appointment: ${err.response?.data?.message || 'Please try again later.'}`
      setError(errorMessage)
      if (err.response?.status === 401) {
        localStorage.removeItem('currentUser')
        localStorage.removeItem('authToken')
        setAuthToken(null)
      }
    }
  }

  const renderStarRating = (rating: number) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    )
  }

  const handleBookingSubmit = async (formData: BookAppointmentData) => {
    if (!authToken) {
      setError('Please log in to book an appointment.')
      return
    }
    try {
      const response = await axios.post<BookAppointmentResponse>(`${API_URL}/appointment/book`, formData, {
        headers: { Authorization: `Bearer ${authToken}` }
      })
      const newAppointment: Appointment = {
        id: response.data.appointment_id.toString(),
        type: formData.reason.replace(/\b\w/g, (l: string) => l.toUpperCase()),
        date: response.data.date,
        time: response.data.time.slice(0, 5), // Remove seconds
        hospital: response.data.hospital_name,
        practitioner: 'To be assigned', // Default as response doesn't provide doctor
        status: response.data.status as 'pending' | 'assigned' | 'cancelled' | 'completed' | 'missed',
        mode: 'in-person', // Default as response doesn't provide mode
        reason: formData.reason
      }
      setAppointments(prev => [...prev, newAppointment])
      setShowBookingForm(false)
      setError(null)
    } catch (err: any) {
      console.error('Book Appointment Error:', {
        message: err.message,
        status: err.response?.status,
        data: err.response?.data || 'No response data'
      })
      setError(err.response?.status === 404 
        ? 'Appointment booking service not found. Please check if the server is running.'
        : `Failed to book appointment: ${err.response?.data?.message || 'Please try again later.'}`)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            🗓️ My Pregnancy Appointments
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Manage your antenatal visits, scans, and checkups in one place.
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-4 mb-8">
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5" />
              <p className="text-red-800 dark:text-red-200">{error}</p>
            </div>
          </div>
        )}

        {/* Quick Stats Bar */}
        {nextAppointment && (
          <div className="bg-gradient-to-r from-[#F59297] to-[#7da8e6] rounded-3xl p-6 mb-8 text-white">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-white/80 text-sm">Next Visit</p>
                <p className="text-xl font-bold">{new Date(nextAppointment.date).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-white/80 text-sm">Hospital</p>
                <p className="text-xl font-bold">{nextAppointment.hospital}</p>
              </div>
              <div>
                <p className="text-white/80 text-sm">Pregnancy Status</p>
                <p className="text-xl font-bold">{trimester} Trimester (Week {pregnancyWeek})</p>
              </div>
            </div>
          </div>
        )}

        {/* Smart Suggestions */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Recommended for Week {pregnancyWeek}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {smartSuggestions.map((suggestion, index) => (
              <div key={index} className={`p-4 rounded-2xl border-2 ${
                suggestion.urgent 
                  ? 'border-[#F59297] bg-[#F59297]/5' 
                  : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50'
              }`}>
                <div className="flex items-start space-x-3">
                  <div className="text-2xl">{suggestion.icon}</div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                      {suggestion.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                      {suggestion.description}
                    </p>
                    <button 
                      onClick={() => setShowBookingForm(true)}
                      className="text-[#F59297] hover:text-[#e67d82] font-medium text-sm"
                    >
                      {suggestion.action}
                    </button>
                  </div>
                  {suggestion.urgent && (
                    <div className="w-2 h-2 bg-[#F59297] rounded-full animate-pulse"></div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Book New Appointment Button */}
        <div className="text-center mb-8">
          <button
            onClick={() => setShowBookingForm(true)}
            className="bg-gradient-to-r from-[#F59297] to-[#7da8e6] text-white px-8 py-4 rounded-2xl font-bold text-lg hover:from-[#e67d82] hover:to-[#6b9ce6] transition-all duration-300 shadow-lg hover:shadow-xl flex items-center space-x-3 mx-auto"
          >
            <Plus className="w-6 h-6" />
            <span>Book Appointment</span>
          </button>
        </div>

        {/* Reminders & Notifications */}
        {upcomingAppointments.length > 0 && (
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-2xl p-4 mb-8">
            <div className="flex items-start space-x-3">
              <Bell className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
              <div>
                <p className="text-blue-800 dark:text-blue-200 font-medium">
                  You have an {nextAppointment?.type.toLowerCase()} in {Math.ceil((new Date(nextAppointment?.date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days
                </p>
                <p className="text-blue-600 dark:text-blue-300 text-sm">
                  Don't forget to bring your NHIS card and any previous test results.
                </p>
                <button className="text-blue-700 dark:text-blue-200 font-medium text-sm mt-1 hover:underline">
                  View Details →
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Appointments Tabs */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg overflow-hidden">
          <div className="flex border-b border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`flex-1 py-4 px-6 font-medium transition-colors duration-200 ${
                activeTab === 'upcoming'
                  ? 'text-[#F59297] border-b-2 border-[#F59297] bg-[#F59297]/5'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              Upcoming ({upcomingAppointments.length})
            </button>
            <button
              onClick={() => setActiveTab('calendar')}
              className={`flex-1 py-4 px-6 font-medium transition-colors duration-200 ${
                activeTab === 'calendar'
                  ? 'text-[#F59297] border-b-2 border-[#F59297] bg-[#F59297]/5'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              Calendar View
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`flex-1 py-4 px-6 font-medium transition-colors duration-200 ${
                activeTab === 'history'
                  ? 'text-[#F59297] border-b-2 border-[#F59297] bg-[#F59297]/5'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              History ({pastAppointments.length})
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'upcoming' && (
              <div className="space-y-4">
                {upcomingAppointments.length === 0 ? (
                  <div className="text-center py-12">
                    <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No upcoming appointments</h3>
                    <p className="text-gray-500 dark:text-gray-400 mb-4">Schedule your next antenatal visit</p>
                    <button
                      onClick={() => setShowBookingForm(true)}
                      className="bg-[#F59297] hover:bg-[#e67d82] text-white px-6 py-2 rounded-lg font-medium"
                    >
                      Book Appointment
                    </button>
                  </div>
                ) : (
                  upcomingAppointments.map((appointment) => (
                    <div key={appointment.id} className="border border-gray-200 dark:border-gray-700 rounded-2xl p-6 hover:shadow-md transition-shadow duration-200">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-gradient-to-r from-[#F59297] to-[#7da8e6] rounded-full flex items-center justify-center">
                            {appointment.type.includes('Ultrasound') ? '🩻' :
                             appointment.type.includes('Blood') ? '🩸' :
                             appointment.type.includes('Antenatal') ? '🩺' : '📋'}
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{appointment.type}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{appointment.practitioner}</p>
                          </div>
                        </div>
                        <div className={`flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                          {getStatusIcon(appointment.status)}
                          <span className="capitalize">{appointment.status}</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                          <MapPin className="w-4 h-4" />
                          <span>{appointment.hospital}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(appointment.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                          <Clock className="w-4 h-4" />
                          <span>{appointment.time}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          {appointment.mode === 'virtual' ? (
                            <Video className="w-4 h-4 text-blue-500" />
                          ) : (
                            <Phone className="w-4 h-4 text-green-500" />
                          )}
                          <span className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                            {appointment.mode} appointment
                          </span>
                        </div>
                        <div className="flex space-x-2">
                          <button 
                            onClick={() => handleRescheduleAppointment(appointment)}
                            className="text-[#F59297] hover:text-[#e67d82] text-sm font-medium flex items-center space-x-1"
                          >
                            <Edit className="w-4 h-4" />
                            <span>Reschedule</span>
                          </button>
                          <button
                            onClick={() => handleCancelAppointment(appointment.id)}
                            className="text-red-500 hover:text-red-600 text-sm font-medium flex items-center space-x-1"
                          >
                            <X className="w-4 h-4" />
                            <span>Cancel</span>
                          </button>
                        </div>
                      </div>

                      {appointment.reason && (
                        <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <p className="text-sm text-gray-700 dark:text-gray-300">
                            <strong>Purpose:</strong> {appointment.reason}
                          </p>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            )}

            {activeTab === 'calendar' && (
              <div className="text-center py-12">
                <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Calendar View</h3>
                <p className="text-gray-500 dark:text-gray-400">Interactive calendar coming soon!</p>
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {upcomingAppointments.slice(0, 3).map((appointment) => (
                    <div key={appointment.id} className="p-4 bg-[#F59297]/10 rounded-xl border border-[#F59297]/20">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-[#F59297] mb-1">
                          {new Date(appointment.date).getDate()}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                          {new Date(appointment.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                        </div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {appointment.type}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {appointment.hospital} • {appointment.time}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'history' && (
              <div className="space-y-4">
                {pastAppointments.length === 0 ? (
                  <div className="text-center py-12">
                    <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No appointment history</h3>
                    <p className="text-gray-500 dark:text-gray-400">Your past appointments will appear here</p>
                  </div>
                ) : (
                  pastAppointments.map((appointment) => (
                    <div key={appointment.id} className="border border-gray-200 dark:border-gray-700 rounded-2xl p-6 opacity-90">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-gray-400 rounded-full flex items-center justify-center text-white">
                            {appointment.type.includes('Ultrasound') ? '🩻' :
                             appointment.type.includes('Blood') ? '🩸' :
                             appointment.type.includes('Antenatal') ? '🩺' : '📋'}
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{appointment.type}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{appointment.practitioner}</p>
                          </div>
                        </div>
                        <div className={`flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                          {getStatusIcon(appointment.status)}
                          <span className="capitalize">{appointment.status}</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                          <MapPin className="w-4 h-4" />
                          <span>{appointment.hospital}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(appointment.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                          <Clock className="w-4 h-4" />
                          <span>{appointment.time}</span>
                        </div>
                      </div>

                      {appointment.notes && (
                        <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                          <p className="text-sm text-blue-800 dark:text-blue-200">
                            <strong>Notes:</strong> {appointment.notes}
                          </p>
                        </div>
                      )}

                      {appointment.rating && appointment.feedback && (
                        <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                          <div className="flex items-center space-x-2 mb-2">
                            <span className="text-sm font-medium text-gray-900 dark:text-white">Your Rating:</span>
                            {renderStarRating(appointment.rating)}
                          </div>
                          <p className="text-sm text-gray-700 dark:text-gray-300">"{appointment.feedback}"</p>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>

        {/* Booking Modal */}
        <PregnantBookingModal
          isOpen={showBookingForm}
          onClose={() => setShowBookingForm(false)}
          onSubmit={handleBookingSubmit}
          pregnancyWeek={pregnancyWeek}
          trimester={trimester}
        />

        {/* Reschedule Modal */}
        <PregnantRescheduleModal
          isOpen={showRescheduleForm}
          onClose={() => {
            setShowRescheduleForm(false)
            setSelectedAppointment(null)
          }}
          onSubmit={handleRescheduleSubmit}
          pregnancyWeek={pregnancyWeek}
          trimester={trimester}
          appointment={selectedAppointment}
        />
      </div>
    </div>
  )
}

export default PregnantAppointmentsPage