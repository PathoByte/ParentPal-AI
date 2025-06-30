import pytesseract
from PIL import Image
import io

def extract_text_from_image(image_bytes: bytes) -> str:
    # Load image from bytes
    image = Image.open(io.BytesIO(image_bytes))
    
    # Run OCR with Tesseract
    text = pytesseract.image_to_string(image)
    
    # Clean up result
    return text.strip()
