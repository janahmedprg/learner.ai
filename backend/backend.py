import os
from dotenv import load_dotenv
from flask import Flask, request
from pymongo import MongoClient
from bson import json_util
import json
from typing import List

load_dotenv()

def parse_json(data):
    return json.loads(json_util.dumps(data))


if not os.environ["MONGO_CONNECTION"]:
    raise Exception("MONGO_CONNECTION env var not set")

client = MongoClient(os.environ["MONGO_CONNECTION"])
db = client["Learner-Ai"]

quiz_collection = db["Quizzes"]
student_answer_collection = db["StudentAnswers"]

"""
answers structure options
- answers collection with individual answers (student id, quiz id, question/questionNumber, answer)
** - student_answers collection with student id, quiz id, answersList (corresponds to questionsList)
- can put inside quiz collection as a nested document

{
    studentId
    quizId
    answersList
}

"""




app = Flask(__name__)

@app.get("/")
def hello_world():
    return "<p>Hello, World!</p>"



def createQuiz(quizCode: str, questions: List[str], questionTypes: List[str]=None):
    print(quizCode)
    print(questions)

    if not questionTypes:
        questionTypes = ["topic"] * len(questions)

    quiz_collection.insert_one({
        "quizCode": quizCode, "questions": questions, "questionTypes": questionTypes
    })

def getQuizByCode(quizCode: str):
    return quiz_collection.find_one({"quizCode": quizCode}, sort=[("_id", -1)]) # if thees multiple pick the most recent one

def submitStudentAnswers(quizCode: str, answers: List[int], studentId=None):
    print(quizCode)
    print(answers)

    student_answer_collection.insert_one({
        "quizCode": quizCode, "answers": answers, "studentId": studentId
    })


def getAverageStudentAnswers(quizCode: str):
    
    student_answers = student_answer_collection.find({"quizCode": quizCode})

    count = student_answer_collection.count_documents({})
    print(student_answers)

    length = len(student_answers[0].get("answers", []))
    # Initialize a list to store averages
    averages = [0] * length
    
    # Calculate the total for each question across all students
    for doc in student_answers:
        answers = doc.get("answers", [])
        for i, ans in enumerate(answers):
            averages[i] += int(ans) #summation
    
    # Calculate the average for each question
    for i in range(length):
        averages[i] /= count
    return averages

# 

@app.route("/create-quiz")
def create_quiz_endpoint():

    quizCode = request.args.get("quizCode")
    questions = request.args.get("questions")
    
    if not quizCode or not questions:
        return "Please provide quizCode and questions"

    questions = questions.split(",")
    


    createQuiz(quizCode, questions)

    return f"created {quizCode}"

@app.route("/get-quiz")
def get_quiz_endpoint():

    quizCode = request.args.get("quizCode")

    if not quizCode:
        return "Please provide quizCode"

    quiz = getQuizByCode(quizCode)

    print(quiz)

    return parse_json(quiz)

@app.route("/submit-quiz")
def submit_quiz_endpoint():

    quizCode = request.args.get("quizCode")
    answers = request.args.get("answers")
    studentId = request.args.get("studentId") or None

    if not quizCode or not answers:
        return "Please provide quizCode and answers"

    answers = answers.split(",")

    submitStudentAnswers(quizCode, answers, studentId)

    return f"submitted to {quizCode}"

@app.route("/get-average-quiz")
def get_average_quiz_endpoint():

    quizCode = request.args.get("quizCode")

    if not quizCode:
        return "Please provide quizCode"
    return parse_json(getAverageStudentAnswers(quizCode))


"""
# functions that need to be added:

- get_quiz_questions by code
- create_a_quiz_with_specific_questions
- accept_a_sudents_quiz_answers
- get_all_student_answers_for_a_quiz



- Create Quiz
- Get Quiz By Code

- Submit Quiz Results
- Get average results for a quiz



"""



if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0")