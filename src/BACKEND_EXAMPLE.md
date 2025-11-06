# Backend Implementation Example for Hugging Face

This document provides example backend implementations for your Hugging Face Space.

## Tech Stack Options

### Option 1: FastAPI (Recommended)
FastAPI is a modern, fast Python web framework perfect for APIs.

### Option 2: Flask
Flask is a lightweight Python web framework.

### Option 3: Gradio API
Use Gradio's built-in API functionality.

## FastAPI Implementation Example

### 1. Project Structure
```
huggingface-space/
├── app.py                 # Main FastAPI application
├── requirements.txt       # Python dependencies
├── models/               # Data models
│   ├── user.py
│   ├── scholarship.py
│   └── chat.py
├── routes/               # API endpoints
│   ├── auth.py
│   ├── chat.py
│   ├── scholarships.py
│   └── applications.py
├── services/             # Business logic
│   ├── chat_service.py
│   ├── llm_service.py
│   └── db_service.py
└── database/             # Database setup
    └── db.py
```

### 2. Main Application (app.py)

```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import auth, chat, scholarships, applications

app = FastAPI(title="Scholarship Chatbot API")

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Configure appropriately for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router, prefix="/api/auth", tags=["Authentication"])
app.include_router(chat.router, prefix="/api/chat", tags=["Chat"])
app.include_router(scholarships.router, prefix="/api/scholarships", tags=["Scholarships"])
app.include_router(applications.router, prefix="/api/applications", tags=["Applications"])

@app.get("/")
def read_root():
    return {"message": "Scholarship Chatbot API", "status": "running"}

@app.get("/health")
def health_check():
    return {"status": "healthy"}
```

### 3. Chat Endpoint Example (routes/chat.py)

```python
from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from datetime import datetime
from typing import Optional, List
import os
from transformers import AutoTokenizer, AutoModelForCausalLM
import torch

router = APIRouter()

# Load your LLM model (example with Hugging Face model)
MODEL_NAME = "meta-llama/Llama-2-7b-chat-hf"  # or your preferred model
tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)
model = AutoModelForCausalLM.from_pretrained(MODEL_NAME)

# Request/Response Models
class ChatRequest(BaseModel):
    message: str
    sessionId: Optional[str] = None
    userId: Optional[str] = None

class ChatResponse(BaseModel):
    message: str
    sessionId: str
    timestamp: datetime
    suggestions: Optional[List[str]] = None

class ApiResponse(BaseModel):
    success: bool
    data: Optional[ChatResponse] = None
    error: Optional[dict] = None
    timestamp: datetime

@router.post("/", response_model=ApiResponse)
async def send_message(request: ChatRequest):
    try:
        # Generate response using your LLM
        prompt = f"""You are a helpful scholarship assistant. Answer the following question:
User: {request.message}
Assistant: """
        
        inputs = tokenizer(prompt, return_tensors="pt")
        
        with torch.no_grad():
            outputs = model.generate(
                inputs.input_ids,
                max_length=500,
                temperature=0.7,
                do_sample=True,
                top_p=0.9
            )
        
        response_text = tokenizer.decode(outputs[0], skip_special_tokens=True)
        # Extract just the assistant's response
        assistant_response = response_text.split("Assistant: ")[-1].strip()
        
        # Create response
        chat_response = ChatResponse(
            message=assistant_response,
            sessionId=request.sessionId or f"session_{datetime.now().timestamp()}",
            timestamp=datetime.now()
        )
        
        return ApiResponse(
            success=True,
            data=chat_response,
            timestamp=datetime.now()
        )
        
    except Exception as e:
        return ApiResponse(
            success=False,
            error={"message": str(e), "code": "CHAT_ERROR"},
            timestamp=datetime.now()
        )

@router.get("/history")
async def get_chat_history(userId: str, limit: int = 50, offset: int = 0):
    try:
        # TODO: Implement database query for chat history
        # This is a placeholder
        messages = []
        
        return {
            "success": True,
            "data": messages,
            "timestamp": datetime.now()
        }
    except Exception as e:
        return {
            "success": False,
            "error": {"message": str(e), "code": "HISTORY_ERROR"},
            "timestamp": datetime.now()
        }
```

