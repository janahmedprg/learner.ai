import { Button, StyleSheet, Text, View } from "react-native";
import { quizResults, submitQuiz } from "./quizData";
import { CustomButton } from "./utils";
import { useState } from "react";
export default function QuizDoneScreen(props) {
  const quizId = props.route.params.quizId;

  const quizResultsArray = [];
  for (let i = 0; i < Object.keys(quizResults[quizId]).length; i++) {
    quizResultsArray.push(quizResults[quizId][i]);
  }

  const [couldntSumbit, setCouldntSumbit] = useState(false);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text
        style={{
          fontSize: 20,
          marginBottom: 5,
          textAlign: "center",
          width: "80%",
          fontFamily: "monospace",
        }}
      >
        Survey Done
      </Text>
      <Text
        style={{
          marginBottom: 10,
          fontFamily: "monospace",
        }}
      >
        Your Answers: {JSON.stringify(quizResultsArray)}{" "}
      </Text>

      <CustomButton
        title="Submit"
        onPress={() => {
          submitQuiz(quizId)
            .then(() => {
              props.navigation.navigate("Home");
            })
            .catch((e) => {
              console.warn(e);
              setCouldntSumbit(true);
            });
        }}
      ></CustomButton>

      {couldntSumbit && (
        <Text style={{ color: "red" }}>Something went wrong</Text>
      )}
    </View>
  );
}
