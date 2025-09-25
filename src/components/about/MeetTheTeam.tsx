'use client'

import Image from 'next/image'
import { Quote, Heart, Stethoscope, Code, Apple } from 'lucide-react'

const MeetTheTeam = () => {
  const teamMembers = [
    {
      name: "Linda Owusu",
      role: "Lead Midwife",
      image: "/images/team/linda-owusu.jpg",
      quote: "I joined Obaatanpa because I wanted more women to feel seen and supported outside hospital walls.",
      icon: Stethoscope,
      color: "from-[#F59297] to-pink-600"
    },
    {
      name: "Abba A.",
      role: "Founder & Developer",
      image: "/images/team/abba-developer.jpg",
      quote: "Technology should serve humanity. Obaatanpa is my way of using tech to support Ghanaian mothers.",
      icon: Code,
      color: "from-[#7da8e6] to-blue-600"
    },
    {
      name: "Adwoa Boateng",
      role: "Nutritionist",
      image: "/images/team/adwoa-nutritionist.jpg",
      quote: "Good nutrition during pregnancy starts with understanding our local foods and traditions.",
      icon: Apple,
      color: "from-green-500 to-green-600"
    },
    {
      name: "Dr. Kwame Mensah",
      role: "Obstetric Advisor",
      image: "/images/team/dr-kwame.jpg",
      quote: "Every mother deserves access to expert medical guidance, regardless of where she lives.",
      icon: Stethoscope,
      color: "from-purple-500 to-purple-600"
    }
  ]

  return (
    <section id="meet-the-team" className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Meet the Team
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            The passionate healthcare professionals, developers, and advocates behind Obaatanpa. 
            We're united by our mission to support every Ghanaian mother.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.slice(0, 3).map((member, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              {/* Profile Image */}
              <div className="relative h-64 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600">
                <Image
                  src={member.image}
                  alt={`${member.name} - ${member.role}`}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                
                {/* Role Icon */}
                <div className={`absolute top-4 right-4 w-10 h-10 bg-gradient-to-br ${member.color} rounded-full flex items-center justify-center shadow-lg`}>
                  <member.icon className="w-5 h-5 text-white" />
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                  {member.name}
                </h3>
                <p className="text-[#F59297] dark:text-[#F59297] font-medium mb-4">
                  {member.role}
                </p>
                
                {/* Quote */}
                <div className="relative">
                  <Quote className="w-6 h-6 text-[#7da8e6] opacity-50 mb-2" />
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed italic">
                    "{member.quote}"
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Team Stats */}
        <div className="mt-16 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8" data-aos="fade-up" data-aos-delay="400">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-[#F59297] mb-2">15+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Years Combined Experience</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#7da8e6] mb-2">3</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Licensed Healthcare Professionals</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-500 mb-2">5</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Regions Represented</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-500 mb-2">100%</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Committed to Your Care</div>
            </div>
          </div>
        </div>

        {/* Join Us CTA */}
        <div className="text-center mt-12" data-aos="fade-up" data-aos-delay="500">
          <div className="bg-gradient-to-r from-[#F59297]/10 to-[#7da8e6]/10 dark:from-pink-900/20 dark:to-blue-900/20 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Want to Join Our Mission?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
              We're always looking for passionate healthcare professionals and advocates 
              who want to make a difference in maternal care across Ghana.
            </p>
            <button className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#F59297] to-[#7da8e6] text-white font-semibold rounded-xl hover:from-[#e67d82] hover:to-[#6b9ce6] transition-all duration-300 shadow-lg hover:shadow-xl">
              <Heart className="w-5 h-5 mr-2" fill="currentColor" />
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default MeetTheTeam
