'use client'

interface CategoryFiltersProps {
  activeCategory: string
  setActiveCategory: (category: string) => void
}

const CategoryFilters = ({ activeCategory, setActiveCategory }: CategoryFiltersProps) => {
  const categories = [
    { id: 'all', label: 'All Articles', icon: '📚', count: 24 },
    { id: 'pregnancy', label: 'Pregnancy', icon: '👶', count: 8 },
    { id: 'mental-health', label: 'Mental Health', icon: '🧠', count: 5 },
    { id: 'nutrition', label: 'Nutrition', icon: '🥗', count: 6 },
    { id: 'baby-care', label: 'Baby Care', icon: '🍼', count: 7 },
    { id: 'real-stories', label: 'Real Stories', icon: '❤️', count: 9 },
    { id: 'medical-advice', label: 'Medical Advice', icon: '🩺', count: 4 },
    { id: 'qa', label: 'Q&A', icon: '💬', count: 3 }
  ]

  return (
    <section className="py-8 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`group flex items-center px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeCategory === category.id
                  ? 'bg-[#F59297] text-white shadow-lg scale-105'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-pink-50 dark:hover:bg-pink-900/20 hover:text-[#F59297] dark:hover:text-[#F59297] border border-gray-200 dark:border-gray-600 hover:border-[#F59297] dark:hover:border-[#F59297]'
              }`}
            >
              <span className="mr-2 text-lg group-hover:scale-110 transition-transform duration-300">
                {category.icon}
              </span>
              <span className="font-semibold">{category.label}</span>
              <span className={`ml-2 px-2 py-1 text-xs rounded-full ${
                activeCategory === category.id
                  ? 'bg-white/20 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 group-hover:bg-pink-100 dark:group-hover:bg-pink-900/30 group-hover:text-[#F59297]'
              }`}>
                {category.count}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CategoryFilters
