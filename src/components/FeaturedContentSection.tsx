'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Calendar, Clock, ArrowRight, Bell, BookOpen, AlertCircle } from 'lucide-react'

const FeaturedContentSection = () => {
  const [activeTab, setActiveTab] = useState('blog')

  const blogPosts = [
    {
      id: 1,
      title: 'Essential Nutrients During Pregnancy: A Ghanaian Mother\'s Guide',
      excerpt: 'Discover the key nutrients you need during pregnancy and how to get them from local Ghanaian foods.',
      author: 'Dr. Akosua Mensah',
      date: 'January 15, 2024',
      readTime: '5 min read',
      image: '/images/blog/essential.jpg',
      category: 'Nutrition',
      featured: true
    },
    {
      id: 2,
      title: 'Preparing for Labor: Traditional and Modern Approaches',
      excerpt: 'Learn about both traditional Ghanaian birthing practices and modern medical approaches to labor preparation.',
      author: 'Midwife Sarah Osei',
      date: 'January 12, 2024',
      readTime: '7 min read',
      image: '/images/blog/labor-prep.jpg',
      category: 'Birth Preparation'
    },
    {
      id: 3,
      title: 'Postpartum Care: The First 40 Days',
      excerpt: 'Understanding the importance of the first 40 days after birth and how to care for yourself and your baby.',
      author: 'Dr. Kwame Asante',
      date: 'January 10, 2024',
      readTime: '6 min read',
      image: '/images/blog/postpartum.png',
      category: 'Postpartum'
    }
  ]

  const healthAlerts = [
    {
      id: 1,
      title: 'Malaria Prevention During Pregnancy',
      description: 'Important updates on malaria prevention for pregnant women in Ghana.',
      type: 'alert',
      date: 'January 16, 2024',
      urgent: true
    },
    {
      id: 2,
      title: 'Vaccination Schedule Update',
      description: 'New recommendations for infant vaccination schedules.',
      type: 'info',
      date: 'January 14, 2024',
      urgent: false
    }
  ]

  const upcomingEvents = [
    {
      id: 1,
      title: 'Breastfeeding Workshop',
      description: 'Learn proper breastfeeding techniques and overcome common challenges.',
      date: 'January 25, 2024',
      time: '10:00 AM',
      type: 'workshop',
      spots: 15
    },
    {
      id: 2,
      title: 'Prenatal Yoga Class',
      description: 'Gentle yoga exercises designed specifically for pregnant women.',
      date: 'January 28, 2024',
      time: '6:00 PM',
      type: 'class',
      spots: 8
    },
    {
      id: 3,
      title: 'New Parent Support Group',
      description: 'Connect with other new parents and share experiences.',
      date: 'February 1, 2024',
      time: '2:00 PM',
      type: 'support',
      spots: 20
    }
  ]

  const tabs = [
    { id: 'blog', label: 'Latest Articles', icon: BookOpen },
    { id: 'alerts', label: 'Health Alerts', icon: AlertCircle },
    { id: 'events', label: 'Upcoming Events', icon: Calendar }
  ]

  return (
    <section className="py-20 bg-white dark:bg-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16" data-aos="fade-up">
          <div className="inline-flex items-center bg-primary-100 dark:bg-primary-900/30 rounded-full px-4 py-2 mb-4">
            <Bell className="w-4 h-4 text-primary-600 dark:text-primary-400 mr-2" />
            <span className="text-primary-600 dark:text-primary-400 font-medium text-sm">Stay Updated</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Featured Content &{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-secondary-500">
              Announcements
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Stay informed with the latest health tips, expert advice, and important updates for expectant and new mothers.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-12" data-aos="fade-up" data-aos-delay="200">
          <div className="inline-flex bg-gray-100 dark:bg-gray-700 rounded-full p-1">
            {tabs.map((tab) => {
              const IconComponent = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-white dark:bg-gray-600 text-primary-600 dark:text-primary-400 shadow-md'
                      : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  <IconComponent className="w-4 h-4 mr-2" />
                  {tab.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* Content Sections */}
        <div className="min-h-[600px]">
          {/* Blog Posts */}
          {activeTab === 'blog' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8" data-aos="fade-up" data-aos-delay="300">
              {/* Featured Post */}
              <div className="lg:col-span-2">
                <article className="group relative bg-white dark:bg-gray-700 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="relative h-64 md:h-80">
                    <Image
                      src={blogPosts[0].image}
                      alt={blogPosts[0].title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 50vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute top-4 left-4">
                      <span className="bg-primary-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                        Featured
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex items-center text-white/80 text-sm mb-2">
                        <Calendar className="w-4 h-4 mr-2" />
                        {blogPosts[0].date}
                        <Clock className="w-4 h-4 ml-4 mr-2" />
                        {blogPosts[0].readTime}
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">
                        {blogPosts[0].title}
                      </h3>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                      {blogPosts[0].excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        By {blogPosts[0].author}
                      </span>
                      <Link
                        href={`/blog/${blogPosts[0].id}`}
                        className="inline-flex items-center text-primary-600 dark:text-primary-400 font-medium hover:text-primary-700 dark:hover:text-primary-300 transition-colors duration-200"
                      >
                        Read More
                        <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-200" />
                      </Link>
                    </div>
                  </div>
                </article>
              </div>

              {/* Recent Posts */}
              <div className="space-y-6">
                {blogPosts.slice(1).map((post) => (
                  <article
                    key={post.id}
                    className="group bg-white dark:bg-gray-700 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          sizes="80px"
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="flex-1">
                        <span className="text-xs text-primary-600 dark:text-primary-400 font-medium">
                          {post.category}
                        </span>
                        <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200">
                          {post.title}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                          <Calendar className="w-3 h-3 mr-1" />
                          {post.date}
                          <Clock className="w-3 h-3 ml-3 mr-1" />
                          {post.readTime}
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}

          {/* Health Alerts */}
          {activeTab === 'alerts' && (
            <div className="space-y-6" data-aos="fade-up" data-aos-delay="300">
              {healthAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`p-6 rounded-2xl border-l-4 ${
                    alert.urgent
                      ? 'bg-red-50 dark:bg-red-900/20 border-red-500'
                      : 'bg-blue-50 dark:bg-blue-900/20 border-blue-500'
                  }`}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`p-2 rounded-full ${
                      alert.urgent ? 'bg-red-100 dark:bg-red-900/30' : 'bg-blue-100 dark:bg-blue-900/30'
                    }`}>
                      <AlertCircle className={`w-5 h-5 ${
                        alert.urgent ? 'text-red-600 dark:text-red-400' : 'text-blue-600 dark:text-blue-400'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                        {alert.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-3">
                        {alert.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {alert.date}
                        </span>
                        <button className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors duration-200 ${
                          alert.urgent
                            ? 'bg-red-600 text-white hover:bg-red-700'
                            : 'bg-blue-600 text-white hover:bg-blue-700'
                        }`}>
                          Learn More
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Upcoming Events */}
          {activeTab === 'events' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-aos="fade-up" data-aos-delay="300">
              {upcomingEvents.map((event) => (
                <div
                  key={event.id}
                  className="bg-white dark:bg-gray-700 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 px-3 py-1 rounded-full text-sm font-medium capitalize">
                      {event.type}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {event.spots} spots left
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    {event.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {event.description}
                  </p>
                  
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
                    <Calendar className="w-4 h-4 mr-2" />
                    {event.date}
                    <Clock className="w-4 h-4 ml-4 mr-2" />
                    {event.time}
                  </div>
                  
                  <button className="w-full bg-gradient-to-r from-primary-500 to-primary-600 text-white py-3 rounded-lg font-medium hover:from-primary-600 hover:to-primary-700 transition-all duration-200">
                    Register Now
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default FeaturedContentSection
