'use client'

import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { Mail, Linkedin, Twitter, Award, Heart, Users, Stethoscope } from 'lucide-react'

export default function TeamPage() {
  const leadership = [
    {
      name: 'Dr. Akosua Mensah',
      role: 'Founder & Chief Medical Officer',
      specialization: 'Obstetrics & Gynecology',
      bio: 'Dr. Mensah is a board-certified obstetrician with over 15 years of experience in maternal health. She founded Obaatanpa after seeing the need for culturally relevant maternal care resources in Ghana.',
      education: 'MD - University of Ghana Medical School, Fellowship in Maternal-Fetal Medicine',
      achievements: ['Ghana Medical Association Excellence Award 2022', 'Published 25+ research papers on maternal health'],
      image: '/images/team/dr-akosua-mensah.jpg',
      email: 'akosua@obaatanpa.com',
      linkedin: 'https://linkedin.com/in/akosua-mensah',
      twitter: 'https://twitter.com/dr_akosua'
    },
    {
      name: 'Kwame Asante',
      role: 'Chief Technology Officer',
      specialization: 'Healthcare Technology',
      bio: 'Kwame brings 12 years of experience in healthcare technology and digital health solutions. He leads our technical team in creating user-friendly platforms for maternal care.',
      education: 'MSc Computer Science - KNUST, BSc Information Technology',
      achievements: ['Ghana Tech Innovation Award 2021', 'Led development of 3 successful health apps'],
      image: '/images/team/kwame-asante.jpg',
      email: 'kwame@obaatanpa.com',
      linkedin: 'https://linkedin.com/in/kwame-asante',
      twitter: 'https://twitter.com/kwame_tech'
    },
    {
      name: 'Ama Osei',
      role: 'Head of Community & Outreach',
      specialization: 'Public Health & Community Engagement',
      bio: 'Ama is passionate about building strong communities and ensuring maternal health resources reach every corner of Ghana. She oversees our community programs and partnerships.',
      education: 'MPH - University of Ghana School of Public Health',
      achievements: ['Reached 50,000+ mothers through community programs', 'Built partnerships with 100+ healthcare facilities'],
      image: '/images/team/ama-osei.jpg',
      email: 'ama@obaatanpa.com',
      linkedin: 'https://linkedin.com/in/ama-osei',
      twitter: 'https://twitter.com/ama_community'
    }
  ]

  const medicalTeam = [
    {
      name: 'Dr. Efua Boateng',
      role: 'Senior Midwife & Lactation Consultant',
      specialization: 'Midwifery & Breastfeeding Support',
      experience: '18 years',
      image: '/images/team/dr-efua-boateng.jpg'
    },
    {
      name: 'Dr. Yaa Amponsah',
      role: 'Pediatrician',
      specialization: 'Newborn & Infant Care',
      experience: '12 years',
      image: '/images/team/dr-yaa-amponsah.jpg'
    },
    {
      name: 'Nurse Adwoa Asante',
      role: 'Maternal Health Nurse',
      specialization: 'Prenatal & Postpartum Care',
      experience: '10 years',
      image: '/images/team/nurse-adwoa-asante.jpg'
    },
    {
      name: 'Dr. Abena Kwarteng',
      role: 'Mental Health Counselor',
      specialization: 'Perinatal Mental Health',
      experience: '8 years',
      image: '/images/team/dr-abena-kwarteng.jpg'
    }
  ]

  const advisors = [
    {
      name: 'Prof. Kofi Mensah',
      role: 'Medical Advisor',
      affiliation: 'University of Ghana Medical School',
      expertise: 'Maternal-Fetal Medicine'
    },
    {
      name: 'Dr. Nana Ama Browne',
      role: 'Public Health Advisor',
      affiliation: 'Ghana Health Service',
      expertise: 'Maternal Health Policy'
    },
    {
      name: 'Mrs. Akua Donkor',
      role: 'Community Advisor',
      affiliation: 'Ghana Registered Midwives Association',
      expertise: 'Traditional Birth Practices'
    }
  ]

  const stats = [
    {
      icon: Users,
      number: '25+',
      label: 'Team Members',
      description: 'Dedicated professionals'
    },
    {
      icon: Stethoscope,
      number: '15+',
      label: 'Medical Experts',
      description: 'Certified healthcare providers'
    },
    {
      icon: Award,
      number: '50+',
      label: 'Years Combined Experience',
      description: 'In maternal healthcare'
    },
    {
      icon: Heart,
      number: '100%',
      label: 'Passion Driven',
      description: 'Committed to maternal health'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-[#F59297] to-[#7da8e6] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Meet Our Team
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-4xl mx-auto leading-relaxed">
              Passionate healthcare professionals, technologists, and community advocates working together to improve maternal health in Ghana.
            </p>
          </div>
        </div>
      </section>

      {/* Team Stats */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-[#F59297] to-[#7da8e6] rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {stat.number}
                  </div>
                  <div className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                    {stat.label}
                  </div>
                  <div className="text-gray-600 dark:text-gray-400">
                    {stat.description}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Leadership Team
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Meet the visionaries leading Obaatanpa's mission to transform maternal healthcare
            </p>
          </div>

          <div className="space-y-16">
            {leadership.map((leader, index) => (
              <div key={index} className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
                <div className={`${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                  <div className="aspect-square bg-gradient-to-br from-[#F59297]/20 to-[#7da8e6]/20 rounded-3xl flex items-center justify-center">
                    <div className="w-32 h-32 bg-gradient-to-r from-[#F59297] to-[#7da8e6] rounded-full flex items-center justify-center">
                      <span className="text-white text-4xl font-bold">
                        {leader.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className={`${index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {leader.name}
                  </h3>
                  <p className="text-xl text-[#F59297] font-semibold mb-2">
                    {leader.role}
                  </p>
                  <p className="text-lg text-[#7da8e6] mb-6">
                    {leader.specialization}
                  </p>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                    {leader.bio}
                  </p>
                  
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Education</h4>
                    <p className="text-gray-600 dark:text-gray-300">{leader.education}</p>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Key Achievements</h4>
                    <ul className="space-y-1">
                      {leader.achievements.map((achievement, i) => (
                        <li key={i} className="text-gray-600 dark:text-gray-300 flex items-start">
                          <span className="text-[#F59297] mr-2">•</span>
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="flex space-x-4">
                    <a href={`mailto:${leader.email}`} className="w-10 h-10 bg-gray-200 dark:bg-gray-700 hover:bg-[#F59297] text-gray-600 dark:text-gray-400 hover:text-white rounded-full flex items-center justify-center transition-all duration-200">
                      <Mail className="w-5 h-5" />
                    </a>
                    <a href={leader.linkedin} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-200 dark:bg-gray-700 hover:bg-[#7da8e6] text-gray-600 dark:text-gray-400 hover:text-white rounded-full flex items-center justify-center transition-all duration-200">
                      <Linkedin className="w-5 h-5" />
                    </a>
                    <a href={leader.twitter} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-200 dark:bg-gray-700 hover:bg-blue-500 text-gray-600 dark:text-gray-400 hover:text-white rounded-full flex items-center justify-center transition-all duration-200">
                      <Twitter className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Medical Team */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Medical Team
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Experienced healthcare professionals providing expert guidance and support
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {medicalTeam.map((member, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 text-center">
                <div className="w-24 h-24 bg-gradient-to-r from-[#F59297] to-[#7da8e6] rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-white text-xl font-bold">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  {member.name}
                </h3>
                <p className="text-[#F59297] font-semibold mb-2">
                  {member.role}
                </p>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                  {member.specialization}
                </p>
                <div className="flex items-center justify-center text-sm text-gray-500">
                  <Award className="w-4 h-4 mr-1" />
                  {member.experience} experience
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advisory Board */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Advisory Board
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Distinguished experts guiding our strategic direction and ensuring clinical excellence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {advisors.map((advisor, index) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-3xl p-8 text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-[#F59297] to-[#7da8e6] rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-white text-xl font-bold">
                    {advisor.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {advisor.name}
                </h3>
                <p className="text-[#F59297] font-semibold mb-2">
                  {advisor.role}
                </p>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                  {advisor.affiliation}
                </p>
                <p className="text-[#7da8e6] text-sm font-medium">
                  {advisor.expertise}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Our Team */}
      <section className="py-16 bg-gradient-to-br from-[#F59297] to-[#7da8e6] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Join Our Mission
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            Are you passionate about maternal health and want to make a difference? We're always looking for talented individuals to join our team.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-[#F59297] px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-lg">
              View Open Positions
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-[#F59297] transform hover:scale-105 transition-all duration-300">
              Contact Us
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
