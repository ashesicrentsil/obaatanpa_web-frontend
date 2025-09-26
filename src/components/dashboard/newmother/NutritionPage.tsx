'use client'

import { useState, useEffect } from 'react'
import { Heart, Clock, Users, Bookmark, ChefHat, Droplets, ArrowRight, RefreshCw, Search } from 'lucide-react'
import axios from 'axios'

interface NutritionPageProps {
  babyAge?: string // e.g., "0-3", "3-6", "6-12", "1-2"
  motherName?: string
}

interface Meal {
  id: string
  name: string
  benefits: string
  image: string
  prepTime: string
  category: string
  ingredients: string[]
  isBreastfeedingFriendly: boolean
  nutritionTags: string[]
  servings?: string | null
  directions?: string[] | null
}

interface DailyMeal {
  breakfast: Meal
  lunch: Meal
  dinner: Meal
  snack?: Meal
}

interface MealPlan {
  title: string
  description: string
  meals: DailyMeal
}

interface Recipe {
  name: string
  description: string | null
  servings: string | null
  ingredients: string | null
  directions: string | null
  section: string
  nutrients: string[]
  meal_type: string
}

const NutritionPage = ({ motherName = "Mama" }: NutritionPageProps) => {
  const [savedMeals, setSavedMeals] = useState<string[]>([])
  const [featuredMeal, setFeaturedMeal] = useState<Meal | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [mealPlan, setMealPlan] = useState<MealPlan | null>(null)
  const [mealPlanLoading, setMealPlanLoading] = useState(false)
  const [mealPlanError, setMealPlanError] = useState<string | null>(null)
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [recipesLoading, setRecipesLoading] = useState(false)
  const [recipesError, setRecipesError] = useState<string | null>(null)
  const [showFullRecipe, setShowFullRecipe] = useState(false)
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [showRecipes, setShowRecipes] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchType, setSearchType] = useState<'name' | 'ingredient' | 'section'>('name')
  const [searchResults, setSearchResults] = useState<Recipe[]>([])
  const [searchLoading, setSearchLoading] = useState(false)
  const [searchError, setSearchError] = useState<string | null>(null)
  const [searchPage, setSearchPage] = useState(1)
  const [searchTotalPages, setSearchTotalPages] = useState(1)

  const authToken = typeof window !== 'undefined' ? localStorage.getItem('authToken') || '' : ''

  const nutritionTips = [
    {
      id: '1',
      title: '5 Hydrating Foods to Support Breastfeeding',
      preview: 'Discover local foods that boost milk production and keep you hydrated...',
      image: '/images/dashboard/nutrition-tip-1.jpg',
      category: 'Breastfeeding',
      readTime: '3 min'
    },
    {
      id: '2',
      title: 'Why You Need Iron-Rich Meals Postpartum',
      preview: 'Learn about the importance of iron for new mothers and recovery...',
      image: '/images/dashboard/nutrition-tip-2.jpg',
      category: 'Recovery',
      readTime: '4 min'
    },
    {
      id: '3',
      title: 'Ghanaian Superfoods for New Mothers',
      preview: 'Traditional foods that provide essential nutrients for motherhood...',
      image: '/images/dashboard/nutrition-tip-3.jpg',
      category: 'Local Foods',
      readTime: '5 min'
    }
  ]

  const fetchFeaturedMeal = async () => {
    if (!authToken) {
      setError('Please log in to view the featured meal.')
      return
    }
    setLoading(true)
    setError(null)
    try {
      const response = await axios.get('https://obaatanpa-backend.onrender.com/recipes/random', 
        { headers: { Authorization: `Bearer ${authToken}` } }
      )
      const recipe = response.data.recipe
      if (recipe) {
        setFeaturedMeal({
          id: recipe.name,
          name: recipe.name,
          benefits: recipe.nutrients.join(', '),
          image: '/images/dashboard/nutrition-hero.jpg',
          prepTime: '30-45 mins',
          category: recipe.section,
          ingredients: recipe.ingredients || [],
          isBreastfeedingFriendly: true,
          nutritionTags: recipe.nutrients || [],
          servings: recipe.servings,
          directions: recipe.directions || []
        })
      } else {
        setError('No recipe found.')
      }
    } catch (err: any) {
      console.error('Error fetching featured meal:', err.response?.data || err)
      if (err.response?.status === 401) {
        setError('Authentication failed. Please log in again.')
      } else {
        setError('Failed to fetch recipe. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  const fetchDailyMealPlan = async () => {
    if (!authToken) {
      setMealPlanError('Please log in to view the meal plan.')
      return
    }
    setMealPlanLoading(true)
    setMealPlanError(null)
    try {
      const response = await axios.get('https://obaatanpa-backend.onrender.com/recipes/meal/plan/daily', {
        headers: { Authorization: `Bearer ${authToken}` }
      })
      const { breakfast, lunch, dinner, snack } = response.data
      const dailyMeals: DailyMeal = {
        breakfast: {
          id: breakfast.name,
          name: breakfast.name,
          benefits: breakfast.nutrients.join(', '),
          image: '/images/dashboard/meal-plan-breakfast.jpg',
          prepTime: '15-20 mins',
          category: breakfast.section,
          ingredients: breakfast.ingredients || [],
          isBreastfeedingFriendly: true,
          nutritionTags: breakfast.nutrients || [],
          servings: breakfast.servings,
          directions: breakfast.directions || []
        },
        lunch: {
          id: lunch.name,
          name: lunch.name,
          benefits: lunch.nutrients.join(', '),
          image: '/images/dashboard/meal-plan-lunch.jpg',
          prepTime: '30-40 mins',
          category: lunch.section,
          ingredients: lunch.ingredients || [],
          isBreastfeedingFriendly: true,
          nutritionTags: lunch.nutrients || [],
          servings: lunch.servings,
          directions: lunch.directions || []
        },
        dinner: {
          id: dinner.name,
          name: dinner.name,
          benefits: dinner.nutrients,
          image: '/images/dashboard/meal-plan-dinner.jpg',
          prepTime: '40-50 mins',
          category: dinner.section,
          ingredients: dinner.ingredients || [],
          isBreastfeedingFriendly: true,
          nutritionTags: dinner.nutrients || [],
          servings: dinner.servings,
          directions: dinner.directions || []
        },
        snack: {
          id: snack.name,
          name: snack.name,
          benefits: snack.nutrients.join(', '),
          image: '/images/dashboard/meal-plan-snack.jpg',
          prepTime: '10-15 mins',
          category: snack.section,
          ingredients: snack.ingredients || [],
          isBreastfeedingFriendly: true,
          nutritionTags: snack.nutrients || [],
          servings: snack.servings,
          directions: snack.directions || []
        }
      }
      setMealPlan({
        title: "Today's Balanced Meal Plan",
        description: 'Delicious and nutritious meals for your day',
        meals: dailyMeals
      })
    } catch (err: any) {
      console.error('Error fetching meal plan:', err.response?.data || err)
      if (err.response?.status === 401) {
        setMealPlanError('Authentication failed. Please log in again.')
      } else {
        setMealPlanError('Failed to fetch meal plan. Please try again.')
      }
    } finally {
      setMealPlanLoading(false)
    }
  }

  const fetchAllRecipes = async (page: number = 1) => {
    if (!authToken) {
      setRecipesError('Please log in to browse recipes.')
      return
    }
    setRecipesLoading(true)
    setRecipesError(null)
    try {
      const response = await axios.get(`https://obaatanpa-backend.onrender.com/recipes/all?page=${page}&per_page=5`, {
        headers: { Authorization: `Bearer ${authToken}` }
      })
      const { recipes, total } = response.data
      setRecipes(recipes)
      setTotalPages(Math.ceil(total / 5))
      setCurrentPage(page)
      setShowRecipes(true)
      console.log('Fetched recipes:', recipes)
    } catch (err: any) {
      console.error('Error fetching all recipes:', err.response?.data || err)
      if (err.response?.status === 401) {
        setRecipesError('Authentication failed. Please log in again.')
      } else {
        setRecipesError('Failed to fetch recipes. Please try again.')
      }
    } finally {
      setRecipesLoading(false)
    }
  }

  const fetchSearchResults = async (page: number = 1) => {
    if (!authToken) {
      setSearchError('Please log in to search recipes.')
      return
    }
    if (!searchQuery) {
      setSearchError('Please enter a search query.')
      return
    }
    setSearchLoading(true)
    setSearchError(null)
    try {
      let url = ''
      if (searchType === 'name') {
        url = `https://obaatanpa-backend.onrender.com/recipes/search/name/${encodeURIComponent(searchQuery)}?page=${page}&per_page=5`
      } else if (searchType === 'ingredient') {
        const ingredients = searchQuery.split(',').map(item => `items=${encodeURIComponent(item.trim())}`).join('&')
        url = `https://obaatanpa-backend.onrender.com/recipes/search/ingredient?${ingredients}&page=${page}&per_page=5`
      } else if (searchType === 'section') {
        url = `https://obaatanpa-backend.onrender.com/recipes/search/section/${encodeURIComponent(searchQuery)}?page=${page}&per_page=3`
      }
      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${authToken}` }
      })
      const { recipes, total } = response.data
      setSearchResults(recipes)
      setSearchTotalPages(Math.ceil(total / (searchType === 'section' ? 3 : 5)))
      setSearchPage(page)
    } catch (err: any) {
      console.error('Error fetching search results:', err.response?.data || err)
      if (err.response?.status === 401) {
        setSearchError('Authentication failed. Please log in again.')
      } else {
        setSearchError('Failed to fetch search results. Please try again.')
      }
    } finally {
      setSearchLoading(false)
    }
  }

  useEffect(() => {
    fetchFeaturedMeal()
    fetchDailyMealPlan()
  }, [])

  const toggleSavedMeal = (mealId: string) => {
    setSavedMeals(prev => 
      prev.includes(mealId) 
        ? prev.filter(id => id !== mealId)
        : [...prev, mealId]
    )
  }

  const openMealDetails = (meal: Meal) => {
    setSelectedMeal(meal)
  }

  const closeMealDetails = () => {
    setSelectedMeal(null)
  }

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      fetchAllRecipes(currentPage - 1)
    }
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      fetchAllRecipes(currentPage + 1)
    }
  }

  const handleSearchPreviousPage = () => {
    if (searchPage > 1) {
      fetchSearchResults(searchPage - 1)
    }
  }

  const handleSearchNextPage = () => {
    if (searchPage < searchTotalPages) {
      fetchSearchResults(searchPage + 1)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            🍽️ Your Daily Nutrition Guide
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Let's help you stay strong, energized, and nourished for your new journey of motherhood, {motherName}.
          </p>
        </div>

        {/* Hero Image */}
        <div className="relative h-64 md:h-80 rounded-3xl overflow-hidden mb-8 bg-gradient-to-r from-[#F59297] to-[#7da8e6]">
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
          <div className="absolute bottom-6 left-6 text-white">
            <h2 className="text-2xl font-bold mb-2">Nourish Your Body, Nurture Your Baby</h2>
            <p className="text-white/90">Traditional Ghanaian nutrition for modern mothers</p>
          </div>
          <div className="absolute top-6 right-6 text-white/80">
            <div className="text-6xl">🍽️</div>
          </div>
        </div>

        {/* Search Section */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-6 md:p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Search Recipes</h2>
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
            <div className="flex-1 w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, ingredients (comma-separated), or section"
                className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#F59297]"
              />
            </div>
            <select
              value={searchType}
              onChange={(e) => setSearchType(e.target.value as 'name' | 'ingredient' | 'section')}
              className="px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#F59297]"
            >
              <option value="name">Search by Name</option>
              <option value="ingredient">Search by Ingredient</option>
              <option value="section">Search by Section</option>
            </select>
            <button
              onClick={() => fetchSearchResults(1)}
              disabled={searchLoading || !searchQuery}
              className={`px-6 py-2 rounded-xl font-semibold transition-colors duration-200 flex items-center space-x-2 ${
                searchLoading || !searchQuery
                  ? 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed'
                  : 'bg-gradient-to-r from-[#F59297] to-[#7da8e6] text-white hover:from-[#e67d82] hover:to-[#6b9ce6]'
              }`}
            >
              <Search className="w-5 h-5" />
              <span>Search</span>
            </button>
          </div>
          {searchLoading ? (
            <div className="text-center">
              <RefreshCw className="w-8 h-8 animate-spin text-[#F59297] mx-auto" />
              <p className="text-gray-600 dark:text-gray-400 mt-2">Searching recipes...</p>
            </div>
          ) : searchError ? (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3 text-center">
              <p className="text-red-800 dark:text-red-200">{searchError}</p>
            </div>
          ) : searchResults.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {searchResults.map((recipe) => (
                  <div
                    key={recipe.name}
                    className="bg-gray-50 dark:bg-gray-700 rounded-2xl shadow-md p-4 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
                        <span>{recipe.name}</span>
                      </h4>
                      <button
                        onClick={() => toggleSavedMeal(recipe.name)}
                        className={`p-2 rounded-full transition-colors duration-200 ${
                          savedMeals.includes(recipe.name)
                            ? 'bg-[#F59297] text-white'
                            : 'bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-400 hover:bg-[#F59297] hover:text-white'
                        }`}
                      >
                        <Bookmark className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="relative h-32 rounded-xl overflow-hidden mb-3 bg-gradient-to-br from-orange-400/80 to-red-500/80 flex items-center justify-center">
                      <div className="text-4xl">
                        {recipe.section.toLowerCase().includes('snack') ? '🍎' : '🍲'}
                      </div>
                      <div className="absolute top-2 left-2">
                        <span className="bg-[#F59297] text-white px-2 py-1 rounded-full text-xs font-medium">
                          {recipe.section}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() =>
                        openMealDetails({
                          id: recipe.name,
                          name: recipe.name,
                          benefits: recipe.nutrients ? recipe.nutrients.join(', ') : '',
                          image: '/images/dashboard/recipe-placeholder.jpg',
                          prepTime: '20-30 mins',
                          category: recipe.section,
                          ingredients: recipe.ingredients ? recipe.ingredients.split('\n') : [],
                          isBreastfeedingFriendly: true,
                          nutritionTags: recipe.nutrients || [],
                          servings: recipe.servings,
                          directions: recipe.directions ? recipe.directions.split('\n') : []
                        })
                      }
                      className="w-full text-left text-gray-900 dark:text-white font-medium hover:text-[#F59297] transition-colors duration-200"
                    >
                      {recipe.name}
                    </button>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 line-clamp-2">
                      {recipe.nutrients ? recipe.nutrients.join(', ') : ''}
                    </p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400 mt-2">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>20-30 mins</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4" />
                        <span>{recipe.servings || 'Serves 2-3'}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-6">
                <button
                  onClick={handleSearchPreviousPage}
                  disabled={searchPage === 1}
                  className={`px-4 py-2 rounded-xl font-semibold transition-colors duration-200 ${
                    searchPage === 1
                      ? 'bg-gray-300 dark:bg-gray-600 text-gray-500 cursor-not-allowed'
                      : 'bg-gradient-to-r from-[#F59297] to-[#7da8e6] text-white hover:from-[#e67d82] hover:to-[#6b9ce6]'
                  }`}
                >
                  Previous
                </button>
                <span className="text-gray-600 dark:text-gray-300">
                  Page {searchPage} of {searchTotalPages}
                </span>
                <button
                  onClick={handleSearchNextPage}
                  disabled={searchPage === searchTotalPages}
                  className={`px-4 py-2 rounded-xl font-semibold transition-colors duration-200 ${
                    searchPage === searchTotalPages
                      ? 'bg-gray-300 dark:bg-gray-600 text-gray-500 cursor-not-allowed'
                      : 'bg-gradient-to-r from-[#F59297] to-[#7da8e6] text-white hover:from-[#e67d82] hover:to-[#6b9ce6]'
                  }`}
                >
                  Next
                </button>
              </div>
            </>
          ) : (
            <p className="text-center text-gray-600 dark:text-gray-400">
              No search results found. Try a different query.
            </p>
          )}
        </div>

        {/* Meal of the Day */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-6 md:p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Today's Featured Meal</h2>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => featuredMeal && toggleSavedMeal(featuredMeal.id)}
                disabled={!featuredMeal}
                className={`p-2 rounded-full transition-colors duration-200 ${
                  featuredMeal && savedMeals.includes(featuredMeal.id)
                    ? 'bg-[#F59297] text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-[#F59297] hover:text-white'
                } ${!featuredMeal ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <Bookmark className="w-5 h-5" />
              </button>
              <button
                onClick={fetchFeaturedMeal}
                disabled={loading}
                className={`p-2 rounded-full transition-colors duration-200 ${
                  loading
                    ? 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-[#F59297] hover:text-white'
                }`}
              >
                <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
              </button>
            </div>
          </div>

          {loading ? (
            <div className="text-center">
              <RefreshCw className="w-8 h-8 animate-spin text-[#F59297] mx-auto" />
              <p className="text-gray-600 dark:text-gray-400 mt-2">Loading recipe...</p>
            </div>
          ) : error ? (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3 text-center">
              <p className="text-red-800 dark:text-red-200">{error}</p>
            </div>
          ) : featuredMeal ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="relative h-64 rounded-2xl overflow-hidden bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center">
                <div className="text-8xl">🍲</div>
                <div className="absolute top-4 left-4">
                  <span className="bg-[#F59297] text-white px-3 py-1 rounded-full text-sm font-medium">
                    {featuredMeal.category}
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {featuredMeal.name}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-300">
                  {featuredMeal.benefits}
                </p>

                <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{featuredMeal.prepTime}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span>{featuredMeal.servings || 'Serves 2-3'}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {featuredMeal.nutritionTags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 px-3 py-1 rounded-full text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {showFullRecipe && (
                  <div className="space-y-4 mt-4">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Ingredients</h4>
                    <ul className="list-disc pl-5 text-gray-600 dark:text-gray-300">
                      {featuredMeal.ingredients.map((ingredient, index) => (
                        <li key={index}>{ingredient}</li>
                      ))}
                    </ul>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Directions</h4>
                    <ol className="list-decimal pl-5 text-gray-600 dark:text-gray-300">
                      {featuredMeal.directions.map((step, index) => (
                        <li key={index}>{step}</li>
                      ))}
                    </ol>
                  </div>
                )}

                <button 
                  onClick={() => setShowFullRecipe(!showFullRecipe)}
                  className="w-full bg-gradient-to-r from-[#F59297] to-[#7da8e6] text-white py-3 rounded-xl font-semibold hover:from-[#e67d82] hover:to-[#6b9ce6] transition-all duration-300"
                >
                  {showFullRecipe ? 'Hide Full Recipe' : 'View Full Recipe'}
                </button>
              </div>
            </div>
          ) : (
            <p className="text-center text-gray-600 dark:text-gray-400">
              No recipe available. Try refreshing or adjusting preferences.
            </p>
          )}
        </div>

        {/* Meal Plan */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-6 md:p-8 mb-8">
          <div className="flex flex-col sm:flex-row items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-0">Today's Meal Plan</h2>
            <button
              onClick={fetchDailyMealPlan}
              disabled={mealPlanLoading}
              className={`p-2 rounded-full transition-colors duration-200 ${
                mealPlanLoading
                  ? 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-[#F59297] hover:text-white'
              }`}
            >
              <RefreshCw className={`w-5 h-5 ${mealPlanLoading ? 'animate-spin' : ''}`} />
            </button>
          </div>

          {mealPlanLoading ? (
            <div className="text-center">
              <RefreshCw className="w-8 h-8 animate-spin text-[#F59297] mx-auto" />
              <p className="text-gray-600 dark:text-gray-400 mt-2">Loading meal plan...</p>
            </div>
          ) : mealPlanError ? (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3 text-center">
              <p className="text-red-800 dark:text-red-200">{mealPlanError}</p>
            </div>
          ) : mealPlan ? (
            <>
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {mealPlan.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {mealPlan.description}
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {['breakfast', 'lunch', 'dinner', 'snack'].map((mealType) => (
                  <div
                    key={mealType}
                    className="bg-gray-50 dark:bg-gray-700 rounded-2xl shadow-md p-4 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
                        <span>
                          {mealType === 'breakfast' && '🌅 '}
                          {mealType === 'lunch' && '🌞 '}
                          {mealType === 'dinner' && '🌙 '}
                          {mealType === 'snack' && '🥕 '}
                          {mealType.charAt(0).toUpperCase() + mealType.slice(1)}
                        </span>
                      </h4>
                      {mealPlan.meals[mealType] && (
                        <button
                          onClick={() => toggleSavedMeal(mealPlan.meals[mealType].id)}
                          className={`p-2 rounded-full transition-colors duration-200 ${
                            savedMeals.includes(mealPlan.meals[mealType].id)
                              ? 'bg-[#F59297] text-white'
                              : 'bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-400 hover:bg-[#F59297] hover:text-white'
                          }`}
                        >
                          <Bookmark className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                    {mealPlan.meals[mealType] ? (
                      <>
                        <div className="relative h-32 rounded-xl overflow-hidden mb-3 bg-gradient-to-br from-orange-300 to-red-400 flex items-center justify-center">
                          <div className="text-4xl">
                            {mealType === 'breakfast' && '🍳'}
                            {mealType === 'lunch' && '🥗'}
                            {mealType === 'dinner' && '🍲'}
                            {mealType === 'snack' && '🍎'}
                          </div>
                          <div className="absolute top-2 left-2">
                            <span className="bg-[#F59297] text-white px-2 py-1 rounded-full text-xs font-medium">
                              {mealPlan.meals[mealType].category}
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={() => openMealDetails(mealPlan.meals[mealType])}
                          className="w-full text-left text-gray-900 dark:text-white font-medium hover:text-[#F59297] transition-colors duration-200"
                        >
                          {mealPlan.meals[mealType].name}
                        </button>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 line-clamp-2">
                          {mealPlan.meals[mealType].benefits}
                        </p>
                        <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400 mt-2">
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{mealPlan.meals[mealType].prepTime}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Users className="w-4 h-4" />
                            <span>{mealPlan.meals[mealType].servings || 'Serves 2-3'}</span>
                          </div>
                        </div>
                      </>
                    ) : (
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        {mealType === 'snack' ? 'No snack planned for today' : 'No meal available'}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </>
          ) : (
            <p className="text-center text-gray-600 dark:text-gray-400">
              No meal plan available. Try refreshing.
            </p>
          )}
        </div>

        {/* All Recipes Section */}
        {showRecipes && (
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-6 md:p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">All Recipes</h2>
            {recipesLoading ? (
              <div className="text-center">
                <RefreshCw className="w-8 h-8 animate-spin text-[#F59297] mx-auto" />
                <p className="text-gray-600 dark:text-gray-400 mt-2">Loading recipes...</p>
              </div>
            ) : recipesError ? (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3 text-center">
                <p className="text-red-800 dark:text-red-200">{recipesError}</p>
              </div>
            ) : recipes.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {recipes.map((recipe) => (
                    <div
                      key={recipe.name}
                      className="bg-gray-50 dark:bg-gray-700 rounded-2xl shadow-md p-4 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
                          <span>{recipe.name}</span>
                        </h4>
                        <button
                          onClick={() => toggleSavedMeal(recipe.name)}
                          className={`p-2 rounded-full transition-colors duration-200 ${
                            savedMeals.includes(recipe.name)
                              ? 'bg-[#F59297] text-white'
                              : 'bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-400 hover:bg-[#F59297] hover:text-white'
                          }`}
                        >
                          <Bookmark className="w-5 h-5" />
                        </button>
                      </div>
                      <div className="relative h-32 rounded-xl overflow-hidden mb-3 bg-gradient-to-br from-orange-300 to-red-400 flex items-center justify-center">
                        <div className="text-4xl">
                          {recipe.section.toLowerCase().includes('snack') ? '🍎' : '🍲'}
                        </div>
                        <div className="absolute top-2 left-2">
                          <span className="bg-[#F59297] text-white px-2 py-1 rounded-full text-xs font-medium">
                            {recipe.section}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() =>
                          openMealDetails({
                            id: recipe.name,
                            name: recipe.name,
                            benefits: recipe.nutrients.join(', '),
                            image: '/images/dashboard/recipe-placeholder.jpg',
                            prepTime: '20-30 mins',
                            category: recipe.section,
                            ingredients: recipe.ingredients ? recipe.ingredients.split('\n') : [],
                            isBreastfeedingFriendly: true,
                            nutritionTags: recipe.nutrients,
                            servings: recipe.servings,
                            directions: recipe.directions ? recipe.directions.split('\n') : [],
                          })
                        }
                        className="w-full text-left text-gray-900 dark:text-white font-medium hover:text-[#F59297] transition-colors duration-200"
                      >
                        {recipe.name}
                      </button>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 line-clamp-2">
                        {recipe.nutrients.join(', ')}
                      </p>
                      <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400 mt-2">
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>20-30 mins</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="w-4 h-4" />
                          <span>{recipe.servings || 'Serves 2-3'}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between mt-6">
                  <button
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 rounded-xl font-semibold transition-colors duration-200 ${
                      currentPage === 1
                        ? 'bg-gray-300 dark:bg-gray-600 text-gray-500 cursor-not-allowed'
                        : 'bg-gradient-to-r from-[#F59297] to-[#7da8e6] text-white hover:from-[#e67d82] hover:to-[#6b9ce6]'
                    }`}
                  >
                    Previous
                  </button>
                  <span className="text-gray-600 dark:text-gray-300">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 rounded-xl font-semibold transition-colors duration-200 ${
                      currentPage === totalPages
                        ? 'bg-gray-300 dark:bg-gray-600 text-gray-500 cursor-not-allowed'
                        : 'bg-gradient-to-r from-[#F59297] to-[#7da8e6] text-white hover:from-[#e67d82] hover:to-[#6b9ce6]'
                    }`}
                  >
                    Next
                  </button>
                </div>
              </>
            ) : (
              <p className="text-center text-gray-600 dark:text-gray-400">
                No recipes available. Try refreshing.
              </p>
            )}
          </div>
        )}

        {/* Nutrition Tips & Articles */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-6 md:p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Nutrition Tips & Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {nutritionTips.map((tip, index) => (
              <div key={tip.id} className="group cursor-pointer">
                <div className={`relative h-48 rounded-2xl overflow-hidden mb-4 flex items-center justify-center ${
                  index === 0 ? 'bg-gradient-to-br from-blue-400 to-blue-600' :
                  index === 1 ? 'bg-gradient-to-br from-green-400 to-green-600' :
                  'bg-gradient-to-br from-purple-400 to-purple-600'
                }`}>
                  <div className="text-6xl">
                    {index === 0 ? '💧' : index === 1 ? '🥬' : '🌟'}
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 text-gray-800 px-3 py-1 rounded-full text-xs font-medium">
                      {tip.category}
                    </span>
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-[#F59297] transition-colors duration-200">
                  {tip.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                  {tip.preview}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500 dark:text-gray-400">{tip.readTime} read</span>
                  <button className="text-[#F59297] hover:text-[#e67d82] font-medium text-sm flex items-center space-x-1">
                    <span>Read More</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Daily Reminder Banner */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-3xl p-6 mb-8 text-white">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <Droplets className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-1">💧 Daily Reminder</h3>
              <p className="text-blue-100">Don't forget to drink water regularly today! Aim for 8-10 glasses.</p>
            </div>
          </div>
        </div>

        {/* Explore Recipes Button */}
        <div className="text-center">
          <button 
            onClick={() => fetchAllRecipes(1)}
            disabled={recipesLoading}
            className={`bg-gradient-to-r from-[#F59297] to-[#7da8e6] text-white px-8 py-4 rounded-2xl font-bold text-lg hover:from-[#e67d82] hover:to-[#6b9ce6] transition-all duration-300 shadow-lg hover:shadow-xl flex items-center space-x-3 mx-auto ${
              recipesLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <ChefHat className="w-6 h-6" />
            <span>👩🏽‍🍳 Browse All Recipes</span>
            {recipesLoading && <RefreshCw className="w-5 h-5 animate-spin" />}
          </button>
          {recipesError && (
            <div className="mt-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3 text-center">
              <p className="text-red-800 dark:text-red-200">{recipesError}</p>
            </div>
          )}
        </div>

        {/* Meal Details Popup */}
        {selectedMeal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-lg w-full max-h-[80vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{selectedMeal.name}</h3>
                <button
                  onClick={closeMealDetails}
                  className="text-gray-600 dark:text-gray-300 hover:text-[#F59297] transition-colors duration-200"
                >
                  ✕
                </button>
              </div>
              <div className="relative h-32 rounded-xl overflow-hidden mb-4 bg-gradient-to-br from-orange-300 to-red-400 flex items-center justify-center">
                <div className="text-4xl">
                  {selectedMeal.category.toLowerCase().includes('breakfast') && '🍳'}
                  {selectedMeal.category.toLowerCase().includes('lunch') && '🥗'}
                  {selectedMeal.category.toLowerCase().includes('dinner') && '🍲'}
                  {selectedMeal.category.toLowerCase().includes('snack') && '🍎'}
                </div>
                <div className="absolute top-2 left-2">
                  <span className="bg-[#F59297] text-white px-2 py-1 rounded-full text-xs font-medium">
                    {selectedMeal.category}
                  </span>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">{selectedMeal.benefits}</p>
              <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400 mb-4">
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{selectedMeal.prepTime}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="w-4 h-4" />
                  <span>{selectedMeal.servings || 'Serves 2-3'}</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {selectedMeal.nutritionTags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 px-2 py-1 rounded-full text-xs font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Ingredients</h4>
              <ul className="list-disc pl-5 text-gray-600 dark:text-gray-300 mb-4">
                {selectedMeal.ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Directions</h4>
              <ol className="list-decimal pl-5 text-gray-600 dark:text-gray-300 mb-4">
                {selectedMeal.directions.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ol>
              <button
                onClick={closeMealDetails}
                className="w-full bg-gradient-to-r from-[#F59297] to-[#7da8e6] text-white py-3 rounded-xl font-semibold hover:from-[#e67d82] hover:to-[#6b9ce6] transition-all duration-300"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.3s ease-in-out;
        }
      `}</style>
    </div>
  )
}

export default NutritionPage