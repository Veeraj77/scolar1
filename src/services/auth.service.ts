import { apiService } from './api.service'
import { API_CONFIG } from '../config/api.config'
import type { 
  User,
  SignUpRequest,
  SignInRequest,
  AuthResponse,
  ApiResponse 
} from '../types/api.types'

// Authentication Service
class AuthService {
  // Sign up a new user
  async signUp(data: SignUpRequest): Promise<ApiResponse<AuthResponse>> {
    const response = await apiService.post<AuthResponse>(
      API_CONFIG.ENDPOINTS.AUTH_SIGNUP,
      data
    )

    if (response.success && response.data?.token) {
      apiService.setToken(response.data.token)
    }

    return response
  }

  // Sign in an existing user
  async signIn(data: SignInRequest): Promise<ApiResponse<AuthResponse>> {
    const response = await apiService.post<AuthResponse>(
      API_CONFIG.ENDPOINTS.AUTH_SIGNIN,
      data
    )

    if (response.success && response.data?.token) {
      apiService.setToken(response.data.token)
      
      // Store user data in localStorage
      if (typeof window !== 'undefined' && response.data.user) {
        localStorage.setItem('user', JSON.stringify(response.data.user))
      }
    }

    return response
  }

  // Sign out the current user
  async signOut(): Promise<ApiResponse<void>> {
    const response = await apiService.post<void>(
      API_CONFIG.ENDPOINTS.AUTH_SIGNOUT
    )

    // Clear local storage
    apiService.clearToken()
    if (typeof window !== 'undefined') {
      localStorage.removeItem('user')
    }

    return response
  }

  // Get current user
  getCurrentUser(): User | null {
    if (typeof window === 'undefined') {
      return null
    }

    const userStr = localStorage.getItem('user')
    if (!userStr) {
      return null
    }

    try {
      return JSON.parse(userStr) as User
    } catch {
      return null
    }
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    if (typeof window === 'undefined') {
      return false
    }

    const token = localStorage.getItem('auth_token')
    return !!token
  }

  // Get user profile
  async getUserProfile(userId: string): Promise<ApiResponse<User>> {
    return apiService.get<User>(
      `${API_CONFIG.ENDPOINTS.USER_PROFILE}/${userId}`
    )
  }

  // Update user profile
  async updateUserProfile(
    userId: string, 
    data: Partial<User>
  ): Promise<ApiResponse<User>> {
    return apiService.put<User>(
      `${API_CONFIG.ENDPOINTS.USER_PROFILE}/${userId}`,
      data
    )
  }
}

// Export singleton instance
export const authService = new AuthService()
