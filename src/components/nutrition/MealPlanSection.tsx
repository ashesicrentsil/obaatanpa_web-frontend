'use client'

import { Bookmark, RefreshCw, Clock, Utensils, Star } from 'lucide-react'

const MealPlanSection = () => {
  const mealPlans = [
    {
      day: 'Monday',
      dayShort: 'Mon',
      breakfast: { name: 'Oats + groundnut', time: '7:00 AM', calories: '320 cal' },
      lunch: { name: 'Kontomire stew + yam', time: '12:30 PM', calories: '450 cal' },
      dinner: { name: 'Rice + okro stew', time: '7:00 PM', calories: '380 cal' },
      benefit: 'High in folic acid',
      totalCalories: '1150 cal',
      color: 'from-pink-500 to-rose-500'
    },
    {
      day: 'Tuesday',
      dayShort: 'Tue',
      breakfast: { name: 'Boiled egg + toast', time: '7:00 AM', calories: '280 cal' },
      lunch: { name: 'Kenkey + fish + shito', time: '12:30 PM', calories: '520 cal' },
      dinner: { name: 'Rice water + peanut soup', time: '7:00 PM', calories: '420 cal' },
      benefit: 'Rich in protein',
      totalCalories: '1220 cal',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      day: 'Wednesday',
      dayShort: 'Wed',
      breakfast: { name: 'Koko + bread', time: '7:00 AM', calories: '300 cal' },
      lunch: { name: 'Waakye + egg + salad', time: '12:30 PM', calories: '480 cal' },
      dinner: { name: 'Yam + palava sauce', time: '7:00 PM', calories: '400 cal' },
      benefit: 'Iron-rich meal',
      totalCalories: '1180 cal',
      color: 'from-green-500 to-emerald-500'
    },
    {
      day: 'Thursday',
      dayShort: 'Thu',
      breakfast: { name: 'Milo + biscuits', time: '7:00 AM', calories: '290 cal' },
      lunch: { name: 'Banku + tilapia + pepper', time: '12:30 PM', calories: '510 cal' },
      dinner: { name: 'Plantain + kontomire stew', time: '7:00 PM', calories: '390 cal' },
      benefit: 'High in vitamins',
      totalCalories: '1190 cal',
      color: 'from-purple-500 to-violet-500'
    },
    {
      day: 'Friday',
      dayShort: 'Fri',
      breakfast: { name: 'Tea + bread + egg', time: '7:00 AM', calories: '310 cal' },
      lunch: { name: 'Jollof rice + chicken', time: '12:30 PM', calories: '550 cal' },
      dinner: { name: 'Fufu + light soup', time: '7:00 PM', calories: '430 cal' },
      benefit: 'Balanced nutrition',
      totalCalories: '1290 cal',
      color: 'from-orange-500 to-amber-500'
    },
    {
      day: 'Saturday',
      dayShort: 'Sat',
      breakfast: { name: 'Porridge + milk', time: '8:00 AM', calories: '330 cal' },
      lunch: { name: 'Fried rice + beef', time: '1:00 PM', calories: '580 cal' },
      dinner: { name: 'Yam + garden egg stew', time: '7:30 PM', calories: '360 cal' },
      benefit: 'Calcium boost',
      totalCalories: '1270 cal',
      color: 'from-teal-500 to-cyan-500'
    },
    {
      day: 'Sunday',
      dayShort: 'Sun',
      breakfast: { name: 'Pancakes + honey', time: '8:30 AM', calories: '350 cal' },
      lunch: { name: 'Waakye + fish + salad', time: '1:30 PM', calories: '490 cal' },
      dinner: { name: 'Rice + palm nut soup', time: '7:00 PM', calories: '440 cal' },
      benefit: 'Energy-rich',
      totalCalories: '1280 cal',
      color: 'from-indigo-500 to-blue-500'
    }
  ]

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Your Weekly Meal Plan
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Carefully crafted meal plans with local Ghanaian foods, tailored for your current stage
          </p>
        </div>

        {/* Weekly Overview Cards */}
        <div className="space-y-6 mb-8">
          {/* First Row: Monday to Thursday */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mealPlans.slice(0, 4).map((meal, index) => (
            <div
              key={index}
              className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              {/* Gradient Header */}
              <div className={`h-2 bg-gradient-to-r ${meal.color}`}></div>

              {/* Card Content */}
              <div className="p-6">
                {/* Day Header */}
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">{meal.day}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{meal.totalCalories}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-gray-400 hover:text-[#F59297] dark:hover:text-[#F59297] transition-colors duration-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                      <Bookmark className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                      <RefreshCw className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Meals */}
                <div className="space-y-4">
                  {/* Breakfast */}
                  <div className="border-l-4 border-orange-400 pl-4 py-2 bg-orange-50 dark:bg-orange-900/20 rounded-r-lg">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-semibold text-orange-600 dark:text-orange-400 uppercase tracking-wide">Breakfast</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">{meal.breakfast.calories}</span>
                    </div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{meal.breakfast.name}</p>
                    <div className="flex items-center mt-1">
                      <Clock className="w-3 h-3 text-gray-400 mr-1" />
                      <span className="text-xs text-gray-500 dark:text-gray-400">{meal.breakfast.time}</span>
                    </div>
                  </div>

                  {/* Lunch */}
                  <div className="border-l-4 border-green-400 pl-4 py-2 bg-green-50 dark:bg-green-900/20 rounded-r-lg">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-semibold text-green-600 dark:text-green-400 uppercase tracking-wide">Lunch</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">{meal.lunch.calories}</span>
                    </div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{meal.lunch.name}</p>
                    <div className="flex items-center mt-1">
                      <Clock className="w-3 h-3 text-gray-400 mr-1" />
                      <span className="text-xs text-gray-500 dark:text-gray-400">{meal.lunch.time}</span>
                    </div>
                  </div>

                  {/* Dinner */}
                  <div className="border-l-4 border-purple-400 pl-4 py-2 bg-purple-50 dark:bg-purple-900/20 rounded-r-lg">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-semibold text-purple-600 dark:text-purple-400 uppercase tracking-wide">Dinner</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">{meal.dinner.calories}</span>
                    </div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{meal.dinner.name}</p>
                    <div className="flex items-center mt-1">
                      <Clock className="w-3 h-3 text-gray-400 mr-1" />
                      <span className="text-xs text-gray-500 dark:text-gray-400">{meal.dinner.time}</span>
                    </div>
                  </div>
                </div>

                {/* Benefit Badge */}
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#F59297]/10 text-[#F59297] border border-[#F59297]/20">
                      <Star className="w-3 h-3 mr-1" />
                      {meal.benefit}
                    </span>
                    <button className="text-xs text-gray-500 dark:text-gray-400 hover:text-[#F59297] dark:hover:text-[#F59297] font-medium transition-colors duration-200">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
            ))}
          </div>

          {/* Second Row: Friday, Saturday, Sunday (Centered) */}
          <div className="flex justify-center">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl">
              {mealPlans.slice(4, 7).map((meal, index) => (
                <div
                  key={index + 4}
                  className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700"
                  data-aos="fade-up"
                  data-aos-delay={(index + 4) * 100}
                >
                  {/* Gradient Header */}
                  <div className={`h-2 bg-gradient-to-r ${meal.color}`}></div>

                  {/* Card Content */}
                  <div className="p-6">
                    {/* Day Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">{meal.day}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{meal.totalCalories}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className="p-2 text-gray-400 hover:text-[#F59297] dark:hover:text-[#F59297] transition-colors duration-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                          <Bookmark className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                          <RefreshCw className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Meals */}
                    <div className="space-y-4">
                      {/* Breakfast */}
                      <div className="border-l-4 border-orange-400 pl-4 py-2 bg-orange-50 dark:bg-orange-900/20 rounded-r-lg">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-semibold text-orange-600 dark:text-orange-400 uppercase tracking-wide">Breakfast</span>
                          <span className="text-xs text-gray-500 dark:text-gray-400">{meal.breakfast.calories}</span>
                        </div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{meal.breakfast.name}</p>
                        <div className="flex items-center mt-1">
                          <Clock className="w-3 h-3 text-gray-400 mr-1" />
                          <span className="text-xs text-gray-500 dark:text-gray-400">{meal.breakfast.time}</span>
                        </div>
                      </div>

                      {/* Lunch */}
                      <div className="border-l-4 border-green-400 pl-4 py-2 bg-green-50 dark:bg-green-900/20 rounded-r-lg">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-semibold text-green-600 dark:text-green-400 uppercase tracking-wide">Lunch</span>
                          <span className="text-xs text-gray-500 dark:text-gray-400">{meal.lunch.calories}</span>
                        </div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{meal.lunch.name}</p>
                        <div className="flex items-center mt-1">
                          <Clock className="w-3 h-3 text-gray-400 mr-1" />
                          <span className="text-xs text-gray-500 dark:text-gray-400">{meal.lunch.time}</span>
                        </div>
                      </div>

                      {/* Dinner */}
                      <div className="border-l-4 border-purple-400 pl-4 py-2 bg-purple-50 dark:bg-purple-900/20 rounded-r-lg">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-semibold text-purple-600 dark:text-purple-400 uppercase tracking-wide">Dinner</span>
                          <span className="text-xs text-gray-500 dark:text-gray-400">{meal.dinner.calories}</span>
                        </div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{meal.dinner.name}</p>
                        <div className="flex items-center mt-1">
                          <Clock className="w-3 h-3 text-gray-400 mr-1" />
                          <span className="text-xs text-gray-500 dark:text-gray-400">{meal.dinner.time}</span>
                        </div>
                      </div>
                    </div>

                    {/* Benefit Badge */}
                    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
                      <div className="flex items-center justify-between">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#F59297]/10 text-[#F59297] border border-[#F59297]/20">
                          <Star className="w-3 h-3 mr-1" />
                          {meal.benefit}
                        </span>
                        <button className="text-xs text-gray-500 dark:text-gray-400 hover:text-[#F59297] dark:hover:text-[#F59297] font-medium transition-colors duration-200">
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4" data-aos="fade-up" data-aos-delay="400">
          <button className="inline-flex items-center px-6 py-3 bg-[#F59297] text-white font-semibold rounded-xl hover:bg-[#e67d82] transition-all duration-300 shadow-lg hover:shadow-xl">
            <Utensils className="w-5 h-5 mr-2" />
            Download Full Plan
          </button>
          <button className="inline-flex items-center px-6 py-3 border-2 border-[#F59297] text-[#F59297] dark:text-[#F59297] font-semibold rounded-xl hover:bg-[#F59297] hover:text-white transition-all duration-300">
            <RefreshCw className="w-5 h-5 mr-2" />
            Customize Plan
          </button>
        </div>
      </div>
    </section>
  )
}

export default MealPlanSection
