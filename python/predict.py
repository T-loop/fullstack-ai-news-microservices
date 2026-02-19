import joblib

class Predictor:
    def __init__(self):
        self.model = joblib.load("multinomial_nb_model.joblib")

    def text_to_predict(self, text: str):
        prediction = self.model.predict([text])
        return prediction[0]
