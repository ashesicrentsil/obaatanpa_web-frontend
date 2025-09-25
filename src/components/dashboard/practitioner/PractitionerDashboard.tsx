'use client'

import { useState, useEffect } from 'react'
import { Calendar, Clock, Users, MessageCircle, Bell, Settings, LogOut, CheckCircle, X, Eye, User, Sun, Moon } from 'lucide-react'
import Image from 'next/image'
import { useTheme } from '@/contexts/ThemeContext'

interface PractitionerUser {
  id: string
  fullName: string
  email: string
  practitionerType: string
  specialization: string
  licenseNumber: string
  hospital: string
  hospitalId: string
  verificationStatus: 'pending' | 'approved' | 'rejected'
  profilePicture?: string
  phoneNumber?: string
  yearsOfExperience?: number
  qualifications?: string[]
}

interface Appointment {
  appointment_id: string
  date: string
  time: string
  patient_name: string
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled' | 'assigned' | 'in progress'
}

interface PractitionerDashboardProps {
  user: PractitionerUser
  onLogout: () => void
}

const PractitionerDashboard = ({ user, onLogout }: PractitionerDashboardProps) => {
  const { theme, toggleTheme } = useTheme()
  const [activeTab, setActiveTab] = useState('overview')
  const [searchTerm, setSearchTerm] = useState('')
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [assignedAppointments, setAssignedAppointments] = useState<Appointment[]>([])
  const [isLoadingAppointments, setIsLoadingAppointments] = useState(false)
  const [isLoadingAssigned, setIsLoadingAssigned] = useState(false)
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null)
  const [isLoadingDetails, setIsLoadingDetails] = useState(false)

  // Fetch all appointments
  useEffect(() => {
    if (activeTab === 'appointments' || activeTab === 'overview') {
      const fetchAppointments = async () => {
        setIsLoadingAppointments(true)
        try {
          const authToken = localStorage.getItem('authToken')
          if (!authToken) {
            console.error('No authToken found in localStorage')
            return
          }

          const response = await fetch('https://obaatanpa-backend.onrender.com/health_worker/appointments', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${authToken}`
            }
          })

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
          }

          const data = await response.json()
          console.log('Appointments fetched:', data)
          setAppointments(data.appointments || [])
        } catch (error) {
          console.error('Error fetching appointments:', error)
        } finally {
          setIsLoadingAppointments(false)
        }
      }

      fetchAppointments()
    }
  }, [activeTab])

  // Fetch assigned appointments
  useEffect(() => {
    if (activeTab === 'appointments') {
      const fetchAssignedAppointments = async () => {
        setIsLoadingAssigned(true)
        try {
          const authToken = localStorage.getItem('authToken')
          if (!authToken) {
            console.error('No authToken found in localStorage')
            return
          }

          const response = await fetch('https://obaatanpa-backend.onrender.com/health_worker/appointments/assigned', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${authToken}`
            }
          })

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
          }

          const data = await response.json()
          console.log('Assigned appointments fetched:', data)
          setAssignedAppointments(data.appointments || [])
        } catch (error) {
          console.error('Error fetching assigned appointments:', error)
        } finally {
          setIsLoadingAssigned(false)
        }
      }

      fetchAssignedAppointments()
    }
  }, [activeTab])

  // Handle View Details click
  const handleViewDetails = async (appointmentId: string) => {
    setIsLoadingDetails(true)
    try {
      const authToken = localStorage.getItem('authToken')
      if (!authToken) {
        console.error('No authToken found in localStorage')
        return
      }

      const response = await fetch(`https://obaatanpa-backend.onrender.com/health_worker/appointments/${appointmentId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        }
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      console.log('Appointment details fetched:', data)
      setSelectedAppointment(data)
    } catch (error) {
      console.error('Error fetching appointment details:', error)
    } finally {
      setIsLoadingDetails(false)
    }
  }

  // Handle Complete (set to 'completed')
  const handleCompleteAppointment = async (appointmentId: string) => {
    try {
      const authToken = localStorage.getItem('authToken')
      if (!authToken) {
        console.error('No authToken found in localStorage')
        return
      }

      const response = await fetch(`https://obaatanpa-backend.onrender.com/health_worker/appointments/update/${appointmentId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify({ status: 'completed' })
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      console.log('Appointment completed:', data)
      setAssignedAppointments(prev =>
        prev.filter(app => app.appointment_id !== appointmentId)
      )
      setAppointments(prev =>
        prev.map(app =>
          app.appointment_id === appointmentId ? { ...app, status: 'completed' } : app
        )
      )
    } catch (error) {
      console.error('Error completing appointment:', error)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
      case 'assigned':
      case 'in progress':
        return 'text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-200'
      case 'pending':
        return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30 dark:text-yellow-200'
      case 'completed':
        return 'text-blue-600 bg-blue-100 dark:bg-blue-900/30 dark:text-blue-200'
      case 'cancelled':
        return 'text-red-600 bg-red-100 dark:bg-red-900/30 dark:text-red-200'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-[#F59297] to-[#7da8e6] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">O</span>
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">Obaatanpa</span>
              <span className="text-sm text-gray-500 dark:text-gray-400">Practitioner Portal</span>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {[
                { id: 'overview', label: 'Overview', icon: Calendar },
                { id: 'appointments', label: 'Appointments', icon: Clock },
                { id: 'patients', label: 'Patients', icon: Users },
                { id: 'messages', label: 'Messages', icon: MessageCircle }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
                    activeTab === item.id
                      ? 'text-[#F59297] bg-[#F59297]/10'
                      : 'text-gray-600 dark:text-gray-300 hover:text-[#F59297] hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>

            {/* Right Side */}
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                className="p-2 text-gray-600 dark:text-gray-300 hover:text-[#F59297] hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
                title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {theme === 'dark' ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </button>
              <button className="relative p-2 text-gray-600 dark:text-gray-300 hover:text-[#F59297] hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#F59297] text-white text-xs rounded-full flex items-center justify-center">
                  0
                </span>
              </button>
              <button className="p-2 text-gray-600 dark:text-gray-300 hover:text-[#F59297] hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                <Settings className="w-5 h-5" />
              </button>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-[#F59297] to-[#7da8e6] rounded-full flex items-center justify-center">
                  {user.profilePicture ? (
                    <Image
                      src={user.profilePicture}
                      alt={user.fullName}
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                  ) : (
                    <User className="w-4 h-4 text-white" />
                  )}
                </div>
                <div className="hidden md:block">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{user.fullName}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{user.practitionerType}</p>
                </div>
              </div>
              <button
                onClick={onLogout}
                className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden md:block text-sm">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="bg-gradient-to-r from-[#F59297] to-[#7da8e6] rounded-3xl p-8 text-white">
              <h1 className="text-3xl font-bold mb-2">
                👩🏽‍⚕️ Hello, {user.fullName.split(' ')[0]}
              </h1>
              <p className="text-white/90 text-lg">
                You have {appointments.filter(app => new Date(app.date).toDateString() === new Date().toDateString()).length} appointments today and {assignedAppointments.length} assigned requests.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{appointments.filter(app => new Date(app.date).toDateString() === new Date().toDateString()).length}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Today's Appointments</p>
                  </div>
                  <Calendar className="w-8 h-8 text-[#F59297]" />
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{assignedAppointments.length}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Assigned Requests</p>
                  </div>
                  <Clock className="w-8 h-8 text-yellow-500" />
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">0</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Active Patients</p>
                  </div>
                  <Users className="w-8 h-8 text-blue-500" />
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">0</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Unread Messages</p>
                  </div>
                  <MessageCircle className="w-8 h-8 text-green-500" />
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Today's Schedule</h2>
              {isLoadingAppointments ? (
                <div className="text-center py-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#F59297] mx-auto"></div>
                  <p className="text-gray-600 dark:text-gray-300 mt-2">Loading appointments...</p>
                </div>
              ) : appointments.length === 0 ? (
                <p className="text-gray-600 dark:text-gray-300 text-center">No appointments for today.</p>
              ) : (
                <div className="space-y-4">
                  {appointments.filter(app => new Date(app.date).toDateString() === new Date().toDateString()).map((appointment) => (
                    <div key={appointment.appointment_id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-[#F59297] rounded-full flex items-center justify-center text-white font-bold">
                          {appointment.time.split(':')[0]}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white">{appointment.patient_name}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{appointment.date}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{appointment.time}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                          {appointment.status}
                        </span>
                        <button
                          onClick={() => handleViewDetails(appointment.appointment_id)}
                          className="text-[#F59297] hover:text-[#e67d82] text-sm font-medium"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'appointments' && (
          <div className="space-y-8">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Appointment Management</h1>
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Assigned Appointment Requests</h2>
              {isLoadingAssigned ? (
                <div className="text-center py-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#F59297] mx-auto"></div>
                  <p className="text-gray-600 dark:text-gray-300 mt-2">Loading assigned appointments...</p>
                </div>
              ) : assignedAppointments.length === 0 ? (
                <p className="text-gray-600 dark:text-gray-300 text-center">No assigned appointment requests.</p>
              ) : (
                <div className="space-y-4">
                  {assignedAppointments.map((request) => (
                    <div key={request.appointment_id} className="flex items-center justify-between p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl border border-yellow-200 dark:border-yellow-800">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center">
                          <Clock className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white">{request.patient_name}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">N/A</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Assigned: {request.time}</p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleCompleteAppointment(request.appointment_id)}
                          className="flex items-center space-x-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium"
                        >
                          <CheckCircle className="w-4 h-4" />
                          <span>Complete</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">All Appointments</h2>
              {isLoadingAppointments ? (
                <div className="text-center py-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#F59297] mx-auto"></div>
                  <p className="text-gray-600 dark:text-gray-300 mt-2">Loading appointments...</p>
                </div>
              ) : appointments.length === 0 ? (
                <p className="text-gray-600 dark:text-gray-300 text-center">No appointments found.</p>
              ) : (
                <div className="space-y-4">
                  {appointments.map((appointment) => (
                    <div key={appointment.appointment_id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-[#F59297] rounded-full flex items-center justify-center text-white font-bold">
                          {appointment.time.split(':')[0]}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white">{appointment.patient_name}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{appointment.date}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{appointment.time}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                          {appointment.status}
                        </span>
                        <button
                          onClick={() => handleViewDetails(appointment.appointment_id)}
                          className="text-[#F59297] hover:text-[#e67d82] text-sm font-medium"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'patients' && (
          <div className="space-y-8">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Patient Management</h1>
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-6 text-center">
              <p className="text-gray-600 dark:text-gray-300">Patient management feature is not available yet.</p>
            </div>
          </div>
        )}

        {activeTab === 'messages' && (
          <div className="space-y-8">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Messages & Communication</h1>
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-6 text-center">
              <p className="text-gray-600 dark:text-gray-300">Messaging feature is not available yet.</p>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-3xl p-6 border border-blue-200 dark:border-blue-800">
              <h2 className="text-xl font-bold text-blue-900 dark:text-blue-100 mb-4">📌 Health Tips & Updates</h2>
              <div className="space-y-4">
                <div className="p-4 bg-white dark:bg-blue-900/30 rounded-xl">
                  <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                    New guideline for managing first-trimester nausea released by GHS
                  </h3>
                  <p className="text-sm text-blue-800 dark:text-blue-200 mb-3">
                    Updated recommendations for treating morning sickness in pregnant women, including new dietary guidelines and safe medication options.
                  </p>
                  <button className="text-[#F59297] hover:text-[#e67d82] text-sm font-medium">
                    Read Full Guidelines →
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Appointment Details Modal */}
        {selectedAppointment && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-sm">
            <div className="min-h-screen flex items-center justify-center p-4">
              <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl max-w-md w-full p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">Appointment Details</h3>
                  <button
                    onClick={() => setSelectedAppointment(null)}
                    className="text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                {isLoadingDetails ? (
                  <div className="text-center py-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#F59297] mx-auto"></div>
                    <p className="text-gray-600 dark:text-gray-300 mt-2">Loading details...</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Appointment ID</p>
                      <p className="font-medium text-gray-900 dark:text-white">{selectedAppointment.appointment_id}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Patient Name</p>
                      <p className="font-medium text-gray-900 dark:text-white">{selectedAppointment.patient_name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Date</p>
                      <p className="font-medium text-gray-900 dark:text-white">{selectedAppointment.date}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Time</p>
                      <p className="font-medium text-gray-900 dark:text-white">{selectedAppointment.time}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Status</p>
                      <p className="font-medium text-gray-900 dark:text-white">{selectedAppointment.status}</p>
                    </div>
                  </div>
                )}
                <button
                  onClick={() => setSelectedAppointment(null)}
                  className="mt-6 w-full px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default PractitionerDashboard