'use client'

import { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'

// Import components
import Navigation from '@/components/Navigation'
import ResourcesHero from '@/components/resources/ResourcesHero'

import FeaturedVideos from '@/components/resources/FeaturedVideos'
import ArticlesSection from '@/components/resources/ArticlesSection'
import ContentGrid from '@/components/resources/ContentGrid'
import ResourceTools from '@/components/resources/ResourceTools'
import BabyProductsSection from '@/components/resources/BabyProductsSection'
import ExpertsCTA from '@/components/resources/ExpertsCTA'
import NewsletterCTA from '@/components/resources/NewsletterCTA'
import Footer from '@/components/Footer'

export default function ResourcesPage() {
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
      <ResourcesHero />

      {/* Featured Videos */}
      <FeaturedVideos />

      {/* Articles Section */}
      <ArticlesSection />

      {/* Content Grid */}
      <ContentGrid />
      
      {/* Resource Tools */}
      <ResourceTools />

      {/* Baby Products Section */}
      <BabyProductsSection />

      {/* Ask Experts CTA */}
      <ExpertsCTA />
      
      {/* Newsletter CTA */}
      <NewsletterCTA />
      
      {/* Footer */}
      <Footer />
    </main>
  )
}
