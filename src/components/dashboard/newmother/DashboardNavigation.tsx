'use client'

import { useState } from 'react'
import { Home, Utensils, Baby, Heart, Users, Calendar } from 'lucide-react'

interface DashboardNavigationProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

const DashboardNavigation = ({ activeTab, onTabChange }: DashboardNavigationProps) => {
  const tabs = [
    {
      id: 'overview',
      label: 'Overview',
      icon: Home,
      description: 'Dashboard home'
    },
    {
      id: 'nutrition',
      label: 'Nutrition',
      icon: Utensils,
      description: 'Meal plans & recipes'
    },
    {
      id: 'baby-care',
      label: 'Baby Care',
      icon: Baby,
      description: 'Feeding & development'
    },
    {
      id: 'health',
      label: 'Health',
      icon: Heart,
      description: 'Vaccinations & checkups'
    },
    {
      id: 'community',
      label: 'Community',
      icon: Users,
      description: 'Connect with mothers'
    },
    {
      id: 'appointments',
      label: 'Appointments',
      icon: Calendar,
      description: 'Schedule visits'
    }
  ]

  return (
    <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-16 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors duration-200 whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-[#F59297] text-[#F59297]'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <div className="flex items-center justify-between py-3">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              {tabs.find(tab => tab.id === activeTab)?.label || 'Dashboard'}
            </h2>
            <div className="relative">
              <select
                value={activeTab}
                onChange={(e) => onTabChange(e.target.value)}
                className="appearance-none bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 pr-8 text-sm font-medium text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#F59297] focus:border-transparent"
              >
                {tabs.map((tab) => (
                  <option key={tab.id} value={tab.id}>
                    {tab.label}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Tab Bar - Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 z-50">
        <div className="grid grid-cols-6 gap-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center justify-center py-2 px-1 transition-colors duration-200 ${
                activeTab === tab.id
                  ? 'text-[#F59297]'
                  : 'text-gray-500 dark:text-gray-400'
              }`}
            >
              <tab.icon className="w-5 h-5 mb-1" />
              <span className="text-xs font-medium truncate">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default DashboardNavigation
