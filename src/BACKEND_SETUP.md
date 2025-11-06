# Backend Setup - Your Hugging Face Space

Your frontend is now connected to: **https://veeru707-scholarship-backend.hf.space**

## Current Configuration

The chat endpoint is configured as: `/query`

## Expected Request/Response Format

### Chat Endpoint: POST /query

**Request Body:**
```json
{
  "message": "Show me scholarships for engineering",
  "sessionId": "session_1699123456789_abc123",
  "userId": "user_123"
}
```

**Expected Response Format (Option 1 - Wrapped):**
```json
{
  "success": true,
  "data": {
    "message": "Here are some engineering scholarships...",
    "sessionId": "session_1699123456789_abc123",
    "timestamp": "2024-01-01T00:00:00.000Z",
    "suggestions": ["Tell me more", "Show requirements"]
  },
  "error": null,
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

**Expected Response Format (Option 2 - Direct):**
```json
{
  "message": "Here are some engineering scholarships...",
  "sessionId": "session_1699123456789_abc123",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## Your Backend Implementation

Based on your Hugging Face Space endpoint, here's what your backend should handle:

### Python FastAPI Example:

```python
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from datetime import datetime
from typing import Optional, List

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    message: str
    sessionId: Optional[str] = None
    userId: Optional[str] = None

class ChatResponse(BaseModel):
    message: str
    sessionId: str
    timestamp: str
    suggestions: Optional[List[str]] = None

class ApiResponse(BaseModel):
    success: bool
    data: Optional[ChatResponse] = None
    error: Optional[dict] = None
    timestamp: str

@app.post("/query")
async def query(request: ChatRequest):
    try:
        # Your LLM logic here
        # Example: response_text = your_llm_model.generate(request.message)
        
        response_text = f"I received your message: {request.message}"
        
        # Create response
        chat_response = ChatResponse(
            message=response_text,
            sessionId=request.sessionId or f"session_{datetime.now().timestamp()}",
            timestamp=datetime.now().isoformat(),
            suggestions=["Tell me more", "Show requirements"]
        )
        
        # Return wrapped response
        return ApiResponse(
            success=True,
            data=chat_response,
            timestamp=datetime.now().isoformat()
        )
        
    except Exception as e:
        return ApiResponse(
            success=False,
            error={
                "message": str(e),
                "code": "QUERY_ERROR"
            },
            timestamp=datetime.now().isoformat()
        )

@app.get("/")
async def root():
    return {"message": "Scholarship Chatbot Backend", "status": "running"}

@app.get("/health")
async def health():
    return {"status": "healthy"}
```

### Gradio Example:

```python
import gradio as gr
import json
from datetime import datetime

def process_query(request_json):
    try:
        request = json.loads(request_json)
        message = request.get("message", "")
        session_id = request.get("sessionId", f"session_{datetime.now().timestamp()}")
        
        # Your LLM logic here
        response_text = f"Processing: {message}"
        
        response = {
            "success": True,
            "data": {
                "message": response_text,
                "sessionId": session_id,
                "timestamp": datetime.now().isoformat()
            },
            "timestamp": datetime.now().isoformat()
        }
        
        return json.dumps(response)
    except Exception as e:
        error_response = {
            "success": False,
            "error": {
                "message": str(e),
                "code": "QUERY_ERROR"
            },
            "timestamp": datetime.now().isoformat()
        }
        return json.dumps(error_response)

# Create Gradio interface
demo = gr.Interface(
    fn=process_query,
    inputs=gr.Textbox(label="Request JSON"),
    outputs=gr.Textbox(label="Response JSON"),
    api_name="query"
)

demo.launch()
```

## Testing Your Backend

You can test your backend with curl:

```bash
curl -X POST https://veeru707-scholarship-backend.hf.space/query \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Show me scholarships for engineering",
    "sessionId": "test_session",
    "userId": "test_user"
  }'
```

Or using Python:

```python
import requests

url = "https://veeru707-scholarship-backend.hf.space/query"
payload = {
    "message": "Show me scholarships for engineering",
    "sessionId": "test_session",
    "userId": "test_user"
}

response = requests.post(url, json=payload)
print(response.json())
```

## Important Notes

1. **CORS**: Make sure CORS is enabled on your backend to accept requests from the frontend
2. **Response Format**: Your backend can return either the wrapped format or direct format - the frontend will handle both
3. **Error Handling**: Always wrap responses in try-catch blocks and return error information
4. **Session Management**: Use the sessionId to maintain conversation context
5. **Timeout**: Frontend has a 30-second timeout, so ensure responses come back within that time

## Troubleshooting

### Issue: CORS errors
Add CORS middleware to your backend as shown in the examples above.

### Issue: 404 Not Found
- Verify your endpoint is `/query`
- Check that your Hugging Face Space is running
- Make sure the deployment was successful

### Issue: Response format errors
Ensure your backend returns the expected JSON structure. The frontend expects either:
- A wrapped response with `success`, `data`, `error`, `timestamp`
- Or a direct response with `message`, `sessionId`, `timestamp`

## Next Steps

1. ✅ Frontend is configured to use your backend URL
2. ⏳ Verify your backend is running at https://veeru707-scholarship-backend.hf.space
3. ⏳ Test the `/query` endpoint with the expected request format
4. ⏳ Ensure CORS is properly configured
5. ⏳ Test the integration end-to-end from the frontend

Once your backend is properly set up with the expected endpoints, the chatbot will automatically start using it!
