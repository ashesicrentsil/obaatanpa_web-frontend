'use client'

import { Play, Clock, Eye, ThumbsUp } from 'lucide-react'

const FeaturedVideos = () => {
  const featuredVideos = [
    {
      id: 1,
      title: 'First Trimester: What to Expect',
      description: 'A comprehensive guide to the first 12 weeks of pregnancy, covering symptoms, development, and important milestones.',
      videoId: 'Z66rhf26XNs',
      thumbnail: `https://img.youtube.com/vi/Z66rhf26XNs/maxresdefault.jpg`,
      duration: '12:45',
      views: '125K',
      likes: '3.2K',
      category: 'Pregnancy',
      author: 'Dr. Akosua Mensah'
    },
    {
      id: 2,
      title: 'Safe Baby Bathing Techniques',
      description: 'Learn the proper techniques for bathing your newborn safely and avoid common mistakes that new mothers often make.',
      videoId: 'b8_6bApD1ec',
      thumbnail: `https://img.youtube.com/vi/b8_6bApD1ec/maxresdefault.jpg`,
      duration: '8:30',
      views: '89K',
      likes: '2.1K',
      category: 'Baby Care',
      author: 'Midwife Sarah Osei'
    },
    {
      id: 3,
      title: 'Most Effective Ways To Naturally Boost Supply Of Breastmilk - Lactation Consultant Reveals | VIDEO',
      description: 'Discover traditional Ghanaian foods and modern nutrition tips that can help increase your milk supply naturally.',
      videoId: 'p8iJU2womfA',
      thumbnail: `https://img.youtube.com/vi/p8iJU2womfA/maxresdefault.jpg`,
      duration: '10:15',
      views: '1,209',
      likes: '21',
      category: 'Nutrition',
      author: 'Nutritionist Ama Boateng'
    }
  ]

  const handleVideoClick = (videoId: string) => {
    // Open YouTube video in new tab
    window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank')
  }

  return (
    <section className="py-16 bg-white dark:bg-gray-800 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12" data-aos="fade-up">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Featured Videos
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            Watch expert advice and helpful tutorials for your pregnancy and motherhood journey
          </p>

          {/* Category Filter Buttons */}
          <div className="flex flex-wrap gap-3 mb-8">
            <button className="bg-[#F59297] text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-[#e67d82] transition-colors">
              📺 All Videos
            </button>
            <button className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
              🤰 Pregnancy
            </button>
            <button className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
              🍼 Baby Care
            </button>
            <button className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
              🥗 Nutrition
            </button>
          </div>
        </div>

        {/* Featured Videos Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {featuredVideos.map((video, index) => (
            <div
              key={video.id}
              className="group cursor-pointer"
              data-aos="fade-up"
              data-aos-delay={index * 100}
              onClick={() => handleVideoClick(video.videoId)}
            >
              <article className="bg-white dark:bg-gray-700 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-600">
                {/* Video Thumbnail */}
                <div className="relative h-48 bg-gray-200 dark:bg-gray-600 overflow-hidden">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-white bg-opacity-90 rounded-full p-4">
                      <Play className="w-8 h-8 text-[#F59297] fill-current" />
                    </div>
                  </div>

                  {/* Duration Badge */}
                  <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                    {video.duration}
                  </div>

                  {/* Category Badge */}
                  <div className="absolute top-2 left-2 bg-[#F59297] text-white text-xs px-2 py-1 rounded-full">
                    {video.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-[#F59297] transition-colors">
                    {video.title}
                  </h3>

                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 leading-relaxed line-clamp-2">
                    {video.description}
                  </p>

                  {/* Video Stats */}
                  <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-3">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <Eye className="w-3 h-3 mr-1" />
                        <span>{video.views}</span>
                      </div>
                      <div className="flex items-center">
                        <ThumbsUp className="w-3 h-3 mr-1" />
                        <span>{video.likes}</span>
                      </div>
                    </div>
                  </div>

                  {/* Author */}
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    by {video.author}
                  </p>
                </div>
              </article>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12" data-aos="fade-up" data-aos-delay="400">
          <button
            onClick={() => window.open('https://www.youtube.com/@obaatanpa', '_blank')}
            className="inline-flex items-center bg-gradient-to-r from-[#F59297] to-[#e67d82] text-white px-8 py-4 rounded-full font-semibold hover:from-[#e67d82] hover:to-[#d66b70] transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <Play className="w-5 h-5 mr-2" />
            Visit Our YouTube Channel
          </button>
        </div>
      </div>
    </section>
  )
}

export default FeaturedVideos
