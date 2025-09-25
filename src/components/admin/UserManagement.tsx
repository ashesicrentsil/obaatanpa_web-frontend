'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { 
  Search, 
  Filter, 
  MoreVertical, 
  Edit, 
  Trash2, 
  Eye, 
  UserCheck, 
  UserX,
  Download,
  Plus,
  Calendar,
  Mail,
  Phone,
  MapPin,
  Baby,
  Heart,
  Loader2,
  AlertTriangle,
  X
} from 'lucide-react'
import axios from 'axios'

interface User {
  id: number
  first_name: string
  last_name: string
  email: string
  care_type: string
  dob: string
}

const UserManagement = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedFilter, setSelectedFilter] = useState('all')
  const [selectedUsers, setSelectedUsers] = useState<number[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [showDetailsModal, setShowDetailsModal] = useState(false)
  const [authToken, setAuthToken] = useState<string | null>(null)

  // Load token from localStorage
  useEffect(() => {
    const token = localStorage.getItem('authToken')
    if (token) {
      setAuthToken(token)
    }
  }, [])

  // Fetch users on mount and when filter changes to 'all'
  useEffect(() => {
    if (authToken && selectedFilter === 'all') {
      fetchUsers()
    }
  }, [authToken, selectedFilter])

  const fetchUsers = async () => {
    if (!authToken) {
      setError('Please log in to fetch users.')
      return
    }
    setLoading(true)
    setError(null)
    try {
      const response = await axios.get<User[]>('https://obaatanpa-backend.onrender.com/admin/patients/get', {
        headers: { Authorization: `Bearer ${authToken}` }
      })
      setUsers(response.data)
    } catch (err: any) {
      console.error('Fetch Users Error:', {
        message: err.message,
        status: err.response?.status,
        data: err.response?.data || 'No response data'
      })
      setError(err.response?.status === 404 
        ? 'User service not found. Please check if the server is running.'
        : `Failed to fetch users: ${err.response?.data?.message || 'Please try again later.'}`)
      if (err.response?.status === 401) {
        localStorage.removeItem('authToken')
        localStorage.removeItem('currentUser')
        setAuthToken(null)
      }
    } finally {
      setLoading(false)
    }
  }

  const filteredUsers = users.filter(user => {
    const matchesSearch = `${user.first_name} ${user.last_name}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase())
    
    if (selectedFilter === 'all') return matchesSearch
    return matchesSearch && user.care_type === selectedFilter
  })

  const filterOptions = [
    { value: 'all', label: 'All Users', count: users.length },
    { value: 'prenatal', label: 'Prenatal', count: users.filter(u => u.care_type === 'prenatal').length },
    { value: 'postnatal', label: 'Postnatal', count: users.filter(u => u.care_type === 'postnatal').length }
  ]

  const handleSelectUser = (userId: number) => {
    setSelectedUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    )
  }

  const handleSelectAll = () => {
    if (selectedUsers.length === filteredUsers.length && filteredUsers.length > 0) {
      setSelectedUsers([])
    } else {
      setSelectedUsers(filteredUsers.map(user => user.id))
    }
  }

  const handleViewUser = (user: User) => {
    setSelectedUser(user)
    setShowDetailsModal(true)
  }

  const getUserTypeIcon = (careType: string) => {
    switch (careType) {
      case 'prenatal':
        return <Heart className="w-4 h-4 text-pink-500" />
      case 'postnatal':
        return <Baby className="w-4 h-4 text-blue-500" />
      default:
        return null
    }
  }

  const getUserTypeLabel = (careType: string) => {
    switch (careType) {
      case 'prenatal':
        return 'Prenatal'
      case 'postnatal':
        return 'Postnatal'
      default:
        return careType.charAt(0).toUpperCase() + careType.slice(1)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            User Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage and monitor all users on the Obaatanpa platform
          </p>
        </div>
        
        <div className="mt-4 md:mt-0 flex items-center space-x-3">
          <button className="inline-flex items-center px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200">
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>
          <button className="inline-flex items-center px-4 py-2 bg-[#F59297] text-white rounded-lg hover:bg-[#e67d82] transition-colors duration-200">
            <Plus className="w-4 h-4 mr-2" />
            Add User
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

      {/* Filters and Search */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search users..."
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
          <p className="text-gray-600 dark:text-gray-400">Loading users...</p>
        </div>
      )}

      {/* Users Table */}
      {!loading && (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
                  onChange={handleSelectAll}
                  className="w-4 h-4 text-[#F59297] bg-gray-100 border-gray-300 rounded focus:ring-[#F59297] focus:ring-2"
                />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {selectedUsers.length > 0 ? `${selectedUsers.length} selected` : `${filteredUsers.length} users`}
                </span>
              </div>
              
              {selectedUsers.length > 0 && (
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                    <Mail className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-red-600">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    DOB
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
                      No users found
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-3">
                          <input
                            type="checkbox"
                            checked={selectedUsers.includes(user.id)}
                            onChange={() => handleSelectUser(user.id)}
                            className="w-4 h-4 text-[#F59297] bg-gray-100 border-gray-300 rounded focus:ring-[#F59297] focus:ring-2"
                          />
                          <Image
                            src="/images/users/default-avatar.png"
                            alt={`${user.first_name} ${user.last_name}`}
                            width={40}
                            height={40}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <div>
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                              {user.first_name} {user.last_name}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              {user.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          {getUserTypeIcon(user.care_type)}
                          <span className="text-sm text-gray-900 dark:text-white capitalize">
                            {getUserTypeLabel(user.care_type)}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {new Date(user.dob).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <button 
                            onClick={() => handleViewUser(user)}
                            className="p-1 text-gray-400 hover:text-blue-600"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="p-1 text-gray-400 hover:text-green-600">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="p-1 text-gray-400 hover:text-red-600">
                            <Trash2 className="w-4 h-4" />
                          </button>
                          <button className="p-1 text-gray-400 hover:text-gray-600">
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Showing 1 to {filteredUsers.length} of {filteredUsers.length} results
              </div>
              <div className="flex items-center space-x-2">
                <button className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-600">
                  Previous
                </button>
                <button className="px-3 py-1 text-sm bg-[#F59297] text-white rounded hover:bg-[#e67d82]">
                  1
                </button>
                <button className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-600">
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* User Details Modal */}
      {showDetailsModal && selectedUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">User Details</h3>
              <button
                onClick={() => {
                  setShowDetailsModal(false)
                  setSelectedUser(null)
                }}
                className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <Image
                  src="/images/users/default-avatar.png"
                  alt={`${selectedUser.first_name} ${selectedUser.last_name}`}
                  width={80}
                  height={80}
                  className="w-20 h-20 rounded-full object-cover"
                />
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {selectedUser.first_name} {selectedUser.last_name}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                    {getUserTypeLabel(selectedUser.care_type)}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Email</label>
                  <p className="text-gray-900 dark:text-white">{selectedUser.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Date of Birth</label>
                  <p className="text-gray-900 dark:text-white">{new Date(selectedUser.dob).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => {
                    setShowDetailsModal(false)
                    setSelectedUser(null)
                  }}
                  className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default UserManagement