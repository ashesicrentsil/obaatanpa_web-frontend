'use client'

import { Calendar, Plus, Clock, CheckCircle } from 'lucide-react'

const BookingCTA = () => {
  const benefits = [
    {
      icon: '⚡',
      title: 'Quick Booking',
      description: 'Book in under 2 minutes'
    },
    {
      icon: '🏥',
      title: 'Trusted Providers',
      description: 'Only verified healthcare professionals'
    },
    {
      icon: '📱',
      title: 'Smart Reminders',
      description: 'Never miss an appointment again'
    },
    {
      icon: '💳',
      title: 'Easy Payment',
      description: 'Secure online payment options'
    }
  ]

  return (
    <section className="py-24 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center" data-aos="fade-up">
          {/* Main CTA */}
          <div className="mb-16">
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 mb-8">
              <Calendar className="w-6 h-6 mr-3 text-pink-300" />
              <span className="text-pink-200 font-semibold">Easy Booking</span>
            </div>

            <h2 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-white via-pink-200 to-blue-200 bg-clip-text text-transparent">
              Book Your Next
              <br />Appointment
            </h2>

            <p className="text-xl md:text-2xl mb-12 opacity-90 max-w-4xl mx-auto leading-relaxed">
              Take control of your health journey with our streamlined booking system.
              Connect with trusted healthcare providers in just a few clicks.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <button className="group relative inline-flex items-center justify-center px-12 py-5 bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl text-lg font-bold hover:from-pink-600 hover:to-purple-700 transition-all duration-300 shadow-2xl hover:shadow-pink-500/25 transform hover:-translate-y-2 hover:scale-105">
                <Plus className="w-6 h-6 mr-3 group-hover:rotate-90 transition-transform duration-300" />
                Start Booking Now
                <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-purple-500 rounded-2xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
              </button>

              <button className="inline-flex items-center justify-center px-8 py-5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-lg font-semibold hover:bg-white/20 transition-all duration-300">
                <Clock className="w-5 h-5 mr-3" />
                View Available Times
              </button>
            </div>
          </div>

          {/* Benefits Grid - Floating Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8" data-aos="fade-up" data-aos-delay="200">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="group relative bg-white/10 backdrop-blur-md rounded-3xl p-8 text-center border border-white/20 hover:bg-white/20 transition-all duration-500 transform hover:-translate-y-4 hover:rotate-1"
                data-aos="fade-up"
                data-aos-delay={200 + (index * 150)}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="text-5xl mb-6 transform group-hover:scale-110 transition-transform duration-300">{benefit.icon}</div>
                  <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                  <p className="text-sm opacity-90 leading-relaxed">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Process Steps */}
          <div className="mt-16" data-aos="fade-up" data-aos-delay="400">
            <h3 className="text-2xl font-bold mb-8">How It Works</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-white text-[#F59297] rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-4">
                  1
                </div>
                <h4 className="font-semibold mb-2">Choose Visit Type</h4>
                <p className="text-sm opacity-90">Select from antenatal, ultrasound, blood test, or consultation</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-white text-[#F59297] rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-4">
                  2
                </div>
                <h4 className="font-semibold mb-2">Pick Hospital</h4>
                <p className="text-sm opacity-90">Choose from nearby trusted healthcare providers</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-white text-[#F59297] rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-4">
                  3
                </div>
                <h4 className="font-semibold mb-2">Select Date & Time</h4>
                <p className="text-sm opacity-90">Pick a convenient time that works for you</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-white text-[#F59297] rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-4">
                  4
                </div>
                <h4 className="font-semibold mb-2">Confirm & Pay</h4>
                <p className="text-sm opacity-90">Review details and secure your appointment</p>
              </div>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8" data-aos="fade-up" data-aos-delay="600">
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">2,000+</div>
              <div className="text-sm opacity-90">Appointments Booked</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">50+</div>
              <div className="text-sm opacity-90">Partner Hospitals</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">4.9★</div>
              <div className="text-sm opacity-90">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">24/7</div>
              <div className="text-sm opacity-90">Support Available</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BookingCTA
