import { Apple } from 'lucide-react'

interface NutritionFocusProps {
  trimesterData: {
    nutritionTip: string
  }
}

const NutritionFocus = ({ trimesterData }: NutritionFocusProps) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
      <div className="flex items-center mb-4">
        <Apple className="w-6 h-6 text-green-500 mr-2" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Nutrition This Week</h3>
      </div>
      <p className="text-gray-600 dark:text-gray-300 mb-4">{trimesterData.nutritionTip}</p>
      <button className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors duration-200">
        View Meal Plan
      </button>
    </div>
  )
}

export default NutritionFocus
