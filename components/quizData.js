

export const quizResults = {}
export function saveQuizAnswer(questionairId, questionNumber, answer) {
  if (quizResults[questionairId] == undefined) {
    quizResults[questionairId] = {}
  }
  quizResults[questionairId][questionNumber] = answer
}


export function submitQuiz(questionairId) {
  console.log("todo, submit quiz data to the backend", quizResults[questionairId])
  //can use react query maybe to avoid multiple requests
  
}