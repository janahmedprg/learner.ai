import React from "react";
import { View, Text, TouchableOpacity, ImageBackground } from "react-native";
import { styles } from "../styles/HomeStyles";

function Home({ navigation }) {
  return (
    <ImageBackground
      source={require("../img/logo1.png")}
      style={styles.background}
      resizeMode="contain"
      opacity={0.2}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>learner.ai</Text>
        </View>
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
      </View>
    </ImageBackground>
  );
}

export default Home;
