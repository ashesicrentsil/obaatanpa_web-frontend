'use client'

import { useState } from 'react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { Calendar, Users, Clock, TrendingUp, MessageCircle, AlertTriangle, CheckCircle, Star } from 'lucide-react'

export default function PractitionerDashboardPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('today')

  const periods = [
    { id: 'today', label: 'Today' },
    { id: 'week', label: 'This Week' },
    { id: 'month', label: 'This Month' }
  ]

  const stats = [
    {
      title: 'Total Patients',
      value: '156',
      change: '+12 this month',
      trend: 'up',
      icon: Users,
      color: 'blue'
    },
    {
      title: 'Today\'s Appointments',
      value: '8',
      change: '2 pending',
      trend: 'stable',
      icon: Calendar,
      color: 'green'
    },
    {
      title: 'Average Rating',
      value: '4.9',
      change: '+0.2 this month',
      trend: 'up',
      icon: Star,
      color: 'yellow'
    },
    {
      title: 'Response Time',
      value: '< 5 min',
      change: 'Excellent',
      trend: 'up',
      icon: Clock,
      color: 'purple'
    }
  ]

  const todaysSchedule = [
    {
      id: 1,
      time: '09:00 AM',
      patient: 'Akosua Mensah',
      type: 'Antenatal Check-up',
      status: 'confirmed',
      duration: '30 min',
      notes: '32 weeks pregnant, routine check'
    },
    {
      id: 2,
      time: '10:00 AM',
      patient: 'Ama Osei',
      type: 'Postpartum Follow-up',
      status: 'confirmed',
      duration: '20 min',
      notes: '2 weeks postpartum, breastfeeding support'
    },
    {
      id: 3,
      time: '11:30 AM',
      patient: 'Efua Boateng',
      type: 'First Antenatal Visit',
      status: 'pending',
      duration: '45 min',
      notes: '8 weeks pregnant, first pregnancy'
    },
    {
      id: 4,
      time: '02:00 PM',
      patient: 'Adwoa Asante',
      type: 'Ultrasound Review',
      status: 'confirmed',
      duration: '25 min',
      notes: '20 weeks scan results discussion'
    },
    {
      id: 5,
      time: '03:30 PM',
      patient: 'Yaa Amponsah',
      type: 'Birth Plan Discussion',
      status: 'confirmed',
      duration: '40 min',
      notes: '36 weeks, preparing for delivery'
    }
  ]

  const recentMessages = [
    {
      id: 1,
      patient: 'Akosua Mensah',
      message: 'I\'ve been experiencing some back pain. Is this normal at 32 weeks?',
      time: '2 hours ago',
      unread: true,
      urgent: false
    },
    {
      id: 2,
      patient: 'Ama Osei',
      message: 'Thank you for the breastfeeding tips! Baby is latching much better now.',
      time: '4 hours ago',
      unread: false,
      urgent: false
    },
    {
      id: 3,
      patient: 'Efua Boateng',
      message: 'I\'m having severe morning sickness. What can I do?',
      time: '6 hours ago',
      unread: true,
      urgent: true
    }
  ]

  const pendingTasks = [
    {
      id: 1,
      task: 'Review lab results for Akosua Mensah',
      priority: 'high',
      dueDate: 'Today',
      type: 'Lab Review'
    },
    {
      id: 2,
      task: 'Complete birth plan for Yaa Amponsah',
      priority: 'medium',
      dueDate: 'Tomorrow',
      type: 'Documentation'
    },
    {
      id: 3,
      task: 'Follow up on Ama Osei\'s postpartum recovery',
      priority: 'medium',
      dueDate: 'This week',
      type: 'Follow-up'
    },
    {
      id: 4,
      task: 'Update patient education materials',
      priority: 'low',
      dueDate: 'Next week',
      type: 'Administrative'
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
      case 'cancelled':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
      case 'low':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-12 bg-gradient-to-br from-[#F59297] to-[#7da8e6] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Practitioner Dashboard
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
              Manage your patients, appointments, and practice efficiently
            </p>
            
            {/* Period Selector */}
            <div className="flex justify-center">
              <div className="inline-flex bg-white/10 backdrop-blur-sm rounded-2xl p-1">
                {periods.map((period) => (
                  <button
                    key={period.id}
                    onClick={() => setSelectedPeriod(period.id)}
                    className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                      selectedPeriod === period.id
                        ? 'bg-white text-[#F59297] shadow-md'
                        : 'text-white/80 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {period.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon
              return (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                      stat.color === 'blue' ? 'bg-blue-100 dark:bg-blue-900' :
                      stat.color === 'green' ? 'bg-green-100 dark:bg-green-900' :
                      stat.color === 'yellow' ? 'bg-yellow-100 dark:bg-yellow-900' :
                      'bg-purple-100 dark:bg-purple-900'
                    }`}>
                      <IconComponent className={`w-6 h-6 ${
                        stat.color === 'blue' ? 'text-blue-600 dark:text-blue-400' :
                        stat.color === 'green' ? 'text-green-600 dark:text-green-400' :
                        stat.color === 'yellow' ? 'text-yellow-600 dark:text-yellow-400' :
                        'text-purple-600 dark:text-purple-400'
                      }`} />
                    </div>
                    <TrendingUp className={`w-4 h-4 ${
                      stat.trend === 'up' ? 'text-green-500' : 'text-gray-400'
                    }`} />
                  </div>
                  
                  <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                    {stat.title}
                  </h3>
                  
                  <div className="flex items-baseline space-x-2">
                    <span className="text-3xl font-bold text-gray-900 dark:text-white">
                      {stat.value}
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    {stat.change}
                  </p>
                </div>
              )
            })}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Today's Schedule */}
            <div className="lg:col-span-2">
              <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    Today's Schedule
                  </h2>
                  <button className="text-[#F59297] hover:text-[#e67d82] font-medium text-sm">
                    View All
                  </button>
                </div>
                
                <div className="space-y-4">
                  {todaysSchedule.map((appointment) => (
                    <div key={appointment.id} className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                      <div className="text-center min-w-0">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {appointment.time}
                        </div>
                        <div className="text-xs text-gray-500">
                          {appointment.duration}
                        </div>
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                            {appointment.patient}
                          </h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                            {appointment.status}
                          </span>
                        </div>
                        <p className="text-sm text-[#F59297] mb-1">
                          {appointment.type}
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          {appointment.notes}
                        </p>
                      </div>
                      
                      <div className="flex space-x-2">
                        <button className="p-2 text-gray-400 hover:text-[#F59297] rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                          <MessageCircle className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-[#7da8e6] rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                          <Calendar className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              
              {/* Recent Messages */}
              <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                  Recent Messages
                </h3>
                <div className="space-y-4">
                  {recentMessages.map((message) => (
                    <div key={message.id} className={`p-3 rounded-xl border-l-4 ${
                      message.urgent ? 'border-red-500 bg-red-50 dark:bg-red-900/20' : 
                      message.unread ? 'border-[#F59297] bg-[#F59297]/5' : 'border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700'
                    }`}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-900 dark:text-white text-sm">
                          {message.patient}
                        </span>
                        <span className="text-xs text-gray-500">
                          {message.time}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                        {message.message}
                      </p>
                      {message.urgent && (
                        <div className="flex items-center mt-2">
                          <AlertTriangle className="w-3 h-3 text-red-500 mr-1" />
                          <span className="text-xs text-red-600 dark:text-red-400 font-medium">Urgent</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                
                <button className="w-full mt-4 text-[#F59297] hover:text-[#e67d82] font-medium text-sm">
                  View All Messages
                </button>
              </div>

              {/* Pending Tasks */}
              <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                  Pending Tasks
                </h3>
                <div className="space-y-3">
                  {pendingTasks.map((task) => (
                    <div key={task.id} className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-xl">
                      <button className="w-4 h-4 border-2 border-gray-300 dark:border-gray-500 rounded mt-0.5 hover:border-[#F59297] transition-colors" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                            {task.priority}
                          </span>
                          <span className="text-xs text-gray-500">
                            {task.dueDate}
                          </span>
                        </div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {task.task}
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          {task.type}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <button className="w-full mt-4 text-[#7da8e6] hover:text-[#6b9ce6] font-medium text-sm">
                  View All Tasks
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
