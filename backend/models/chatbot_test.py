import re
import pandas as pd
from sklearn.model_selection import train_test_split
from transformers import AutoTokenizer, AutoModelForSequenceClassification, Trainer, TrainingArguments, AdamW
import nlpaug.augmenter.word as naw
from flask import Flask, request, jsonify

# 1. Data Preparation and Preprocessing
def preprocess_text(text):
    text = text.lower()  # Convert to lowercase
    text = re.sub(r'http\S+', '', text)  # Remove URLs
    text = re.sub(r'[^a-zA-Z\s]', '', text)  # Remove special characters and numbers
    text = re.sub(r'\s+', ' ', text).strip()  # Remove extra spaces
    return text

# Load your dataset
data = pd.read_csv('path_to_your_dataset.csv')  # Replace with your dataset path

# Apply preprocessing
data['text'] = data['text'].apply(preprocess_text)

# Split the data
train_texts, val_texts, train_labels, val_labels = train_test_split(
    data['text'], data['label'], test_size=0.2, stratify=data['label'], random_state=42
)

# Data Augmentation
aug = naw.SynonymAug(aug_src='wordnet')
augmented_texts = [aug.augment(text) for text in train_texts]
train_texts = train_texts.tolist() + augmented_texts
train_labels = train_labels.tolist() * 2  # Duplicate labels accordingly

# Tokenization
tokenizer = AutoTokenizer.from_pretrained("gemini-api-model")  # Replace with actual model name
train_encodings = tokenizer(list(train_texts), truncation=True, padding=True, max_length=128)
val_encodings = tokenizer(list(val_texts), truncation=True, padding=True, max_length=128)

# 2. Model Fine-Tuning
model = AutoModelForSequenceClassification.from_pretrained("gemini-api-model")

training_args = TrainingArguments(
    output_dir='./results',
    num_train_epochs=5,
    per_device_train_batch_size=16,
    per_device_eval_batch_size=16,
    warmup_steps=1000,
    weight_decay=0.01,
    learning_rate=2e-5,
    logging_dir='./logs',
    logging_steps=50,
    evaluation_strategy="epoch",
    save_strategy="epoch",
    load_best_model_at_end=True,
    metric_for_best_model="accuracy",
)

optimizer = AdamW(model.parameters(), lr=2e-5, weight_decay=0.01)

trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=train_encodings,
    eval_dataset=val_encodings,
    optimizers=(optimizer, None)
)

# Train the model
trainer.train()

# 3. Sentiment Analysis and Response Generation
def analyze_sentiment(text):
    inputs = tokenizer(text, return_tensors='pt', truncation=True, padding=True)
    outputs = model(**inputs)
    logits = outputs.logits
    probs = logits.softmax(dim=-1)
    confidence, sentiment = probs.max(dim=-1)

    if confidence.item() > 0.8:
        return sentiment.item()
    else:
        return None  # Low confidence

def generate_response(sentiment):
    if sentiment == 0:  # Negative sentiment
        return "It sounds like you're going through a tough time. Remember, it's okay to feel this way. Let's explore some ways to help you feel better."
    elif sentiment == 1:  # Neutral sentiment
        return "I understand. Sometimes it's good to talk things through. Is there something specific on your mind?"
    elif sentiment == 2:  # Positive sentiment
        return "I'm glad to hear that! It's important to focus on the positives. Keep it up!"
    else:
        return "I'm not sure. Could you elaborate on how you're feeling?"

# 4. Deploying the Chatbot with Flask
app = Flask(__name__)

@app.route('/chat', methods=['POST'])
def chat():
    user_input = request.json.get('text')
    sentiment = analyze_sentiment(user_input)
    
    if sentiment is not None:
        response = generate_response(sentiment)
    else:
        response = "I'm here to help. Could you tell me more about how you're feeling?"
    
    return jsonify({"response": response})

if __name__ == '__main__':
    app.run(debug=True)
