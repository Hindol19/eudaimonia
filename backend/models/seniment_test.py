import torch
from transformers import BertTokenizer, BertForSequenceClassification, pipeline
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
from gensim import corpora
from gensim.models import LdaModel
import json

# Define paths
model_save_path = "backend/models/bert_psychological_state_model.pth"
tokenizer_save_path = "backend/models/bert_tokenizer"
lda_model_save_path = "backend/models/lda_model"
dictionary_save_path = "backend/models/lda_dictionary.dict"
sentiment_pipeline_save_path = "backend/models/sentiment_analysis_pipeline"
responses_file_path = "backend/models/data/responses.json"

# Load models
tokenizer = BertTokenizer.from_pretrained(tokenizer_save_path)
model = BertForSequenceClassification.from_pretrained(tokenizer_save_path, num_labels=5)
model.load_state_dict(torch.load(model_save_path))
model.eval()

sentiment_pipeline = pipeline("sentiment-analysis", model=sentiment_pipeline_save_path, tokenizer=sentiment_pipeline_save_path)

lda_model = LdaModel.load(lda_model_save_path)
dictionary = corpora.Dictionary.load(dictionary_save_path)

with open(responses_file_path, 'r') as file:
    responses_data = json.load(file)

# Define topic mapping
topic_mapping = {
    0: "Stress",
    1: "Anxiety",
    2: "Fear",
    3: "Depression",
    4: "Other"
}

# Functions for analysis and recommendations
def analyze_sentiment(text):
    return sentiment_pipeline(text)

def classify_psychological_state(text):
    inputs = tokenizer(text, return_tensors="pt")
    outputs = model(**inputs)
    logits = outputs.logits.detach().numpy().flatten()
    predictions = torch.sigmoid(outputs.logits).detach().numpy().flatten()
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
    stress_threshold = 0.7
    anxiety_threshold = 0.7

    recommendations = []

    if predictions[0] > stress_threshold:
        recommendations.extend(responses_data.get('stress', {}).get('solutions', []))
    if predictions[1] > anxiety_threshold:
        recommendations.extend(responses_data.get('anxiety', {}).get('solutions', []))
    if not (predictions[0] > stress_threshold or predictions[1] > anxiety_threshold):
        recommendations.extend(responses_data.get('general', {}).get('solutions', []))

    if sentiment[0]['label'] == 'NEGATIVE':
        recommendations.extend(responses_data.get('general', {}).get('solutions', []))

    return ' '.join(recommendations)

def generate_report(text, analysis_result, recommendations):
    sentiment = analysis_result['sentiment'][0]['label']
    sentiment_score = analysis_result['sentiment'][0]['score']
    predictions = analysis_result['predictions']
    topics = analysis_result['topics']

    report = f"Input Text: {text}\n"
    report += "Analysis Results:\n"
    report += f"  Sentiment: {sentiment} (Score: {sentiment_score:.2f})\n"
    
    # Detailed psychological state
    states = ["Stress", "Anxiety", "Fear", "Depression", "Other"]
    report += "  Psychological States:\n"
    for i, state in enumerate(states):
        report += f"    {state}: {predictions[i] * 100:.2f}%\n"
    
    # Topics
    report += "  Topics Detected:\n"
    for topic_id, prob in topics:
        topic_name = topic_mapping.get(topic_id, "Unknown Topic")
        report += f"    {topic_name} (ID: {topic_id}): Probability {prob:.2f}\n"
    
    # Recommendations
    report += "Recommendations:\n"
    for rec in recommendations:
        report += f"  - {rec}\n"

    return report

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

# Generate and print report
report = generate_report(text_input, result['analysis'], result['recommendations'])
print(report)
