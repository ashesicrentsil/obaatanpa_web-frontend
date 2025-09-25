'use client'

import { useState } from 'react'
import { Play, Clock, Eye, ThumbsUp, Search, Filter, Grid, List } from 'lucide-react'

const ContentGrid = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = useState('newest')

  const videos = [
    {
      id: 1,
      title: 'Understanding Contractions vs. Baby Kicks',
      description: 'Learn to distinguish between baby movements and early contractions during your pregnancy.',
      videoId: 'Z66rhf26XNs',
      thumbnail: `https://img.youtube.com/vi/Z66rhf26XNs/maxresdefault.jpg`,
      author: 'Dr. Kwame Asante',
      duration: '8:45',
      views: '45K',
      likes: '1.2K',
      category: 'Pregnancy',
      tags: ['Contractions', 'Baby Movement', 'Pregnancy Signs'],
      date: 'January 15, 2024'
    },
    {
      id: 2,
      title: 'Safe Exercises in Your 2nd Trimester',
      description: 'Discover safe and effective exercises to stay healthy during your second trimester.',
      videoId: 'b8_6bApD1ec',
      thumbnail: `https://img.youtube.com/vi/b8_6bApD1ec/maxresdefault.jpg`,
      author: 'Fitness Coach Ama Darko',
      duration: '12:30',
      views: '67K',
      likes: '2.8K',
      category: 'Pregnancy',
      tags: ['Exercise', 'Second Trimester', 'Fitness'],
      date: 'January 12, 2024'
    },
    {
      id: 3,
      title: '11 Food To Eat During Pregnancy For an Intelligent Baby',
      description: 'Foods to eat during pregnancy for an intelligent baby.',
      videoId: '0ohxOQPlzy4',
      thumbnail: `https://img.youtube.com/vi/0ohxOQPlzy4/maxresdefault.jpg`,
      author: 'Nutritionist Efua Mensah',
      duration: '4:26',
      views: '4.7M',
      likes: '30.2K',
      category: 'Nutrition',
      tags: ['Meal Planning', 'Week 20', 'Ghanaian Food'],
      date: 'January 10, 2024'
    },
    {
      id: 4,
      title: 'Iron-Rich Ghanaian Foods for Moms',
      description: 'Boost your iron levels naturally with these traditional Ghanaian foods.',
      videoId: 'BjvLQKcsFbw',
      thumbnail: `https://img.youtube.com/vi/BjvLQKcsFbw/maxresdefault.jpg`,
      author: 'Nutritionist Ama Boateng',
      duration: '6:20',
      views: '34K',
      likes: '1.1K',
      category: 'Nutrition',
      tags: ['Iron', 'Ghanaian Food', 'Anemia Prevention'],
      date: 'January 8, 2024'
    },
    {
      id: 5,
      title: 'How to Clean the Umbilical Cord',
      description: 'Step-by-step guide to properly caring for your newborn\'s umbilical cord.',
      videoId: 'MSPAXgBiDWk',
      thumbnail: `https://img.youtube.com/vi/MSPAXgBiDWk/maxresdefault.jpg`,
      author: 'Midwife Sarah Osei',
      duration: '5:45',
      views: '78K',
      likes: '2.9K',
      category: 'Baby Care',
      tags: ['Newborn Care', 'Umbilical Cord', 'Hygiene'],
      date: 'January 5, 2024'
    },
    {
      id: 6,
      title: 'Signs of Colic in Newborns',
      description: 'Recognize the signs of colic and learn effective soothing techniques.',
      videoId: 'afMNp6Q4u7s',
      thumbnail: `https://img.youtube.com/vi/afMNp6Q4u7s/maxresdefault.jpg`,
      author: 'Pediatrician Dr. Kofi Mensah',
      duration: '11:30',
      views: '92K',
      likes: '4.2K',
      category: 'Baby Care',
      tags: ['Colic', 'Newborn', 'Crying', 'Soothing'],
      date: 'January 3, 2024'
    },
    {
      id: 7,
      title: 'Postpartum Blues vs. Depression',
      description: 'Understanding the difference between baby blues and postpartum depression.',
      videoId: 'arj7oStGLkU',
      thumbnail: `https://img.youtube.com/vi/arj7oStGLkU/maxresdefault.jpg`,
      author: 'Psychologist Dr. Adwoa Asante',
      duration: '14:20',
      views: '156K',
      likes: '5.8K',
      category: 'Mental Health',
      tags: ['Postpartum', 'Depression', 'Mental Health'],
      date: 'December 30, 2023'
    },
    {
      id: 8,
      title: 'How to Talk to Your Partner About Anxiety',
      description: 'Communication strategies for discussing pregnancy and parenting anxiety.',
      videoId: 'Ks-_Mh1QhMc',
      thumbnail: `https://img.youtube.com/vi/Ks-_Mh1QhMc/maxresdefault.jpg`,
      author: 'Counselor Akosua Darko',
      duration: '10:45',
      views: '67K',
      likes: '2.3K',
      category: 'Mental Health',
      tags: ['Anxiety', 'Communication', 'Relationships'],
      date: 'December 28, 2023'
    }
  ]

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'popular', label: 'Most Popular' },
    { value: 'alphabetical', label: 'A-Z' }
  ]

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12" data-aos="fade-up">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Video{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-secondary-500">
                Library
              </span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Watch expert videos and tutorials for your pregnancy and motherhood journey
            </p>
          </div>

          {/* Controls */}
          <div className="flex items-center space-x-4 mt-6 md:mt-0">
            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            {/* View Mode Toggle */}
            <div className="flex items-center bg-gray-200 dark:bg-gray-700 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-colors duration-200 ${
                  viewMode === 'grid'
                    ? 'bg-white dark:bg-gray-600 text-primary-600 dark:text-primary-400 shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                }`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-colors duration-200 ${
                  viewMode === 'list'
                    ? 'bg-white dark:bg-gray-600 text-primary-600 dark:text-primary-400 shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Videos Grid/List */}
        <div className={`${
          viewMode === 'grid'
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
            : 'space-y-6'
        }`}>
          {videos.map((video, index) => (
            <div
              key={video.id}
              className="group cursor-pointer"
              data-aos="fade-up"
              data-aos-delay={index * 50}
              onClick={() => window.open(`https://www.youtube.com/watch?v=${video.videoId}`, '_blank')}
            >
              <article className={`bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 dark:border-gray-700 ${
                viewMode === 'list' ? 'flex items-center space-x-6 p-6' : ''
              }`}>
                {/* Video Thumbnail */}
                <div className={`relative overflow-hidden ${
                  viewMode === 'list' ? 'w-48 h-32 flex-shrink-0 rounded-xl' : 'h-48'
                }`}>
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />

                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-white bg-opacity-90 rounded-full p-3">
                      <Play className="w-6 h-6 text-[#F59297] fill-current" />
                    </div>
                  </div>

                  {/* Duration Badge */}
                  <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                    {video.duration}
                  </div>

                  {/* Category Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="bg-[#F59297] text-white px-2 py-1 rounded-lg text-xs font-medium">
                      {video.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className={viewMode === 'list' ? 'flex-1' : 'p-6'}>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-[#F59297] transition-colors duration-300">
                    {video.title}
                  </h3>

                  <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                    {video.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {video.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-lg text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Video Stats */}
                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-3">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <Eye className="w-4 h-4 mr-1" />
                        <span>{video.views}</span>
                      </div>
                      <div className="flex items-center">
                        <ThumbsUp className="w-4 h-4 mr-1" />
                        <span>{video.likes}</span>
                      </div>
                    </div>
                  </div>

                  {/* Author and Date */}
                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                    <span>by {video.author}</span>
                    <span>{video.date}</span>
                  </div>
                </div>
              </article>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-12" data-aos="fade-up" data-aos-delay="200">
          <button className="bg-gradient-to-r from-[#F59297] to-[#e67d82] text-white px-8 py-3 rounded-full font-semibold hover:from-[#e67d82] hover:to-[#d66b70] transition-all duration-300 shadow-lg hover:shadow-xl">
            Load More Videos
          </button>
        </div>
      </div>
    </section>
  )
}

export default ContentGrid
