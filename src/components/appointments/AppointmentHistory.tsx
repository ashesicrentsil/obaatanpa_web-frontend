'use client'

import { useState } from 'react'
import { History, Calendar, CheckCircle, XCircle, FileText, Download, Plus, Star } from 'lucide-react'

const AppointmentHistory = () => {
  const [filter, setFilter] = useState('all')
  const [showNotes, setShowNotes] = useState<number | null>(null)

  const appointmentHistory = [
    {
      id: 1,
      title: 'Antenatal Checkup',
      date: 'June 15, 2025',
      time: '10:00 AM',
      location: 'Ridge Hospital, Accra',
      practitioner: 'Midwife Adwoa Mensah',
      status: 'attended',
      type: 'Antenatal',
      notes: 'Blood pressure normal (120/80). Baby heartbeat strong. Weight gain on track. Next appointment in 4 weeks.',
      doctorNotes: 'Patient doing well. Continue current prenatal vitamins. Recommend light exercise.',
      personalNotes: 'Felt baby kick during examination. Asked about sleeping positions.',
      rating: 5
    },
    {
      id: 2,
      title: 'Blood Test',
      date: 'June 8, 2025',
      time: '8:30 AM',
      location: 'Nyaho Medical Centre',
      practitioner: 'Lab Technician',
      status: 'attended',
      type: 'Laboratory',
      notes: 'Glucose test results normal. Iron levels slightly low - prescribed supplements.',
      doctorNotes: 'All tests within normal range except iron. Start iron supplements 65mg daily.',
      personalNotes: 'Fasted for 12 hours as instructed. Results explained clearly.',
      rating: 4
    },
    {
      id: 3,
      title: 'Ultrasound Scan',
      date: 'May 25, 2025',
      time: '2:30 PM',
      location: 'Trust Hospital, Dzorwulu',
      practitioner: 'Dr. Kwame Asante',
      status: 'attended',
      type: 'Scan',
      notes: 'Baby development normal for 22 weeks. All organs developing well. Gender revealed.',
      doctorNotes: 'Fetal growth appropriate for gestational age. No abnormalities detected.',
      personalNotes: 'So excited to see baby! Got beautiful scan photos. It\'s a girl!',
      rating: 5
    },
    {
      id: 4,
      title: 'Antenatal Checkup',
      date: 'May 10, 2025',
      time: '11:00 AM',
      location: 'Ridge Hospital, Accra',
      practitioner: 'Midwife Adwoa Mensah',
      status: 'missed',
      type: 'Antenatal',
      notes: 'Appointment missed due to emergency at work. Rescheduled for following week.',
      doctorNotes: '',
      personalNotes: 'Had to miss due to work emergency. Felt bad about missing.',
      rating: 0
    },
    {
      id: 5,
      title: 'First Antenatal Visit',
      date: 'April 20, 2025',
      time: '9:00 AM',
      location: 'Ridge Hospital, Accra',
      practitioner: 'Midwife Adwoa Mensah',
      status: 'attended',
      type: 'Antenatal',
      notes: 'Initial pregnancy confirmation and health assessment. Due date calculated.',
      doctorNotes: 'Pregnancy confirmed. EDD: January 15, 2026. Start prenatal vitamins.',
      personalNotes: 'First official appointment! So nervous but excited. Midwife was very kind.',
      rating: 5
    }
  ]

  const filteredHistory = appointmentHistory.filter(appointment => {
    if (filter === 'all') return true
    return appointment.status === filter
  })

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'attended':
        return <CheckCircle className="w-5 h-5 text-green-600" />
      case 'missed':
        return <XCircle className="w-5 h-5 text-red-600" />
      default:
        return <Calendar className="w-5 h-5 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'attended':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
      case 'missed':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
    }
  }

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ))
  }

  return (
    <section className="py-24 bg-gradient-to-br from-amber-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-orange-900/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16" data-aos="fade-up">
          <div className="inline-flex items-center bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full px-8 py-4 shadow-lg mb-8">
            <History className="w-8 h-8 text-[#F59297] mr-4" />
            <span className="text-[#F59297] font-bold text-lg">Health Journey</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Your Health
            <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent"> History</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Track your progress, review past appointments, and celebrate your health milestones.
          </p>
        </div>

        {/* Filter Tabs - Modern Pills */}
        <div className="flex items-center justify-center mb-12" data-aos="fade-up" data-aos-delay="200">
          <div className="flex bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-2 shadow-lg border border-white/20 dark:border-gray-700/20">
            <button
              onClick={() => setFilter('all')}
              className={`px-8 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                filter === 'all'
                  ? 'bg-gradient-to-r from-[#F59297] to-[#e67d82] text-white shadow-lg transform scale-105'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700/50'
              }`}
            >
              All Appointments ({appointmentHistory.length})
            </button>
            <button
              onClick={() => setFilter('attended')}
              className={`px-8 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                filter === 'attended'
                  ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg transform scale-105'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700/50'
              }`}
            >
              ✅ Attended ({appointmentHistory.filter(a => a.status === 'attended').length})
            </button>
            <button
              onClick={() => setFilter('missed')}
              className={`px-8 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                filter === 'missed'
                  ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg transform scale-105'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700/50'
              }`}
            >
              ❌ Missed ({appointmentHistory.filter(a => a.status === 'missed').length})
            </button>
          </div>
        </div>

        {/* History List */}
        <div className="space-y-6">
          {filteredHistory.map((appointment, index) => (
            <div
              key={appointment.id}
              className="bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 p-6 shadow-sm hover:shadow-md transition-all duration-200"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start">
                  <div className="mr-4 mt-1">
                    {getStatusIcon(appointment.status)}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {appointment.title}
                    </h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400 mb-2">
                      <span>📅 {appointment.date}</span>
                      <span>🕐 {appointment.time}</span>
                      <span>📍 {appointment.location}</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(appointment.status)}`}>
                        {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                      </span>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        👩‍⚕️ {appointment.practitioner}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  {appointment.status === 'attended' && appointment.rating > 0 && (
                    <div className="flex items-center">
                      {renderStars(appointment.rating)}
                    </div>
                  )}
                  <button
                    onClick={() => setShowNotes(showNotes === appointment.id ? null : appointment.id)}
                    className="p-2 text-gray-400 hover:text-[#F59297] transition-colors"
                  >
                    <FileText className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Quick Summary */}
              <div className="bg-gray-50 dark:bg-gray-600 rounded-lg p-4 mb-4">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {appointment.notes}
                </p>
              </div>

              {/* Detailed Notes */}
              {showNotes === appointment.id && (
                <div className="space-y-4 border-t border-gray-200 dark:border-gray-600 pt-4">
                  {appointment.doctorNotes && (
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
                        👩‍⚕️ Doctor's Notes
                      </h4>
                      <p className="text-sm text-gray-700 dark:text-gray-300 bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                        {appointment.doctorNotes}
                      </p>
                    </div>
                  )}

                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
                      📝 Personal Notes
                    </h4>
                    <div className="bg-pink-50 dark:bg-pink-900/20 p-3 rounded-lg">
                      <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                        {appointment.personalNotes}
                      </p>
                      <button className="text-sm text-[#F59297] hover:text-[#e67d82] font-medium flex items-center">
                        <Plus className="w-4 h-4 mr-1" />
                        Add more notes
                      </button>
                    </div>
                  </div>

                  {appointment.status === 'attended' && (
                    <div className="flex items-center justify-between pt-2">
                      <button className="text-sm text-gray-600 dark:text-gray-400 hover:text-[#F59297] flex items-center">
                        <Download className="w-4 h-4 mr-1" />
                        Download Summary
                      </button>
                      {appointment.rating === 0 && (
                        <button className="text-sm text-[#F59297] hover:text-[#e67d82] font-medium">
                          Rate this visit
                        </button>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Summary Stats */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6" data-aos="fade-up" data-aos-delay="400">
          <div className="text-center p-6 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
              {appointmentHistory.filter(a => a.status === 'attended').length}
            </div>
            <div className="text-sm text-green-700 dark:text-green-300">Appointments Attended</div>
          </div>
          <div className="text-center p-6 bg-red-50 dark:bg-red-900/20 rounded-lg">
            <div className="text-3xl font-bold text-red-600 dark:text-red-400 mb-2">
              {appointmentHistory.filter(a => a.status === 'missed').length}
            </div>
            <div className="text-sm text-red-700 dark:text-red-300">Appointments Missed</div>
          </div>
          <div className="text-center p-6 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
            <div className="text-3xl font-bold text-yellow-600 dark:text-yellow-400 mb-2">
              {(appointmentHistory.filter(a => a.status === 'attended' && a.rating > 0).reduce((sum, a) => sum + a.rating, 0) / 
                appointmentHistory.filter(a => a.status === 'attended' && a.rating > 0).length || 0).toFixed(1)}
            </div>
            <div className="text-sm text-yellow-700 dark:text-yellow-300">Average Rating</div>
          </div>
          <div className="text-center p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">24</div>
            <div className="text-sm text-blue-700 dark:text-blue-300">Weeks Pregnant</div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AppointmentHistory
