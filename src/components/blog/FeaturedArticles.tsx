'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Clock, User, ArrowRight, Star } from 'lucide-react'

const FeaturedArticles = () => {
  const featuredArticles = [
    {
      id: 1,
      title: "5 Myths About Pregnancy You Should Stop Believing",
      excerpt: "Separating fact from fiction in Ghanaian pregnancy traditions and modern medical advice.",
      author: "Dr. Akosua Mensah",
      readTime: "5 min read",
      publishDate: "2 days ago",
      category: "Medical Advice",
      categoryColor: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
      image: "/images/blog/pregnancy-myths.jpg",
      featured: true,
      trending: true
    },
    {
      id: 2,
      title: "What It's Really Like Giving Birth in Ghana – A Mother's Story",
      excerpt: "Ama shares her honest experience of childbirth at Korle-Bu Teaching Hospital and the lessons she learned.",
      author: "Ama Osei",
      readTime: "8 min read",
      publishDate: "1 week ago",
      category: "Real Stories",
      categoryColor: "bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-400",
      image: "/images/blog/birth-story.jpg",
      featured: true,
      loved: true
    },
    {
      id: 3,
      title: "Mental Health Tips for Overwhelmed New Moms",
      excerpt: "Practical strategies to manage postpartum anxiety and depression, with local support resources in Ghana.",
      author: "Counselor Efua Asante",
      readTime: "6 min read",
      publishDate: "3 days ago",
      category: "Mental Health",
      categoryColor: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400",
      image: "/images/blog/mental-health.jpg",
      featured: true,
      trending: false
    }
  ]

  return (
    <section className="py-16 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Featured Articles
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Our most helpful and inspiring content, handpicked for you
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Featured Article */}
          <div className="lg:col-span-2" data-aos="fade-up" data-aos-delay="100">
            <article className="group relative bg-white dark:bg-gray-700 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-600">
              <div className="relative h-64 lg:h-80">
                <Image
                  src={featuredArticles[0].image}
                  alt={featuredArticles[0].title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                
                {/* Badges */}
                <div className="absolute top-4 left-4 flex items-center space-x-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${featuredArticles[0].categoryColor}`}>
                    {featuredArticles[0].category}
                  </span>
                  {featuredArticles[0].trending && (
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 flex items-center">
                      🔥 Trending
                    </span>
                  )}
                </div>

                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-2xl font-bold mb-2 group-hover:text-[#F59297] transition-colors duration-300">
                    {featuredArticles[0].title}
                  </h3>
                  <p className="text-gray-200 mb-4 line-clamp-2">
                    {featuredArticles[0].excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm">
                      <div className="flex items-center">
                        <User className="w-4 h-4 mr-1" />
                        {featuredArticles[0].author}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {featuredArticles[0].readTime}
                      </div>
                    </div>
                    <Link
                      href={`/blog/${featuredArticles[0].id}`}
                      className="inline-flex items-center text-white hover:text-[#F59297] transition-colors duration-300"
                    >
                      Read More
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          </div>

          {/* Side Featured Articles */}
          <div className="space-y-6">
            {featuredArticles.slice(1).map((article, index) => (
              <article
                key={article.id}
                className="group bg-white dark:bg-gray-700 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-600"
                data-aos="fade-up"
                data-aos-delay={200 + index * 100}
              >
                <div className="relative h-48">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  
                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${article.categoryColor}`}>
                      {article.category}
                    </span>
                    {article.loved && (
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 flex items-center">
                        ❤️ Most Loved
                      </span>
                    )}
                  </div>

                  {/* Content Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <h3 className="text-lg font-bold mb-2 group-hover:text-[#F59297] transition-colors duration-300 line-clamp-2">
                      {article.title}
                    </h3>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {article.readTime}
                      </div>
                      <Link
                        href={`/blog/${article.id}`}
                        className="inline-flex items-center text-white hover:text-[#F59297] transition-colors duration-300"
                      >
                        Read
                        <ArrowRight className="w-3 h-3 ml-1" />
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default FeaturedArticles
