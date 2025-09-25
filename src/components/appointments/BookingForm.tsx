'use client'

import { useState } from 'react'
import { Calendar, MapPin, User, CheckCircle } from 'lucide-react'

const BookingForm = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    visitType: '',
    hospital: '',
    date: '',
    time: '',
    practitioner: ''
  })

  const visitTypes = [
    {
      id: 'antenatal',
      title: 'Antenatal Checkup',
      description: 'Regular pregnancy monitoring and health checks',
      icon: '🤰',
      duration: '30-45 mins'
    },
    {
      id: 'ultrasound',
      title: 'Ultrasound Scan',
      description: 'Baby imaging and development monitoring',
      icon: '📱',
      duration: '20-30 mins'
    },
    {
      id: 'bloodtest',
      title: 'Blood Test',
      description: 'Laboratory tests and health screening',
      icon: '🩸',
      duration: '15-20 mins'
    },
    {
      id: 'delivery',
      title: 'Delivery Preparation',
      description: 'Birth planning and preparation consultation',
      icon: '👶',
      duration: '45-60 mins'
    },
    {
      id: 'postnatal',
      title: 'Postnatal Check',
      description: 'Post-delivery health monitoring',
      icon: '💖',
      duration: '30-45 mins'
    },
    {
      id: 'pediatric',
      title: 'Pediatric Visit',
      description: 'Baby and child health checkups',
      icon: '🍼',
      duration: '20-30 mins'
    }
  ]

  const hospitals = [
    {
      id: 'ridge',
      name: 'Ridge Hospital',
      address: 'Castle Road, Ridge, Accra',
      distance: '2.3 km',
      rating: 4.5,
      type: 'Government'
    },
    {
      id: 'korle-bu',
      name: 'Korle-Bu Teaching Hospital',
      address: 'Guggisberg Ave, Korle-Bu, Accra',
      distance: '4.1 km',
      rating: 4.3,
      type: 'Government'
    },
    {
      id: 'trust',
      name: 'Trust Hospital',
      address: 'Dzorwulu, Accra',
      distance: '3.7 km',
      rating: 4.7,
      type: 'Private'
    }
  ]

  const timeSlots = [
    '8:00 AM', '8:30 AM', '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM',
    '11:00 AM', '11:30 AM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM',
    '4:00 PM', '4:30 PM', '5:00 PM'
  ]

  const practitioners = [
    {
      id: 'adwoa',
      name: 'Midwife Adwoa Mensah',
      specialty: 'Antenatal Care',
      rating: 4.8,
      experience: '8 years'
    },
    {
      id: 'kwame',
      name: 'Dr. Kwame Asante',
      specialty: 'Obstetrics & Gynecology',
      rating: 4.9,
      experience: '12 years'
    },
    {
      id: 'ama',
      name: 'Nurse Ama Boateng',
      specialty: 'Postnatal Care',
      rating: 4.7,
      experience: '6 years'
    }
  ]

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1)
  }

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  const handleSubmit = () => {
    // Handle form submission
    console.log('Booking submitted:', formData)
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            {/* Treatment Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Treatment
              </label>
              <select
                value={formData.visitType}
                onChange={(e) => setFormData({...formData, visitType: e.target.value})}
                className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#F59297] focus:border-transparent appearance-none"
              >
                <option value="">Select treatment</option>
                {visitTypes.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Doctor Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Doctor
              </label>
              <select
                value={formData.practitioner}
                onChange={(e) => setFormData({...formData, practitioner: e.target.value})}
                className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#F59297] focus:border-transparent appearance-none"
              >
                <option value="">Select doctor</option>
                {practitioners.map((practitioner) => (
                  <option key={practitioner.id} value={practitioner.id}>
                    {practitioner.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Privacy Policy Notice */}
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-6">
              By submitting this form you are agreeing to our Privacy Policy
            </p>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            {/* Hospital Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Hospital
              </label>
              <select
                value={formData.hospital}
                onChange={(e) => setFormData({...formData, hospital: e.target.value})}
                className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#F59297] focus:border-transparent appearance-none"
              >
                <option value="">Select hospital</option>
                {hospitals.map((hospital) => (
                  <option key={hospital.id} value={hospital.id}>
                    {hospital.name} - {hospital.distance}
                  </option>
                ))}
              </select>
            </div>

            {/* Date Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Date
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
                className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#F59297] focus:border-transparent"
              />
            </div>

            {/* Time Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Time
              </label>
              <select
                value={formData.time}
                onChange={(e) => setFormData({...formData, time: e.target.value})}
                className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#F59297] focus:border-transparent appearance-none"
              >
                <option value="">Select time</option>
                {timeSlots.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            {/* Personal Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  First Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your first name"
                  className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#F59297] focus:border-transparent placeholder-gray-400 dark:placeholder-gray-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Last Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your last name"
                  className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#F59297] focus:border-transparent placeholder-gray-400 dark:placeholder-gray-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Phone Number
              </label>
              <input
                type="tel"
                placeholder="Enter your phone number"
                className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#F59297] focus:border-transparent placeholder-gray-400 dark:placeholder-gray-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Email Address
              </label>
              <input
                type="email"
                placeholder="Enter your email address"
                className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#F59297] focus:border-transparent placeholder-gray-400 dark:placeholder-gray-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Additional Notes (Optional)
              </label>
              <textarea
                rows={4}
                placeholder="Any additional information or special requirements..."
                className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#F59297] focus:border-transparent placeholder-gray-400 dark:placeholder-gray-500 resize-none"
              />
            </div>
          </div>
        )

      case 4:
        return (
          <div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Confirm Your Appointment
            </h3>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 mb-6">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Appointment Summary</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Visit Type:</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {visitTypes.find(v => v.id === formData.visitType)?.title}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Hospital:</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {hospitals.find(h => h.id === formData.hospital)?.name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Date & Time:</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {formData.date} at {formData.time}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Practitioner:</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {formData.practitioner 
                      ? practitioners.find(p => p.id === formData.practitioner)?.name
                      : 'Any Available'
                    }
                  </span>
                </div>
              </div>
            </div>
            
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-6">
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mr-2" />
                <span className="text-sm text-green-800 dark:text-green-200">
                  Your appointment will be confirmed within 2 hours
                </span>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              className="w-full bg-[#F59297] text-white py-4 rounded-lg font-semibold hover:bg-[#e67d82] transition-colors duration-200"
            >
              Confirm & Book Appointment
            </button>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Clean Header */}
        <div className="mb-8" data-aos="fade-up">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Book Appointment
          </h2>

          {/* Simple Progress Indicator */}
          <div className="flex items-center space-x-2 mb-6">
            {['Service', 'Time', 'Details', 'Done'].map((label, index) => (
              <div key={label} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  index + 1 < currentStep
                    ? 'bg-[#F59297] text-white'
                    : index + 1 === currentStep
                    ? 'bg-[#F59297] text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                }`}>
                  {index + 1 < currentStep ? '●' : index + 1}
                </div>
                <span className={`ml-2 text-sm font-medium ${
                  index + 1 <= currentStep
                    ? 'text-gray-900 dark:text-white'
                    : 'text-gray-500 dark:text-gray-400'
                }`}>
                  {label}
                </span>
                {index < 3 && (
                  <div className={`w-12 h-px mx-4 ${
                    index + 1 < currentStep ? 'bg-[#F59297]' : 'bg-gray-200 dark:bg-gray-700'
                  }`}></div>
                )}
              </div>
            ))}
          </div>

          {/* Step Description */}
          <p className="text-gray-600 dark:text-gray-300">
            {currentStep === 1 ? 'Please select service:' :
             currentStep === 2 ? 'Choose hospital and time:' :
             currentStep === 3 ? 'Enter your details:' :
             'Confirm your appointment:'}
          </p>
        </div>

        {/* Clean White Form Card */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-8" data-aos="fade-up" data-aos-delay="200">
          {renderStep()}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-12 pt-6 border-t border-gray-100 dark:border-gray-700">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className="px-8 py-3 text-gray-600 dark:text-gray-400 font-medium rounded-full border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>

            {currentStep < 4 && (
              <button
                onClick={nextStep}
                disabled={
                  (currentStep === 1 && !formData.visitType) ||
                  (currentStep === 2 && (!formData.hospital || !formData.date || !formData.time))
                }
                className="px-8 py-3 bg-teal-600 text-white font-medium rounded-full hover:bg-teal-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
              >
                Next
              </button>
            )}

            {currentStep === 4 && (
              <button
                onClick={handleSubmit}
                className="px-8 py-3 bg-teal-600 text-white font-medium rounded-full hover:bg-teal-700 transition-all duration-200 shadow-sm"
              >
                Confirm Appointment
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default BookingForm
