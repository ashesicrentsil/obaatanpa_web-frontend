'use client'

import { useState } from 'react'
import { Bell, Smartphone, MessageSquare, Mail, Settings } from 'lucide-react'

const AppointmentReminders = () => {
  const [reminderSettings, setReminderSettings] = useState({
    enabled: true,
    timing: {
      oneDay: true,
      oneHour: true,
      thirtyMinutes: false
    },
    methods: {
      push: true,
      sms: false,
      whatsapp: true,
      email: false
    }
  })

  const handleTimingChange = (timing: string) => {
    setReminderSettings(prev => ({
      ...prev,
      timing: {
        ...prev.timing,
        [timing]: !prev.timing[timing as keyof typeof prev.timing]
      }
    }))
  }

  const handleMethodChange = (method: string) => {
    setReminderSettings(prev => ({
      ...prev,
      methods: {
        ...prev.methods,
        [method]: !prev.methods[method as keyof typeof prev.methods]
      }
    }))
  }

  const reminderMethods = [
    {
      id: 'push',
      name: 'Push Notifications',
      description: 'Get notified directly on your phone',
      icon: <Smartphone className="w-6 h-6" />,
      color: 'text-blue-600 dark:text-blue-400'
    },
    {
      id: 'sms',
      name: 'SMS Text Messages',
      description: 'Receive text messages to your phone number',
      icon: <MessageSquare className="w-6 h-6" />,
      color: 'text-green-600 dark:text-green-400'
    },
    {
      id: 'whatsapp',
      name: 'WhatsApp Messages',
      description: 'Get reminders via WhatsApp',
      icon: <MessageSquare className="w-6 h-6" />,
      color: 'text-green-600 dark:text-green-400'
    },
    {
      id: 'email',
      name: 'Email Notifications',
      description: 'Receive detailed reminders in your inbox',
      icon: <Mail className="w-6 h-6" />,
      color: 'text-purple-600 dark:text-purple-400'
    }
  ]

  const timingOptions = [
    {
      id: 'oneDay',
      name: '1 Day Before',
      description: 'Get reminded 24 hours in advance'
    },
    {
      id: 'oneHour',
      name: '1 Hour Before',
      description: 'Last-minute reminder before your appointment'
    },
    {
      id: 'thirtyMinutes',
      name: '30 Minutes Before',
      description: 'Final reminder to leave for your appointment'
    }
  ]

  return (
    <section className="py-24 bg-gradient-to-br from-emerald-50 via-white to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-teal-900/10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16" data-aos="fade-up">
          <div className="inline-flex items-center bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full px-8 py-4 shadow-lg mb-8">
            <Bell className="w-8 h-8 text-[#F59297] mr-4 animate-pulse" />
            <span className="text-[#F59297] font-bold text-lg">Smart Reminders</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Never Miss an
            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent"> Appointment</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Customize your notification preferences and stay on top of your healthcare schedule.
          </p>
        </div>

        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-10 shadow-2xl border border-white/20 dark:border-gray-700/20" data-aos="fade-up" data-aos-delay="200">
          {/* Master Toggle */}
          <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-200 dark:border-gray-600">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Enable Reminders
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Turn on appointment reminders to stay on track with your healthcare
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={reminderSettings.enabled}
                onChange={(e) => setReminderSettings(prev => ({ ...prev, enabled: e.target.checked }))}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#F59297]/20 dark:peer-focus:ring-[#F59297]/20 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#F59297]"></div>
            </label>
          </div>

          {reminderSettings.enabled && (
            <>
              {/* Reminder Timing */}
              <div className="mb-8">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  ⏰ When to Remind Me
                </h4>
                <div className="space-y-4">
                  {timingOptions.map((option) => (
                    <label
                      key={option.id}
                      className="flex items-center p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors duration-200"
                    >
                      <input
                        type="checkbox"
                        checked={reminderSettings.timing[option.id as keyof typeof reminderSettings.timing]}
                        onChange={() => handleTimingChange(option.id)}
                        className="w-5 h-5 text-[#F59297] bg-gray-100 border-gray-300 rounded focus:ring-[#F59297] dark:focus:ring-[#F59297] dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <div className="ml-4">
                        <div className="font-medium text-gray-900 dark:text-white">{option.name}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">{option.description}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Reminder Methods */}
              <div className="mb-8">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  📱 How to Remind Me
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {reminderMethods.map((method) => (
                    <label
                      key={method.id}
                      className="flex items-center p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors duration-200"
                    >
                      <input
                        type="checkbox"
                        checked={reminderSettings.methods[method.id as keyof typeof reminderSettings.methods]}
                        onChange={() => handleMethodChange(method.id)}
                        className="w-5 h-5 text-[#F59297] bg-gray-100 border-gray-300 rounded focus:ring-[#F59297] dark:focus:ring-[#F59297] dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <div className="ml-4 flex-1">
                        <div className="flex items-center mb-1">
                          <span className={method.color}>{method.icon}</span>
                          <span className="ml-2 font-medium text-gray-900 dark:text-white">{method.name}</span>
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">{method.description}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Preview */}
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
                <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-3 flex items-center">
                  👀 Reminder Preview
                </h4>
                <div className="space-y-3">
                  {reminderSettings.timing.oneDay && (
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-blue-200 dark:border-blue-700">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">Tomorrow at 10:00 AM</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        📅 Reminder: You have an Antenatal Checkup tomorrow at Ridge Hospital
                      </div>
                    </div>
                  )}
                  {reminderSettings.timing.oneHour && (
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-blue-200 dark:border-blue-700">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">In 1 hour</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        ⏰ Your appointment starts in 1 hour. Don't forget to bring your blood test results!
                      </div>
                    </div>
                  )}
                  {reminderSettings.timing.thirtyMinutes && (
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-blue-200 dark:border-blue-700">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">In 30 minutes</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        🚗 Time to leave! Your appointment is in 30 minutes at Ridge Hospital
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Save Button */}
              <div className="mt-8 text-center">
                <button className="bg-[#F59297] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#e67d82] transition-colors duration-200 flex items-center mx-auto">
                  <Settings className="w-5 h-5 mr-2" />
                  Save Reminder Settings
                </button>
              </div>
            </>
          )}

          {!reminderSettings.enabled && (
            <div className="text-center py-8">
              <Bell className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Reminders Disabled
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Enable reminders above to never miss an appointment
              </p>
            </div>
          )}
        </div>

        {/* Benefits */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6" data-aos="fade-up" data-aos-delay="400">
          <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600">
            <div className="text-3xl mb-3">⏰</div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Never Miss</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Get timely reminders so you never miss important checkups
            </p>
          </div>
          <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600">
            <div className="text-3xl mb-3">📱</div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Multi-Channel</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Choose how you want to be reminded - SMS, WhatsApp, or push notifications
            </p>
          </div>
          <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600">
            <div className="text-3xl mb-3">🎯</div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Personalized</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Customize timing and methods to fit your lifestyle
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AppointmentReminders
