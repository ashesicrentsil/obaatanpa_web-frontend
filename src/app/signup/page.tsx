'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import SignUpModal from '@/components/auth/SignUpModal'

export default function SignUpPage() {
  const router = useRouter()
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(true)

  const handleCloseModal = () => {
    setIsSignUpModalOpen(false)
    router.push('/')
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Join Obaatanpa Today
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Start your journey with personalized maternal care, expert guidance, and a supportive community.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-[#F59297] to-[#7da8e6] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">👶</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Personalized Care
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Get care plans tailored to your pregnancy stage and needs
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-[#F59297] to-[#7da8e6] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🩺</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Expert Support
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Connect with qualified midwives and healthcare professionals
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-[#F59297] to-[#7da8e6] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💚</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Community Support
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Join a community of mothers sharing similar experiences
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      
      {/* Sign Up Modal */}
      <SignUpModal 
        isOpen={isSignUpModalOpen} 
        onClose={handleCloseModal}
      />
    </div>
  )
}
