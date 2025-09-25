'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Clock, User, ArrowRight, Heart, Bookmark } from 'lucide-react'

interface BlogFeedProps {
  activeCategory: string
  searchQuery: string
}

const BlogFeed = ({ activeCategory, searchQuery }: BlogFeedProps) => {
  const blogPosts = [
    {
      id: 4,
      title: "How to Bond With Your Baby in the First Month",
      excerpt: "Simple, meaningful ways to connect with your newborn and build a strong emotional foundation.",
      author: "Nurse Linda Asante",
      readTime: "4 min read",
      publishDate: "5 days ago",
      category: "baby-care",
      categoryLabel: "Baby Care",
      categoryColor: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
      image: "/images/blog/baby-bonding.jpg",
      likes: 45,
      bookmarks: 12
    },
    {
      id: 5,
      title: "Traditional Ghanaian Foods That Boost Fertility",
      excerpt: "Discover local ingredients and traditional recipes that can support your fertility journey naturally.",
      author: "Nutritionist Akua Boateng",
      readTime: "6 min read",
      publishDate: "1 week ago",
      category: "nutrition",
      categoryLabel: "Nutrition",
      categoryColor: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400",
      image: "/images/blog/fertility-foods.jpg",
      likes: 67,
      bookmarks: 23
    },
    {
      id: 6,
      title: "My Journey Through Postpartum Depression",
      excerpt: "A raw, honest account of struggling with postpartum depression and finding help in Accra.",
      author: "Anonymous Mother",
      readTime: "10 min read",
      publishDate: "2 weeks ago",
      category: "real-stories",
      categoryLabel: "Real Stories",
      categoryColor: "bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-400",
      image: "/images/blog/postpartum-depression.jpg",
      likes: 89,
      bookmarks: 34,
      trending: true
    },
    {
      id: 7,
      title: "Understanding Your Baby's Sleep Patterns",
      excerpt: "Expert advice on newborn sleep cycles and how to establish healthy sleep routines.",
      author: "Dr. Kwame Asiedu",
      readTime: "7 min read",
      publishDate: "3 days ago",
      category: "baby-care",
      categoryLabel: "Baby Care",
      categoryColor: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
      image: "/images/blog/baby-sleep.jpg",
      likes: 52,
      bookmarks: 18
    },
    {
      id: 8,
      title: "Preparing for Labor: What Every Ghanaian Mother Should Know",
      excerpt: "Essential preparation tips for labor and delivery in Ghanaian hospitals.",
      author: "Midwife Aba Serwaa",
      readTime: "8 min read",
      publishDate: "4 days ago",
      category: "pregnancy",
      categoryLabel: "Pregnancy",
      categoryColor: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400",
      image: "/images/blog/labor-prep.jpg",
      likes: 73,
      bookmarks: 29
    },
    {
      id: 9,
      title: "Breastfeeding Challenges and Solutions",
      excerpt: "Common breastfeeding problems faced by Ghanaian mothers and practical solutions.",
      author: "Lactation Consultant Efua",
      readTime: "5 min read",
      publishDate: "6 days ago",
      category: "baby-care",
      categoryLabel: "Baby Care",
      categoryColor: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
      image: "/images/blog/breastfeeding.jpg",
      likes: 61,
      bookmarks: 25
    }
  ]

  // Filter posts based on category and search
  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = activeCategory === 'all' || post.category === activeCategory
    const matchesSearch = searchQuery === '' || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author.toLowerCase().includes(searchQuery.toLowerCase())
    
    return matchesCategory && matchesSearch
  })

  return (
    <section className="py-16 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
            {activeCategory === 'all' ? 'Latest Articles' : `${activeCategory.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())} Articles`}
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''} found
          </p>
        </div>

        {filteredPosts.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No articles found</h3>
            <p className="text-gray-600 dark:text-gray-400">Try adjusting your search or category filter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <article
                key={post.id}
                className="group bg-white dark:bg-gray-700 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-600 hover:border-[#F59297] dark:hover:border-[#F59297]"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="relative h-48">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                  
                  {/* Category Badge */}
                  <div className="absolute top-3 left-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${post.categoryColor}`}>
                      {post.categoryLabel}
                    </span>
                  </div>

                  {/* Trending Badge */}
                  {post.trending && (
                    <div className="absolute top-3 right-3">
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">
                        🔥 Trending
                      </span>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="absolute bottom-3 right-3 flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button className="p-2 bg-white/90 dark:bg-gray-800/90 rounded-full hover:bg-white dark:hover:bg-gray-800 transition-colors duration-200">
                      <Heart className="w-4 h-4 text-gray-600 dark:text-gray-400 hover:text-red-500" />
                    </button>
                    <button className="p-2 bg-white/90 dark:bg-gray-800/90 rounded-full hover:bg-white dark:hover:bg-gray-800 transition-colors duration-200">
                      <Bookmark className="w-4 h-4 text-gray-600 dark:text-gray-400 hover:text-[#F59297]" />
                    </button>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-[#F59297] transition-colors duration-300 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-1" />
                      {post.author}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {post.readTime}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center">
                        <Heart className="w-4 h-4 mr-1" />
                        {post.likes}
                      </div>
                      <div className="flex items-center">
                        <Bookmark className="w-4 h-4 mr-1" />
                        {post.bookmarks}
                      </div>
                    </div>
                    <Link
                      href={`/blog/${post.id}`}
                      className="inline-flex items-center text-[#F59297] hover:text-[#e67d82] font-medium transition-colors duration-300"
                    >
                      Read More
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Load More Button */}
        {filteredPosts.length > 0 && (
          <div className="text-center mt-12">
            <button className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#F59297] to-[#7da8e6] text-white font-semibold rounded-xl hover:from-[#e67d82] hover:to-[#6b9ce6] transition-all duration-300 shadow-lg hover:shadow-xl">
              Load More Articles
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

export default BlogFeed
