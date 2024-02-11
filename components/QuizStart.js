//@ts-check

import React, { useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import QuizDoneScreen from "./QuizDone";
import { saveQuizAnswer, submitQuiz } from "./quizData";
import Slider from "@react-native-community/slider";
import { backendUrl } from "./globals";

const QuizStack = createStackNavigator();

function RatingInput({ onAnswerSelected }) {
  return <RatingInputSlider onAnswerSelected={onAnswerSelected} />;
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

function RatingInputSlider({ onAnswerSelected }) {
  return (
    <Slider
      style={{
        width: "90%",
        height: 60,
        // transform: [{ scaleY: 2 }]
      }}
      minimumTrackTintColor="#990030"
      maximumTrackTintColor="#000000"
      thumbTintColor="#990030"
      minimumValue={1}
      maximumValue={5}
      value={3}
      step={1}
      onValueChange={onAnswerSelected}
    />
  );
}

function QuestionScreen(props) {
  const questionNumber = props.route.params?.questionNumber || 1;
  const questionsData = props.route.params.questionsData;
  const quizId = props.route.params.quizId;

  const isLastQuestion = questionNumber == questionsData.questions.length;

  function nextScreen() {
    if (isLastQuestion) {
      props.navigation.navigate("QuizDone", { quizId: quizId });
      return;
    }
    props.navigation.navigate("Question" + (questionNumber + 1), {
      questionNumber: questionNumber + 1,
      questionsData: questionsData,
      quizId: quizId,
    });
  }

  const [answer, setAnswer] = useState(3);


  const x = {
    1: "Unfamiliar",
    2: "Mostly Unfamiliar",
    3: "Somewhat Unfamiliar",
    4: "Familiar",
    5: "Very Familiar",
  };
  const y = {
    1: "Disagree",
    2: "Somewhat Disagree",
    3: "Neither Disagree nor Agree",
    4: "Somewhat Agree",
    5: "Agree",
  };
  const answerText = questionsData.type[questionNumber - 1] == "topic" ? x : y;

  return (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: 20,
          marginBottom: 20,
          fontFamily: "monospace",
        }}
      >
        {questionsData.questions[questionNumber - 1]}
      </Text>

      <RatingInput onAnswerSelected={(value) => setAnswer(value)} />

      <Text style={{ fontSize: 18, fontFamily: "monospace" }}>
        {answerText[answer]}
      </Text>
      <Text></Text>

      <CustomButton
        title="Next"
        onPress={() => {
          saveQuizAnswer(quizId, questionNumber, answer);
          nextScreen();
        }}
      />
    </View>
  );
}

function QuizIntro({ navigation }) {
  return (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: 20,
          marginBottom: 20,
          textAlign: "center",
          width: "80%",
          fontFamily: "monospace",
        }}
      >
        Rank how familiar you are with the upcoming topics
      </Text>
      <CustomButton
        title="Start"
        onPress={() => {
          navigation.navigate("Question1");
        }}
      />
    </View>
  );
}

function QuestionRouter({ questionsData, quizId }) {
  const numQuestions = questionsData.questions.length;
  const questionsNumbers = [];
  for (let i = 1; i <= numQuestions; i++) {
    questionsNumbers.push(i);
  }

  return (
    <QuizStack.Navigator
      initialRouteName="QuizIntro"
      screenOptions={{
        headerShown: false, // Hide the header
      }}
    >
      <QuizStack.Screen name="QuizIntro" component={QuizIntro} />
      {questionsNumbers.map((number) => (
        <QuizStack.Screen
          key={number}
          name={"Question" + number} // used in the name to differentiate the screens, really goes off questionNumber param
          component={QuestionScreen}
          initialParams={{
            questionNumber: 1,
            questionsData: questionsData,
            quizId: quizId,
          }}
        />
      ))}
      <QuizStack.Screen name="QuizDone" component={QuizDoneScreen} />
    </QuizStack.Navigator>
  );
}

export function Quiz(props) {
  const { questionsData, quizId } = props.route.params;
  return <QuestionRouter questionsData={questionsData} quizId={quizId} />;
}

//

//

export default function QuizStart({ navigation }) {
  //todo: fetch tis from the backend based on quiz code



  const sampleQuestionsData = {
    questions: [
      "How satisfied are you?",
      "How much",
      "Third Question",
      "Fourth Question",
      "Last Question",
    ],
    type: ["topic", "topic", "topic", "topic", "statement"],
    quizId: "123",
  };
  const quizId = sampleQuestionsData.quizId; //todo get rid of quizId prop and just use one in questionsdata


  const [codeText, setCodeText] = useState("");

  const [couldntFind, setCouldntFind] = useState(false);
  
  async function onSubmit(){
    const quizCode = codeText;
    
    console.log(backendUrl + "get-quiz?quizCode=" + quizCode)
    fetch(backendUrl + "get-quiz?quizCode=" + quizCode)
      .then((r)=>r.json())
      .then((x)=>{
        const questionsData = {
          questions: x.questions,
          type: x.questionTypes,
          quizId: x.quizCode
        }
        const quizId = questionsData.quizId

        console.log("questionsData", questionsData)

        navigation.navigate("Quiz", { questionsData: questionsData, quizId: quizId })
      })
      .catch((e)=>{
        setCouldntFind(true)
        console.log("Couldn't find that quiz")
      })

  }
  
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Enter Survey Code"
        maxLength={4}
        onChangeText={(text) => setCodeText(text)}
        onSubmitEditing={onSubmit}
        style={{
          fontSize: 24,
          borderWidth: 1,
          borderColor: "#000",
          paddingHorizontal: 10,
          paddingVertical: 5,
          width: "80%",
          textAlign: "center",
          fontFamily: "monospace",
        }}
        value={codeText}
      ></TextInput>
      <Text></Text>

      <CustomButton
        title="Next"
        onPress={onSubmit}
      />
      {couldntFind && <Text>Couldn't find that survey</Text>}
    </View>
  );
}

function CustomButton({ title, onPress }) {
  return (
    <TouchableOpacity
      // title="Next"
      style={{
        width: 200,
        height: 50,
        backgroundColor: "#990030",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        marginBottom: 10,
      }}
      onPress={() => onPress()}
    >
      <Text style={{ color: "white", fontSize: 20, fontFamily: "monospace" }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
