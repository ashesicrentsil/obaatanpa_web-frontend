'use client'

import { useState } from 'react'
import { CheckCircle, XCircle, AlertTriangle, Loader } from 'lucide-react'

interface HospitalVerificationProps {
  hospitalName: string
  region: string
  onVerificationComplete: (isVerified: boolean, message: string) => void
}

const HospitalVerification = ({
  hospitalName,
  region,
  onVerificationComplete
}: HospitalVerificationProps) => {
  const [isVerifying, setIsVerifying] = useState(false)
  const [verificationResult, setVerificationResult] = useState<{
    status: 'pending' | 'verified' | 'rejected' | 'error'
    message: string
  } | null>(null)

  // Mock verified hospitals database (in real app, this would be an API call)
  const verifiedHospitals = [
    { name: 'Korle Bu Teaching Hospital', region: 'greater-accra' },
    { name: 'Komfo Anokye Teaching Hospital', region: 'ashanti' },
    { name: 'Ridge Hospital', region: 'greater-accra' },
    { name: '37 Military Hospital', region: 'greater-accra' },
    { name: 'Tamale Teaching Hospital', region: 'northern' },
    { name: 'Cape Coast Teaching Hospital', region: 'central' },
    { name: 'Ho Teaching Hospital', region: 'volta' },
    { name: 'Sunyani Regional Hospital', region: 'brong-ahafo' },
    { name: 'Effia Nkwanta Regional Hospital', region: 'western' },
    { name: 'Eastern Regional Hospital', region: 'eastern' },
    { name: 'Upper East Regional Hospital', region: 'upper-east' },
    { name: 'Upper West Regional Hospital', region: 'upper-west' },
    { name: 'Lekma Hospital', region: 'greater-accra' },
    { name: 'Trust Hospital', region: 'greater-accra' },
    { name: 'Nyaho Medical Centre', region: 'greater-accra' }
  ]

  const verifyHospital = async () => {
    setIsVerifying(true)
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000))

    // Check if hospital exists in verified database
    const isVerified = verifiedHospitals.some(hospital =>
      hospital.name.toLowerCase().includes(hospitalName.toLowerCase()) &&
      hospital.region === region
    )

    let result
    if (isVerified) {
      result = {
        status: 'verified' as const,
        message: 'Hospital verified successfully! You can proceed to create your dashboard.'
      }
    } else {
      // Check if hospital name exists but with wrong details
      const nameExists = verifiedHospitals.some(hospital => 
        hospital.name.toLowerCase().includes(hospitalName.toLowerCase())
      )
      
      if (nameExists) {
        result = {
          status: 'rejected' as const,
          message: 'Hospital found but region does not match our records. Please verify your details.'
        }
      } else {
        result = {
          status: 'rejected' as const,
          message: 'This hospital does not appear in the list of registered medical institutions in Ghana. Please contact Obaatanpa support.'
        }
      }
    }

    setVerificationResult(result)
    setIsVerifying(false)
    onVerificationComplete(result.status === 'verified', result.message)
  }

  const getStatusIcon = () => {
    if (isVerifying) return <Loader className="w-8 h-8 text-blue-500 animate-spin" />
    if (!verificationResult) return <AlertTriangle className="w-8 h-8 text-yellow-500" />
    
    switch (verificationResult.status) {
      case 'verified':
        return <CheckCircle className="w-8 h-8 text-green-500" />
      case 'rejected':
        return <XCircle className="w-8 h-8 text-red-500" />
      default:
        return <AlertTriangle className="w-8 h-8 text-yellow-500" />
    }
  }

  const getStatusColor = () => {
    if (isVerifying) return 'border-blue-200 bg-blue-50'
    if (!verificationResult) return 'border-yellow-200 bg-yellow-50'
    
    switch (verificationResult.status) {
      case 'verified':
        return 'border-green-200 bg-green-50'
      case 'rejected':
        return 'border-red-200 bg-red-50'
      default:
        return 'border-yellow-200 bg-yellow-50'
    }
  }

  return (
    <div className={`border-2 rounded-2xl p-6 transition-all duration-300 ${getStatusColor()}`}>
      <div className="text-center">
        <div className="flex justify-center mb-4">
          {getStatusIcon()}
        </div>
        
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          {isVerifying ? 'Verifying Hospital...' : 'Hospital Verification'}
        </h3>
        
        {!verificationResult && !isVerifying && (
          <>
            <p className="text-gray-600 mb-6">
              We need to verify that your hospital is registered with Ghana Health Service before you can proceed.
            </p>
            <div className="bg-white rounded-lg p-4 mb-6 text-left">
              <h4 className="font-semibold text-gray-900 mb-2">Hospital Details:</h4>
              <div className="space-y-1 text-sm text-gray-600">
                <p><strong>Name:</strong> {hospitalName}</p>
                <p><strong>Region:</strong> {region.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</p>
              </div>
            </div>
            <button
              onClick={verifyHospital}
              className="bg-[#F59297] hover:bg-[#e67d82] text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200"
            >
              Verify Hospital
            </button>
          </>
        )}
        
        {isVerifying && (
          <p className="text-gray-600">
            Checking hospital registration with Ghana Health Service database...
          </p>
        )}
        
        {verificationResult && (
          <>
            <p className={`mb-6 ${
              verificationResult.status === 'verified' 
                ? 'text-green-700' 
                : 'text-red-700'
            }`}>
              {verificationResult.message}
            </p>
            
            {verificationResult.status === 'rejected' && (
              <div className="bg-white rounded-lg p-4 text-left">
                <h4 className="font-semibold text-gray-900 mb-2">Need Help?</h4>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>• Double-check your hospital name spelling</p>

                  <p>• Ensure you selected the correct region</p>
                  <p>• Contact support at <a href="mailto:admin@obaatanpa.com" className="text-[#F59297] hover:underline">admin@obaatanpa.com</a></p>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default HospitalVerification
