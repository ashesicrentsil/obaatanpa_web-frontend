'use client'

import { useState, useEffect } from 'react'
import {
  Calculator,
  Calendar,
  Gift,
  ShoppingBag,
  Scale,
  Baby,
  Clock,
  Milk,
  BookOpen,
  Video,
  MessageCircle,
  AlertTriangle,
  Phone,
  MapPin,
  Mail,
  ChevronRight,
  Play,
  Heart,
  Star,
  HelpCircle,
  CheckCircle,
  X,
  Loader2,
  ChevronDown,
  ChevronUp,
  Plus
} from 'lucide-react'
import axios from 'axios'
import { useRouter } from 'next/navigation'

interface PregnantResourcesPageProps {
  pregnancyWeek?: number
  trimester?: 'first' | 'second' | 'third'
  motherName?: string
}

interface JournalEntry {
  id: number
  user_id: number
  entry: string
  symptoms: {
    possibleConditions: {
      condition: string
      description: string
      commonSymptoms: string[]
      matchingSymptoms: string[]
      riskLevel: string
      additionalInfo: string
    }[]
    generalAdvice: {
      recommendedActions: string[]
      lifestyleConsiderations: string[]
      whenToSeekMedicalAttention: string[]
    }
  }
  created_at: string
}

interface AnalysisResult {
  possibleConditions: {
    condition: string
    description: string
    commonSymptoms: string[]
    matchingSymptoms: string[]
    riskLevel: string
    additionalInfo: string
  }[]
  generalAdvice: {
    recommendedActions: string[]
    lifestyleConsiderations: string[]
    whenToSeekMedicalAttention: string[]
  }
}

interface DueDateResult {
  due_date: string
  gestational_age: string
  trimester: string
}

