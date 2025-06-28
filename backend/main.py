from fastapi import FastAPI, File, UploadFile, Form, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # adjust as needed
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
    # Try to handle JSON body if content-type is application/json
    if request.headers.get("content-type", "").startswith("application/json"):
        data = await request.json()
        text = data.get("text")
        return {"answer": f"Got your JSON question: '{text}'. Here's a helpful explanation!"}

    # Otherwise handle form data with optional file upload
    if file:
        contents = await file.read()
        # Simulate processing the file
        return {"answer": "Read your uploaded image and generated an explanation!"}
    elif question:
        return {"answer": f"Received text: '{question}', here's an explanation!"}
    else:
        return {"answer": "No input received."}
