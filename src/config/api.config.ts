// API Configuration for Hugging Face Backend
export const API_CONFIG = {
  // Your Hugging Face Space URL
  BASE_URL: 'https://veeru707-scholarship-backend.hf.space',
  
  // API Endpoints
  ENDPOINTS: {
    // Chat endpoints
    CHAT: '/query', // Main chat endpoint
    CHAT_HISTORY: '/api/chat/history',
    
    // Scholarship endpoints
    SCHOLARSHIPS: '/api/scholarships',
    SCHOLARSHIP_SEARCH: '/api/scholarships/search',
    SCHOLARSHIP_DETAILS: '/api/scholarships/:id',
    BOOKMARK_SCHOLARSHIP: '/api/scholarships/bookmark',
    
    // User endpoints
    AUTH_SIGNUP: '/api/auth/signup',
    AUTH_SIGNIN: '/api/auth/signin',
    AUTH_SIGNOUT: '/api/auth/signout',
    USER_PROFILE: '/api/user/profile',
    
    // Application tracking
    APPLICATIONS: '/api/applications',
    APPLICATION_STATUS: '/api/applications/:id',
  },
  
  // Request timeout (ms)
  TIMEOUT: 30000,
  
  // Headers
  HEADERS: {
    'Content-Type': 'application/json',
  }
}

// API Response Status Codes
export const STATUS_CODES = {
  SUCCESS: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
}
