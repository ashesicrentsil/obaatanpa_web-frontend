'use client'

import { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'

// Import components
import Navigation from '@/components/Navigation'
import AppointmentsHero from '@/components/appointments/AppointmentsHero'
import WhyBookSection from '@/components/appointments/WhyBookSection'
import HowItWorksSection from '@/components/appointments/HowItWorksSection'
import AppointmentTypesSection from '@/components/appointments/AppointmentTypesSection'
import TestimonialsSection from '@/components/appointments/TestimonialsSection'
import MainCTASection from '@/components/appointments/MainCTASection'
import FAQSection from '@/components/appointments/FAQSection'
import Footer from '@/components/Footer'

export default function AppointmentsPage() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      mirror: true,
      easing: 'ease-in-out',
    })
  }, [])

  return (
    <main className="min-h-screen">
      {/* Navigation */}
      <Navigation />

      {/* Hero Section */}
      <AppointmentsHero />

      {/* Why Book Through Obaatanpa */}
      <WhyBookSection />

      {/* How It Works */}
      <HowItWorksSection />

      {/* Appointment Types */}
      <AppointmentTypesSection />

      {/* Testimonials */}
      <TestimonialsSection />

      {/* Main CTA Section */}
      <MainCTASection />

      {/* FAQ Section */}
      <FAQSection />

      {/* Footer */}
      <Footer />
    </main>
  )
}
