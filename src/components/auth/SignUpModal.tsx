// File: src/components/auth/SignUpModal.tsx

'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createPortal } from 'react-dom'
import Image from 'next/image'
import { X, Eye, EyeOff, Heart } from 'lucide-react'

// CSS animations
const modalStyles = `
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes modalSlideIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes modalZoomIn {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes slideInLeft {
    from {
      opacity: 0;
      transform: translateX(-20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes slideInRight {
    from {
      opacity: 0;
      transform: translateX(20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes fadeInScale {
    from {
      opacity: 0;
      transform: scale(0.8);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
`

interface SignUpModalProps {
  isOpen: boolean
  onClose: () => void
  onOpenLogin?: () => void
}

interface VerificationModalProps {
  isOpen: boolean
  email: string
  userType: UserType
  onClose: () => void
  onOpenLogin: () => void
  practitionerData?: Partial<PractitionerUser>
}

type UserType = 'pregnant' | 'new-mother' | 'hospital' | 'practitioner'

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

// Verification Modal Component
const VerificationModal = ({ isOpen, email, userType, onClose, onOpenLogin, practitionerData }: VerificationModalProps) => {
  const [verificationCode, setVerificationCode] = useState('')
  const [responseMessage, setResponseMessage] = useState('')
  const [showResponse, setShowResponse] = useState(false)
  const router = useRouter()

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const payload = {
      email,
      verification_code: verificationCode
    }

    const verifyEndpoint = 
      userType === 'hospital' ? 'https://obaatanpa-backend.onrender.com/health_facility/verify' :
      userType === 'practitioner' ? 'https://obaatanpa-backend.onrender.com/health_worker/verify' :
      'https://obaatanpa-backend.onrender.com/verify'

    try {
      const response = await fetch(verifyEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      const result = await response.json()
      setResponseMessage(result.message)
      setShowResponse(true)

      if (response.ok && userType === 'practitioner') {
        // Construct PractitionerUser object
        const practitionerUser: PractitionerUser = {
          id: result.id || 'temp-id-' + Date.now(),
          fullName: practitionerData?.fullName || 'Unknown',
          email: email,
          practitionerType: practitionerData?.practitionerType || 'General Practitioner',
          specialization: practitionerData?.specialization || 'General',
          licenseNumber: practitionerData?.licenseNumber || '',
          hospital: practitionerData?.hospital || 'Unknown',
          hospitalId: practitionerData?.hospitalId || 'unknown-hospital-id',
          verificationStatus: 'pending',
          profilePicture: practitionerData?.profilePicture,
          phoneNumber: practitionerData?.phoneNumber,
          yearsOfExperience: practitionerData?.yearsOfExperience,
          qualifications: practitionerData?.qualifications
        }

        // Save to localStorage
        localStorage.setItem('currentUser', JSON.stringify({
          ...practitionerUser,
          userType: 'practitioner'
        }))

        // Redirect to /dashboard/practitioner (without query parameter)
        router.push('/dashboard/practitioner')
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      setResponseMessage('Error verifying account: ' + errorMessage)
      setShowResponse(true)
    }
  }

  const handleResponseClose = () => {
    setShowResponse(false)
    setVerificationCode('')
    onClose()
    if (userType !== 'practitioner') {
      onOpenLogin()
    }
  }

  const modalContent = (
    <div
      className="fixed inset-0 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      style={{ animation: 'fadeIn 0.3s ease-out', zIndex: 99999 }}
    >
      <div
        className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full p-6"
        style={{ animation: 'modalZoomIn 0.4s ease-out' }}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center"
        >
          <X className="w-4 h-4 text-gray-600 dark:text-gray-400" />
        </button>

        {showResponse ? (
          <div className="text-center">
            <p className="text-lg text-gray-900 dark:text-white mb-6">{responseMessage}</p>
            <button
              onClick={handleResponseClose}
              className="w-full bg-[#F59297] text-white py-2 rounded-xl font-semibold hover:bg-[#e67d82]"
            >
              Okay
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Verify Your Account
            </h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                disabled
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Verification Code *
              </label>
              <input
                type="text"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#F59297]"
                placeholder="Enter your verification code"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#F59297] text-white py-2 rounded-xl font-semibold hover:bg-[#e67d82]"
            >
              Submit
            </button>
          </form>
        )}
      </div>
    </div>
  )

  return createPortal(modalContent, document.body)
}

const SignUpModal = ({ isOpen, onClose, onOpenLogin }: SignUpModalProps) => {
  const [userType, setUserType] = useState<UserType>('pregnant')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [showResponse, setShowResponse] = useState(false)
  const [responseMessage, setResponseMessage] = useState('')
  const [showVerificationModal, setShowVerificationModal] = useState(false)
  const [signupEmail, setSignupEmail] = useState('')
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    location: '',
    dob: '',
    language: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
    receiveUpdates: false,
    profession: '',
    facilityType: '',
    licenseNumber: '',
    workplace: '',
    region: '',
    city: '',
    name: '',
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!isOpen || !mounted) return null

  // Inject CSS animations
  if (typeof document !== 'undefined' && !document.getElementById('signup-modal-styles')) {
    const style = document.createElement('style')
    style.id = 'signup-modal-styles'
    style.textContent = modalStyles
    document.head.appendChild(style)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate password match
    if (formData.password !== formData.confirmPassword) {
      setResponseMessage('Passwords do not match!')
      setShowResponse(true)
      return
    }

    // Handle signup for pregnant and new-mother user types
    if (userType === 'pregnant' || userType === 'new-mother') {
      const payload = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        care_type: userType === 'pregnant' ? 'prenatal' : 'postnatal',
        dob: formData.dob,
        password: formData.password,
        language: formData.language
      }

      try {
        const response = await fetch('https://obaatanpa-backend.onrender.com/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        })

        const result = await response.json()
        if (response.ok) {
          setResponseMessage(result.message)
          setSignupEmail(formData.email)
          setShowVerificationModal(true)
        } else {
          setResponseMessage('Signup failed: ' + result.message)
          setShowResponse(true)
        }
      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error'
        setResponseMessage('Error connecting to backend: ' + errorMessage)
        setShowResponse(true)
      }
    } else if (userType === 'hospital') {
      // Handle hospital signup
      const payload = {
        name: formData.name,
        email: formData.email,
        password: formData.password
      }

      try {
        const response = await fetch('https://obaatanpa-backend.onrender.com/health_facility/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        })

        const result = await response.json()
        if (response.ok) {
          setResponseMessage(result.message)
          setSignupEmail(formData.email)
          setShowVerificationModal(true)
        } else {
          setResponseMessage('Hospital signup failed: ' + result.message)
          setShowResponse(true)
        }
      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error'
        setResponseMessage('Error connecting to backend: ' + errorMessage)
        setShowResponse(true)
      }
    } else if (userType === 'practitioner') {
      // Handle practitioner signup
      const payload = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        password: formData.password,
        hospital_name: formData.workplace
      }

      try {
        const response = await fetch('https://obaatanpa-backend.onrender.com/health_worker/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        })

        const result = await response.json()
        if (response.ok) {
          setResponseMessage(result.message)
          setSignupEmail(formData.email)
          setShowVerificationModal(true)
        } else {
          setResponseMessage('Practitioner signup failed: ' + result.message)
          setShowResponse(true)
        }
      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error'
        setResponseMessage('Error connecting to backend: ' + errorMessage)
        setShowResponse(true)
      }
    }
  }

  const handleResponseClose = () => {
    setShowResponse(false)
    if (userType === 'pregnant' || userType === 'new-mother' || userType === 'hospital' || userType === 'practitioner') {
      setShowVerificationModal(true)
    } else {
      onClose()
      if (onOpenLogin) {
        onOpenLogin()
      }
    }
  }

  const userTypes = [
    {
      id: 'pregnant' as UserType,
      label: 'Pregnant Mother',
      icon: '🤰',
      description: 'Expecting a baby',
      heroImage: '/images/auth/pregnant-mother-hero.png'
    },
    {
      id: 'new-mother' as UserType,
      label: 'New Mother',
      icon: '👶',
      description: 'Already have a baby',
      heroImage: '/images/auth/new-mother-hero.png'
    },
    {
      id: 'hospital' as UserType,
      label: 'Hospital/Clinic',
      icon: '🏥',
      description: 'Medical facility',
      heroImage: '/images/auth/hospital.jpg'
    },
    {
      id: 'practitioner' as UserType,
      label: 'Health Practitioner',
      icon: '👩‍⚕️',
      description: 'Healthcare professional',
      heroImage: '/images/auth/health-practitioner.jpg'
    }
  ]

  const currentHeroImage = userTypes.find(type => type.id === userType)?.heroImage || userTypes[0].heroImage

  const modalContent = (
    <div
      className="fixed inset-0 overflow-y-auto"
      style={{
        animation: 'fadeIn 0.3s ease-out',
        zIndex: 99999
      }}
    >
      {/* Response Popup */}
      {showResponse && (
        <div
          className="fixed inset-0 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          style={{ animation: 'fadeIn 0.3s ease-out', zIndex: 100000 }}
        >
          <div
            className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full p-6"
            style={{ animation: 'modalZoomIn 0.4s ease-out' }}
          >
            <p className="text-lg text-gray-900 dark:text-white mb-6">{responseMessage}</p>
            <button
              onClick={handleResponseClose}
              className="w-full bg-[#F59297] text-white py-2 rounded-xl font-semibold hover:bg-[#e67d82]"
            >
              Okay
            </button>
          </div>
        </div>
      )}

      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        style={{
          animation: 'fadeIn 0.3s ease-out',
          zIndex: 99998
        }}
      ></div>

      {/* Modal */}
      <div
        className="relative min-h-screen flex items-center justify-center p-4"
        style={{
          animation: 'modalSlideIn 0.4s ease-out',
          zIndex: 99999
        }}
      >
        <div
          className="relative bg-white dark:bg-gray-800 rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden transform transition-all duration-300"
          style={{
            animation: 'modalZoomIn 0.4s ease-out'
          }}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-10 h-10 bg-white dark:bg-gray-700 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
            style={{
              animation: 'fadeInScale 0.5s ease-out 0.2s both'
            }}
          >
            <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">
            {/* Left Side - Hero with Background Image */}
            <div className="relative p-8 flex flex-col justify-center overflow-hidden">
              <Image
                src={currentHeroImage}
                alt={`${userTypes.find(type => type.id === userType)?.label} - Obaatanpa community`}
                fill
                className="object-cover transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/70"></div>
              <div
                className="relative z-10"
                style={{
                  animation: 'slideInLeft 0.5s ease-out 0.15s both'
                }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-[#F59297] to-[#7da8e6] rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                  <Heart className="w-8 h-8 text-white" fill="currentColor" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 drop-shadow-lg">
                  Join Obaatanpa
                </h2>
                <p className="text-xl text-[#F59297] font-semibold mb-4 drop-shadow-lg">
                  Your Companion in Care
                </p>
                <p className="text-white/90 leading-relaxed drop-shadow-md">
                  Whether you're expecting, caring for a newborn, or here to help,
                  Obaatanpa welcomes you to a community of care and support.
                </p>
              </div>
            </div>

            {/* Right Side - Form */}
            <div
              className="p-8 overflow-y-auto max-h-[90vh]"
              style={{
                animation: 'slideInRight 0.5s ease-out 0.1s both'
              }}
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Step 1: User Type Selection */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Step 1: Choose Who You Are
                  </h3>
                  <div className="grid grid-cols-1 gap-3">
                    {userTypes.map((type) => (
                      <label
                        key={type.id}
                        className={`relative flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
                          userType === type.id
                            ? 'border-[#F59297] bg-[#F59297]/5'
                            : 'border-gray-200 dark:border-gray-600 hover:border-[#F59297]/50'
                        }`}
                      >
                        <input
                          type="radio"
                          name="userType"
                          value={type.id}
                          checked={userType === type.id}
                          onChange={(e) => setUserType(e.target.value as UserType)}
                          className="sr-only"
                        />
                        <div className="flex items-center space-x-4">
                          <div className="text-2xl">{type.icon}</div>
                          <div>
                            <p className="font-semibold text-gray-900 dark:text-white">
                              {type.label}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {type.description}
                            </p>
                          </div>
                        </div>
                        {userType === type.id && (
                          <div className="absolute top-2 right-2 w-6 h-6 bg-[#F59297] rounded-full flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          </div>
                        )}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Step 2: Form Fields */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Step 2: Your Information
                  </h3>

                  {userType === 'hospital' ? (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          🏥 Facility Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#F59297] focus:border-transparent"
                          placeholder="e.g., A.M.E Zion Clinic"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          📧 Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#F59297] focus:border-transparent"
                          placeholder="your.email@example.com"
                        />
                      </div>
                    </>
                  ) : userType === 'practitioner' ? (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            👩🏽‍🍼 First Name *
                          </label>
                          <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#F59297] focus:border-transparent"
                            placeholder="Enter your first name"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            👩🏽‍🍼 Last Name *
                          </label>
                          <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#F59297] focus:border-transparent"
                            placeholder="Enter your last name"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          📧 Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#F59297] focus:border-transparent"
                          placeholder="your.email@example.com"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          🏢 Workplace / Clinic *
                        </label>
                        <input
                          type="text"
                          name="workplace"
                          value={formData.workplace}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#F59297] focus:border-transparent"
                          placeholder="e.g., A.M.E Zion Clinic"
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            👩🏽‍🍼 First Name *
                          </label>
                          <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#F59297] focus:border-transparent"
                            placeholder="Enter your first name"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            👩🏽‍🍼 Last Name *
                          </label>
                          <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#F59297] focus:border-transparent"
                            placeholder="Enter your last name"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            📧 Email Address *
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#F59297] focus:border-transparent"
                            placeholder="your.email@example.com"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            📅 Date of Birth *
                          </label>
                          <input
                            type="date"
                            name="dob"
                            value={formData.dob}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#F59297] focus:border-transparent"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            📱 Phone Number *
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#F59297] focus:border-transparent"
                            placeholder="+233 XX XXX XXXX"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            🌐 Language *
                          </label>
                          <select
                            name="language"
                            value={formData.language}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#F59297] focus:border-transparent"
                          >
                            <option value="">Select language</option>
                            <option value="gaa">Gaa</option>
                            <option value="twi">Twi</option>
                            <option value="ewe">Ewe</option>
                            <option value="english">English</option>
                          </select>
                        </div>
                      </div>
                    </>
                  )}

                  {/* Password Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        🔐 Password *
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          name="password"
                          value={formData.password}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 pr-12 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#F59297] focus:border-transparent"
                          placeholder="Create a strong password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        🔐 Confirm Password *
                      </label>
                      <div className="relative">
                        <input
                          type={showConfirmPassword ? 'text' : 'password'}
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 pr-12 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#F59297] focus:border-transparent"
                          placeholder="Confirm your password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Terms Agreement */}
                  <div className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      id="agreeToTerms"
                      name="agreeToTerms"
                      checked={formData.agreeToTerms}
                      onChange={handleInputChange}
                      required
                      className="mt-1 w-4 h-4 text-[#F59297] border-gray-300 rounded focus:ring-[#F59297]"
                    />
                    <label htmlFor="agreeToTerms" className="text-sm text-gray-600 dark:text-gray-300">
                      I agree to the{' '}
                      <a href="/terms" className="text-[#F59297] hover:text-[#e67d82] underline">
                        Terms of Service
                      </a>{' '}
                      and{' '}
                      <a href="/privacy" className="text-[#F59297] hover:text-[#e67d82] underline">
                        Privacy Policy
                      </a>
                    </label>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={!formData.agreeToTerms}
                    className="w-full bg-gradient-to-r from-[#F59297] to-[#7da8e6] text-white py-4 rounded-xl font-semibold hover:from-[#e67d82] hover:to-[#6b9ce6] transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    🔐 Create My Account
                  </button>

                  {/* Login Link */}
                  <div className="text-center">
                    <p className="text-gray-600 dark:text-gray-400">
                      Already on Obaatanpa?{' '}
                      <button
                        type="button"
                        onClick={onClose}
                        className="text-[#F59297] hover:text-[#e67d82] font-medium underline"
                      >
                        Login Here
                      </button>
                    </p>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Verification Modal */}
      <VerificationModal
        isOpen={showVerificationModal}
        email={signupEmail}
        userType={userType}
        onClose={() => setShowVerificationModal(false)}
        onOpenLogin={onOpenLogin || (() => {})}
        practitionerData={{
          fullName: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          hospital: formData.workplace,
          hospitalId: `hospital_${formData.workplace.toLowerCase().replace(/\s+/g, '_')}`,
          practitionerType: 'General Practitioner',
          specialization: 'General',
          licenseNumber: '',
        }}
      />
    </div>
  )

  return createPortal(modalContent, document.body)
}

export default SignUpModal