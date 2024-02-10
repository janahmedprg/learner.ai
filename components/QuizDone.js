import { Button, StyleSheet, Text, View } from "react-native";
import { quizResults, submitQuiz } from "./quizData";
export default function QuizDoneScreen(props) {
  const quizId = props.route.params.quizId;

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Quiz Done</Text>
      <Text>Results</Text>
      <Text>{JSON.stringify(quizResults[quizId], null, 2)}</Text>
      <Button
        title="Submit"
        onPress={() => {
          submitQuiz(quizId);
          props.navigation.navigate("Home"); //can replace with quiz results page (show graph)
        }}
      ></Button>
    </View>
  );
}
