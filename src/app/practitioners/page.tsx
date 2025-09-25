'use client'

import { useState } from 'react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import PractitionerHero from '@/components/practitioners/PractitionerHero'
import HowObaatanpaHelps from '@/components/practitioners/HowObaatanpaHelps'
import WhyJoinPractitioner from '@/components/practitioners/WhyJoinPractitioner'
import WhoCanRegister from '@/components/practitioners/WhoCanRegister'
import WhatPractitionersDo from '@/components/practitioners/WhatPractitionersDo'
import PractitionerCTA from '@/components/practitioners/PractitionerCTA'

const PractitionersPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation />
      
      <PractitionerHero />
      
      <HowObaatanpaHelps />
      
      <WhyJoinPractitioner />
      
      <WhoCanRegister />
      
      <WhatPractitionersDo />
      
      <PractitionerCTA />
      
      <Footer />
    </div>
  )
}

export default PractitionersPage
