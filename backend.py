import numpy as np
import random
import matplotlib.pyplot as plt
import bson
from flask import Flask, request, jsonify
from pymongo import MongoClient

# Declare Flask app
app = Flask(__name__)

# Connect to MongoDB
client = MongoClient("mongodb+srv://a:h4S44Ru5M4R9qMDU@learnerai.xtsb7bl.mongodb.net")  # Update with your MongoDB connection string

# Access a database
db = client["questions"]  

# Access a collection
answers = db["answers"] 
surveys = db["surveys"]

@app.route("/")
def main():
    return "<b>Bazinga</b>"

#@app.route('/submit_answers')
def submit_student_answers(quizId:int, anslist:list[float], studentId=None):
    # answers can be an array of numbers
    answers.insert_one({"Quiz ID: ":str(quizId), "Answers: ":anslist})
    
@app.route('/get_survey_questions')
def get_survey_questions():
    # Read data from MongoDB collection
    cursor = surveys.find()
    arr = [bson.BSON.decode(doc) for doc in cursor]
    return arr

@app.route('/create_survey_with_topics')
def create_survey_with_topics():
    topics = request.args.get("topics").split(",")
    for t in topics:
        surveys.insert_one({"Question":"How comfortable do you feel with " + str(t)})

    selected = request.args.get("selected").split(",")
    for s in selected:
        surveys.insert_one({"Question":s}) #professors write these questions themselves
    return

@app.route('/accept_student_surveys')
def accept_student_survey_answers(answers:list[int]):
    return

@app.route('/get_all_answers')
def get_all_student_answers(): #from mongo
    anslist = {} 
    for doc in answers.find():
        anslist[doc.get("Quiz ID: ")] = doc.get("Answers: ", [])
    return anslist

# @app.route('/get_averages')
# def get_averages():
#     averages = []
#     anslist = [] 
#     for doc in answers.find():
#         anslist.extend(doc.get("Answers: ", []))
#     for a in anslist:
        
#     return averages
        
# print(get_averages())

# #generate random id
# def generate_id() -> str:
#     id = ""
#     for i in range(4):
#         id += chr(random.randint(65,90))
#     return id

@app.route("/id")
def getid():
    id = request.args.get("quizId").split(",")

@app.route("/quiz")
def accept_quiz_data():
    quizId = request.args.get("quizId")
    anslist = request.args.get("answers").split(",")
    #note to self only store the averages
    # if not anslist.empty() and answers.find(quizId):
    #     for a in anslist:
    #         anslist[quizId]
    submit_student_answers(quizId, anslist)

app.run()

#pass
"""
quizes with questions
student's answers
quiz code
questions = {"Limits" : 5, "Derivatives": 1}

Flow of the overall app:
1. Professor inputs topics
2. a quiz is generated based on those topics
3. need to store the quiz along with a code
4. the code is given to the professor
5. Professor tells students the quiz code
6. Students take the quiz
7. Students submit their answers
8. a summary of average scores for each question is generated
9. the professor acesses the average scores summary
10. the professor gets ai insights into the scores
11. the professor gets ai insights into how to teach material based on the learning stye scores

Data structure draft: // might have room for improvement
Quiz: 
    "code": "ABCD",
    "questions": [
        "limits",
        "derivatives",
        "slope",
        "sin, cos, tan",
    ]
    "student_answers": [
        {
            student_id: "student123",
            answers: [
                "1", "3", "4", "2",
            ]
        },
        {
            student_id: "student456",
            answers: [
                "1", "1", "1", "2",
            ]
        }
    ] //idk if this is bad. we need a way to get the average score for each question
}


"""
