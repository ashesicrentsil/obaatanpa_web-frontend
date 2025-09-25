'use client'

import { Brain, Calendar, Clock, ArrowRight } from 'lucide-react'

const SmartSuggestions = () => {
  const suggestions = [
    {
      id: 1,
      title: "Time for your 3rd Antenatal Visit",
      description: "You're 26 weeks pregnant - it's recommended to have your third antenatal checkup now.",
      urgency: 'recommended',
      dueDate: 'This week',
      icon: '🤰',
      action: 'Book Antenatal Checkup'
    },
    {
      id: 2,
      title: "Glucose Screening Test Due",
      description: "Between 24-28 weeks, you should have a glucose screening test to check for gestational diabetes.",
      urgency: 'important',
      dueDate: 'Within 2 weeks',
      icon: '🩸',
      action: 'Schedule Blood Test'
    },
    {
      id: 3,
      title: "Ultrasound Scan Recommended",
      description: "A growth scan around 28 weeks helps monitor your baby's development and position.",
      urgency: 'optional',
      dueDate: 'Next month',
      icon: '📱',
      action: 'Book Ultrasound'
    }
  ]

  const milestones = [
    {
      week: '28 weeks',
      title: 'Third Trimester Begins',
      tasks: ['Antenatal visit', 'Blood pressure check', 'Urine test'],
      status: 'upcoming'
    },
    {
      week: '32 weeks',
      title: 'Growth Monitoring',
      tasks: ['Ultrasound scan', 'Baby position check', 'Weight monitoring'],
      status: 'future'
    },
    {
      week: '36 weeks',
      title: 'Birth Preparation',
      tasks: ['Birth plan discussion', 'Hospital tour', 'Final preparations'],
      status: 'future'
    }
  ]

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'urgent': return 'border-red-500 bg-red-50 dark:bg-red-900/20'
      case 'important': return 'border-orange-500 bg-orange-50 dark:bg-orange-900/20'
      case 'recommended': return 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
      case 'optional': return 'border-green-500 bg-green-50 dark:bg-green-900/20'
      default: return 'border-gray-500 bg-gray-50 dark:bg-gray-900/20'
    }
  }

  const getUrgencyBadge = (urgency: string) => {
    switch (urgency) {
      case 'urgent': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
      case 'important': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400'
      case 'recommended': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
      case 'optional': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
    }
  }

  return (
    <section className="py-24 bg-gradient-to-br from-violet-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-cyan-900/10 relative overflow-hidden">
      {/* Floating background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-64 h-64 bg-violet-200/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-cyan-200/20 rounded-full blur-3xl animate-float-delayed"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16" data-aos="fade-up">
          <div className="inline-flex items-center bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full px-8 py-4 shadow-lg mb-8">
            <Brain className="w-8 h-8 text-[#F59297] mr-4" />
            <span className="text-[#F59297] font-bold text-lg">AI Health Assistant</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Smart Health
            <span className="bg-gradient-to-r from-violet-600 to-cyan-600 bg-clip-text text-transparent"> Suggestions</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Personalized recommendations powered by AI, tailored to your pregnancy journey and health milestones.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Personalized Suggestions */}
          <div data-aos="fade-up" data-aos-delay="200">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
              🎯 Personalized for You
            </h3>
            
            <div className="space-y-6">
              {suggestions.map((suggestion, index) => (
                <div
                  key={suggestion.id}
                  className={`group relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-l-8 ${getUrgencyColor(suggestion.urgency)}`}
                  data-aos="fade-up"
                  data-aos-delay={200 + (index * 150)}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center">
                      <span className="text-2xl mr-3">{suggestion.icon}</span>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                          {suggestion.title}
                        </h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getUrgencyBadge(suggestion.urgency)}`}>
                          {suggestion.urgency.charAt(0).toUpperCase() + suggestion.urgency.slice(1)}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-600 dark:text-gray-400">Due</div>
                      <div className="font-medium text-gray-900 dark:text-white">{suggestion.dueDate}</div>
                    </div>
                  </div>

                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    {suggestion.description}
                  </p>

                  <button className="inline-flex items-center px-4 py-2 bg-[#F59297] text-white rounded-lg hover:bg-[#e67d82] transition-colors duration-200 text-sm font-medium">
                    {suggestion.action}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </button>
                </div>
              ))}
            </div>

            {/* AI Assistant Note */}
            <div className="mt-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <Brain className="w-5 h-5 text-purple-600 dark:text-purple-400 mr-2" />
                <span className="font-semibold text-purple-800 dark:text-purple-200">AI Health Assistant</span>
              </div>
              <p className="text-sm text-purple-700 dark:text-purple-300">
                These suggestions are based on your pregnancy week, previous appointments, and medical guidelines. 
                Always consult with your healthcare provider for personalized advice.
              </p>
            </div>
          </div>

          {/* Pregnancy Milestones Timeline */}
          <div data-aos="fade-up" data-aos-delay="400">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
              📅 Upcoming Milestones
            </h3>

            <div className="space-y-6">
              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className="relative"
                  data-aos="fade-up"
                  data-aos-delay={400 + (index * 100)}
                >
                  {/* Timeline Line */}
                  {index < milestones.length - 1 && (
                    <div className="absolute left-6 top-12 w-0.5 h-16 bg-gray-200 dark:bg-gray-600"></div>
                  )}

                  <div className="flex items-start">
                    {/* Timeline Dot */}
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                      milestone.status === 'upcoming' 
                        ? 'bg-[#F59297]' 
                        : milestone.status === 'current'
                        ? 'bg-green-500'
                        : 'bg-gray-400'
                    }`}>
                      {milestone.week.split(' ')[0]}
                    </div>

                    {/* Content */}
                    <div className="ml-4 flex-1">
                      <div className="bg-white dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-gray-900 dark:text-white">
                            {milestone.title}
                          </h4>
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {milestone.week}
                          </span>
                        </div>

                        <div className="space-y-1">
                          {milestone.tasks.map((task, taskIndex) => (
                            <div key={taskIndex} className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                              <div className="w-1.5 h-1.5 bg-[#F59297] rounded-full mr-2"></div>
                              {task}
                            </div>
                          ))}
                        </div>

                        {milestone.status === 'upcoming' && (
                          <button className="mt-3 text-sm text-[#F59297] hover:text-[#e67d82] font-medium">
                            Schedule appointments →
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Progress Summary */}
            <div className="mt-8 bg-gradient-to-r from-[#F59297] to-[#7da8e6] rounded-lg p-6 text-white">
              <h4 className="font-bold text-lg mb-2">Your Progress</h4>
              <p className="text-sm opacity-90 mb-4">
                You're doing great! You've completed 8 out of 12 recommended appointments.
              </p>
              <div className="w-full bg-white/20 rounded-full h-2">
                <div className="bg-white h-2 rounded-full" style={{ width: '67%' }}></div>
              </div>
              <div className="flex justify-between text-sm mt-2 opacity-90">
                <span>67% Complete</span>
                <span>4 appointments remaining</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SmartSuggestions
