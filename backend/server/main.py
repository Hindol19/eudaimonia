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
################## PYDANTIC MODELS ###################
######################################################


class User(BaseModel):
    username: str
    usertype: str
    password: str


class Happiness(BaseModel):
    username: str
    emotional_well_being: int
    social_interactions: int
    physical_health: int
    stress_levels: int
    life_satisfaction: int


class Login(BaseModel):
    username: str
    password: str


class Token(BaseModel):
    access_token: str
    token_type: str
    username: str
    usertype: str


class Question(BaseModel):
    username: str
    question: str
    answer: str
    type: str
    therapist_name: str
    therapist_rating: float


class TokenData(BaseModel):
    username: Optional[str] = None

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


@app.get('/get_questions')
def get_questions(username: str):
    userid = db["users"].find_one({"username": username})['_id']
    questions = list(db.questions.find(
        {"userid": userid}, {"_id": 0, "userid": 0}))

    # print(questions)
    # if not questions:
    #     raise HTTPException(
    #         status_code=404, detail="No questions found for this user")

    return questions
