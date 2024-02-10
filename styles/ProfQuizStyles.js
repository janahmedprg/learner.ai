import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  footer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 100,
    flexDirection: "row", // Layout buttons in a row
    justifyContent: "space-between", // Evenly space buttons horizontally
    padding: 16,
    backgroundColor: "#990030", // Optional: Background color for the footer
    alignItems: "center",
  },
  buttonContainer: {
    flex: 1, // Each button container takes equal space
    marginHorizontal: 8, // Add horizontal margin between buttons
  },
  button: { alignItems: "center", backgroundColor: "white" },
  buttonText: {
    padding: 20,
    fontSize: 20,
    fontFamily: "monospace",
    fontWeight: "bold",
  },
  background: {
    flex: 1,
  },
  highlightedButton: {
    backgroundColor: "#B7B7B7",
  },
});
