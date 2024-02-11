import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
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
  headerWrap: {
    padding: 50,
    backgroundColor: "#990030",
    width: "100%",
    alignItems: "center",
  },
  headerText: {
    marginTop: 10,
    fontFamily: "monospace",
    fontWeight: "bold",
    fontSize: 36,
    color: "white",
  },
  quizResultsContainer: {
    flex: 0.3,
    justifyContent: "space-between",
  },
  quizResultsContent: {
    alignItems: "center",
  },
  quizCreateContainer: {
    flex: 0.3,
    alignItems: "center",
    justifyContent: "space-between",
  },
  input: {
    width: "70%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    marginRight: 20,
    fontSize: 16,
    fontFamily: "monospace",
  },
  inputContainer: {
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
    paddingLeft: 20,
    paddingRight: 20,
  },
  scrollView: {
    width: "100%",
    flexGrow: 0,
  },
  scrollContainerStyle: { alignItems: "center" },
  topicsText: {
    fontSize: 16,
    fontFamily: "monospace",
    marginTop: 20,
    marginBottom: 20,
  },
  buttonCreate: {
    backgroundColor: "#990030",
    padding: 10,
  },
  buttonCreateText: {
    fontFamily: "monospace",
    color: "white",
    fontSize: 16,
  },
  topicsTextCode: {
    fontFamily: "monospace",
    fontSize: 20,
    fontWeight: "bold",
  },
});
