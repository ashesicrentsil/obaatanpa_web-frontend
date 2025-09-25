'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { Menu, X, Moon, Sun, Search } from 'lucide-react'
import { cn } from '@/lib/utils'
import SignUpModal from '@/components/auth/SignUpModal'
import LoginModal from '@/components/auth/LoginModal'
import { useTheme } from '@/contexts/ThemeContext'

const Navigation = () => {
  const pathname = usePathname()
  const router = useRouter()
  const { theme, toggleTheme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [userMode, setUserMode] = useState<'user' | 'practitioner'>('user')
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Detect if we're on practitioner page and set mode accordingly
  useEffect(() => {
    if (pathname === '/practitioners') {
      setUserMode('practitioner')
    } else {
      setUserMode('user')
    }
  }, [pathname])

  const userNavItems = [
    { label: 'Home', href: '/' },
    { label: 'Resources', href: '/resources' },
    { label: 'Find a Hospital', href: '/hospitals' },
    { label: 'Appointments', href: '/appointments' },
    { label: 'Nutrition', href: '/nutrition' },
    { label: 'Blog', href: '/blog' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ]

  const practitionerNavItems = [
    { label: 'Dashboard', href: '/practitioners/dashboard' },
    { label: 'Patients', href: '/practitioners/patients' },
    { label: 'Appointments', href: '/practitioners/appointments' },
    { label: 'Resources', href: '/practitioners/resources' },
    { label: 'Profile', href: '/practitioners/profile' },
    { label: 'Support', href: '/practitioners/support' },
  ]

  // Get current navigation items based on mode
  const navItems = userMode === 'practitioner' ? practitionerNavItems : userNavItems

  const handleModeSwitch = (mode: 'user' | 'practitioner') => {
    setUserMode(mode)
    if (mode === 'practitioner') {
      router.push('/practitioners')
    } else {
      router.push('/')
    }
    setIsOpen(false) // Close mobile menu if open
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      // Handle search functionality here
      console.log('Searching for:', searchQuery)
      // You can redirect to a search results page or filter content
      // For now, we'll just log the search query
      setIsSearchOpen(false)
      setSearchQuery('')
    }
  }

  return (
    <nav className={cn(
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
      isScrolled
        ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg'
        : 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm'
    )}>
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
                  Maternal Care
                </p>
              </div>
            </div>
          </Link>
        </div>

        {/* Navigation Section - Bottom */}
        <div className="flex justify-between items-center h-14">
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1 flex-1 justify-center">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 whitespace-nowrap",
                    isActive
                      ? "text-[#F59297] font-semibold"
                      : "text-gray-700 dark:text-gray-300 hover:text-[#F59297] dark:hover:text-[#F59297] hover:bg-pink-50 dark:hover:bg-pink-900/20"
                  )}
                >
                  {item.label}
                </Link>
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

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center space-x-3">
              <button
                onClick={() => setIsLoginModalOpen(true)}
                className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-[#F59297] dark:hover:text-[#F59297] transition-colors duration-200"
              >
                Login
              </button>
              <button
                onClick={() => setIsSignUpModalOpen(true)}
                className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium bg-gradient-to-r from-[#F59297] to-[#7da8e6] text-white rounded-full hover:from-[#e67d82] hover:to-[#6b9ce6] transition-all duration-200 shadow-md hover:shadow-lg whitespace-nowrap"
              >
                Sign Up
              </button>
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
              {/* User Mode Toggle Mobile */}
              <div className="flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-full p-1 mb-4">
                <button
                  onClick={() => handleModeSwitch('user')}
                  className={cn(
                    'px-4 py-2 text-sm font-medium rounded-full transition-all duration-200',
                    userMode === 'user'
                      ? 'bg-[#F59297] text-white shadow-sm'
                      : 'text-gray-600 dark:text-gray-400'
                  )}
                >
                  User
                </button>
                <button
                  onClick={() => handleModeSwitch('practitioner')}
                  className={cn(
                    'px-4 py-2 text-sm font-medium rounded-full transition-all duration-200',
                    userMode === 'practitioner'
                      ? 'bg-[#F59297] text-white shadow-sm'
                      : 'text-gray-600 dark:text-gray-400'
                  )}
                >
                  Practitioner
                </button>
              </div>

              {/* Navigation Items */}
              {navItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "block px-4 py-3 text-base font-medium rounded-lg transition-all duration-200",
                      isActive
                        ? "text-[#F59297] font-semibold"
                        : "text-gray-700 dark:text-gray-300 hover:text-[#F59297] dark:hover:text-[#F59297] hover:bg-pink-50 dark:hover:bg-pink-900/20"
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                )
              })}

              {/* Auth Buttons Mobile */}
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700 space-y-3">
                <button
                  onClick={() => {
                    setIsLoginModalOpen(true)
                    setIsOpen(false)
                  }}
                  className="block w-full px-4 py-3 text-center text-base font-medium text-gray-700 dark:text-gray-300 hover:text-[#F59297] dark:hover:text-[#F59297] border border-gray-300 dark:border-gray-600 rounded-lg transition-all duration-200"
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    setIsSignUpModalOpen(true)
                    setIsOpen(false)
                  }}
                  className="block w-full px-4 py-3 text-center text-base font-medium bg-gradient-to-r from-[#F59297] to-[#7da8e6] text-white rounded-lg hover:from-[#e67d82] hover:to-[#6b9ce6] transition-all duration-200 shadow-md"
                >
                  Sign Up
                </button>
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
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Search Obaatanpa</h3>
                <button
                  onClick={() => setIsSearchOpen(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSearch} className="mb-6">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search for hospitals, articles, resources, or ask a question..."
                    className="w-full pl-12 pr-4 py-4 text-lg border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F59297] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                    autoFocus
                  />
                </div>
                <button
                  type="submit"
                  className="mt-4 w-full bg-gradient-to-r from-[#F59297] to-[#7da8e6] text-white py-3 rounded-xl font-semibold hover:from-[#e67d82] hover:to-[#6b9ce6] transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  Search
                </button>
              </form>

              {/* Quick Search Suggestions */}
              <div>
                <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Popular Searches</h4>
                <div className="flex flex-wrap gap-2">
                  {[
                    'Hospitals near me',
                    'Pregnancy nutrition',
                    'Baby care tips',
                    'Midwife consultation',
                    'Birth planning',
                    'Postpartum care'
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

      {/* Sign Up Modal */}
      <SignUpModal
        isOpen={isSignUpModalOpen}
        onClose={() => setIsSignUpModalOpen(false)}
        onOpenLogin={() => {
          setIsSignUpModalOpen(false)
          setIsLoginModalOpen(true)
        }}
      />

      {/* Login Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onOpenSignUp={() => {
          setIsLoginModalOpen(false)
          setIsSignUpModalOpen(true)
        }}
      />
    </nav>
  )
}

export default Navigation
