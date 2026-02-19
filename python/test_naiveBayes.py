
import time
import pandas as pd
from sklearn.pipeline import Pipeline
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, classification_report

# CSV laden
df = pd.read_csv("train_data.csv", sep=";")

# Trainings- und Testdaten splitten
X_train, X_test, y_train, y_test = train_test_split(
    df["text"], df["label"], test_size=0.3, random_state=42
)

# Deutsche Stopwörter
GERMAN_STOPWORDS = [
    "und","oder","aber","nicht","ist","sind","war","waren","sein","hat","haben",
    "ich","du","er","sie","es","wir","ihr","der","die","das","ein","eine","einer",
    "mit","von","für","auf","im","am","an","zu","den","dem","des","dass","wie",
    "bei","über","nach","vor","zwischen","ohne","unter","mehr","sehr","auch",
    "noch","nur","schon","wird","werden","kann","könnte","soll","sollte"
]

# Pipeline: TF-IDF + Multinomial Naive Bayes
model = Pipeline([
    ("tfidf", TfidfVectorizer(stop_words=GERMAN_STOPWORDS, lowercase=True)),
    ("classifier", MultinomialNB(alpha=1.0))
])

# Trainieren
starttime=time.time()

model.fit(X_train, y_train)

endtime=time.time()

difference= endtime-starttime

print("Zeit Training", difference)

# Vorhersagen auf Testdaten
y_pred = model.predict(X_test)

# Metriken berechnen
print("Accuracy:", accuracy_score(y_test, y_pred))
print("Precision (macro):", precision_score(y_test, y_pred, average="macro"))
print("Recall (macro):", recall_score(y_test, y_pred, average="macro"))
print("F1-Score (macro):", f1_score(y_test, y_pred, average="macro"))

#  detaillierter Bericht pro Klasse
print("\nClassification Report:\n", classification_report(y_test, y_pred))
