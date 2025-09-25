'use client'

import { useState } from 'react'
import NewMotherNavbar from '@/components/dashboard/newmother/NewMotherNavbar'
import NutritionPage from '@/components/dashboard/newmother/NutritionPage'

export default function NewMotherNutritionPage() {
  const [activeTab, setActiveTab] = useState('nutrition')

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
        <NutritionPage />
      </div>
    </div>
  )
}
