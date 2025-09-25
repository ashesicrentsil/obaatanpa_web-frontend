'use client'

import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { Heart, Target, Users, Globe, Award, TrendingUp } from 'lucide-react'

export default function MissionPage() {
  const values = [
    {
      icon: Heart,
      title: 'Compassionate Care',
      description: 'We believe every mother deserves compassionate, culturally sensitive care throughout her journey.',
      color: 'text-[#F59297]'
    },
    {
      icon: Users,
      title: 'Community Support',
      description: 'Building strong communities where mothers can connect, share experiences, and support each other.',
      color: 'text-[#7da8e6]'
    },
    {
      icon: Globe,
      title: 'Cultural Relevance',
      description: 'Honoring Ghanaian traditions while providing modern, evidence-based maternal healthcare guidance.',
      color: 'text-green-500'
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'Committed to providing the highest quality resources, tools, and support for maternal health.',
      color: 'text-purple-500'
    }
  ]

  const goals = [
    {
      title: 'Reduce Maternal Mortality',
      description: 'Working towards Ghana\'s goal of reducing maternal mortality rates through education and early intervention.',
      target: '50% reduction by 2030',
      progress: 65
    },
    {
      title: 'Improve Access to Care',
      description: 'Connecting mothers in rural and urban areas with quality healthcare providers and resources.',
      target: '100,000 mothers reached',
      progress: 78
    },
    {
      title: 'Enhance Health Literacy',
      description: 'Empowering mothers with knowledge about pregnancy, childbirth, and infant care.',
      target: '500+ educational resources',
      progress: 85
    },
    {
      title: 'Build Support Networks',
      description: 'Creating strong community networks where mothers can find emotional and practical support.',
      target: '50+ support groups',
      progress: 42
    }
  ]

  const impact = [
    {
      number: '25,000+',
      label: 'Mothers Supported',
      description: 'Across Ghana and beyond'
    },
    {
      number: '150+',
      label: 'Healthcare Partners',
      description: 'Hospitals and clinics'
    },
    {
      number: '500+',
      label: 'Educational Resources',
      description: 'Available in local languages'
    },
    {
      number: '98%',
      label: 'Satisfaction Rate',
      description: 'From our community members'
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
              Our Mission
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-4xl mx-auto leading-relaxed">
              To empower every Ghanaian mother with the knowledge, support, and resources needed for a healthy pregnancy, safe delivery, and confident motherhood journey.
            </p>
            <div className="flex items-center justify-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <Target className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Statement */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Our Vision
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
              A Ghana where every mother has access to quality maternal healthcare, feels supported throughout her journey, and is empowered to make informed decisions about her health and her baby's wellbeing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Why Obaatanpa Exists
              </h3>
              <div className="space-y-4 text-gray-600 dark:text-gray-300">
                <p>
                  In Ghana, many mothers face challenges accessing quality maternal healthcare information and support. Traditional knowledge is valuable, but it needs to be complemented with modern, evidence-based care.
                </p>
                <p>
                  Obaatanpa bridges this gap by providing culturally relevant, medically accurate information while honoring our rich traditions and community values.
                </p>
                <p>
                  We believe that every mother, regardless of her location, education level, or economic status, deserves access to the best possible care and support during this transformative time in her life.
                </p>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-[#F59297]/10 to-[#7da8e6]/10 rounded-3xl p-8">
              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-r from-[#F59297] to-[#7da8e6] rounded-full flex items-center justify-center mx-auto mb-6">
                  <Heart className="w-12 h-12 text-white" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  "Obaatanpa" means "Good Mother" in Twi
                </h4>
                <p className="text-gray-600 dark:text-gray-300">
                  Our name reflects our commitment to supporting every woman in becoming the best mother she can be, with the right knowledge, support, and care.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Our Core Values
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              These values guide everything we do and shape how we serve our community
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon
              return (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 text-center">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 ${value.color.replace('text-', 'bg-')}/10`}>
                    <IconComponent className={`w-8 h-8 ${value.color}`} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {value.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Goals & Progress */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Our Goals & Progress
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Tracking our progress towards improving maternal health outcomes in Ghana
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {goals.map((goal, index) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-3xl p-8">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  {goal.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {goal.description}
                </p>
                
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Progress
                    </span>
                    <span className="text-sm font-medium text-[#F59297]">
                      {goal.progress}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-[#F59297] to-[#7da8e6] h-3 rounded-full transition-all duration-500"
                      style={{ width: `${goal.progress}%` }}
                    />
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Target: {goal.target}
                  </span>
                  <TrendingUp className="w-4 h-4 text-green-500" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Numbers */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Our Impact So Far
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Real numbers showing the difference we're making in maternal health
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {impact.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="bg-gradient-to-br from-[#F59297] to-[#7da8e6] rounded-3xl p-8 mb-4">
                  <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                    {stat.number}
                  </div>
                  <div className="text-xl font-semibold text-white">
                    {stat.label}
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  {stat.description}
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
            Join Us in Our Mission
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            Whether you're a mother, healthcare provider, or supporter of maternal health, there's a place for you in the Obaatanpa community.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-[#F59297] px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-lg">
              Join Our Community
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-[#F59297] transform hover:scale-105 transition-all duration-300">
              Partner With Us
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
