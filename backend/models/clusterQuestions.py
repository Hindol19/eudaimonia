from nltk.corpus import stopwords
import pandas as pd
import nltk
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.cluster import KMeans
import joblib

# Load the CSV file
data = pd.read_csv('backend\\models\\data\\questions.csv')

# Preprocess the text
nltk.download('stopwords')
nltk.download('punkt')


def preprocess_text(text):
    stop_words = set(stopwords.words('english'))
    tokens = nltk.word_tokenize(text)
    tokens = [word for word in tokens if word.isalpha()]  # Remove punctuation
    tokens = [word for word in tokens if word.lower() not in stop_words]
    return ' '.join(tokens)


data['processed_questions'] = data['Question'].apply(preprocess_text)

# Vectorize the text using TF-IDF
vectorizer = TfidfVectorizer(max_features=1000)
X = vectorizer.fit_transform(data['processed_questions'])

# Apply KMeans clustering
num_clusters = 4  # categories: depression, anxiety, guilt, fear
kmeans = KMeans(n_clusters=num_clusters, random_state=42)
kmeans.fit(X)


#  Save the KMeans model and TF-IDF vectorizer
model_filename = 'backend\\models\\model\\kmeans_model.pkl'
vectorizer_filename = 'backend\\models\\model\\tfidf_vectorizer.pkl'

joblib.dump(kmeans, model_filename)
joblib.dump(vectorizer, vectorizer_filename)

print(f'Model saved as {model_filename}')
print(f'Vectorizer saved as {vectorizer_filename}')
