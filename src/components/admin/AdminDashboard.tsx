'use client'

import { useState } from 'react'
import { 
  Users, 
  Building2, 
  UserCheck, 
  FileText, 
  TrendingUp, 
  TrendingDown,
  Activity,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Clock,
  Star,
  MessageSquare,
  Heart,
  Baby
} from 'lucide-react'

const AdminDashboard = () => {
  const [timeRange, setTimeRange] = useState('7d')

  // Mock data - in real app, this would come from API
  const stats = {
    totalUsers: 12847,
    totalHospitals: 156,
    totalPractitioners: 892,
    totalContent: 1247,
    activeUsers: 8934,
    newSignups: 234,
    appointmentsToday: 89,
    pendingApprovals: 23
  }

  const recentActivity = [
    {
      id: 1,
      type: 'user_signup',
      message: 'New user registered: Akosua Mensah',
      time: '2 minutes ago',
      icon: Users,
      color: 'text-green-600'
    },
    {
      id: 2,
      type: 'hospital_approval',
      message: 'Hospital approval pending: Ridge Hospital',
      time: '15 minutes ago',
      icon: Building2,
      color: 'text-yellow-600'
    },
    {
      id: 3,
      type: 'content_published',
      message: 'New article published: Pregnancy Nutrition Guide',
      time: '1 hour ago',
      icon: FileText,
      color: 'text-blue-600'
    },
    {
      id: 4,
      type: 'practitioner_verified',
      message: 'Dr. Ama Osei verified as midwife',
      time: '2 hours ago',
      icon: UserCheck,
      color: 'text-green-600'
    }
  ]

  const quickActions = [
    {
      id: 1,
      title: 'Approve Hospitals',
      description: '5 hospitals pending approval',
      icon: Building2,
      color: 'bg-yellow-500',
      action: 'Review'
    },
    {
      id: 2,
      title: 'Verify Practitioners',
      description: '12 practitioners awaiting verification',
      icon: UserCheck,
      color: 'bg-blue-500',
      action: 'Verify'
    },
    {
      id: 3,
      title: 'Content Review',
      description: '8 articles need review',
      icon: FileText,
      color: 'bg-purple-500',
      action: 'Review'
    },
    {
      id: 4,
      title: 'User Reports',
      description: '3 user reports to investigate',
      icon: AlertTriangle,
      color: 'bg-red-500',
      action: 'Investigate'
    }
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Welcome back! Here's what's happening with Obaatanpa today.
          </p>
        </div>
        
        <div className="mt-4 md:mt-0">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#F59297] focus:border-transparent"
          >
            <option value="24h">Last 24 hours</option>
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
          </select>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Users */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Users</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.totalUsers.toLocaleString()}</p>
              <div className="flex items-center mt-2">
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600 dark:text-green-400">+12.5%</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>

        {/* Total Hospitals */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Hospitals</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.totalHospitals}</p>
              <div className="flex items-center mt-2">
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600 dark:text-green-400">+8.2%</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
              <Building2 className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </div>

        {/* Total Practitioners */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Practitioners</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.totalPractitioners}</p>
              <div className="flex items-center mt-2">
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600 dark:text-green-400">+15.3%</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
              <UserCheck className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </div>

        {/* Active Users */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Users</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.activeUsers.toLocaleString()}</p>
              <div className="flex items-center mt-2">
                <Activity className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600 dark:text-green-400">Online now</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-pink-100 dark:bg-pink-900 rounded-lg flex items-center justify-center">
              <Activity className="w-6 h-6 text-pink-600 dark:text-pink-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Recent Activity</h3>
              <button className="text-sm text-[#F59297] hover:text-[#e67d82] font-medium">
                View All
              </button>
            </div>
            
            <div className="space-y-4">
              {recentActivity.map((activity) => {
                const IconComponent = activity.icon
                return (
                  <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center bg-gray-100 dark:bg-gray-700`}>
                      <IconComponent className={`w-4 h-4 ${activity.color}`} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {activity.message}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Quick Actions</h3>
            
            <div className="space-y-4">
              {quickActions.map((action) => {
                const IconComponent = action.icon
                return (
                  <div key={action.id} className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 dark:border-gray-600 hover:border-[#F59297] transition-colors duration-200 cursor-pointer group">
                    <div className={`w-10 h-10 ${action.color} rounded-lg flex items-center justify-center`}>
                      <IconComponent className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-[#F59297] transition-colors duration-200">
                        {action.title}
                      </h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {action.description}
                      </p>
                    </div>
                    <button className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full hover:bg-[#F59297] hover:text-white transition-colors duration-200">
                      {action.action}
                    </button>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-pink-500 to-blue-500 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-pink-100">Today's Appointments</p>
              <p className="text-3xl font-bold">{stats.appointmentsToday}</p>
            </div>
            <Calendar className="w-8 h-8 text-pink-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-teal-500 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100">New Signups</p>
              <p className="text-3xl font-bold">{stats.newSignups}</p>
            </div>
            <Users className="w-8 h-8 text-green-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-100">Pending Approvals</p>
              <p className="text-3xl font-bold">{stats.pendingApprovals}</p>
            </div>
            <Clock className="w-8 h-8 text-yellow-200" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
