'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X, Moon, Sun, Search, Bell, User, ChevronDown, Home, FileText, Calendar, Utensils, Heart, Baby, ShoppingBag } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useTheme } from '@/contexts/ThemeContext'

// Define interfaces for navigation items
interface DropdownItem {
  id: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  description: string
}

interface NavigationItem {
  id: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  hasDropdown: boolean
  dropdownItems?: DropdownItem[] // Optional dropdownItems
}

interface DashboardNavigationProps {
  activeTab: string
  onTabChange: (tab: string) => void
  userName?: string
  userProfilePicture?: string
  notificationCount?: number
  userType: 'pregnant' | 'new-mother'
}

const DashboardNavigation = ({
  activeTab,
  onTabChange,
  userName = 'User',
  userProfilePicture,
  notificationCount = 0,
  userType,
}: DashboardNavigationProps) => {
  const pathname = usePathname()
  const { theme, toggleTheme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [showHealthDropdown, setShowHealthDropdown] = useState(false)
  const [showProfileDropdown, setShowProfileDropdown] = useState(false)
  const healthDropdownRef = useRef<HTMLDivElement>(null)
  const profileDropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (healthDropdownRef.current && !healthDropdownRef.current.contains(event.target as Node)) {
        setShowHealthDropdown(false)
      }
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target as Node)) {
        setShowProfileDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Dashboard-specific navigation items
  const getNavigationItems = (): NavigationItem[] => {
    const baseItems: NavigationItem[] = [
      {
        id: 'dashboard',
        label: 'Dashboard',
        icon: Home,
        hasDropdown: false,
      },
      {
        id: 'resources',
        label: 'Resources',
        icon: FileText,
        hasDropdown: false,
      },
      {
        id: 'appointments',
        label: 'Appointments',
        icon: Calendar,
        hasDropdown: false,
      },
      {
        id: 'nutrition',
        label: 'Nutrition',
        icon: Utensils,
        hasDropdown: false,
      },
      {
        id: 'shop',
        label: 'Shop',
        icon: ShoppingBag,
        hasDropdown: false,
      },
    ]

    // Add health dropdown with different items based on user type
    const healthItem: NavigationItem = {
      id: 'health',
      label: 'Health',
      icon: Heart,
      hasDropdown: true,
      dropdownItems: userType === 'pregnant' ? [
        {
          id: 'pregnancy-health',
          label: 'Pregnancy Health',
          icon: Heart,
          description: 'Prenatal care & wellness',
        },
        {
          id: 'baby-development',
          label: 'Baby Development',
          icon: Baby,
          description: "Track your baby's growth",
        },
      ] : [
        {
          id: 'baby-health',
          label: 'Baby Health',
          icon: Baby,
          description: 'Feeding, development & care',
        },
        {
          id: 'mother-health',
          label: "Mother's Health",
          icon: Heart,
          description: 'Postpartum care & wellness',
        },
      ],
    }

    return [...baseItems.slice(0, 4), healthItem, ...baseItems.slice(4)]
  }

  const navigationItems = getNavigationItems()

  const handleHealthDropdown = () => {
    setShowHealthDropdown(!showHealthDropdown)
    setShowProfileDropdown(false)
  }

  const handleProfileDropdown = () => {
    setShowProfileDropdown(!showProfileDropdown)
    setShowHealthDropdown(false)
  }

  const handleNavClick = (itemId: string) => {
    if (itemId === 'health') {
      handleHealthDropdown()
    } else {
      onTabChange(itemId)
      setShowHealthDropdown(false)
      setShowProfileDropdown(false)
    }
  }

  const handleHealthSubItemClick = (subItemId: string) => {
    onTabChange(subItemId)
    setShowHealthDropdown(false)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery)
      setIsSearchOpen(false)
      setSearchQuery('')
    }
  }

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg'
          : 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm',
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Logo Section - Top */}
        <div className="flex justify-center items-center py-3 border-b border-gray-200/50 dark:border-gray-700/50">
          <Link href="/" className="flex items-center group">
            <div className="flex items-center space-x-3">
              <div className="relative h-12 w-12 group-hover:scale-105 transition-transform duration-300">
                <Image
                  src="/images/icons/maternity-logo.png"
                  alt="Obaatanpa Logo"
                  width={48}
                  height={48}
                  className="h-12 w-12 object-contain rounded-xl"
                  priority
                />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-[#F59297] transition-colors duration-300">
                  Obaatanpa
                </h1>
                <p className="text-xs text-gray-500 dark:text-gray-400 -mt-1">
                  {userType === 'pregnant' ? 'Pregnancy Dashboard' : 'New Mother Dashboard'}
                </p>
              </div>
            </div>
          </Link>
        </div>

        {/* Navigation Section - Bottom */}
        <div className="flex justify-between items-center h-14">
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1 flex-1 justify-center">
            {navigationItems.map((item) => {
              const isActive =
                activeTab === item.id ||
                (item.hasDropdown && item.dropdownItems && item.dropdownItems.some((subItem) => subItem.id === activeTab))

              return (
                <div key={item.id} className="relative" ref={item.id === 'health' ? healthDropdownRef : undefined}>
                  <button
                    onClick={() => handleNavClick(item.id)}
                    className={cn(
                      'flex items-center space-x-1 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 whitespace-nowrap',
                      isActive
                        ? 'text-[#F59297] bg-[#F59297]/10 font-semibold'
                        : 'text-gray-700 dark:text-gray-300 hover:text-[#F59297] dark:hover:text-[#F59297] hover:bg-pink-50 dark:hover:bg-pink-900/20',
                    )}
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.label}</span>
                    {item.hasDropdown && (
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                          showHealthDropdown ? 'rotate-180' : ''
                        }`}
                      />
                    )}
                  </button>

                  {/* Health Dropdown */}
                  {item.hasDropdown && showHealthDropdown && item.dropdownItems && (
                    <div className="absolute top-full left-0 mt-1 w-64 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50">
                      {item.dropdownItems.map((subItem) => (
                        <button
                          key={subItem.id}
                          onClick={() => handleHealthSubItemClick(subItem.id)}
                          className={cn(
                            'w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200',
                            activeTab === subItem.id ? 'text-[#F59297] bg-[#F59297]/5' : 'text-gray-700 dark:text-gray-300',
                          )}
                        >
                          <div
                            className={cn(
                              'w-8 h-8 rounded-lg flex items-center justify-center',
                              activeTab === subItem.id
                                ? 'bg-[#F59297] text-white'
                                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400',
                            )}
                          >
                            <subItem.icon className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="font-medium">{subItem.label}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{subItem.description}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Right Side Controls */}
          <div className="flex items-center space-x-3">
            {/* Search Button */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all duration-200"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Theme Toggle */}
            {mounted && (
              <button
                onClick={toggleTheme}
                className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all duration-200"
              >
                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            )}

            {/* Notifications */}
            <button
              className="relative p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all duration-200"
            >
              <Bell className="w-5 h-5" />
              {notificationCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#F59297] text-white text-xs rounded-full flex items-center justify-center">
                  {notificationCount > 9 ? '9+' : notificationCount}
                </span>
              )}
            </button>

            {/* Profile Dropdown */}
            <div className="relative" ref={profileDropdownRef}>
              <button
                onClick={handleProfileDropdown}
                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
              >
                <div className="w-8 h-8 bg-gradient-to-r from-[#F59297] to-[#7da8e6] rounded-full flex items-center justify-center">
                  {userProfilePicture ? (
                    <Image
                      src={userProfilePicture}
                      alt={userName}
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                  ) : (
                    <User className="w-4 h-4 text-white" />
                  )}
                </div>
                <span className="hidden md:block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {userName}
                </span>
                <ChevronDown
                  className={cn(
                    'w-4 h-4 text-gray-400 transition-transform duration-200',
                    showProfileDropdown ? 'rotate-180' : '',
                  )}
                />
              </button>

              {/* Profile Dropdown Menu */}
              {showProfileDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50">
                  <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{userName}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {userType === 'pregnant' ? 'Pregnant Mother' : 'New Mother'}
                    </p>
                  </div>
                  <button
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                  >
                    Profile Settings
                  </button>
                  <button
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                  >
                    Help & Support
                  </button>
                  <div className="border-t border-gray-200 dark:border-gray-700 mt-2 pt-2">
                    <button
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-200"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all duration-200"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 shadow-lg">
            <div className="px-4 py-6 space-y-4">
              {/* Navigation Items */}
              {navigationItems.map((item) => {
                const isActive =
                  activeTab === item.id ||
                  (item.hasDropdown && item.dropdownItems && item.dropdownItems.some((subItem) => subItem.id === activeTab))

                return (
                  <div key={item.id}>
                    <button
                      onClick={() => handleNavClick(item.id)}
                      className={cn(
                        'flex items-center space-x-2 w-full px-4 py-3 text-base font-medium rounded-lg transition-all duration-200',
                        isActive
                          ? 'text-[#F59297] font-semibold'
                          : 'text-gray-700 dark:text-gray-300 hover:text-[#F59297] dark:hover:text-[#F59297] hover:bg-pink-50 dark:hover:bg-pink-900/20',
                      )}
                    >
                      <item.icon className="w-5 h-5" />
                      <span>{item.label}</span>
                      {item.hasDropdown && <ChevronDown className="w-4 h-4 ml-auto" />}
                    </button>

                    {/* Mobile Health Dropdown */}
                    {item.hasDropdown && showHealthDropdown && item.dropdownItems && (
                      <div className="ml-6 mt-2 space-y-2">
                        {item.dropdownItems.map((subItem) => (
                          <button
                            key={subItem.id}
                            onClick={() => handleHealthSubItemClick(subItem.id)}
                            className={cn(
                              'flex items-center space-x-3 w-full px-4 py-2 text-sm rounded-lg transition-colors duration-200',
                              activeTab === subItem.id
                                ? 'text-[#F59297] bg-[#F59297]/5'
                                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700',
                            )}
                          >
                            <subItem.icon className="w-4 h-4" />
                            <span>{subItem.label}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )
              })}

              {/* Profile Section Mobile */}
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-3 px-4 py-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-[#F59297] to-[#7da8e6] rounded-full flex items-center justify-center">
                    {userProfilePicture ? (
                      <Image
                        src={userProfilePicture}
                        alt={userName}
                        width={32}
                        height={32}
                        className="rounded-full"
                      />
                    ) : (
                      <User className="w-4 h-4 text-white" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{userName}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {userType === 'pregnant' ? 'Pregnant Mother' : 'New Mother'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Search Overlay */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" onClick={() => setIsSearchOpen(false)}>
          <div className="flex items-start justify-center pt-20 px-4">
            <div
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Search Dashboard</h3>
                <button
                  onClick={() => setIsSearchOpen(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <form onSubmit={handleSearch} className="mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search for resources, appointments, nutrition tips..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#F59297] focus:border-transparent"
                  />
                </div>
              </form>
              <div>
                <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Quick Access</h4>
                <div className="flex flex-wrap gap-2">
                  {[
                    'Appointments',
                    'Nutrition tips',
                    'Baby development',
                    'Health resources',
                    'Emergency contacts',
                    'Community support',
                  ].map((suggestion) => (
                    <button
                      key={suggestion}
                      onClick={() => {
                        setSearchQuery(suggestion)
                        handleSearch({ preventDefault: () => {} } as React.FormEvent)
                      }}
                      className="px-3 py-2 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-pink-100 dark:hover:bg-pink-900/30 hover:text-[#F59297] dark:hover:text-[#F59297] transition-all duration-200"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export default DashboardNavigation