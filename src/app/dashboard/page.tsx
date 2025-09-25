'use client'

import { useState, useEffect } from 'react'

// Import dashboard components
import PregnantMotherNavbar from '@/components/dashboard/pregnant/PregnantMotherNavbar'
import PregnantAppointmentsPage from '@/components/dashboard/pregnant/PregnantAppointmentsPage'
import HeroSection from '@/components/dashboard/HeroSection'
import QuickOverview from '@/components/dashboard/QuickOverview'
import ModernDashboardGrid from '@/components/dashboard/ModernDashboardGrid'
import ModernCareSection from '@/components/dashboard/ModernCareSection'
import PregnantResourcesPage from '@/components/dashboard/pregnant/PregnantResourcesPage'
import PregnantNutritionPage from '@/components/dashboard/pregnant/PregnantNutritionPage'
import EmergencyModal from '@/components/dashboard/EmergencyModal'
import PregnancyWeekCalculator from '@/components/auth/PregnancyWeekCalculator'
import Footer from '@/components/Footer'

const PregnantMotherDashboard = () => {
  const [user, setUser] = useState({
    name: 'User',
    trimester: 'second' as 'first' | 'second' | 'third',
    week: 18,
    location: 'Accra, Ghana',
    userType: 'pregnant' as 'pregnant' | 'new-mother' | 'hospital',
    profilePicture: '',
    pregnancyWeek: null as number | null,
    dueDate: null as string | null,
    lastMenstrualPeriod: null as string | null
  })
  const [isLoading, setIsLoading] = useState(true)
  const [showEmergencyModal, setShowEmergencyModal] = useState(false)
  const [showPregnancyCalculator, setShowPregnancyCalculator] = useState(false)
  const [activeTab, setActiveTab] = useState('dashboard')

  // Calculate trimester from pregnancy week
  const getTrimesterFromWeek = (week: number): 'first' | 'second' | 'third' => {
    if (week <= 13) return 'first'
    if (week <= 27) return 'second'
    return 'third'
  }

  // Load user data from localStorage on component mount
  useEffect(() => {
    const currentUserData = localStorage.getItem('currentUser')

    if (currentUserData) {
      const userData = JSON.parse(currentUserData)
      console.log('Dashboard - Loaded user data:', userData)
      console.log('Dashboard - Full name from userData:', userData.fullName)

      // Check if user has pregnancy week data
      if (userData.pregnancyWeek) {
        // User has already set up pregnancy tracking
        const currentWeek = userData.pregnancyWeek
        const trimester = getTrimesterFromWeek(currentWeek)

        setUser({
          name: userData.fullName || 'User',
          trimester,
          week: currentWeek,
          location: userData.location || 'Ghana',
          userType: userData.userType || 'pregnant',
          profilePicture: userData.profilePicture || '',
          pregnancyWeek: currentWeek,
          dueDate: userData.dueDate || null,
          lastMenstrualPeriod: userData.lastMenstrualPeriod || null
        })
      } else {
        // First-time user - show pregnancy calculator
        setUser({
          name: userData.fullName || 'User',
          trimester: 'second', // Default until calculated
          week: 18, // Default until calculated
          location: userData.location || 'Ghana',
          userType: userData.userType || 'pregnant',
          profilePicture: userData.profilePicture || '',
          pregnancyWeek: null,
          dueDate: null,
          lastMenstrualPeriod: null
        })
        setShowPregnancyCalculator(true)
      }
    } else {
      // Redirect to login if no user data found
      window.location.href = '/'
    }

    setIsLoading(false)
  }, [])

  // Handle pregnancy week calculation completion
  const handlePregnancyCalculationComplete = (pregnancyData: any) => {
    const { pregnancyWeek, trimester, dueDate, lastMenstrualPeriod, calculationMethod } = pregnancyData

    // Update user state
    setUser(prev => ({
      ...prev,
      pregnancyWeek,
      trimester,
      week: pregnancyWeek,
      dueDate,
      lastMenstrualPeriod
    }))

    // Update localStorage
    const currentUserData = localStorage.getItem('currentUser')
    if (currentUserData) {
      const userData = JSON.parse(currentUserData)
      const updatedUserData = {
        ...userData,
        pregnancyWeek,
        trimester,
        dueDate,
        lastMenstrualPeriod,
        calculationMethod,
        pregnancySetupComplete: true
      }
      localStorage.setItem('currentUser', JSON.stringify(updatedUserData))
    }

    setShowPregnancyCalculator(false)
  }

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
  }

  const getTrimesterData = () => {
    const trimesterMap = {
      first: {
        emoji: '🌱',
        title: 'First Trimester',
        focus: 'What to eat/avoid, Morning sickness help, Early scans',
        babySize: 'lime',
        development: 'Brain and spinal cord are forming, heart begins to beat',
        nutritionTip: 'Focus on folic acid and avoiding harmful foods. Take prenatal vitamins daily.',
        exerciseTip: 'Gentle walks and light stretching - avoid high-impact activities',
        articles: [
          { title: 'Managing Morning Sickness', time: '3 min read', category: 'Symptoms' },
          { title: 'Foods to Avoid in Early Pregnancy', time: '2 min read', category: 'Nutrition' },
          { title: 'Early Warning Signs to Monitor', time: '4 min read', category: 'Health' }
        ],
        tools: [
          { icon: 'Calculator', title: 'Due Date Calculator', description: 'Estimate baby\'s due date', color: 'blue' },
          { icon: 'TestTube', title: 'Gender Predictor', description: 'Fun prediction tool', color: 'pink' }
        ]
      },
      second: {
        emoji: '🌸',
        title: 'Second Trimester',
        focus: 'Mental well-being, Ultrasound prep, Safe exercises',
        babySize: 'mango',
        development: 'Baby can hear sounds, developing reflexes, and you may feel first kicks',
        nutritionTip: 'Your iron needs are rising. Try spinach, beans, and eggs today.',
        exerciseTip: 'Swimming and prenatal yoga are great options - stay active safely',
        articles: [
          { title: 'Preparing for Your Anatomy Scan', time: '3 min read', category: 'Medical' },
          { title: 'Safe Sleeping Positions', time: '2 min read', category: 'Comfort' },
          { title: 'Bonding with Your Baby', time: '5 min read', category: 'Emotional' }
        ],
        tools: [
          { icon: 'Calculator', title: 'Due Date Calculator', description: 'Estimate baby\'s due date', color: 'blue' },
          { icon: 'ShoppingCart', title: 'Baby Registry', description: 'Start your baby registry', color: 'green' }
        ]
      },
      third: {
        emoji: '🌺',
        title: 'Third Trimester',
        focus: 'Hospital bag, Birth plan, Labor signs, Rest & comfort',
        babySize: 'watermelon',
        development: 'Baby is gaining weight rapidly, lungs are maturing for birth',
        nutritionTip: 'Focus on calcium and protein for final growth. Stay hydrated.',
        exerciseTip: 'Gentle stretching and breathing exercises - prepare for labor',
        articles: [
          { title: 'Hospital Bag Checklist', time: '4 min read', category: 'Preparation' },
          { title: 'What Contractions Feel Like', time: '3 min read', category: 'Labor' },
          { title: 'Creating Your Birth Plan', time: '6 min read', category: 'Planning' }
        ],
        tools: [
          { icon: 'ClipboardList', title: 'Hospital Bag Checklist', description: 'Pack your hospital bag', color: 'green' },
          { icon: 'Baby', title: 'Birth Plan', description: 'Plan your ideal birth', color: 'purple' }
        ]
      }
    }
    return trimesterMap[user.trimester]
  }

  const renderTabContent = () => {
    const trimesterData = getTrimesterData()

    switch (activeTab) {
      case 'dashboard':
        return (
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-8">
            {/* Hero Section */}
            <HeroSection
              userName={user.name.split(' ')[0] || 'User'}
              trimesterData={trimesterData}
              week={user.week}
            />

            {/* Quick Overview */}
            <QuickOverview
              trimesterData={trimesterData}
            />

            {/* Modern Dashboard Grid - Replaces Tools, Baby Development, and Community Chat */}
            <ModernDashboardGrid
              trimesterData={trimesterData}
              week={user.week}
              userName={user.name.split(' ')[0] || 'User'}
            />

            {/* Modern Care Section - Replaces Articles, Nutrition, Emergency, Checklist, and Wellness */}
            <ModernCareSection
              trimesterData={trimesterData}
              emergencyInfo="Emergency contact information"
            />
          </main>
        )

      case 'appointments':
        return (
          <main className="pt-32 pb-8">
            <PregnantAppointmentsPage
              pregnancyWeek={user.pregnancyWeek || user.week}
              trimester={user.trimester}
              motherName={user.name.split(' ')[0] || 'Mama'}
            />
          </main>
        )

      case 'resources':
        return (
          <main className="pt-32 pb-8">
            <PregnantResourcesPage
              pregnancyWeek={user.pregnancyWeek || user.week}
              trimester={user.trimester}
              motherName={user.name.split(' ')[0] || 'Mama'}
            />
          </main>
        )

      case 'nutrition':
        return (
          <main className="pt-32 pb-8">
            <PregnantNutritionPage
              pregnancyWeek={user.pregnancyWeek || user.week}
              trimester={user.trimester}
              motherName={user.name.split(' ')[0] || 'Mama'}
            />
          </main>
        )

      case 'pregnancy-health':
        return (
          <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Pregnancy Health</h2>
              <p className="text-gray-600 dark:text-gray-300">Prenatal care and wellness information.</p>
            </div>
          </main>
        )

      case 'baby-development':
        return (
          <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Baby Development</h2>
              <p className="text-gray-600 dark:text-gray-300">Track your baby's growth and development.</p>
            </div>
          </main>
        )

      case 'shop':
        return (
          <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Shop</h2>
              <p className="text-gray-600 dark:text-gray-300">Pregnancy and baby products coming soon!</p>
            </div>
          </main>
        )

      default:
        return null
    }
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

  return (
    <div className="bg-gray-50 dark:bg-slate-900 min-h-screen transition-colors duration-300">
      <PregnantMotherNavbar
        activeTab={activeTab}
        onTabChange={handleTabChange}
        // userName={user.name}
        userProfilePicture={user.profilePicture}
        notificationCount={2}
      />

      {/* Pregnancy Week Calculator Modal */}
      {showPregnancyCalculator && (
        <PregnancyWeekCalculator
          isOpen={showPregnancyCalculator}
          onClose={() => setShowPregnancyCalculator(false)}
          onComplete={handlePregnancyCalculationComplete}
        />
      )}

      {/* Emergency Modal */}
      <EmergencyModal
        isOpen={showEmergencyModal}
        onClose={() => setShowEmergencyModal(false)}
      />

      {/* Tab Content */}
      {renderTabContent()}

      <Footer />
    </div>
  )
}

export default PregnantMotherDashboard
