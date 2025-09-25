'use client'

import { useState } from 'react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { Search, Filter, Plus, Calendar, MessageCircle, FileText, MoreVertical, User, Clock, AlertTriangle } from 'lucide-react'

export default function PractitionerPatientsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedFilter, setSelectedFilter] = useState('all')
  const [viewMode, setViewMode] = useState('grid')

  const filters = [
    { id: 'all', label: 'All Patients', count: 156 },
    { id: 'pregnant', label: 'Pregnant', count: 89 },
    { id: 'postpartum', label: 'Postpartum', count: 45 },
    { id: 'high-risk', label: 'High Risk', count: 12 },
    { id: 'due-soon', label: 'Due Soon', count: 8 }
  ]

  const patients = [
    {
      id: 1,
      name: 'Akosua Mensah',
      age: 28,
      status: 'pregnant',
      gestationalAge: '32 weeks',
      dueDate: '2024-03-15',
      lastVisit: '2024-01-10',
      nextAppointment: '2024-01-20',
      riskLevel: 'low',
      phone: '+233 24 123 4567',
      email: 'akosua.mensah@email.com',
      notes: 'Routine pregnancy, no complications',
      unreadMessages: 2,
      avatar: '/images/patients/patient-1.jpg'
    },
    {
      id: 2,
      name: 'Ama Osei',
      age: 32,
      status: 'postpartum',
      gestationalAge: '2 weeks postpartum',
      dueDate: '2024-01-01',
      lastVisit: '2024-01-08',
      nextAppointment: '2024-01-22',
      riskLevel: 'low',
      phone: '+233 24 234 5678',
      email: 'ama.osei@email.com',
      notes: 'Breastfeeding well, recovering normally',
      unreadMessages: 0,
      avatar: '/images/patients/patient-2.jpg'
    },
    {
      id: 3,
      name: 'Efua Boateng',
      age: 24,
      status: 'pregnant',
      gestationalAge: '8 weeks',
      dueDate: '2024-08-20',
      lastVisit: '2024-01-05',
      nextAppointment: '2024-02-05',
      riskLevel: 'low',
      phone: '+233 24 345 6789',
      email: 'efua.boateng@email.com',
      notes: 'First pregnancy, experiencing morning sickness',
      unreadMessages: 1,
      avatar: '/images/patients/patient-3.jpg'
    },
    {
      id: 4,
      name: 'Adwoa Asante',
      age: 35,
      status: 'pregnant',
      gestationalAge: '20 weeks',
      dueDate: '2024-06-10',
      lastVisit: '2024-01-12',
      nextAppointment: '2024-01-25',
      riskLevel: 'medium',
      phone: '+233 24 456 7890',
      email: 'adwoa.asante@email.com',
      notes: 'Advanced maternal age, monitoring closely',
      unreadMessages: 0,
      avatar: '/images/patients/patient-4.jpg'
    },
    {
      id: 5,
      name: 'Yaa Amponsah',
      age: 29,
      status: 'pregnant',
      gestationalAge: '36 weeks',
      dueDate: '2024-02-05',
      lastVisit: '2024-01-14',
      nextAppointment: '2024-01-18',
      riskLevel: 'high',
      phone: '+233 24 567 8901',
      email: 'yaa.amponsah@email.com',
      notes: 'Gestational diabetes, requires close monitoring',
      unreadMessages: 3,
      avatar: '/images/patients/patient-5.jpg'
    },
    {
      id: 6,
      name: 'Abena Kwarteng',
      age: 26,
      status: 'postpartum',
      gestationalAge: '6 weeks postpartum',
      dueDate: '2023-12-05',
      lastVisit: '2024-01-11',
      nextAppointment: '2024-02-08',
      riskLevel: 'low',
      phone: '+233 24 678 9012',
      email: 'abena.kwarteng@email.com',
      notes: 'Postpartum depression screening needed',
      unreadMessages: 1,
      avatar: '/images/patients/patient-6.jpg'
    }
  ]

  const filteredPatients = patients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         patient.email.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesFilter = selectedFilter === 'all' || 
                         (selectedFilter === 'pregnant' && patient.status === 'pregnant') ||
                         (selectedFilter === 'postpartum' && patient.status === 'postpartum') ||
                         (selectedFilter === 'high-risk' && patient.riskLevel === 'high') ||
                         (selectedFilter === 'due-soon' && patient.status === 'pregnant' && 
                          new Date(patient.dueDate) <= new Date(Date.now() + 30 * 24 * 60 * 60 * 1000))
    
    return matchesSearch && matchesFilter
  })

  const getRiskColor = (risk: string) => {
    switch (risk) {
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pregnant':
        return 'bg-[#F59297]/10 text-[#F59297] border-[#F59297]/20'
      case 'postpartum':
        return 'bg-[#7da8e6]/10 text-[#7da8e6] border-[#7da8e6]/20'
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
              Patient Management
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
              Manage your patients' care journey from pregnancy to postpartum
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/70 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search patients by name or email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/30"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters and Actions */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            
            {/* Filters */}
            <div className="flex flex-wrap gap-3">
              {filters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setSelectedFilter(filter.id)}
                  className={`px-4 py-2 rounded-2xl font-medium transition-all duration-200 ${
                    selectedFilter === filter.id
                      ? 'bg-[#F59297] text-white shadow-lg'
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 shadow-md'
                  }`}
                >
                  {filter.label}
                  <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                    selectedFilter === filter.id
                      ? 'bg-white/20 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                  }`}>
                    {filter.count}
                  </span>
                </button>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <Filter className="w-4 h-4" />
                <span>More Filters</span>
              </button>
              
              <button className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-[#F59297] to-[#7da8e6] text-white rounded-lg hover:shadow-lg transition-all duration-200">
                <Plus className="w-4 h-4" />
                <span>Add Patient</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Patients Grid */}
      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {selectedFilter === 'all' ? 'All Patients' : filters.find(f => f.id === selectedFilter)?.label}
            </h2>
            <span className="text-gray-600 dark:text-gray-400">
              {filteredPatients.length} patients found
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPatients.map((patient) => (
              <div key={patient.id} className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                
                {/* Patient Header */}
                <div className="p-6 border-b border-gray-100 dark:border-gray-700">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-[#F59297] to-[#7da8e6] rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold">
                          {patient.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 dark:text-white">
                          {patient.name}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Age {patient.age}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {patient.unreadMessages > 0 && (
                        <div className="w-6 h-6 bg-[#F59297] text-white rounded-full flex items-center justify-center text-xs font-medium">
                          {patient.unreadMessages}
                        </div>
                      )}
                      <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 mb-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(patient.status)}`}>
                      {patient.status === 'pregnant' ? 'Pregnant' : 'Postpartum'}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(patient.riskLevel)}`}>
                      {patient.riskLevel} risk
                    </span>
                  </div>
                  
                  <p className="text-sm font-medium text-[#F59297]">
                    {patient.gestationalAge}
                  </p>
                </div>

                {/* Patient Details */}
                <div className="p-6">
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Due Date:</span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {new Date(patient.dueDate).toLocaleDateString()}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Last Visit:</span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {new Date(patient.lastVisit).toLocaleDateString()}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Next Appointment:</span>
                      <span className="font-medium text-[#7da8e6]">
                        {new Date(patient.nextAppointment).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                      {patient.notes}
                    </p>
                  </div>
                  
                  {patient.riskLevel === 'high' && (
                    <div className="flex items-center p-2 bg-red-50 dark:bg-red-900/20 rounded-lg mb-4">
                      <AlertTriangle className="w-4 h-4 text-red-500 mr-2" />
                      <span className="text-xs text-red-700 dark:text-red-300 font-medium">
                        Requires close monitoring
                      </span>
                    </div>
                  )}
                  
                  {/* Action Buttons */}
                  <div className="flex space-x-2">
                    <button className="flex-1 flex items-center justify-center space-x-2 py-2 px-3 bg-[#F59297] text-white rounded-lg hover:bg-[#e67d82] transition-colors">
                      <User className="w-4 h-4" />
                      <span className="text-sm">View Profile</span>
                    </button>
                    
                    <button className="p-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                      <MessageCircle className="w-4 h-4" />
                    </button>
                    
                    <button className="p-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                      <Calendar className="w-4 h-4" />
                    </button>
                    
                    <button className="p-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                      <FileText className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {filteredPatients.length === 0 && (
            <div className="text-center py-12">
              <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No patients found
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
