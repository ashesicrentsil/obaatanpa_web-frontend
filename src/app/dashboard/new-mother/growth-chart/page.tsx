'use client'

import { useState, useEffect } from 'react'
import { Plus, Ruler, Weight, Brain, Edit, Trash2, X, ArrowLeft, TrendingUp, BarChart3, Calendar, ChevronDown, ChevronUp } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface GrowthData {
  id: string
  date: string
  weight?: number // in kg
  height?: number // in cm
  headCircumference?: number // in cm
  notes?: string
}

interface GrowthInsight {
  type: 'weight' | 'height' | 'head'
  message: string
  trend: 'increasing' | 'decreasing' | 'stable'
  period: string
}

export default function GrowthChartPage() {
  const router = useRouter()
  const [growthData, setGrowthData] = useState<GrowthData[]>([])
  const [showAddModal, setShowAddModal] = useState(false)
  const [showHistoryTable, setShowHistoryTable] = useState(false)
  const [editingData, setEditingData] = useState<GrowthData | null>(null)
  const [activeChart, setActiveChart] = useState<'weight' | 'height' | 'head'>('weight')
  const [formData, setFormData] = useState({
    date: '',
    weight: '',
    height: '',
    headCircumference: '',
    notes: ''
  })

  // Load growth data from localStorage
  useEffect(() => {
    const savedData = localStorage.getItem('growthData')
    if (savedData) {
      setGrowthData(JSON.parse(savedData))
    }
  }, [])

  // Save growth data to localStorage
  useEffect(() => {
    localStorage.setItem('growthData', JSON.stringify(growthData))
  }, [growthData])

  // Sort data by date (newest first)
  const sortedData = [...growthData].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  const latestData = sortedData[0]

  // Get last 6 months of data for charts
  const getLast6Months = () => {
    const dates = []
    for (let i = 5; i >= 0; i--) {
      const date = new Date()
      date.setMonth(date.getMonth() - i)
      dates.push(date.toISOString().split('T')[0].substring(0, 7)) // YYYY-MM format
    }
    return dates
  }

  const last6Months = getLast6Months()

  // Calculate insights
  const getGrowthInsights = (): GrowthInsight[] => {
    const insights: GrowthInsight[] = []
    
    if (sortedData.length < 2) return insights

    const latest = sortedData[0]
    const previous = sortedData[1]
    const daysDiff = Math.floor((new Date(latest.date).getTime() - new Date(previous.date).getTime()) / (1000 * 60 * 60 * 24))

    // Weight insight
    if (latest.weight && previous.weight) {
      const weightDiff = latest.weight - previous.weight
      const weightPerDay = weightDiff / daysDiff
      const monthlyGain = weightPerDay * 30

      if (monthlyGain > 0.5) {
        insights.push({
          type: 'weight',
          message: `Your baby gained ${weightDiff.toFixed(1)} kg in ${daysDiff} days (${monthlyGain.toFixed(1)} kg/month)`,
          trend: 'increasing',
          period: `${daysDiff} days`
        })
      } else if (monthlyGain < 0.2) {
        insights.push({
          type: 'weight',
          message: `Slow weight gain: ${weightDiff.toFixed(1)} kg in ${daysDiff} days`,
          trend: 'decreasing',
          period: `${daysDiff} days`
        })
      } else {
        insights.push({
          type: 'weight',
          message: `Steady weight gain: ${weightDiff.toFixed(1)} kg in ${daysDiff} days`,
          trend: 'stable',
          period: `${daysDiff} days`
        })
      }
    }

    // Height insight
    if (latest.height && previous.height) {
      const heightDiff = latest.height - previous.height
      const heightPerDay = heightDiff / daysDiff
      const monthlyGrowth = heightPerDay * 30

      if (monthlyGrowth > 2) {
        insights.push({
          type: 'height',
          message: `Rapid height growth: ${heightDiff.toFixed(1)} cm in ${daysDiff} days`,
          trend: 'increasing',
          period: `${daysDiff} days`
        })
      } else if (monthlyGrowth > 0.5) {
        insights.push({
          type: 'height',
          message: `Steady height growth: ${heightDiff.toFixed(1)} cm in ${daysDiff} days`,
          trend: 'stable',
          period: `${daysDiff} days`
        })
      }
    }

    // Head circumference insight
    if (latest.headCircumference && previous.headCircumference) {
      const headDiff = latest.headCircumference - previous.headCircumference
      const headPerDay = headDiff / daysDiff
      const monthlyGrowth = headPerDay * 30

      if (monthlyGrowth > 1) {
        insights.push({
          type: 'head',
          message: `Good head growth: ${headDiff.toFixed(1)} cm in ${daysDiff} days`,
          trend: 'increasing',
          period: `${daysDiff} days`
        })
      }
    }

    return insights
  }

  const growthInsights = getGrowthInsights()

  const handleAddData = () => {
    const newData: GrowthData = {
      id: Date.now().toString(),
      date: formData.date,
      weight: formData.weight ? parseFloat(formData.weight) : undefined,
      height: formData.height ? parseFloat(formData.height) : undefined,
      headCircumference: formData.headCircumference ? parseFloat(formData.headCircumference) : undefined,
      notes: formData.notes || undefined
    }
    setGrowthData(prev => [newData, ...prev])
    setShowAddModal(false)
    resetForm()
  }

  const handleEditData = () => {
    if (editingData) {
      setGrowthData(prev => prev.map(data => 
        data.id === editingData.id 
          ? { 
              ...data, 
              date: formData.date,
              weight: formData.weight ? parseFloat(formData.weight) : undefined,
              height: formData.height ? parseFloat(formData.height) : undefined,
              headCircumference: formData.headCircumference ? parseFloat(formData.headCircumference) : undefined,
              notes: formData.notes || undefined
            }
          : data
      ))
      setEditingData(null)
      setShowAddModal(false)
      resetForm()
    }
  }

  const handleDeleteData = (id: string) => {
    setGrowthData(prev => prev.filter(data => data.id !== id))
  }

  const resetForm = () => {
    setFormData({
      date: '',
      weight: '',
      height: '',
      headCircumference: '',
      notes: ''
    })
  }

  const openEditModal = (data: GrowthData) => {
    setEditingData(data)
    setFormData({
      date: data.date,
      weight: data.weight?.toString() || '',
      height: data.height?.toString() || '',
      headCircumference: data.headCircumference?.toString() || '',
      notes: data.notes || ''
    })
    setShowAddModal(true)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    })
  }

  const getDaysAgo = (dateString: string) => {
    const days = Math.floor((new Date().getTime() - new Date(dateString).getTime()) / (1000 * 60 * 60 * 24))
    if (days === 0) return 'Today'
    if (days === 1) return 'Yesterday'
    return `${days} days ago`
  }

  const getChartData = (type: 'weight' | 'height' | 'head') => {
    return sortedData
      .filter(data => data[type])
      .map(data => ({
        date: data.date,
        value: data[type]!,
        label: formatDate(data.date)
      }))
      .reverse() // For chronological order in chart
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
            Growth Chart
          </h1>
          <p className="mt-4 text-lg text-gray-700">
            Track your baby's weight, height, and head size to ensure healthy development.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 -mt-24 relative z-10">
        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <button
            onClick={() => {
              resetForm()
              setEditingData(null)
              setShowAddModal(true)
            }}
            className="flex items-center space-x-2 bg-gradient-to-r from-[#F59297] to-[#7da8e6] text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            <Plus className="w-5 h-5" />
            <span>+ Log Growth</span>
          </button>
          
          <button
            onClick={() => setShowHistoryTable(!showHistoryTable)}
            className="flex items-center space-x-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-600"
          >
            <Calendar className="w-5 h-5" />
            <span>{showHistoryTable ? 'Hide' : 'View'} History</span>
          </button>
        </div>

        {/* Growth Summary Cards */}
        {latestData && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {latestData.weight && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="text-2xl">⚖️</div>
                  <div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Weight</div>
                    <div className="text-2xl font-bold text-[#F59297]">{latestData.weight} kg</div>
                  </div>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  Logged {getDaysAgo(latestData.date)}
                </div>
              </div>
            )}
            
            {latestData.height && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="text-2xl">📏</div>
                  <div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Height</div>
                    <div className="text-2xl font-bold text-[#7da8e6]">{latestData.height} cm</div>
                  </div>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  Logged {getDaysAgo(latestData.date)}
                </div>
              </div>
            )}
            
            {latestData.headCircumference && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="text-2xl">🧠</div>
                  <div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Head Circumference</div>
                    <div className="text-2xl font-bold text-green-500">{latestData.headCircumference} cm</div>
                  </div>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  Logged {getDaysAgo(latestData.date)}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Growth Insights */}
        {growthInsights.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-8">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2" />
              Growth Insights
            </h3>
            <div className="space-y-3">
              {growthInsights.map((insight, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg ${
                    insight.trend === 'increasing' 
                      ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800'
                      : insight.trend === 'decreasing'
                      ? 'bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800'
                      : 'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800'
                  }`}
                >
                  <p className={`text-sm font-medium ${
                    insight.trend === 'increasing' 
                      ? 'text-green-800 dark:text-green-200'
                      : insight.trend === 'decreasing'
                      ? 'text-yellow-800 dark:text-yellow-200'
                      : 'text-blue-800 dark:text-blue-200'
                  }`}>
                    {insight.message}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Growth Charts */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-8">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <BarChart3 className="w-5 h-5 mr-2" />
            Growth Charts
          </h3>
          
          {/* Chart Tabs */}
          <div className="flex justify-center mb-6">
            <div className="flex bg-gray-100 dark:bg-gray-700 rounded-full p-1">
              {[
                { value: 'weight', label: 'Weight', icon: '⚖️' },
                { value: 'height', label: 'Height', icon: '📏' },
                { value: 'head', label: 'Head', icon: '🧠' }
              ].map((chart) => (
                <button
                  key={chart.value}
                  onClick={() => setActiveChart(chart.value as any)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeChart === chart.value
                      ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-lg'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  <span>{chart.icon}</span>
                  <span>{chart.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Chart Display */}
          <div className="h-64 bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            {(() => {
              const chartData = getChartData(activeChart)
              if (chartData.length === 0) {
                return (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                      <div className="text-4xl mb-4">
                        {activeChart === 'weight' ? '⚖️' : activeChart === 'height' ? '📏' : '🧠'}
                      </div>
                      <p className="text-gray-600 dark:text-gray-400">
                        No {activeChart} data available. Add your first measurement!
                      </p>
                    </div>
                  </div>
                )
              }

              // Simple bar chart representation
              const maxValue = Math.max(...chartData.map(d => d.value))
              const minValue = Math.min(...chartData.map(d => d.value))
              const range = maxValue - minValue

              return (
                <div className="h-full flex items-end justify-between space-x-2">
                  {chartData.map((data, index) => {
                    const height = range > 0 ? ((data.value - minValue) / range) * 100 : 50
                    return (
                      <div key={index} className="flex-1 flex flex-col items-center">
                        <div 
                          className="w-full bg-gradient-to-t from-[#F59297] to-[#7da8e6] rounded-t-lg transition-all duration-300 hover:opacity-80"
                          style={{ height: `${Math.max(height, 10)}%` }}
                          title={`${data.label}: ${data.value} ${activeChart === 'weight' ? 'kg' : 'cm'}`}
                        />
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
                          {data.value}
                        </div>
                      </div>
                    )
                  })}
                </div>
              )
            })()}
          </div>
        </div>

        {/* History Table */}
        {showHistoryTable && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-8">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              Growth History
            </h3>
            
            {sortedData.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-4xl mb-4">📈</div>
                <p className="text-gray-600 dark:text-gray-400">
                  No growth data recorded yet. Add your first measurement!
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Date</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Weight (kg)</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Height (cm)</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Head (cm)</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Notes</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedData.map((data) => (
                      <tr key={data.id} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                        <td className="py-3 px-4 text-gray-900 dark:text-white">{formatDate(data.date)}</td>
                        <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{data.weight || '-'}</td>
                        <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{data.height || '-'}</td>
                        <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{data.headCircumference || '-'}</td>
                        <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{data.notes || '-'}</td>
                        <td className="py-3 px-4">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => openEditModal(data)}
                              className="p-1 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded transition-colors"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteData(data.id)}
                              className="p-1 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Add/Edit Growth Data Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-md w-full">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                {editingData ? 'Edit Growth Data' : 'Log New Growth Data'}
              </h3>
              <button
                onClick={() => {
                  setShowAddModal(false)
                  setEditingData(null)
                  resetForm()
                }}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={(e) => {
              e.preventDefault()
              editingData ? handleEditData() : handleAddData()
            }}>
              <div className="space-y-4">
                {/* Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Date of Measurement
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#F59297] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    required
                  />
                </div>

                {/* Weight */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Weight (kg) - Optional
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    placeholder="e.g., 7.5"
                    value={formData.weight}
                    onChange={(e) => setFormData(prev => ({ ...prev, weight: e.target.value }))}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#F59297] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>

                {/* Height */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Height (cm) - Optional
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    placeholder="e.g., 65.0"
                    value={formData.height}
                    onChange={(e) => setFormData(prev => ({ ...prev, height: e.target.value }))}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#F59297] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>

                {/* Head Circumference */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Head Circumference (cm) - Optional
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    placeholder="e.g., 42.0"
                    value={formData.headCircumference}
                    onChange={(e) => setFormData(prev => ({ ...prev, headCircumference: e.target.value }))}
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
                    placeholder="e.g., measured at doctor's office, baby was calm..."
                    rows={3}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#F59297] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#F59297] to-[#7da8e6] text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
                >
                  {editingData ? 'Update Data' : 'Log Growth Data'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
} 