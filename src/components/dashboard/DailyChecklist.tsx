import { useState } from 'react'
import { CheckCircle } from 'lucide-react'

const DailyChecklist = () => {
  const [checklist, setChecklist] = useState({
    vitamins: false,
    water: false,
    exercise: false,
    sleep: false
  })

  const handleChecklistToggle = (item: keyof typeof checklist) => {
    setChecklist(prev => ({ ...prev, [item]: !prev[item] }))
  }

  const checklistItems = [
    { key: 'vitamins' as keyof typeof checklist, label: 'Take prenatal vitamins' },
    { key: 'water' as keyof typeof checklist, label: 'Drink 8 glasses of water' },
    { key: 'exercise' as keyof typeof checklist, label: 'Short walk or breathing exercise' },
    { key: 'sleep' as keyof typeof checklist, label: 'Sleep log' }
  ]

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Daily Checklist</h3>
      
      <div className="space-y-3">
        {checklistItems.map((item) => (
          <label key={item.key} className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={checklist[item.key]}
              onChange={() => handleChecklistToggle(item.key)}
              className="sr-only"
            />
            <div className={`w-5 h-5 rounded border-2 mr-3 flex items-center justify-center transition-colors duration-200 ${
              checklist[item.key] 
                ? 'bg-[#F59297] border-[#F59297]' 
                : 'border-gray-300 dark:border-gray-600'
            }`}>
              {checklist[item.key] && <CheckCircle className="w-3 h-3 text-white" />}
            </div>
            <span className={`text-sm ${
              checklist[item.key] 
                ? 'text-gray-500 dark:text-gray-400 line-through' 
                : 'text-gray-900 dark:text-white'
            }`}>
              {item.label}
            </span>
          </label>
        ))}
      </div>
      
      <div className="mt-4 bg-gray-100 dark:bg-gray-700 rounded-lg p-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-300">Progress</span>
          <span className="font-semibold text-[#F59297]">
            {Object.values(checklist).filter(Boolean).length}/4
          </span>
        </div>
        <div className="mt-2 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
          <div 
            className="bg-[#F59297] h-2 rounded-full transition-all duration-300"
            style={{ 
              width: `${(Object.values(checklist).filter(Boolean).length / 4) * 100}%` 
            }}
          ></div>
        </div>
      </div>
    </div>
  )
}

export default DailyChecklist
