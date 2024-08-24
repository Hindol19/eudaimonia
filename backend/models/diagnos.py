import json
import torch
from transformers import BertTokenizer, BertForSequenceClassification, pipeline
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
from gensim import corpora
from gensim.models import LdaModel
import numpy as np

model_save_path = "backend\\models\\bert_psychological_state_model.pth"
tokenizer_save_path = "backend\\models\\bert_tokenizer"
lda_model_save_path = "backend\\models\\lda_model"
dictionary_save_path = "backend\\models\\lda_dictionary.dict"
sentiment_pipeline_save_path = "backend\\models\\sentiment_analysis_pipeline"

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

# Define file paths
questions_file_path = 'backend\\models\\data\\sentiment_questions.json'
recommendations_file_path = 'backend\\models\\data\\recommendations.json'

# Load JSON files
with open(questions_file_path, 'r') as file:
    questions = json.load(file)

with open(recommendations_file_path, 'r') as file:
    recommendations_data = json.load(file)

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
        recommendations.extend(recommendations_data['remedies'].get('stress', []))
    if predictions[1] > anxiety_threshold:
        recommendations.extend(recommendations_data['remedies'].get('anxiety', []))
    if not (predictions[0] > stress_threshold or predictions[1] > anxiety_threshold):
        recommendations.append("Maintain a healthy lifestyle with balanced diet and regular exercise.")

    if sentiment[0]['label'] == 'NEGATIVE':
        recommendations.append("It may be helpful to speak with a mental health professional.")

    return recommendations

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

# Analyze each question and provide solutions
results = {}
for question in questions:
    result = get_analysis_with_recommendations(question)
    results[question] = result

# Print results
for question, result in results.items():
    print(f"Question: {question}")
    print(f"Analysis Results: {result['analysis']}")
    print(f"Recommendations: {result['recommendations']}")
    print()
