'use client'

import { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'

// Import components
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import NutritionHero from '@/components/nutrition/NutritionHero'
import WhyNutritionMattersSection from '@/components/nutrition/WhyNutritionMattersSection'
import FeatureHighlightsSection from '@/components/nutrition/FeatureHighlightsSection'
import SampleMealPlanSection from '@/components/nutrition/SampleMealPlanSection'
import ExpertAdviceSection from '@/components/nutrition/ExpertAdviceSection'
import NutritionTestimonialsSection from '@/components/nutrition/NutritionTestimonialsSection'
import NutritionMainCTASection from '@/components/nutrition/NutritionMainCTASection'

const NutritionPage = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      mirror: true,
      easing: 'ease-in-out',
    })
  }, [])

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <Navigation />

      {/* Hero Section */}
      <NutritionHero />

      {/* Why Nutrition Matters */}
      <WhyNutritionMattersSection />

      {/* What You'll Get - Feature Highlights */}
      <FeatureHighlightsSection />

      {/* Sample Meal Plan Preview */}
      <SampleMealPlanSection />

      {/* Expert Advice Snippets */}
      <ExpertAdviceSection />

      {/* Testimonials */}
      <NutritionTestimonialsSection />

      {/* Main CTA Section */}
      <NutritionMainCTASection />

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default NutritionPage
