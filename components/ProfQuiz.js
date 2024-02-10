import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { styles } from "../styles/ProfQuizStyles";

function QuizResults() {
  return <Text>This is Quiz Result</Text>;
}

function QuizCreate() {
  return <Text>This is Quiz Create</Text>;
}

function ProfQuiz({ navigation }) {
  const [tab, setTab] = useState("quiz");

  return (
    <ImageBackground
      source={require("../img/logo1.png")}
      style={styles.background}
      resizeMode="contain"
      opacity={0.2}
    >
      <View style={styles.container}>
        {tab === "quiz" && <QuizCreate />}
        {tab === "results" && <QuizResults />}
        <View style={styles.footer}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              activeOpacity={0.9}
              style={styles.button}
              onPress={() => setTab("quiz")}
            >
              <Text style={styles.buttonText}>Quiz</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              activeOpacity={0.9}
              style={styles.button}
              onPress={() => setTab("results")}
            >
              <Text style={styles.buttonText}>Results</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

export default ProfQuiz;
