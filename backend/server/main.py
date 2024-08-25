from typing import Optional
from fastapi import FastAPI, HTTPException, Depends, Request, status
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from hashing import Hash
from jwttoken import create_access_token
from oauth import get_current_user
from fastapi.security import OAuth2PasswordRequestForm
from fastapi.middleware.cors import CORSMiddleware
import os
from dotenv import load_dotenv
from pymongo import MongoClient
from cluster import ClusterQuestions
from diagnos import Diagnose
import json


def __init__(self):
    self.cluster = ClusterQuestions()

# score = Happiness.calculate_happiness_score(input_dict)
# label = ClusterQuestions.predict_label(question)


def __init__(self):
    self.diagnose = Diagnose()
# recommendations = Diagnose.get_analysis_with_recommendations(text)


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


class Survey(BaseModel):
    answer: str


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


@app.post('/register')
def create_user(request: User):
    # Check if the user already exists
    existing_user = db["users"].find_one({"username": request.username})
    if existing_user:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                            detail="Username already registered")

    # If the user doesnt exist
    hashed_pass = Hash.bcrypt(request.password)
    user_object = request.model_dump()
    user_object["password"] = hashed_pass
    # user_object["usertype"] = request.usertype
    print(user_object)
    user_id = db.users.insert_one(user_object)
    # print(user)
    return {"res": "created"}


@app.post('/login')
async def login(request: Login):
    user = db["users"].find_one({"username": request.username})

    # print(request)
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f'No user found with this {request.username} username')
    if not Hash.verify(user["password"], request.password):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f'Wrong Username or password')
    access_token = create_access_token(data={"sub": user["username"]})

    return {"access_token": access_token, "token_type": "bearer", "username": user["username"], "usertype": user["usertype"]}


@app.post('/generate_report')
def generate_report(request: Survey):
    request = str(request)
    # print(request, type(request))
    recommendations = Diagnose.get_analysis_with_recommendations(request)
    return recommendations


@app.post('/up_questions')
def up_questions(request: Question):
    # DEMO QUESTION
    # Being around people makes me anxious enough to make me not leave home for days. How do I deal with this?
    # print(request)
    userid = db["users"].find_one({"username": request.username})['_id']
    question_object = request.model_dump()
    question_object['userid'] = userid
    question_object['label'] = ClusterQuestions.predict_label(request.question)
    del question_object['username']
    # print(question_object)
    db.questions.insert_one(question_object)


@app.post('/up_answer')
def up_questions(request: Question):
    print(request)


@app.get('/get_questions')
def get_questions(username: str):
    userid = db["users"].find_one({"username": username})['_id']
    questions = list(db.questions.find(
        {"userid": userid}, {"_id": 0, "userid": 0}))

    return questions
