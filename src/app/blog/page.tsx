'use client'

import { useState } from 'react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import BlogHero from '@/components/blog/BlogHero'
import FeaturedArticles from '@/components/blog/FeaturedArticles'
import CategoryFilters from '@/components/blog/CategoryFilters'
import BlogFeed from '@/components/blog/BlogFeed'
import ShareStorySection from '@/components/blog/ShareStorySection'
import NewsletterSubscribe from '@/components/blog/NewsletterSubscribe'

const BlogPage = () => {
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation />
      
      <BlogHero 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      
      <FeaturedArticles />
      
      <CategoryFilters 
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />
      
      <BlogFeed 
        activeCategory={activeCategory}
        searchQuery={searchQuery}
      />
      
      <ShareStorySection />
      
      <NewsletterSubscribe />
      
      <Footer />
    </div>
  )
}

export default BlogPage
