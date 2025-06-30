import csv

clean_rows = []
with open("knowledge_base.csv", newline='', encoding='utf-8') as csvfile:
    reader = csv.DictReader(csvfile)
    for row in reader:
        if row.get("topic") and row.get("question") and row.get("answer"):
            clean_rows.append({
                "topic": row["topic"].strip(),
                "question": row["question"].strip(),
                "answer": row["answer"].strip()
            })

with open("knowledge_base.csv", "w", newline='', encoding='utf-8') as csvfile:
    fieldnames = ["topic", "question", "answer"]
    writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
    writer.writeheader()
    writer.writerows(clean_rows)

print(f"✅ CSV cleaned. Remaining entries: {len(clean_rows)}")
