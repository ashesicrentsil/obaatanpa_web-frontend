'use client'

import { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'

// Import all components
import Navigation from '@/components/Navigation'
import HeroSection from '@/components/HeroSection'
import WhyObaatanpaSection from '@/components/WhyObaatanpaSection'
import QuickAccessSection from '@/components/QuickAccessSection'
import FeaturedContentSection from '@/components/FeaturedContentSection'
import TestimonialSection from '@/components/TestimonialSection'
import DownloadAppSection from '@/components/DownloadAppSection'
import CommunitySection from '@/components/CommunitySection'
import Footer from '@/components/Footer'

export default function Home() {
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
      <HeroSection />

      {/* Why Obaatanpa Section */}
      <WhyObaatanpaSection />

      {/* Quick Access Cards */}
      <QuickAccessSection />

      {/* Featured Content & Announcements */}
      <FeaturedContentSection />

      {/* Testimonial Carousel */}
      <TestimonialSection />

      {/* Download App Section */}
      <DownloadAppSection />

      {/* Community & Newsletter */}
      <CommunitySection />

      {/* Footer */}
      <Footer />
    </main>
  )
}
