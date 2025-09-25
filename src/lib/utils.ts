import { type ClassValue, clsx } from 'clsx'

/**
 * Utility function to merge class names with clsx
 * Useful for conditional styling and merging Tailwind classes
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

/**
 * Format date to readable string (SSR-safe)
 */
export function formatDate(date: Date | string): string {
  if (typeof date === 'string') {
    // If it's already a formatted string, return as is
    if (date.includes(',') || date.includes(' ')) {
      return date
    }
  }

  const d = new Date(date)
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`
}

/**
 * Truncate text to specified length
 */
export function truncateText(text: string, length: number): string {
  if (text.length <= length) return text
  return text.slice(0, length) + '...'
}

/**
 * Generate a random ID
 */
export function generateId(): string {
  return Math.random().toString(36).substring(2, 11)
}

/**
 * Debounce function
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

/**
 * Check if we're in development mode
 */
export const isDev = process.env.NODE_ENV === 'development'

/**
 * Check if we're on the client side
 */
export const isClient = typeof window !== 'undefined'

/**
 * Sleep function for delays
 */
export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}
