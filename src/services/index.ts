// Export all services for easy importing
export { apiService } from './api.service'
export { chatService } from './chat.service'
export { scholarshipService } from './scholarship.service'
export { authService } from './auth.service'
export { applicationService } from './application.service'

// Re-export types
export type {
  ChatMessage,
  ChatRequest,
  ChatResponse,
  Scholarship,
  ScholarshipSearchParams,
  ScholarshipSearchResponse,
  User,
  UserProfile,
  SignUpRequest,
  SignInRequest,
  AuthResponse,
  Application,
  ApplicationDocument,
  ApiResponse,
} from '../types/api.types'
