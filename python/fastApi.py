from fastapi import FastAPI
from pydantic import BaseModel
from predict import Predictor

app = FastAPI()

class Item(BaseModel):
    title: str
    content: str

@app.get("/")
def root():
    return {"message": "FastAPI läuft"}

@app.post("/classify")
def classify_item(item: Item):
    predictor = Predictor()
    category = predictor.text_to_predict(item.content)
    return {"category": category}
