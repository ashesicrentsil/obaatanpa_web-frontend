'use client'

const AvoidFoods = () => {
  const avoidFoods = [
    { item: 'Excess caffeine', reason: 'Can affect baby\'s growth', icon: '☕' },
    { item: 'Alcohol', reason: 'Harmful to baby\'s development', icon: '🍷' },
    { item: 'Undercooked meat', reason: 'Risk of infections', icon: '🥩' },
    { item: 'Too much salt/Maggi', reason: 'Can cause high blood pressure', icon: '🧂' },
    { item: 'Herbal medicine', reason: 'Without doctor approval', icon: '🌿' }
  ]

  return (
    <section className="py-16 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            What to Avoid
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Foods and substances to limit or avoid during pregnancy and breastfeeding
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {avoidFoods.map((item, index) => (
            <div
              key={index}
              className="bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 p-6 rounded-2xl hover:shadow-lg transition-all duration-300"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="flex items-start space-x-4">
                <div className="text-3xl">{item.icon}</div>
                <div>
                  <h3 className="text-lg font-bold text-red-800 dark:text-red-300 mb-2">❌ {item.item}</h3>
                  <p className="text-red-700 dark:text-red-400">{item.reason}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default AvoidFoods
