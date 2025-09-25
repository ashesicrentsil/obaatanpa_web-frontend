'use client'

import { useState, useEffect } from 'react'

// Import admin components
import AdminNavbar from '@/components/admin/AdminNavbar'
import AdminDashboard from '@/components/admin/AdminDashboard'
import UserManagement from '@/components/admin/UserManagement'
import HospitalManagement from '@/components/admin/HospitalManagement'
import PractitionerManagement from '@/components/admin/PractitionerManagement'
import ContentManagement from '@/components/admin/ContentManagement'
import AnalyticsPage from '@/components/admin/AnalyticsPage'
import SystemSettings from '@/components/admin/SystemSettings'
import Footer from '@/components/Footer'

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [adminUser] = useState({
    name: 'Admin User',
    email: 'admin@obaatanpa.com',
    role: 'Super Admin',
    profilePicture: '/images/admin/admin-profile.png'
  })

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-8">
            <AdminDashboard />
          </main>
        )

      case 'users':
        return (
          <main className="pt-32 pb-8">
            <UserManagement />
          </main>
        )

      case 'hospitals':
        return (
          <main className="pt-32 pb-8">
            <HospitalManagement />
          </main>
        )

      case 'practitioners':
        return (
          <main className="pt-32 pb-8">
            <PractitionerManagement />
          </main>
        )

      case 'content':
        return (
          <main className="pt-32 pb-8">
            <ContentManagement />
          </main>
        )

      case 'analytics':
        return (
          <main className="pt-32 pb-8">
            <AnalyticsPage />
          </main>
        )

      case 'settings':
        return (
          <main className="pt-32 pb-8">
            <SystemSettings />
          </main>
        )

      default:
        return null
    }
  }

  return (
    <div className="bg-gray-50 dark:bg-slate-900 min-h-screen transition-colors duration-300">
      <AdminNavbar
        activeTab={activeTab}
        onTabChange={handleTabChange}
        adminUser={adminUser}
        notificationCount={5}
      />

      {/* Tab Content */}
      {renderTabContent()}

      <Footer />
    </div>
  )
}

export default AdminPage
