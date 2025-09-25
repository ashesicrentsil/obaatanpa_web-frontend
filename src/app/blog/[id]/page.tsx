'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { Calendar, Clock, User, Heart, Share2, BookOpen, ArrowLeft, MessageCircle } from 'lucide-react'
import Link from 'next/link'

export default function BlogPostPage() {
  const params = useParams()
  const [isLiked, setIsLiked] = useState(false)
  const [likes, setLikes] = useState(42)

  // Sample blog post data - in real app, this would be fetched based on the ID
  const blogPost = {
    id: params.id,
    title: 'Essential Nutrition Tips for Your Second Trimester',
    excerpt: 'Discover the key nutrients your body needs during the second trimester and how to maintain a healthy diet for you and your baby.',
    content: `
      <p>The second trimester is often called the "golden period" of pregnancy, and nutrition plays a crucial role in making this time as healthy and comfortable as possible. As your baby grows rapidly during weeks 13-27, your nutritional needs evolve too.</p>

      <h2>Key Nutrients for Second Trimester</h2>
      
      <h3>1. Iron</h3>
      <p>Your blood volume increases significantly during the second trimester, making iron essential to prevent anemia. Include iron-rich foods like:</p>
      <ul>
        <li>Lean red meat and poultry</li>
        <li>Fish and seafood</li>
        <li>Beans and lentils</li>
        <li>Spinach and other leafy greens</li>
        <li>Fortified cereals</li>
      </ul>

      <h3>2. Calcium</h3>
      <p>Your baby's bones and teeth are developing rapidly. Aim for 1,000mg of calcium daily through:</p>
      <ul>
        <li>Dairy products (milk, yogurt, cheese)</li>
        <li>Fortified plant-based milks</li>
        <li>Sardines with bones</li>
        <li>Broccoli and kale</li>
        <li>Almonds</li>
      </ul>

      <h3>3. Protein</h3>
      <p>Protein needs increase to support your baby's growth. Include a variety of protein sources:</p>
      <ul>
        <li>Lean meats and poultry</li>
        <li>Fish (low-mercury varieties)</li>
        <li>Eggs</li>
        <li>Beans and legumes</li>
        <li>Nuts and seeds</li>
      </ul>

      <h2>Ghanaian Foods for Healthy Pregnancy</h2>
      <p>Traditional Ghanaian foods can provide excellent nutrition during pregnancy:</p>
      
      <h3>Kontomire (Cocoyam Leaves)</h3>
      <p>Rich in iron, folate, and vitamins A and C. Perfect for preventing anemia and supporting immune function.</p>

      <h3>Beans and Plantain</h3>
      <p>This classic combination provides protein, fiber, potassium, and complex carbohydrates for sustained energy.</p>

      <h3>Palm Nut Soup</h3>
      <p>Contains healthy fats, vitamin A, and when prepared with fish, provides omega-3 fatty acids crucial for baby's brain development.</p>

      <h2>Foods to Limit or Avoid</h2>
      <p>While most foods are safe during pregnancy, some should be limited:</p>
      <ul>
        <li>High-mercury fish (shark, swordfish)</li>
        <li>Raw or undercooked meats and eggs</li>
        <li>Unpasteurized dairy products</li>
        <li>Excessive caffeine (limit to 200mg daily)</li>
        <li>Alcohol</li>
      </ul>

      <h2>Practical Tips for Second Trimester Nutrition</h2>
      
      <h3>Meal Planning</h3>
      <p>Plan balanced meals that include all food groups. Prepare healthy snacks in advance to avoid reaching for processed foods when hunger strikes.</p>

      <h3>Stay Hydrated</h3>
      <p>Drink at least 8-10 glasses of water daily. Coconut water is also an excellent choice for natural electrolytes.</p>

      <h3>Listen to Your Body</h3>
      <p>Your appetite may increase during the second trimester. Focus on nutrient-dense foods rather than empty calories.</p>

      <h2>When to Consult Your Healthcare Provider</h2>
      <p>Contact your doctor or midwife if you experience:</p>
      <ul>
        <li>Persistent nausea or vomiting</li>
        <li>Extreme food aversions</li>
        <li>Concerns about weight gain</li>
        <li>Signs of gestational diabetes</li>
      </ul>

      <p>Remember, every pregnancy is unique. Work with your healthcare team to create a nutrition plan that works best for you and your baby.</p>
    `,
    author: 'Dr. Akosua Mensah',
    authorTitle: 'Certified Nutritionist & Midwife',
    authorImage: '/images/authors/dr-akosua.jpg',
    publishedDate: '2024-01-15',
    readTime: '8 min read',
    category: 'Nutrition',
    tags: ['Second Trimester', 'Nutrition', 'Healthy Eating', 'Ghanaian Foods'],
    image: '/images/blog/second-trimester-nutrition.jpg',
    likes: 42,
    comments: 18
  }

  const relatedPosts = [
    {
      id: 'first-trimester-foods',
      title: 'Best Foods for First Trimester Nausea',
      excerpt: 'Gentle, nourishing foods to help manage morning sickness',
      image: '/images/blog/first-trimester-foods.jpg',
      readTime: '5 min read'
    },
    {
      id: 'third-trimester-prep',
      title: 'Preparing Your Body for Labor with Nutrition',
      excerpt: 'Foods that can help prepare your body for delivery',
      image: '/images/blog/third-trimester-prep.jpg',
      readTime: '7 min read'
    },
    {
      id: 'postpartum-nutrition',
      title: 'Nutrition for Breastfeeding Mothers',
      excerpt: 'Essential nutrients for milk production and recovery',
      image: '/images/blog/postpartum-nutrition.jpg',
      readTime: '6 min read'
    }
  ]

  const handleLike = () => {
    setIsLiked(!isLiked)
    setLikes(isLiked ? likes - 1 : likes + 1)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation />
      
      {/* Back Button */}
      <div className="pt-32 pb-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link 
            href="/blog"
            className="inline-flex items-center text-[#F59297] hover:text-[#e67d82] font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Link>
        </div>
      </div>

      {/* Article Header */}
      <article className="pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <header className="mb-8">
            <div className="mb-4">
              <span className="inline-block px-3 py-1 bg-[#F59297]/10 text-[#F59297] rounded-full text-sm font-medium">
                {blogPost.category}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              {blogPost.title}
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              {blogPost.excerpt}
            </p>
            
            {/* Author and Meta Info */}
            <div className="flex items-center justify-between flex-wrap gap-4 pb-8 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-[#F59297] to-[#7da8e6] rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold">
                    {blogPost.author.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {blogPost.author}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {blogPost.authorTitle}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-6 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(blogPost.publishedDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{blogPost.readTime}</span>
                </div>
              </div>
            </div>
          </header>

          {/* Featured Image */}
          <div className="aspect-video bg-gradient-to-br from-[#F59297]/20 to-[#7da8e6]/20 rounded-3xl mb-8 flex items-center justify-center">
            <div className="text-8xl opacity-50">🥗</div>
          </div>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <div 
              dangerouslySetInnerHTML={{ __html: blogPost.content }}
              className="text-gray-700 dark:text-gray-300 leading-relaxed"
            />
          </div>

          {/* Tags */}
          <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
            <div className="flex flex-wrap gap-2 mb-6">
              {blogPost.tags.map((tag, index) => (
                <span 
                  key={index}
                  className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-full text-sm"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Social Actions */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={handleLike}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                    isLiked 
                      ? 'bg-[#F59297] text-white' 
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-[#F59297]/10'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                  <span>{likes}</span>
                </button>
                
                <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-lg hover:bg-[#7da8e6]/10 transition-colors">
                  <MessageCircle className="w-4 h-4" />
                  <span>{blogPost.comments}</span>
                </button>
              </div>
              
              <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-lg hover:bg-[#7da8e6]/10 transition-colors">
                <Share2 className="w-4 h-4" />
                <span>Share</span>
              </button>
            </div>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Related Articles
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedPosts.map((post) => (
              <Link 
                key={post.id}
                href={`/blog/${post.id}`}
                className="group"
              >
                <article className="bg-gray-50 dark:bg-gray-700 rounded-3xl overflow-hidden hover:shadow-lg transition-all duration-300">
                  <div className="aspect-video bg-gradient-to-br from-[#F59297]/20 to-[#7da8e6]/20 flex items-center justify-center">
                    <BookOpen className="w-12 h-12 text-[#F59297] opacity-50" />
                  </div>
                  
                  <div className="p-6">
                    <h3 className="font-bold text-gray-900 dark:text-white mb-2 group-hover:text-[#F59297] transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center text-xs text-gray-500">
                      <Clock className="w-3 h-3 mr-1" />
                      {post.readTime}
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
