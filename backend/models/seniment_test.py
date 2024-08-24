# Install required libraries
# pip install transformers torch vaderSentiment gensim

import torch
from transformers import BertTokenizer, BertForSequenceClassification, pipeline
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
from gensim import corpora
from gensim.models import LdaModel
import numpy as np

# Define paths for saving models
model_save_path = "backend\\models\\bert_psychological_state_model.pth"
tokenizer_save_path = "backend\\models\\bert_tokenizer"
lda_model_save_path = "backend\\models\\lda_model"
dictionary_save_path = "backend\\models\\lda_dictionary.dict"
sentiment_pipeline_save_path = "backend\\models\\sentiment_analysis_pipeline"

# Initialize BERT tokenizer and model for psychological state classification
tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')
model = BertForSequenceClassification.from_pretrained('bert-base-uncased', num_labels=5)  # Adjust num_labels as needed

# Initialize sentiment analysis pipeline
sentiment_pipeline = pipeline("sentiment-analysis")

# Sample texts for topic modeling (replace with actual text corpus)
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

# Save the models
torch.save(model.state_dict(), model_save_path)
tokenizer.save_pretrained(tokenizer_save_path)
lda_model.save(lda_model_save_path)
dictionary.save(dictionary_save_path)
sentiment_pipeline.model.save_pretrained(sentiment_pipeline_save_path)
sentiment_pipeline.tokenizer.save_pretrained(sentiment_pipeline_save_path)

# Functions for analysis and recommendations
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

# Load the models (for future use or testing)
# Load the BERT model
model = BertForSequenceClassification.from_pretrained('bert-base-uncased', num_labels=5)
model.load_state_dict(torch.load(model_save_path))
model.eval()

# Load the tokenizer
tokenizer = BertTokenizer.from_pretrained(tokenizer_save_path)

# Load the LDA model and dictionary
lda_model = LdaModel.load(lda_model_save_path)
dictionary = corpora.Dictionary.load(dictionary_save_path)

# Load sentiment analysis pipeline
sentiment_pipeline = pipeline("sentiment-analysis", model=sentiment_pipeline_save_path, tokenizer=sentiment_pipeline_save_path)
