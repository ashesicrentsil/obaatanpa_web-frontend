'use client'

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'
import { X, Eye, EyeOff, LogIn, Shield } from 'lucide-react'

// Add CSS animations
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

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
  onOpenSignUp?: () => void
}

type UserType = 'pregnant' | 'new-mother' | 'practitioner' | 'hospital' | 'admin'

const LoginModal = ({ isOpen, onClose, onOpenSignUp }: LoginModalProps) => {
  const [userType, setUserType] = useState<UserType>('pregnant')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [showResponse, setShowResponse] = useState(false)
  const [responseMessage, setResponseMessage] = useState('')
  const [isAdminLogin, setIsAdminLogin] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  })
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    general: ''
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!isOpen || !mounted) return null

  // Inject CSS animations
  if (typeof document !== 'undefined' && !document.getElementById('login-modal-styles')) {
    const style = document.createElement('style')
    style.id = 'login-modal-styles'
    style.textContent = modalStyles
    document.head.appendChild(style)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
    
    // Clear errors when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleAdminAccessClick = () => {
    setIsAdminLogin(true)
    setUserType('admin')
    setFormData({ email: '', password: '', rememberMe: false })
    setErrors({ email: '', password: '', general: '' })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setErrors({ email: '', password: '', general: '' })

    // Basic validation
    const newErrors = { email: '', password: '', general: '' }

    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }

    if (!formData.password) {
      newErrors.password = 'Password is required'
    }

    if (newErrors.email || newErrors.password) {
      setErrors(newErrors)
      setIsLoading(false)
      return
    }

    // Determine login endpoint based on user type
    const loginEndpoint = 
      isAdminLogin ? 'https://obaatanpa-backend.onrender.com/admin/login' :
      userType === 'hospital' ? 'https://obaatanpa-backend.onrender.com/health_facility/login' :
      userType === 'practitioner' ? 'https://obaatanpa-backend.onrender.com/health_worker/login' :
      'https://obaatanpa-backend.onrender.com/login'

    // Authenticate user with backend
    try {
      const response = await fetch(loginEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        }),
      })

      const result = await response.json()
      if (response.ok) {
        // Store token and other data in localStorage
        localStorage.setItem('authToken', result.token)
        const userData: {
          email: string
          userType: UserType
          isAuthenticated: boolean
          loginDate: string
          hospital_id?: number
          hospital_name?: string
          practitioner_id?: number
          fullName?: string
          practitionerType?: string
          specialization?: string
          licenseNumber?: string
          hospital?: string
          hospitalId?: string
          verificationStatus?: 'pending' | 'approved' | 'rejected'
          profilePicture?: string
          phoneNumber?: string
          yearsOfExperience?: number
          qualifications?: string[]
          firstName?: string
          lastName?: string
          id?: number
        } = {
          email: formData.email,
          userType,
          isAuthenticated: true,
          loginDate: new Date().toISOString()
        }

        if (isAdminLogin) {
          if (result.id) userData.id = result.id
        } else if (userType === 'hospital') {
          if (result.hospital_id) userData.hospital_id = result.hospital_id
          if (result.hospital_name) userData.hospital_name = result.hospital_name
        } else if (userType === 'practitioner') {
          if (result.id) userData.practitioner_id = result.id
          userData.fullName = result.fullName || 'Health Practitioner'
          userData.practitionerType = result.practitionerType || 'Doctor'
          userData.specialization = result.specialization || 'General Practice'
          userData.licenseNumber = result.licenseNumber || ''
          userData.hospital = result.hospital || 'Unknown Hospital'
          userData.hospitalId = result.hospitalId || ''
          userData.verificationStatus = result.verificationStatus || 'pending'
          userData.profilePicture = result.profilePicture || ''
          userData.phoneNumber = result.phoneNumber || ''
          userData.yearsOfExperience = result.yearsOfExperience || 0
          userData.qualifications = result.qualifications || []
        } else {
          localStorage.setItem('care_type', result.care_type)
          localStorage.setItem('language', result.language)
          userData.firstName = result.firstName || ''
          userData.lastName = result.lastName || ''
        }
        localStorage.setItem('currentUser', JSON.stringify(userData))

        // Set response message for popup
        setResponseMessage(result.message)
        setShowResponse(true)
      } else {
        setErrors({ ...errors, general: result.message || 'Login failed. Please try again.' })
        setIsLoading(false)
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      setErrors({ ...errors, general: 'Error connecting to backend: ' + errorMessage })
      setIsLoading(false)
    }
  }

  const handleResponseClose = () => {
    setShowResponse(false)
    setIsLoading(false)
    setIsAdminLogin(false)
    setFormData({ email: '', password: '', rememberMe: false })
    onClose()

    // Redirect based on user type
    let redirectUrl = '/dashboard'
    if (isAdminLogin) {
      redirectUrl = '/admin'
    } else if (userType === 'hospital') {
      redirectUrl = '/hospital/dashboard'
    } else if (userType === 'practitioner') {
      redirectUrl = '/dashboard/practitioner'
    } else if (userType === 'pregnant') {
      redirectUrl = '/dashboard'
    } else if (userType === 'new-mother') {
      redirectUrl = '/dashboard/new-mother'
    }
    window.location.href = redirectUrl
  }

  const userTypes = [
    {
      id: 'pregnant' as UserType,
      label: 'Pregnant Mother',
      icon: '🤰',
      heroImage: '/images/auth/pregnant-mother-hero.png'
    },
    {
      id: 'new-mother' as UserType,
      label: 'New Mother',
      icon: '👶',
      heroImage: '/images/auth/new-mother-hero.png'
    },
    {
      id: 'hospital' as UserType,
      label: 'Hospital/Clinic',
      icon: '🏥',
      heroImage: '/images/auth/hospital.png'
    },
    {
      id: 'practitioner' as UserType,
      label: 'Health Practitioner',
      icon: '👩‍⚕️',
      heroImage: '/images/auth/health-practitioner.jpg'
    }
  ]

  const currentHeroImage = userTypes.find(type => type.id === userType)?.heroImage || userTypes[0].heroImage

  const handleSignUpClick = () => {
    onClose()
    if (onOpenSignUp) {
      onOpenSignUp()
    }
  }

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
              {/* Background Image */}
              <Image
                src={currentHeroImage}
                alt={`${userTypes.find(type => type.id === userType)?.label} - Welcome back to Obaatanpa`}
                fill
                className="object-cover transition-all duration-500"
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/70"></div>
              
              {/* Content */}
              <div
                className="relative z-10"
                style={{
                  animation: 'slideInLeft 0.5s ease-out 0.15s both'
                }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-[#F59297] to-[#7da8e6] rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                  <LogIn className="w-8 h-8 text-white" />
                </div>
                
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 drop-shadow-lg">
                  Welcome back to Obaatanpa 👋🏽
                </h2>
                <p className="text-xl text-[#F59297] font-semibold mb-4 drop-shadow-lg">
                  Your care journey continues here.
                </p>
                <p className="text-white/90 leading-relaxed drop-shadow-md">
                  Sign in to access your personalized dashboard, track your progress, 
                  and continue receiving the care and support you deserve.
                </p>
              </div>
            </div>

            {/* Right Side - Login Form */}
            <div
              className="p-8 overflow-y-auto max-h-[90vh]"
              style={{
                animation: 'slideInRight 0.5s ease-out 0.1s both'
              }}
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* User Type Selection */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    I am a:
                  </h3>
                  <div className="grid grid-cols-1 gap-3">
                    {userTypes.map((type) => (
                      <label
                        key={type.id}
                        className={`relative flex items-center p-3 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
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
                          onChange={(e) => {
                            setUserType(e.target.value as UserType)
                            setIsAdminLogin(false)
                            setFormData({ email: '', password: '', rememberMe: false })
                          }}
                          className="sr-only"
                        />
                        <div className="flex items-center space-x-3">
                          <div className="text-xl">{type.icon}</div>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {type.label}
                          </p>
                        </div>
                        {userType === type.id && (
                          <div className="absolute top-2 right-2 w-5 h-5 bg-[#F59297] rounded-full flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          </div>
                        )}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Login Fields */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Sign In
                  </h3>
                  
                  {/* General Error */}
                  {errors.general && (
                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-3">
                      <p className="text-red-600 dark:text-red-400 text-sm">{errors.general}</p>
                    </div>
                  )}

                  {/* Email Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      📧 Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#F59297] focus:border-transparent transition-colors duration-200 ${
                        errors.email ? 'border-red-300 dark:border-red-600' : 'border-gray-300 dark:border-gray-600'
                      }`}
                      placeholder="Enter your email address"
                    />
                    {errors.email && (
                      <p className="text-red-600 dark:text-red-400 text-sm mt-1">{errors.email}</p>
                    )}
                  </div>

                  {/* Password Field */}
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
                        className={`w-full px-4 py-3 pr-12 border rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#F59297] focus:border-transparent transition-colors duration-200 ${
                          errors.password ? 'border-red-300 dark:border-red-600' : 'border-gray-300 dark:border-gray-600'
                        }`}
                        placeholder="Enter your password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="text-red-600 dark:text-red-400 text-sm mt-1">{errors.password}</p>
                    )}
                  </div>

                  {/* Remember Me & Forgot Password */}
                  <div className="flex items-center justify-between">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="rememberMe"
                        checked={formData.rememberMe}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-[#F59297] border-gray-300 rounded focus:ring-[#F59297]"
                      />
                      <span className="ml-2 text-sm text-gray-600 dark:text-gray-300">Remember Me</span>
                    </label>
                    <button
                      type="button"
                      className="text-sm text-[#F59297] hover:text-[#e67d82] font-medium"
                    >
                      Forgot Password?
                    </button>
                  </div>

                  {/* Login Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-[#F59297] to-[#7da8e6] text-white py-4 rounded-xl font-semibold hover:from-[#e67d82] hover:to-[#6b9ce6] transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Logging in...
                      </>
                    ) : (
                      <>
                        <LogIn className="w-5 h-5 mr-2" />
                        Log In
                      </>
                    )}
                  </button>

                  {/* Sign Up Links */}
                  <div className="text-center space-y-2">
                    {userType === 'practitioner' ? (
                      <p className="text-gray-600 dark:text-gray-400">
                        Need to join as a health expert?{' '}
                        <button
                          type="button"
                          onClick={handleSignUpClick}
                          className="text-[#F59297] hover:text-[#e67d82] font-medium underline"
                        >
                          Register as a Practitioner
                        </button>
                      </p>
                    ) : (
                      <p className="text-gray-600 dark:text-gray-400">
                        New to Obaatanpa?{' '}
                        <button
                          type="button"
                          onClick={handleSignUpClick}
                          className="text-[#F59297] hover:text-[#e67d82] font-medium underline"
                        >
                          Create an Account
                        </button>
                      </p>
                    )}
                  </div>

                  {/* Security Notice */}
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 border border-gray-200 dark:border-gray-600">
                    <div className="flex items-start space-x-3">
                      <Shield className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                          🔒 Your login is safe and protected
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          Contact us if you need help:{' '}
                          <a href="mailto:obaatanpa.maternity@gmail.com" className="text-[#F59297] hover:text-[#e67d82]">
                            📧 obaatanpa.maternity@gmail.com
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Admin Access Link */}
                  <div className="text-center">
                    <button
                      type="button"
                      onClick={handleAdminAccessClick}
                      className="text-sm text-[#F59297] hover:text-[#e67d82] font-medium underline"
                    >
                      Admin Access
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  return createPortal(modalContent, document.body)
}

export default LoginModal