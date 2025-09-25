'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Users, UserCheck, UserX, Calendar, Settings, Bell, Search, Filter, Sun, Moon } from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'

interface PractitionerRequest {
  id: string
  name: string
  profession: string
  email: string
  phone: string
  requestDate: string
  status: 'pending' | 'approved' | 'rejected'
}

interface Appointment {
  appointment_id: number
  date: string
  time: string
  patient_id: number
  doctor: {
    id: number
    first_name: string
    last_name: string
    email: string
  } | null
}

interface UnassignedAppointment {
  appointment_id: number
  date: string
  time: string
  patient_id: number
}

interface Doctor {
  id: number
  name: string
}

interface Worker {
  id: number
  firstname: string
  lastname: string
  email: string
  is_approved: boolean
}

const HospitalDashboard = () => {
  const { theme, toggleTheme } = useTheme()
  const router = useRouter()
  const [hospital, setHospital] = useState({
    name: 'Loading...',
    type: '',
    region: '',
    city: '',
    email: '',
    totalStaff: 0,
    pendingRequests: 0,
    totalAppointments: 0
  })
  const [practitionerRequests, setPractitionerRequests] = useState<PractitionerRequest[]>([])
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [unassignedAppointments, setUnassignedAppointments] = useState<UnassignedAppointment[]>([])
  const [doctors, setDoctors] = useState<Doctor[]>([])
  const [workers, setWorkers] = useState<Worker[]>([])
  const [selectedDoctors, setSelectedDoctors] = useState<{ [key: number]: number }>({})
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState<'overview' | 'staff' | 'requests' | 'appointments'>('overview')
  const [appointmentSubTab, setAppointmentSubTab] = useState<'appointments' | 'unassigned'>('appointments')
  const [showAssignPopup, setShowAssignPopup] = useState(false)
  const [selectedAppointmentId, setSelectedAppointmentId] = useState<number | null>(null)
  const [selectedDoctorId, setSelectedDoctorId] = useState<number | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    // Check for authToken and userType
    const authToken = localStorage.getItem('authToken')
    const currentUserData = localStorage.getItem('currentUser')
    
    if (!authToken || !currentUserData) {
      setErrorMessage('Authentication required. Redirecting to login...')
      setTimeout(() => router.push('/login'), 2000)
      return
    }

    try {
      const userData = JSON.parse(currentUserData)
      console.log('Parsed currentUser:', userData) // Debug log
      if (userData.userType !== 'hospital') {
        setErrorMessage('Access denied. Hospital account required.')
        setTimeout(() => router.push('/login'), 2000)
        return
      }

      // Log token for debugging
      console.log('Auth Token:', authToken)

      // Load hospital data from localStorage
      setHospital({
        name: userData.hospital_name || '',
        type: userData.facilityType || 'Hospital',
        region: userData.region || '',
        city: userData.city || '',
        email: userData.email || '',
        totalStaff: workers.length,
        pendingRequests: practitionerRequests.filter(req => req.status === 'pending').length,
        totalAppointments: appointments.length
      })
      console.log('Initial Hospital State:', {
        name: userData.hospital_name || '',
        type: userData.facilityType || 'Hospital',
        region: userData.region || '',
        city: userData.city || '',
        email: userData.email || '',
        totalStaff: workers.length,
        pendingRequests: practitionerRequests.filter(req => req.status === 'pending').length,
        totalAppointments: appointments.length
      }) // Debug log
    } catch (error) {
      setErrorMessage('Error parsing user data. Please log in again.')
      setTimeout(() => router.push('/login'), 2000)
    }
  }, [practitionerRequests, appointments, workers, router])

  useEffect(() => {
    if (activeTab !== 'requests') return

    const authToken = localStorage.getItem('authToken')
    if (!authToken) {
      setErrorMessage('No authentication token found. Please log in.')
      setTimeout(() => router.push('/login'), 2000)
      return
    }

    const fetchPendingRequests = async () => {
      setIsLoading(true)
      try {
        const response = await fetch('https://obaatanpa-backend.onrender.com/health_facility/unapproved_doctors', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`
          }
        })
        console.log('Pending Requests Request Headers:', { Authorization: `Bearer ${authToken}` })
        const data = await response.json()
        console.log('Pending Requests Response:', data)
        if (response.ok) {
          const requests: PractitionerRequest[] = data.pending_approvals.map((doctor: any) => ({
            id: doctor.id.toString(),
            name: `${doctor.first_name} ${doctor.last_name}`,
            profession: 'Unknown', // Placeholder, update if endpoint provides this
            email: doctor.email,
            phone: 'N/A', // Placeholder, update if endpoint provides this
            requestDate: 'Unknown', // Placeholder, update if endpoint provides this
            status: 'pending' as const
          }))
          setPractitionerRequests(requests)
          setHospital(prev => ({ ...prev, pendingRequests: requests.length }))
        } else {
          if (response.status === 401) {
            setErrorMessage('Session expired. Please log in again.')
            setTimeout(() => router.push('/login'), 2000)
          } else {
            setErrorMessage(data.message || 'Failed to fetch pending requests')
          }
        }
      } catch (error) {
        setErrorMessage('Error connecting to backend: ' + (error instanceof Error ? error.message : 'Unknown error'))
      } finally {
        setIsLoading(false)
      }
    }

    fetchPendingRequests()
  }, [activeTab, router])

  useEffect(() => {
    const authToken = localStorage.getItem('authToken')
    const currentUserData = localStorage.getItem('currentUser')
    if (!authToken || !currentUserData) {
      setErrorMessage('No authentication token found. Please log in.')
      setTimeout(() => router.push('/login'), 2000)
      return
    }

    const userData = JSON.parse(currentUserData)
    const hospitalId = userData.hospital_id || '1'

    const fetchWorkers = async () => {
      setIsLoading(true)
      try {
        const response = await fetch(`https://obaatanpa-backend.onrender.com/hospital/${hospitalId}/workers`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`
          }
        })
        console.log('Workers Request Headers:', { Authorization: `Bearer ${authToken}` })
        const data = await response.json()
        console.log('Workers Response:', data)
        if (response.ok) {
          setWorkers(data.workers)
          // Update doctors state with approved workers
          const approvedDoctors: Doctor[] = data.workers
            .filter((worker: Worker) => worker.is_approved)
            .map((worker: Worker) => ({
              id: worker.id,
              name: `${worker.firstname} ${worker.lastname}`
            }))
          setDoctors(approvedDoctors)
          setHospital(prev => ({ ...prev, totalStaff: data.workers.length }))
        } else {
          if (response.status === 401) {
            setErrorMessage('Session expired. Please log in again.')
            setTimeout(() => router.push('/login'), 2000)
          } else {
            setErrorMessage(data.message || 'Failed to fetch workers')
          }
        }
      } catch (error) {
        setErrorMessage('Error connecting to backend: ' + (error instanceof Error ? error.message : 'Unknown error'))
      } finally {
        setIsLoading(false)
      }
    }

    // Fetch workers for 'staff' tab or 'unassigned' appointments tab
    if (activeTab === 'staff' || (activeTab === 'appointments' && appointmentSubTab === 'unassigned')) {
      fetchWorkers()
    }
  }, [activeTab, appointmentSubTab, router])

  useEffect(() => {
    if (activeTab !== 'appointments') return

    const authToken = localStorage.getItem('authToken')
    if (!authToken) {
      setErrorMessage('No authentication token found. Please log in.')
      setTimeout(() => router.push('/login'), 2000)
      return
    }

    const fetchAppointments = async () => {
      setIsLoading(true)
      try {
        const response = await fetch('https://obaatanpa-backend.onrender.com/health_facility/appointments', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`
          }
        })
        console.log('Appointments Request Headers:', { Authorization: `Bearer ${authToken}` })
        const data = await response.json()
        console.log('Appointments Response:', data)
        if (response.ok) {
          setAppointments(data.appointments)
          setHospital(prev => ({ ...prev, totalAppointments: data.appointments.length }))
        } else {
          if (response.status === 401) {
            setErrorMessage('Session expired. Please log in again.')
            setTimeout(() => router.push('/login'), 2000)
          } else {
            setErrorMessage(data.message || 'Failed to fetch appointments')
          }
        }
      } catch (error) {
        setErrorMessage('Error connecting to backend: ' + (error instanceof Error ? error.message : 'Unknown error'))
      } finally {
        setIsLoading(false)
      }
    }

    const fetchUnassignedAppointments = async () => {
      setIsLoading(true)
      try {
        const response = await fetch('https://obaatanpa-backend.onrender.com/health_facility/appointments/unassigned', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`
          }
        })
        console.log('Unassigned Appointments Request Headers:', { Authorization: `Bearer ${authToken}` })
        const data = await response.json()
        console.log('Unassigned Appointments Response:', data)
        if (response.ok) {
          setUnassignedAppointments(data.pending_appointments)
        } else {
          if (response.status === 401) {
            setErrorMessage('Session expired. Please log in again.')
            setTimeout(() => router.push('/login'), 2000)
          } else {
            setErrorMessage(data.message || 'Failed to fetch unassigned appointments')
          }
        }
      } catch (error) {
        setErrorMessage('Error connecting to backend: ' + (error instanceof Error ? error.message : 'Unknown error'))
      } finally {
        setIsLoading(false)
      }
    }

    fetchAppointments()
    fetchUnassignedAppointments()
  }, [activeTab, router])

  const handlePractitionerAction = async (requestId: string, action: 'approve' | 'reject') => {
    const authToken = localStorage.getItem('authToken')
    if (!authToken) {
      setErrorMessage('No authentication token found. Please log in.')
      setTimeout(() => router.push('/login'), 2000)
      return
    }

    if (action === 'approve') {
      setIsLoading(true)
      try {
        const response = await fetch(`https://obaatanpa-backend.onrender.com/health_facility/approve_doctor/${requestId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`
          }
        })
        console.log('Approve Doctor Request Headers:', { Authorization: `Bearer ${authToken}` })
        const data = await response.json()
        console.log('Approve Doctor Response:', data)
        if (response.ok) {
          setSuccessMessage(data.message)
          // Refetch pending requests to update the list
          const fetchPendingRequests = async () => {
            try {
              const response = await fetch('https://obaatanpa-backend.onrender.com/health_facility/unapproved_doctors', {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${authToken}`
                }
              })
              const data = await response.json()
              if (response.ok) {
                const requests: PractitionerRequest[] = data.pending_approvals.map((doctor: any) => ({
                  id: doctor.id.toString(),
                  name: `${doctor.first_name} ${doctor.last_name}`,
                  profession: 'Unknown',
                  email: doctor.email,
                  phone: 'N/A',
                  requestDate: 'Unknown',
                  status: 'pending' as const
                }))
                setPractitionerRequests(requests)
                setHospital(prev => ({ ...prev, pendingRequests: requests.length }))
              } else {
                setErrorMessage(data.message || 'Failed to fetch pending requests')
              }
            } catch (error) {
              setErrorMessage('Error connecting to backend: ' + (error instanceof Error ? error.message : 'Unknown error'))
            }
          }
          await fetchPendingRequests()
        } else {
          if (response.status === 401) {
            setErrorMessage('Session expired. Please log in again.')
            setTimeout(() => router.push('/login'), 2000)
          } else {
            setErrorMessage(data.message || 'Failed to approve doctor')
          }
        }
      } catch (error) {
        setErrorMessage('Error connecting to backend: ' + (error instanceof Error ? error.message : 'Unknown error'))
      } finally {
        setIsLoading(false)
        setTimeout(() => {
          setSuccessMessage('')
          setErrorMessage('')
        }, 3000)
      }
    } else {
      // TODO: Implement API call for reject action
      setPractitionerRequests(prev =>
        prev.map(request =>
          request.id === requestId
            ? { ...request, status: 'rejected' }
            : request
        )
      )
      setSuccessMessage('Practitioner rejected successfully')
      setTimeout(() => setSuccessMessage(''), 3000)
    }
  }

  const handleOpenAssignPopup = (appointmentId: number) => {
    setSelectedAppointmentId(appointmentId)
    setSelectedDoctorId(null)
    setSearchQuery('')
    setShowAssignPopup(true)
  }

  const handleAssignAppointment = async () => {
    if (!selectedAppointmentId || !selectedDoctorId) {
      setErrorMessage('Please select a doctor to assign.')
      setTimeout(() => setErrorMessage(''), 3000)
      return
    }

    const authToken = localStorage.getItem('authToken')
    if (!authToken) {
      setErrorMessage('No authentication token found. Please log in.')
      setTimeout(() => router.push('/login'), 2000)
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch(`https://obaatanpa-backend.onrender.com/health_facility/appointment/assign/${selectedAppointmentId}/${selectedDoctorId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`
        }
      })
      console.log('Assign Appointment Request Headers:', { Authorization: `Bearer ${authToken}` })
      const data = await response.json()
      console.log('Assign Appointment Response:', data)
      if (response.ok) {
        setSuccessMessage(data.message)
        // Refetch appointments to update the lists
        const fetchAppointments = async () => {
          const response = await fetch('https://obaatanpa-backend.onrender.com/health_facility/appointments', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${authToken}`
            }
          })
          const data = await response.json()
          if (response.ok) {
            setAppointments(data.appointments)
            setHospital(prev => ({ ...prev, totalAppointments: data.appointments.length }))
          }
        }
        const fetchUnassignedAppointments = async () => {
          const response = await fetch('https://obaatanpa-backend.onrender.com/health_facility/appointments/unassigned', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${authToken}`
            }
          })
          const data = await response.json()
          if (response.ok) {
            setUnassignedAppointments(data.pending_appointments)
          }
        }
        await Promise.all([fetchAppointments(), fetchUnassignedAppointments()])
        setShowAssignPopup(false)
      } else {
        if (response.status === 401) {
          setErrorMessage('Session expired. Please log in again.')
          setTimeout(() => router.push('/login'), 2000)
        } else {
          setErrorMessage(data.message || 'Failed to assign appointment')
        }
      }
    } catch (error) {
      setErrorMessage('Error connecting to backend: ' + (error instanceof Error ? error.message : 'Unknown error'))
    } finally {
      setIsLoading(false)
      setTimeout(() => {
        setSuccessMessage('')
        setErrorMessage('')
      }, 3000)
    }
  }

  const handleDoctorSelection = (doctorId: number) => {
    setSelectedDoctorId(doctorId)
  }

  const filteredDoctors = doctors.filter(doctor =>
    doctor.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const stats = [
    {
      title: 'Total Staff',
      value: hospital.totalStaff,
      icon: Users,
      color: 'bg-blue-500',
      change: '+2 this month'
    },
    {
      title: 'Pending Requests',
      value: hospital.pendingRequests,
      icon: UserCheck,
      color: 'bg-yellow-500',
      change: 'Needs attention'
    },
    {
      title: 'Total Appointments',
      value: hospital.totalAppointments,
      icon: Calendar,
      color: 'bg-green-500',
      change: '+8 this week'
    },
    {
      title: 'Active Practitioners',
      value: hospital.totalStaff - 3,
      icon: UserCheck,
      color: 'bg-purple-500',
      change: 'All verified'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-[#F59297] to-[#7da8e6] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">🏥</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">{hospital.name}</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">{hospital.type} • {hospital.city}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
                title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {theme === 'dark' ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                <Bell className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {[
              { id: 'overview', label: 'Overview', icon: Users },
              { id: 'staff', label: 'Staff Managements', icon: UserCheck },
              { id: 'requests', label: 'Pending Requests', icon: UserX },
              { id: 'appointments', label: 'Appointments', icon: Calendar }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                  activeTab === tab.id
                    ? 'border-[#F59297] text-[#F59297]'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
                {tab.id === 'requests' && hospital.pendingRequests > 0 && (
                  <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] h-5 flex items-center justify-center">
                    {hospital.pendingRequests}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isLoading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#F59297]"></div>
          </div>
        )}

        {errorMessage && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-3 mb-6">
            <p className="text-red-600 dark:text-red-400 text-sm">{errorMessage}</p>
          </div>
        )}
        {successMessage && (
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-3 mb-6">
            <p className="text-green-600 dark:text-green-400 text-sm">{successMessage}</p>
          </div>
        )}

        {activeTab === 'overview' && !isLoading && (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.title}</p>
                      <p className="text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{stat.change}</p>
                    </div>
                    <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Activity */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Activity</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <UserCheck className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">New practitioner request</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Dr. John Doe requested to join your hospital</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <Calendar className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Appointment scheduled</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">New appointment booked for tomorrow</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'staff' && !isLoading && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Staff Management</h2>
              <div className="flex space-x-3">
                <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                  <Search className="w-4 h-4" />
                  <span>Search</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                  <Filter className="w-4 h-4" />
                  <span>Filter</span>
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {workers.length > 0 ? (
                workers.map((worker) => (
                  <div key={worker.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="w-12 h-12 bg-gradient-to-r from-[#F59297] to-[#7da8e6] rounded-full flex items-center justify-center">
                            <span className="text-white font-semibold text-lg">
                              {worker.firstname[0]}{worker.lastname[0]}
                            </span>
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                              {worker.firstname} {worker.lastname}
                            </h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {worker.is_approved ? 'Approved' : 'Not Approved'}
                            </p>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="font-medium text-gray-600 dark:text-gray-400">Email:</span>
                            <p className="text-gray-900 dark:text-white">{worker.email}</p>
                          </div>
                          <div>
                            <span className="font-medium text-gray-600 dark:text-gray-400">Status:</span>
                            <p className="text-gray-900 dark:text-white">
                              {worker.is_approved ? 'Active' : 'Pending Approval'}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12">
                  <UserCheck className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No staff members</h3>
                  <p className="text-gray-500 dark:text-gray-400">No staff members found for this hospital.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'requests' && !isLoading && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Pending Staff Requests</h2>
              <div className="flex space-x-3">
                <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                  <Search className="w-4 h-4" />
                  <span>Search</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                  <Filter className="w-4 h-4" />
                  <span>Filter</span>
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {practitionerRequests.filter(req => req.status === 'pending').map((request) => (
                <div key={request.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="w-12 h-12 bg-gradient-to-r from-[#F59297] to-[#7da8e6] rounded-full flex items-center justify-center">
                          <span className="text-white font-semibold text-lg">
                            {request.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{request.name}</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{request.profession}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-medium text-gray-600 dark:text-gray-400">Email:</span>
                          <p className="text-gray-900 dark:text-white">{request.email}</p>
                        </div>
                        <div>
                          <span className="font-medium text-gray-600 dark:text-gray-400">Phone:</span>
                          <p className="text-gray-900 dark:text-white">{request.phone}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-3 ml-6">
                      <button
                        onClick={() => handlePractitionerAction(request.id, 'approve')}
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
                      >
                        ✅ Approve
                      </button>
                      <button
                        onClick={() => handlePractitionerAction(request.id, 'reject')}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
                      >
                        ❌ Reject
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              
              {practitionerRequests.filter(req => req.status === 'pending').length === 0 && (
                <div className="text-center py-12">
                  <UserCheck className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No pending requests</h3>
                  <p className="text-gray-500 dark:text-gray-400">All practitioner requests have been processed.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'appointments' && !isLoading && (
          <div className="space-y-6">
            {/* Sub-Tabs for Appointments */}
            <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
              <nav className="flex space-x-8">
                {[
                  { id: 'appointments', label: 'Appointments', icon: Calendar },
                  { id: 'unassigned', label: 'Unassigned Appointments', icon: Calendar }
                ].map((subTab) => (
                  <button
                    key={subTab.id}
                    onClick={() => setAppointmentSubTab(subTab.id as any)}
                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                      appointmentSubTab === subTab.id
                        ? 'border-[#F59297] text-[#F59297]'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                    }`}
                  >
                    <subTab.icon className="w-4 h-4" />
                    <span>{subTab.label}</span>
                  </button>
                ))}
              </nav>
            </div>

            {/* Sub-Tab Content */}
            {appointmentSubTab === 'appointments' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">All Appointments</h2>
                {appointments.length > 0 ? (
                  <div className="space-y-4">
                    {appointments.map((appointment) => (
                      <div key={appointment.appointment_id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-3">
                              <div className="w-12 h-12 bg-gradient-to-r from-[#F59297] to-[#7da8e6] rounded-full flex items-center justify-center">
                                <Calendar className="w-6 h-6 text-white" />
                              </div>
                              <div>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                  Appointment #{appointment.appointment_id}
                                </h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                  {new Date(appointment.date).toLocaleDateString()} at {appointment.time}
                                </p>
                              </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                              <div>
                                <span className="font-medium text-gray-600 dark:text-gray-400">Patient ID:</span>
                                <p className="text-gray-900 dark:text-white">{appointment.patient_id}</p>
                              </div>
                              <div>
                                <span className="font-medium text-gray-600 dark:text-gray-400">Doctor:</span>
                                <p className="text-gray-900 dark:text-white">
                                  {appointment.doctor
                                    ? `${appointment.doctor.first_name} ${appointment.doctor.last_name}`
                                    : 'Unassigned'}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No appointments</h3>
                    <p className="text-gray-500 dark:text-gray-400">No appointments scheduled for this hospital.</p>
                  </div>
                )}
              </div>
            )}

            {appointmentSubTab === 'unassigned' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Unassigned Appointments</h2>
                {unassignedAppointments.length > 0 ? (
                  <div className="space-y-4">
                    {unassignedAppointments.map((appointment) => (
                      <div key={appointment.appointment_id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-3">
                              <div className="w-12 h-12 bg-gradient-to-r from-[#F59297] to-[#7da8e6] rounded-full flex items-center justify-center">
                                <Calendar className="w-6 h-6 text-white" />
                              </div>
                              <div>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                  Appointment #{appointment.appointment_id}
                                </h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                  {new Date(appointment.date).toLocaleDateString()} at {appointment.time}
                                </p>
                              </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                              <div>
                                <span className="font-medium text-gray-600 dark:text-gray-400">Patient ID:</span>
                                <p className="text-gray-900 dark:text-white">{appointment.patient_id}</p>
                              </div>
                              <div>
                                <span className="font-medium text-gray-600 dark:text-gray-400">Status:</span>
                                <p className="text-gray-900 dark:text-white">Unassigned</p>
                              </div>
                            </div>
                          </div>
                          <div className="flex space-x-3 ml-6 items-center">
                            <button
                              onClick={() => handleOpenAssignPopup(appointment.appointment_id)}
                              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
                            >
                              Assign Appointment
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No unassigned appointments</h3>
                    <p className="text-gray-500 dark:text-gray-400">All appointments have been assigned.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Assign Appointment Popup */}
        {showAssignPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 w-full max-w-md">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Assign Appointment #{selectedAppointmentId}
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                    Search Doctors
                  </label>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by doctor name..."
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#F59297]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                    Select Doctor
                  </label>
                  <select
                    value={selectedDoctorId || ''}
                    onChange={(e) => handleDoctorSelection(Number(e.target.value))}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#F59297]"
                  >
                    <option value="">Select a doctor</option>
                    {filteredDoctors.map((doctor) => (
                      <option key={doctor.id} value={doctor.id}>
                        {doctor.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => setShowAssignPopup(false)}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAssignAppointment}
                    disabled={!selectedDoctorId}
                    className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default HospitalDashboard