const PregnantResourcesPage = ({ pregnancyWeek, trimester, motherName }: PregnantResourcesPageProps) => {
  const [showEmergencyModal, setShowEmergencyModal] = useState(false)
  const [showChatbot, setShowChatbot] = useState(false)
  const [journalEntry, setJournalEntry] = useState('')
  const [symptomsInput, setSymptomsInput] = useState('')
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([])
  const [showJournalForm, setShowJournalForm] = useState(false)
  const [showSymptomForm, setShowSymptomForm] = useState(false)
  const [showAnalysisModal, setShowAnalysisModal] = useState(false)
  const [showPastEntries, setShowPastEntries] = useState(false)
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null)
  const [authToken, setAuthToken] = useState<string | null>(null)
  const [journalError, setJournalError] = useState<string | null>(null)
  const [journalLoading, setJournalLoading] = useState(false)
  const [expandedEntries, setExpandedEntries] = useState<number[]>([])
  const [showDueDateModal, setShowDueDateModal] = useState(false)
  const [dueDateMethod, setDueDateMethod] = useState<'menstrual' | 'conception' | null>(null)
  const [lastPeriodDate, setLastPeriodDate] = useState('')
  const [cycleLength, setCycleLength] = useState('5')
  const [conceptionDate, setConceptionDate] = useState('')
  const [dueDateResult, setDueDateResult] = useState<DueDateResult | null>(null)
  const [dueDateError, setDueDateError] = useState<string | null>(null)
  const [dueDateLoading, setDueDateLoading] = useState(false)
  const [showWeightModal, setShowWeightModal] = useState(false)
  const [prePregnancyWeight, setPrePregnancyWeight] = useState('')
  const [height, setHeight] = useState('')
  const [gestationalAge, setGestationalAge] = useState('')
  const [weightResult, setWeightResult] = useState(null)
  const [weightError, setWeightError] = useState(null)
  const [weightLoading, setWeightLoading] = useState(false)
  const [showBabyProductsModal, setShowBabyProductsModal] = useState(false)
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [categoryItems, setCategoryItems] = useState([])
  const [productsLoading, setProductsLoading] = useState(false)
  const [productsError, setProductsError] = useState(null)
  const [chatbotQuestion, setChatbotQuestion] = useState('')
  const [chatbotResponse, setChatbotResponse] = useState<{
    message: string
    recommendations: string[]
    warnings: string[]
    followUp: string[]
  } | null>(null)
  const [chatbotError, setChatbotError] = useState<string | null>(null)
  const [chatbotLoading, setChatbotLoading] = useState(false)
  const [showOvulationModal, setShowOvulationModal] = useState(false);
  const [ovulationLastPeriod, setOvulationLastPeriod] = useState('');
  const [ovulationCycleLength, setOvulationCycleLength] = useState('5');
  const [ovulationResult, setOvulationResult] = useState<{ ovulation_date: string } | null>(null);
  const [ovulationError, setOvulationError] = useState<string | null>(null);
  const [ovulationLoading, setOvulationLoading] = useState(false);
  const router = useRouter()

  // Load token from localStorage
  useEffect(() => {
    const user = localStorage.getItem('currentUser')
    const token = localStorage.getItem('authToken')
    if (user) {
      const parsedUser = JSON.parse(user)
      if (parsedUser.token) {
        setAuthToken(parsedUser.token)
        setJournalError(null)
      } else if (token) {
        setAuthToken(token)
        setJournalError(null)
      } else {
        setJournalError('Please log in to access features like the symptom tracker.')
      }
    } else if (token) {
      setAuthToken(token)
      setJournalError(null)
    } else {
      setJournalError('Please log in to access features like the symptom tracker.')
    }
  }, [])

  // Fetch journal entries
  const fetchJournalEntries = async () => {
    if (!authToken) {
      setJournalError('Please log in to view journal entries.')
      return
    }
    setJournalLoading(true)
    try {
      const response = await axios.get('https://obaatanpa-backend.onrender.com/journal', {
        headers: { Authorization: `Bearer ${authToken}` }
      })
      setJournalEntries(response.data.journal_entries || [])
      setJournalError(null)
    } catch (err: any) {
      // console.error('Error fetching journal entries:', err.response?.data || err)
      const errorMessage = err.response?.status === 401
        ? 'Your session has expired. Please log in again.'
        : err.response?.status === 404
        ? 'No journal entries found.'
        : `Failed to fetch journal entries: ${err.response?.data?.error || 'Please try again later.'}`
      setJournalError(errorMessage)
      if (err.response?.status === 401) {
        localStorage.removeItem('currentUser')
        localStorage.removeItem('authToken')
        setAuthToken(null)
      }
    } finally {
      setJournalLoading(false)
    }
  }

  // Fetch symptom entries
  const fetchSymptomEntries = async () => {
    if (!authToken) {
      setJournalError('Please log in to view symptom entries.')
      return
    }
    setJournalLoading(true)
    try {
      const response = await axios.get('https://obaatanpa-backend.onrender.com/symptom_tracker', {
        headers: { Authorization: `Bearer ${authToken}` }
      })
      setJournalEntries(prev => [
        ...prev.filter(entry => entry.entry !== ''),
        ...(response.data.symptom_entries || [])
      ])
      setJournalError(null)
    } catch (err: any) {
      // console.error('Error fetching symptom entries:', err.response?.data || err)
      const errorMessage = err.response?.status === 401
        ? 'Your session has expired. Please log in again.'
        : err.response?.status === 404
        ? 'No symptom entries found.'
        : `Failed to fetch symptom entries: ${err.response?.data?.error || 'Please try again later.'}`
      setJournalError(errorMessage)
      if (err.response?.status === 401) {
        localStorage.removeItem('currentUser')
        localStorage.removeItem('authToken')
        setAuthToken(null)
      }
    } finally {
      setJournalLoading(false)
    }
  }


  const handleChatbotSubmit = async () => {
    if (!authToken) {
      setChatbotError('Please log in to use the Pregnancy Assistant.');
      return;
    }
    if (!chatbotQuestion.trim()) {
      setChatbotError('Please enter a question.');
      return;
    }
    setChatbotLoading(true);
    setChatbotError(null);
    try {
      console.log('Submitting chatbot question with token:', authToken);
      const response = await axios.post(
        'https://obaatanpa-backend.onrender.com/chatbot',
        { message: chatbotQuestion },
        { headers: { Authorization: `Bearer ${authToken}` } }
      );
      console.log('Full response:', response.data); // Log the full response for debugging

      // Validate response structure
      if (!response.data?.response?.message) {
        console.error('Invalid response structure:', response.data);
        throw new Error('Invalid response structure from server');
      }

      const { message } = response.data.response;
      console.log('Parsed response:', { message }); // Log parsed data

      // Set chatbotResponse with only message, and empty arrays for compatibility
      setChatbotResponse({
        message,
        recommendations: [], // Empty for now, can be updated if backend adds these fields
        warnings: [],
        followUp: [],
      });
      setChatbotQuestion('');
    } catch (err: any) {
      console.error('Chatbot error:', err);
      console.error('Response data:', err.response?.data); // Log error response
      const errorMessage =
        err.response?.status === 401
          ? 'Your session has expired. Please log in again.'
          : err.response?.status === 400
          ? 'Please provide a valid question.'
          : `Failed to get response: ${err.message || 'Please try again later.'}`;
      setChatbotError(errorMessage);
      if (err.response?.status === 401) {
        localStorage.removeItem('currentUser');
        localStorage.removeItem('authToken');
        setAuthToken(null);
        router.push('/login');
      }
    } finally {
      setChatbotLoading(false);
    }
  };

  // Handle ovulation calculation
  const handleOvulationCalculation = async () => {
    if (!authToken) {
      setOvulationError('Please log in to use the Ovulation Calculator.');
      return;
    }
    if (!ovulationLastPeriod || !ovulationCycleLength) {
      setOvulationError('Please provide both last period date and cycle length.');
      return;
    }
    setOvulationLoading(true);
    setOvulationError(null);
    try {
      const response = await axios.post(
        'https://obaatanpa-backend.onrender.com/ovulation/calculator',
        {
          last_period_start: ovulationLastPeriod,
          cycle_length: parseInt(ovulationCycleLength),
        },
        { headers: { Authorization: `Bearer ${authToken}` } }
      );
      setOvulationResult(response.data);
      setOvulationError(null);
    } catch (err: any) {
      console.error('Error calculating ovulation date:', err.response?.data || err);
      const errorMessage =
        err.response?.status === 401
          ? 'Your session has expired. Please log in again.'
          : err.response?.status === 400
          ? 'Please provide valid input for last period date and cycle length.'
          : `Failed to calculate ovulation date: ${err.response?.data?.error || 'Please try again later.'}`;
      setOvulationError(errorMessage);
      if (err.response?.status === 401) {
        localStorage.removeItem('currentUser');
        localStorage.removeItem('authToken');
        setAuthToken(null);
        router.push('/login');
      }
    } finally {
      setOvulationLoading(false);
    }
  };


  // Submit journal entry
  const handleJournalSubmit = async () => {
    if (!authToken) {
      setJournalError('Please log in to submit a journal entry.')
      return
    }
    if (!journalEntry.trim()) {
      setJournalError('Please enter a journal entry.')
      return
    }
    setJournalLoading(true)
    try {
      const response = await axios.post(
        'https://obaatanpa-backend.onrender.com/journal',
        { entry: journalEntry },
        { headers: { Authorization: `Bearer ${authToken}` } }
      )
      setJournalEntries(prev => [response.data, ...prev])
      setJournalEntry('')
      setShowJournalForm(false)
      setJournalError(null)
    } catch (err: any) {
      console.error('Error submitting journal entry:', err.response?.data || err)
      const errorMessage = err.response?.status === 401
        ? 'Your session has expired. Please log in again.'
        : err.response?.status === 400
        ? 'Please provide a valid journal entry.'
        : `Failed to submit journal entry: ${err.response?.data?.error || 'Please try again later.'}`
      setJournalError(errorMessage)
      if (err.response?.status === 401) {
        localStorage.removeItem('currentUser')
        localStorage.removeItem('authToken')
        setAuthToken(null)
      }
    } finally {
      setJournalLoading(false)
    }
  }

  // Submit symptom entry
  const handleSymptomSubmit = async () => {
    if (!authToken) {
      setJournalError('Please log in to submit symptoms.')
      return
    }
    if (!symptomsInput.trim()) {
      setJournalError('Please enter symptoms for analysis.')
      return
    }
    setJournalLoading(true)
    try {
      const symptoms = symptomsInput.split(',').map(s => s.trim()).filter(s => s)
      const response = await axios.post(
        'https://obaatanpa-backend.onrender.com/symptom_tracker',
        { symptoms },
        { headers: { Authorization: `Bearer ${authToken}` } }
      )
      setAnalysisResult(response.data.symptoms)
      setShowAnalysisModal(true)
      setSymptomsInput('')
      setShowSymptomForm(false)
      await fetchSymptomEntries()
      setJournalError(null)
    } catch (err: any) {
      console.error('Error submitting symptoms:', err.response?.data || err)
      const errorMessage = err.response?.status === 401
        ? 'Your session has expired. Please log in again.'
        : err.response?.status === 400
        ? 'Please provide valid symptoms.'
        : `Failed to submit symptoms: ${err.response?.data?.error || 'Please try again later.'}`
      setJournalError(errorMessage)
      if (err.response?.status === 401) {
        localStorage.removeItem('currentUser')
        localStorage.removeItem('authToken')
        setAuthToken(null)
      }
    } finally {
      setJournalLoading(false)
    }
  }

  // Delete journal/symptom entry
  const handleDeleteEntry = async (entryId: number) => {
    if (!authToken) {
      setJournalError('Please log in to delete entries.')
      return
    }
    setJournalLoading(true)
    try {
      await axios.delete(`https://obaatanpa-backend.onrender.com/journal/${entryId}`, {
        headers: { Authorization: `Bearer ${authToken}` }
      })
      setJournalEntries(prev => prev.filter(entry => entry.id !== entryId))
      setExpandedEntries(prev => prev.filter(id => id !== entryId))
      setJournalError(null)
    } catch (err: any) {
      console.error('Error deleting entry:', err.response?.data || err)
      const errorMessage = err.response?.status === 401
        ? 'Your session has expired. Please log in again.'
        : err.response?.status === 404
        ? 'Entry not found.'
        : `Failed to delete entry: ${err.response?.data?.error || 'Please try again later.'}`
      setJournalError(errorMessage)
      if (err.response?.status === 401) {
        localStorage.removeItem('currentUser')
        localStorage.removeItem('authToken')
        setAuthToken(null)
      }
    } finally {
      setJournalLoading(false)
    }
  }

  // Handle due date calculation
  const handleDueDateSubmit = async () => {
    if (!authToken) {
      setDueDateError('Please log in to use the Due Date Calculator.')
      return
    }
    if (dueDateMethod === 'menstrual' && (!lastPeriodDate || !cycleLength)) {
      setDueDateError('Please provide both last period date and cycle length.')
      return
    }
    if (dueDateMethod === 'conception' && !conceptionDate) {
      setDueDateError('Please provide the conception date.')
      return
    }
    setDueDateLoading(true)
    setDueDateError(null)
    try {
      let response
      if (dueDateMethod === 'menstrual') {
        response = await axios.post(
          'https://obaatanpa-backend.onrender.com/due_date/menstrual_cycle/calculate',
          {
            last_period_date: lastPeriodDate,
            cycle_length: parseInt(cycleLength)
          },
          { headers: { Authorization: `Bearer ${authToken}` } }
        )
      } else if (dueDateMethod === 'conception') {
        response = await axios.post(
          'https://obaatanpa-backend.onrender.com/due_date/conception_date/calculate',
          {
            conception_date: conceptionDate
          },
          { headers: { Authorization: `Bearer ${authToken}` } }
        )
      }
      setDueDateResult(response?.data)
      setDueDateError(null)
    } catch (err: any) {
      console.error('Error calculating due date:', err.response?.data || err)
      const errorMessage = err.response?.status === 401
        ? 'Your session has expired. Please log in again.'
        : err.response?.status === 404
        ? 'Due date calculator service not found. Please check if the server is running.'
        : `Failed to calculate due date: ${err.response?.data?.error || 'Please try again later.'}`
      setDueDateError(errorMessage)
      if (err.response?.status === 401) {
        localStorage.removeItem('currentUser')
        localStorage.removeItem('authToken')
        setAuthToken(null)
      }
    } finally {
      setDueDateLoading(false)
    }
  }

  // Handle weight recommendation
  const handleWeightRecommendation = async () => {
    if (!authToken) {
      setWeightError('Please log in to use the Weight Recommendation tool.')
      return
    }
    if (!prePregnancyWeight || !height || !gestationalAge) {
      setWeightError('Please provide pre-pregnancy weight, height, and gestational age.')
      return
    }
    setWeightLoading(true)
    setWeightError(null)
    try {
      const response = await axios.post(
        'https://obaatanpa-backend.onrender.com/recommend/weight/',
        {
          pre_pregnancy_weight: parseFloat(prePregnancyWeight),
          height: parseFloat(height),
          gestational_age: parseInt(gestationalAge)
        },
        { headers: { Authorization: `Bearer ${authToken}` } }
      )
      setWeightResult(response.data)
      setWeightError(null)
    } catch (err: any) {
      console.error('Error fetching weight recommendation:', err.response?.data || err)
      const errorMessage = err.response?.status === 401
        ? 'Your session has expired. Please log in again.'
        : err.response?.status === 404
        ? 'Weight recommendation service not found. Please check if the server is running.'
        : `Failed to fetch weight recommendation: ${err.response?.data?.error || 'Please try again later.'}`
      setWeightError(errorMessage)
      if (err.response?.status === 401) {
        localStorage.removeItem('currentUser')
        localStorage.removeItem('authToken')
        setAuthToken(null)
      }
    } finally {
      setWeightLoading(false)
    }
  }

  // Fetch baby product categories
  const fetchCategories = async () => {
    if (!authToken) {
      setProductsError('Please log in to view baby products.')
      return
    }
    setProductsLoading(true)
    setProductsError(null)
    try {
      const response = await axios.get('https://obaatanpa-backend.onrender.com/baby_products/categories', {
        headers: { Authorization: `Bearer ${authToken}` }
      })
      setCategories(response.data.categories || [])
    } catch (err: any) {
      console.error('Error fetching product categories:', err.response?.data || err)
      const errorMessage = err.response?.status === 401
        ? 'Your session has expired. Please log in again.'
        : err.response?.status === 404
        ? 'Product categories service not found. Please check if the server is running.'
        : `Failed to fetch product categories: ${err.response?.data?.error || 'Please try again later.'}`
      setProductsError(errorMessage)
      if (err.response?.status === 401) {
        localStorage.removeItem('currentUser')
        localStorage.removeItem('authToken')
        setAuthToken(null)
      }
    } finally {
      setProductsLoading(false)
    }
  }

  // Fetch items for a specific category
  const fetchCategoryItems = async (categoryId: number) => {
    if (!authToken) {
      setProductsError('Please log in to view baby products.')
      return
    }
    setProductsLoading(true)
    setProductsError(null)
    try {
      const response = await axios.get(`https://obaatanpa-backend.onrender.com/baby_products/categories/items/${categoryId}`, {
        headers: { Authorization: `Bearer ${authToken}` }
      })
      setCategoryItems(response.data.items[0][categories.find((cat: any) => cat.id === categoryId)?.name] || [])
    } catch (err: any) {
      console.error('Error fetching category items:', err.response?.data || err)
      const errorMessage = err.response?.status === 401
        ? 'Your session has expired. Please log in again.'
        : err.response?.status === 404
        ? 'Category items service not found. Please check if the server is running.'
        : `Failed to fetch category items: ${err.response?.data?.error || 'Please try again later.'}`
      setProductsError(errorMessage)
      if (err.response?.status === 401) {
        localStorage.removeItem('currentUser')
        localStorage.removeItem('authToken')
        setAuthToken(null)
      }
    } finally {
      setProductsLoading(false)
    }
  }

  // Toggle expanded state for journal entry
  const toggleEntry = (id: number) => {
    setExpandedEntries(prev =>
      prev.includes(id) ? prev.filter(e => e !== id) : [...prev, id]
    )
  }

  // Fetch journal and symptom entries on mount if authenticated
  useEffect(() => {
    if (authToken) {
      fetchJournalEntries()
      fetchSymptomEntries()
    }
  }, [authToken])

  // Get trimester-specific tools
  const getToolsForTrimester = () => {
    const baseTools = [
      {
        id: 'due-date-calculator',
        name: 'Due Date Calculator',
        description: 'Calculate your estimated due date',
        icon: Calendar,
        image: '/images/icons/logo.svg',
        available: true,
        popular: true
      },
      {
        id: 'weight-recommendation',
        name: 'Weight Recommendation',
        description: 'Get personalized weight gain recommendations',
        icon: Scale,
        image: '/images/icons/logo.svg',
        available: true,
        popular: true
      },
      // {
      //   id: 'baby-registry',
      //   name: 'Baby Registry',
      //   description: 'Create your baby wish list',
      //   icon: Gift,
      //   image: '/images/icons/logo.svg',
      //   available: pregnancyWeek >= 20,
      //   popular: false
      // },
      {
        id: 'baby-products',
        name: 'Baby Products Guide',
        description: 'Trimester-safe products',
        icon: ShoppingBag,
        image: '/images/icons/logo.svg',
        available: true,
        popular: false
      },
      {
        id: 'ovulation-calculator',
        name: 'Ovulation Calculator',
        description: 'Track your fertile days',
        icon: Calculator,
        image: '/images/icons/logo.svg',
        available: pregnancyWeek <= 4,
        popular: false
      },
      {
        id: 'feeding-tracker',
        name: 'Baby Feeding Tracker',
        description: 'Prepare for feeding schedule',
        icon: Milk,
        image: '/images/tools/feeding-tracker.jpg',
        available: pregnancyWeek >= 28,
        popular: false
      }
    ]

    return baseTools.filter(tool => tool.available)
  }

  // Get trimester-specific articles
  const getArticlesForTrimester = () => {
    const articles = {
      first: [
        {
          title: `What Happens in Week ${pregnancyWeek}?`,
          type: 'Video',
          readTime: '5 min',
          tags: ['Growth', 'Development'],
          thumbnail: '/images/resources/week-development.jpg'
        },
        {
          title: 'Managing Morning Sickness',
          type: 'Article',
          readTime: '7 min',
          tags: ['Nutrition', 'Health'],
          thumbnail: '/images/resources/morning-sickness.jpg'
        },
        {
          title: 'First Trimester Nutrition Guide',
          type: 'Article',
          readTime: '10 min',
          tags: ['Nutrition', 'Supplements'],
          thumbnail: '/images/resources/nutrition-first.jpg'
        }
      ],
      second: [
        {
          title: `Your Baby at Week ${pregnancyWeek}`,
          type: 'Video',
          readTime: '6 min',
          tags: ['Growth', 'Movement'],
          thumbnail: '/images/resources/second-trimester.jpg'
        },
        {
          title: 'Feeling Baby\'s First Movements',
          type: 'Article',
          readTime: '5 min',
          tags: ['Movement', 'Development'],
          thumbnail: '/images/resources/baby-movements.jpg'
        },
        {
          title: 'Safe Travel During Pregnancy',
          type: 'Article',
          readTime: '8 min',
          tags: ['Travel', 'Safety'],
          thumbnail: '/images/resources/travel-safety.jpg'
        }
      ],
      third: [
        {
          title: `Preparing for Birth - Week ${pregnancyWeek}`,
          type: 'Video',
          readTime: '8 min',
          tags: ['Birth', 'Preparation'],
          thumbnail: '/images/resources/birth-prep.jpg'
        },
        {
          title: 'Signs of Early Labor',
          type: 'Article',
          readTime: '6 min',
          tags: ['Labor', 'Signs'],
          thumbnail: '/images/resources/labor-signs.jpg'
        },
        {
          title: 'Hospital Bag Checklist',
          type: 'Article',
          readTime: '4 min',
          tags: ['Preparation', 'Checklist'],
          thumbnail: '/images/resources/hospital-bag.jpg'
        }
      ]
    }

    return articles[trimester] || []
  }

  // Get popular questions for trimester
  const getPopularQuestions = () => {
    const questions = {
      first: [
        "Is it safe to exercise in early pregnancy?",
        "What supplements should I take?",
        "How to deal with morning sickness?",
        "When should I tell people I'm pregnant?"
      ],
      second: [
        "Is it safe to travel in the second trimester?",
        "When will I feel baby movements?",
        "Can I eat pineapple during pregnancy?",
        "What is the anatomy scan?"
      ],
      third: [
        "What are the signs of labor?",
        "When should I pack my hospital bag?",
        "Is it normal to feel anxious about birth?",
        "How do I know if baby is ready?"
      ]
    }

    return questions[trimester] || []
  }

  // Get weekly tips
  const getWeeklyTips = () => {
    const tips = {
      first: "Focus on taking folic acid and managing morning sickness with small, frequent meals.",
      second: "Start feeling for baby movements and consider prenatal classes.",
      third: "Practice breathing exercises and finalize your birth plan."
    }

    return tips[trimester]
  }

  const tools = getToolsForTrimester()
  const articles = getArticlesForTrimester()
  const questions = getPopularQuestions()
  const weeklyTip = getWeeklyTips()

  const getTrimesterName = () => {
    const names = {
      first: 'First',
      second: 'Second',
      third: 'Third'
    }
    return names[trimester]
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5">
        <section className="relative bg-gradient-to-br from-[#F59297] to-[#7da8e6] text-white py-20 rounded-3xl overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <img
              src="/images/hero/pregnant-resources-hero.png"
              alt="Pregnant mother with resources"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = 'none'
              }}
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-[#F59297]/80 to-[#7da8e6]/80"></div>
          <div className="relative z-10 px-8 md:px-12 lg:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="text-center lg:text-left">
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  Your Pregnancy Tools & Resources
                </h1>
                <p className="text-xl md:text-2xl text-white/90 mb-8">
                  Everything you need for a safe, informed, and healthy pregnancy — based on your current trimester
                </p>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 max-w-md mx-auto lg:mx-0">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                      <Baby className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-left">
                      <h3 className="text-2xl font-bold">Week {pregnancyWeek}</h3>
                      <p className="text-white/80">{getTrimesterName()} Trimester</p>
                      <p className="text-sm text-white/70">We've curated the best tools for you</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-center lg:justify-end">
                <div className="relative">
                  <div className="w-80 h-80 lg:w-96 lg:h-96 rounded-3xl overflow-hidden shadow-2xl">
                    <img
                      src="/images/hero/pregnant-mother-resources.jpg"
                      alt="Pregnant mother using digital resources"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none'
                        const parent = e.currentTarget.parentElement
                        if (parent) {
                          parent.innerHTML = `<div className="w-full h-full bg-gradient-to-br from-[#F59297] to-[#7da8e6] rounded-3xl flex items-center justify-center text-white text-6xl">🤰</div>`
                        }
                      }}
                    />
                  </div>
                  <div className="absolute -top-4 -right-4 bg-white/20 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
                    <div className="text-center">
                      <div className="text-2xl mb-1">📱</div>
                      <p className="text-xs text-white font-semibold">Digital Tools</p>
                    </div>
                  </div>
                  <div className="absolute -bottom-4 -left-4 bg-white/20 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
                    <div className="text-center">
                      <div className="text-2xl mb-1">📚</div>
                      <p className="text-xs text-white font-semibold">Expert Guides</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Weekly Tips Section */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-[#7da8e6] to-[#F59297] rounded-3xl p-8 text-white">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                <Star className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-2">This Week's Must-Know Tips</h2>
                <p className="text-white/90 text-lg leading-relaxed">{weeklyTip}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Tools & Calculators */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Interactive Tools & Calculators
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Personalized tools to help you track and understand your pregnancy journey
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {tools.map((tool) => (
              <div
                key={tool.id}
                className="group bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100 dark:border-gray-700 hover:border-[#F59297]/30 relative"
                onClick={() => {
                  if (tool.id === 'due-date-calculator') {
                    if (authToken) {
                      setShowDueDateModal(true)
                    } else {
                      setDueDateError('Please log in to use the Due Date Calculator.')
                    }
                  } else if (tool.id === 'weight-recommendation') {
                    if (authToken) {
                      setShowWeightModal(true)
                    } else {
                      setWeightError('Please log in to use the Weight Recommendation tool.')
                    }
                  } else if (tool.id === 'baby-products') {
                    if (authToken) {
                      setShowBabyProductsModal(true)
                      fetchCategories()
                    } else {
                      setProductsError('Please log in to use the Baby Products Guide.')
                    }
                  }else if (tool.id === 'ovulation-calculator') {
                    if (authToken) {
                      setShowOvulationModal(true);
                    } else {
                      setOvulationError('Please log in to use the Ovulation Calculator.');
                    }
                }}}
              >
                {tool.popular && (
                  <div className="absolute -top-2 -right-2 bg-[#F59297] text-white text-xs px-3 py-1 rounded-full font-bold">
                    Popular
                  </div>
                )}
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-2xl overflow-hidden">
                    <img
                      src={tool.image}
                      alt={tool.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2 group-hover:text-[#F59297] transition-colors">
                    {tool.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                    {tool.description}
                  </p>
                  <button className="w-full bg-gradient-to-r from-[#F59297] to-[#7da8e6] text-white py-3 rounded-2xl font-semibold hover:shadow-lg transition-all duration-200 flex items-center justify-center">
                    <span>Use Now</span>
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          {(dueDateError || weightError || productsError|| ovulationError) && (
            <div className="mt-6 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-2xl p-4">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mt-0.5" />
                <div>
                  <p className="text-yellow-800 dark:text-yellow-200">{dueDateError || weightError || productsError|| ovulationError}</p>
                  <button
                    onClick={() => router.push('/login')}
                    className="mt-2 text-[#F59297] hover:text-[#e67d82] font-semibold underline"
                  >
                    Go to Login
                  </button>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Educational Articles & Videos */}

        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Learn More About Your Body & Baby
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Expert-curated content for your current stage of pregnancy
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Curated Reads */}
            {[
              {
                title: `Nutrition Tips for Your ${getTrimesterName()} Trimester`,
                type: 'Article',
                readTime: '8 min',
                tags: ['Nutrition', 'Health'],
                thumbnail: '/images/resources/nutrition-guide.jpg',
                url: 'https://www.healthline.com/health/pregnancy' 
              },
              {
                title: `Your Baby’s Development: Week ${pregnancyWeek}`,
                type: 'Article',
                readTime: '6 min',
                tags: ['Growth', 'Development'],
                thumbnail: '/images/resources/baby-development.jpg',
                url: 'https://www.mayoclinic.org/healthy-pregnancy-diet'
              },
              {
                title: `Managing ${getTrimesterName()} Trimester Symptoms`,
                type: 'Article',
                readTime: '7 min',
                tags: ['Symptoms', 'Wellness'],
                thumbnail: '/images/resources/pregnancy-symptoms.jpg',
                url: 'https://www.nhs.uk/pregnancy/keeping-well/exercise/'
              }
            ].map((article, index) => (
              <a
                key={`article-${index}`}
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={article.thumbnail}
                    alt={article.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      const parent = e.currentTarget.parentElement;
                      if (parent) {
                        parent.innerHTML = `<div className="w-full h-full bg-gradient-to-br from-[#F59297] to-[#7da8e6] flex items-center justify-center text-white text-4xl">📖</div>`;
                      }
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center">
                      <BookOpen className="w-8 h-8 text-[#F59297]" />
                    </div>
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className="bg-[#F59297] text-white text-xs px-3 py-1 rounded-full font-semibold">
                      {article.type}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2 group-hover:text-[#F59297] transition-colors">
                    {article.title}
                  </h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      <span>{article.readTime}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {article.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="bg-[#F59297]/10 text-[#F59297] px-2 py-1 rounded-full text-xs font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="text-[#F59297] font-semibold hover:underline flex items-center">
                    Read More
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </span>
                </div>
              </a>
            ))}
            {/* Recipe Videos */}
            {[
              {
                title: 'Sweet Adjeley’s Jollof Rice Recipe',
                type: 'Video',
                readTime: '10 min',
                tags: ['Recipe', 'Nutrition'],
                thumbnail: 'https://img.youtube.com/vi/gyfHLPfI2NM/maxresdefault.jpg',
                url: 'https://www.youtube.com/watch?v=gyfHLPfI2NM'
              },
              {
                title: 'Sweet Adjeley’s Vegetable Soup Recipe',
                type: 'Video',
                readTime: '12 min',
                tags: ['Recipe', 'Nutrition'],
                thumbnail: 'https://img.youtube.com/vi/poHz_4CXI7E/maxresdefault.jpg',
                url: 'https://www.youtube.com/watch?v=poHz_4CXI7E'
              }
            ].map((video, index) => (
              <a
                key={`recipe-video-${index}`}
                href={video.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      const parent = e.currentTarget.parentElement;
                      if (parent) {
                        parent.innerHTML = `<div className="w-full h-full bg-gradient-to-br from-[#F59297] to-[#7da8e6] flex items-center justify-center text-white text-4xl">▶️</div>`;
                      }
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center">
                      <Play className="w-8 h-8 text-[#F59297] ml-1" />
                    </div>
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className="bg-[#F59297] text-white text-xs px-3 py-1 rounded-full font-semibold">
                      {video.type}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2 group-hover:text-[#F59297] transition-colors">
                    {video.title}
                  </h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      <span>{video.readTime}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {video.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="bg-[#F59297]/10 text-[#F59297] px-2 py-1 rounded-full text-xs font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="text-[#F59297] font-semibold hover:underline flex items-center">
                    Watch Now
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </span>
                </div>
              </a>
            ))}
            {/* Exercise Videos */}
            {[
              {
                title: 'Pregnancy-Safe Workout for Black Women',
                type: 'Video',
                readTime: '15 min',
                tags: ['Exercise', 'Fitness'],
                thumbnail: 'https://img.youtube.com/vi/1mVHczU_qSA/maxresdefault.jpg',
                url: 'https://www.youtube.com/watch?v=1mVHczU_qSA'
              },
              {
                title: 'Safe Prenatal Exercise Routine',
                type: 'Video',
                readTime: '20 min',
                tags: ['Exercise', 'Fitness'],
                thumbnail: 'https://img.youtube.com/vi/SVMRCH5CpGA/maxresdefault.jpg',
                url: 'https://www.youtube.com/watch?v=SVMRCH5CpGA'
              }
            ].map((video, index) => (
              <a
                key={`exercise-video-${index}`}
                href={video.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      const parent = e.currentTarget.parentElement;
                      if (parent) {
                        parent.innerHTML = `<div className="w-full h-full bg-gradient-to-br from-[#F59297] to-[#7da8e6] flex items-center justify-center text-white text-4xl">▶️</div>`;
                      }
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center">
                      <Play className="w-8 h-8 text-[#F59297] ml-1" />
                    </div>
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className="bg-[#F59297] text-white text-xs px-3 py-1 rounded-full font-semibold">
                      {video.type}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2 group-hover:text-[#F59297] transition-colors">
                    {video.title}
                  </h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      <span>{video.readTime}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {video.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="bg-[#F59297]/10 text-[#F59297] px-2 py-1 rounded-full text-xs font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="text-[#F59297] font-semibold hover:underline flex items-center">
                    Watch Now
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </span>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Popular Questions */}

        <section className="mb-16">
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Popular Questions & Answers
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Quick answers to common {trimester} trimester questions
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {questions.map((question, index) => {
                const isExpanded = expandedEntries.includes(index);
                // Define trimester-specific answers
                const answers = {
                  first: {
                    "Is it safe to exercise in early pregnancy?": "Yes, low-impact exercises like walking or prenatal yoga are generally safe. Consult your doctor before starting, especially if you have complications.",
                    "What supplements should I take?": "Folic acid (400-800 mcg daily) is essential to prevent neural tube defects. Your doctor may recommend a prenatal vitamin with iron and DHA.",
                    "How to deal with morning sickness?": "Eat small, frequent meals, avoid spicy foods, and try ginger tea or acupressure bands. Consult your doctor if severe.",
                    "When should I tell people I'm pregnant?": "Most wait until after the first trimester (week 12) when miscarriage risk decreases, but it’s a personal choice."
                  },
                  second: {
                    "Is it safe to travel in the second trimester?": "Yes, the second trimester is generally the safest time to travel. Stay hydrated, move regularly, and check with your doctor for long trips.",
                    "When will I feel baby movements?": "Most women feel the first movements (quickening) between 16-25 weeks, often earlier for second-time moms.",
                    "Can I eat pineapple during pregnancy?": "Yes, in moderation. Pineapple contains bromelain, but the amount in a typical serving is safe.",
                    "What is the anatomy scan?": "A detailed ultrasound around 18-20 weeks to check your baby’s development, organs, and detect any abnormalities."
                  },
                  third: {
                    "What are the signs of labor?": "Look for regular contractions, water breaking, lower back pain, or a bloody show. Contact your doctor if these occur.",
                    "When should I pack my hospital bag?": "Pack by 34-36 weeks. Include essentials like clothes, toiletries, and baby items like diapers and onesies.",
                    "Is it normal to feel anxious about birth?": "Yes, it’s common. Discuss fears with your doctor, consider childbirth classes, or talk to a counselor for support.",
                    "How do I know if baby is ready?": "By 37 weeks, babies are typically full-term. Regular checkups and monitoring fetal movements ensure readiness."
                  }
                };
                const answer = answers[trimester][question] || "Consult your healthcare provider for personalized advice.";
                
                return (
                  <div
                    key={index}
                    className="p-6 border-2 border-gray-200 dark:border-gray-700 rounded-2xl hover:border-[#F59297] hover:bg-[#F59297]/5 transition-all duration-200 cursor-pointer group"
                    onClick={() => toggleEntry(index)}
                  >
                    <div className="flex items-start justify-between space-x-4">
                      <div className="flex items-start space-x-4 flex-1">
                        <div className="w-8 h-8 bg-[#F59297]/10 rounded-full flex items-center justify-center flex-shrink-0">
                          <HelpCircle className="w-5 h-5 text-[#F59297]" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-[#F59297] transition-colors">
                            {question}
                          </h3>
                          {isExpanded && (
                            <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">{answer}</p>
                          )}
                        </div>
                      </div>
                      {isExpanded ? (
                        <ChevronUp className="w-5 h-5 text-gray-400 group-hover:text-[#F59297] transition-colors" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-400 group-hover:text-[#F59297] transition-colors" />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Pregnancy Milestones Tracker */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Your Pregnancy Milestones
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Track important pregnancy milestones and upcoming appointments
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-green-50 dark:bg-green-900/10 rounded-3xl p-8 border-2 border-green-200 dark:border-green-800">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-green-500 rounded-2xl flex items-center justify-center mr-4">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-green-800 dark:text-green-300">Completed</h3>
                  <p className="text-green-600 dark:text-green-400">Great progress so far!</p>
                </div>
              </div>
              <div className="space-y-4">
                {pregnancyWeek >= 8 && (
                  <div className="flex items-center space-x-3 p-3 bg-white/50 dark:bg-gray-800/50 rounded-xl">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <span className="text-gray-900 dark:text-white font-medium">First prenatal visit</span>
                  </div>
                )}
                {pregnancyWeek >= 12 && (
                  <div className="flex items-center space-x-3 p-3 bg-white/50 dark:bg-gray-800/50 rounded-xl">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <span className="text-gray-900 dark:text-white font-medium">First trimester screening</span>
                  </div>
                )}
                {pregnancyWeek >= 20 && (
                  <div className="flex items-center space-x-3 p-3 bg-white/50 dark:bg-gray-800/50 rounded-xl">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <span className="text-gray-900 dark:text-white font-medium">Anatomy scan (20 weeks)</span>
                  </div>
                )}
              </div>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/10 rounded-3xl p-8 border-2 border-blue-200 dark:border-blue-800">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center mr-4">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-blue-800 dark:text-blue-300">Coming Up</h3>
                  <p className="text-blue-600 dark:text-blue-400">Important upcoming milestones</p>
                </div>
              </div>
              <div className="space-y-4">
                {pregnancyWeek < 24 && (
                  <div className="flex items-center space-x-3 p-3 bg-white/50 dark:bg-gray-800/50 rounded-xl">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                      <Clock className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-gray-900 dark:text-white font-medium">Glucose screening (24-28 weeks)</span>
                  </div>
                )}
                {pregnancyWeek < 32 && (
                  <div className="flex items-center space-x-3 p-3 bg-white/50 dark:bg-gray-800/50 rounded-xl">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                      <Clock className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-gray-900 dark:text-white font-medium">Third trimester begins (28 weeks)</span>
                  </div>
                )}
                {pregnancyWeek < 36 && (
                  <div className="flex items-center space-x-3 p-3 bg-white/50 dark:bg-gray-800/50 rounded-xl">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                      <Clock className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-gray-900 dark:text-white font-medium">Weekly checkups begin (36 weeks)</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Pregnancy Symptoms Tracker */}
        <section className="mb-16">
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Track Your Symptoms & Journal
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Log your symptoms for analysis or journal your pregnancy journey
              </p>
            </div>

            {journalError && !authToken && (
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-2xl p-4 mb-6">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mt-0.5" />
                  <div>
                    <p className="text-yellow-800 dark:text-yellow-200">{journalError}</p>
                    <button
                      onClick={() => router.push('/login')}
                      className="mt-2 text-[#F59297] hover:text-[#e67d82] font-semibold underline"
                    >
                      Go to Login
                    </button>
                  </div>
                </div>
              </div>
            )}

            {authToken ? (
              <>
                <div className="flex space-x-4 mb-8">
                  <button
                    onClick={() => {
                      setShowJournalForm(!showJournalForm)
                      setShowSymptomForm(false)
                      setJournalEntry('')
                      setSymptomsInput('')
                    }}
                    className="group flex-1 bg-[#F59297] hover:bg-[#e67d82] text-white py-3 rounded-2xl font-semibold hover:shadow-lg transition-all duration-200 flex items-center justify-center"
                  >
                    New Journal Entry
                    <Plus className="w-5 h-5 ml-2" />
                  </button>
                  <button
                    onClick={() => {
                      setShowSymptomForm(!showSymptomForm)
                      setShowJournalForm(false)
                      setJournalEntry('')
                      setSymptomsInput('')
                    }}
                    className="group flex-1 bg-[#7da8e6] hover:bg-[#6c97d5] text-white py-3 rounded-2xl font-semibold hover:shadow-lg transition-all duration-200 flex items-center justify-center"
                  >
                    Track Symptoms
                    <Plus className="w-5 h-5 ml-2" />
                  </button>
                </div>

                {showJournalForm && (
                  <div className="mb-8 p-6 bg-gray-50 dark:bg-gray-700 rounded-2xl">
                    <textarea
                      value={journalEntry}
                      onChange={(e) => setJournalEntry(e.target.value)}
                      placeholder="Write about how you're feeling today..."
                      className="w-full h-32 p-4 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#F59297] focus:border-transparent"
                    />
                    <button
                      onClick={handleJournalSubmit}
                      disabled={journalLoading || !journalEntry.trim()}
                      className={`w-full mt-4 flex items-center justify-center py-3 rounded-2xl font-semibold transition-colors ${
                        journalLoading || !journalEntry.trim()
                          ? 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed'
                          : 'bg-[#F59297] hover:bg-[#e67d82] text-white'
                      }`}
                    >
                      {journalLoading ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        'Submit Journal'
                      )}
                    </button>
                  </div>
                )}

                {showSymptomForm && (
                  <div className="mb-8 p-6 bg-gray-50 dark:bg-gray-700 rounded-2xl">
                    <textarea
                      value={symptomsInput}
                      onChange={(e) => setSymptomsInput(e.target.value)}
                      placeholder="Enter symptoms (e.g., headache, nausea, fatigue) separated by commas"
                      className="w-full h-32 p-4 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#F59297] focus:border-transparent"
                    />
                    <button
                      onClick={handleSymptomSubmit}
                      disabled={journalLoading || !symptomsInput.trim()}
                      className={`w-full mt-4 flex items-center justify-center py-3 rounded-2xl font-semibold transition-colors ${
                        journalLoading || !symptomsInput.trim()
                          ? 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed'
                          : 'bg-[#7da8e6] hover:bg-[#6c97d5] text-white'
                      }`}
                    >
                      {journalLoading ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                          Analyzing...
                        </>
                      ) : (
                        'Analyze Symptoms'
                      )}
                    </button>
                  </div>
                )}

                <div className="mb-8">
                  <button
                    onClick={() => setShowPastEntries(!showPastEntries)}
                    className="w-full bg-gradient-to-r from-[#F59297] to-[#7da8e6] text-white py-3 rounded-2xl font-semibold hover:shadow-lg transition-all duration-200 flex items-center justify-center"
                  >
                    {showPastEntries ? 'Hide Past Entries' : 'View Past Entries'}
                  </button>
                </div>

                {showPastEntries && (
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Past Entries</h3>
                    {journalLoading ? (
                      <div className="text-center">
                        <Loader2 className="w-8 h-8 animate-spin text-[#F59297] mx-auto" />
                        <p className="text-gray-600 dark:text-gray-400 mt-2">Loading entries...</p>
                      </div>
                    ) : journalEntries.length > 0 ? (
                      journalEntries.map((entry) => (
                        <div
                          key={entry.id}
                          className="bg-gray-50 dark:bg-gray-700 rounded-2xl p-6 border border-gray-200 dark:border-gray-600"
                        >
                          <div
                            className="flex items-center justify-between cursor-pointer"
                            onClick={() => toggleEntry(entry.id)}
                          >
                            <div>
                              <h4 className="font-semibold text-gray-900 dark:text-white">
                                {entry.entry ? entry.entry.substring(0, 50) + (entry.entry.length > 50 ? '...' : '') : 'Symptom Analysis'}
                              </h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400">{new Date(entry.created_at).toLocaleString()}</p>
                            </div>
                            {expandedEntries.includes(entry.id) ? (
                              <ChevronUp className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                            ) : (
                              <ChevronDown className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                            )}
                          </div>
                          {expandedEntries.includes(entry.id) && (
                            <div className="mt-4 space-y-4">
                              {entry.entry && (
                                <div>
                                  <h5 className="font-semibold text-gray-900 dark:text-white">Journal Entry</h5>
                                  <p className="text-gray-600 dark:text-gray-300">{entry.entry}</p>
                                </div>
                              )}
                              <div>
                                <h5 className="font-semibold text-gray-900 dark:text-white">Symptom Analysis</h5>
                                {entry.symptoms.possibleConditions.length > 0 ? (
                                  entry.symptoms.possibleConditions.map((condition, index) => (
                                    <div key={index} className="mt-2">
                                      <h6 className="font-medium text-gray-900 dark:text-white">{condition.condition}</h6>
                                      <p className="text-sm text-gray-600 dark:text-gray-300">{condition.description}</p>
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
                                  ))
                                ) : (
                                  <p className="text-sm text-gray-600 dark:text-gray-300">No conditions identified.</p>
                                )}
                                <div className="mt-2">
                                  <h6 className="font-medium text-gray-900 dark:text-white">General Advice</h6>
                                  <p className="text-sm text-gray-600 dark:text-gray-300">
                                    <strong>Recommended Actions:</strong> {entry.symptoms.generalAdvice.recommendedActions.join(', ') || 'None'}
                                  </p>
                                  <p className="text-sm text-gray-600 dark:text-gray-300">
                                    <strong>Lifestyle Considerations:</strong> {entry.symptoms.generalAdvice.lifestyleConsiderations.join(', ') || 'None'}
                                  </p>
                                  <p className="text-sm text-gray-600 dark:text-gray-300">
                                    <strong>When to Seek Medical Attention:</strong> {entry.symptoms.generalAdvice.whenToSeekMedicalAttention.join(', ') || 'None'}
                                  </p>
                                </div>
                              </div>
                              <button
                                onClick={() => handleDeleteEntry(entry.id)}
                                className="mt-4 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-xl font-semibold transition-colors"
                              >
                                Delete Entry
                              </button>
                            </div>
                          )}
                        </div>
                      ))
                    ) : (
                      <p className="text-center text-gray-600 dark:text-gray-400">
                        No entries yet. Add a journal entry or track symptoms above.
                      </p>
                    )}
                  </div>
                )}
              </>
            ) : (
              <div className="text-center">
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Please log in to access the symptom tracker and journal features.
                </p>
                <button
                  onClick={() => router.push('/login')}
                  className="bg-[#F59297] hover:bg-[#e67d82] text-white py-3 px-6 rounded-2xl font-semibold transition-colors"
                >
                  Log In
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Local Resources & Services
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Local Resources & Services
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Find pregnancy and baby services near you in Ghana
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-2xl flex items-center justify-center mr-4">
                  <span className="text-2xl">🏥</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Hospitals & Clinics</h3>
              </div>
              <div className="space-y-3">
                <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-xl">
                  <h4 className="font-semibold text-gray-900 dark:text-white">Korle-Bu Teaching Hospital</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">2.3 km away • Maternity ward</p>
                </div>
                <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-xl">
                  <h4 className="font-semibold text-gray-900 dark:text-white">37 Military Hospital</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">4.1 km away • Private rooms</p>
                </div>
              </div>
              <button className="w-full mt-4 text-[#F59297] font-semibold hover:underline">
                View All Hospitals
              </button>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-2xl flex items-center justify-center mr-4">
                  <span className="text-2xl">💊</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Pharmacies</h3>
              </div>
              <div className="space-y-3">
                <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-xl">
                  <h4 className="font-semibold text-gray-900 dark:text-white">Ernest Chemist</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">0.8 km away • Open 24/7</p>
                </div>
                <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-xl">
                  <h4 className="font-semibold text-gray-900 dark:text-white">Kama Pharmacy</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">1.2 km away • Prenatal vitamins</p>
                </div>
              </div>
              <button className="w-full mt-4 text-[#F59297] font-semibold hover:underline">
                Find More Pharmacies
              </button>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-2xl flex items-center justify-center mr-4">
                  <span className="text-2xl">🛍️</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Baby Stores</h3>
              </div>
              <div className="space-y-3">
                <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-xl">
                  <h4 className="font-semibold text-gray-900 dark:text-white">Baby World Ghana</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">3.5 km away • Everything for baby</p>
                </div>
                <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-xl">
                  <h4 className="font-semibold text-gray-900 dark:text-white">Mothercare Accra</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">5.2 km away • Premium brands</p>
                </div>
              </div>
              <button className="w-full mt-4 text-[#F59297] font-semibold hover:underline">
                Explore Baby Stores
              </button>
            </div>
          </div>
        </section> */}

        {/* Pregnancy Journal & Memory Book
        <section className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-[#F59297] to-[#7da8e6] rounded-3xl p-8 text-white">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mr-4">
                  <span className="text-2xl">📝</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold">Digital Pregnancy Journal</h3>
                  <p className="text-white/80">Document your journey</p>
                </div>
              </div>
              <div className="space-y-4 mb-6">
                <div className="bg-white/10 rounded-xl p-4">
                  <h4 className="font-semibold mb-2">Week {pregnancyWeek} Entry</h4>
                  <p className="text-white/80 text-sm">How are you feeling this week? Share your thoughts, symptoms, and exciting moments.</p>
                </div>
                <div className="bg-white/10 rounded-xl p-4">
                  <h4 className="font-semibold mb-2">Photo Memories</h4>
                  <p className="text-white/80 text-sm">Upload your bump photos and ultrasound images to create a beautiful timeline.</p>
                </div>
              </div>
              <button
                onClick={() => {
                  if (authToken) {
                    setShowJournalForm(true)
                    setShowSymptomForm(false)
                  } else {
                    setJournalError('Please log in to access the journal.')
                  }
                }}
                className="w-full bg-white text-[#F59297] py-3 rounded-2xl font-bold hover:bg-white/90 transition-colors duration-200"
              >
                Start Writing
              </button>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-[#F59297]/10 rounded-2xl flex items-center justify-center mr-4">
                  <span className="text-2xl">🎯</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Milestone Tracker</h3>
                  <p className="text-gray-600 dark:text-gray-400">Celebrate every moment</p>
                </div>
              </div>
              <div className="space-y-4">
                {[
                  { milestone: 'First positive test', date: 'Completed', status: 'done' },
                  { milestone: 'First doctor visit', date: 'Completed', status: 'done' },
                  { milestone: 'First ultrasound', date: 'Completed', status: 'done' },
                  { milestone: 'Gender reveal', date: 'Week 20', status: pregnancyWeek >= 20 ? 'done' : 'upcoming' },
                  { milestone: 'Baby shower', date: 'Week 32', status: pregnancyWeek >= 32 ? 'done' : 'upcoming' },
                  { milestone: 'Hospital bag packed', date: 'Week 36', status: pregnancyWeek >= 36 ? 'done' : 'upcoming' }
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-xl">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                      item.status === 'done'
                        ? 'bg-green-500'
                        : 'bg-gray-300 dark:bg-gray-600'
                    }`}>
                      {item.status === 'done' && <span className="text-white text-xs">✓</span>}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 dark:text-white">{item.milestone}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{item.date}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-6 bg-gradient-to-r from-[#F59297] to-[#7da8e6] text-white py-3 rounded-2xl font-semibold hover:shadow-lg transition-all duration-200">
                View Full Timeline
              </button>
            </div>
          </div>
        </section> */}
      </div>

      {/* Emergency Floating Button */}
      <button
        onClick={() => setShowEmergencyModal(true)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center z-50"
      >
        <AlertTriangle className="w-8 h-8" />
      </button>

      {/* Chatbot Button */}
      <button
        onClick={() => setShowChatbot(true)}
        className="fixed bottom-6 right-24 w-14 h-14 bg-[#F59297] hover:bg-[#e67d82] text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center z-50"
      >
        <MessageCircle className="w-6 h-6" />
      </button>

      {/* Due Date Calculator Modal */}
      {showDueDateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 max-w-md w-full">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Due Date Calculator</h3>
              <button
                onClick={() => {
                  setShowDueDateModal(false)
                  setDueDateMethod(null)
                  setDueDateResult(null)
                  setDueDateError(null)
                  setLastPeriodDate('')
                  setCycleLength('5')
                  setConceptionDate('')
                }}
                className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {!authToken ? (
              <div className="text-center">
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Please log in to use the Due Date Calculator.
                </p>
                <button
                  onClick={() => router.push('/login')}
                  className="bg-[#F59297] hover:bg-[#e67d82] text-white py-3 px-6 rounded-2xl font-semibold transition-colors"
                >
                  Log In
                </button>
              </div>
            ) : !dueDateMethod ? (
              <div className="space-y-4">
                <p className="text-gray-600 dark:text-gray-400">Choose a method to calculate your due date:</p>
                <button
                  onClick={() => setDueDateMethod('menstrual')}
                  className="w-full bg-[#F59297] text-white py-3 rounded-2xl font-semibold hover:bg-[#e67d82] transition-colors"
                >
                  Last Menstrual Period
                </button>
                <button
                  onClick={() => setDueDateMethod('conception')}
                  className="w-full bg-[#7da8e6] text-white py-3 rounded-2xl font-semibold hover:bg-[#6c97d5] transition-colors"
                >
                  Conception Date
                </button>
              </div>
            ) : dueDateMethod === 'menstrual' ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-900 dark:text-white font-medium mb-2">
                    Last Menstrual Period Date
                  </label>
                  <input
                    type="date"
                    value={lastPeriodDate}
                    onChange={(e) => setLastPeriodDate(e.target.value)}
                    className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#F59297] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-gray-900 dark:text-white font-medium mb-2">
                    Cycle Length (days)
                  </label>
                  <input
                    type="number"
                    value={cycleLength}
                    onChange={(e) => setCycleLength(e.target.value)}
                    min="1"
                    className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#F59297] focus:border-transparent"
                  />
                </div>
                {dueDateError && (
                  <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-4">
                    <div className="flex items-start space-x-3">
                      <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5" />
                      <p className="text-red-800 dark:text-red-200">{dueDateError}</p>
                    </div>
                  </div>
                )}
                {dueDateResult && (
                  <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-2xl p-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white">Your Due Date Results</h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      <strong>Due Date:</strong> {dueDateResult.due_date}
                    </p>
                    {/* <p className="text-gray-600 dark:text-gray-300">
                      <strong>Gestational Age:</strong> {dueDateResult.gestational_age}
                    </p>
                    <p className="text-gray-600 dark:text-gray-300">
                      <strong>Trimester:</strong> {dueDateResult.trimester} */}
                    {/* </p> */}
                  </div>
                )}
                <button
                  onClick={handleDueDateSubmit}
                  disabled={dueDateLoading || !lastPeriodDate || !cycleLength}
                  className={`w-full flex items-center justify-center py-3 rounded-2xl font-semibold transition-colors ${
                    dueDateLoading || !lastPeriodDate || !cycleLength
                      ? 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed'
                      : 'bg-[#F59297] hover:bg-[#e67d82] text-white'
                  }`}
                >
                  {dueDateLoading ? (
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
                    setDueDateMethod(null)
                    setDueDateResult(null)
                    setDueDateError(null)
                    setLastPeriodDate('')
                    setCycleLength('5')
                  }}
                  className="w-full bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white py-3 rounded-2xl font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                >
                  Back
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-900 dark:text-white font-medium mb-2">
                    Conception Date
                  </label>
                  <input
                    type="date"
                    value={conceptionDate}
                    onChange={(e) => setConceptionDate(e.target.value)}
                    className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#F59297] focus:border-transparent"
                  />
                </div>
                {dueDateError && (
                  <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-4">
                    <div className="flex items-start space-x-3">
                      <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5" />
                      <p className="text-red-800 dark:text-red-200">{dueDateError}</p>
                    </div>
                  </div>
                )}
                {dueDateResult &&(
                  <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-2xl p-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white">Your Due Date Results</h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    <strong>Due Date:</strong> {dueDateResult.due_date}
                  </p>
                  {/* <p className="text-gray-600 dark:text-gray-300">
                    <strong>Gestational Age:</strong> {dueDateResult.gestational_age}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">
                    <strong>Trimester:</strong> {dueDateResult.trimester}
                  </p> */}
                </div>
              )}
              <button
                onClick={handleDueDateSubmit}
                disabled={dueDateLoading || !conceptionDate}
                className={`w-full flex items-center justify-center py-3 rounded-2xl font-semibold transition-colors ${
                  dueDateLoading || !conceptionDate
                    ? 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed'
                    : 'bg-[#F59297] hover:bg-[#e67d82] text-white'
                }`}
              >
                {dueDateLoading ? (
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
                  setDueDateMethod(null)
                  setDueDateResult(null)
                  setDueDateError(null)
                  setConceptionDate('')
                }}
                className="w-full bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white py-3 rounded-2xl font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                Back
              </button>
            </div>
          )}
        </div>
      </div>
    )}

    {/* Ovulation Calculator Modal */}
    {showOvulationModal && (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 max-w-md w-full">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Ovulation Calculator</h3>
            <button
              onClick={() => {
                setShowOvulationModal(false);
                setOvulationLastPeriod('');
                setOvulationCycleLength('5');
                setOvulationResult(null);
                setOvulationError(null);
              }}
              className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          {!authToken ? (
            <div className="text-center">
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Please log in to use the Ovulation Calculator.
              </p>
              <button
                onClick={() => router.push('/login')}
                className="bg-[#F59297] hover:bg-[#e67d82] text-white py-3 px-6 rounded-2xl font-semibold transition-colors"
              >
                Log In
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-gray-900 dark:text-white font-medium mb-2">
                  Last Menstrual Period Date
                </label>
                <input
                  type="date"
                  value={ovulationLastPeriod}
                  onChange={(e) => setOvulationLastPeriod(e.target.value)}
                  className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#F59297] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-gray-900 dark:text-white font-medium mb-2">
                  Cycle Length (days)
                </label>
                <input
                  type="number"
                  value={ovulationCycleLength}
                  onChange={(e) => setOvulationCycleLength(e.target.value)}
                  min="1"
                  className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#F59297] focus:border-transparent"
                />
              </div>
              {ovulationError && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-4">
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5" />
                    <p className="text-red-800 dark:text-red-200">{ovulationError}</p>
                  </div>
                </div>
              )}
              {ovulationResult && (
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-2xl p-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white">Ovulation Date</h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    <strong>Estimated Ovulation Date:</strong> {ovulationResult.ovulation_date}
                  </p>
                </div>
              )}
              <button
                onClick={handleOvulationCalculation}
                disabled={ovulationLoading || !ovulationLastPeriod || !ovulationCycleLength}
                className={`w-full flex items-center justify-center py-3 rounded-2xl font-semibold transition-colors ${
                  ovulationLoading || !ovulationLastPeriod || !ovulationCycleLength
                    ? 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed'
                    : 'bg-[#F59297] hover:bg-[#e67d82] text-white'
                }`}
              >
                {ovulationLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Calculating...
                  </>
                ) : (
                  'Calculate'
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    )}

    {/* Weight Recommendation Modal */}
    {showWeightModal && (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 max-w-md w-full">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Weight Recommendation</h3>
            <button
              onClick={() => {
                setShowWeightModal(false)
                setPrePregnancyWeight('')
                setHeight('')
                setGestationalAge('')
                setWeightResult(null)
                setWeightError(null)
              }}
              className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          {!authToken ? (
            <div className="text-center">
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Please log in to use the Weight Recommendation tool.
              </p>
              <button
                onClick={() => router.push('/login')}
                className="bg-[#F59297] hover:bg-[#e67d82] text-white py-3 px-6 rounded-2xl font-semibold transition-colors"
              >
                Log In
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-gray-900 dark:text-white font-medium mb-2">
                  Pre-Pregnancy Weight (kg)
                </label>
                <input
                  type="number"
                  value={prePregnancyWeight}
                  onChange={(e) => setPrePregnancyWeight(e.target.value)}
                  placeholder="Enter weight in kg"
                  className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#F59297] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-gray-900 dark:text-white font-medium mb-2">
                  Height (cm)
                </label>
                <input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  placeholder="Enter height in cm"
                  className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#F59297] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-gray-900 dark:text-white font-medium mb-2">
                  Gestational Age (weeks)
                </label>
                <input
                  type="number"
                  value={gestationalAge}
                  onChange={(e) => setGestationalAge(e.target.value)}
                  placeholder="Enter gestational age"
                  className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#F59297] focus:border-transparent"
                />
              </div>
              {weightError && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-4">
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5" />
                    <p className="text-red-800 dark:text-red-200">{weightError}</p>
                  </div>
                </div>
              )}
              {weightResult && (
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-2xl p-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white">Weight Recommendation</h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    <strong>Recommended Weight Gain:</strong> {weightResult.recommended_weight_gain_kg} kg
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">
                    <strong>BMI:</strong> {weightResult.bmi} - {weightResult.healthy_range_max} kg
                  </p>
                </div>
              )}
              <button
                onClick={handleWeightRecommendation}
                disabled={weightLoading || !prePregnancyWeight || !height || !gestationalAge}
                className={`w-full flex items-center justify-center py-3 rounded-2xl font-semibold transition-colors ${
                  weightLoading || !prePregnancyWeight || !height || !gestationalAge
                    ? 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed'
                    : 'bg-[#F59297] hover:bg-[#e67d82] text-white'
                }`}
              >
                {weightLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Calculating...
                  </>
                ) : (
                  'Get Recommendation'
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    )}

    {/* Baby Products Modal */}
    {showBabyProductsModal && (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 max-w-lg w-full">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Baby Products Guide</h3>
            <button
              onClick={() => {
                setShowBabyProductsModal(false)
                setSelectedCategory(null)
                setCategories([])
                setCategoryItems([])
                setProductsError(null)
              }}
              className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          {!authToken ? (
            <div className="text-center">
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Please log in to access the Baby Products Guide.
              </p>
              <button
                onClick={() => router.push('/login')}
                className="bg-[#F59297] hover:bg-[#e67d82] text-white py-3 px-6 rounded-2xl font-semibold transition-colors"
              >
                Log In
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {productsLoading ? (
                <div className="text-center">
                  <Loader2 className="w-8 h-8 animate-spin text-[#F59297] mx-auto" />
                  <p className="text-gray-600 dark:text-gray-400 mt-2">Loading products...</p>
                </div>
              ) : productsError ? (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-4">
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5" />
                    <p className="text-red-800 dark:text-red-200">{productsError}</p>
                  </div>
                </div>
              ) : !selectedCategory ? (
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Select a Category</h4>
                  <div className="space-y-3">
                    {categories.map((category: any) => (
                      <button
                        key={category.id}
                        onClick={() => {
                          setSelectedCategory(category.id)
                          fetchCategoryItems(category.id)
                        }}
                        className="w-full text-left p-3 bg-gray-50 dark:bg-gray-700 rounded-xl hover:bg-[#F59297]/10 transition-colors"
                      >
                        <span className="font-medium text-gray-900 dark:text-white">{category.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div>
                  <button
                    onClick={() => {
                      setSelectedCategory(null)
                      setCategoryItems([])
                    }}
                    className="mb-4 text-[#F59297] hover:text-[#e67d82] font-semibold underline"
                  >
                    Back to Categories
                  </button>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
                    {categories.find((cat: any) => cat.id === selectedCategory)?.name} Products
                  </h4>
                  <div className="space-y-3">
                    {categoryItems.length > 0 ? (
                      categoryItems.map((item: any, index: number) => (
                        <div key={index} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-xl">
                          <h5 className="font-semibold text-gray-900 dark:text-white">{item.name}</h5>
                          <p className="text-sm text-gray-600 dark:text-gray-300">{item.description}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            <strong>Price:</strong> {item.price || 'N/A'}
                          </p>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-600 dark:text-gray-400">No products found in this category.</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    )}

    {/* Symptom Analysis Modal */}
    {showAnalysisModal && analysisResult && (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 max-w-lg w-full max-h-[80vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Symptom Analysis</h3>
            <button
              onClick={() => setShowAnalysisModal(false)}
              className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Possible Conditions</h4>
              {analysisResult.possibleConditions.length > 0 ? (
                analysisResult.possibleConditions.map((condition, index) => (
                  <div key={index} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl mb-3">
                    <h5 className="font-medium text-gray-900 dark:text-white">{condition.condition}</h5>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{condition.description}</p>
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
                ))
              ) : (
                <p className="text-gray-600 dark:text-gray-400">No conditions identified based on your symptoms.</p>
              )}
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">General Advice</h4>
              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  <strong>Recommended Actions:</strong>{' '}
                  {analysisResult.generalAdvice.recommendedActions.length > 0
                    ? analysisResult.generalAdvice.recommendedActions.join(', ')
                    : 'None'}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  <strong>Lifestyle Considerations:</strong>{' '}
                  {analysisResult.generalAdvice.lifestyleConsiderations.length > 0
                    ? analysisResult.generalAdvice.lifestyleConsiderations.join(', ')
                    : 'None'}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  <strong>When to Seek Medical Attention:</strong>{' '}
                  {analysisResult.generalAdvice.whenToSeekMedicalAttention.length > 0
                    ? analysisResult.generalAdvice.whenToSeekMedicalAttention.join(', ')
                    : 'None'}
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowAnalysisModal(false)}
              className="w-full bg-[#F59297] hover:bg-[#e67d82] text-white py-3 rounded-2xl font-semibold transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    )}

    {/* Emergency Modal */}
    {showEmergencyModal && (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 max-w-md w-full">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Emergency Resources</h3>
            <button
              onClick={() => setShowEmergencyModal(false)}
              className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">When to Seek Help</h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Contact a healthcare provider immediately if you experience:
              </p>
              <ul className="list-disc pl-5 text-gray-600 dark:text-gray-400 text-sm mt-2">
                <li>Severe abdominal pain</li>
                <li>Heavy vaginal bleeding</li>
                <li>Sudden swelling of hands, face, or feet</li>
                <li>Severe headaches or vision changes</li>
                <li>Decreased fetal movement</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Emergency Contacts</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-[#F59297]" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">National Ambulance Service</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Dial 193</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-[#F59297]" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Korle-Bu Teaching Hospital</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">+233 302 739 510</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-[#F59297]" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Nearest Clinic</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Find a clinic near you</p>
                    <button className="text-[#F59297] hover:text-[#e67d82] text-sm font-semibold underline">
                      Locate Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <button
              onClick={() => setShowEmergencyModal(false)}
              className="w-full bg-[#F59297] hover:bg-[#e67d82] text-white py-3 rounded-2xl font-semibold transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    )}

{showChatbot && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
    <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 max-w-md w-full">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Pregnancy Assistant</h3>
        <button
          onClick={() => {
            setShowChatbot(false);
            setChatbotQuestion('');
            setChatbotResponse(null);
            setChatbotError(null);
            setChatbotLoading(false);
          }}
          className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100"
        >
          <X className="w-6 h-6" />
        </button>
      </div>
      <div className="space-y-4">
        {!authToken ? (
          <div className="text-center">
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Please log in to use the Pregnancy Assistant.
            </p>
            <button
              onClick={() => router.push('/login')}
              className="bg-[#F59297] hover:bg-[#e67d82] text-white py-3 px-6 rounded-2xl font-semibold transition-colors"
            >
              Log In
            </button>
          </div>
        ) : (
          <>
            <textarea
              value={chatbotQuestion}
              onChange={(e) => setChatbotQuestion(e.target.value)}
              placeholder="Type your question here..."
              className="w-full h-32 p-4 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#F59297] focus:border-transparent"
            />
            {chatbotError && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-4">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5" />
                  <p className="text-red-800 dark:text-red-200">{chatbotError}</p>
                </div>
              </div>
            )}
            {chatbotResponse && chatbotResponse.message ? (
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-2xl p-4">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Response</h4>
                <p className="text-gray-600 dark:text-gray-300 mb-2">{chatbotResponse.message}</p>
                {/* Conditionally render recommendations, warnings, and followUp if they exist */}
                {chatbotResponse.recommendations?.length > 0 && (
                  <>
                    <h5 className="font-medium text-gray-900 dark:text-white">Recommendations</h5>
                    <ul className="list-disc pl-5 text-gray-600 dark:text-gray-300 text-sm mb-2">
                      {chatbotResponse.recommendations.map((rec: string, index: number) => (
                        <li key={index}>{rec}</li>
                      ))}
                    </ul>
                  </>
                )}
                {chatbotResponse.warnings?.length > 0 && (
                  <>
                    <h5 className="font-medium text-gray-900 dark:text-white">Warnings</h5>
                    <ul className="list-disc pl-5 text-gray-600 dark:text-gray-300 text-sm mb-2">
                      {chatbotResponse.warnings.map((warning: string, index: number) => (
                        <li key={index}>{warning}</li>
                      ))}
                    </ul>
                  </>
                )}
                {chatbotResponse.followUp?.length > 0 && (
                  <>
                    <h5 className="font-medium text-gray-900 dark:text-white">Follow-Up</h5>
                    <ul className="list-disc pl-5 text-gray-600 dark:text-gray-300 text-sm">
                      {chatbotResponse.followUp.map((followUp: string, index: number) => (
                        <li key={index}>{followUp}</li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            ) : (
              !chatbotLoading && !chatbotError && (
                <p className="text-gray-600 dark:text-gray-400">No response yet. Ask a question to get started.</p>
              )
            )}
            <button
              onClick={handleChatbotSubmit}
              disabled={chatbotLoading || !chatbotQuestion.trim()}
              className={`w-full flex items-center justify-center py-3 rounded-2xl font-semibold transition-colors ${
                chatbotLoading || !chatbotQuestion.trim()
                  ? 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed'
                  : 'bg-[#F59297] hover:bg-[#e67d82] text-white'
              }`}
            >
              {chatbotLoading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                'Ask Now'
              )}
            </button>
            <button
              onClick={() => {
                setShowChatbot(false);
                setChatbotQuestion('');
                setChatbotResponse(null);
                setChatbotError(null);
                setChatbotLoading(false);
              }}
              className="w-full bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white py-3 rounded-2xl font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              Close
            </button>
          </>
        )}
      </div>
    </div>
  </div>)}
  </div>
)}
export default PregnantResourcesPage