'use client'

import Link from 'next/link'

const QuickAccessSection = () => {
  const quickAccessCards = [
    {
      emoji: '👶',
      title: 'Infant Activities',
      description: 'Age-appropriate activities and developmental milestones for your baby',
      href: '/infant-activities',
      image: '/images/dashboard/infant-activities.png',
    },
    {
      emoji: '🥗',
      title: 'Meal Plans',
      description: 'Nutritious meal plans for pregnancy and breastfeeding mothers',
      href: '/nutrition',
      image: '/images/features/nutrition-plans.jpg',
    },
    {
      emoji: '🏥',
      title: 'Nearby Hospitals',
      description: 'Find trusted maternity hospitals and clinics in your area',
      href: '/hospitals',
      image: '/images/features/hospital-search.jpg',
    },
    {
      emoji: '💚',
      title: 'Mental Health Tips',
      description: 'Support for emotional wellbeing during pregnancy and motherhood',
      href: '/mental-health',
      image: '/images/features/community-support.jpg',
    },
    {
      emoji: '📋',
      title: 'Birth Plan Tools',
      description: 'Create and customize your birth plan with expert guidance',
      href: '/birth-plan',
      image: '/images/products/birth-plan.jpg',
    },
    {
      emoji: '💬',
      title: 'Chat with Experts',
      description: 'Connect with midwives and healthcare professionals instantly',
      href: '/chat',
      image: '/images/features/chat.png',
    },
    {
      emoji: '📅',
      title: 'Appointments',
      description: 'Schedule and manage your prenatal appointments',
      href: '/appointments',
      image: '/images/features/appointments.jpg',
    },
    {
      emoji: '🩺',
      title: 'Health Tracking',
      description: 'Monitor your pregnancy progress and baby\'s development',
      href: '/health-tracking',
      image: '/images/dashboard/health-tracking.jpg',
    }
  ]

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-sm font-medium text-primary-600 dark:text-primary-400 mb-2">Quick Access</p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            Everything You Need, One Click Away
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickAccessCards.map((card, index) => (
            <Link
              key={index}
              href={card.href}
              className="rounded-xl overflow-hidden shadow hover:shadow-md transition-shadow duration-300 group"
            >
              <div className="relative h-48">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover object-center brightness-90 group-hover:brightness-100 transition duration-300"
                />
              </div>
              <div className="p-4 bg-white dark:bg-gray-800">
                <div className="text-2xl mb-2">{card.emoji}</div>
                <h3 className="text-base font-semibold text-gray-800 dark:text-white">
                  {card.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                  {card.description}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { number: '2,000+', label: 'Active Users' },
            { number: '50+', label: 'Partner Hospitals' },
            { number: '24/7', label: 'Expert Support' },
            { number: '100%', label: 'Culturally Relevant' }
          ].map((stat, index) => (
            <div key={index}>
              <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">{stat.number}</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default QuickAccessSection
