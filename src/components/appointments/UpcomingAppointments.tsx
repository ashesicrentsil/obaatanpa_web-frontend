'use client'

import { Calendar, Clock, MapPin, User, FileText, Navigation, X, Edit } from 'lucide-react'

const UpcomingAppointments = () => {
  const upcomingAppointments = [
    {
      id: 1,
      title: 'Antenatal Checkup',
      date: 'Monday, July 1, 2025',
      time: '10:00 AM',
      location: 'Ridge Hospital, Accra',
      practitioner: 'Midwife Adwoa Mensah',
      type: 'Physical visit',
      notes: 'Bring blood test results',
      status: 'upcoming',
      color: 'blue'
    },
    {
      id: 2,
      title: 'Ultrasound Scan',
      date: 'Friday, July 5, 2025',
      time: '2:30 PM',
      location: 'Trust Hospital, Dzorwulu',
      practitioner: 'Dr. Kwame Asante',
      type: 'Scan appointment',
      notes: 'Drink water 1 hour before',
      status: 'upcoming',
      color: 'purple'
    },
    {
      id: 3,
      title: 'Blood Test',
      date: 'Wednesday, July 10, 2025',
      time: '8:00 AM',
      location: 'Nyaho Medical Centre',
      practitioner: 'Lab Technician',
      type: 'Laboratory test',
      notes: 'Fasting required - no food 12 hours before',
      status: 'upcoming',
      color: 'green'
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
      case 'missed': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
      case 'completed': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
    }
  }

  const getCardBorderColor = (color: string) => {
    switch (color) {
      case 'blue': return 'border-l-blue-500'
      case 'purple': return 'border-l-purple-500'
      case 'green': return 'border-l-green-500'
      case 'red': return 'border-l-red-500'
      default: return 'border-l-gray-500'
    }
  }

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900/20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16" data-aos="fade-up">
          <div className="inline-flex items-center bg-white dark:bg-gray-800 rounded-full px-6 py-3 shadow-lg mb-6">
            <Calendar className="w-6 h-6 text-[#F59297] mr-3" />
            <span className="text-[#F59297] font-semibold">Next Appointments</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Your Healthcare Schedule
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Stay on top of your health journey with upcoming appointments
          </p>
        </div>

        {/* Appointments List */}
        <div className="grid gap-8">
          {upcomingAppointments.map((appointment, index) => (
            <div
              key={appointment.id}
              className="group relative bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700"
              data-aos="fade-up"
              data-aos-delay={index * 150}
            >
              {/* Decorative gradient overlay */}
              <div className={`absolute inset-0 bg-gradient-to-r ${
                appointment.color === 'blue' ? 'from-blue-500/5 to-purple-500/5' :
                appointment.color === 'purple' ? 'from-purple-500/5 to-pink-500/5' :
                'from-green-500/5 to-blue-500/5'
              } rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
              <div className="relative z-10">
                {/* Header with floating status */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-2xl ${
                      appointment.color === 'blue' ? 'bg-blue-100 dark:bg-blue-900/30' :
                      appointment.color === 'purple' ? 'bg-purple-100 dark:bg-purple-900/30' :
                      'bg-green-100 dark:bg-green-900/30'
                    } mr-4`}>
                      {appointment.color === 'blue' ? '🤰' : appointment.color === 'purple' ? '📱' : '🩸'}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        {appointment.title}
                      </h3>
                      <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(appointment.status)} shadow-sm`}>
                        <div className="w-2 h-2 bg-current rounded-full mr-2 animate-pulse"></div>
                        {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Next appointment</div>
                    <div className="text-lg font-bold text-gray-900 dark:text-white">{appointment.date.split(',')[0]}</div>
                  </div>
                </div>

                {/* Appointment Details - Modern Card Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-2xl p-4">
                    <div className="flex items-center mb-2">
                      <Calendar className="w-5 h-5 text-[#F59297] mr-2" />
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Date & Time</span>
                    </div>
                    <div className="font-semibold text-gray-900 dark:text-white">{appointment.date}</div>
                    <div className="text-[#F59297] font-medium">{appointment.time}</div>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-2xl p-4">
                    <div className="flex items-center mb-2">
                      <MapPin className="w-5 h-5 text-[#F59297] mr-2" />
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Location</span>
                    </div>
                    <div className="font-semibold text-gray-900 dark:text-white">{appointment.location}</div>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-2xl p-4">
                    <div className="flex items-center mb-2">
                      <User className="w-5 h-5 text-[#F59297] mr-2" />
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Practitioner</span>
                    </div>
                    <div className="font-semibold text-gray-900 dark:text-white">{appointment.practitioner}</div>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-2xl p-4">
                    <div className="flex items-center mb-2">
                      <FileText className="w-5 h-5 text-[#F59297] mr-2" />
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Type</span>
                    </div>
                    <div className="font-semibold text-gray-900 dark:text-white">{appointment.type}</div>
                  </div>
                </div>

                {/* Notes Section */}
                {appointment.notes && (
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-4 mb-6">
                    <div className="flex items-center mb-2">
                      <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2" />
                      <span className="text-sm font-medium text-blue-800 dark:text-blue-300">Important Notes</span>
                    </div>
                    <p className="text-blue-700 dark:text-blue-200">{appointment.notes}</p>
                  </div>
                )}

                {/* Action Buttons - Modern Design */}
                <div className="flex flex-wrap gap-3">
                  <button className="flex-1 min-w-[140px] flex items-center justify-center px-6 py-3 bg-gradient-to-r from-[#F59297] to-[#e67d82] text-white rounded-xl hover:from-[#e67d82] hover:to-[#d66b70] transition-all duration-300 text-sm font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                    <Edit className="w-4 h-4 mr-2" />
                    Reschedule
                  </button>

                  <button className="flex-1 min-w-[140px] flex items-center justify-center px-6 py-3 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-2 border-gray-200 dark:border-gray-600 rounded-xl hover:border-[#F59297] hover:text-[#F59297] transition-all duration-300 text-sm font-semibold">
                    <Navigation className="w-4 h-4 mr-2" />
                    Directions
                  </button>

                  <button className="flex items-center justify-center px-6 py-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border-2 border-red-200 dark:border-red-800 rounded-xl hover:bg-red-100 dark:hover:bg-red-900/30 transition-all duration-300 text-sm font-semibold">
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Appointments State */}
        {upcomingAppointments.length === 0 && (
          <div className="text-center py-12" data-aos="fade-up">
            <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
              No Upcoming Appointments
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              You don't have any scheduled appointments. Book your next checkup to stay on track.
            </p>
            <button className="bg-[#F59297] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#e67d82] transition-colors duration-200">
              📅 Book Your First Appointment
            </button>
          </div>
        )}

        {/* Quick Actions */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6" data-aos="fade-up" data-aos-delay="400">
          <div className="text-center p-6 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="text-3xl mb-3">📱</div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Mobile Check-in</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Check in for your appointment from your phone
            </p>
          </div>
          <div className="text-center p-6 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="text-3xl mb-3">📅</div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Calendar Sync</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Add appointments to your Google Calendar
            </p>
          </div>
          <div className="text-center p-6 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="text-3xl mb-3">📄</div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Download Summary</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Get a PDF summary of your appointments
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default UpcomingAppointments
