import { backendUrl } from "./globals"


export const quizResults = {}
export function saveQuizAnswer(questionairId, questionNumber, answer) {
  if (quizResults[questionairId] == undefined) {
    quizResults[questionairId] = []
  }
  quizResults[questionairId][questionNumber] = answer
}


export async function submitQuiz(questionairId) {

  x = backendUrl + `submit-quiz?${new URLSearchParams({
      quizCode: questionairId,
      answers: quizResults[questionairId]
    })
  }`

  console.log("submiting", x)
  await fetch(x) 

  return
}