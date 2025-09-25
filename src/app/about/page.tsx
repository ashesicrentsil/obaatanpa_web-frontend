'use client'

import { useState } from 'react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import AboutHero from '@/components/about/AboutHero'
import OurMission from '@/components/about/OurMission'
import OurStory from '@/components/about/OurStory'
import WhatMakesUsDifferent from '@/components/about/WhatMakesUsDifferent'
import OurVision from '@/components/about/OurVision'
import MeetTheTeam from '@/components/about/MeetTheTeam'
import OurValues from '@/components/about/OurValues'
import OurImpact from '@/components/about/OurImpact'
import AboutCTA from '@/components/about/AboutCTA'

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation />
      
      <AboutHero />
      
      <OurMission />
      
      <OurStory />
      
      <WhatMakesUsDifferent />
      
      <OurVision />
      
      <MeetTheTeam />
      
      <OurValues />
      
      <OurImpact />
      
      <AboutCTA />
      
      <Footer />
    </div>
  )
}

export default AboutPage
