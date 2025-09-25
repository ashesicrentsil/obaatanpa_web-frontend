'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Heart, Mail, Phone, MapPin, Facebook, Instagram, Twitter, Globe, ChevronDown } from 'lucide-react'

const Footer = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('English')
  const [isLanguageOpen, setIsLanguageOpen] = useState(false)

  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'tw', name: 'Twi', flag: '🇬🇭' },
    { code: 'ga', name: 'Ga', flag: '🇬🇭' },
    { code: 'ee', name: 'Ewe', flag: '🇬🇭' }
  ]

  const footerSections = [
    {
      title: 'About Obaatanpa',
      links: [
        { label: 'Our Story', href: '/about' },
        { label: 'Our Mission', href: '/mission' },
        { label: 'Meet the Team', href: '/team' },
        { label: 'Careers', href: '/careers' },
        { label: 'Press Kit', href: '/press' }
      ]
    },
    {
      title: 'Services',
      links: [
        { label: 'Hospital Finder', href: '/hospitals' },
        { label: 'Expert Consultations', href: '/consultations' },
        { label: 'Nutrition Plans', href: '/nutrition' },
        { label: 'Birth Planning', href: '/birth-plan' },
        { label: 'Community Forum', href: '/community' }
      ]
    },
    {
      title: 'Resources',
      links: [
        { label: 'Pregnancy Guide', href: '/resources/pregnancy' },
        { label: 'Baby Care Tips', href: '/resources/baby-care' },
        { label: 'Breastfeeding Support', href: '/resources/breastfeeding' },
        { label: 'Mental Health', href: '/resources/mental-health' },
        { label: 'Emergency Contacts', href: '/emergency' }
      ]
    },
    {
      title: 'Support',
      links: [
        { label: 'Help Center', href: '/help' },
        { label: 'Contact Us', href: '/contact' },
        { label: 'Report an Issue', href: '/report' },
        { label: 'Feedback', href: '/feedback' },
        { label: 'Community Guidelines', href: '/guidelines' }
      ]
    }
  ]

  const socialLinks = [
    { icon: Facebook, href: 'https://facebook.com/obaatanpa', label: 'Facebook' },
    { icon: Instagram, href: 'https://instagram.com/obaatanpa', label: 'Instagram' },
    { icon: Twitter, href: 'https://twitter.com/obaatanpa', label: 'Twitter' }
  ]

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-3 mb-6 group">
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
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-[#F59297] transition-colors duration-300">
                  Obaatanpa
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 -mt-1">
                  Maternal Care
                </p>
              </div>
            </Link>
            
            <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
              Your trusted companion for pregnancy, motherhood, and baby care. Providing culturally relevant guidance and support for Ghanaian families.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-primary-500 dark:text-primary-400 flex-shrink-0" />
                <a href="mailto:support@obaatanpa.com" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200">
                  support@obaatanpa.com
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-primary-500 dark:text-primary-400 flex-shrink-0" />
                <a href="tel:+233123456789" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200">
                  +233 123 456 789
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-primary-500 dark:text-primary-400 flex-shrink-0" />
                <span className="text-gray-600 dark:text-gray-300">
                  Accra, Ghana
                </span>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section, index) => (
            <div key={index}>
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      href={link.href}
                      className="text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors duration-200 text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Social Media & Newsletter */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
            {/* Social Links */}
            <div className="flex items-center space-x-6">
              <span className="text-gray-500 dark:text-gray-400 text-sm">Follow us:</span>
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon
                return (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-gray-200 dark:bg-gray-800 hover:bg-primary-500 dark:hover:bg-primary-600 text-gray-600 dark:text-white rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110"
                    aria-label={social.label}
                  >
                    <IconComponent className="w-5 h-5" />
                  </a>
                )
              })}
            </div>

            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                className="flex items-center space-x-2 bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 px-4 py-2 rounded-lg transition-colors duration-200"
              >
                <Globe className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                <span className="text-sm text-gray-700 dark:text-gray-300">{selectedLanguage}</span>
                <ChevronDown className={`w-4 h-4 text-gray-500 dark:text-gray-400 transition-transform duration-200 ${isLanguageOpen ? 'rotate-180' : ''}`} />
              </button>

              {isLanguageOpen && (
                <div className="absolute bottom-full mb-2 right-0 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl py-2 min-w-[150px]">
                  {languages.map((language) => (
                    <button
                      key={language.code}
                      onClick={() => {
                        setSelectedLanguage(language.name)
                        setIsLanguageOpen(false)
                      }}
                      className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
                    >
                      <span>{language.flag}</span>
                      <span>{language.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200 dark:border-gray-800 bg-gray-100 dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                © 2024 Obaatanpa. All rights reserved.
              </p>
              <div className="flex items-center space-x-4 text-sm">
                <Link href="/privacy" className="text-gray-500 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors duration-200">
                  Privacy Policy
                </Link>
                <span className="text-gray-400 dark:text-gray-600">•</span>
                <Link href="/terms" className="text-gray-500 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors duration-200">
                  Terms of Service
                </Link>
                <span className="text-gray-400 dark:text-gray-600">•</span>
                <Link href="/cookies" className="text-gray-500 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors duration-200">
                  Cookie Policy
                </Link>
              </div>
            </div>

            <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-primary-500 dark:text-primary-400" fill="currentColor" />
              <span>in Ghana</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
