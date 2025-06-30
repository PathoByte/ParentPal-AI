from fastapi import FastAPI, File, UploadFile, Form, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional

from ml_engine import get_answer, ocr_image  # import OCR too

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class QuestionRequest(BaseModel):
    text: str

@app.post("/api/explain")
async def explain(
    request: Request,
    file: Optional[UploadFile] = File(None),
    question: Optional[str] = Form(None)
):
    # Handle JSON body
    if request.headers.get("content-type", "").startswith("application/json"):
        data = await request.json()
        text = data.get("text")
        if text:
            answer = get_answer(text)
            return {"answer": answer}
        else:
            return {"answer": "No text found in JSON body."}

    # Handle file upload with OCR
    if file:
        contents = await file.read()
        extracted_text, answer = ocr_image(contents)
        return {
            "extracted_text": extracted_text,
            "answer": answer
        }
    # Handle plain form field question
    elif question:
        answer = get_answer(question)
        return {"answer": answer}
    else:
        return {"answer": "No input received."}
