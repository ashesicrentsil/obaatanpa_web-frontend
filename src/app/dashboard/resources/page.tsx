'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import PregnantMotherNavbar from '@/components/dashboard/pregnant/PregnantMotherNavbar'
import PregnantResourcesPage from '@/components/dashboard/pregnant/PregnantResourcesPage'
import Footer from '@/components/Footer'

interface UserData {
  fullName: string
  userType: string
  pregnancyWeek?: number
  trimester?: 'first' | 'second' | 'third'
  dueDate?: string
  lastMenstrualPeriod?: string
}

const ResourcesPage = () => {
  const router = useRouter()
  const [user, setUser] = useState<{
    name: string
    trimester: 'first' | 'second' | 'third'
    week: number
    location: string
    userType: string
    profilePicture: string
    pregnancyWeek: number | null
    dueDate: string | null
    lastMenstrualPeriod: string | null
  } | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('resources') // Added for navbar

  // Calculate trimester and week from pregnancy data
  const calculatePregnancyDetails = (userData: UserData) => {
    let currentWeek = 20 // Default
    let trimester: 'first' | 'second' | 'third' = 'second'

    // If we have pregnancy week from user data
    if (userData.pregnancyWeek) {
      currentWeek = userData.pregnancyWeek
    } else if (userData.dueDate) {
      // Calculate from due date
      const due = new Date(userData.dueDate)
      const now = new Date()
      const diffTime = due.getTime() - now.getTime()
      const diffWeeks = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 7))
      currentWeek = Math.max(1, Math.min(40, 40 - diffWeeks))
    } else if (userData.lastMenstrualPeriod) {
      // Calculate from LMP
      const lmp = new Date(userData.lastMenstrualPeriod)
      const now = new Date()
      const diffTime = now.getTime() - lmp.getTime()
      const diffWeeks = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 7))
      currentWeek = Math.max(1, Math.min(40, diffWeeks))
    }

    // Determine trimester
    if (currentWeek <= 13) {
      trimester = 'first'
    } else if (currentWeek <= 27) {
      trimester = 'second'
    } else {
      trimester = 'third'
    }

    return { currentWeek, trimester }
  }

  useEffect(() => {
    // Get user data from localStorage
    const userData = localStorage.getItem('currentUser')

    if (!userData) {
      router.push('/login')
      return
    }

    try {
      const parsedData: UserData = JSON.parse(userData)

      // Check if user is pregnant mother
      if (parsedData.userType !== 'pregnant') {
        router.push('/dashboard')
        return
      }

      const { currentWeek, trimester } = calculatePregnancyDetails(parsedData)

      setUser({
        name: parsedData.fullName || 'User',
        trimester,
        week: currentWeek,
        location: 'Ghana',
        userType: parsedData.userType || 'pregnant',
        profilePicture: '',
        pregnancyWeek: currentWeek,
        dueDate: parsedData.dueDate || null,
        lastMenstrualPeriod: parsedData.lastMenstrualPeriod || null,
      })
    } catch (error) {
      console.error('Error parsing user data:', error)
      router.push('/login')
    } finally {
      setLoading(false)
    }
  }, [router])

  // Handle navbar tab changes
  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
    router.push(`/dashboard/${tab}`)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#F59297] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading your resources...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Navigation */}
      <PregnantMotherNavbar
        activeTab={activeTab}
        onTabChange={handleTabChange}
        userName={user.name}
        userLocation={user.location}
        userProfilePicture={user.profilePicture} // Changed from profilePicture
        notificationCount={0} // Adjust as needed
      />

      {/* Resources Content */}
      <PregnantResourcesPage
        pregnancyWeek={user.week}
        trimester={user.trimester}
        motherName={user.name.split(' ')[0] || 'Mama'}
      />

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default ResourcesPage