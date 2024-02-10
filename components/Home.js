import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "../styles/HomeStyles";

function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Are you a</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Login", { role: "Professor" })}
      >
        <Text style={styles.buttonText}>Professor</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Login", { role: "Student" })}
      >
        <Text style={styles.buttonText}>Student</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Home;
