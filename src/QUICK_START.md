# Quick Start Guide

## ✅ Your Backend is Connected!

Your frontend is now configured to communicate with:
**https://veeru707-scholarship-backend.hf.space/query**

## What's Already Done

✅ Frontend configured with your Hugging Face URL
✅ Chat service set up to call `/query` endpoint  
✅ Authentication and user context ready
✅ Error handling and loading states implemented
✅ TypeScript types defined for all API calls

## How It Works

1. **User sends a message** in the chatbot
2. **Frontend sends POST request** to `https://veeru707-scholarship-backend.hf.space/query`
3. **Your backend processes** the message with your LLM
4. **Backend returns response** in JSON format
5. **Frontend displays** the response to the user

## Test Your Integration

### Option 1: Use the Chat Interface
1. Navigate to the ChatBot page in your app
2. Type a message like "Show me scholarships for engineering"
3. Check the browser console (F12) for any errors
4. Verify the request is being sent to your backend

### Option 2: Test Backend Directly

Open your browser console and run:

```javascript
fetch('https://veeru707-scholarship-backend.hf.space/query', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    message: "Show me scholarships for engineering",
    sessionId: "test_session",
    userId: "test_user"
  })
})
.then(r => r.json())
.then(console.log)
```

## Expected Backend Response

Your backend should return JSON in one of these formats:

**Format 1 (Recommended):**
```json
{
  "success": true,
  "data": {
    "message": "Here are engineering scholarships...",
    "sessionId": "session_123",
    "timestamp": "2024-01-01T00:00:00.000Z"
  },
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

**Format 2 (Simple):**
```json
{
  "message": "Here are engineering scholarships...",
  "sessionId": "session_123",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## Common Issues & Solutions

### 🔴 CORS Error
**Problem:** Browser blocks request due to CORS policy

**Solution:** Add CORS headers to your backend:
```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### 🔴 404 Not Found
**Problem:** Endpoint doesn't exist

**Solution:** Verify your backend has a `/query` endpoint that accepts POST requests

### 🔴 Timeout Error
**Problem:** Backend takes too long to respond

**Solution:** Optimize your LLM response time or increase timeout in `/config/api.config.ts`

### 🔴 JSON Parse Error
**Problem:** Backend response is not valid JSON

**Solution:** Ensure your backend returns proper JSON format as shown above

## Files to Check

- **Configuration**: `/config/api.config.ts` - Backend URL and endpoints
- **Chat Service**: `/services/chat.service.ts` - Handles chat API calls
- **Chat Hook**: `/hooks/useChat.ts` - React hook for chat functionality  
- **ChatBot Component**: `/components/ChatBot.tsx` - UI component using the backend

## Next Steps

1. **Verify your backend is running**: Visit https://veeru707-scholarship-backend.hf.space in your browser
2. **Check CORS configuration**: Ensure CORS headers are set
3. **Test the endpoint**: Use the browser console test above
4. **Monitor requests**: Open browser DevTools → Network tab to see API calls
5. **Check errors**: Look in browser console for any error messages

## Need Help?

Check these files for more details:
- `BACKEND_SETUP.md` - Detailed backend setup instructions
- `BACKEND_INTEGRATION.md` - Complete API documentation
- `BACKEND_EXAMPLE.md` - Code examples for your backend

## Status Checklist

- [ ] Backend is running at https://veeru707-scholarship-backend.hf.space
- [ ] `/query` endpoint accepts POST requests
- [ ] CORS is properly configured
- [ ] Backend returns valid JSON responses
- [ ] Test request from browser console works
- [ ] Chat interface successfully sends and receives messages

Once all checkboxes are complete, your chatbot is fully integrated! 🎉
