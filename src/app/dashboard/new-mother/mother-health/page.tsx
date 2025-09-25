'use client'

import { useState } from 'react'
import NewMotherNavbar from '@/components/dashboard/newmother/NewMotherNavbar'
import MotherHealthPage from '@/components/dashboard/newmother/MotherHealthPage'

export default function NewMotherMotherHealthPage() {
  const [activeTab, setActiveTab] = useState('mother-health')

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <NewMotherNavbar 
        activeTab={activeTab}
        onTabChange={setActiveTab}
        userName="Sarah Johnson"
        userProfilePicture="/images/profiles/new-mother-1.jpg"
        notificationCount={3}
      />
      
      <div className="pt-32">
        <MotherHealthPage />
      </div>
    </div>
  )
}
