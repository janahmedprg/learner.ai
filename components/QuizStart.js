//@ts-check

import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import QuizDoneScreen from './QuizDone';
import { saveQuizAnswer, submitQuiz } from './quizData';
import Slider from '@react-native-community/slider';


const QuizStack = createStackNavigator();

function RatingInput({onAnswerSelected}){

  return (
    <RatingInputSlider onAnswerSelected={onAnswerSelected} />
  )
  // return (
  //   <View style={{display: "flex", flexDirection: "row"}}>
  //     {["1", "2", "3", "4", "5"].map((value) => {
  //       return (
  //         <Button key={value}
  //           title={value}
  //           onPress={() => {onAnswerSelected(value)}}
  //         ></Button>
  //       )
  //     })}
  //   </View>
  // )
}

function RatingInputSlider({onAnswerSelected}){
  
  return (
    <Slider
      style={{
        width: "90%", 
        height: 60,
        // transform: [{ scaleY: 2 }] 
      }}
      minimumTrackTintColor="#6879D0"
      maximumTrackTintColor="#000000"
      thumbTintColor="#6879D0"
      minimumValue={1}
      maximumValue={5}
      value = {3}
      step={1}
      onValueChange={onAnswerSelected}
    />
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


  const [answer, setAnswer] = useState(3)
  
  const answerText = questionsData.answers ? questionsData.answers[questionNumber-1] : {
    1: "Unfamiliar",
    2: "Mostly Unfamiliar",
    3: "Somewhat Unfamiliar",
    4: "Familiar",
    5: "Very Familiar"
  }
  

  return (
    <View style={styles.container}>
      <Text style={{
        fontSize: 20,
        marginBottom: 20
      }}>
        {questionsData.questions[questionNumber - 1]}
      </Text>

      <RatingInput onAnswerSelected={(value) => setAnswer(value)}/>



    <Text style={{fontSize: 18}}>{answerText[answer]}</Text>
    <Text></Text>



    <CustomButton 
      title="Next"
      onPress={()=>{

        saveQuizAnswer(quizId, questionNumber, answer)
        nextScreen()
      }}
    />
      
    </View>
  )
}

function QuizIntro({navigation}) {
  return (
    <View style={styles.container}>
      <Text style={{
        fontSize: 20,
        marginBottom: 20,
        textAlign: "center",
        width: "80%"
      }}>
        Rank how familiar you are with the upcoming topics
      </Text>
      <CustomButton
        title="Start"
        onPress={() => {
          navigation.navigate("Question1")
        }}
      />
    </View>
  );
}

function QuestionRouter({questionsData , quizId}) {

  const numQuestions = questionsData.questions.length
  const questionsNumbers = []
  for (let i = 1; i <= numQuestions; i++) {
    questionsNumbers.push(i)
  }

  return (
    <QuizStack.Navigator
      initialRouteName="QuizIntro"
      screenOptions={{
        headerShown: false, // Hide the header
      }}
    >
      <QuizStack.Screen name="QuizIntro" component={QuizIntro} />
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

export function Quiz(props) {
  const {questionsData, quizId} = props.route.params
  return (
    <QuestionRouter
      questionsData={questionsData}
      quizId={quizId}
    />
  )
}

//

//

export default function QuizStart({navigation}) {

  //todo: fetch tis from the backend based on quiz code
  const x = {
    1: "Unfamiliar",
    2: "Mostly Unfamiliar",
    3: "Somewhat Unfamiliar",
    4: "Familiar",
    5: "Very Familiar",
  }
  const y = {
    1: "Disagree",
    2: "Somewhat Disagree",
    3: "Neither Disagree nor Agree",
    4: "Somewhat Agree",
    5: "Agree",
  }
  const sampleQuestionsData = {
    questions: [
      "How satisfied are you?",
      "How much",
      "Third Question",
      "Fourth Question",
      "Last Question",
    ],
    answers: [
      x,x,x,x,y
    ],
    quizId: "123"
  }
  const quizId = sampleQuestionsData.quizId //todo get rid of quizId prop and just use one in questionsdata


  const [text, setText] = useState('');
  return (
    <View style={styles.container}>
      <TextInput
        placeholder='Enter Quiz Code'
        maxLength={4}
        onChangeText={text => setText(text)}
        onSubmitEditing={()=>{
          navigation.navigate("Quiz", {questionsData: sampleQuestionsData, quizId: text})
        }}
        style={{
          fontSize: 24,
        borderWidth: 1,
        borderColor: '#000',
        paddingHorizontal: 10,
        paddingVertical: 5,
        width: '80%',
        textAlign: 'center',
        }}
        value={text}
      ></TextInput>
      <Text></Text>
      
      <CustomButton 
        title="Next"
        onPress={()=>{
          navigation.navigate("Quiz", {questionsData: sampleQuestionsData, quizId: quizId})
        }}
      />
    </View>
  );
}

function CustomButton({title, onPress}) {
  return (
    <TouchableOpacity
        // title="Next"
        style={{
          width: 200,
          height: 50,
          backgroundColor: "#6879D0",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 10,
          marginBottom: 10,
        }}
        onPress={() => onPress()}
      >
        <Text style={{ color: "white", fontSize: 20 }}>{title}</Text>
      </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
});