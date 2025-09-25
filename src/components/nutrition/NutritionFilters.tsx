'use client'

interface NutritionFiltersProps {
  activeFilter: string
  setActiveFilter: (filter: string) => void
}

const NutritionFilters = ({ activeFilter, setActiveFilter }: NutritionFiltersProps) => {
  const nutritionFilters = [
    { id: 'first-trimester', label: 'First Trimester', icon: '🤰' },
    { id: 'second-trimester', label: 'Second Trimester', icon: '🤱' },
    { id: 'third-trimester', label: 'Third Trimester', icon: '👶' },
    { id: 'postpartum', label: 'Postpartum', icon: '🛌' },
    { id: 'breastfeeding', label: 'Breastfeeding', icon: '🍼' },
    { id: 'weaning', label: 'Weaning & Baby', icon: '🌾' }
  ]

  return (
    <section className="py-8 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-center gap-4">
          {nutritionFilters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`flex items-center px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeFilter === filter.id
                  ? 'bg-[#F59297] text-white shadow-lg'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-pink-100 dark:hover:bg-pink-900/30 hover:text-[#F59297] dark:hover:text-[#F59297]'
              }`}
            >
              <span className="mr-2 text-lg">{filter.icon}</span>
              {filter.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

export default NutritionFilters
