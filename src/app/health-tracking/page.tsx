'use client'

import { useState } from 'react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { Activity, Heart, Scale, Thermometer, Plus, TrendingUp, Calendar, Target } from 'lucide-react'

export default function HealthTrackingPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('week')
  const [activeMetric, setActiveMetric] = useState('weight')

  const periods = [
    { id: 'week', label: 'This Week' },
    { id: 'month', label: 'This Month' },
    { id: 'trimester', label: 'This Trimester' }
  ]

  const metrics = [
    {
      id: 'weight',
      title: 'Weight Tracking',
      icon: Scale,
      color: 'blue',
      value: '68.5 kg',
      change: '+2.3 kg',
      trend: 'up',
      target: '70-75 kg',
      description: 'Healthy weight gain for your trimester'
    },
    {
      id: 'blood_pressure',
      title: 'Blood Pressure',
      icon: Heart,
      color: 'red',
      value: '118/76',
      change: 'Normal',
      trend: 'stable',
      target: '<140/90',
      description: 'Within healthy range'
    },
    {
      id: 'baby_movement',
      title: 'Baby Movement',
      icon: Activity,
      color: 'green',
      value: '12 kicks',
      change: '+3 today',
      trend: 'up',
      target: '10+ daily',
      description: 'Active baby movements recorded'
    },
    {
      id: 'temperature',
      title: 'Body Temperature',
      icon: Thermometer,
      color: 'orange',
      value: '36.8°C',
      change: 'Normal',
      trend: 'stable',
      target: '36.1-37.2°C',
      description: 'Normal body temperature'
    }
  ]

  const recentEntries = [
    {
      date: '2024-01-15',
      time: '09:30 AM',
      metric: 'Weight',
      value: '68.5 kg',
      notes: 'Morning weight after breakfast'
    },
    {
      date: '2024-01-15',
      time: '02:15 PM',
      metric: 'Baby Movement',
      value: '8 kicks',
      notes: 'Active after lunch'
    },
    {
      date: '2024-01-14',
      time: '08:00 AM',
      metric: 'Blood Pressure',
      value: '115/74',
      notes: 'Morning reading'
    },
    {
      date: '2024-01-14',
      time: '07:45 AM',
      metric: 'Weight',
      value: '68.2 kg',
      notes: 'Daily morning weigh-in'
    }
  ]

  const weeklyGoals = [
    {
      title: 'Track weight 3x this week',
      progress: 2,
      target: 3,
      completed: false
    },
    {
      title: 'Monitor baby movements daily',
      progress: 5,
      target: 7,
      completed: false
    },
    {
      title: 'Record blood pressure 2x',
      progress: 2,
      target: 2,
      completed: true
    },
    {
      title: 'Take prenatal vitamins daily',
      progress: 7,
      target: 7,
      completed: true
    }
  ]

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-500 text-blue-500 border-blue-200',
      red: 'bg-red-500 text-red-500 border-red-200',
      green: 'bg-green-500 text-green-500 border-green-200',
      orange: 'bg-orange-500 text-orange-500 border-orange-200'
    }
    return colors[color as keyof typeof colors] || colors.blue
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-12 bg-gradient-to-br from-green-500 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Health Tracking
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
            Monitor your pregnancy progress and baby's development
          </p>
          <div className="flex items-center justify-center space-x-6 text-white/80">
            <div className="flex items-center space-x-2">
              <Activity className="w-5 h-5" />
              <span>Real-time Tracking</span>
            </div>
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5" />
              <span>Progress Insights</span>
            </div>
            <div className="flex items-center space-x-2">
              <Target className="w-5 h-5" />
              <span>Health Goals</span>
            </div>
          </div>
        </div>
      </section>

      {/* Period Selector */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center mb-8">
            <div className="inline-flex bg-white dark:bg-gray-800 rounded-2xl p-1 shadow-lg">
              {periods.map((period) => (
                <button
                  key={period.id}
                  onClick={() => setSelectedPeriod(period.id)}
                  className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                    selectedPeriod === period.id
                      ? 'bg-green-500 text-white shadow-md'
                      : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  {period.label}
                </button>
              ))}
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {metrics.map((metric) => {
              const IconComponent = metric.icon
              const colorClasses = getColorClasses(metric.color)
              
              return (
                <div
                  key={metric.id}
                  onClick={() => setActiveMetric(metric.id)}
                  className={`bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border-2 ${
                    activeMetric === metric.id ? `border-${metric.color}-200` : 'border-transparent'
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${colorClasses.split(' ')[0]}/10`}>
                      <IconComponent className={`w-6 h-6 ${colorClasses.split(' ')[1]}`} />
                    </div>
                    <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    {metric.title}
                  </h3>
                  
                  <div className="flex items-baseline space-x-2 mb-2">
                    <span className="text-2xl font-bold text-gray-900 dark:text-white">
                      {metric.value}
                    </span>
                    <span className={`text-sm font-medium ${
                      metric.trend === 'up' ? 'text-green-600' : 
                      metric.trend === 'down' ? 'text-red-600' : 'text-gray-500'
                    }`}>
                      {metric.change}
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    {metric.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500">Target: {metric.target}</span>
                    <TrendingUp className={`w-4 h-4 ${
                      metric.trend === 'up' ? 'text-green-500' : 
                      metric.trend === 'down' ? 'text-red-500' : 'text-gray-400'
                    }`} />
                  </div>
                </div>
              )
            })}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Chart Area */}
            <div className="lg:col-span-2">
              <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    {metrics.find(m => m.id === activeMetric)?.title} Trends
                  </h2>
                  <button className="text-green-600 hover:text-green-700 font-medium text-sm">
                    View Details
                  </button>
                </div>
                
                {/* Placeholder Chart */}
                <div className="h-64 bg-gray-50 dark:bg-gray-700 rounded-2xl flex items-center justify-center">
                  <div className="text-center">
                    <TrendingUp className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500 dark:text-gray-400">
                      Chart visualization coming soon
                    </p>
                    <p className="text-sm text-gray-400 dark:text-gray-500">
                      Track your {metrics.find(m => m.id === activeMetric)?.title.toLowerCase()} over time
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              
              {/* Weekly Goals */}
              <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                  Weekly Goals
                </h3>
                <div className="space-y-4">
                  {weeklyGoals.map((goal, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className={`text-sm font-medium ${
                          goal.completed ? 'text-green-600' : 'text-gray-700 dark:text-gray-300'
                        }`}>
                          {goal.title}
                        </span>
                        <span className="text-xs text-gray-500">
                          {goal.progress}/{goal.target}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all duration-300 ${
                            goal.completed ? 'bg-green-500' : 'bg-blue-500'
                          }`}
                          style={{ width: `${(goal.progress / goal.target) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Entries */}
              <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                  Recent Entries
                </h3>
                <div className="space-y-4">
                  {recentEntries.map((entry, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-xl">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium text-gray-900 dark:text-white">
                            {entry.metric}
                          </span>
                          <span className="text-xs text-gray-500">
                            {entry.time}
                          </span>
                        </div>
                        <p className="text-sm text-green-600 dark:text-green-400 mb-1">
                          {entry.value}
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          {entry.notes}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <button className="w-full mt-4 text-green-600 hover:text-green-700 font-medium text-sm">
                  View All Entries
                </button>
              </div>

              {/* Quick Add */}
              <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                  Quick Add Entry
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {metrics.map((metric) => {
                    const IconComponent = metric.icon
                    return (
                      <button
                        key={metric.id}
                        className="flex flex-col items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                      >
                        <IconComponent className="w-5 h-5 text-gray-600 dark:text-gray-400 mb-2" />
                        <span className="text-xs text-gray-600 dark:text-gray-400 text-center">
                          {metric.title.split(' ')[0]}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
