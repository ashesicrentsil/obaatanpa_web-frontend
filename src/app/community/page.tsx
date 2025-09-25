'use client'

import { useState } from 'react'
import Navigation from '@/components/Navigation'
import CommunityHero from '@/components/community/CommunityHero'
import Footer from '@/components/Footer'
import { MessageCircle, Heart, Users, TrendingUp, Plus, Search, Filter, Pin, Clock, Star } from 'lucide-react'

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState('discussions')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const tabs = [
    { id: 'discussions', label: 'Discussions', icon: MessageCircle, count: 245 },
    { id: 'groups', label: 'Groups', icon: Users, count: 18 },
    { id: 'trending', label: 'Trending', icon: TrendingUp, count: 12 }
  ]

  const categories = [
    { id: 'all', label: 'All Topics', count: 245 },
    { id: 'pregnancy', label: 'Pregnancy', count: 89 },
    { id: 'newborn', label: 'Newborn Care', count: 67 },
    { id: 'nutrition', label: 'Nutrition', count: 45 },
    { id: 'health', label: 'Health & Wellness', count: 34 },
    { id: 'support', label: 'Emotional Support', count: 28 }
  ]

  const discussions = [
    {
      id: 1,
      title: 'Best hospitals for delivery in Accra?',
      author: 'Akosua M.',
      authorAvatar: '/images/community/user-1.jpg',
      category: 'pregnancy',
      content: 'I\'m 32 weeks pregnant and looking for recommendations for good maternity hospitals in Accra. Any experiences to share?',
      replies: 23,
      likes: 15,
      timeAgo: '2 hours ago',
      isPinned: false,
      tags: ['Accra', 'Hospital', 'Delivery']
    },
    {
      id: 2,
      title: 'Breastfeeding tips for new moms',
      author: 'Dr. Ama Osei',
      authorAvatar: '/images/community/expert-1.jpg',
      category: 'newborn',
      content: 'As a lactation consultant, I want to share some essential breastfeeding tips that can help new mothers establish successful nursing...',
      replies: 45,
      likes: 78,
      timeAgo: '4 hours ago',
      isPinned: true,
      isExpert: true,
      tags: ['Breastfeeding', 'Tips', 'Expert Advice']
    },
    {
      id: 3,
      title: 'Healthy Ghanaian meals during pregnancy',
      author: 'Efua B.',
      authorAvatar: '/images/community/user-2.jpg',
      category: 'nutrition',
      content: 'What are some traditional Ghanaian foods that are great for pregnancy? I want to maintain our cultural diet while staying healthy.',
      replies: 31,
      likes: 42,
      timeAgo: '6 hours ago',
      isPinned: false,
      tags: ['Ghanaian Food', 'Pregnancy Nutrition', 'Traditional']
    },
    {
      id: 4,
      title: 'Dealing with morning sickness - what worked for you?',
      author: 'Yaa A.',
      authorAvatar: '/images/community/user-3.jpg',
      category: 'pregnancy',
      content: 'I\'m 8 weeks pregnant and struggling with severe morning sickness. What natural remedies or tips helped you get through this?',
      replies: 67,
      likes: 89,
      timeAgo: '8 hours ago',
      isPinned: false,
      tags: ['Morning Sickness', 'First Trimester', 'Natural Remedies']
    },
    {
      id: 5,
      title: 'Postpartum depression support group',
      author: 'Counselor Adwoa',
      authorAvatar: '/images/community/expert-2.jpg',
      category: 'support',
      content: 'Creating a safe space for mothers experiencing postpartum depression. You are not alone, and it\'s okay to ask for help.',
      replies: 28,
      likes: 156,
      timeAgo: '12 hours ago',
      isPinned: true,
      isExpert: true,
      tags: ['Postpartum Depression', 'Support', 'Mental Health']
    },
    {
      id: 6,
      title: 'Baby sleep training methods that work',
      author: 'Abena K.',
      authorAvatar: '/images/community/user-4.jpg',
      category: 'newborn',
      content: 'My 4-month-old still wakes up every 2 hours. Has anyone tried sleep training? What methods worked for your babies?',
      replies: 39,
      likes: 52,
      timeAgo: '1 day ago',
      isPinned: false,
      tags: ['Sleep Training', 'Baby Sleep', '4 Months']
    }
  ]

  const groups = [
    {
      id: 1,
      name: 'First Time Moms Ghana',
      description: 'Support group for first-time mothers in Ghana',
      members: 1247,
      posts: 89,
      category: 'Support',
      isPrivate: false,
      image: '/images/community/group-1.jpg'
    },
    {
      id: 2,
      name: 'Breastfeeding Support Circle',
      description: 'Tips, advice, and support for breastfeeding mothers',
      members: 892,
      posts: 156,
      category: 'Newborn Care',
      isPrivate: false,
      image: '/images/community/group-2.jpg'
    },
    {
      id: 3,
      name: 'Accra Moms Network',
      description: 'Local community for mothers in Greater Accra',
      members: 634,
      posts: 234,
      category: 'Local',
      isPrivate: false,
      image: '/images/community/group-3.jpg'
    },
    {
      id: 4,
      name: 'Pregnancy After 35',
      description: 'Support for mothers pregnant after age 35',
      members: 423,
      posts: 67,
      category: 'Support',
      isPrivate: true,
      image: '/images/community/group-4.jpg'
    }
  ]

  const filteredDiscussions = discussions.filter(discussion => {
    const matchesCategory = selectedCategory === 'all' || discussion.category === selectedCategory
    const matchesSearch = discussion.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         discussion.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         discussion.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  const getCategoryColor = (category: string) => {
    const colors = {
      pregnancy: 'bg-[#F59297]/10 text-[#F59297]',
      newborn: 'bg-[#7da8e6]/10 text-[#7da8e6]',
      nutrition: 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400',
      health: 'bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-400',
      support: 'bg-orange-100 text-orange-600 dark:bg-orange-900 dark:text-orange-400'
    }
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-600'
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation />

      {/* Hero Section */}
      <CommunityHero />

      {/* Search and Tabs */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search discussions, groups, or topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-2xl focus:ring-2 focus:ring-[#F59297] focus:border-transparent"
              />
            </div>
          </div>

          {/* Tabs */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex bg-white dark:bg-gray-800 rounded-2xl p-1 shadow-lg">
              {tabs.map((tab) => {
                const IconComponent = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                      activeTab === tab.id
                        ? 'bg-[#F59297] text-white shadow-md'
                        : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                    }`}
                  >
                    <IconComponent className="w-4 h-4 mr-2" />
                    {tab.label}
                    <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                      activeTab === tab.id
                        ? 'bg-white/20 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                    }`}>
                      {tab.count}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            
            {/* Sidebar - Categories */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg sticky top-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                    Categories
                  </h3>
                  <Filter className="w-4 h-4 text-gray-400" />
                </div>
                
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-200 ${
                        selectedCategory === category.id
                          ? 'bg-[#F59297]/10 text-[#F59297] border border-[#F59297]/20'
                          : 'hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      <span className="font-medium">{category.label}</span>
                      <span className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
                        {category.count}
                      </span>
                    </button>
                  ))}
                </div>

                <button className="w-full mt-6 bg-gradient-to-r from-[#F59297] to-[#7da8e6] text-white py-3 rounded-2xl font-semibold hover:shadow-lg transition-all duration-200 flex items-center justify-center">
                  <Plus className="w-4 h-4 mr-2" />
                  Start Discussion
                </button>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-3">
              {activeTab === 'discussions' && (
                <div className="space-y-6">
                  {filteredDiscussions.map((discussion) => (
                    <div key={discussion.id} className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-[#F59297] to-[#7da8e6] rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-white font-semibold">
                            {discussion.author.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-3 mb-2">
                            {discussion.isPinned && (
                              <Pin className="w-4 h-4 text-[#F59297]" />
                            )}
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                              {discussion.title}
                            </h3>
                            {discussion.isExpert && (
                              <span className="px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full text-xs font-medium flex items-center">
                                <Star className="w-3 h-3 mr-1" />
                                Expert
                              </span>
                            )}
                          </div>
                          
                          <div className="flex items-center space-x-3 mb-3">
                            <span className="font-medium text-gray-900 dark:text-white">
                              {discussion.author}
                            </span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(discussion.category)}`}>
                              {discussion.category}
                            </span>
                            <div className="flex items-center text-gray-500 text-xs">
                              <Clock className="w-3 h-3 mr-1" />
                              {discussion.timeAgo}
                            </div>
                          </div>
                          
                          <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                            {discussion.content}
                          </p>
                          
                          <div className="flex flex-wrap gap-2 mb-4">
                            {discussion.tags.map((tag, index) => (
                              <span key={index} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-lg">
                                #{tag}
                              </span>
                            ))}
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <button className="flex items-center space-x-2 text-gray-500 hover:text-[#F59297] transition-colors">
                                <Heart className="w-4 h-4" />
                                <span className="text-sm">{discussion.likes}</span>
                              </button>
                              <button className="flex items-center space-x-2 text-gray-500 hover:text-[#7da8e6] transition-colors">
                                <MessageCircle className="w-4 h-4" />
                                <span className="text-sm">{discussion.replies} replies</span>
                              </button>
                            </div>
                            
                            <button className="text-[#F59297] hover:text-[#e67d82] font-medium text-sm">
                              Read More →
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'groups' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {groups.map((group) => (
                    <div key={group.id} className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                      <div className="aspect-video bg-gradient-to-br from-[#F59297]/20 to-[#7da8e6]/20 rounded-2xl mb-4 flex items-center justify-center">
                        <Users className="w-12 h-12 text-[#F59297] opacity-50" />
                      </div>
                      
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                          {group.name}
                        </h3>
                        {group.isPrivate && (
                          <span className="px-2 py-1 bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 rounded-full text-xs font-medium">
                            Private
                          </span>
                        )}
                      </div>
                      
                      <p className="text-gray-600 dark:text-gray-300 mb-4">
                        {group.description}
                      </p>
                      
                      <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
                        <span>{group.members.toLocaleString()} members</span>
                        <span>{group.posts} posts</span>
                      </div>
                      
                      <button className="w-full bg-gradient-to-r from-[#F59297] to-[#7da8e6] text-white py-3 rounded-2xl font-semibold hover:shadow-lg transition-all duration-200">
                        {group.isPrivate ? 'Request to Join' : 'Join Group'}
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
