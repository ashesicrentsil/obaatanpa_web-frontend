'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { 
  Menu, 
  X, 
  Moon, 
  Sun, 
  Search, 
  Bell, 
  User, 
  ChevronDown, 
  LayoutDashboard,
  Users,
  Building2,
  UserCheck,
  FileText,
  BarChart3,
  Settings,
  LogOut,
  Shield
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useTheme } from '@/contexts/ThemeContext'

interface AdminNavbarProps {
  activeTab: string
  onTabChange: (tab: string) => void
  adminUser: {
    name: string
    email: string
    role: string
    profilePicture: string
  }
  notificationCount?: number
}

const AdminNavbar = ({ activeTab, onTabChange, adminUser, notificationCount = 0 }: AdminNavbarProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [showUserDropdown, setShowUserDropdown] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const userDropdownRef = useRef<HTMLDivElement>(null)

  const navigationItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      hasDropdown: false
    },
    {
      id: 'users',
      label: 'Users',
      icon: Users,
      hasDropdown: false
    },
    {
      id: 'hospitals',
      label: 'Hospitals',
      icon: Building2,
      hasDropdown: false
    },
    {
      id: 'practitioners',
      label: 'Practitioners',
      icon: UserCheck,
      hasDropdown: false
    },
    {
      id: 'content',
      label: 'Content',
      icon: FileText,
      hasDropdown: false
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: BarChart3,
      hasDropdown: false
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: Settings,
      hasDropdown: false
    }
  ]

  const handleNavClick = (itemId: string) => {
    onTabChange(itemId)
    setIsMobileMenuOpen(false)
  }

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target as Node)) {
        setShowUserDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Logo Section - Top */}
        <div className="flex justify-between items-center h-16 border-b border-gray-100 dark:border-gray-800">
          <Link href="/admin" className="group">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-[#F59297] to-[#7da8e6] rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-[#F59297] transition-colors duration-300">
                  Obaatanpa Admin
                </h1>
                <p className="text-xs text-gray-500 dark:text-gray-400 -mt-1">
                  System Administration
                </p>
              </div>
            </div>
          </Link>

          {/* Right Side - User Menu */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="hidden md:block relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-800 border-0 rounded-lg text-sm focus:ring-2 focus:ring-[#F59297] focus:bg-white dark:focus:bg-gray-700 transition-all duration-200"
              />
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              ) : (
                <Moon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              )}
            </button>

            {/* Notifications */}
            <button className="relative p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200">
              <Bell className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              {notificationCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {notificationCount}
                </span>
              )}
            </button>

            {/* User Dropdown */}
            <div className="relative" ref={userDropdownRef}>
              <button
                onClick={() => setShowUserDropdown(!showUserDropdown)}
                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
              >
                <Image
                  src={adminUser.profilePicture}
                  alt={adminUser.name}
                  width={32}
                  height={32}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div className="hidden md:block text-left">
                  <div className="text-sm font-medium text-gray-900 dark:text-white">{adminUser.name}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">{adminUser.role}</div>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-500" />
              </button>

              {/* User Dropdown Menu */}
              {showUserDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1">
                  <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">{adminUser.name}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{adminUser.email}</div>
                  </div>
                  <button className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-2">
                    <User className="w-4 h-4" />
                    <span>Profile</span>
                  </button>
                  <button className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-2">
                    <Settings className="w-4 h-4" />
                    <span>Settings</span>
                  </button>
                  <hr className="my-1 border-gray-200 dark:border-gray-700" />
                  <button className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-2">
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              ) : (
                <Menu className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              )}
            </button>
          </div>
        </div>

        {/* Navigation Section - Bottom */}
        <div className="flex justify-between items-center h-14">
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1 flex-1 justify-center">
            {navigationItems.map((item) => {
              const isActive = activeTab === item.id
              
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={cn(
                    "flex items-center space-x-1 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 whitespace-nowrap",
                    isActive
                      ? "text-[#F59297] bg-[#F59297]/10 font-semibold"
                      : "text-gray-700 dark:text-gray-300 hover:text-[#F59297] dark:hover:text-[#F59297] hover:bg-pink-50 dark:hover:bg-pink-900/20"
                  )}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
          <div className="px-4 py-4 space-y-2">
            {navigationItems.map((item) => {
              const isActive = activeTab === item.id
              
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={cn(
                    "flex items-center space-x-2 w-full px-4 py-3 text-base font-medium rounded-lg transition-all duration-200",
                    isActive
                      ? "text-[#F59297] font-semibold"
                      : "text-gray-700 dark:text-gray-300 hover:text-[#F59297] dark:hover:text-[#F59297] hover:bg-pink-50 dark:hover:bg-pink-900/20"
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              )
            })}
          </div>
        </div>
      )}
    </nav>
  )
}

export default AdminNavbar
