import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
    fontFamily: "monospace",
    fontWeight: "bold",
  },
  button: {
    width: 200,
    height: 50,
    backgroundColor: "#990030",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 18,
    color: "white",
    fontFamily: "monospace",
  },
  header: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: 150,
    backgroundColor: "#990030",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    fontSize: 40,
    color: "white",
    fontWeight: "bold",
    fontFamily: "monospace",
    paddingTop: 30,
  },
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
