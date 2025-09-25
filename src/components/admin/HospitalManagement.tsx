'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { 
  Search, 
  MoreVertical, 
  Edit, 
  Trash2, 
  Eye, 
  Download,
  Plus,
  Mail,
  Users,
  Loader2,
  AlertTriangle
} from 'lucide-react'
import axios from 'axios'

interface Hospital {
  id: number
  name: string
  email: string
}

const HospitalManagement = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedFilter, setSelectedFilter] = useState('all')
  const [selectedHospitals, setSelectedHospitals] = useState<number[]>([])
  const [hospitals, setHospitals] = useState<Hospital[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [authToken, setAuthToken] = useState<string | null>(null)

  // Load authToken from localStorage
  useEffect(() => {
    const token = localStorage.getItem('authToken')
    if (token) {
      setAuthToken(token)
    }
  }, [])

  // Fetch hospitals when filter is 'all' and authToken is available
  useEffect(() => {
    if (authToken && selectedFilter === 'all') {
      fetchHospitals()
    }
  }, [authToken, selectedFilter])

  const fetchHospitals = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await axios.get<Hospital[]>('https://obaatanpa-backend.onrender.com/admin/hospitals/get', {
        headers: { Authorization: `Bearer ${authToken}` }
      })
      setHospitals(response.data)
    } catch (err: any) {
      console.error('Fetch Hospitals Error:', {
        message: err.message,
        status: err.response?.status,
        data: err.response?.data || 'No response data'
      })
      setError(err.response?.status === 404 
        ? 'No hospitals found.'
        : `Failed to fetch hospitals: ${err.response?.data?.message || 'Please try again later.'}`)
      if (err.response?.status === 401) {
        localStorage.removeItem('authToken')
        localStorage.removeItem('currentUser')
        setAuthToken(null)
      }
    } finally {
      setLoading(false)
    }
  }

  const filterOptions = [
    { value: 'all', label: 'All Hospitals', count: hospitals.length }
  ]

  const filteredHospitals = hospitals.filter(hospital => {
    const matchesSearch = hospital.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         hospital.email.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesSearch
  })

  const handleSelectHospital = (hospitalId: number) => {
    setSelectedHospitals(prev => 
      prev.includes(hospitalId) 
        ? prev.filter(id => id !== hospitalId)
        : [...prev, hospitalId]
    )
  }

  const handleSelectAll = () => {
    if (selectedHospitals.length === filteredHospitals.length && filteredHospitals.length > 0) {
      setSelectedHospitals([])
    } else {
      setSelectedHospitals(filteredHospitals.map(hospital => hospital.id))
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Hospital Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage hospital registrations and monitor their activities
          </p>
        </div>
        
        <div className="mt-4 md:mt-0 flex items-center space-x-3">
          <button className="inline-flex items-center px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200">
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>
          <button className="inline-flex items-center px-4 py-2 bg-[#F59297] text-white rounded-lg hover:bg-[#e67d82] transition-colors duration-200">
            <Plus className="w-4 h-4 mr-2" />
            Add Hospital
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-4">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5" />
            <p className="text-red-800 dark:text-red-200">{error}</p>
          </div>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Hospitals</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{hospitals.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search hospitals..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#F59297] focus:border-transparent"
            />
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center space-x-2 overflow-x-auto">
            {filterOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setSelectedFilter(option.value)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition-all duration-200 ${
                  selectedFilter === option.value
                    ? 'bg-[#F59297] text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                <span>{option.label}</span>
                <span className={`px-2 py-0.5 rounded-full text-xs ${
                  selectedFilter === option.value
                    ? 'bg-white/20 text-white'
                    : 'bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-400'
                }`}>
                  {option.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 text-center">
          <Loader2 className="w-8 h-8 animate-spin text-[#F59297] mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Loading hospitals...</p>
        </div>
      )}

      {/* Hospitals Grid */}
      {!loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHospitals.map((hospital) => (
            <div key={hospital.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-shadow duration-300">
              {/* Header */}
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <Image
                      src="/images/hospitals/default-hospital.png"
                      alt={hospital.name}
                      width={48}
                      height={48}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {hospital.name}
                      </h3>
                    </div>
                  </div>
                  <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                  <Mail className="w-4 h-4" />
                  <span>{hospital.email}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-gray-400 hover:text-blue-600">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-green-600">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-red-600">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && filteredHospitals.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">🏥</div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No hospitals found
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            Try adjusting your search criteria
          </p>
        </div>
      )}
    </div>
  )
}

export default HospitalManagement