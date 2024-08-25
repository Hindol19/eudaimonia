from gemini import GeminiClient  # Hypothetical library
import json

# Initialize the Gemini client with your API key
client = GeminiClient(api_key='your-gemini-api-key')

# Define file paths
responses_file_path = "backend/models/data/responses.json"

# Load responses data
with open(responses_file_path, 'r') as file:
    responses_data = json.load(file)

# Define analysis functions
def analyze_sentiment(text):
    result = client.sentiment_analysis(text)
    return result

def classify_psychological_state(text):
    result = client.psychological_state_classification(text)
    return result

def analyze_topics(text):
    result = client.topic_modeling(text)
    return result

def provide_recommendations(predictions, sentiment):
    stress_threshold = 0.7
    anxiety_threshold = 0.7

    recommendations = []

    if predictions['stress'] > stress_threshold:
        recommendations.extend(responses_data.get('stress', {}).get('solutions', []))
    if predictions['anxiety'] > anxiety_threshold:
        recommendations.extend(responses_data.get('anxiety', {}).get('solutions', []))
    if not (predictions['stress'] > stress_threshold or predictions['anxiety'] > anxiety_threshold):
        recommendations.extend(responses_data.get('general', {}).get('solutions', []))

    if sentiment['label'] == 'NEGATIVE':
        recommendations.extend(responses_data.get('general', {}).get('solutions', []))

    return ' '.join(recommendations)

def generate_report(text, sentiment, predictions, topics, recommendations):
    report = f"Input Text: {text}\n"
    report += "Analysis Results:\n"
    report += f"  Sentiment: {sentiment['label']} (Score: {sentiment['score']:.2f})\n"
    
    # Psychological States
    report += "  Psychological States:\n"
    for state, prob in predictions.items():
        report += f"    {state}: {prob * 100:.2f}%\n"
    
    # Topics
    report += "  Topics Detected:\n"
    for topic in topics:
        report += f"    {topic}\n"
    
    # Recommendations
    report += "Recommendations:\n"
    report += f"  - {recommendations}\n"

    return report

def get_analysis_with_recommendations(text):
    sentiment = analyze_sentiment(text)
    predictions = classify_psychological_state(text)
    topics = analyze_topics(text)
    recommendations = provide_recommendations(predictions, sentiment)
    return {
        'sentiment': sentiment,
        'predictions': predictions,
        'topics': topics,
        'recommendations': recommendations
    }

# Example usage
text_input = "I feel overwhelmed and exhausted. I have trouble sleeping and focusing."
result = get_analysis_with_recommendations(text_input)

# Generate and print report
report = generate_report(text_input, result['sentiment'], result['predictions'], result['topics'], result['recommendations'])
print(report)
