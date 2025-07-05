from fastapi import FastAPI, File, UploadFile, Form, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
from ml_engine import get_answer, ocr_image
import uvicorn

app = FastAPI()

# Configure CORS - now includes both frontend ports (Vite/React and possible others)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",  # Default React port
        "http://localhost:5173",  # Default Vite port
        "http://127.0.0.1:3000",
        "http://127.0.0.1:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class QuestionRequest(BaseModel):
    text: str

@app.get("/")
async def health_check():
    return {"status": "ok", "message": "ParentPal AI Backend is running"}

@app.post("/ask")
async def ask_question(
    request: Request,
    file: Optional[UploadFile] = File(None),
    question: Optional[str] = Form(None)
):
    """
    Unified endpoint that handles:
    - JSON requests
    - File uploads with OCR
    - Plain text questions
    """
    
    # Handle JSON body
    if request.headers.get("content-type", "").startswith("application/json"):
        try:
            data = await request.json()
            text = data.get("text", "")
            if text:
                answer = get_answer(text)
                return {"answer": answer}
            return {"error": "No text provided in JSON body"}
        except Exception as e:
            return {"error": f"JSON processing error: {str(e)}"}

    # Handle file upload with OCR
    if file:
        try:
            contents = await file.read()
            extracted_text, answer = ocr_image(contents)
            return {
                "extracted_text": extracted_text,
                "answer": answer,
                "status": "success"
            }
        except Exception as e:
            return {"error": f"OCR processing failed: {str(e)}"}

    # Handle plain form field question
    if question:
        try:
            answer = get_answer(question)
            return {"answer": answer}
        except Exception as e:
            return {"error": f"Question processing failed: {str(e)}"}

    return {"error": "No valid input received"}

if __name__ == "__main__":
    uvicorn.run(
        app,
        host="0.0.0.0",
        port=8000,
        reload=True  # Optional: enables auto-reload during development
    )