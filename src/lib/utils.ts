import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

// Utility function for merging Tailwind classes
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Generate unique session ID for persistence
export function generateSessionId(): string {
  const timestamp = Date.now().toString(36)
  const randomStr = Math.random().toString(36).substring(2, 8)
  return `introspect_${timestamp}_${randomStr}`
}

// Format currency for cost display
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

// Format date for display
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date)
}

// Calculate progress percentage
export function calculateProgress(currentQuestion: number, totalQuestions: number = 18): number {
  return Math.round((currentQuestion / totalQuestions) * 100)
}

// Debounce function for localStorage saves
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null
  
  return (...args: Parameters<T>) => {
    if (timeout) {
      clearTimeout(timeout)
    }
    
    timeout = setTimeout(() => {
      func(...args)
    }, wait)
  }
}

// Validate email format
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Validate phone number format (basic US format)
export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
  return phoneRegex.test(phone.replace(/\s+/g, ''))
}

// Get business type display name
export function getBusinessTypeDisplayName(businessType: string): string {
  const displayNames: Record<string, string> = {
    'restaurant': 'Restaurant & Food Service',
    'retail': 'Retail & E-commerce',
    'professional-services': 'Professional Services',
    'healthcare': 'Healthcare & Medical',
    'education': 'Education & Training',
    'nonprofit': 'Nonprofit & Community',
    'ecommerce': 'E-commerce & Online Sales',
    'saas': 'Software & Technology',
    'manufacturing': 'Manufacturing & Industrial',
    'real-estate': 'Real Estate & Property',
    'fitness': 'Fitness & Wellness',
    'other': 'Other Business Type',
  }
  
  return displayNames[businessType] || businessType
}

// Get platform display name
export function getPlatformDisplayName(platform: string): string {
  const displayNames: Record<string, string> = {
    'web-responsive': 'Responsive Website',
    'ios-native': 'iOS Mobile App',
    'android-native': 'Android Mobile App',
    'desktop-app': 'Desktop Application',
    'web-app-pwa': 'Progressive Web App',
  }
  
  return displayNames[platform] || platform
}

// Get budget range display
export function getBudgetRangeDisplay(budgetRange: string): string {
  const displays: Record<string, string> = {
    'under-25k': 'Under $25,000',
    '25k-50k': '$25,000 - $50,000',
    '50k-100k': '$50,000 - $100,000',
    '100k-250k': '$100,000 - $250,000',
    '250k-500k': '$250,000 - $500,000',
    'over-500k': 'Over $500,000',
  }
  
  return displays[budgetRange] || budgetRange
}

// Get timeline display
export function getTimelineDisplay(timeline: string): string {
  const displays: Record<string, string> = {
    'asap': 'As soon as possible',
    '3-months': 'Within 3 months',
    '6-months': 'Within 6 months',
    '12-months': 'Within 12 months',
    'flexible': 'Timeline is flexible',
  }
  
  return displays[timeline] || timeline
}

// Local storage helpers with error handling
export const localStorage = {
  get: (key: string): any => {
    if (typeof window === 'undefined') return null
    
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : null
    } catch (error) {
      console.error('Error reading from localStorage:', error)
      return null
    }
  },
  
  set: (key: string, value: any): void => {
    if (typeof window === 'undefined') return
    
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.error('Error writing to localStorage:', error)
    }
  },
  
  remove: (key: string): void => {
    if (typeof window === 'undefined') return
    
    try {
      window.localStorage.removeItem(key)
    } catch (error) {
      console.error('Error removing from localStorage:', error)
    }
  },
  
  clear: (): void => {
    if (typeof window === 'undefined') return
    
    try {
      window.localStorage.clear()
    } catch (error) {
      console.error('Error clearing localStorage:', error)
    }
  },
}
