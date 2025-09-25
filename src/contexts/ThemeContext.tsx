'use client'

import { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'light' | 'dark'

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    try {
      setMounted(true)
      // Check for saved theme preference or default to light mode
      const savedTheme = localStorage.getItem('theme') as Theme
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
      const initialTheme = savedTheme || systemTheme

      setTheme(initialTheme)
      document.documentElement.classList.toggle('dark', initialTheme === 'dark')
    } catch (error) {
      console.warn('Theme initialization failed, using light mode:', error)
      setTheme('light')
      setMounted(true)
    }
  }, [])

  const toggleTheme = () => {
    try {
      const newTheme = theme === 'light' ? 'dark' : 'light'
      setTheme(newTheme)
      localStorage.setItem('theme', newTheme)
      document.documentElement.classList.toggle('dark', newTheme === 'dark')
    } catch (error) {
      console.warn('Theme toggle failed:', error)
    }
  }

  // Always render children, but use default theme if not mounted
  return (
    <ThemeContext.Provider value={{ theme: mounted ? theme : 'light', toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
