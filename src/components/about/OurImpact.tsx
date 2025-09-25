'use client'

import { Users, Calendar, MapPin, Heart, Star, Quote } from 'lucide-react'

const OurImpact = () => {
  const stats = [
    {
      icon: Users,
      number: "2,000+",
      label: "Women Reached",
      description: "Across Ghana",
      color: "from-[#F59297] to-pink-600"
    },
    {
      icon: Calendar,
      number: "500+",
      label: "Appointments Booked",
      description: "Through the app",
      color: "from-[#7da8e6] to-blue-600"
    },
    {
      icon: MapPin,
      number: "5",
      label: "Regions Covered",
      description: "And growing",
      color: "from-green-500 to-green-600"
    },
    {
      icon: Heart,
      number: "20+",
      label: "Healthcare Partners",
      description: "Midwives & doctors",
      color: "from-purple-500 to-purple-600"
    }
  ]

  const testimonials = [
    {
      quote: "Obaatanpa guided me every step of the way. I felt like I wasn't alone during my pregnancy journey.",
      author: "Akosua",
      role: "Mother of 2, Kumasi",
      rating: 5,
      image: "/images/testimonials/user1.png"
    },
    {
      quote: "The nutrition advice helped me understand which local foods were best for my baby. Very practical!",
      author: "Ama",
      role: "First-time mother, Accra",
      rating: 5,
      image: "/images/testimonials/user2.png"
    },
    {
      quote: "Finding a good hospital near me was so easy with Obaatanpa. The reviews from other mothers were helpful.",
      author: "Efua",
      role: "Mother of 3, Takoradi",
      rating: 5,
      image: "/images/testimonials/user3.png"
    }
  ]

  return (
    <section className="py-16 bg-gradient-to-br from-[#F59297]/5 via-white to-[#7da8e6]/5 dark:from-pink-900/10 dark:via-gray-900 dark:to-blue-900/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Our Impact
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Every number represents a real mother whose journey we've been privileged to support. 
            This is just the beginning of our impact story.
          </p>
        </div>

        {/* Impact Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className={`w-16 h-16 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                <stat.icon className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {stat.number}
              </div>
              <div className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-1">
                {stat.label}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {stat.description}
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="mb-16" data-aos="fade-up" data-aos-delay="400">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">
            What Mothers Are Saying
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                data-aos="fade-up"
                data-aos-delay={500 + index * 100}
              >
                <div className="flex items-center mb-4">
                  <Quote className="w-6 h-6 text-[#F59297] mr-2" />
                  <div className="flex">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" />
                    ))}
                  </div>
                </div>
                
                <p className="text-gray-600 dark:text-gray-300 mb-4 italic leading-relaxed">
                  "{testimonial.quote}"
                </p>
                
                <div className="border-t border-gray-200 dark:border-gray-600 pt-4 flex items-center gap-3">
                  <img
                    src={testimonial.image}
                    alt={testimonial.author}
                    className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-md mt-4 bg-gray-100"
                  />
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {testimonial.author}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Future Goals */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg" data-aos="fade-up" data-aos-delay="600">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Our Goals for 2024
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              We're not stopping here. These are our ambitious but achievable goals for the coming year.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-[#F59297] mb-2">10,000+</div>
                <div className="text-gray-600 dark:text-gray-400">Mothers Supported</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#7da8e6] mb-2">10</div>
                <div className="text-gray-600 dark:text-gray-400">All Regions Covered</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-500 mb-2">50+</div>
                <div className="text-gray-600 dark:text-gray-400">Healthcare Partners</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default OurImpact
