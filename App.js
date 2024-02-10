import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./components/Home";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import SignUpSuccess from "./components/SignUpSuccess";
import QuizStart, { Quiz } from "./components/QuizStart";
import ProfQuiz from "./components/ProfQuiz";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Main"
        screenOptions={{
          headerShown: false, // Hide the header
        }}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="SignUpSuccess" component={SignUpSuccess} />
        <Stack.Screen name="QuizStart" component={QuizStart} />
        <Stack.Screen name="Quiz" component={Quiz} />
        <Stack.Screen name="ProfQuiz" component={ProfQuiz} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
