'use client'

import { useState, useEffect } from 'react'
import { Plus, Clock, Baby, Milk, Apple, Edit, Trash2, X, Save, Bell, Calendar, TrendingUp, ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface Feeding {
  id: string
  type: 'breast' | 'bottle' | 'solid'
  startTime: string
  duration?: string
  quantity?: string
  notes?: string
  date: string
}

interface ReminderSettings {
  enabled: boolean
  interval: number // in hours
  startTime: string
  endTime: string
  days: string[] // ['monday', 'tuesday', etc.]
}

export default function FeedingTrackerPage() {
  const router = useRouter()
  const [feedings, setFeedings] = useState<Feeding[]>([])
  const [showAddModal, setShowAddModal] = useState(false)
  const [showReminderModal, setShowReminderModal] = useState(false)
  const [showHistoryModal, setShowHistoryModal] = useState(false)
  const [editingFeeding, setEditingFeeding] = useState<Feeding | null>(null)
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])
  const [formData, setFormData] = useState({
    type: 'breast' as 'breast' | 'bottle' | 'solid',
    startTime: '',
    duration: '',
    quantity: '',
    notes: ''
  })
  const [reminderSettings, setReminderSettings] = useState<ReminderSettings>({
    enabled: false,
    interval: 3,
    startTime: '06:00',
    endTime: '22:00',
    days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
  })

  // Load feedings and reminder settings from localStorage on component mount
  useEffect(() => {
    const savedFeedings = localStorage.getItem('feedings')
    if (savedFeedings) {
      setFeedings(JSON.parse(savedFeedings))
    }
    
    const savedReminders = localStorage.getItem('feedingReminders')
    if (savedReminders) {
      setReminderSettings(JSON.parse(savedReminders))
    }
  }, [])

  // Save feedings and reminder settings to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('feedings', JSON.stringify(feedings))
  }, [feedings])

  useEffect(() => {
    localStorage.setItem('feedingReminders', JSON.stringify(reminderSettings))
  }, [reminderSettings])

  const today = new Date().toISOString().split('T')[0]
  const todaysFeedings = feedings.filter(feeding => feeding.date === today)
  const selectedDateFeedings = feedings.filter(feeding => feeding.date === selectedDate)

  // Get last 7 days of feedings for trends
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
  const weeklyStats = last7Days.map(date => ({
    date,
    count: feedings.filter(f => f.date === date).length,
    breast: feedings.filter(f => f.date === date && f.type === 'breast').length,
    bottle: feedings.filter(f => f.date === date && f.type === 'bottle').length,
    solid: feedings.filter(f => f.date === date && f.type === 'solid').length
  }))

  const handleAddFeeding = () => {
    const newFeeding: Feeding = {
      id: Date.now().toString(),
      ...formData,
      date: today
    }
    setFeedings(prev => [newFeeding, ...prev])
    setShowAddModal(false)
    resetForm()
  }

  const handleEditFeeding = () => {
    if (editingFeeding) {
      setFeedings(prev => prev.map(feeding => 
        feeding.id === editingFeeding.id 
          ? { ...feeding, ...formData }
          : feeding
      ))
      setEditingFeeding(null)
      setShowAddModal(false)
      resetForm()
    }
  }

  const handleDeleteFeeding = (id: string) => {
    setFeedings(prev => prev.filter(feeding => feeding.id !== id))
  }

  const resetForm = () => {
    setFormData({
      type: 'breast',
      startTime: '',
      duration: '',
      quantity: '',
      notes: ''
    })
  }

  const openEditModal = (feeding: Feeding) => {
    setEditingFeeding(feeding)
    setFormData({
      type: feeding.type,
      startTime: feeding.startTime,
      duration: feeding.duration || '',
      quantity: feeding.quantity || '',
      notes: feeding.notes || ''
    })
    setShowAddModal(true)
  }

  const getFeedingIcon = (type: string) => {
    switch (type) {
      case 'breast': return '🤱'
      case 'bottle': return '🍼'
      case 'solid': return '🥄'
      default: return '🍼'
    }
  }

  const getFeedingTypeLabel = (type: string) => {
    switch (type) {
      case 'breast': return 'Breastfeeding'
      case 'bottle': return 'Bottle'
      case 'solid': return 'Solid Food'
      default: return type
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'short', 
      day: 'numeric' 
    })
  }

  const getAverageFeedingsPerDay = () => {
    if (feedings.length === 0) return 0
    const uniqueDates = [...new Set(feedings.map(f => f.date))]
    return Math.round((feedings.length / uniqueDates.length) * 10) / 10
  }

  const handleBack = () => {
    // Try to go back in browser history, fallback to dashboard
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
            Feeding Tracker
          </h1>
          <p className="mt-4 text-lg text-gray-700">
            Keep track of every feeding to better understand your baby's patterns and needs.
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
              setEditingFeeding(null)
              setShowAddModal(true)
            }}
            className="flex items-center space-x-2 bg-gradient-to-r from-[#F59297] to-[#7da8e6] text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            <Plus className="w-5 h-5" />
            <span>+ Log Feeding</span>
          </button>
          
          <button
            onClick={() => setShowReminderModal(true)}
            className="flex items-center space-x-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-600"
          >
            <Bell className="w-5 h-5" />
            <span>Reminders</span>
          </button>
          
          <button
            onClick={() => setShowHistoryModal(true)}
            className="flex items-center space-x-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-600"
          >
            <Calendar className="w-5 h-5" />
            <span>History</span>
          </button>
        </div>

        {/* Today's Feedings Overview */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Today's Feedings
          </h2>
          
          {todaysFeedings.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-4xl mb-4">🍼</div>
              <p className="text-gray-600 dark:text-gray-400">
                No feedings logged today. Tap the button above to add your first feeding!
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {todaysFeedings.map((feeding) => (
                <div
                  key={feeding.id}
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className="text-2xl">{getFeedingIcon(feeding.type)}</div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-gray-500" />
                        <span className="font-semibold text-gray-900 dark:text-white">
                          {feeding.startTime}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {getFeedingTypeLabel(feeding.type)}
                        {feeding.duration && ` • ${feeding.duration}`}
                        {feeding.quantity && ` • ${feeding.quantity}`}
                      </div>
                      {feeding.notes && (
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          📝 {feeding.notes}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button
                      onClick={() => openEditModal(feeding)}
                      className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteFeeding(feeding.id)}
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

        {/* Enhanced Feeding Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 text-center shadow-lg">
            <div className="text-3xl font-bold text-[#F59297] mb-2">
              {todaysFeedings.length}
            </div>
            <div className="text-gray-600 dark:text-gray-400">Today</div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 text-center shadow-lg">
            <div className="text-3xl font-bold text-[#7da8e6] mb-2">
              {getAverageFeedingsPerDay()}
            </div>
            <div className="text-gray-600 dark:text-gray-400">Avg/Day</div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 text-center shadow-lg">
            <div className="text-3xl font-bold text-green-500 mb-2">
              {todaysFeedings.filter(f => f.type === 'breast').length}
            </div>
            <div className="text-gray-600 dark:text-gray-400">Breast</div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 text-center shadow-lg">
            <div className="text-3xl font-bold text-orange-500 mb-2">
              {todaysFeedings.filter(f => f.type === 'bottle').length}
            </div>
            <div className="text-gray-600 dark:text-gray-400">Bottle</div>
          </div>
        </div>

        {/* Weekly Trends */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-8">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2" />
            Weekly Trends
          </h3>
          <div className="grid grid-cols-7 gap-2">
            {weeklyStats.map((day) => (
              <div key={day.date} className="text-center">
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                  {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}
                </div>
                <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-2">
                  <div className="text-lg font-bold text-[#F59297]">{day.count}</div>
                  <div className="text-xs text-gray-500">
                    {day.breast > 0 && <span className="text-[#7da8e6]">🤱{day.breast}</span>}
                    {day.bottle > 0 && <span className="text-green-500 ml-1">🍼{day.bottle}</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add/Edit Feeding Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-md w-full">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                {editingFeeding ? 'Edit Feeding' : 'Log New Feeding'}
              </h3>
              <button
                onClick={() => {
                  setShowAddModal(false)
                  setEditingFeeding(null)
                  resetForm()
                }}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={(e) => {
              e.preventDefault()
              editingFeeding ? handleEditFeeding() : handleAddFeeding()
            }}>
              <div className="space-y-4">
                {/* Feeding Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Feeding Type
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { value: 'breast', label: 'Breast', icon: '🤱' },
                      { value: 'bottle', label: 'Bottle', icon: '🍼' },
                      { value: 'solid', label: 'Solid', icon: '🥄' }
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

                {/* Duration/Quantity */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {formData.type === 'breast' ? 'Duration' : 'Quantity'}
                  </label>
                  <input
                    type="text"
                    placeholder={formData.type === 'breast' ? 'e.g., 15 mins' : 'e.g., 120ml'}
                    value={formData.type === 'breast' ? formData.duration : formData.quantity}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      [formData.type === 'breast' ? 'duration' : 'quantity']: e.target.value
                    }))}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#F59297] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Notes (Optional)
                  </label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                    placeholder="e.g., slept after feeding, was fussy..."
                    rows={3}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#F59297] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#F59297] to-[#7da8e6] text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
                >
                  {editingFeeding ? 'Update Feeding' : 'Log Feeding'}
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
                Feeding Reminders
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
                  {/* Interval */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Remind every {reminderSettings.interval} hours
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="6"
                      value={reminderSettings.interval}
                      onChange={(e) => setReminderSettings(prev => ({ ...prev, interval: parseInt(e.target.value) }))}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>1h</span>
                      <span>2h</span>
                      <span>3h</span>
                      <span>4h</span>
                      <span>5h</span>
                      <span>6h</span>
                    </div>
                  </div>

                  {/* Time Range */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Start Time
                      </label>
                      <input
                        type="time"
                        value={reminderSettings.startTime}
                        onChange={(e) => setReminderSettings(prev => ({ ...prev, startTime: e.target.value }))}
                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#F59297] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        End Time
                      </label>
                      <input
                        type="time"
                        value={reminderSettings.endTime}
                        onChange={(e) => setReminderSettings(prev => ({ ...prev, endTime: e.target.value }))}
                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#F59297] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                  </div>

                  {/* Days of Week */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Days of Week
                    </label>
                    <div className="grid grid-cols-7 gap-1">
                      {['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].map((day) => (
                        <button
                          key={day}
                          onClick={() => {
                            const newDays = reminderSettings.days.includes(day)
                              ? reminderSettings.days.filter(d => d !== day)
                              : [...reminderSettings.days, day]
                            setReminderSettings(prev => ({ ...prev, days: newDays }))
                          }}
                          className={`p-2 text-xs rounded-lg transition-colors ${
                            reminderSettings.days.includes(day)
                              ? 'bg-[#F59297] text-white'
                              : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                          }`}
                        >
                          {day.charAt(0).toUpperCase()}
                        </button>
                      ))}
                    </div>
                  </div>
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

      {/* Historical Data Modal */}
      {showHistoryModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                Feeding History
              </h3>
              <button
                onClick={() => setShowHistoryModal(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Date Selector */}
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={() => {
                  const date = new Date(selectedDate)
                  date.setDate(date.getDate() - 1)
                  setSelectedDate(date.toISOString().split('T')[0])
                }}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              
              <div className="text-center">
                <div className="text-lg font-semibold text-gray-900 dark:text-white">
                  {formatDate(selectedDate)}
                </div>
                <div className="text-sm text-gray-500">
                  {selectedDateFeedings.length} feedings
                </div>
              </div>
              
              <button
                onClick={() => {
                  const date = new Date(selectedDate)
                  date.setDate(date.getDate() + 1)
                  const tomorrow = date.toISOString().split('T')[0]
                  if (tomorrow <= today) {
                    setSelectedDate(tomorrow)
                  }
                }}
                className={`p-2 rounded-lg transition-colors ${
                  selectedDate >= today 
                    ? 'text-gray-300 cursor-not-allowed' 
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
                disabled={selectedDate >= today}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Feedings for Selected Date */}
            {selectedDateFeedings.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-4xl mb-4">📅</div>
                <p className="text-gray-600 dark:text-gray-400">
                  No feedings logged on {formatDate(selectedDate)}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {selectedDateFeedings.map((feeding) => (
                  <div
                    key={feeding.id}
                    className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="text-2xl">{getFeedingIcon(feeding.type)}</div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4 text-gray-500" />
                          <span className="font-semibold text-gray-900 dark:text-white">
                            {feeding.startTime}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {getFeedingTypeLabel(feeding.type)}
                          {feeding.duration && ` • ${feeding.duration}`}
                          {feeding.quantity && ` • ${feeding.quantity}`}
                        </div>
                        {feeding.notes && (
                          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            📝 {feeding.notes}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <button
                        onClick={() => {
                          openEditModal(feeding)
                          setShowHistoryModal(false)
                        }}
                        className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteFeeding(feeding.id)}
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
        </div>
      )}
    </div>
  )
} 