'use client'

import { useState } from 'react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { MapPin, Clock, Users, Heart, Briefcase, GraduationCap, DollarSign, Calendar } from 'lucide-react'

export default function CareersPage() {
  const [selectedDepartment, setSelectedDepartment] = useState('all')

  const departments = [
    { id: 'all', label: 'All Positions', count: 8 },
    { id: 'medical', label: 'Medical', count: 3 },
    { id: 'technology', label: 'Technology', count: 2 },
    { id: 'community', label: 'Community', count: 2 },
    { id: 'operations', label: 'Operations', count: 1 }
  ]

  const benefits = [
    {
      icon: Heart,
      title: 'Health & Wellness',
      description: 'Comprehensive health insurance, mental health support, and wellness programs',
      color: 'text-[#F59297]'
    },
    {
      icon: GraduationCap,
      title: 'Professional Development',
      description: 'Continuous learning opportunities, conference attendance, and skill development',
      color: 'text-[#7da8e6]'
    },
    {
      icon: Users,
      title: 'Collaborative Culture',
      description: 'Work with passionate professionals in a supportive, inclusive environment',
      color: 'text-green-500'
    },
    {
      icon: DollarSign,
      title: 'Competitive Compensation',
      description: 'Fair salaries, performance bonuses, and equity participation opportunities',
      color: 'text-purple-500'
    }
  ]

  const openPositions = [
    {
      id: 1,
      title: 'Senior Midwife',
      department: 'medical',
      location: 'Accra, Ghana',
      type: 'Full-time',
      experience: '5+ years',
      salary: 'GHS 8,000 - 12,000',
      description: 'Join our medical team to provide expert guidance and support to expectant mothers through our platform.',
      requirements: [
        'Licensed midwife with 5+ years experience',
        'Experience in prenatal and postnatal care',
        'Strong communication skills',
        'Passion for maternal health education'
      ],
      responsibilities: [
        'Provide expert medical guidance through our platform',
        'Create educational content for mothers',
        'Conduct virtual consultations',
        'Collaborate with healthcare partners'
      ],
      posted: '2024-01-10'
    },
    {
      id: 2,
      title: 'Frontend Developer',
      department: 'technology',
      location: 'Accra, Ghana / Remote',
      type: 'Full-time',
      experience: '3+ years',
      salary: 'GHS 6,000 - 10,000',
      description: 'Help build user-friendly interfaces that make maternal healthcare accessible to all Ghanaian mothers.',
      requirements: [
        'Bachelor\'s degree in Computer Science or related field',
        '3+ years experience with React/Next.js',
        'Experience with TypeScript and Tailwind CSS',
        'Understanding of healthcare applications preferred'
      ],
      responsibilities: [
        'Develop responsive web applications',
        'Collaborate with design and backend teams',
        'Optimize application performance',
        'Implement accessibility best practices'
      ],
      posted: '2024-01-08'
    },
    {
      id: 3,
      title: 'Community Outreach Coordinator',
      department: 'community',
      location: 'Kumasi, Ghana',
      type: 'Full-time',
      experience: '2+ years',
      salary: 'GHS 4,000 - 6,000',
      description: 'Lead community engagement initiatives to connect with mothers across Ghana and build local partnerships.',
      requirements: [
        'Bachelor\'s degree in Public Health, Social Work, or related field',
        '2+ years experience in community outreach',
        'Fluency in English and local languages (Twi preferred)',
        'Strong interpersonal and communication skills'
      ],
      responsibilities: [
        'Develop and implement community outreach programs',
        'Build partnerships with local healthcare facilities',
        'Organize community health education events',
        'Collect feedback from community members'
      ],
      posted: '2024-01-05'
    },
    {
      id: 4,
      title: 'Pediatric Nurse',
      department: 'medical',
      location: 'Accra, Ghana',
      type: 'Part-time',
      experience: '3+ years',
      salary: 'GHS 3,000 - 5,000',
      description: 'Provide specialized guidance on newborn and infant care through our platform.',
      requirements: [
        'Licensed nurse with pediatric specialization',
        '3+ years experience in newborn/infant care',
        'Experience with breastfeeding support',
        'Excellent communication skills'
      ],
      responsibilities: [
        'Provide expert advice on infant care',
        'Support new mothers with breastfeeding guidance',
        'Create educational content for newborn care',
        'Participate in virtual consultations'
      ],
      posted: '2024-01-03'
    },
    {
      id: 5,
      title: 'Mobile App Developer',
      department: 'technology',
      location: 'Remote',
      type: 'Contract',
      experience: '4+ years',
      salary: 'GHS 8,000 - 12,000',
      description: 'Develop our mobile application to bring maternal healthcare support directly to mothers\' phones.',
      requirements: [
        'Bachelor\'s degree in Computer Science or related field',
        '4+ years experience with React Native or Flutter',
        'Experience with mobile app deployment',
        'Knowledge of healthcare app regulations'
      ],
      responsibilities: [
        'Develop cross-platform mobile application',
        'Integrate with existing web platform',
        'Implement offline functionality',
        'Ensure app store compliance'
      ],
      posted: '2024-01-01'
    }
  ]

  const filteredPositions = openPositions.filter(position => 
    selectedDepartment === 'all' || position.department === selectedDepartment
  )

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Full-time':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'Part-time':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
      case 'Contract':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-[#F59297] to-[#7da8e6] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Join Our Mission
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-4xl mx-auto leading-relaxed">
              Help us transform maternal healthcare in Ghana. Join a team of passionate professionals making a real difference in mothers' lives.
            </p>
            <div className="flex items-center justify-center space-x-8 text-white/80">
              <div className="text-center">
                <div className="text-2xl font-bold">25+</div>
                <div className="text-sm">Team Members</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">8</div>
                <div className="text-sm">Open Positions</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">100%</div>
                <div className="text-sm">Remote Friendly</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Work With Us */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Why Work With Us?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Join a mission-driven organization where your work directly impacts maternal health outcomes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon
              return (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 text-center">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 ${benefit.color.replace('text-', 'bg-')}/10`}>
                    <IconComponent className={`w-8 h-8 ${benefit.color}`} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {benefit.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Open Positions
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Find your next opportunity to make a meaningful impact in maternal healthcare
            </p>
          </div>

          {/* Department Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {departments.map((dept) => (
              <button
                key={dept.id}
                onClick={() => setSelectedDepartment(dept.id)}
                className={`px-6 py-3 rounded-2xl font-medium transition-all duration-200 ${
                  selectedDepartment === dept.id
                    ? 'bg-[#F59297] text-white shadow-lg'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {dept.label}
                <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                  selectedDepartment === dept.id
                    ? 'bg-white/20 text-white'
                    : 'bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-400'
                }`}>
                  {dept.count}
                </span>
              </button>
            ))}
          </div>

          {/* Job Listings */}
          <div className="space-y-6">
            {filteredPositions.map((position) => (
              <div key={position.id} className="bg-gray-50 dark:bg-gray-700 rounded-3xl p-8 hover:shadow-lg transition-all duration-300">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-4">
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                        {position.title}
                      </h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(position.type)}`}>
                        {position.type}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {position.description}
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2 text-[#F59297]" />
                        {position.location}
                      </div>
                      <div className="flex items-center">
                        <Briefcase className="w-4 h-4 mr-2 text-[#7da8e6]" />
                        {position.experience}
                      </div>
                      <div className="flex items-center">
                        <DollarSign className="w-4 h-4 mr-2 text-green-500" />
                        {position.salary}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2 text-purple-500" />
                        Posted {new Date(position.posted).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button className="px-6 py-3 bg-gradient-to-r from-[#F59297] to-[#7da8e6] text-white rounded-2xl font-semibold hover:shadow-lg transition-all duration-200">
                      Apply Now
                    </button>
                    <button className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-2xl font-semibold hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-200">
                      Learn More
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Our Hiring Process
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              We believe in a fair, transparent hiring process that helps us find the best fit for both you and our team
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: '01',
                title: 'Application',
                description: 'Submit your application with resume and cover letter'
              },
              {
                step: '02',
                title: 'Initial Review',
                description: 'Our team reviews your application and qualifications'
              },
              {
                step: '03',
                title: 'Interview',
                description: 'Video interview with hiring manager and team members'
              },
              {
                step: '04',
                title: 'Decision',
                description: 'Final decision and offer discussion within one week'
              }
            ].map((process, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-[#F59297] to-[#7da8e6] rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-white text-xl font-bold">{process.step}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  {process.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {process.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-br from-[#F59297] to-[#7da8e6] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            Don't see a position that fits? We're always interested in hearing from passionate individuals who want to improve maternal healthcare.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-[#F59297] px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-lg">
              Send Us Your Resume
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-[#F59297] transform hover:scale-105 transition-all duration-300">
              Learn About Our Culture
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
