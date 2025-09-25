'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Bell, User, LogOut, AlertCircle, Moon, Sun } from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'

interface DashboardHeaderProps {
  userName: string
  userProfilePicture?: string
  onEmergencyClick: () => void
}

const DashboardHeader = ({ userName, userProfilePicture, onEmergencyClick }: DashboardHeaderProps) => {
  const [showUserMenu, setShowUserMenu] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const pathname = usePathname()

  const handleLogout = () => {
    localStorage.removeItem('currentUser')
    window.location.href = '/'
  }

  // Check if the current path matches the given path
  const isActive = (path: string) => {
    if (path === '/dashboard') {
      return pathname === '/dashboard'
    }
    return pathname?.startsWith(path)
  }

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm shadow-sm border-b border-gray-200 dark:border-gray-700"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Image
              src="/images/icons/maternity-logo.png"
              alt="Obaatanpa"
              width={40}
              height={40}
              className="rounded-lg"
            />
            <span className="ml-3 text-xl font-bold text-gray-900 dark:text-white">Obaatanpa</span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/dashboard"
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                isActive('/dashboard')
                  ? 'text-[#F59297] font-semibold'
                  : 'text-gray-600 dark:text-gray-300 hover:text-[#F59297] hover:bg-pink-50 dark:hover:bg-pink-900/20'
              }`}
            >
              Dashboard
            </Link>
            <Link
              href="/resources"
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                isActive('/resources')
                  ? 'text-[#F59297] font-semibold'
                  : 'text-gray-600 dark:text-gray-300 hover:text-[#F59297] hover:bg-pink-50 dark:hover:bg-pink-900/20'
              }`}
            >
              Resources
            </Link>
            <Link
              href="/appointments"
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                isActive('/appointments')
                  ? 'text-[#F59297] font-semibold'
                  : 'text-gray-600 dark:text-gray-300 hover:text-[#F59297] hover:bg-pink-50 dark:hover:bg-pink-900/20'
              }`}
            >
              Appointments
            </Link>
            <Link
              href="/nutrition"
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                isActive('/nutrition')
                  ? 'text-[#F59297] font-semibold'
                  : 'text-gray-600 dark:text-gray-300 hover:text-[#F59297] hover:bg-pink-50 dark:hover:bg-pink-900/20'
              }`}
            >
              Nutrition
            </Link>
            <Link
              href="/chat"
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                isActive('/chat')
                  ? 'text-[#F59297] font-semibold'
                  : 'text-gray-600 dark:text-gray-300 hover:text-[#F59297] hover:bg-pink-50 dark:hover:bg-pink-900/20'
              }`}
            >
              Chat
            </Link>
            <Link
              href="/shop"
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                isActive('/shop')
                  ? 'text-[#F59297] font-semibold'
                  : 'text-gray-600 dark:text-gray-300 hover:text-[#F59297] hover:bg-pink-50 dark:hover:bg-pink-900/20'
              }`}
            >
              Shop
            </Link>
          </nav>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-600 dark:text-gray-300 hover:text-[#F59297] relative">
              <Bell className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 text-gray-600 dark:text-gray-300 hover:text-[#F59297] hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-200"
              aria-label="Toggle dark mode"
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
            
            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-2 p-1 text-gray-600 dark:text-gray-300 hover:text-[#F59297] rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200"
              >
                {userProfilePicture ? (
                  <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-gray-200 dark:border-gray-600 hover:border-[#F59297] transition-colors duration-200">
                    <img
                      src={userProfilePicture}
                      alt={`${userName}'s profile`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-8 h-8 rounded-full bg-[#F59297] flex items-center justify-center text-white font-semibold text-sm">
                    {userName.charAt(0).toUpperCase()}
                  </div>
                )}
                <span className="hidden md:block text-sm font-medium">{userName}</span>
              </button>
              
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
                  <div className="py-2">
                    <Link 
                      href="/profile" 
                      className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <User className="w-4 h-4 mr-3" />
                      Profile Settings
                    </Link>
                    <button 
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <LogOut className="w-4 h-4 mr-3" />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default DashboardHeader
