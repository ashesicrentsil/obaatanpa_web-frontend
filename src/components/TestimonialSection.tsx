'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react'

const TestimonialSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const testimonials = [
    {
      id: 1,
      name: 'Akosua Mensah',
      location: 'Accra, Ghana',
      role: 'New Mother',
      image: '/images/testimonials/testimonial-1.png',
      rating: 5,
      quote: 'Obaatanpa helped me feel safe during my first pregnancy. The expert advice and community support made all the difference. I especially loved the nutrition plans tailored for Ghanaian mothers.',
      highlight: 'Expert advice and community support'
    },
    {
      id: 2,
      name: 'Ama Osei',
      location: 'Kumasi, Ghana',
      role: 'Mother of Two',
      image: '/images/testimonials/testimonial-2.png',
      rating: 5,
      quote: 'The hospital finder feature was a lifesaver when I needed emergency care. Within minutes, I found the nearest maternity hospital with excellent reviews. Thank you, Obaatanpa!',
      highlight: 'Hospital finder was a lifesaver'
    },
    {
      id: 3,
      name: 'Efua Asante',
      location: 'Tamale, Ghana',
      role: 'Expecting Mother',
      image: '/images/testimonials/testimonial-3.png',
      rating: 5,
      quote: 'As a first-time mother, I was overwhelmed with questions. The "Ask a Midwife" feature connected me with certified professionals who provided culturally relevant advice.',
      highlight: 'Culturally relevant professional advice'
    },
    {
      id: 4,
      name: 'Adwoa Boateng',
      location: 'Cape Coast, Ghana',
      role: 'Mother & Nurse',
      image: '/images/testimonials/testimonial-4.png',
      rating: 5,
      quote: 'Even as a healthcare professional, I found Obaatanpa incredibly valuable during my pregnancy. The resources are evidence-based and the community is so supportive.',
      highlight: 'Evidence-based resources'
    }
  ]

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      )
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, testimonials.length])

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const goToNext = () => {
    setCurrentIndex(currentIndex === testimonials.length - 1 ? 0 : currentIndex + 1)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  return (
    <section className="py-20 bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16" data-aos="fade-up">
          <div className="inline-flex items-center bg-white dark:bg-gray-800 rounded-full px-4 py-2 mb-4 shadow-md">
            <Quote className="w-4 h-4 text-primary-600 dark:text-primary-400 mr-2" />
            <span className="text-primary-600 dark:text-primary-400 font-medium text-sm">Testimonials</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            What{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-secondary-500">
              Mothers Say
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Real stories from Ghanaian mothers who trust Obaatanpa for their pregnancy and motherhood journey.
          </p>
        </div>

        {/* Testimonial Carousel */}
        <div className="relative" data-aos="fade-up" data-aos-delay="200">
          <div className="overflow-hidden rounded-3xl">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="w-full flex-shrink-0">
                  <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 md:p-12 shadow-xl mx-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                      {/* Content */}
                      <div className="order-2 lg:order-1">
                        {/* Quote Icon */}
                        <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mb-6">
                          <Quote className="w-8 h-8 text-white" />
                        </div>

                        {/* Rating */}
                        <div className="flex items-center mb-6">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" />
                          ))}
                        </div>

                        {/* Quote */}
                        <blockquote className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 leading-relaxed mb-6 italic">
                          "{testimonial.quote}"
                        </blockquote>

                        {/* Highlight */}
                        <div className="bg-primary-100 dark:bg-primary-900/30 rounded-2xl p-4 mb-6">
                          <p className="text-primary-700 dark:text-primary-300 font-medium">
                            💡 Key highlight: {testimonial.highlight}
                          </p>
                        </div>

                        {/* Author Info */}
                        <div>
                          <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                            {testimonial.name}
                          </h4>
                          <p className="text-gray-600 dark:text-gray-400 mb-1">
                            {testimonial.role}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-500">
                            📍 {testimonial.location}
                          </p>
                        </div>
                      </div>

                      {/* Image */}
                      <div className="order-1 lg:order-2 flex justify-center">
                        <div className="relative">
                          <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden shadow-2xl">
                            <Image
                              src={testimonial.image}
                              alt={testimonial.name}
                              fill
                              sizes="(max-width: 768px) 256px, 320px"
                              className="object-cover"
                            />
                          </div>
                          {/* Decorative Elements */}
                          <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-full opacity-80"></div>
                          <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-secondary-400 to-primary-400 rounded-full opacity-60"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white dark:bg-gray-800 rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 z-10"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600 dark:text-gray-300" />
          </button>
          
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white dark:bg-gray-800 rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 z-10"
          >
            <ChevronRight className="w-6 h-6 text-gray-600 dark:text-gray-300" />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-primary-500 w-8'
                    : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Trust Stats */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8" data-aos="fade-up" data-aos-delay="400">
          <div className="text-center">
            <div className="text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2">98%</div>
            <div className="text-gray-600 dark:text-gray-300">Satisfaction Rate</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2">2,000+</div>
            <div className="text-gray-600 dark:text-gray-300">Happy Mothers</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2">4.9★</div>
            <div className="text-gray-600 dark:text-gray-300">Average Rating</div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TestimonialSection
