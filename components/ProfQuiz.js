import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { styles } from "../styles/ProfQuizStyles";
import { quizResults } from "./quizData";
import RadarChart from "./SpiderGraph";

function QuizResults({ code, setCode, submitted, setSubmitted, tab, setTab }) {
  const handleNewQuiz = () => {
    setTab("quiz");
  };
  const handleBrandNewQuiz = () => {
    setSubmitted(false);
    setTab("quiz");
  };
  return (
    <View style={styles.quizResultsContainer}>
      <View style={styles.headerWrap}>
        <Text style={styles.headerText}>Results</Text>
      </View>
      <View style={styles.quizResultsContent}>
        {!submitted && (
          <Text style={[styles.topicsTextCode, { marginTop: 20 }]}>
            Please create and submit a survey.
          </Text>
        )}
        {!submitted && (
          <TouchableOpacity
            onPress={() => handleNewQuiz()}
            style={[styles.buttonCreate, { marginTop: 20 }]}
          >
            <Text
              style={{
                color: "white",
                fontFamily: "monospace",
                fontSize: 20,
                padding: 5,
              }}
            >
              New Survey
            </Text>
          </TouchableOpacity>
        )}
        {submitted && (
          <Text style={[styles.topicsTextCode, { marginTop: 20 }]}>
            Results from survey: {code}
          </Text>
        )}
        {submitted && (
          <View style={{ height: 500, width: "100%" }}>
            <ScrollView
              style={[styles.scrollView, { marginBottom: 20, marginTop: 20 }]}
              contentContainerStyle={styles.scrollContainerStyle}
            >
              <RadarChart
                graphSize={400}
                scaleCount={5}
                numberInterval={2}
                data={[
                  {
                    Int: 0.7,
                    Vit: 1,
                    Str: 0.9,
                    Def: 0.67,
                    Agi: 0.8,
                    Luck: 1,
                    Test: 0.1,
                    Testing: 0.1,
                  },
                  {
                    Int: 1,
                    Vit: 0.1,
                    Str: 0.2,
                    Def: 0.5,
                    Agi: 0.8,
                    Luck: 0.4,
                    Test: 0.3,
                    Testing: 1,
                  },
                ]}
                options={{
                  graphShape: 1,
                  showAxis: true,
                  showIndicator: true,
                  colorList: ["blue", "red"],
                  dotList: [false, false],
                }}
              />
              <TouchableOpacity
                onPress={() => handleBrandNewQuiz()}
                style={styles.buttonCreate}
              >
                <Text
                  style={{
                    color: "white",
                    fontFamily: "monospace",
                    fontSize: 20,
                    padding: 5,
                  }}
                >
                  New Survey
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        )}
      </View>
    </View>
  );
}

function QuizCreate({ code, setCode, submitted, setSubmitted }) {
  const [inputs, setInputs] = useState([""]);

  const addInput = () => {
    setInputs([...inputs, ""]);
  };

  const removeInput = (index) => {
    const newInputs = [...inputs];
    newInputs.splice(index, 1);
    setInputs(newInputs);
  };

  const handleInputChange = (text, index) => {
    const newInputs = [...inputs];
    newInputs[index] = text;
    setInputs(newInputs);
  };
  const handleSubmit = () => {
    setSubmitted(true);
    console.log("Handle submit to backend!");
  };
  const handleNewQuiz = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let randomCode = "";
    for (let i = 0; i < 4; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomCode += characters[randomIndex];
    }
    setCode(randomCode);
    setSubmitted(false);
    setInputs([""]);
  };
  return (
    <View style={styles.quizCreateContainer}>
      <View style={styles.headerWrap}>
        <Text style={styles.headerText}>Create Survey</Text>
      </View>
      {!submitted && (
        <Text
          style={[styles.topicsTextCode, { marginTop: 20, marginBottom: 20 }]}
        >
          Add your topics:
        </Text>
      )}
      {!submitted && (
        <View style={{ height: 425, width: "100%" }}>
          <ScrollView
            style={[styles.scrollView, { marginBottom: 20 }]}
            contentContainerStyle={styles.scrollContainerStyle}
          >
            {inputs.map((value, index) => (
              <View key={index} style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder={`Topic ${index + 1}`}
                  value={value}
                  onChangeText={(text) => handleInputChange(text, index)}
                />
                {index > 0 && (
                  <TouchableOpacity
                    onPress={() => removeInput(index)}
                    style={styles.buttonCreate}
                  >
                    <Text style={styles.buttonCreateText}>Remove</Text>
                  </TouchableOpacity>
                )}
              </View>
            ))}
            <TouchableOpacity onPress={addInput} style={styles.buttonCreate}>
              <Text style={styles.buttonCreateText}>Add Topic</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      )}
      {!submitted && (
        <TouchableOpacity
          onPress={() => handleSubmit(inputs)}
          style={styles.buttonCreate}
        >
          <Text style={styles.buttonCreateText}>Submit</Text>
        </TouchableOpacity>
      )}
      {submitted && (
        <Text style={[styles.topicsTextCode, { marginTop: 20 }]}>
          Successfully submitted.
        </Text>
      )}
      {submitted && (
        <Text style={[styles.topicsTextCode, { marginTop: 10 }]}>
          Your code is:
        </Text>
      )}
      {submitted && (
        <Text
          style={{
            fontFamily: "monospace",
            fontSize: 110,
            fontWeight: "bold",
            marginTop: 20,
            color: "black",
          }}
        >
          {code}
        </Text>
      )}
      {submitted && (
        <TouchableOpacity
          onPress={() => handleNewQuiz()}
          style={[styles.buttonCreate, { marginTop: 50 }]}
        >
          <Text
            style={{
              color: "white",
              fontFamily: "monospace",
              fontSize: 20,
              padding: 5,
            }}
          >
            New Survey
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

function ProfQuiz({ navigation }) {
  const [tab, setTab] = useState("quiz");
  const [submitted, setSubmitted] = useState(false);
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let randomCode = "";
  for (let i = 0; i < 4; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomCode += characters[randomIndex];
  }
  const [code, setCode] = useState(randomCode);

  return (
    <View style={styles.container}>
      {tab === "quiz" && (
        <QuizCreate
          code={code}
          setCode={setCode}
          submitted={submitted}
          setSubmitted={setSubmitted}
        />
      )}
      {tab === "results" && (
        <QuizResults
          code={code}
          setCode={setCode}
          submitted={submitted}
          setSubmitted={setSubmitted}
          tab={tab}
          setTab={setTab}
        />
      )}
      <View style={styles.footer}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            activeOpacity={0.9}
            style={[
              styles.button,
              (tab === "quiz" || tab === "code") && styles.highlightedButton,
            ]}
            onPress={() => setTab("quiz")}
          >
            <Text style={styles.buttonText}>Survey</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            activeOpacity={1}
            style={[
              styles.button,
              tab === "results" && styles.highlightedButton,
            ]}
            onPress={() => setTab("results")}
          >
            <Text style={styles.buttonText}>Results</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default ProfQuiz;
