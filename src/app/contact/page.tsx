'use client'

import { useState } from 'react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import ContactHero from '@/components/contact/ContactHero'
import ContactForm from '@/components/contact/ContactForm'
import QuickContactInfo from '@/components/contact/QuickContactInfo'
import ContactFAQs from '@/components/contact/ContactFAQs'
import FeedbackSection from '@/components/contact/FeedbackSection'
import EmergencyBanner from '@/components/contact/EmergencyBanner'
import MapLocation from '@/components/contact/MapLocation'
import ContactCTA from '@/components/contact/ContactCTA'

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation />
      
      <ContactHero />
      
      <EmergencyBanner />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <ContactForm />
          <QuickContactInfo />
        </div>
      </div>
      
      <ContactFAQs />
      
      <FeedbackSection />
      
      <MapLocation />
      
      <ContactCTA />
      
      <Footer />
    </div>
  )
}

export default ContactPage
