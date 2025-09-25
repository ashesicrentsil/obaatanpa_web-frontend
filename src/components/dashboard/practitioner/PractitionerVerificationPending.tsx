// File: src/components/dashboard/practitioner/PractitionerVerificationPending.tsx

'use client'

import { FC, useState } from 'react'
import { Shield, Clock, RefreshCw, Edit, LogOut, User, Mail, CheckCircle, MapPin, Sun, Moon, Phone } from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'

interface PractitionerVerificationPendingProps {
  user: {
    fullName: string
    hospital: string
    email: string
    practitionerType: string
    specialization: string
    licenseNumber?: string
    hospitalId: string
    verificationStatus: 'pending' | 'approved' | 'rejected'
    profilePicture?: string
    phoneNumber?: string
    yearsOfExperience?: number
    qualifications?: string[]
  }
  isRefreshing: boolean
  onRefresh: () => void
  onUpdateHospital: (newHospital: string, newHospitalId: string) => void
  onLogout: () => void
}

const PractitionerVerificationPending: FC<PractitionerVerificationPendingProps> = ({
  user,
  isRefreshing,
  onRefresh,
  onUpdateHospital,
  onLogout
}) => {
  const { theme, toggleTheme } = useTheme()
  const [showUpdateForm, setShowUpdateForm] = useState(false)
  const [selectedHospital, setSelectedHospital] = useState(user.hospital)

  const hospitals = [
    'Korle Bu Teaching Hospital',
    'Ridge Hospital',
    '37 Military Hospital',
    'Komfo Anokye Teaching Hospital',
    'Tamale Teaching Hospital',
    'Cape Coast Teaching Hospital',
    'Tema General Hospital',
    'Lekma Hospital',
    'University of Ghana Hospital',
    'Police Hospital'
  ]

  const handleUpdateHospital = () => {
    if (selectedHospital && selectedHospital !== user.hospital) {
      onUpdateHospital(selectedHospital, `hospital_${selectedHospital.toLowerCase().replace(/\s+/g, '_')}`)
      setShowUpdateForm(false)
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
              <span className="text-sm text-gray-500 dark:text-gray-400">Health Practitioner</span>
            </div>

            {/* User Info, Dark Mode Toggle & Logout */}
            <div className="flex items-center space-x-4">
              {/* Dark Mode Toggle */}
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

              <div className="text-right">
                <p className="text-sm font-medium text-gray-900 dark:text-white">{user.fullName}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{user.practitionerType}</p>
              </div>
              <button
                onClick={onLogout}
                className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors duration-200"
              >
                <LogOut className="w-4 h-4" />
                <span className="text-sm">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          {/* Status Icon */}
          <div className="w-24 h-24 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <Shield className="w-12 h-12 text-yellow-600 dark:text-yellow-400" />
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            🛡️ Verification in Progress
          </h1>

          {/* Description */}
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
            Thank you for registering as a health practitioner on Obaatanpa. We've sent a verification 
            request to the hospital you selected. You'll get an email once your account is approved.
          </p>
        </div>

        {/* Verification Status Card */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Verification Status</h2>
            <button
              onClick={onRefresh}
              disabled={isRefreshing}
              className="flex items-center space-x-2 text-[#F59297] hover:text-[#e67d82] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span className="text-sm font-medium">
                {isRefreshing ? 'Checking...' : 'Refresh Status'}
              </span>
            </button>
          </div>

          {/* Hospital Info */}
          <div className="flex items-center justify-between p-6 bg-yellow-50 dark:bg-yellow-900/20 rounded-2xl border border-yellow-200 dark:border-yellow-800">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center">
                <MapPin className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{user.hospital}</h3>
                <div className="flex items-center space-x-2 mt-1">
                  <Clock className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
                  <span className="text-sm text-yellow-700 dark:text-yellow-300 font-medium">
                    ⏳ Waiting for hospital approval
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setShowUpdateForm(true)}
              className="flex items-center space-x-2 text-[#F59297] hover:text-[#e67d82] font-medium"
            >
              <Edit className="w-4 h-4" />
              <span>Update Hospital</span>
            </button>
          </div>
        </div>

        {/* Practitioner Details Card */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Your Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center space-x-3">
              <User className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Full Name</p>
                <p className="font-medium text-gray-900 dark:text-white">{user.fullName}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                <p className="font-medium text-gray-900 dark:text-white">{user.email}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Shield className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Practitioner Type</p>
                <p className="font-medium text-gray-900 dark:text-white">{user.practitionerType}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Specialization</p>
                <p className="font-medium text-gray-900 dark:text-white">{user.specialization}</p>
              </div>
            </div>
            
            {user.phoneNumber && (
              <div className="flex items-center space-x-3">
                {/* If 'Phone' icon is not available, replace with PhoneCall and update import to: 
                    import { ..., PhoneCall } from 'lucide-react' */}
                <Phone className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Phone Number</p>
                  <p className="font-medium text-gray-900 dark:text-white">{user.phoneNumber}</p>
                </div>
              </div>
            )}
            
            {user.yearsOfExperience && (
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Experience</p>
                  <p className="font-medium text-gray-900 dark:text-white">{user.yearsOfExperience} years</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* What Happens Next */}
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-3xl p-8 border border-blue-200 dark:border-blue-800">
          <h2 className="text-xl font-bold text-blue-900 dark:text-blue-100 mb-4">What happens next?</h2>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-xs font-bold">1</span>
              </div>
              <p className="text-blue-800 dark:text-blue-200">
                Hospital administrators will review your credentials and verify your information
              </p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-xs font-bold">2</span>
              </div>
              <p className="text-blue-800 dark:text-blue-200">
                You'll receive an email notification once your account is approved or if additional information is needed
              </p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-xs font-bold">3</span>
              </div>
              <p className="text-blue-800 dark:text-blue-200">
                Once approved, you'll have access to your practitioner dashboard to manage patients and appointments
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Update Hospital Modal */}
      {showUpdateForm && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-sm">
          <div className="min-h-screen flex items-center justify-center p-4">
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl max-w-md w-full p-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Update Hospital Information</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Select a different hospital if you made an error during registration.
              </p>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Select Hospital
                </label>
                <select
                  value={selectedHospital}
                  onChange={(e) => setSelectedHospital(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#F59297] focus:border-transparent"
                >
                  {hospitals.map((hospital) => (
                    <option key={hospital} value={hospital}>
                      {hospital}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowUpdateForm(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdateHospital}
                  className="flex-1 px-4 py-2 bg-[#F59297] hover:bg-[#e67d82] text-white rounded-lg font-medium"
                >
                  Update Hospital
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PractitionerVerificationPending