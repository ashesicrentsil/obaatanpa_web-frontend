'use client'

const RecommendedFoods = () => {
  const recommendedFoods = [
    { stage: '1st Trimester', nutrient: 'Folic acid', foods: 'Kontomire, oranges, beans', color: 'bg-pink-50 dark:bg-pink-900/20' },
    { stage: '2nd Trimester', nutrient: 'Calcium', foods: 'Nkontomire, milk, sardines', color: 'bg-purple-50 dark:bg-purple-900/20' },
    { stage: '3rd Trimester', nutrient: 'Iron & protein', foods: 'Red meat, eggs, beans', color: 'bg-red-50 dark:bg-red-900/20' },
    { stage: 'Postpartum', nutrient: 'Fluids & protein', foods: 'Soup, palmnut soup, groundnut soup', color: 'bg-blue-50 dark:bg-blue-900/20' },
    { stage: 'Breastfeeding', nutrient: 'High-calorie foods', foods: 'Banku, kenkey, plantains', color: 'bg-green-50 dark:bg-green-900/20' }
  ]

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Recommended Foods by Stage
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Key nutrients and local Ghanaian foods for each stage of your journey
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendedFoods.map((food, index) => (
            <div
              key={index}
              className={`${food.color} p-6 rounded-2xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300`}
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{food.stage}</h3>
              <div className="mb-3">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200">
                  {food.nutrient}
                </span>
              </div>
              <p className="text-gray-700 dark:text-gray-300 font-medium">{food.foods}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default RecommendedFoods
