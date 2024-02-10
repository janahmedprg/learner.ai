import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: "80%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: "#990030",
    width: "80%",
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
  },
  signUpText: {
    marginTop: 10,
    fontSize: 14,
    textDecorationLine: "underline",
    color: "#990030",
  },
  background: {
    flex: 1,
  },
});
