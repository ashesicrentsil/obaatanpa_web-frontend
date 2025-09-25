'use client'

import { useState, useEffect } from 'react'

// Import components
import NewMotherNavbar from '@/components/dashboard/newmother/NewMotherNavbar'
import NewMotherHero from '@/components/dashboard/newmother/NewMotherHero'
import ModernNewMotherGrid from '@/components/dashboard/newmother/ModernNewMotherGrid'
import ResourcesPage from '@/components/dashboard/newmother/ResourcesPage'
import NutritionPage from '@/components/dashboard/newmother/NutritionPage'
import AppointmentsPage from '@/components/dashboard/newmother/AppointmentsPage'
import BabyHealthPage from '@/components/dashboard/newmother/BabyHealthPage'
import MotherHealthPage from '@/components/dashboard/newmother/MotherHealthPage'
import Footer from '@/components/Footer'

export default function NewMotherDashboard() {
  const [userData, setUserData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('dashboard')

  // ALL HOOKS MUST BE AT THE TOP - BEFORE ANY CONDITIONAL LOGIC
  useEffect(() => {
    // Removed AOS for better performance - using CSS animations instead

    // Get user data from localStorage
    const currentUser = localStorage.getItem('currentUser')
    if (currentUser) {
      try {
        const user = JSON.parse(currentUser)
        setUserData(user)
      } catch (error) {
        console.error('Error parsing user data:', error)
        // Redirect to login if user data is invalid
        window.location.href = '/'
      }
    } else {
      // Redirect to login if no user data
      window.location.href = '/'
    }
    setLoading(false)
  }, [])

  // Handle redirects - MUST BE BEFORE ANY CONDITIONAL RETURNS
  useEffect(() => {
    if (userData && userData.userType !== 'new-mother') {
      if (userData.userType === 'pregnant') {
        window.location.href = '/dashboard'
      } else if (userData.userType === 'practitioner') {
        window.location.href = '/practitioners/dashboard'
      } else {
        window.location.href = '/'
      }
    }
  }, [userData])

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
  }

  // Removed loading component since we're not using Suspense

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  if (!userData) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Access Denied</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">Please log in to access your dashboard.</p>
          <button
            onClick={() => window.location.href = '/'}
            className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-lg font-medium"
          >
            Go to Login
          </button>
        </div>
      </div>
    )
  }

  // Extract user information
  const {
    fullName = 'New Mother',
    babyAge = '3-6'
  } = userData

  // Don't render if not a new mother (redirect handled in useEffect above)
  if (userData && userData.userType !== 'new-mother') {
    return null
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-8">
            {/* Hero Section - Baby Overview */}
            <NewMotherHero
              babyAge={babyAge}
              babyName="Your Baby"
              weight={6.2}
              height={60}
              mood="Content"
              feedsToday={3}
            />

            {/* Modern Dashboard Grid - Replaces Weekly Highlights and Dashboard Tools */}
            <ModernNewMotherGrid
              babyAge={babyAge}
              userName={fullName.split(' ')[0] || 'Mama'}
              feedsToday={3}
              sleepHours={9}
              nextVaccine="Pentavalent (2nd Dose)"
              nextVaccineDate="Aug 3, 2025"
            />
          </main>
        )

      case 'resources':
        return (
          <main className="pt-32 pb-8">
            <ResourcesPage
              // babyAge={babyAge}
              motherName={fullName.split(' ')[0] || 'Mama'}
            />
          </main>
        )

      case 'appointments':
        return (
          <main className="pt-32 pb-8">
            <AppointmentsPage
              // babyAge={babyAge}
              motherName={fullName.split(' ')[0] || 'Mama'}
            />
          </main>
        )

      case 'nutrition':
        return (
          <main className="pt-32 pb-8">
            <NutritionPage
              babyAge={babyAge}
              // isBreastfeeding={true}
              motherName={fullName.split(' ')[0] || 'Mama'}
            />
          </main>
        )

      case 'baby-health':
        return (
          <main className="pt-32 pb-8">
            <BabyHealthPage
              babyAge={babyAge}
              motherName={fullName.split(' ')[0] || 'Mama'}
            />
          </main>
        )

      case 'mother-health':
        return (
          <main className="pt-32 pb-8">
            <MotherHealthPage
              motherName={fullName.split(' ')[0] || 'Mama'}
              postpartumWeeks={12}
            />
          </main>
        )

      case 'shop':
        return (
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Shop</h2>
              <p className="text-gray-600 dark:text-gray-300">Baby products and essentials coming soon!</p>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="bg-gray-50 dark:bg-slate-900 min-h-screen transition-colors duration-300">
      <NewMotherNavbar
        activeTab={activeTab}
        onTabChange={handleTabChange}
        userName={fullName}
        userProfilePicture="/images/dashboard/default-profile.png"
        notificationCount={2}
      />

      {/* Tab Content */}
      {renderTabContent()}

      <Footer />
    </div>
  )
}
