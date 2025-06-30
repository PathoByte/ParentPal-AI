import csv

# New Q&A entries to add
new_data = [
    {"topic": "Biology", "question": "What is chlorophyll?", "answer": "Chlorophyll is the green pigment in plants that absorbs sunlight for photosynthesis."},
    {"topic": "Physics", "question": "What is Ohm's Law?", "answer": "Ohm's Law states that voltage equals current times resistance (V=IR)."},
    {"topic": "Chemistry", "question": "What is an isotope?", "answer": "Isotopes are atoms of the same element with different numbers of neutrons."},
    {"topic": "Math", "question": "What is a factorial?", "answer": "A factorial of a number n is the product of all positive integers less than or equal to n."},
    {"topic": "History", "question": "Who was Napoleon?", "answer": "Napoleon Bonaparte was a French military leader who became emperor of France."},
    {"topic": "Geography", "question": "What is the Amazon River?", "answer": "The Amazon River is the second longest river in the world, located in South America."},
    {"topic": "General", "question": "Who invented the telephone?", "answer": "Alexander Graham Bell is credited with inventing the first practical telephone."},
    {"topic": "Literature", "question": "Who wrote To Kill a Mockingbird?", "answer": "Harper Lee wrote To Kill a Mockingbird."},
    {"topic": "Computer Science", "question": "What is a binary number?", "answer": "A binary number is a number expressed in base-2, using only 0 and 1."},
    {"topic": "Astronomy", "question": "What is a comet?", "answer": "A comet is a small Solar System body made of ice, dust, and rocky material."},
    {"topic": "Economics", "question": "What is microeconomics?", "answer": "Microeconomics is the study of individual consumers and businesses in the economy."},
    {"topic": "Biology", "question": "What is a vaccine?", "answer": "A vaccine is a biological preparation that provides immunity to a particular disease."},
    {"topic": "Physics", "question": "What is acceleration?", "answer": "Acceleration is the rate of change of velocity over time."},
    {"topic": "Chemistry", "question": "What is pH?", "answer": "pH is a scale used to specify how acidic or basic a water-based solution is."},
    {"topic": "Math", "question": "What is a polynomial?", "answer": "A polynomial is an expression consisting of variables and coefficients."},
    {"topic": "History", "question": "What was the Renaissance?", "answer": "The Renaissance was a cultural movement that profoundly affected European intellectual life."},
    {"topic": "Geography", "question": "Where is the Great Barrier Reef?", "answer": "The Great Barrier Reef is located off the coast of Queensland, Australia."},
    {"topic": "General", "question": "Who was Albert Einstein?", "answer": "Albert Einstein was a theoretical physicist who developed the theory of relativity."},
    {"topic": "Literature", "question": "Who wrote The Great Gatsby?", "answer": "F. Scott Fitzgerald wrote The Great Gatsby."},
    {"topic": "Computer Science", "question": "What is an operating system?", "answer": "An operating system is system software that manages computer hardware and software resources."},
    {"topic": "Astronomy", "question": "What is a galaxy?", "answer": "A galaxy is a huge collection of gas, dust, and billions of stars and their solar systems."},
    {"topic": "Economics", "question": "What is demand elasticity?", "answer": "Demand elasticity measures how demand for a product changes with price."}
]

# Read existing CSV
existing_entries = set()
rows = []
with open("knowledge_base.csv", newline='', encoding='utf-8') as csvfile:
    reader = csv.DictReader(csvfile)
    for row in reader:
        rows.append(row)
        existing_entries.add((row["topic"].lower(), row["question"].lower()))

# Add new entries only if they don't exist
for item in new_data:
    key = (item["topic"].lower(), item["question"].lower())
    if key not in existing_entries:
        rows.append(item)
        existing_entries.add(key)

# Write back to CSV
with open("knowledge_base.csv", "w", newline='', encoding='utf-8') as csvfile:
    fieldnames = ["topic", "question", "answer"]
    writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
    writer.writeheader()
    writer.writerows(rows)

print(f"✅ CSV updated with new data. Total entries now: {len(rows)}")
