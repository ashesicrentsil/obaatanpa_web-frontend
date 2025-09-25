'use client'

import { useState } from 'react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { Video, MessageCircle, Phone, Clock, Star, Calendar, CheckCircle, Users, Heart } from 'lucide-react'

export default function ConsultationsPage() {
  const [selectedType, setSelectedType] = useState('video')

  const consultationTypes = [
    {
      id: 'video',
      title: 'Video Consultation',
      icon: Video,
      duration: '30-45 minutes',
      price: 'GHS 150',
      description: 'Face-to-face consultation with certified healthcare professionals',
      features: ['HD video quality', 'Screen sharing', 'Recording available', 'Prescription delivery']
    },
    {
      id: 'chat',
      title: 'Chat Consultation',
      icon: MessageCircle,
      duration: '24/7 availability',
      price: 'GHS 50',
      description: 'Text-based consultation for quick questions and ongoing support',
      features: ['Instant messaging', 'Photo sharing', 'Quick responses', 'Follow-up included']
    },
    {
      id: 'phone',
      title: 'Phone Consultation',
      icon: Phone,
      duration: '20-30 minutes',
      price: 'GHS 100',
      description: 'Voice consultation for urgent matters and detailed discussions',
      features: ['Clear audio quality', 'Call recording', 'Emergency support', 'Flexible scheduling']
    }
  ]

  const experts = [
    {
      id: 1,
      name: 'Dr. Akosua Mensah',
      title: 'Obstetrician & Gynecologist',
      specialization: 'High-risk pregnancies, Prenatal care',
      experience: '15 years',
      rating: 4.9,
      reviews: 234,
      languages: ['English', 'Twi', 'Ga'],
      availability: 'Available today',
      price: 'GHS 200/session',
      image: '/images/experts/dr-akosua-mensah.jpg',
      verified: true
    },
    {
      id: 2,
      name: 'Dr. Kwame Asante',
      title: 'Pediatrician',
      specialization: 'Newborn care, Child development',
      experience: '12 years',
      rating: 4.8,
      reviews: 189,
      languages: ['English', 'Twi'],
      availability: 'Available tomorrow',
      price: 'GHS 150/session',
      image: '/images/experts/dr-kwame-asante.jpg',
      verified: true
    },
    {
      id: 3,
      name: 'Nurse Ama Osei',
      title: 'Certified Midwife',
      specialization: 'Natural birth, Breastfeeding support',
      experience: '18 years',
      rating: 4.9,
      reviews: 312,
      languages: ['English', 'Twi', 'Fante'],
      availability: 'Available now',
      price: 'GHS 120/session',
      image: '/images/experts/nurse-ama-osei.jpg',
      verified: true
    },
    {
      id: 4,
      name: 'Dr. Efua Boateng',
      title: 'Lactation Consultant',
      specialization: 'Breastfeeding, Postpartum care',
      experience: '10 years',
      rating: 4.7,
      reviews: 156,
      languages: ['English', 'Twi'],
      availability: 'Available in 2 hours',
      price: 'GHS 100/session',
      image: '/images/experts/dr-efua-boateng.jpg',
      verified: true
    }
  ]

  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM', '04:00 PM'
  ]

  const features = [
    {
      icon: CheckCircle,
      title: 'Certified Professionals',
      description: 'All our healthcare providers are licensed and verified'
    },
    {
      icon: Clock,
      title: '24/7 Support',
      description: 'Get help when you need it, day or night'
    },
    {
      icon: Heart,
      title: 'Personalized Care',
      description: 'Tailored advice based on your specific needs'
    },
    {
      icon: Users,
      title: 'Cultural Understanding',
      description: 'Healthcare providers who understand Ghanaian culture'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-[#F59297] to-[#7da8e6] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Expert Consultations
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-4xl mx-auto leading-relaxed">
              Connect with certified healthcare professionals for personalized maternal care guidance, anytime, anywhere.
            </p>
            <div className="flex items-center justify-center space-x-8 text-white/80">
              <div className="text-center">
                <div className="text-2xl font-bold">50+</div>
                <div className="text-sm">Expert Doctors</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">24/7</div>
                <div className="text-sm">Availability</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">4.9★</div>
                <div className="text-sm">Average Rating</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Consultation Types */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Choose Your Consultation Type
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Select the consultation method that works best for you and your schedule
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {consultationTypes.map((type) => {
              const IconComponent = type.icon
              return (
                <div
                  key={type.id}
                  onClick={() => setSelectedType(type.id)}
                  className={`bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border-2 ${
                    selectedType === type.id ? 'border-[#F59297] ring-4 ring-[#F59297]/20' : 'border-transparent'
                  }`}
                >
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 ${
                    selectedType === type.id ? 'bg-[#F59297] text-white' : 'bg-[#F59297]/10 text-[#F59297]'
                  }`}>
                    <IconComponent className="w-8 h-8" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 text-center">
                    {type.title}
                  </h3>
                  
                  <div className="text-center mb-4">
                    <div className="text-2xl font-bold text-[#F59297] mb-1">{type.price}</div>
                    <div className="text-sm text-gray-500">{type.duration}</div>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-6 text-center">
                    {type.description}
                  </p>
                  
                  <ul className="space-y-2">
                    {type.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <button className={`w-full mt-6 py-3 rounded-2xl font-semibold transition-all duration-200 ${
                    selectedType === type.id
                      ? 'bg-[#F59297] text-white hover:bg-[#e67d82]'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}>
                    {selectedType === type.id ? 'Selected' : 'Select'}
                  </button>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Available Experts */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Our Expert Healthcare Providers
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Choose from our team of certified professionals specializing in maternal and child health
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {experts.map((expert) => (
              <div key={expert.id} className="bg-gray-50 dark:bg-gray-700 rounded-3xl p-8 hover:shadow-lg transition-all duration-300">
                <div className="flex items-start space-x-6">
                  <div className="w-20 h-20 bg-gradient-to-r from-[#F59297] to-[#7da8e6] rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xl font-bold">
                      {expert.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        {expert.name}
                      </h3>
                      {expert.verified && (
                        <CheckCircle className="w-5 h-5 text-blue-500" />
                      )}
                    </div>
                    
                    <p className="text-[#F59297] font-semibold mb-2">
                      {expert.title}
                    </p>
                    
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                      {expert.specialization}
                    </p>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 mr-1" />
                        {expert.rating} ({expert.reviews} reviews)
                      </div>
                      <div>{expert.experience} experience</div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {expert.languages.map((lang, index) => (
                        <span key={index} className="px-2 py-1 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 text-xs rounded-lg">
                          {lang}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-lg font-bold text-[#7da8e6]">{expert.price}</div>
                        <div className="text-sm text-green-600">{expert.availability}</div>
                      </div>
                      
                      <button className="bg-gradient-to-r from-[#F59297] to-[#7da8e6] text-white px-6 py-2 rounded-2xl font-semibold hover:shadow-lg transition-all duration-200">
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              Book Your Consultation
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Booking Form */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                  Select Date & Time
                </h3>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#F59297] focus:border-transparent dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Available Time Slots
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {timeSlots.map((time, index) => (
                        <button
                          key={index}
                          className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:border-[#F59297] hover:bg-[#F59297]/10 transition-colors text-gray-700 dark:text-gray-300"
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Reason for Consultation
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Please describe your concerns or questions..."
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#F59297] focus:border-transparent dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                </div>
              </div>
              
              {/* Booking Summary */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                  Consultation Summary
                </h3>
                
                <div className="bg-gray-50 dark:bg-gray-700 rounded-2xl p-6 space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Consultation Type:</span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {consultationTypes.find(t => t.id === selectedType)?.title}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Duration:</span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {consultationTypes.find(t => t.id === selectedType)?.duration}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Price:</span>
                    <span className="font-semibold text-[#F59297]">
                      {consultationTypes.find(t => t.id === selectedType)?.price}
                    </span>
                  </div>
                  
                  <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
                    <div className="flex justify-between text-lg font-bold">
                      <span className="text-gray-900 dark:text-white">Total:</span>
                      <span className="text-[#F59297]">
                        {consultationTypes.find(t => t.id === selectedType)?.price}
                      </span>
                    </div>
                  </div>
                </div>
                
                <button className="w-full mt-6 bg-gradient-to-r from-[#F59297] to-[#7da8e6] text-white py-4 rounded-2xl font-bold text-lg hover:shadow-lg transition-all duration-200">
                  Confirm Booking
                </button>
                
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-4">
                  You can reschedule or cancel up to 24 hours before your appointment
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Why Choose Our Consultations?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-[#F59297]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <IconComponent className="w-8 h-8 text-[#F59297]" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {feature.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
