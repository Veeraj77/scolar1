import type { ApiResponse } from '../types/api.types'

/**
 * Utility functions for API operations
 */

// Check if response is successful
export function isApiSuccess<T>(response: ApiResponse<T>): boolean {
  return response.success && !!response.data
}

// Extract error message from API response
export function getErrorMessage(response: ApiResponse<any>): string {
  return response.error?.message || 'An unexpected error occurred'
}

// Format date for API requests
export function formatDate(date: Date): string {
  return date.toISOString()
}

// Parse date from API response
export function parseDate(dateString: string): Date {
  return new Date(dateString)
}

// Debounce function for search inputs
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null
      func(...args)
    }

    if (timeout) {
      clearTimeout(timeout)
    }
    timeout = setTimeout(later, wait)
  }
}

// Retry failed requests
export async function retryRequest<T>(
  requestFn: () => Promise<ApiResponse<T>>,
  maxRetries: number = 3,
  delay: number = 1000
): Promise<ApiResponse<T>> {
  let lastError: ApiResponse<T> | null = null

  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await requestFn()
      
      if (response.success) {
        return response
      }
      
      lastError = response
      
      // Don't retry client errors (4xx)
      if (response.error?.code?.startsWith('4')) {
        return response
      }
      
      // Wait before retrying
      if (i < maxRetries - 1) {
        await new Promise(resolve => setTimeout(resolve, delay * (i + 1)))
      }
    } catch (error) {
      lastError = {
        success: false,
        error: {
          message: error instanceof Error ? error.message : 'Request failed',
          code: 'RETRY_ERROR',
        },
        timestamp: new Date(),
      }
    }
  }

  return lastError || {
    success: false,
    error: {
      message: 'Max retries exceeded',
      code: 'MAX_RETRIES',
    },
    timestamp: new Date(),
  }
}

// Build query string from object
export function buildQueryString(params: Record<string, any>): string {
  const searchParams = new URLSearchParams()
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      searchParams.append(key, String(value))
    }
  })
  
  const queryString = searchParams.toString()
  return queryString ? `?${queryString}` : ''
}

// Handle API response with type guard
export function handleApiResponse<T>(
  response: ApiResponse<T>,
  onSuccess: (data: T) => void,
  onError?: (error: string) => void
): void {
  if (isApiSuccess(response)) {
    onSuccess(response.data!)
  } else if (onError) {
    onError(getErrorMessage(response))
  }
}

// Check if error is a network error
export function isNetworkError(error: any): boolean {
  return (
    error?.code === 'NETWORK_ERROR' ||
    error?.message?.includes('network') ||
    error?.message?.includes('fetch') ||
    error?.message?.includes('timeout')
  )
}

// Check if error is an authentication error
export function isAuthError(error: any): boolean {
  return (
    error?.code === '401' ||
    error?.code === '403' ||
    error?.message?.toLowerCase().includes('unauthorized') ||
    error?.message?.toLowerCase().includes('forbidden')
  )
}

// Format currency for display
export function formatCurrency(amount: number, currency: string = 'INR'): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: currency,
    maximumFractionDigits: 0,
  }).format(amount)
}

// Calculate days until deadline
export function daysUntilDeadline(deadline: Date | string): number {
  const deadlineDate = typeof deadline === 'string' ? new Date(deadline) : deadline
  const today = new Date()
  const diffTime = deadlineDate.getTime() - today.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays
}

// Get deadline status
export function getDeadlineStatus(deadline: Date | string): 'urgent' | 'soon' | 'upcoming' | 'passed' {
  const days = daysUntilDeadline(deadline)
  
  if (days < 0) return 'passed'
  if (days <= 7) return 'urgent'
  if (days <= 30) return 'soon'
  return 'upcoming'
}

// Sanitize user input
export function sanitizeInput(input: string): string {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .substring(0, 1000) // Limit length
}

// Validate email format
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Generate unique ID
export function generateId(prefix: string = 'id'): string {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

// Local storage helpers with error handling
export const storage = {
  get<T>(key: string, defaultValue?: T): T | null {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : defaultValue || null
    } catch {
      return defaultValue || null
    }
  },
  
  set<T>(key: string, value: T): boolean {
    try {
      localStorage.setItem(key, JSON.stringify(value))
      return true
    } catch {
      return false
    }
  },
  
  remove(key: string): boolean {
    try {
      localStorage.removeItem(key)
      return true
    } catch {
      return false
    }
  },
  
  clear(): boolean {
    try {
      localStorage.clear()
      return true
    } catch {
      return false
    }
  }
}
