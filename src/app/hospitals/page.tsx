'use client'

import { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'

// Import components
import Navigation from '@/components/Navigation'
import HospitalsHero from '@/components/hospitals/HospitalsHero'
import HospitalBenefitsSection from '@/components/hospitals/HospitalBenefitsSection'
import PreviewSearchSection from '@/components/hospitals/PreviewSearchSection'
import SampleHospitalsSection from '@/components/hospitals/SampleHospitalsSection'
import HowItWorksHospitalsSection from '@/components/hospitals/HowItWorksHospitalsSection'
import HospitalTestimonialsSection from '@/components/hospitals/HospitalTestimonialsSection'
import HospitalFAQSection from '@/components/hospitals/HospitalFAQSection'
import HospitalCTABannerSection from '@/components/hospitals/HospitalCTABannerSection'
import Footer from '@/components/Footer'

export default function HospitalsPage() {
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
      <HospitalsHero />

      {/* Benefits of Using Obaatanpa's Hospital Finder */}
      <HospitalBenefitsSection />

      {/* Preview Search Section */}
      <PreviewSearchSection />

      {/* Sample Hospitals Carousel */}
      <SampleHospitalsSection />

      {/* How It Works */}
      <HowItWorksHospitalsSection />

      {/* Testimonials */}
      <HospitalTestimonialsSection />

      {/* FAQ Section */}
      <HospitalFAQSection />

      {/* CTA Banner */}
      <HospitalCTABannerSection />

      {/* Footer */}
      <Footer />
    </main>
  )
}
