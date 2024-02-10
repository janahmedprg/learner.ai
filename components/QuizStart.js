//@ts-check

import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import QuizDoneScreen from './QuizDone';
import { saveQuizAnswer, submitQuiz } from './quizData';


const QuizStack = createStackNavigator();

function RatingInput({onAnswerSelected}){

  return (
    <View style={{display: "flex", flexDirection: "row"}}>
      {["1", "2", "3", "4", "5"].map((value) => {
        return (
          <Button key={value}
            title={value}
            onPress={() => {onAnswerSelected(value)}}
          ></Button>
        )
      })}
    </View>
  )
}

function QuestionScreen(props) {
  const questionNumber = props.route.params?.questionNumber || 1
  const questionsData = props.route.params.questionsData
  const quizId = props.route.params.quizId


  const isLastQuestion = questionNumber == questionsData.questions.length

  function nextScreen(){
    if (isLastQuestion) {
      props.navigation.navigate("QuizDone", {quizId: quizId})
      return
    }
    props.navigation.navigate("Question" + (questionNumber+1), {
      questionNumber: questionNumber + 1,
      questionsData: questionsData,
      quizId: quizId
    })
  }


  return (
    <View style={styles.container}>
      <Text style={{}}>
        {isLastQuestion ? "Question " : "Question "}
        {questionNumber}
      </Text>

      <RatingInput 
        onAnswerSelected={(answer) => {
          saveQuizAnswer(quizId, questionNumber, answer)
          nextScreen();
        }}
      />

      {isLastQuestion ? 
          <Button
          title="Next"
          onPress={()=> {
            nextScreen();
          }}
        ></Button>
        : 
        <Button
          title="Next"
          onPress={()=> {
            nextScreen();
          }}
        ></Button>
      }
      
    </View>
  )
}

function QuestionRouter({questionsData , quizId}) {

  const numQuestions = questionsData.questions.length
  const questionsNumbers = []
  for (let i = 1; i <= numQuestions; i++) {
    questionsNumbers.push(i)
  }

  return (
    <QuizStack.Navigator
      initialRouteName="QuestionOne"
      screenOptions={{
        headerShown: false, // Hide the header
      }}
    >
      {questionsNumbers.map(number => (
        <QuizStack.Screen key={number} 
          name={"Question" + number}  // used in the name to differentiate the screens, really goes off questionNumber param
          component={QuestionScreen} 
          initialParams={{
            questionNumber: 1,
            questionsData: questionsData,
            quizId: quizId
          }}
        />
      ))}
      <QuizStack.Screen name="QuizDone" component={QuizDoneScreen} />
    </QuizStack.Navigator>
  )
}

function Quiz({questionsData, quizId}) {
  return (
    <QuestionRouter
      questionsData={questionsData}
      quizId={quizId}
    />
  )
}

//

//

export default function QuizStart() {

  const sampleQuestionsData = {
    questions: [
      "How satisfied are you?",
      "How much",
      "Third Question",
      "Fourth Question"
    ]
  }

  const quizId = "123"


  return (
    // <View style={styles.container}>
    //   <Text style={styles.text}>Enter Quiz Code</Text>
    //   <Button
    //     title="Go to Details"
    //     onPress={() => navigation.navigate("Main")}
    //   />
    // </View>
    <Quiz 
      questionsData={sampleQuestionsData}
      quizId={quizId}
    ></Quiz>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
});