### 4. Authentication Example (routes/auth.py)

```python
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, EmailStr
from datetime import datetime, timedelta
import jwt
import bcrypt
from typing import Optional

router = APIRouter()

# Secret key for JWT (use environment variable in production)
SECRET_KEY = os.getenv("JWT_SECRET_KEY", "your-secret-key-change-this")
ALGORITHM = "HS256"

class SignUpRequest(BaseModel):
    email: EmailStr
    password: str
    name: Optional[str] = None

class SignInRequest(BaseModel):
    email: EmailStr
    password: str

class User(BaseModel):
    id: str
    email: str
    name: Optional[str] = None
    createdAt: datetime

class AuthResponse(BaseModel):
    user: User
    token: str

def create_access_token(data: dict, expires_delta: timedelta = timedelta(hours=24)):
    to_encode = data.copy()
    expire = datetime.utcnow() + expires_delta
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

@router.post("/signup")
async def signup(request: SignUpRequest):
    try:
        # TODO: Check if user already exists in database
        # TODO: Hash password
        hashed_password = bcrypt.hashpw(request.password.encode('utf-8'), bcrypt.gensalt())
        
        # TODO: Save user to database
        user_id = f"user_{datetime.now().timestamp()}"
        
        user = User(
            id=user_id,
            email=request.email,
            name=request.name,
            createdAt=datetime.now()
        )
        
        # Create JWT token
        token = create_access_token({"sub": user.email, "user_id": user_id})
        
        return {
            "success": True,
            "data": AuthResponse(user=user, token=token),
            "timestamp": datetime.now()
        }
    except Exception as e:
        return {
            "success": False,
            "error": {"message": str(e), "code": "SIGNUP_ERROR"},
            "timestamp": datetime.now()
        }

@router.post("/signin")
async def signin(request: SignInRequest):
    try:
        # TODO: Query database for user
        # TODO: Verify password
        # This is a placeholder
        
        user = User(
            id="user_123",
            email=request.email,
            name="Test User",
            createdAt=datetime.now()
        )
        
        token = create_access_token({"sub": user.email, "user_id": user.id})
        
        return {
            "success": True,
            "data": AuthResponse(user=user, token=token),
            "timestamp": datetime.now()
        }
    except Exception as e:
        return {
            "success": False,
            "error": {"message": str(e), "code": "SIGNIN_ERROR"},
            "timestamp": datetime.now()
        }

@router.post("/signout")
async def signout():
    return {
        "success": True,
        "data": None,
        "timestamp": datetime.now()
    }
```

### 5. Scholarships Example (routes/scholarships.py)

