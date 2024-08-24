import pandas as pd
import joblib
import nltk
from nltk.corpus import stopwords

# Ensure NLTK resources are available
nltk.download('stopwords')
nltk.download('punkt')
nltk.download('punkt_tab')


class ClusterQuestions:
    def load_model():
        # Load the saved model and vectorizer
        kmeans = joblib.load('..\\models\\kmeans_model.pkl')
        vectorizer = joblib.load('..\\models\\tfidf_vectorizer.pkl')       
        return kmeans, vectorizer

    # Define the same preprocessing function used earlier
    def preprocess_text(text):
        stop_words = set(stopwords.words('english'))
        tokens = nltk.word_tokenize(text)
        # Remove punctuation
        tokens = [word for word in tokens if word.isalpha()]
        tokens = [word for word in tokens if word.lower() not in stop_words]
        return ' '.join(tokens)

    # for forming cluster of questions
    def form_cluster(dataPath, outputPath):
        # Load the new dataset containing questions
        data = pd.read_csv(dataPath)  # Replace with your file path

        # Apply preprocessing to each question
        data['processed_questions'] = data['Question'].apply(
            ClusterQuestions.preprocess_text)

        # Load the saved model and vectorizer
        kmeans, vectorizer = ClusterQuestions.load_model()

        # Vectorize the processed questions using the saved TF-IDF vectorizer
        X_new = vectorizer.transform(data['processed_questions'])

        # Predict the clusters for the new questions using the saved KMeans model
        data['cluster'] = kmeans.predict(X_new)

        # Map clusters to categories
        cluster_to_category = {
            0: 'depression',
            1: 'anxiety',
            2: 'guilt',
            3: 'fear'
        }

        # Assign categories based on the cluster labels
        data['category'] = data['cluster'].map(cluster_to_category)

        # # Display the labeled data
        # print(data[['Question', 'category']])

        # Save the labeled data to a new CSV file
        outputPath += 'labeled_questions.csv'
        data.to_csv(outputPath, index=False)
        print("Labeled questions have been saved to 'labeled_questions.csv'")

    def predict_label(question):
        # Load the saved model and vectorizer
        kmeans, vectorizer = ClusterQuestions.load_model()

        cluster_to_category = {
            0: 'depression',
            1: 'anxiety',
            2: 'guilt',
            3: 'fear'
        }
        # Preprocess the question
        processed_question = ClusterQuestions.preprocess_text(question)

        # Vectorize the question using the saved TF-IDF vectorizer
        vectorized_question = vectorizer.transform([processed_question])

        # Predict the cluster using the saved KMeans model
        cluster_label = kmeans.predict(vectorized_question)[0]

        # Map the cluster label to a category
        category = cluster_to_category.get(cluster_label, 'Unknown')

        # print(category)
        return category


# ClusterQuestions.form_cluster('backend\models\data\questions.csv', 'backend/')
# ClusterQuestions.predict_label('Being around people makes me anxious enough to make me not leave home for days. How do I deal with this?')
