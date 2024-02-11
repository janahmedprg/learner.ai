import numpy as np
import random
import matplotlib.pyplot as plt
from flask import Flask, request
from pymongo import MongoClient

# Connect to MongoDB
client = MongoClient("mongodb+srv://a:h4S44Ru5M4R9qMDU@learnerai.xtsb7bl.mongodb.net")  # Update with your MongoDB connection string

# Access a database
db = client["questions"]  

# Access a collection
questions = db["questions"] 


def submitStudentQuizAnswers(quizId:int, answers:list[int], studentId=None):
    # answers can be an array of numbers
    questions.insert_one({str(quizId):answers})
    

id = ""
for i in range(4):
    id += chr(random.randint(65,90))
    
submitStudentQuizAnswers(id,[1,2,2,3,3])

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
