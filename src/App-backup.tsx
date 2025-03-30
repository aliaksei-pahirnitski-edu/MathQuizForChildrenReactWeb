import React from "react";
import "./App.css";
import QuestionCard from "./Screens/QuestionScreen";
import SettingsScreen from "./Screens/SettingsScreen";
import Quiz from "./Components/QuizTest";

function App() {
  return (
    <div className="App">
      <Quiz></Quiz>
      <br />
      {/*  */} <QuestionCard></QuestionCard>
      Settings: <SettingsScreen />
    </div>
  );
}

export default App;
