'use client'

import { useState, useEffect } from 'react'
import { Plus, Clock, Droplets, Baby, Edit, Trash2, X, ArrowLeft, AlertTriangle, BarChart3, TrendingUp, Filter } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface DiaperChange {
  id: string
  type: 'pee' | 'poop' | 'both'
  time: string
  stoolType?: 'soft' | 'runny' | 'hard'
  notes?: string
  date: string
}

interface HealthAlert {
  type: 'no-poop' | 'diarrhea' | 'dehydration'
  message: string
  severity: 'warning' | 'alert'
}

export default function DiaperLogPage() {
  const router = useRouter()
  const [diaperChanges, setDiaperChanges] = useState<DiaperChange[]>([])
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingChange, setEditingChange] = useState<DiaperChange | null>(null)
  const [filterType, setFilterType] = useState<'all' | 'pee' | 'poop'>('all')
  const [formData, setFormData] = useState({
    type: 'pee' as 'pee' | 'poop' | 'both',
    time: '',
    stoolType: 'soft' as 'soft' | 'runny' | 'hard',
    notes: ''
  })

  // Load diaper changes from localStorage
  useEffect(() => {
    const savedChanges = localStorage.getItem('diaperChanges')
    if (savedChanges) {
      setDiaperChanges(JSON.parse(savedChanges))
    }
  }, [])

  // Save diaper changes to localStorage
  useEffect(() => {
    localStorage.setItem('diaperChanges', JSON.stringify(diaperChanges))
  }, [diaperChanges])

  const today = new Date().toISOString().split('T')[0]
  const todaysChanges = diaperChanges.filter(change => change.date === today)
  const filteredChanges = filterType === 'all' 
    ? todaysChanges 
    : todaysChanges.filter(change => change.type === filterType || change.type === 'both')

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
    const dayChanges = diaperChanges.filter(c => c.date === date)
    const peeCount = dayChanges.filter(c => c.type === 'pee' || c.type === 'both').length
    const poopCount = dayChanges.filter(c => c.type === 'poop' || c.type === 'both').length
    
    return {
      date,
      pee: peeCount,
      poop: poopCount,
      total: dayChanges.length
    }
  })

  // Health alerts
  const getHealthAlerts = (): HealthAlert[] => {
    const alerts: HealthAlert[] = []
    
    // Check for no poop in last 2 days
    const lastPoop = diaperChanges
      .filter(c => c.type === 'poop' || c.type === 'both')
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0]
    
    if (lastPoop) {
      const daysSincePoop = Math.floor((new Date().getTime() - new Date(lastPoop.date).getTime()) / (1000 * 60 * 60 * 24))
      if (daysSincePoop >= 2) {
        alerts.push({
          type: 'no-poop',
          message: `No bowel movement recorded for ${daysSincePoop} days. Consider consulting your pediatrician.`,
          severity: 'warning'
        })
      }
    }

    // Check for diarrhea (too many runny stools today)
    const todaysRunnyStools = todaysChanges.filter(c => 
      (c.type === 'poop' || c.type === 'both') && c.stoolType === 'runny'
    ).length
    
    if (todaysRunnyStools >= 3) {
      alerts.push({
        type: 'diarrhea',
        message: `${todaysRunnyStools} runny stools today. Monitor for signs of diarrhea.`,
        severity: 'alert'
      })
    }

    // Check for dehydration (too few pee diapers today)
    const todaysPeeCount = todaysChanges.filter(c => c.type === 'pee' || c.type === 'both').length
    if (todaysPeeCount < 3) {
      alerts.push({
        type: 'dehydration',
        message: `Only ${todaysPeeCount} wet diapers today. Ensure adequate hydration.`,
        severity: 'warning'
      })
    }

    return alerts
  }

  const healthAlerts = getHealthAlerts()

  const handleAddChange = () => {
    const newChange: DiaperChange = {
      id: Date.now().toString(),
      ...formData,
      date: today
    }
    setDiaperChanges(prev => [newChange, ...prev])
    setShowAddModal(false)
    resetForm()
  }

  const handleEditChange = () => {
    if (editingChange) {
      setDiaperChanges(prev => prev.map(change => 
        change.id === editingChange.id 
          ? { ...change, ...formData }
          : change
      ))
      setEditingChange(null)
      setShowAddModal(false)
      resetForm()
    }
  }

  const handleDeleteChange = (id: string) => {
    setDiaperChanges(prev => prev.filter(change => change.id !== id))
  }

  const resetForm = () => {
    setFormData({
      type: 'pee',
      time: '',
      stoolType: 'soft',
      notes: ''
    })
  }

  const openEditModal = (change: DiaperChange) => {
    setEditingChange(change)
    setFormData({
      type: change.type,
      time: change.time,
      stoolType: change.stoolType || 'soft',
      notes: change.notes || ''
    })
    setShowAddModal(true)
  }

  const getDiaperIcon = (type: string) => {
    switch (type) {
      case 'pee': return '💧'
      case 'poop': return '💩'
      case 'both': return '🚼'
      default: return '🚼'
    }
  }

  const getDiaperTypeLabel = (type: string) => {
    switch (type) {
      case 'pee': return 'Pee only'
      case 'poop': return 'Poop only'
      case 'both': return 'Both'
      default: return type
    }
  }

  const getStoolTypeLabel = (type: string) => {
    switch (type) {
      case 'soft': return 'Soft'
      case 'runny': return 'Runny'
      case 'hard': return 'Hard'
      default: return type
    }
  }

  const getStoolTypeColor = (type: string) => {
    switch (type) {
      case 'soft': return 'text-green-600'
      case 'runny': return 'text-yellow-600'
      case 'hard': return 'text-red-600'
      default: return 'text-gray-600'
    }
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
            Diaper Log
          </h1>
          <p className="mt-4 text-lg text-gray-700">
            Track every diaper change to monitor your baby's digestion, hydration, and overall health.
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
              setEditingChange(null)
              setShowAddModal(true)
            }}
            className="flex items-center space-x-2 bg-gradient-to-r from-[#F59297] to-[#7da8e6] text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            <Plus className="w-5 h-5" />
            <span>+ Log Diaper</span>
          </button>
        </div>

        {/* Health Alerts */}
        {healthAlerts.length > 0 && (
          <div className="mb-8">
            {healthAlerts.map((alert, index) => (
              <div
                key={index}
                className={`p-4 rounded-2xl shadow-lg mb-4 ${
                  alert.severity === 'alert' 
                    ? 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800' 
                    : 'bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <AlertTriangle className={`w-5 h-5 mt-0.5 ${
                    alert.severity === 'alert' ? 'text-red-600' : 'text-yellow-600'
                  }`} />
                  <div className="flex-1">
                    <p className={`text-sm font-medium ${
                      alert.severity === 'alert' ? 'text-red-800 dark:text-red-200' : 'text-yellow-800 dark:text-yellow-200'
                    }`}>
                      {alert.message}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Filter Buttons */}
        <div className="flex justify-center mb-6">
          <div className="flex bg-white dark:bg-gray-800 rounded-full p-1 shadow-lg">
            {[
              { value: 'all', label: 'All', icon: '🚼' },
              { value: 'pee', label: 'Pee', icon: '💧' },
              { value: 'poop', label: 'Poop', icon: '💩' }
            ].map((filter) => (
              <button
                key={filter.value}
                onClick={() => setFilterType(filter.value as any)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  filterType === filter.value
                    ? 'bg-gradient-to-r from-[#F59297] to-[#7da8e6] text-white shadow-lg'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <span>{filter.icon}</span>
                <span>{filter.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Today's Diaper Log Timeline */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Today's Diaper Changes
          </h2>
          
          {filteredChanges.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-4xl mb-4">🚼</div>
              <p className="text-gray-600 dark:text-gray-400">
                {filterType === 'all' 
                  ? 'No diaper changes logged today. Tap the button above to add your first entry!'
                  : `No ${filterType} changes today.`
                }
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredChanges.map((change) => (
                <div
                  key={change.id}
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className="text-2xl">{getDiaperIcon(change.type)}</div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-gray-500" />
                        <span className="font-semibold text-gray-900 dark:text-white">
                          {change.time}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {getDiaperTypeLabel(change.type)}
                        {change.stoolType && (change.type === 'poop' || change.type === 'both') && (
                          <span className={`ml-2 ${getStoolTypeColor(change.stoolType)}`}>
                            • Stool: {getStoolTypeLabel(change.stoolType)}
                          </span>
                        )}
                      </div>
                      {change.notes && (
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          📝 {change.notes}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button
                      onClick={() => openEditModal(change)}
                      className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteChange(change.id)}
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

        {/* Diaper Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 text-center shadow-lg">
            <div className="text-3xl font-bold text-[#F59297] mb-2">
              {todaysChanges.length}
            </div>
            <div className="text-gray-600 dark:text-gray-400">Total Today</div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 text-center shadow-lg">
            <div className="text-3xl font-bold text-[#7da8e6] mb-2">
              {todaysChanges.filter(c => c.type === 'pee' || c.type === 'both').length}
            </div>
            <div className="text-gray-600 dark:text-gray-400">Wet Diapers</div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 text-center shadow-lg">
            <div className="text-3xl font-bold text-green-500 mb-2">
              {todaysChanges.filter(c => c.type === 'poop' || c.type === 'both').length}
            </div>
            <div className="text-gray-600 dark:text-gray-400">Dirty Diapers</div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 text-center shadow-lg">
            <div className="text-3xl font-bold text-orange-500 mb-2">
              {todaysChanges.filter(c => c.type === 'both').length}
            </div>
            <div className="text-gray-600 dark:text-gray-400">Both</div>
          </div>
        </div>

        {/* Weekly Diaper Summary Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-8">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <BarChart3 className="w-5 h-5 mr-2" />
            Weekly Diaper Summary
          </h3>
          <div className="grid grid-cols-7 gap-2">
            {weeklyStats.map((day) => (
              <div key={day.date} className="text-center">
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                  {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}
                </div>
                <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-2">
                  <div className="text-lg font-bold text-[#F59297]">{day.total}</div>
                  <div className="text-xs text-gray-500">
                    <span className="text-[#7da8e6]">💧{day.pee}</span>
                    <span className="text-green-500 ml-1">💩{day.poop}</span>
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
            Health Insights
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="text-2xl font-bold text-[#F59297] mb-1">
                {Math.round((diaperChanges.filter(c => c.type === 'pee' || c.type === 'both').length / Math.max(diaperChanges.length, 1)) * 100)}%
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Wet Diaper Rate</div>
            </div>
            
            <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="text-2xl font-bold text-[#7da8e6] mb-1">
                {Math.round((diaperChanges.filter(c => c.type === 'poop' || c.type === 'both').length / Math.max(diaperChanges.length, 1)) * 100)}%
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Dirty Diaper Rate</div>
            </div>
            
            <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="text-2xl font-bold text-green-500 mb-1">
                {diaperChanges.filter(c => c.stoolType === 'runny').length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Runny Stools</div>
            </div>
          </div>
        </div>
      </div>

      {/* Add/Edit Diaper Change Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-md w-full">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                {editingChange ? 'Edit Diaper Change' : 'Log New Diaper Change'}
              </h3>
              <button
                onClick={() => {
                  setShowAddModal(false)
                  setEditingChange(null)
                  resetForm()
                }}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={(e) => {
              e.preventDefault()
              editingChange ? handleEditChange() : handleAddChange()
            }}>
              <div className="space-y-4">
                {/* Diaper Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Diaper Type
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { value: 'pee', label: 'Pee', icon: '💧' },
                      { value: 'poop', label: 'Poop', icon: '💩' },
                      { value: 'both', label: 'Both', icon: '🚼' }
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

                {/* Time */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Time
                  </label>
                  <input
                    type="time"
                    value={formData.time}
                    onChange={(e) => setFormData(prev => ({ ...prev, time: e.target.value }))}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#F59297] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    required
                  />
                </div>

                {/* Stool Type (only if poop or both) */}
                {(formData.type === 'poop' || formData.type === 'both') && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Stool Consistency
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { value: 'soft', label: 'Soft', color: 'text-green-600' },
                        { value: 'runny', label: 'Runny', color: 'text-yellow-600' },
                        { value: 'hard', label: 'Hard', color: 'text-red-600' }
                      ].map((stool) => (
                        <button
                          key={stool.value}
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, stoolType: stool.value as any }))}
                          className={`p-3 rounded-lg border-2 transition-colors ${
                            formData.stoolType === stool.value
                              ? 'border-[#F59297] bg-[#F59297]/10'
                              : 'border-gray-200 dark:border-gray-600 hover:border-gray-300'
                          }`}
                        >
                          <div className={`text-sm font-medium ${stool.color}`}>
                            {stool.label}
                          </div>
                        </button>
                      ))}
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
                    placeholder="e.g., unusual color, consistency, or behavior..."
                    rows={3}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#F59297] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#F59297] to-[#7da8e6] text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
                >
                  {editingChange ? 'Update Change' : 'Log Diaper Change'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
} 