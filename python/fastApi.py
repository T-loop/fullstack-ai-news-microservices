from fastapi import FastAPI
from pydantic import BaseModel
from predict import Predictor
import time

app = FastAPI()
predictor = Predictor()
class Item(BaseModel):
    title: str
    content: str

@app.get("/")
def root():
    return {"message": "FastAPI läuft"}

@app.post("/classify")
def classify_item(item: Item):
    start=time.time()
    text = item.title + " " + item.content
    category = predictor.text_to_predict(text)

    end= time.time()

    print("AntwortZeit", end-start, "Sekunden")

    return {"category": category}
