'use client'

import { useState } from 'react'
import NewMotherNavbar from '@/components/dashboard/newmother/NewMotherNavbar'
import { Search, Filter, Download, Play, BookOpen, Users, Star, Clock } from 'lucide-react'

export default function NewMotherResourcesPage() {
  const [activeTab, setActiveTab] = useState('resources')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const categories = [
    { id: 'all', label: 'All Resources', count: 24 },
    { id: 'feeding', label: 'Feeding & Nutrition', count: 8 },
    { id: 'development', label: 'Baby Development', count: 6 },
    { id: 'health', label: 'Health & Safety', count: 5 },
    { id: 'sleep', label: 'Sleep & Routine', count: 5 }
  ]

  const resources = [
    {
      id: 1,
      title: 'Breastfeeding Basics for New Mothers',
      description: 'Complete guide to successful breastfeeding including positioning, latching, and common challenges',
      type: 'Guide',
      category: 'feeding',
      duration: '15 min read',
      rating: 4.9,
      downloads: 1250,
      image: '/images/resources/breastfeeding-guide.jpg',
      tags: ['Breastfeeding', 'Newborn Care', 'Nutrition']
    },
    {
      id: 2,
      title: 'Baby Sleep Training Methods',
      description: 'Evidence-based approaches to help your baby develop healthy sleep patterns',
      type: 'Video',
      category: 'sleep',
      duration: '25 min',
      rating: 4.8,
      downloads: 980,
      image: '/images/resources/sleep-training.jpg',
      tags: ['Sleep Training', 'Baby Sleep', 'Routine']
    },
    {
      id: 3,
      title: 'Newborn Development Milestones',
      description: 'Track your baby\'s growth and development from 0-12 months',
      type: 'Checklist',
      category: 'development',
      duration: '10 min read',
      rating: 4.9,
      downloads: 1500,
      image: '/images/resources/development-milestones.jpg',
      tags: ['Development', 'Milestones', 'Growth']
    },
    {
      id: 4,
      title: 'Postpartum Recovery Guide',
      description: 'Essential information for physical and emotional recovery after childbirth',
      type: 'Guide',
      category: 'health',
      duration: '20 min read',
      rating: 4.7,
      downloads: 890,
      image: '/images/resources/postpartum-recovery.jpg',
      tags: ['Postpartum', 'Recovery', 'Self-Care']
    },
    {
      id: 5,
      title: 'Baby Safety Checklist',
      description: 'Comprehensive safety measures for your home and baby care',
      type: 'Checklist',
      category: 'health',
      duration: '8 min read',
      rating: 4.8,
      downloads: 1100,
      image: '/images/resources/baby-safety.jpg',
      tags: ['Safety', 'Baby Proofing', 'Prevention']
    },
    {
      id: 6,
      title: 'Introduction to Solid Foods',
      description: 'When and how to start introducing solid foods to your baby',
      type: 'Video',
      category: 'feeding',
      duration: '18 min',
      rating: 4.9,
      downloads: 1350,
      image: '/images/resources/solid-foods.jpg',
      tags: ['Weaning', 'Solid Foods', 'Nutrition']
    }
  ]

  const filteredResources = resources.filter(resource => {
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Video':
        return <Play className="w-4 h-4" />
      case 'Guide':
        return <BookOpen className="w-4 h-4" />
      case 'Checklist':
        return <Users className="w-4 h-4" />
      default:
        return <BookOpen className="w-4 h-4" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Video':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      case 'Guide':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
      case 'Checklist':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <NewMotherNavbar 
        activeTab={activeTab}
        onTabChange={setActiveTab}
        userName="Sarah Johnson"
        userProfilePicture="/images/profiles/new-mother-1.jpg"
        notificationCount={3}
      />
      
      {/* Hero Section */}
      <section className="pt-32 pb-12 bg-gradient-to-br from-[#F59297] to-[#7da8e6] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              New Mother Resources
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
              Expert guides, videos, and tools to support you and your baby's journey
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search resources, guides, videos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/30"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-2xl font-medium transition-all duration-200 ${
                  selectedCategory === category.id
                    ? 'bg-[#F59297] text-white shadow-lg'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 shadow-md'
                }`}
              >
                {category.label}
                <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                  selectedCategory === category.id
                    ? 'bg-white/20 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                }`}>
                  {category.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {selectedCategory === 'all' ? 'All Resources' : categories.find(c => c.id === selectedCategory)?.label}
            </h2>
            <div className="flex items-center space-x-4">
              <span className="text-gray-600 dark:text-gray-400">
                {filteredResources.length} resources found
              </span>
              <button className="flex items-center space-x-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <Filter className="w-4 h-4" />
                <span>Filter</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredResources.map((resource) => (
              <div key={resource.id} className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="aspect-video bg-gray-200 dark:bg-gray-700 relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#F59297]/20 to-[#7da8e6]/20 flex items-center justify-center">
                    <div className="text-6xl opacity-50">
                      {resource.category === 'feeding' ? '🍼' : 
                       resource.category === 'sleep' ? '😴' :
                       resource.category === 'development' ? '👶' :
                       resource.category === 'health' ? '🩺' : '📚'}
                    </div>
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(resource.type)}`}>
                      {getTypeIcon(resource.type)}
                      <span className="ml-1">{resource.type}</span>
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    {resource.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                    {resource.description}
                  </p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{resource.duration}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span>{resource.rating}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Download className="w-4 h-4" />
                        <span>{resource.downloads}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {resource.tags.slice(0, 3).map((tag, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-lg">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex space-x-3">
                    <button className="flex-1 bg-gradient-to-r from-[#F59297] to-[#7da8e6] text-white py-3 rounded-2xl font-semibold hover:shadow-lg transition-all duration-200 flex items-center justify-center">
                      {resource.type === 'Video' ? (
                        <>
                          <Play className="w-4 h-4 mr-2" />
                          Watch Now
                        </>
                      ) : (
                        <>
                          <BookOpen className="w-4 h-4 mr-2" />
                          Read Now
                        </>
                      )}
                    </button>
                    <button className="px-4 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {filteredResources.length === 0 && (
            <div className="text-center py-12">
              <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No resources found
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Try adjusting your search or category filter
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
