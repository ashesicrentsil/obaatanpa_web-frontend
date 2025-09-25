'use client'

const NutritionTips = () => {
  const nutritionTips = [
    { icon: '🍊', tip: 'Take vitamin C-rich fruits to absorb more iron', color: 'bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800' },
    { icon: '🥬', tip: 'Avoid raw eggs, unpasteurized milk, and soft cheese', color: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800' },
    { icon: '🧃', tip: 'Drink at least 8 cups of water daily during breastfeeding', color: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800' },
    { icon: '🥜', tip: 'Include groundnuts and beans for protein and folate', color: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' },
    { icon: '🐟', tip: 'Eat fish twice a week for omega-3 fatty acids', color: 'bg-teal-50 dark:bg-teal-900/20 border-teal-200 dark:border-teal-800' },
    { icon: '🍌', tip: 'Bananas help with morning sickness and provide potassium', color: 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800' }
  ]

  return (
    <section className="py-16 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Essential Nutrition Tips
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Quick, actionable advice to keep you and your baby healthy
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {nutritionTips.map((tip, index) => (
            <div
              key={index}
              className={`p-6 rounded-2xl border-2 ${tip.color} hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1`}
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="text-4xl mb-4">{tip.icon}</div>
              <p className="text-gray-800 dark:text-gray-200 font-medium leading-relaxed">
                {tip.tip}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default NutritionTips
