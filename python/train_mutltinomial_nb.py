import pandas as pd
import joblib
import time

from sklearn.pipeline import Pipeline
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB


def train_text_with_labels(texts, labels):
    

    # Deutsche Stopwörter
    GERMAN_STOPWORDS = [
        "und","oder","aber","nicht","ist","sind","war","waren","sein","hat","haben",
        "ich","du","er","sie","es","wir","ihr","der","die","das","ein","eine","einer",
        "mit","von","für","auf","im","am","an","zu","den","dem","des","dass","wie",
        "bei","über","nach","vor","zwischen","ohne","unter","mehr","sehr","auch",
        "noch","nur","schon","wird","werden","kann","könnte","soll","sollte"
    ]

    model = Pipeline([

        # TF-IDF Vektorisierung
        ("tfidf", TfidfVectorizer(
            lowercase=True,
            stop_words=GERMAN_STOPWORDS
        )),

        # Multinomial Naive Bayes
        ("classifier", MultinomialNB(
            alpha=1.0   # Laplace Glätung
        ))
    ])

    starttime = time.time()
    model.fit(texts, labels)
    endtime = time.time()

    print("Trainingszeit:", endtime - starttime, "Sekunden")

    return model


if __name__ == "__main__":

    df = pd.read_csv("train_data.csv", sep=";")

    model = train_text_with_labels(
        df["text"],
        df["label"]
    )

    joblib.dump(model, "multinomial_nb_model.joblib")
    print("Multinomial Naive Bayes Modell gespeichert")
