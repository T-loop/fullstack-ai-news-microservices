from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class Item(BaseModel):
    title: str
    content: str

@app.get("/")
def root():
    return {"message": "FastAPI läuft "}

@app.post("/classify")
def classify_item(item: Item):
    # hier später ML / Regeln / Logik
    return {
        "category": "wissenschaft"
    }
