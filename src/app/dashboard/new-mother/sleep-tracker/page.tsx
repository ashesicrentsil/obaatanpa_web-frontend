'use client'

import { useState, useEffect } from 'react'
import { Plus, Clock, Moon, Sun, Edit, Trash2, X, ArrowLeft, Bell, Calendar, TrendingUp, BarChart3 } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface SleepSession {
  id: string
  type: 'nap' | 'night'
  startTime: string
  endTime: string
  duration: number // in minutes
  notes?: string
  date: string
}

interface ReminderSettings {
  enabled: boolean
  napReminder: boolean
  bedtimeReminder: boolean
  napTime: string
  bedtime: string
  days: string[]
}

export default function SleepTrackerPage() {
  const router = useRouter()
  const [sleepSessions, setSleepSessions] = useState<SleepSession[]>([])
  const [showAddModal, setShowAddModal] = useState(false)
  const [showReminderModal, setShowReminderModal] = useState(false)
  const [editingSession, setEditingSession] = useState<SleepSession | null>(null)
  const [formData, setFormData] = useState({
    type: 'nap' as 'nap' | 'night',
    startTime: '',
    endTime: '',
    notes: ''
  })
  const [reminderSettings, setReminderSettings] = useState<ReminderSettings>({
    enabled: false,
    napReminder: true,
    bedtimeReminder: true,
    napTime: '10:00',
    bedtime: '19:00',
    days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
  })

  // Load sleep sessions and reminder settings from localStorage
  useEffect(() => {
    const savedSessions = localStorage.getItem('sleepSessions')
    if (savedSessions) {
      setSleepSessions(JSON.parse(savedSessions))
    }
    
    const savedReminders = localStorage.getItem('sleepReminders')
    if (savedReminders) {
      setReminderSettings(JSON.parse(savedReminders))
    }
  }, [])

  // Save data to localStorage
  useEffect(() => {
    localStorage.setItem('sleepSessions', JSON.stringify(sleepSessions))
  }, [sleepSessions])

  useEffect(() => {
    localStorage.setItem('sleepReminders', JSON.stringify(reminderSettings))
  }, [reminderSettings])

  const today = new Date().toISOString().split('T')[0]
  const todaysSessions = sleepSessions.filter(session => session.date === today)

  // Get last 7 days for weekly chart
  const getLast7Days = () => {
    const dates = []
    for (let i = 6; i >= 0; i--) {
      const date = new Date()
      date.setDate(date.getDate() - i)
      dates.push(date.toISOString().split('T')[0])
    }
    return dates
  }

  const last7Days = getLast7Days()
  const weeklyStats = last7Days.map(date => {
    const daySessions = sleepSessions.filter(s => s.date === date)
    const totalMinutes = daySessions.reduce((sum, session) => sum + session.duration, 0)
    const nightMinutes = daySessions.filter(s => s.type === 'night').reduce((sum, session) => sum + session.duration, 0)
    const napMinutes = daySessions.filter(s => s.type === 'nap').reduce((sum, session) => sum + session.duration, 0)
    
    return {
      date,
      totalHours: Math.round((totalMinutes / 60) * 10) / 10,
      nightHours: Math.round((nightMinutes / 60) * 10) / 10,
      napHours: Math.round((napMinutes / 60) * 10) / 10,
      sessions: daySessions.length
    }
  })

  const calculateDuration = (startTime: string, endTime: string) => {
    const start = new Date(`2000-01-01T${startTime}`)
    const end = new Date(`2000-01-01T${endTime}`)
    
    // Handle overnight sleep
    if (end < start) {
      end.setDate(end.getDate() + 1)
    }
    
    return Math.round((end.getTime() - start.getTime()) / (1000 * 60))
  }

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    if (hours > 0) {
      return `${hours}h ${mins}m`
    }
    return `${mins}m`
  }

  const handleAddSession = () => {
    const duration = calculateDuration(formData.startTime, formData.endTime)
    if (duration <= 0) return

    const newSession: SleepSession = {
      id: Date.now().toString(),
      ...formData,
      duration,
      date: today
    }
    setSleepSessions(prev => [newSession, ...prev])
    setShowAddModal(false)
    resetForm()
  }

  const handleEditSession = () => {
    if (editingSession) {
      const duration = calculateDuration(formData.startTime, formData.endTime)
      if (duration <= 0) return

      setSleepSessions(prev => prev.map(session => 
        session.id === editingSession.id 
          ? { ...session, ...formData, duration }
          : session
      ))
      setEditingSession(null)
      setShowAddModal(false)
      resetForm()
    }
  }

  const handleDeleteSession = (id: string) => {
    setSleepSessions(prev => prev.filter(session => session.id !== id))
  }

  const resetForm = () => {
    setFormData({
      type: 'nap',
      startTime: '',
      endTime: '',
      notes: ''
    })
  }

  const openEditModal = (session: SleepSession) => {
    setEditingSession(session)
    setFormData({
      type: session.type,
      startTime: session.startTime,
      endTime: session.endTime,
      notes: session.notes || ''
    })
    setShowAddModal(true)
  }

  const getSleepIcon = (type: string) => {
    return type === 'night' ? '🌙' : '☀️'
  }

  const getSleepTypeLabel = (type: string) => {
    return type === 'night' ? 'Night Sleep' : 'Nap'
  }

  const getAverageSleepPerDay = () => {
    if (sleepSessions.length === 0) return 0
    const uniqueDates = [...new Set(sleepSessions.map(s => s.date))]
    const totalMinutes = sleepSessions.reduce((sum, session) => sum + session.duration, 0)
    return Math.round((totalMinutes / uniqueDates.length / 60) * 10) / 10
  }

  const getLongestSleep = () => {
    if (sleepSessions.length === 0) return 0
    const longest = Math.max(...sleepSessions.map(s => s.duration))
    return Math.round((longest / 60) * 10) / 10
  }

  const getMostCommonNapTime = () => {
    const napSessions = sleepSessions.filter(s => s.type === 'nap')
    if (napSessions.length === 0) return 'No data'
    
    const timeCounts: { [key: string]: number } = {}
    napSessions.forEach(session => {
      const hour = session.startTime.split(':')[0]
      timeCounts[hour] = (timeCounts[hour] || 0) + 1
    })
    
    const mostCommon = Object.entries(timeCounts).sort((a, b) => b[1] - a[1])[0]
    return `${mostCommon[0]}:00`
  }

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back()
    } else {
      router.push('/dashboard/new-mother')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="relative pt-16 pb-32 overflow-hidden bg-gradient-to-r from-[#F59297]/50 to-[#7da8e6]/50">
        {/* Back Button */}
        <div className="absolute top-6 left-4 z-10">
          <button
            onClick={handleBack}
            className="flex items-center space-x-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm text-gray-700 dark:text-gray-300 px-4 py-2 rounded-full font-medium hover:bg-white dark:hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>
        </div>
        
        <div className="text-center max-w-3xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
            Sleep Tracker
          </h1>
          <p className="mt-4 text-lg text-gray-700">
            Record your baby's naps and night sleeps to identify healthy patterns and improve rest routines.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 -mt-24 relative z-10">
        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <button
            onClick={() => {
              resetForm()
              setEditingSession(null)
              setShowAddModal(true)
            }}
            className="flex items-center space-x-2 bg-gradient-to-r from-[#F59297] to-[#7da8e6] text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            <Plus className="w-5 h-5" />
            <span>+ Log Sleep</span>
          </button>
          
          <button
            onClick={() => setShowReminderModal(true)}
            className="flex items-center space-x-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-600"
          >
            <Bell className="w-5 h-5" />
            <span>Reminders</span>
          </button>
        </div>

        {/* Today's Sleep Logs */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Today's Sleep Sessions
          </h2>
          
          {todaysSessions.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-4xl mb-4">😴</div>
              <p className="text-gray-600 dark:text-gray-400">
                No sleep sessions logged today. Tap the button above to add your first sleep session!
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {todaysSessions.map((session) => (
                <div
                  key={session.id}
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className="text-2xl">{getSleepIcon(session.type)}</div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-gray-500" />
                        <span className="font-semibold text-gray-900 dark:text-white">
                          {session.startTime} - {session.endTime}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {getSleepTypeLabel(session.type)} • {formatDuration(session.duration)}
                      </div>
                      {session.notes && (
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          📝 {session.notes}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button
                      onClick={() => openEditModal(session)}
                      className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteSession(session.id)}
                      className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Sleep Summary Insights */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 text-center shadow-lg">
            <div className="text-3xl font-bold text-[#F59297] mb-2">
              {todaysSessions.reduce((sum, session) => sum + session.duration, 0) / 60 > 0 
                ? Math.round((todaysSessions.reduce((sum, session) => sum + session.duration, 0) / 60) * 10) / 10
                : 0
              }
            </div>
            <div className="text-gray-600 dark:text-gray-400">Hours Today</div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 text-center shadow-lg">
            <div className="text-3xl font-bold text-[#7da8e6] mb-2">
              {getAverageSleepPerDay()}
            </div>
            <div className="text-gray-600 dark:text-gray-400">Avg Hours/Day</div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 text-center shadow-lg">
            <div className="text-3xl font-bold text-green-500 mb-2">
              {getLongestSleep()}
            </div>
            <div className="text-gray-600 dark:text-gray-400">Longest Sleep</div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 text-center shadow-lg">
            <div className="text-3xl font-bold text-orange-500 mb-2">
              {todaysSessions.filter(s => s.type === 'nap').length}
            </div>
            <div className="text-gray-600 dark:text-gray-400">Naps Today</div>
          </div>
        </div>

        {/* Weekly Sleep Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-8">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <BarChart3 className="w-5 h-5 mr-2" />
            Weekly Sleep Overview
          </h3>
          <div className="grid grid-cols-7 gap-2">
            {weeklyStats.map((day) => (
              <div key={day.date} className="text-center">
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                  {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}
                </div>
                <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-2">
                  <div className="text-lg font-bold text-[#F59297]">{day.totalHours}h</div>
                  <div className="text-xs text-gray-500">
                    {day.nightHours > 0 && <span className="text-[#7da8e6]">🌙{day.nightHours}h</span>}
                    {day.napHours > 0 && <span className="text-orange-500 ml-1">☀️{day.napHours}h</span>}
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    {day.sessions} sessions
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Insights */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-8">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2" />
            Sleep Insights
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="text-2xl font-bold text-[#F59297] mb-1">
                {getMostCommonNapTime()}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Most Common Nap Time</div>
            </div>
            
            <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="text-2xl font-bold text-[#7da8e6] mb-1">
                {sleepSessions.filter(s => s.type === 'night').length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Night Sleep Sessions</div>
            </div>
            
            <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="text-2xl font-bold text-green-500 mb-1">
                {sleepSessions.filter(s => s.type === 'nap').length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Total Naps</div>
            </div>
          </div>
        </div>
      </div>

      {/* Add/Edit Sleep Session Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-md w-full">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                {editingSession ? 'Edit Sleep Session' : 'Log New Sleep Session'}
              </h3>
              <button
                onClick={() => {
                  setShowAddModal(false)
                  setEditingSession(null)
                  resetForm()
                }}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={(e) => {
              e.preventDefault()
              editingSession ? handleEditSession() : handleAddSession()
            }}>
              <div className="space-y-4">
                {/* Sleep Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Sleep Type
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { value: 'nap', label: 'Nap', icon: '☀️' },
                      { value: 'night', label: 'Night Sleep', icon: '🌙' }
                    ].map((type) => (
                      <button
                        key={type.value}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, type: type.value as any }))}
                        className={`p-3 rounded-lg border-2 transition-colors ${
                          formData.type === type.value
                            ? 'border-[#F59297] bg-[#F59297]/10'
                            : 'border-gray-200 dark:border-gray-600 hover:border-gray-300'
                        }`}
                      >
                        <div className="text-lg mb-1">{type.icon}</div>
                        <div className="text-xs font-medium">{type.label}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Start Time */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Start Time
                  </label>
                  <input
                    type="time"
                    value={formData.startTime}
                    onChange={(e) => setFormData(prev => ({ ...prev, startTime: e.target.value }))}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#F59297] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    required
                  />
                </div>

                {/* End Time */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    End Time
                  </label>
                  <input
                    type="time"
                    value={formData.endTime}
                    onChange={(e) => setFormData(prev => ({ ...prev, endTime: e.target.value }))}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#F59297] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    required
                  />
                </div>

                {/* Duration Preview */}
                {formData.startTime && formData.endTime && (
                  <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Duration: {formatDuration(calculateDuration(formData.startTime, formData.endTime))}
                    </div>
                  </div>
                )}

                {/* Notes */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Notes (Optional)
                  </label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                    placeholder="e.g., woke up crying, slept peacefully..."
                    rows={3}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#F59297] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#F59297] to-[#7da8e6] text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
                >
                  {editingSession ? 'Update Session' : 'Log Sleep Session'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Reminder Settings Modal */}
      {showReminderModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-md w-full">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                Sleep Reminders
              </h3>
              <button
                onClick={() => setShowReminderModal(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Enable/Disable */}
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Enable Reminders
                </label>
                <button
                  onClick={() => setReminderSettings(prev => ({ ...prev, enabled: !prev.enabled }))}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    reminderSettings.enabled ? 'bg-[#F59297]' : 'bg-gray-300'
                  }`}
                >
                  <div className={`w-4 h-4 bg-white rounded-full transition-transform ${
                    reminderSettings.enabled ? 'transform translate-x-6' : 'transform translate-x-1'
                  }`} />
                </button>
              </div>

              {reminderSettings.enabled && (
                <>
                  {/* Nap Reminder */}
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Nap Reminder
                    </label>
                    <button
                      onClick={() => setReminderSettings(prev => ({ ...prev, napReminder: !prev.napReminder }))}
                      className={`w-12 h-6 rounded-full transition-colors ${
                        reminderSettings.napReminder ? 'bg-[#F59297]' : 'bg-gray-300'
                      }`}
                    >
                      <div className={`w-4 h-4 bg-white rounded-full transition-transform ${
                        reminderSettings.napReminder ? 'transform translate-x-6' : 'transform translate-x-1'
                      }`} />
                    </button>
                  </div>

                  {reminderSettings.napReminder && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Nap Time
                      </label>
                      <input
                        type="time"
                        value={reminderSettings.napTime}
                        onChange={(e) => setReminderSettings(prev => ({ ...prev, napTime: e.target.value }))}
                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#F59297] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                  )}

                  {/* Bedtime Reminder */}
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Bedtime Reminder
                    </label>
                    <button
                      onClick={() => setReminderSettings(prev => ({ ...prev, bedtimeReminder: !prev.bedtimeReminder }))}
                      className={`w-12 h-6 rounded-full transition-colors ${
                        reminderSettings.bedtimeReminder ? 'bg-[#F59297]' : 'bg-gray-300'
                      }`}
                    >
                      <div className={`w-4 h-4 bg-white rounded-full transition-transform ${
                        reminderSettings.bedtimeReminder ? 'transform translate-x-6' : 'transform translate-x-1'
                      }`} />
                    </button>
                  </div>

                  {reminderSettings.bedtimeReminder && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Bedtime
                      </label>
                      <input
                        type="time"
                        value={reminderSettings.bedtime}
                        onChange={(e) => setReminderSettings(prev => ({ ...prev, bedtime: e.target.value }))}
                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#F59297] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                  )}
                </>
              )}

              <button
                onClick={() => setShowReminderModal(false)}
                className="w-full bg-gradient-to-r from-[#F59297] to-[#7da8e6] text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
              >
                Save Settings
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 