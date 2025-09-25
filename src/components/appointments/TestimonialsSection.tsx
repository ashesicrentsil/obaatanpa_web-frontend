'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import AOS from 'aos'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'

const TestimonialsSection = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      mirror: true,
      easing: 'ease-in-out',
    })
  }, [])

  const testimonials = [
    {
      name: "Akosua",
      role: "First-time Mom",
      location: "Accra",
      image: "/images/testimonials/user1.png",
      quote: "Booking my appointments on Obaatanpa saved me hours and gave me peace of mind. The reminders helped me never miss a checkup!",
      rating: 5
    },
    {
      name: "Ama",
      role: "Mother of Two",
      location: "Kumasi",
      image: "/images/testimonials/user2.png",
      quote: "The platform connected me with amazing midwives who understood my cultural needs. I felt supported throughout my pregnancy journey.",
      rating: 5
    },
    {
      name: "Efua",
      role: "New Mother",
      location: "Tamale",
      image: "/images/testimonials/user3.png",
      quote: "From antenatal to postnatal care, Obaatanpa made everything so easy. The verified hospitals gave me confidence in my care.",
      rating: 5
    }
  ]

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(nextTestimonial, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="py-16 bg-gradient-to-br from-pink-50 to-blue-50 dark:from-gray-800 dark:to-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 font-poppins">
            What Mothers Are Saying
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto font-lora">
            Real stories from mothers who trust Obaatanpa for their healthcare journey
          </p>
        </div>

        {/* Testimonial Carousel */}
        <div className="relative max-w-4xl mx-auto" data-aos="fade-up" data-aos-delay="200">
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 md:p-12 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#e67d82]/10 to-[#7da8e6]/10 rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-[#7da8e6]/10 to-[#e67d82]/10 rounded-full translate-y-12 -translate-x-12"></div>

            {/* Current Testimonial */}
            <div className="relative z-10 text-center">
              {/* Stars */}
              <div className="flex justify-center mb-6">
                {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 font-lora italic mb-8 leading-relaxed">
                "{testimonials[currentTestimonial].quote}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center justify-center space-x-4">
                <div className="relative">
                  <Image
                    src={testimonials[currentTestimonial].image}
                    alt={testimonials[currentTestimonial].name}
                    width={80}
                    height={80}
                    className="w-20 h-20 rounded-full object-cover border-4 border-gradient-to-r from-[#e67d82] to-[#7da8e6]"
                  />
                </div>
                <div className="text-left">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white font-poppins">
                    {testimonials[currentTestimonial].name}
                  </h4>
                  <p className="text-[#e67d82] font-medium">
                    {testimonials[currentTestimonial].role}
                  </p>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    {testimonials[currentTestimonial].location}
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevTestimonial}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white dark:bg-gray-700 rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-600 transition-all duration-300 hover:scale-110"
            >
              <ChevronLeft className="w-6 h-6 text-gray-600 dark:text-gray-300" />
            </button>
            <button
              onClick={nextTestimonial}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white dark:bg-gray-700 rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-600 transition-all duration-300 hover:scale-110"
            >
              <ChevronRight className="w-6 h-6 text-gray-600 dark:text-gray-300" />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentTestimonial
                    ? 'bg-[#e67d82] scale-125'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default TestimonialsSection