```python
from fastapi import APIRouter, Query
from pydantic import BaseModel
from datetime import datetime
from typing import List, Optional

router = APIRouter()

class Scholarship(BaseModel):
    id: str
    name: str
    category: str
    award: str
    deadline: str
    description: Optional[str] = None
    eligibility: Optional[List[str]] = None
    requirements: Optional[List[str]] = None
    applicationUrl: Optional[str] = None
    isBookmarked: bool = False

class ScholarshipSearchResponse(BaseModel):
    scholarships: List[Scholarship]
    total: int
    page: int
    pageSize: int

# Mock scholarship data (replace with database queries)
MOCK_SCHOLARSHIPS = [
    {
        "id": "sch_1",
        "name": "National Merit Scholarship",
        "category": "Merit-Based",
        "award": "₹2,07,500 - Full Tuition",
        "deadline": "October 2025",
        "description": "Awarded based on PSAT performance",
        "eligibility": ["High school senior", "US citizen", "High PSAT scores"],
        "requirements": ["PSAT scores", "Academic transcript", "Essay"],
        "applicationUrl": "https://example.com"
    },
    # Add more scholarships...
]

@router.get("/")
async def get_scholarships(page: int = 1, pageSize: int = 20):
    try:
        start = (page - 1) * pageSize
        end = start + pageSize
        
        scholarships = MOCK_SCHOLARSHIPS[start:end]
        
        response = ScholarshipSearchResponse(
            scholarships=scholarships,
            total=len(MOCK_SCHOLARSHIPS),
            page=page,
            pageSize=pageSize
        )
        
        return {
            "success": True,
            "data": response,
            "timestamp": datetime.now()
        }
    except Exception as e:
        return {
            "success": False,
            "error": {"message": str(e), "code": "SCHOLARSHIP_ERROR"},
            "timestamp": datetime.now()
        }

@router.get("/search")
async def search_scholarships(
    category: Optional[str] = None,
    keywords: Optional[str] = None,
    page: int = 1,
    pageSize: int = 20
):
    try:
        # TODO: Implement actual search logic with database
        filtered = MOCK_SCHOLARSHIPS
        
        if category:
            filtered = [s for s in filtered if s["category"] == category]
        
        if keywords:
            keywords_lower = keywords.lower()
            filtered = [
                s for s in filtered 
                if keywords_lower in s["name"].lower() or 
                   keywords_lower in s.get("description", "").lower()
            ]
        
        start = (page - 1) * pageSize
        end = start + pageSize
        
        response = ScholarshipSearchResponse(
            scholarships=filtered[start:end],
            total=len(filtered),
            page=page,
            pageSize=pageSize
        )
        
        return {
            "success": True,
            "data": response,
            "timestamp": datetime.now()
        }
    except Exception as e:
        return {
            "success": False,
            "error": {"message": str(e), "code": "SEARCH_ERROR"},
            "timestamp": datetime.now()
        }

@router.get("/{scholarship_id}")
async def get_scholarship_by_id(scholarship_id: str):
    try:
        # TODO: Query database
        scholarship = next(
            (s for s in MOCK_SCHOLARSHIPS if s["id"] == scholarship_id),
            None
        )
        
        if not scholarship:
            return {
                "success": False,
                "error": {"message": "Scholarship not found", "code": "NOT_FOUND"},
                "timestamp": datetime.now()
            }
        
        return {
            "success": True,
            "data": scholarship,
            "timestamp": datetime.now()
        }
    except Exception as e:
        return {
            "success": False,
            "error": {"message": str(e), "code": "SCHOLARSHIP_ERROR"},
            "timestamp": datetime.now()
        }
```

### 6. Requirements.txt

```txt
fastapi==0.104.1
uvicorn==0.24.0
pydantic==2.5.0
python-jose[cryptography]==3.3.0
passlib[bcrypt]==1.7.4
python-multipart==0.0.6
transformers==4.35.0
torch==2.1.0
accelerate==0.24.1
```

### 7. Running the Application

Create a `README.md` in your Hugging Face Space:

```markdown
---
title: Scholarship Chatbot API
emoji: 🎓
colorFrom: blue
colorTo: purple
sdk: docker
pinned: false
---

# Scholarship Chatbot API

Backend API for the Scholarship Chatbot application.

## Setup

Install dependencies:
```bash
pip install -r requirements.txt
```

Run the application:
```bash
uvicorn app:app --host 0.0.0.0 --port 7860
```

## API Documentation

Once running, visit:
- API Docs: `https://your-space.hf.space/docs`
- ReDoc: `https://your-space.hf.space/redoc`
```

## Database Options

### Option 1: SQLite (Simple)
```python
import sqlite3

def get_db():
    conn = sqlite3.connect('scholarship.db')
    return conn
```

### Option 2: PostgreSQL (Production)
```python
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

DATABASE_URL = os.getenv("DATABASE_URL")
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()
```

### Option 3: Hugging Face Datasets
```python
from datasets import load_dataset

dataset = load_dataset("your-username/scholarships-dataset")
```

## Deployment to Hugging Face Spaces

1. Create a new Space on Hugging Face
2. Choose "Docker" or "Gradio" SDK
3. Upload your files
4. Set environment variables in Space settings
5. Your API will be available at: `https://your-username-your-space.hf.space`

## Security Recommendations

1. Use environment variables for secrets
2. Implement rate limiting
3. Add input validation
4. Use HTTPS only
5. Implement proper authentication
6. Add logging and monitoring
7. Sanitize user inputs
8. Use prepared statements for database queries

## Testing

Test your API locally before deploying:
```bash
# Test health endpoint
curl http://localhost:7860/health

# Test chat endpoint
curl -X POST http://localhost:7860/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Show me scholarships for engineering"}'
```
