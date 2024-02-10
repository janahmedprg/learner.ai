//@ts-check

import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";


const QuizStack = createStackNavigator();


function QuestionScreen(props) {
  const questionNumber = props.route.params?.questionNumber || 1
  const questionsData = props.route.params.questionsData


  const isLastQuestion = questionNumber == questionsData.questions.length

  return (
    <View style={styles.container}>
      <Text style={{}}>
        {isLastQuestion ? "Last Question " : "Question "}
        {questionNumber}
      </Text>




      <Button
        title="Hello"
        onPress={()=> {
          if (isLastQuestion) {
            props.navigation.navigate("Home")
            return
          }
          props.navigation.navigate("Question" + (questionNumber+1), {
            questionNumber: questionNumber + 1,
            questionsData: questionsData
          })
        }}
      ></Button>
    </View>
  )
}

function QuestionRouter({questionsData}) {

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
            questionsData: questionsData
          }}
        />
      ))}
    </QuizStack.Navigator>
  )
}

function Quiz({questionsData}){
  return (
    <QuestionRouter
      questionsData={questionsData}
    />
  )
}

export default function QuizStart() {

  const sampleQuestionsData = {
    questions: [
      "How satisfied are you?",
      "How much",
      "Third Question",
      "Fourth Question"
    ]
  }


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
    ></Quiz>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    color: "red"
  },
});