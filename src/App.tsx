import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";

import Layout from "./Layout";
import { getRandomQuestionWithVariants, getLevelLimit } from "./Services/Randomizer";
import Quiz from "./Components/QuizTest";
import Timer, { formatSeconds } from "./Components/Timer";
import VariantButton from "./Components/VariantButton";
import { ASKING, SHOWING_ANSWER, TAnswerState } from "./Models/AnswerMode";

function getNameFromQueryString() {
  const search = window.location.search;
  const params = new URLSearchParams(search);
  const name = params.get("name");
  return params.has("name") ? name : "Максим";
}

// level: levelIndex -> levelLimit (1 -> 9, 2 -> 12, .. n+1 -> v(n)* 1.4 ..)
function getStartingLevelIndexFromQueryString(): number {
  const search = window.location.search;
  const params = new URLSearchParams(search);
  const startingLevel = params.get("level");

  return (startingLevel != null && +startingLevel) || 1;
}

const playerName = getNameFromQueryString();
const startingLevel = getStartingLevelIndexFromQueryString();

function App() {
  const [levelIndex, setLevelIndex] = useState(startingLevel);
  const [question, setQuestion] = useState(() => getRandomQuestionWithVariants(getLevelLimit(levelIndex)));
  const [answer, setAnswer] = useState<TAnswerState>({ mode: ASKING });
  const [solvedCorrectCount, setCorrectCount] = useState(0);
  const [solvedCWrongCount, setWrongCount] = useState(0);
  const timerRef = useRef("00:00");
  const [lastFormattedElapsed, setLastFormattedElapsed] = useState("00:00");

  const [showLevelToast, setShowLevelToast] = useState(false);
  useEffect(
    function () {
      setShowLevelToast(levelIndex > startingLevel);
    },
    [levelIndex]
  );

  const fnCheckAnswer = (answer: number) => {
    setAnswer({ mode: SHOWING_ANSWER, answer });
    if (answer === question.Result) {
      setCorrectCount((x) => x + 1);
    } else {
      setWrongCount((x) => x + 1);
    }
    setLastFormattedElapsed(timerRef.current);
  };

  function fnNextQuiz() {
    const levelAdd = Math.floor(solvedCorrectCount / 5);
    setLevelIndex(startingLevel + levelAdd);

    setAnswer({ mode: ASKING });
    setQuestion(getRandomQuestionWithVariants(getLevelLimit(levelIndex)));
  }

  function fnInformElapsedSeconds(elapsedSeconds: number) {
    timerRef.current = formatSeconds(elapsedSeconds);
  }

  return (
    <Layout>
      <div className="m-2 p-2 summary-area inner-border flex">
        <div className="me-auto">Level {levelIndex}</div>
        <div className="ms-auto">
          Время: <Timer informElapsedSeconds={fnInformElapsedSeconds} />
        </div>
      </div>
      <div className="m-2 p-2 orange inner-border">
        <h3>Привет {playerName}!</h3>
      </div>
      <div className="m-2 p-2 question-area inner-border">
        <Quiz randomQuestion={question} />
      </div>

      <div className="m-2 p-2 answers-area inner-border">
        <Stack direction="horizontal" gap={2}>
          {question.Variants.map((variant) => (
            <VariantButton
              mode={answer.mode}
              variant={variant}
              key={variant}
              checkAnswerHandler={fnCheckAnswer}
              answer={answer.mode === SHOWING_ANSWER ? answer.answer : -1}
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
      <div className="m-2 p-2 summary-area inner-border">
        <h5>
          Решено {solvedCorrectCount} из {solvedCorrectCount + solvedCWrongCount} за {lastFormattedElapsed}
        </h5>
      </div>

      <ToastContainer className="p-3" position="top-center" style={{ zIndex: 1 }}>
        <Toast onClose={() => setShowLevelToast(false)} show={showLevelToast} delay={3000} autohide>
          <Toast.Header>
            <strong className="me-auto">Next Level!</strong>
          </Toast.Header>
          <Toast.Body>
            <h1>Level {levelIndex} </h1>
            <small>Level limit: {getLevelLimit(levelIndex)} </small>
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </Layout>
  );
}

export default App;
