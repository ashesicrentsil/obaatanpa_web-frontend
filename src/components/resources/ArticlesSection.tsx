'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const ArticlesSection = () => {
  const articles = [
    {
      id: 1,
      title: 'Understanding Contractions vs. Kicks',
      excerpt: 'Brief preview text',
      category: 'Pregnancy',
      image: '/images/resources/contractions.jpg',
      href: '/resources/contractions-vs-kicks'
    },
    {
      id: 2,
      title: 'Meal Plan for Week 20 of Pregnancy',
      excerpt: 'Brief preview text',
      category: 'Nutrition',
      image: '/images/resources/meal-plan.jpg',
      href: '/resources/pregnancy-meal-plan'
    },
    {
      id: 3,
      title: 'How to Clean the Umbilical Cord',
      excerpt: 'Brief preview text',
      category: 'Baby Care',
      image: '/images/resources/umbilical-care.jpg',
      href: '/resources/umbilical-cord-care'
    },
    {
      id: 4,
      title: 'How to Talk to Your Partner',
      excerpt: 'Brief preview text',
      category: 'Relationship',
      image: '/images/resources/partner-talk.jpg',
      href: '/resources/partner-communication'
    },
    {
      id: 5,
      title: 'Signs of Colic in Newborn',
      excerpt: 'Brief preview text',
      category: 'Mental Health',
      image: '/images/resources/colic-signs.jpg',
      href: '/resources/newborn-colic'
    },
    {
      id: 6,
      title: 'Postpartum Blues vs. Depression',
      excerpt: 'Brief preview text',
      category: 'Mental Health',
      image: '/images/resources/postpartum-blues.jpg',
      href: '/resources/postpartum-mental-health'
    },
    {
      id: 7,
      title: 'Postpartum Blues vs. Depression',
      excerpt: 'Brief preview text',
      category: 'Mental Health',
      image: '/images/resources/postpartum-depression.jpg',
      href: '/resources/postpartum-depression'
    },
    {
      id: 8,
      title: 'How to Talk to Your Partner About Anxiety',
      excerpt: 'Brief preview text',
      category: 'Mental Health',
      image: '/images/resources/anxiety-partner.jpg',
      href: '/resources/anxiety-communication'
    }
  ]

  const getArticleIcon = (category: string, index: number) => {
    const icons = [
      // Row 1 - Pregnancy related
      <div key={index} className="text-5xl">🤰</div>, // Pregnant woman
      <div key={index} className="text-5xl">🥗</div>, // Nutrition/meal plan
      <div key={index} className="text-5xl">👶</div>, // Baby care
      <div key={index} className="text-5xl">💕</div>, // Relationship/love
      // Row 2 - Mental health and care
      <div key={index} className="text-5xl">🧠</div>, // Mental health
      <div key={index} className="text-5xl">💙</div>, // Mental health/blues
      <div key={index} className="text-5xl">😔</div>, // Depression/sadness
      <div key={index} className="text-5xl">🗣️</div>, // Communication/talking
    ]

    return icons[index] || icons[0]
  }

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Articles
          </h2>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {articles.map((article, index) => (
            <Link
              key={article.id}
              href={article.href}
              className="group block"
            >
              <article className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 dark:border-gray-700">
                {/* Icon */}
                <div className="mb-4 flex justify-center">
                  {getArticleIcon(article.category, index)}
                </div>

                {/* Content */}
                <div>
                  <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2 leading-tight">
                    {article.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {article.excerpt}
                  </p>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ArticlesSection
