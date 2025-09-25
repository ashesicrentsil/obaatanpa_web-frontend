'use client'

import { useState, useEffect } from 'react'
import { Shield, Clock, CheckCircle, AlertCircle, LogOut, Edit, RefreshCw } from 'lucide-react'
import PractitionerVerificationPending from '@/components/dashboard/practitioner/PractitionerVerificationPending'
import PractitionerDashboard from '@/components/dashboard/practitioner/PractitionerDashboard'

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

const PractitionerPage = () => {
  const [user, setUser] = useState<PractitionerUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [isPolling, setIsPolling] = useState(false)

  // Load user data from localStorage on component mount
  useEffect(() => {
    const currentUserData = localStorage.getItem('currentUser')

    if (currentUserData) {
      const userData = JSON.parse(currentUserData)
      
      if (userData.userType === 'practitioner') {
        setUser({
          id: userData.id || Date.now().toString(),
          fullName: userData.fullName || 'Health Practitioner',
          email: userData.email || '',
          practitionerType: userData.practitionerType || 'Doctor',
          specialization: userData.specialization || 'General Practice',
          licenseNumber: userData.licenseNumber || '',
          hospital: userData.hospital || 'Unknown Hospital',
          hospitalId: userData.hospitalId || '',
          verificationStatus: userData.verificationStatus || 'pending',
          profilePicture: userData.profilePicture || '',
          phoneNumber: userData.phoneNumber || '',
          yearsOfExperience: userData.yearsOfExperience || 0,
          qualifications: userData.qualifications || []
        })
      } else {
        window.location.href = '/dashboard'
      }
    } else {
      window.location.href = '/'
    }

    setIsLoading(false)
  }, [])

  // Check verification status on mount
  useEffect(() => {
    if (user && !isRefreshing) {
      refreshVerificationStatus()
    }
  }, [user])

  // Auto-poll for verification status updates when in pending state
  useEffect(() => {
    if (user?.verificationStatus === 'pending' && !isPolling) {
      setIsPolling(true)
      const interval = setInterval(() => {
        refreshVerificationStatus()
      }, 10000)

      return () => {
        clearInterval(interval)
        setIsPolling(false)
      }
    }
  }, [user?.verificationStatus, isPolling])

  // Function to refresh verification status
  const refreshVerificationStatus = async () => {
    setIsRefreshing(true)
    
    try {
      const authToken = localStorage.getItem('authToken')
      if (!authToken) {
        console.error('No authToken found in localStorage. Cannot refresh status.')
        setIsRefreshing(false)
        return
      }

      console.log('Calling /health_worker/verify/status with token:', authToken.substring(0, 10) + '...');
      const response = await fetch('https://obaatanpa-backend.onrender.com/health_worker/verify/status', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        }
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()
      console.log('Verification status response:', result)

      if (user && result.verificationStatus && result.verificationStatus !== user.verificationStatus) {
        const updatedUser = { ...user, verificationStatus: result.verificationStatus }
        setUser(updatedUser)
        
        const currentUserData = localStorage.getItem('currentUser')
        if (currentUserData) {
          const userData = JSON.parse(currentUserData)
          const updatedUserData = { ...userData, verificationStatus: result.verificationStatus }
          localStorage.setItem('currentUser', JSON.stringify(updatedUserData))
          console.log('Updated verificationStatus to:', result.verificationStatus)
        }
      }
    } catch (error) {
      console.error('Error refreshing verification status:', error)
    }
    
    setIsRefreshing(false)
  }

  // Function to update hospital info
  const updateHospitalInfo = (newHospital: string, newHospitalId: string) => {
    if (user) {
      const updatedUser = { 
        ...user, 
        hospital: newHospital, 
        hospitalId: newHospitalId,
        verificationStatus: 'pending' as const
      }
      setUser(updatedUser)
      
      const currentUserData = localStorage.getItem('currentUser')
      if (currentUserData) {
        const userData = JSON.parse(currentUserData)
        const updatedUserData = { 
          ...userData, 
          hospital: newHospital, 
          hospitalId: newHospitalId,
          verificationStatus: 'pending'
        }
        localStorage.setItem('currentUser', JSON.stringify(updatedUserData))
      }
    }
  }

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem('currentUser')
    localStorage.removeItem('authToken')
    window.location.href = '/'
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#F59297] mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Access Denied</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            You don't have permission to access this page.
          </p>
          <button
            onClick={() => window.location.href = '/'}
            className="bg-[#F59297] hover:bg-[#e67d82] text-white px-6 py-2 rounded-lg font-medium"
          >
            Go to Homepage
          </button>
        </div>
      </div>
    )
  }

  if (user.verificationStatus === 'pending') {
    return (
      <PractitionerVerificationPending
        user={user}
        isRefreshing={isRefreshing}
        onRefresh={refreshVerificationStatus}
        onUpdateHospital={updateHospitalInfo}
        onLogout={handleLogout}
      />
    )
  }

  if (user.verificationStatus === 'rejected') {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="max-w-md w-full mx-4">
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-8 text-center">
            <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="w-8 h-8 text-red-600 dark:text-red-400" />
            </div>
            
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Verification Rejected
            </h1>
            
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Unfortunately, your verification request has been rejected by {user.hospital}. 
              Please contact the hospital directly or try registering with a different hospital.
            </p>
            
            <div className="space-y-3">
              <button
                onClick={() => updateHospitalInfo('', '')}
                className="w-full bg-[#F59297] hover:bg-[#e67d82] text-white px-6 py-3 rounded-lg font-medium"
              >
                Try Different Hospital
              </button>
              <button
                onClick={handleLogout}
                className="w-full border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <PractitionerDashboard
      user={user}
      onLogout={handleLogout}
    />
  )
}

export default PractitionerPage