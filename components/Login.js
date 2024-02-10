import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { styles } from "../styles/LoginStyles.js";

function ProfHome({ navigation, route }) {
  const { role } = route.params;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (role === "Student") {
      navigation.navigate("QuizStart");
    } else if (role === "Professor") {
      navigation.navigate("ProfQuiz");
    }
  };
  const handleSignUp = () => {
    navigation.navigate("SignUp", { role: role });
  };
  const handleForgotPassword = () => {
    console.log("Navigating to forgot password");
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login {role}:</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleForgotPassword}>
        <Text style={styles.signUpText}>Forgot Password?</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleSignUp}>
        <Text style={styles.signUpText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}

export default ProfHome;
