# ml_engine.py
import easyocr
from PIL import Image
import numpy as np
from io import BytesIO
import csv


KNOWLEDGE_BASE = []
with open("knowledge_base.csv", newline='', encoding='utf-8') as csvfile:
    reader = csv.DictReader(csvfile)
    for row in reader:
        KNOWLEDGE_BASE.append({
            "topic": row["topic"],
            "question": row["question"],
            "answer": row["answer"]
        })
        
# Initialize easyocr reader for English
reader = easyocr.Reader(['en'])

def get_answer(question):
    q = question.lower()

    # Biology
    if "photosynthesis" in q:
        return "Photosynthesis is how plants use sunlight, water, and carbon dioxide to produce food and oxygen."
    elif "mitochondria" in q:
        return "The mitochondria is the powerhouse of the cell, producing energy."
    elif "cardiac arrest" in q:
        return "Cardiac arrest is when the heart suddenly stops beating, preventing blood flow to the brain and body."
    elif "digestion" in q:
        return "Digestion is the process of breaking down food so the body can absorb nutrients."

    # Chemistry
    elif "atom" in q:
        return "An atom is the smallest unit of matter, made of protons, neutrons, and electrons."
    elif "evaporation" in q:
        return "Evaporation is when a liquid changes into a gas, like water turning into vapor."
    elif "periodic table" in q:
        return "The periodic table organizes chemical elements by their properties."

    # Physics
    elif "gravity" in q:
        return "Gravity is the force that pulls objects toward each other, like us toward the Earth."
    elif "velocity" in q:
        return "Velocity is the speed of something in a given direction."
    elif "newton's laws" in q:
        return "Newton's laws describe the relationship between a body and the forces acting on it."

    # Math
    elif "pythagorean theorem" in q:
        return "The Pythagorean theorem states that a² + b² = c² in a right-angled triangle."
    elif "fraction" in q:
        return "A fraction represents a part of a whole, like 1/2 means one out of two equal parts."
    elif "prime number" in q:
        return "A prime number is a number greater than 1 that has no divisors other than 1 and itself."

    # History
    elif "world war ii" in q or "second world war" in q:
        return "World War II was a global war from 1939 to 1945 involving most of the world's nations."
    elif "industrial revolution" in q:
        return "The Industrial Revolution was a period of major industrialization during the late 1700s and early 1800s."

    # Geography
    elif "equator" in q:
        return "The Equator is an imaginary line around the middle of Earth dividing it into northern and southern hemispheres."
    elif "continent" in q:
        return "A continent is a large continuous area of land; there are seven continents on Earth."

    # Extra general topics
    elif "democracy" in q:
        return "Democracy is a system of government where the people have the power to make decisions, often by voting."
    elif "ecosystem" in q:
        return "An ecosystem is a community of living organisms interacting with their environment."

    else:
        return "Sorry, I don't have an answer for that yet. Try asking about science, math, history, or geography topics!"


def ocr_image(image_bytes):
    """
    Extract text from an image using easyocr,
    then pass that text to get_answer.
    """
    image = Image.open(BytesIO(image_bytes)).convert("RGB")
    image_np = np.array(image)
    results = reader.readtext(image_np)
    extracted_text = " ".join([text for (_, text, _) in results])

    # After extracting text, generate the same type of answer
    answer = get_answer(extracted_text)
    return extracted_text, answer
