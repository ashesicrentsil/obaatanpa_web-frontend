'use client'

import Image from 'next/image'
import { ShoppingBag, Star, ExternalLink } from 'lucide-react'

const BabyProductsSection = () => {
  const productCategories = [
    {
      id: 1,
      title: 'Feeding Essentials',
      description: 'Everything you need for feeding your baby safely and comfortably',
      icon: '🍼',
      products: [
        {
          name: 'Baby Bottles Set',
          price: 'GH₵ 45-80',
          rating: 4.8,
          description: 'BPA-free bottles with anti-colic design',
          image: '/images/products/baby-bottles.jpg'
        },
        {
          name: 'Breast Pump',
          price: 'GH₵ 150-300',
          rating: 4.7,
          description: 'Electric and manual breast pumps',
          image: '/images/products/breast-pump.jpg'
        },
        {
          name: 'High Chair',
          price: 'GH₵ 200-400',
          rating: 4.6,
          description: 'Adjustable and safe feeding chair',
          image: '/images/products/high-chair.jpg'
        }
      ]
    },
    {
      id: 2,
      title: 'Baby Care',
      description: 'Essential items for your baby\'s daily care and hygiene',
      icon: '🧴',
      products: [
        {
          name: 'Diaper Set',
          price: 'GH₵ 25-50',
          rating: 4.9,
          description: 'Soft and absorbent diapers',
          image: '/images/products/diapers.jpg'
        },
        {
          name: 'Baby Bath Set',
          price: 'GH₵ 60-120',
          rating: 4.8,
          description: 'Gentle shampoo, soap, and lotion',
          image: '/images/products/bath-set.png'
        },
        {
          name: 'Baby Monitor',
          price: 'GH₵ 180-350',
          rating: 4.7,
          description: 'Video and audio baby monitor',
          image: '/images/products/baby-monitor.jpg'
        }
      ]
    },
    {
      id: 3,
      title: 'Sleep & Comfort',
      description: 'Create a safe and comfortable sleeping environment',
      icon: '🛏️',
      products: [
        {
          name: 'Baby Crib',
          price: 'GH₵ 300-600',
          rating: 4.8,
          description: 'Safe and sturdy baby crib',
          image: '/images/products/baby-crib.jpg'
        },
        {
          name: 'Baby Mattress',
          price: 'GH₵ 100-200',
          rating: 4.7,
          description: 'Firm and breathable mattress',
          image: '/images/products/baby-mattress.jpg'
        },
        {
          name: 'Swaddle Blankets',
          price: 'GH₵ 30-60',
          rating: 4.9,
          description: 'Soft cotton swaddle blankets',
          image: '/images/products/swaddle-blankets.jpg'
        }
      ]
    },
    {
      id: 4,
      title: 'Clothing & Accessories',
      description: 'Comfortable and practical clothing for your little one',
      icon: '👶',
      products: [
        {
          name: 'Newborn Clothing Set',
          price: 'GH₵ 40-80',
          rating: 4.8,
          description: 'Soft cotton onesies and sleepers',
          image: '/images/products/baby-clothes.jpg'
        },
        {
          name: 'Baby Shoes',
          price: 'GH₵ 20-40',
          rating: 4.6,
          description: 'Soft-soled baby shoes',
          image: '/images/products/baby-shoes.jpg'
        },
        {
          name: 'Baby Carrier',
          price: 'GH₵ 80-150',
          rating: 4.7,
          description: 'Ergonomic baby carrier',
          image: '/images/products/baby-carrier.jpg'
        }
      ]
    }
  ]

  return (
    <section className="py-16 bg-white dark:bg-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12" data-aos="fade-up">
          <div className="flex items-center justify-center mb-4">
            <ShoppingBag className="w-8 h-8 text-[#F59297] mr-3" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              Baby Products
            </h2>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Discover essential baby products recommended by experts. Find everything you need for your little one's comfort, safety, and development.
          </p>
        </div>

        {/* Product Categories */}
        <div className="space-y-16">
          {productCategories.map((category, categoryIndex) => (
            <div key={category.id} data-aos="fade-up" data-aos-delay={categoryIndex * 100}>
              {/* Category Header */}
              <div className="text-center mb-8">
                <div className="flex items-center justify-center mb-4">
                  <span className="text-4xl mr-3">{category.icon}</span>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {category.title}
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                  {category.description}
                </p>
              </div>

              {/* Products Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.products.map((product, productIndex) => (
                  <div
                    key={productIndex}
                    className="bg-gray-50 dark:bg-gray-700 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                    data-aos="fade-up"
                    data-aos-delay={(categoryIndex * 100) + (productIndex * 50)}
                  >
                    {/* Product Image */}
                    <div className="w-full h-48 bg-gray-100 dark:bg-gray-600 rounded-xl mb-4 overflow-hidden">
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={300}
                        height={200}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="space-y-3">
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {product.name}
                      </h4>
                      
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {product.description}
                      </p>

                      {/* Rating */}
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.floor(product.rating)
                                  ? 'text-yellow-400 fill-current'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-600 dark:text-gray-300">
                          {product.rating}
                        </span>
                      </div>

                      {/* Price */}
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-[#F59297]">
                          {product.price}
                        </span>
                        <button className="flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-300 hover:text-[#F59297] transition-colors">
                          <span>View Details</span>
                          <ExternalLink className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16" data-aos="fade-up" data-aos-delay="400">
          <div className="bg-gradient-to-r from-[#F59297] to-[#7da8e6] rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              Need Help Choosing Products?
            </h3>
            <p className="text-lg mb-6 opacity-90">
              Our experts can help you select the best products for your baby's needs and your budget.
            </p>
            <button className="bg-white text-[#F59297] px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-300">
              Get Expert Advice
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BabyProductsSection
