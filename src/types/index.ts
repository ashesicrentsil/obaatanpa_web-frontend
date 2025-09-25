// Common types for the Obaatanpa application

export interface User {
  id: string
  name: string
  email: string
  phone?: string
  avatar?: string
  role: 'user' | 'admin' | 'healthcare_provider'
  createdAt: Date
  updatedAt: Date
}

export interface Hospital {
  id: string
  name: string
  address: string
  city: string
  region: string
  phone: string
  email?: string
  website?: string
  description?: string
  image?: string
  services: string[]
  specialties: string[]
  rating: number
  reviewCount: number
  coordinates: {
    lat: number
    lng: number
  }
  operatingHours: {
    [key: string]: {
      open: string
      close: string
      isOpen: boolean
    }
  }
  isEmergency: boolean
  hasNICU: boolean
  hasMaternityWard: boolean
  createdAt: Date
  updatedAt: Date
}

export interface Review {
  id: string
  hospitalId: string
  userId: string
  user: Pick<User, 'name' | 'avatar'>
  rating: number
  title: string
  content: string
  helpful: number
  createdAt: Date
  updatedAt: Date
}

export interface Appointment {
  id: string
  userId: string
  hospitalId: string
  doctorName?: string
  date: Date
  time: string
  type: 'consultation' | 'checkup' | 'emergency' | 'delivery'
  status: 'scheduled' | 'confirmed' | 'completed' | 'cancelled'
  notes?: string
  createdAt: Date
  updatedAt: Date
}

export interface Article {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  author: string
  category: string
  tags: string[]
  image?: string
  readTime: number
  published: boolean
  publishedAt?: Date
  createdAt: Date
  updatedAt: Date
}

export interface PregnancyWeek {
  week: number
  title: string
  description: string
  babySize: string
  babyWeight: string
  motherChanges: string[]
  tips: string[]
  warnings: string[]
  image?: string
}

export interface Resource {
  id: string
  title: string
  description: string
  type: 'guide' | 'checklist' | 'calculator' | 'video' | 'pdf'
  category: string
  url?: string
  content?: string
  downloadUrl?: string
  image?: string
  featured: boolean
  createdAt: Date
  updatedAt: Date
}

// API Response types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  message?: string
  error?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasNext: boolean
    hasPrev: boolean
  }
}

// Form types
export interface ContactForm {
  name: string
  email: string
  phone?: string
  subject: string
  message: string
}

export interface HospitalSearchFilters {
  location?: string
  services?: string[]
  specialties?: string[]
  hasEmergency?: boolean
  hasNICU?: boolean
  hasMaternityWard?: boolean
  rating?: number
  distance?: number
}

// Component prop types
export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  disabled?: boolean
  children: React.ReactNode
  onClick?: () => void
  className?: string
}

export interface CardProps {
  title?: string
  description?: string
  image?: string
  children: React.ReactNode
  className?: string
  onClick?: () => void
}

// Navigation types
export interface NavItem {
  label: string
  href: string
  icon?: React.ComponentType
  children?: NavItem[]
}

// Theme types
export type Theme = 'light' | 'dark' | 'system'

// Error types
export interface AppError {
  code: string
  message: string
  details?: any
}
