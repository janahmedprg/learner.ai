import os
from dotenv import load_dotenv
from flask import Flask, request
from pymongo import MongoClient
from bson import json_util
import json

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



def createQuiz(quizCode: str, questions: list[str], questionTypes: list[str]=None):
    print(quizCode)
    print(questions)

    if not questionTypes:
        questionTypes = ["topic"] * len(questions)

    quiz_collection.insert_one({
        "quizCode": quizCode, "questions": questions, "questionTypes": questionTypes
    })

def getQuizByCode(quizCode: str):
    return quiz_collection.find_one({"quizCode": quizCode}, sort=[("_id", -1)]) # if thees multiple pick the most recent one

def submitStudentAnswers(quizCode: str, answers: list[int], studentId=None):
    print(quizCode)
    print(answers)

    student_answer_collection.insert_one({
        "quizCode": quizCode, "answers": answers, "studentId": studentId
    })

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



# todo accept in the body of request instead of just query params
@app.route("/quiz")
def accept_quiz_data():
    quizId = request.args.get("quizId")
    answers = request.args.get("answers").split(",")
    

    print(quizId, "quizId")
    print(answers)
    return f"{answers}"



if __name__ == "__main__":
    app.run(debug=True)