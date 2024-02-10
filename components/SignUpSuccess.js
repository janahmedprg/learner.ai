import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { styles } from "../styles/SignUpSuccessStyles";

const SignUpSuccess = ({ navigation, route }) => {
  const { role } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Signed Up succesfully as {role}</Text>
      <TouchableOpacity onPress={() => navigation.navigate("Login", { role })}>
        <Text style={styles.link}>Login here</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignUpSuccess;
