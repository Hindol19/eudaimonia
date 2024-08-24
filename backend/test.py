import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv()

genai.configure(api_key=os.getenv('GEMINI_API_KEY'))

model = genai.GenerativeModel('gemini-1.5-flash')

response = model.generate_content(
    "I am very depressed. i am stuck in a hackathon with no sleep, no food.")
print(response.text)