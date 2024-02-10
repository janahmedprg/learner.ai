import React from "react";
import { View, Text } from "react-native";
import { styles } from "../styles/ProfQuizStyles";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

function BottomNavigationBar() {
  return (
    <Tab.Navigator screenOptions={{}}>
      <Tab.Screen name="Quiz Create" component={QuizCreate} />
      <Tab.Screen name="Quiz Results" component={QuizResults} />
    </Tab.Navigator>
  );
}

function QuizResults() {
  return <Text>This is Quiz Result</Text>;
}

function QuizCreate() {
  return <Text>This is Quiz Create</Text>;
}

function ProfQuiz({ navigation }) {
  return <BottomNavigationBar />;
}

export default ProfQuiz;
