import React, { useState } from "react";
import "./App.css";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import Layout from "./Layout";
import { getRandomQuestionWithVariants } from "./Services/Randomizer";
import QuestionCard from "./Screens/QuestionScreen";
import SettingsScreen from "./Screens/SettingsScreen";
import Quiz from "./Components/QuizTest";
import VariantButton, { VariantButtonProps } from "./Components/VariantButton";
import { ASKING, SHOWING_ANSWER, TAnswerState } from "./Models/AnswerMode";

const level: number = 12;

function App() {
  const [question, setQuestion] = useState(() => getRandomQuestionWithVariants(level));
  const [answer, setAnswer] = useState<TAnswerState>({ mode: ASKING });
  const [solvedCorrectCount, setCorrectCount] = useState(0);
  const [solvedCWrongCount, setWrongCount] = useState(0);

  const fnCheckAnswer = (answer: number) => {
    setAnswer({ mode: SHOWING_ANSWER, answer });
    if (answer == question.Result) {
      setCorrectCount((x) => x + 1);
    } else {
      setWrongCount((x) => x + 1);
    }
  };

  function fnNextQuiz() {
    setAnswer({ mode: ASKING });
    setQuestion(getRandomQuestionWithVariants(level));
  }

  return (
    <Layout>
      <div className="m-2 p-2 orange inner-border">
        <h3>Привет Максим!</h3>
      </div>
      <div className="m-2 p-2 question-area inner-border">
        <Quiz randomQuestion={question} />
      </div>

      <div className="m-2 p-2 pink inner-border">
        <Stack direction="horizontal" gap={2}>
          {question.Variants.map((variant) => (
            <VariantButton
              mode={answer.mode}
              variant={variant}
              checkAnswerHandler={fnCheckAnswer}
              answer={answer.mode == SHOWING_ANSWER ? answer.answer : -1}
              correctAnswer={question.Result}
            />
          ))}
        </Stack>
      </div>
      {answer.mode === SHOWING_ANSWER && (
        <Button variant="success" className="m-2 p-2" onClick={fnNextQuiz}>
          Ещё!
        </Button>
      )}
      <div className="m-2 p-2 pink inner-border">
        <h5>
          Решено {solvedCorrectCount} задач из {solvedCorrectCount + solvedCWrongCount}
        </h5>
      </div>
    </Layout>
  );
}

export default App;
