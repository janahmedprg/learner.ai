import { Button, StyleSheet, Text, View } from "react-native";
import { quizResults, submitQuiz } from "./quizData";
import { CustomButton } from "./utils";
export default function QuizDoneScreen(props) {
  const quizId = props.route.params.quizId;

  const quizResultsArray = [];
  for (let i = 1; i <= Object.keys(quizResults[quizId]).length; i++) {
    quizResultsArray.push(quizResults[quizId][i]);
  }

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
          submitQuiz(quizId);
          props.navigation.navigate("Home");
        }}
      ></CustomButton>
    </View>
  );
}
