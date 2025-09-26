
'use client'

import { useState, useEffect } from 'react'
import { 
  Apple, 
  Droplets, 
  Clock, 
  AlertTriangle, 
  Star, 
  ChevronRight, 
  Plus, 
  Minus,
  BookOpen,
  MessageCircle,
  Phone,
  HelpCircle,
  Share2,
  Bookmark,
  CheckCircle,
  AlertCircle,
  X,
  Loader2,
  Search,
  ChevronLeft,
  ChevronRight as ChevronRightIcon
} from 'lucide-react'
import axios from 'axios'
import { useRouter } from 'next/navigation'

interface PregnantNutritionPageProps {
  pregnancyWeek: number
  trimester: 'first' | 'second' | 'third'
  motherName: string
}

interface Meal {
  time: string
  meal: string
  description: string | null
}

interface Recipe {
  name: string
  description: string | null
  ingredients: string | string[] | null
  directions: string | string[] | null
  servings: string | null
  section: string
}

interface Params {
  page: number
  per_page: number
  items?: string
}

const PregnantNutritionPage = ({ pregnancyWeek, trimester, motherName }: PregnantNutritionPageProps) => {
  const router = useRouter()
  const [waterIntake, setWaterIntake] = useState(4)
  const [showPreferences, setShowPreferences] = useState(false)
  const [savedFavorites, setSavedFavorites] = useState<string[]>([])
  const [todaysMeals, setTodaysMeals] = useState<Meal[]>([])
  const [mealPlanData, setMealPlanData] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [showRecipeModal, setShowRecipeModal] = useState(false)
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null)
  const [loading, setLoading] = useState(false)
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [recipesError, setRecipesError] = useState<string | null>(null)
  const [recipesLoading, setRecipesLoading] = useState(false)
  const [authToken, setAuthToken] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [searchType, setSearchType] = useState<'name' | 'ingredient' | 'section'>('name')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [nextUrl, setNextUrl] = useState<string | null>(null)
  const [previousUrl, setPreviousUrl] = useState<string | null>(null)
  const [showAnalysisModal, setShowAnalysisModal] = useState(false)
  const [analysisResult, setAnalysisResult] = useState<any>(null)
  const [showWeightModal, setShowWeightModal] = useState(false)
  const [prePregnancyWeight, setPrePregnancyWeight] = useState('')
  const [height, setHeight] = useState('')
  const [gestationalAge, setGestationalAge] = useState('')
  const [weightResult, setWeightResult] = useState<any>(null)
  const [weightError, setWeightError] = useState<string | null>(null)
  const [weightLoading, setWeightLoading] = useState(false)
  const [showBabyProductsModal, setShowBabyProductsModal] = useState(false)
  const [categories, setCategories] = useState<any[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [categoryItems, setCategoryItems] = useState<any[]>([])
  const [productsError, setProductsError] = useState<string | null>(null)
  const [productsLoading, setProductsLoading] = useState(false)

  // Load token from localStorage
  useEffect(() => {
    const token = localStorage.getItem('authToken')
    if (token) {
      setAuthToken(token)
    }
  }, [])

  // Fetch today's meal plan from API
  const fetchMealPlan = async () => {
    if (!authToken) {
      setError('Please log in to fetch meal plan.')
      return
    }
    setLoading(true)
    try {
      const response = await axios.get('https://obaatanpa-backend.onrender.com/recipes/meal/plan/daily', {
        headers: { Authorization: `Bearer ${authToken}` }
      })
      const mealData = response.data
      setMealPlanData(mealData)
      const meals: Meal[] = [
        { 
          time: 'Breakfast', 
          meal: mealData.breakfast.name, 
          description: mealData.breakfast.description || 'Nutritious start to the day'
        },
        { 
          time: 'Snack', 
          meal: mealData.snack.name, 
          description: mealData.snack.description || 'Quick and healthy'
        },
        { 
          time: 'Lunch', 
          meal: mealData.lunch.name, 
          description: mealData.lunch.description || 'Balanced and filling'
        },
        { 
          time: 'Snack', 
          meal: mealData.snack.name, 
          description: mealData.snack.description || 'Quick and healthy'
        },
        { 
          time: 'Dinner', 
          meal: mealData.dinner.name, 
          description: mealData.dinner.description || 'Nutritious end to the day'
        }
      ]
      setTodaysMeals(meals)
      setError(null)
    } catch (err: any) {
      console.error('Error fetching meal plan:', err.response?.data || err)
      setError(err.response?.status === 401 
        ? 'Unauthorized access. Please log in again.'
        : err.response?.status === 404 
        ? 'Meal plan service not found. Please check if the server is running.'
        : `Failed to fetch meal plan: ${err.response?.data?.error || 'Please try again later.'}`)
    } finally {
      setLoading(false)
    }
  }

  // Fetch all recipes from API
  const fetchRecipes = async (page: number = 1) => {
    if (!authToken) {
      setRecipesError('Please log in to fetch recipes.')
      return
    }
    setRecipesLoading(true)
    try {
      const response = await axios.get('https://obaatanpa-backend.onrender.com/recipes/all', {
        params: { page, per_page: 5, trimester },
        headers: { Authorization: `Bearer ${authToken}` }
      })
      console.log('Recipes Response:', response.data)
      const { recipes: recipeData, page: current, total, next, previous } = response.data
      setRecipes(recipeData)
      setCurrentPage(current)
      setTotalPages(Math.ceil(total / 5))
      setNextUrl(next)
      setPreviousUrl(previous)
      setRecipesError(null)
    } catch (err: any) {
      console.error('Error fetching recipes:', err.response?.data || err)
      setRecipesError(err.response?.status === 401 
        ? 'Unauthorized access. Please log in again.'
        : err.response?.status === 404 
        ? 'Recipes service not found. Please check if the server is running.'
        : err.response?.status === 422 
        ? `Failed to fetch recipes: ${err.response?.data?.error || 'Invalid request parameters.'}`
        : `Failed to fetch recipes: ${err.response?.data?.error || 'Please try again later.'}`)
    } finally {
      setRecipesLoading(false)
    }
  }

  // Handle search for recipes by name, ingredient, or section
  const handleSearch = async () => {
    if (!authToken) {
      setRecipesError('Please log in to search for recipes.')
      return
    }
    if (!searchTerm.trim()) {
      setRecipesError('Please enter a search term.')
      return
    }
    setRecipesLoading(true)
    try {
      let url = ''
      let params: Params = { page: 1, per_page: 5 }
      if (searchType === 'name') {
        url = `https://obaatanpa-backend.onrender.com/recipes/search/name/${encodeURIComponent(searchTerm)}`
      } else if (searchType === 'ingredient') {
        url = 'https://obaatanpa-backend.onrender.com/recipes/search/ingredient'
        params = { ...params, items: searchTerm }
      } else if (searchType === 'section') {
        url = `https://obaatanpa-backend.onrender.com/recipes/search/section/${encodeURIComponent(searchTerm)}`
        params = { ...params, per_page: 3 }
      }
      const response = await axios.get(url, {
        params,
        headers: { Authorization: `Bearer ${authToken}` }
      })
      console.log('Search Response:', response.data)
      const { recipes: recipeData, page: current, total, next, previous } = response.data
      setRecipes(recipeData)
      setCurrentPage(current)
      setTotalPages(Math.ceil(total / (searchType === 'section' ? 3 : 5)))
      setNextUrl(next)
      setPreviousUrl(previous)
      setRecipesError(null)
    } catch (err: any) {
      console.error('Error searching recipes:', err.response?.data || err)
      setRecipesError(err.response?.status === 401 
        ? 'Unauthorized access. Please log in again.'
        : err.response?.status === 404 
        ? 'Search service not found. Please check if the server is running.'
        : err.response?.status === 422 
        ? `Failed to search recipes: ${err.response?.data?.error || 'Invalid search parameters.'}`
        : `Failed to search recipes: ${err.response?.data?.error || 'Please try again later.'}`)
      setRecipes([])
    } finally {
      setRecipesLoading(false)
    }
  }

  // Handle pagination
  const handlePreviousPage = async () => {
    if (!previousUrl || !authToken) return
    setRecipesLoading(true)
    try {
      const response = await axios.get(previousUrl, {
        headers: { Authorization: `Bearer ${authToken}` }
      })
      console.log('Previous Page Response:', response.data)
      const { recipes: recipeData, page: current, total, next, previous } = response.data
      setRecipes(recipeData)
      setCurrentPage(current)
      setTotalPages(Math.ceil(total / (searchType === 'section' ? 3 : 5)))
      setNextUrl(next)
      setPreviousUrl(previous)
      setRecipesError(null)
    } catch (err: any) {
      console.error('Error fetching previous page:', err.response?.data || err)
      setRecipesError(`Failed to fetch previous page: ${err.response?.data?.error || 'Please try again later.'}`)
    } finally {
      setRecipesLoading(false)
    }
  }

  const handleNextPage = async () => {
    if (!nextUrl || !authToken) return
    setRecipesLoading(true)
    try {
      const response = await axios.get(nextUrl, {
        headers: { Authorization: `Bearer ${authToken}` }
      })
      console.log('Next Page Response:', response.data)
      const { recipes: recipeData, page: current, total, next, previous } = response.data
      setRecipes(recipeData)
      setCurrentPage(current)
      setTotalPages(Math.ceil(total / (searchType === 'section' ? 3 : 5)))
      setNextUrl(next)
      setPreviousUrl(previous)
      setRecipesError(null)
    } catch (err: any) {
      console.error('Error fetching next page:', err.response?.data || err)
      setRecipesError(`Failed to fetch next page: ${err.response?.data?.error || 'Please try again later.'}`)
    } finally {
      setRecipesLoading(false)
    }
  }

  // Fetch categories for Baby Products Guide
  const fetchCategories = async () => {
    if (!authToken) {
      setProductsError('Please log in to fetch baby products.')
      return
    }
    setProductsLoading(true)
    try {
      const response = await axios.get('https://obaatanpa-backend.onrender.com/baby_products/categories', {
        headers: { Authorization: `Bearer ${authToken}` }
      })
      setCategories(response.data.categories)
      setProductsError(null)
    } catch (err: any) {
      console.error('Error fetching categories:', err.response?.data || err)
      setProductsError(err.response?.status === 401 
        ? 'Unauthorized access. Please log in again.'
        : `Failed to fetch categories: ${err.response?.data?.error || 'Please try again later.'}`)
    } finally {
      setProductsLoading(false)
    }
  }

  // Fetch items for selected category
  const fetchCategoryItems = async (categoryId: string) => {
    if (!authToken) {
      setProductsError('Please log in to fetch category items.')
      return
    }
    setProductsLoading(true)
    try {
      const response = await axios.get(`https://obaatanpa-backend.onrender.com/baby_products/items/${categoryId}`, {
        headers: { Authorization: `Bearer ${authToken}` }
      })
      setCategoryItems(response.data.items)
      setProductsError(null)
    } catch (err: any) {
      console.error('Error fetching category items:', err.response?.data || err)
      setProductsError(err.response?.status === 401 
        ? 'Unauthorized access. Please log in again.'
        : `Failed to fetch category items: ${err.response?.data?.error || 'Please try again later.'}`)
    } finally {
      setProductsLoading(false)
    }
  }

  // Handle weight recommendation
  const handleWeightRecommendation = async () => {
    if (!authToken) {
      setWeightError('Please log in to calculate weight recommendation.')
      return
    }
    if (!prePregnancyWeight || !height || !gestationalAge) {
      setWeightError('Please fill in all fields.')
      return
    }
    setWeightLoading(true)
    try {
      const response = await axios.post(
        'https://obaatanpa-backend.onrender.com/weight/recommendation',
        {
          prePregnancyWeight: parseFloat(prePregnancyWeight),
          height: parseFloat(height),
          gestationalAge: parseInt(gestationalAge)
        },
        { headers: { Authorization: `Bearer ${authToken}` } }
      )
      setWeightResult(response.data)
      setWeightError(null)
    } catch (err: any) {
      console.error('Error calculating weight recommendation:', err.response?.data || err)
      setWeightError(err.response?.status === 401 
        ? 'Unauthorized access. Please log in again.'
        : `Failed to calculate weight recommendation: ${err.response?.data?.error || 'Please try again later.'}`)
    } finally {
      setWeightLoading(false)
    }
  }

  useEffect(() => {
    fetchMealPlan()
  }, [trimester, authToken])

  // Handle View Recipe click for meal plan
  const handleViewRecipe = (mealTime: string, mealName: string) => {
    if (!mealPlanData) return
    let recipeData
    switch (mealTime.toLowerCase()) {
      case 'breakfast':
        recipeData = mealPlanData.breakfast
        break
      case 'lunch':
        recipeData = mealPlanData.lunch
        break
      case 'dinner':
        recipeData = mealPlanData.dinner
        break
      case 'snack':
        recipeData = mealPlanData.snack
        break
      default:
        return
    }
    if (recipeData && recipeData.name === mealName) {
      setSelectedRecipe({
        name: recipeData.name,
        description: recipeData.description || null,
        ingredients: recipeData.ingredients || null,
        directions: recipeData.directions || null,
        servings: recipeData.servings || null,
        section: recipeData.meal_type || 'Meal Plan'
      })
      setShowRecipeModal(true)
    }
  }

  // Handle View Recipe click for all recipes
  const handleViewAllRecipe = (recipe: Recipe) => {
    setSelectedRecipe(recipe)
    setShowRecipeModal(true)
  }

  // Get trimester-specific nutrition data
  const getTrimesterData = () => {
    const data = {
      first: {
        title: '1st Trimester',
        focus: 'Nausea-friendly, light meals',
        nutrients: ['Folic acid', 'B6', 'Iron', 'Hydration'],
        description: 'Focus on managing morning sickness while ensuring proper nutrition for early development.',
        color: 'from-green-400 to-green-600'
      },
      second: {
        title: '2nd Trimester',
        focus: 'Growth & Energy',
        nutrients: ['Calcium', 'Vitamin D', 'Omega-3', 'Protein'],
        description: 'This trimester focuses on bone development and baby\'s growth. Include milk, fish, and iron-rich foods.',
        color: 'from-blue-400 to-blue-600'
      },
      third: {
        title: '3rd Trimester',
        focus: 'Preparation for labor & baby\'s brain',
        nutrients: ['Iron', 'Fiber', 'Vitamin C', 'DHA', 'Magnesium'],
        description: 'Prepare your body for labor while supporting baby\'s brain development.',
        color: 'from-purple-400 to-purple-600'
      }
    }
    return data[trimester]
  }

  // Top foods for current trimester
  const getTopFoods = () => {
    const foods = {
      first: [
        { 
          name: 'Ginger Soup', 
          benefit: 'Reduces nausea, rich in antioxidants', 
          videoId: 'pE3pmJSkHRs', 
          title: 'Ginger Soup Recipe for Morning Sickness' 
        },
        { 
          name: 'Banana Smoothie', 
          benefit: 'Easy to digest, high in B6', 
          videoId: 'kXnnXCDFrng', 
          title: 'Banana Smoothie for First Trimester Energy' 
        },
        { 
          name: 'Cracker Snack', 
          benefit: 'Settles stomach, light and nutritious', 
          videoId: 'MPYSfi9YgYk', 
          title: 'Healthy Cracker Snack for Pregnancy' 
        },
        { 
          name: 'Watermelon Salad', 
          benefit: 'Hydration, vitamin-rich', 
          videoId: 'RF7xafO-DwU', 
          title: 'Watermelon Salad for Pregnancy Hydration' 
        },
        { 
          name: 'Leafy Green Stew', 
          benefit: 'High in folate and iron', 
          videoId: '-Hn6w8pu8zc', 
          title: 'Nutritious Leafy Green Stew for Pregnancy' 
        },
      ],
      second: [
        { 
          name: 'Avocado Toast', 
          benefit: 'Good fats, folate-rich', 
          videoId: 'pE3pmJSkHRs', 
          title: 'Avocado Toast Recipe for Second Trimester' 
        },
        { 
          name: 'Kontomire Stew', 
          benefit: 'Iron, fiber for digestion', 
          videoId: 'kXnnXCDFrng', 
          title: 'Ghanaian Kontomire Stew for Pregnancy' 
        },
        { 
          name: 'Egg Salad', 
          benefit: 'Protein, choline for brain health', 
          videoId: 'MPYSfi9YgYk', 
          title: 'Egg Salad Recipe for Pregnancy Nutrition' 
        },
        { 
          name: 'Citrus Fruit Bowl', 
          benefit: 'Vitamin C, hydrating', 
          videoId: 'RF7xafO-DwU', 
          title: 'Citrus Fruit Bowl for Second Trimester' 
        },
        { 
          name: 'Bean Soup', 
          benefit: 'Protein, fiber, Stu, iron-rich', 
          videoId: '-Hn6w8pu8zc', 
          title: 'Bean Soup for Pregnancy Energy' 
        },
      ],
      third: [
        { 
          name: 'Grilled Tilapia', 
          benefit: 'DHA for brain development', 
          videoId: 'pE3pmJSkHRs', 
          title: 'Grilled Tilapia Recipe for Third Trimester' 
        },
        { 
          name: 'Date Energy Bites', 
          benefit: 'Natural energy, fiber-rich', 
          videoId: 'kXnnXCDFrng', 
          title: 'Date Energy Bites for Labor Preparation' 
        },
        { 
          name: 'Spinach Soup', 
          benefit: 'Iron, folate for late pregnancy', 
          videoId: 'MPYSfi9YgYk', 
          title: 'Spinach Soup Recipe for Third Trimester' 
        },
        { 
          name: 'Yogurt Parfait', 
          benefit: 'Calcium, protein for bone health', 
          videoId: 'RF7xafO-DwU', 
          title: 'Yogurt Parfait for Pregnancy Nutrition' 
        },
        { 
          name: 'Sweet Potato Mash', 
          benefit: 'Beta-carotene, fiber-rich', 
          videoId: '-Hn6w8pu8zc', 
          title: 'Sweet Potato Mash for Third Trimester' 
        },
      ],
    };
    return foods[trimester];
  }

  // Foods to avoid
  const getFoodsToAvoid = () => [
    { item: 'Raw meat', reason: 'Risk of toxoplasmosis', image: '/images/foods/raw-meat.jpeg' },
    { item: 'Unpasteurized milk', reason: 'Can contain harmful bacteria', image: '/images/foods/unpasteurized-milk.jpeg' },
    { item: 'Excess caffeine', reason: 'May affect baby\'s development', image: '/images/foods/coffee.jpeg' },
    { item: 'Alcohol', reason: 'Can lead to birth defects', image: '/images/foods/alcohol.jpeg' },
    { item: 'Certain herbs', reason: 'E.g., aloe vera can cause contractions', image: '/images/foods/herbs.jpeg' }
  ]

  const trimesterData = getTrimesterData()
  const topFoods = getTopFoods()
  const avoidFoods = getFoodsToAvoid()

  const handleWaterIncrement = () => {
    if (waterIntake < 10) setWaterIntake(waterIntake + 1)
  }

  const handleWaterDecrement = () => {
    if (waterIntake > 0) setWaterIntake(waterIntake - 1)
  }

  const toggleFavorite = (foodName: string) => {
    setSavedFavorites(prev => 
      prev.includes(foodName) 
        ? prev.filter(f => f !== foodName)
        : [...prev, foodName]
    )
  }

  const getHydrationTip = () => {
    const tips = {
      first: "Drink small sips throughout the day to avoid nausea.",
      second: "Stay hydrated to support increased blood volume.",
      third: "Proper hydration helps prevent swelling and constipation."
    }
    return tips[trimester]
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto pb-4 sm:px-6 lg:px-8 pt-0">
        <section className="relative bg-gradient-to-br from-[#F59297] to-[#7da8e6] text-white py-20 rounded-3xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#F59297]/90 to-[#7da8e6]/90"></div>
          <div className="relative z-10 px-8 md:px-12 lg:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="text-center lg:text-left">
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  Your Pregnancy Nutrition
                </h1>
                <p className="text-xl md:text-2xl text-white/90 mb-8">
                  Eating well for two? Let us guide you every step of the way.
                </p>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 max-w-md mx-auto lg:mx-0">
                  <div className="flex items-center justify-center lg:justify-start space-x-3">
                    <Apple className="w-6 h-6 text-white" />
                    <div className="text-left">
                      <h3 className="font-bold">Currently in {trimesterData.title}</h3>
                      <p className="text-white/80 text-sm">Week {pregnancyWeek}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="relative w-full max-w-lg mx-auto">
                  <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl">
                    <img
                      src="/images/hero/pregnant-mother-nutrition.jpg"
                      alt="Pregnant mother with healthy foods"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -top-4 -right-4 bg-white/20 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
                    <div className="text-center">
                      <div className="text-2xl mb-1">🥗</div>
                      <p className="text-xs font-semibold">Healthy</p>
                    </div>
                  </div>
                  <div className="absolute -bottom-4 -left-4 bg-white/20 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
                    <div className="text-center">
                      <div className="text-2xl mb-1">💪</div>
                      <p className="text-xs font-semibold">Strong</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-4 mb-8">
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5" />
              <p className="text-red-800 dark:text-red-200">{error}</p>
            </div>
          </div>
        )}

        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {trimesterData.title} Nutrition Focus
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              {trimesterData.description}
            </p>
          </div>
          <div className={`bg-gradient-to-r ${trimesterData.color} rounded-3xl p-8 text-white mb-8`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold mb-4">Focus: {trimesterData.focus}</h3>
                <p className="text-white/90">
                  Your body needs specific nutrients during this stage to support both you and your baby's development.
                </p>
              </div>
              <div>
                <h4 className="text-xl font-bold mb-4">Key Nutrients:</h4>
                <div className="grid grid-cols-2 gap-3">
                  {trimesterData.nutrients.map((nutrient, index) => (
                    <div key={index} className="bg-white/20 rounded-xl p-3 text-center">
                      <span className="font-semibold">{nutrient}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Today's Meal Plan
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Personalized meals for your {trimesterData.title.toLowerCase()}
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg">
            <div className="space-y-6">
              {todaysMeals.map((meal, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-6 p-6 bg-gray-50 dark:bg-gray-700 rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors cursor-pointer"
                >
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-gray-900 dark:text-white">{meal.time}</h3>
                      <span className="text-sm text-[#F59297] font-medium">{meal.description}</span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300">{meal.meal}</p>
                  </div>
                  <button 
                    onClick={() => handleViewRecipe(meal.time, meal.meal)}
                    className="text-[#F59297] hover:text-[#e67d82] transition-colors"
                  >
                    <span className="text-sm font-medium">View Recipe</span>
                    <ChevronRight className="w-4 h-4 ml-1 inline" />
                  </button>
                </div>
              ))}
            </div>
            <div className="mt-6 text-center">
              <button
                onClick={fetchMealPlan}
                disabled={loading}
                className={`flex items-center justify-center mx-auto px-6 py-3 rounded-2xl font-semibold transition-colors ${
                  loading
                    ? 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed'
                    : 'bg-[#F59297] hover:bg-[#e67d82] text-white'
                }`}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Loading...
                  </>
                ) : (
                  'Refresh Meal Plan'
                )}
              </button>
            </div>
          </div>
        </section>

        {/* Recipe Modal */}
        {showRecipeModal && selectedRecipe && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50" onClick={() => setShowRecipeModal(false)}>
            <div 
              className="relative bg-gradient-to-br from-[#F59297] to-[#7da8e6] rounded-3xl shadow-2xl max-w-2xl w-full mx-4 p-8 max-h-[90vh] overflow-y-auto transform transition-all duration-300 scale-100 hover:scale-105"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">{selectedRecipe.name}</h2>
                <button 
                  onClick={() => setShowRecipeModal(false)}
                  className="text-white hover:text-gray-200"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Recipe Content */}
              <div className="bg-white/90 dark:bg-gray-800/90 rounded-2xl p-6 space-y-6">
                {selectedRecipe.section && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Section</h3>
                    <p className="text-gray-600 dark:text-gray-300 capitalize">{selectedRecipe.section}</p>
                  </div>
                )}
                {selectedRecipe.description && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Description</h3>
                    <p className="text-gray-600 dark:text-gray-300 whitespace-pre-line">{selectedRecipe.description}</p>
                  </div>
                )}
                {selectedRecipe.servings && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Servings</h3>
                    <p className="text-gray-600 dark:text-gray-300">{selectedRecipe.servings}</p>
                  </div>
                )}
                {selectedRecipe.ingredients && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Ingredients</h3>
                    {Array.isArray(selectedRecipe.ingredients) ? (
                      <ul className="list-disc pl-5 text-gray-600 dark:text-gray-300">
                        {selectedRecipe.ingredients.map((ingredient, index) => (
                          <li key={index}>{ingredient}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-600 dark:text-gray-300 whitespace-pre-line">{selectedRecipe.ingredients}</p>
                    )}
                  </div>
                )}
                {selectedRecipe.directions && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Directions</h3>
                    {Array.isArray(selectedRecipe.directions) ? (
                      <ol className="list-decimal pl-5 text-gray-600 dark:text-gray-300">
                        {selectedRecipe.directions.map((step, index) => (
                          <li key={index}>{step}</li>
                        ))}
                      </ol>
                    ) : (
                      <p className="text-gray-600 dark:text-gray-300 whitespace-pre-line">{selectedRecipe.directions}</p>
                    )}
                  </div>
                )}
              </div>

              {/* Close Button */}
              <div className="mt-6 text-center">
                <button
                  onClick={() => setShowRecipeModal(false)}
                  className="w-full bg-white text-[#F59297] py-3 rounded-xl font-semibold text-lg hover:bg-gray-100 dark:hover:bg-gray-200 transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  <span>Close</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-3 -left-3 w-8 h-8 bg-white rounded-full opacity-30" />
              <div className="absolute -bottom-3 -right-3 w-8 h-8 bg-white rounded-full opacity-30" />
            </div>
          </div>
        )}

        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Recipe Suggestions
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Discover delicious recipes perfect for pregnancy
            </p>
          </div>
          {recipesError && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-4 mb-8">
              <div className="flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5" />
                <p className="text-red-800 dark:text-red-200">{recipesError}</p>
              </div>
            </div>
          )}
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg">
            {/* Search Form */}
            <div className="mb-8">
              <div className="flex flex-col sm:flex-row gap-4 items-center">
                <div className="relative flex-1 w-full">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder={`Search by ${searchType}`}
                    className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#F59297] focus:border-transparent"
                  />
                </div>
                <select
                  value={searchType}
                  onChange={(e) => setSearchType(e.target.value as 'name' | 'ingredient' | 'section')}
                  className="px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#F59297] focus:border-transparent"
                >
                  <option value="name">Name</option>
                  <option value="ingredient">Ingredient</option>
                  <option value="section">Section</option>
                </select>
                <button
                  onClick={handleSearch}
                  disabled={recipesLoading}
                  className={`flex items-center justify-center px-6 py-2 rounded-xl font-semibold transition-colors ${
                    recipesLoading
                      ? 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed'
                      : 'bg-[#F59297] hover:bg-[#e67d82] text-white'
                  }`}
                >
                  {recipesLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Searching...
                    </>
                  ) : (
                    'Search'
                  )}
                </button>
              </div>
            </div>
            {recipesLoading ? (
              <div className="text-center">
                <Loader2 className="w-8 h-8 animate-spin text-[#F59297] mx-auto" />
                <p className="text-gray-600 dark:text-gray-400 mt-2">Loading recipes...</p>
              </div>
            ) : recipes.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recipes.map((recipe, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:border-[#F59297]/30"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 dark:text-white mb-2">{recipe.name}</h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                          <span className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {recipe.servings ? `${recipe.servings} servings` : 'N/A'}
                          </span>
                          <span>{recipe.section}</span>
                        </div>
                      </div>
                      <span className="bg-[#F59297]/10 text-[#F59297] px-3 py-1 rounded-full text-xs font-medium">
                        {recipe.section}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                        ))}
                        <span className="text-sm text-gray-500 dark:text-gray-400">(4.8)</span>
                      </div>
                      <button 
                        onClick={() => handleViewAllRecipe(recipe)}
                        className="text-[#F59297] hover:text-[#e67d82] font-semibold text-sm transition-colors"
                      >
                        View Recipe
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-600 dark:text-gray-400">
                No recipes loaded. Click below to browse recipes or search above.
              </div>
            )}
            <div className="text-center mt-8">
              <button
                onClick={() => fetchRecipes(1)}
                disabled={recipesLoading}
                className={`flex items-center justify-center mx-auto px-8 py-4 rounded-2xl font-semibold transition-colors ${
                  recipesLoading
                    ? 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed'
                    : 'bg-gradient-to-r from-[#F59297] to-[#7da8e6] text-white hover:shadow-lg'
                }`}
              >
                {recipesLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Loading...
                  </>
                ) : (
                  'Browse All Recipes'
                )}
              </button>
              {recipes.length > 0 && (
                <div className="flex justify-center items-center space-x-4 mt-4">
                  <button
                    onClick={handlePreviousPage}
                    disabled={recipesLoading || !previousUrl}
                    className={`flex items-center px-4 py-2 rounded-xl font-semibold transition-colors ${
                      recipesLoading || !previousUrl
                        ? 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed'
                        : 'bg-[#F59297] hover:bg-[#e67d82] text-white'
                    }`}
                  >
                    <ChevronLeft className="w-5 h-5 mr-2" />
                    Previous
                  </button>
                  <span className="text-gray-600 dark:text-gray-400">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={handleNextPage}
                    disabled={recipesLoading || !nextUrl}
                    className={`flex items-center px-4 py-2 rounded-xl font-semibold transition-colors ${
                      recipesLoading || !nextUrl
                        ? 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed'
                        : 'bg-[#F59297] hover:bg-[#e67d82] text-white'
                    }`}
                  >
                    Next
                    <ChevronRightIcon className="w-5 h-5 ml-2" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Foods To Explore
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Nutrient-rich foods perfect for your current trimester
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {topFoods.map((food, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 text-center border border-gray-100 dark:border-gray-700"
              >
                <div className="w-full aspect-video mb-4 rounded-2xl overflow-hidden">
                  <iframe
                    src={`https://www.youtube.com/embed/${food.videoId}`}
                    title={food.title}
                    className="w-full h-full"
                    style={{ border: 0 }}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">{food.name}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{food.benefit}</p>
                <button
                  onClick={() => toggleFavorite(food.name)}
                  className={`w-full py-2 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center ${
                    savedFavorites.includes(food.name)
                      ? 'bg-[#F59297] text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-[#F59297]/10'
                  }`}
                >
                  <Bookmark className={`w-4 h-4 mr-2 ${savedFavorites.includes(food.name) ? 'fill-current' : ''}`} />
                  {savedFavorites.includes(food.name) ? 'Saved' : 'Save to Favorites'}
                </button>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <div className="bg-red-50 dark:bg-red-900/10 rounded-3xl p-8 border-2 border-red-200 dark:border-red-800">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Things to Avoid
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Foods and substances to limit or avoid during pregnancy
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
              {avoidFoods.map((item, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-6 border-2 border-red-200 dark:border-red-700"
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-gray-200 dark:bg-gray-600 flex items-center justify-center">
                      <img
                        src={item.image}
                        alt={item.item}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-red-800 dark:text-red-300 mb-2 flex items-center">
                        <AlertTriangle className="w-4 h-4 mr-2" />
                        {item.item}
                      </h3>
                      <p className="text-red-700 dark:text-red-400 text-sm">{item.reason}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center">
            </div>
          </div>
        </section>

        <section className="mb-16">
          <div className="bg-gradient-to-r from-blue-400 to-blue-600 rounded-3xl p-8 text-white">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-4">Stay Hydrated 💧</h2>
                <p className="text-blue-100 mb-4">
                  You've had <span className="font-bold text-2xl">{waterIntake}</span> out of <span className="font-bold">8</span> glasses today
                </p>
                <div className="bg-white/20 rounded-full h-4 mb-4">
                  <div 
                    className="bg-white h-4 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min((waterIntake / 8) * 100, 100)}%` }}
                  ></div>
                </div>
                <p className="text-blue-100 text-sm italic">
                  💡 Tip: {getHydrationTip()}
                </p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center space-x-4 mb-6">
                  <button
                    onClick={handleWaterDecrement}
                    className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                  >
                    <Minus className="w-6 h-6" />
                  </button>
                  <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white/30">
                    <img
                      src="/images/hydration/pregnant-mother-drinking-water.png"
                      alt="Pregnant mother drinking water"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <button
                    onClick={handleWaterIncrement}
                    className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                  >
                    <Plus className="w-6 h-6" />
                  </button>
                </div>
                <p className="text-white/80">Tap to track your water intake</p>
              </div>
            </div>
          </div>
        </section>

        <div className="fixed bottom-6 right-6 flex flex-col space-y-4 z-50">
          <button className="w-14 h-14 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center">
            <Phone className="w-6 h-6" />
          </button>
          <button className="w-14 h-14 bg-[#F59297] hover:bg-[#e67d82] text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center">
            <MessageCircle className="w-6 h-6" />
          </button>
          <button className="w-14 h-14 bg-[#7da8e6] hover:bg-blue-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center">
            <HelpCircle className="w-6 h-6" />
          </button>
        </div>

        {/* Analysis Modal */}
        {showAnalysisModal && analysisResult && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-2xl">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white">Symptom Analysis</h3>
                <button
                  onClick={() => setShowAnalysisModal(false)}
                  className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="space-y-8">
                <p className="text-gray-600 dark:text-gray-300 italic text-sm bg-gray-50 dark:bg-gray-700 p-4 rounded-xl">{analysisResult.result.disclaimer}</p>
                <div className="space-y-6">
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-white">Possible Conditions</h4>
                  {analysisResult.result.analysis.possibleConditions.map((condition, index) => (
                    <div key={index} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                      <h5 className="text-lg font-medium text-gray-900 dark:text-white mb-2">{condition.condition}</h5>
                      <p className="text-gray-600 dark:text-gray-300 mb-2">{condition.description}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        <strong>Matching Symptoms:</strong> {condition.matchingSymptoms.join(', ')}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        <strong>Risk Level:</strong> {condition.riskLevel}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        <strong>Additional Info:</strong> {condition.additionalInfo}
                      </p>
                    </div>
                  ))}
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">General Advice</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                    <strong>Recommended Actions:</strong> {analysisResult.result.analysis.generalAdvice.recommendedActions.join(', ')}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    <strong>When to Seek Medical Attention:</strong> {analysisResult.result.analysis.generalAdvice.whenToSeekMedicalAttention.join(', ')}
                  </p>
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Educational Resources</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                    <strong>Preventive Measures:</strong> {analysisResult.result.educationalResources.preventiveMeasures.join(', ')}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    <strong>Reliable Sources:</strong> {analysisResult.result.educationalResources.reliableSources.join(', ')}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowAnalysisModal(false)}
                className="w-full mt-8 bg-[#F59297] text-white py-3 rounded-2xl font-semibold hover:bg-[#e67d82] transition-colors shadow-md hover:shadow-lg"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* Weight Recommendation Modal */}
        {showWeightModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 max-w-md w-full shadow-2xl">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white">Weight Recommendation</h3>
                <button
                  onClick={() => {
                    setShowWeightModal(false)
                    setPrePregnancyWeight('')
                    setHeight('')
                    setGestationalAge('')
                    setWeightResult(null)
                    setWeightError(null)
                  }}
                  className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              {!authToken ? (
                <div className="text-center space-y-4">
                  <p className="text-gray-600 dark:text-gray-400">Please log in to use the Weight Recommendation tool.</p>
                  <button
                    onClick={() => router.push('/login')}
                    className="bg-[#F59297] hover:bg-[#e67d82] text-white py-3 px-6 rounded-2xl font-semibold transition-colors shadow-md hover:shadow-lg"
                  >
                    Log In
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  <div>
                    <label className="block text-gray-900 dark:text-white font-medium mb-2">Pre-Pregnancy Weight (kg)</label>
                    <input
                      type="number"
                      value={prePregnancyWeight}
                      onChange={(e) => setPrePregnancyWeight(e.target.value)}
                      placeholder="e.g., 59.5"
                      step="0.1"
                      className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#F59297] focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-900 dark:text-white font-medium mb-2">Height (m)</label>
                    <input
                      type="number"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      placeholder="e.g., 1.65"
                      step="0.01"
                      className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#F59297] focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-900 dark:text-white font-medium mb-2">Gestational Age (weeks)</label>
                    <input
                      type="number"
                      value={gestationalAge}
                      onChange={(e) => setGestationalAge(e.target.value)}
                      placeholder="e.g., 20"
                      min="1"
                      max="40"
                      className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#F59297] focus:border-transparent transition-all"
                    />
                  </div>
                  {weightError && (
                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4">
                      <div className="flex items-start space-x-3">
                        <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5" />
                        <p className="text-red-800 dark:text-red-200 text-sm">{weightError}</p>
                      </div>
                    </div>
                  )}
                  {weightResult && (
                    <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4">
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Weight Recommendation</h4>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        <strong>Type:</strong> {weightResult.recommendation_type}
                      </p>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        <strong>Recommended Weight Change:</strong> {weightResult.recommended_weight_change}
                      </p>
                    </div>
                  )}
                  <div className="flex space-x-4">
                    <button
                      onClick={handleWeightRecommendation}
                      disabled={weightLoading || !prePregnancyWeight || !height || !gestationalAge}
                      className={`flex-1 flex items-center justify-center py-3 rounded-2xl font-semibold transition-colors shadow-md ${
                        weightLoading || !prePregnancyWeight || !height || !gestationalAge
                          ? 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed'
                          : 'bg-[#F59297] hover:bg-[#e67d82] text-white hover:shadow-lg'
                      }`}
                    >
                      {weightLoading ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                          Calculating...
                        </>
                      ) : (
                        'Calculate'
                      )}
                    </button>
                    <button
                      onClick={() => {
                        setShowWeightModal(false)
                        setPrePregnancyWeight('')
                        setHeight('')
                        setGestationalAge('')
                        setWeightResult(null)
                        setWeightError(null)
                      }}
                      className="flex-1 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white py-3 rounded-2xl font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors shadow-md hover:shadow-lg"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Baby Products Guide Modal */}
        {showBabyProductsModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-2xl">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white">Baby Products Guide</h3>
                <button
                  onClick={() => {
                    setShowBabyProductsModal(false)
                    setCategories([])
                    setSelectedCategory(null)
                    setCategoryItems([])
                    setProductsError(null)
                  }}
                  className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              {!authToken ? (
                <div className="text-center space-y-4">
                  <p className="text-gray-600 dark:text-gray-400">Please log in to use the Baby Products Guide.</p>
                  <button
                    onClick={() => router.push('/login')}
                    className="bg-[#F59297] hover:bg-[#e67d82] text-white py-3 px-6 rounded-2xl font-semibold transition-colors shadow-md hover:shadow-lg"
                  >
                    Log In
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {productsError && (
                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4">
                      <div className="flex items-start space-x-3">
                        <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5" />
                        <p className="text-red-800 dark:text-red-200 text-sm">{productsError}</p>
                      </div>
                    </div>
                  )}
                  {productsLoading ? (
                    <div className="text-center">
                      <Loader2 className="w-8 h-8 animate-spin text-[#F59297] mx-auto" />
                      <p className="text-gray-600 dark:text-gray-400 mt-2">Loading...</p>
                    </div>
                  ) : (
                    <>
                      <h4 className="text-xl font-semibold text-gray-900 dark:text-white">Product Categories</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {categories.map((category) => (
                          <div
                            key={category.id}
                            className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl cursor-pointer hover:bg-[#F59297]/10 transition-colors"
                            onClick={() => {
                              setSelectedCategory(category.id)
                              fetchCategoryItems(category.id)
                            }}
                          >
                            <h5 className="text-lg font-medium text-gray-900 dark:text-white">{category.name}</h5>
                            <p className="text-sm text-gray-600 dark:text-gray-300">{category.description}</p>
                          </div>
                        ))}
                      </div>
                      {selectedCategory && categoryItems.length > 0 && (
                        <div className="mt-6">
                          <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Items in {categories.find(cat => cat.id === selectedCategory)?.name}</h4>
                          <div className="space-y-3">
                            {categoryItems[0].items.map((item) => (
                              <div key={item.id} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                                <h5 className="text-lg font-medium text-gray-900 dark:text-white">{item.name}</h5>
                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                  <strong>Quantity:</strong> {item.quantity}
                                </p>
                                {item.notes && (
                                  <p className="text-sm text-gray-600 dark:text-gray-300">
                                    <strong>Notes:</strong> {item.notes}
                                  </p>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </>
                  )}
                  <button
                    onClick={() => {
                      setShowBabyProductsModal(false)
                      setCategories([])
                      setSelectedCategory(null)
                      setCategoryItems([])
                      setProductsError(null)
                    }}
                    className="w-full mt-6 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white py-3 rounded-2xl font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors shadow-md hover:shadow-lg"
                  >
                    Close
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default PregnantNutritionPage
