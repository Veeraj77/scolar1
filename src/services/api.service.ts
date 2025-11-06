import { API_CONFIG, STATUS_CODES } from '../config/api.config'
import type { ApiResponse } from '../types/api.types'

// API Service utility for making HTTP requests
class ApiService {
  private baseURL: string
  private timeout: number
  private token: string | null = null

  constructor() {
    this.baseURL = API_CONFIG.BASE_URL
    this.timeout = API_CONFIG.TIMEOUT
    
    // Load token from localStorage if available
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('auth_token')
    }
  }

  // Set authentication token
  setToken(token: string) {
    this.token = token
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth_token', token)
    }
  }

  // Clear authentication token
  clearToken() {
    this.token = null
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token')
    }
  }

  // Get headers with authentication
  private getHeaders(): HeadersInit {
    const headers: HeadersInit = {
      ...API_CONFIG.HEADERS,
    }

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`
    }

    return headers
  }

  // Generic request method
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), this.timeout)

    try {
      const url = `${this.baseURL}${endpoint}`
      
      const response = await fetch(url, {
        ...options,
        headers: this.getHeaders(),
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      const data = await response.json()

      if (!response.ok) {
        return {
          success: false,
          error: {
            message: data.message || 'An error occurred',
            code: response.status.toString(),
          },
          timestamp: new Date(),
        }
      }

      return {
        success: true,
        data: data as T,
        timestamp: new Date(),
      }
    } catch (error) {
      clearTimeout(timeoutId)
      
      if (error instanceof Error) {
        return {
          success: false,
          error: {
            message: error.name === 'AbortError' 
              ? 'Request timeout' 
              : error.message || 'Network error',
            code: 'NETWORK_ERROR',
          },
          timestamp: new Date(),
        }
      }

      return {
        success: false,
        error: {
          message: 'Unknown error occurred',
          code: 'UNKNOWN_ERROR',
        },
        timestamp: new Date(),
      }
    }
  }

  // GET request
  async get<T>(endpoint: string, params?: Record<string, any>): Promise<ApiResponse<T>> {
    let url = endpoint
    
    if (params) {
      const queryString = new URLSearchParams(params).toString()
      url = `${endpoint}?${queryString}`
    }

    return this.request<T>(url, {
      method: 'GET',
    })
  }

  // POST request
  async post<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  // PUT request
  async put<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  }

  // PATCH request
  async patch<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(data),
    })
  }

  // DELETE request
  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'DELETE',
    })
  }
}

// Export singleton instance
export const apiService = new ApiService()
