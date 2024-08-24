from typing import Optional
from fastapi import FastAPI, HTTPException, Depends, Request, status
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from fastapi.security import OAuth2PasswordRequestForm
from fastapi.middleware.cors import CORSMiddleware
import os
from dotenv import load_dotenv
from pymongo import MongoClient


# score = Happiness.calculate_happiness_score(input_dict)
# label = ClusterQuestions.predict_label(question)


app = FastAPI()

######################################################
################## HANDLING CORS #####################
######################################################

origins = [
    "http://localhost:3000",
    "http://localhost:8080",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


######################################################
################ MONGODB CONNECTION ##################
######################################################


load_dotenv()

password = os.getenv('MONGO_PASSWORD')

mongodb_uri = f'mongodb+srv://hindolbanerjee5:{password}@cluster.f1gbs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster'

port = 8000
client = MongoClient(mongodb_uri)
db = client["User"]


@app.get('/')
def index():
    return {'data': 'Hello World 2'}
