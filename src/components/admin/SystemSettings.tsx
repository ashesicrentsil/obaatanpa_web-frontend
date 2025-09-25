'use client'

import { useState } from 'react'
import { Settings, Shield, Database, Mail, Bell } from 'lucide-react'

const SystemSettings = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            System Settings
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Configure system-wide settings and preferences
          </p>
        </div>
      </div>

      {/* Settings Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
              <Settings className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              General Settings
            </h3>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Configure basic system preferences and defaults
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Security Settings
            </h3>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Manage security policies and access controls
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
              <Database className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Database Settings
            </h3>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Configure database connections and backups
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center">
              <Mail className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Email Settings
            </h3>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Configure email templates and SMTP settings
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center">
              <Bell className="w-6 h-6 text-red-600 dark:text-red-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Notifications
            </h3>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Manage system notifications and alerts
          </p>
        </div>
      </div>

      {/* Settings Placeholder */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-12 shadow-lg border border-gray-200 dark:border-gray-700 text-center">
        <div className="text-6xl mb-4">⚙️</div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          System Configuration
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Advanced system settings and configuration options coming soon.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center justify-center space-x-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span>System Configuration</span>
          </div>
          <div className="flex items-center justify-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>Security Management</span>
          </div>
          <div className="flex items-center justify-center space-x-2">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            <span>Performance Monitoring</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SystemSettings
