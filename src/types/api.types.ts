// API Type Definitions

// Chat Types
export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

export interface ChatRequest {
  message: string
  sessionId?: string
  userId?: string
}

export interface ChatResponse {
  message: string
  sessionId: string
  timestamp: Date
  suggestions?: string[]
}

// Scholarship Types
export interface Scholarship {
  id: string
  name: string
  category: string
  award: string
  deadline: string
  description?: string
  eligibility?: string[]
  requirements?: string[]
  applicationUrl?: string
  isBookmarked?: boolean
}

export interface ScholarshipSearchParams {
  category?: string
  minAmount?: number
  maxAmount?: number
  deadline?: string
  keywords?: string
}

export interface ScholarshipSearchResponse {
  scholarships: Scholarship[]
  total: number
  page: number
  pageSize: number
}

// User Types
export interface User {
  id: string
  email: string
  name?: string
  createdAt: Date
  profile?: UserProfile
}

export interface UserProfile {
  gpa?: number
  major?: string
  interests?: string[]
  targetScholarships?: string[]
  applicationDeadlines?: ApplicationDeadline[]
}

export interface ApplicationDeadline {
  scholarshipId: string
  scholarshipName: string
  deadline: Date
  status: 'pending' | 'submitted' | 'accepted' | 'rejected'
  notes?: string
}

// Auth Types
export interface SignUpRequest {
  email: string
  password: string
  name?: string
}

export interface SignInRequest {
  email: string
  password: string
}

export interface AuthResponse {
  user: User
  token: string
  refreshToken?: string
}

// Application Tracking Types
export interface Application {
  id: string
  userId: string
  scholarshipId: string
  scholarshipName: string
  status: 'draft' | 'in-progress' | 'submitted' | 'under-review' | 'accepted' | 'rejected'
  submittedDate?: Date
  deadline: Date
  documents?: ApplicationDocument[]
  notes?: string
}

export interface ApplicationDocument {
  id: string
  name: string
  type: 'essay' | 'transcript' | 'recommendation' | 'other'
  uploadedAt: Date
  url?: string
}

// API Response Wrapper
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: {
    message: string
    code?: string
  }
  timestamp: Date
}
