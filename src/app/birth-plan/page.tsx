'use client'

import { useState } from 'react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { FileText, Download, Save, CheckCircle, AlertCircle, Users, Heart } from 'lucide-react'

export default function BirthPlanPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [birthPlan, setBirthPlan] = useState({
    personalInfo: {
      name: '',
      dueDate: '',
      hospital: '',
      doctor: '',
      partner: ''
    },
    laborPreferences: {
      environment: '',
      mobility: '',
      monitoring: '',
      painManagement: ''
    },
    deliveryPreferences: {
      position: '',
      episiotomy: '',
      assistedDelivery: '',
      cesarean: ''
    },
    postpartumPreferences: {
      skinToSkin: '',
      breastfeeding: '',
      visitors: '',
      rooming: ''
    }
  })

  const steps = [
    { id: 1, title: 'Personal Information', icon: '👤' },
    { id: 2, title: 'Labor Preferences', icon: '🤱' },
    { id: 3, title: 'Delivery Preferences', icon: '👶' },
    { id: 4, title: 'Postpartum Care', icon: '💕' },
    { id: 5, title: 'Review & Download', icon: '📋' }
  ]

  const laborOptions = {
    environment: [
      'Dimmed lighting',
      'Music playing',
      'Quiet environment',
      'Family present',
      'Minimal interruptions'
    ],
    mobility: [
      'Freedom to move around',
      'Use of birthing ball',
      'Walking during labor',
      'Different positions',
      'Water birth if available'
    ],
    monitoring: [
      'Intermittent monitoring',
      'Continuous monitoring',
      'Wireless monitoring',
      'Minimal monitoring',
      'As medically necessary'
    ],
    painManagement: [
      'Natural pain relief',
      'Epidural',
      'Nitrous oxide',
      'Massage and breathing',
      'Water therapy'
    ]
  }

  const deliveryOptions = {
    position: [
      'Upright position',
      'Side-lying',
      'Squatting',
      'On hands and knees',
      'Whatever feels natural'
    ],
    episiotomy: [
      'Avoid if possible',
      'Only if medically necessary',
      'Discuss before proceeding',
      'No preference',
      'As recommended by doctor'
    ],
    assistedDelivery: [
      'Avoid if possible',
      'Vacuum if needed',
      'Forceps if needed',
      'Discuss options first',
      'As medically necessary'
    ],
    cesarean: [
      'Avoid if possible',
      'Partner present',
      'Immediate skin-to-skin',
      'Explain procedure',
      'As medically necessary'
    ]
  }

  const postpartumOptions = {
    skinToSkin: [
      'Immediate skin-to-skin',
      'Delayed cord clamping',
      'Partner can do skin-to-skin',
      'Extended contact time',
      'As soon as possible'
    ],
    breastfeeding: [
      'Breastfeed immediately',
      'No bottles or pacifiers',
      'Lactation consultant help',
      'Formula if needed',
      'Support with positioning'
    ],
    visitors: [
      'Immediate family only',
      'No visitors first day',
      'Limited visiting hours',
      'Partner decides',
      'Open to visitors'
    ],
    rooming: [
      'Baby stays with me',
      'Nursery at night',
      'Partner stays overnight',
      'Flexible arrangement',
      'As needed for rest'
    ]
  }

  const handleInputChange = (section: string, field: string, value: string) => {
    setBirthPlan(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [field]: value
      }
    }))
  }

  const nextStep = () => {
    if (currentStep < 5) setCurrentStep(currentStep + 1)
  }

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-12 bg-gradient-to-br from-[#F59297] to-[#7da8e6] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Create Your Birth Plan
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
            Plan your ideal birth experience with our guided birth plan creator
          </p>
          <div className="flex items-center justify-center space-x-2 text-white/80">
            <FileText className="w-5 h-5" />
            <span>Personalized • Professional • Printable</span>
          </div>
        </div>
      </section>

      {/* Progress Steps */}
      <section className="py-8 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center justify-center w-12 h-12 rounded-full border-2 ${
                  currentStep >= step.id
                    ? 'bg-[#F59297] border-[#F59297] text-white'
                    : 'border-gray-300 text-gray-400'
                }`}>
                  {currentStep > step.id ? (
                    <CheckCircle className="w-6 h-6" />
                  ) : (
                    <span className="text-xl">{step.icon}</span>
                  )}
                </div>
                <div className="ml-3 hidden md:block">
                  <p className={`text-sm font-medium ${
                    currentStep >= step.id ? 'text-[#F59297]' : 'text-gray-500'
                  }`}>
                    Step {step.id}
                  </p>
                  <p className={`text-xs ${
                    currentStep >= step.id ? 'text-gray-900 dark:text-white' : 'text-gray-400'
                  }`}>
                    {step.title}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-8 h-0.5 mx-4 ${
                    currentStep > step.id ? 'bg-[#F59297]' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form Content */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-8">
            
            {/* Step 1: Personal Information */}
            {currentStep === 1 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Personal Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={birthPlan.personalInfo.name}
                      onChange={(e) => handleInputChange('personalInfo', 'name', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#F59297] focus:border-transparent dark:bg-gray-700 dark:text-white"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Due Date
                    </label>
                    <input
                      type="date"
                      value={birthPlan.personalInfo.dueDate}
                      onChange={(e) => handleInputChange('personalInfo', 'dueDate', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#F59297] focus:border-transparent dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Hospital/Birth Center
                    </label>
                    <input
                      type="text"
                      value={birthPlan.personalInfo.hospital}
                      onChange={(e) => handleInputChange('personalInfo', 'hospital', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#F59297] focus:border-transparent dark:bg-gray-700 dark:text-white"
                      placeholder="Where you plan to give birth"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Doctor/Midwife
                    </label>
                    <input
                      type="text"
                      value={birthPlan.personalInfo.doctor}
                      onChange={(e) => handleInputChange('personalInfo', 'doctor', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#F59297] focus:border-transparent dark:bg-gray-700 dark:text-white"
                      placeholder="Your healthcare provider"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Birth Partner
                    </label>
                    <input
                      type="text"
                      value={birthPlan.personalInfo.partner}
                      onChange={(e) => handleInputChange('personalInfo', 'partner', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#F59297] focus:border-transparent dark:bg-gray-700 dark:text-white"
                      placeholder="Who will be with you during birth"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Labor Preferences */}
            {currentStep === 2 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Labor Preferences
                </h2>
                <div className="space-y-8">
                  {Object.entries(laborOptions).map(([category, options]) => (
                    <div key={category}>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 capitalize">
                        {category.replace(/([A-Z])/g, ' $1').trim()}
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {options.map((option) => (
                          <label key={option} className="flex items-center p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                            <input
                              type="radio"
                              name={category}
                              value={option}
                              checked={birthPlan.laborPreferences[category as keyof typeof birthPlan.laborPreferences] === option}
                              onChange={(e) => handleInputChange('laborPreferences', category, e.target.value)}
                              className="text-[#F59297] focus:ring-[#F59297]"
                            />
                            <span className="ml-3 text-gray-700 dark:text-gray-300">{option}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t border-gray-200 dark:border-gray-600">
              <button
                onClick={prevStep}
                disabled={currentStep === 1}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  currentStep === 1
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                Previous
              </button>
              
              <div className="flex space-x-3">
                <button className="px-6 py-3 border border-[#F59297] text-[#F59297] rounded-lg font-medium hover:bg-[#F59297]/10 transition-all duration-200 flex items-center">
                  <Save className="w-4 h-4 mr-2" />
                  Save Progress
                </button>
                
                <button
                  onClick={nextStep}
                  disabled={currentStep === 5}
                  className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center ${
                    currentStep === 5
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-[#F59297] to-[#7da8e6] text-white hover:shadow-lg'
                  }`}
                >
                  {currentStep === 4 ? 'Review Plan' : 'Next Step'}
                  {currentStep < 4 && <span className="ml-2">→</span>}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
