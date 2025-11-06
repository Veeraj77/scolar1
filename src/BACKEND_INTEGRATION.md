# Backend Integration Guide

This document explains how the frontend connects to your Hugging Face hosted backend.

## Overview

The application now has a complete backend integration structure that communicates with your Hugging Face Space API.

## Configuration

### 1. Set Your API URL

Update the API URL in `/config/api.config.ts`:

```typescript
export const API_CONFIG = {
  BASE_URL: 'https://your-username-your-space.hf.space',
  // ... rest of config
}
```

**Replace** `'https://your-username-your-space.hf.space'` with your actual Hugging Face Space URL.

**Example:**
```typescript
BASE_URL: 'https://johndoe-scholarship-bot.hf.space',
```

## Backend Structure

### Services

The frontend includes these service modules:

#### 1. **API Service** (`/services/api.service.ts`)
- Base HTTP client for making requests
- Handles authentication tokens
- Manages request/response lifecycle
- Error handling and timeout management

#### 2. **Chat Service** (`/services/chat.service.ts`)
- Send messages to chatbot
- Retrieve chat history
- Session management

**Expected Backend Endpoints:**
```
POST /api/chat
  Body: { message: string, sessionId?: string, userId?: string }
  Response: { message: string, sessionId: string, timestamp: Date }

GET /api/chat/history?userId={userId}&limit={limit}&offset={offset}
  Response: Array of ChatMessage objects
```

#### 3. **Scholarship Service** (`/services/scholarship.service.ts`)
- Search and filter scholarships
- Get scholarship details
- Bookmark management
- Deadline tracking

**Expected Backend Endpoints:**
```
GET /api/scholarships?page={page}&pageSize={pageSize}
GET /api/scholarships/search?category={category}&keywords={keywords}
GET /api/scholarships/:id
POST /api/scholarships/bookmark
DELETE /api/scholarships/bookmark?scholarshipId={id}&userId={userId}
```

#### 4. **Auth Service** (`/services/auth.service.ts`)
- User registration (sign up)
- User login (sign in)
- User logout (sign out)
- Profile management
- Token management

**Expected Backend Endpoints:**
```
POST /api/auth/signup
  Body: { email: string, password: string, name?: string }
  Response: { user: User, token: string }

POST /api/auth/signin
  Body: { email: string, password: string }
  Response: { user: User, token: string }

POST /api/auth/signout
GET /api/user/profile/:userId
PUT /api/user/profile/:userId
```

#### 5. **Application Service** (`/services/application.service.ts`)
- Track scholarship applications
- Manage application status
- Document management
- Deadline tracking

**Expected Backend Endpoints:**
```
GET /api/applications?userId={userId}
POST /api/applications
PUT /api/applications/:id
DELETE /api/applications/:id
PATCH /api/applications/:id (for status updates)
```

### React Hooks

#### 1. **useChat** (`/hooks/useChat.ts`)
Hook for managing chat functionality:
```typescript
const { messages, isLoading, error, sendMessage, clearMessages } = useChat(userId)
```

#### 2. **useScholarships** (`/hooks/useScholarships.ts`)
Hook for scholarship operations:
```typescript
const { scholarships, isLoading, error, fetchScholarships, fetchByCategory } = useScholarships()
```

#### 3. **useAuth** (`/context/AuthContext.tsx`)
Hook for authentication:
```typescript
const { user, isAuthenticated, signIn, signUp, signOut } = useAuth()
```

### Type Definitions

All API types are defined in `/types/api.types.ts`:
- `ChatMessage`, `ChatRequest`, `ChatResponse`
- `Scholarship`, `ScholarshipSearchParams`
- `User`, `UserProfile`, `AuthResponse`
- `Application`, `ApplicationDocument`
- `ApiResponse<T>` - Generic response wrapper

## Usage Examples

### 1. Sending a Chat Message

```typescript
import { useChat } from '../hooks/useChat'

function ChatComponent() {
  const { messages, sendMessage, isLoading } = useChat(userId)
  
  const handleSend = async (message: string) => {
    await sendMessage(message)
  }
  
  return (
    // Your component JSX
  )
}
```

### 2. Searching Scholarships

```typescript
import { useScholarships } from '../hooks/useScholarships'

function ScholarshipList() {
  const { scholarships, fetchByCategory, isLoading } = useScholarships()
  
  useEffect(() => {
    fetchByCategory('STEM Fields')
  }, [])
  
  return (
    // Render scholarships
  )
}
```

### 3. User Authentication

```typescript
import { useAuth } from '../context/AuthContext'

function SignInForm() {
  const { signIn, isLoading } = useAuth()
  
  const handleSignIn = async (email: string, password: string) => {
    const result = await signIn({ email, password })
    
    if (result.success) {
      // Navigate to chatbot or home
    } else {
      // Show error
      console.error(result.error)
    }
  }
  
  return (
    // Your form JSX
  )
}
```

## Backend API Requirements

Your Hugging Face backend should implement the following:

### Authentication
- JWT token-based authentication
- Send token in `Authorization: Bearer <token>` header
- Token should be returned on signup/signin

### Response Format
All endpoints should return responses in this format:
```json
{
  "success": true,
  "data": { /* your data */ },
  "error": null,
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

Or for errors:
```json
{
  "success": false,
  "data": null,
  "error": {
    "message": "Error description",
    "code": "ERROR_CODE"
  },
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### CORS Configuration
Your Hugging Face Space must have CORS enabled to accept requests from the frontend:
```python
# Example for FastAPI
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Configure appropriately for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

## Testing Without Backend

If your backend is not ready yet, the application will:
- Show error messages in the UI
- Display fallback content
- Allow you to test the UI without breaking

The chat component includes local fallback responses for testing purposes.

## Security Notes

1. **API Keys**: Never commit API keys or tokens to version control
2. **Environment Variables**: Use `.env` files for sensitive configuration
3. **Token Storage**: Tokens are stored in localStorage (consider more secure options for production)
4. **HTTPS**: Always use HTTPS in production
5. **Input Validation**: Backend should validate all inputs
6. **Rate Limiting**: Implement rate limiting on your backend

## Deployment Checklist

- [ ] Update `BASE_URL` in `/config/api.config.ts`
- [ ] Set up environment variables
- [ ] Test all API endpoints
- [ ] Verify CORS configuration
- [ ] Test authentication flow
- [ ] Test error handling
- [ ] Verify token management
- [ ] Test on different devices

## Troubleshooting

### Issue: "Network Error" or "Request Timeout"
- Check if your Hugging Face Space is running
- Verify the BASE_URL is correct
- Check CORS configuration
- Ensure endpoints match the expected paths

### Issue: "Unauthorized" errors
- Verify token is being sent in headers
- Check if token is expired
- Ensure backend authentication is working

### Issue: No data returned
- Check API response format matches expected structure
- Verify endpoint paths
- Check browser console for errors
- Use browser DevTools Network tab to inspect requests

## Next Steps

1. Implement the backend API endpoints on your Hugging Face Space
2. Test each endpoint individually
3. Update the frontend configuration with your actual API URL
4. Test the integration end-to-end
5. Add additional features as needed

For more information about deploying to Hugging Face Spaces, visit:
https://huggingface.co/docs/hub/spaces-overview