import { Text, TouchableOpacity } from "react-native";

export function CustomButton({ title, onPress }) {
    return (
      <TouchableOpacity
        // title="Next"
        style={{
          width: 200,
          height: 50,
          backgroundColor: "#990030",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 10,
          marginBottom: 10,
        }}
        onPress={() => onPress()}
      >
        <Text style={{ color: "white", fontSize: 20 }}>{title}</Text>
      </TouchableOpacity>
    );
  }