# Install required libraries
# pip install transformers torch vaderSentiment gensim

from transformers import BertTokenizer, BertForSequenceClassification, pipeline
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
from gensim import corpora
from gensim.models import LdaModel
import numpy as np
import torch

# Load pre-trained models
# Initialize BERT tokenizer and model for psychological state classification
tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')
model = BertForSequenceClassification.from_pretrained('bert-base-uncased', num_labels=5)  # Adjust num_labels as needed

# Initialize sentiment analysis pipeline
sentiment_pipeline = pipeline("sentiment-analysis")

# Sample texts for topic modeling (should be replaced with actual text corpus)
texts = [
    ["I am feeling very stressed about my upcoming exams."],
    ["I have been feeling quite low and lacking motivation lately."],
    ["My sleep has been disrupted and I can't focus during the day."],
    # Add more texts here
]

# Prepare the corpus and dictionary for LDA topic modeling
dictionary = corpora.Dictionary(texts)
corpus = [dictionary.doc2bow(text) for text in texts]

# Initialize LDA model
lda_model = LdaModel(corpus, num_topics=5, id2word=dictionary, passes=15)

# Define analysis functions
def analyze_sentiment(text):
    return sentiment_pipeline(text)

def classify_psychological_state(text):
    inputs = tokenizer(text, return_tensors="pt")
    outputs = model(**inputs)
    predictions = torch.sigmoid(outputs.logits).detach().numpy().flatten()  # Flatten the array
    return predictions

def analyze_topics(text):
    bow = dictionary.doc2bow(text.split())
    topics = lda_model.get_document_topics(bow)
    return topics

def analyze_text(text):
    sentiment = analyze_sentiment(text)
    predictions = classify_psychological_state(text)
    topics = analyze_topics(text)
    
    return {
        'sentiment': sentiment,
        'predictions': predictions,
        'topics': topics
    }

def provide_recommendations(predictions, sentiment):
    # Example thresholds and recommendations
    stress_threshold = 0.7
    anxiety_threshold = 0.7

    recommendations = []

    if predictions[0] > stress_threshold:
        recommendations.append("Consider relaxation techniques, time management, and regular breaks.")
    if predictions[1] > anxiety_threshold:
        recommendations.append("Try mindfulness exercises, grounding techniques, and professional support if needed.")
    if not (predictions[0] > stress_threshold or predictions[1] > anxiety_threshold):
        recommendations.append("Maintain a healthy lifestyle with balanced diet and regular exercise.")

    if sentiment[0]['label'] == 'NEGATIVE':
        recommendations.append("It may be helpful to speak with a mental health professional.")

    return ' '.join(recommendations)

def get_analysis_with_recommendations(text):
    analysis_result = analyze_text(text)
    recommendations = provide_recommendations(
        predictions=analysis_result['predictions'], 
        sentiment=analysis_result['sentiment']
    )
    return {
        'analysis': analysis_result,
        'recommendations': recommendations
    }

# Example usage
text_input = "I feel overwhelmed and exhausted. I have trouble sleeping and focusing."
result = get_analysis_with_recommendations(text_input)

print("Analysis Results:", result['analysis'])
print("Recommendations:", result['recommendations'])
