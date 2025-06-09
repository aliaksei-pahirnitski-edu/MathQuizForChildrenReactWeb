import React, { useEffect, useState } from "react";
import "./App.css";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import Layout from "./Layout";
import { getRandomQuestionWithVariants, getLevelLimit } from "./Services/Randomizer";
import Quiz from "./Components/QuizTest";
import VariantButton from "./Components/VariantButton";
import { ASKING, SHOWING_ANSWER, TAnswerState } from "./Models/AnswerMode";

function getNameFromQueryString(){
  const search = window.location.search;
  const params = new URLSearchParams(search);
  const name = params.get('name');    
  return params.has("name") ? name : "Максим";
}

// level: levelIndex -> levelLimit (1 -> 9, 2 -> 12, .. n+1 -> v(n)* 1.4 ..)
function getStartingLevelIndexFromQueryString() : number {
  const search = window.location.search;
  const params = new URLSearchParams(search);
  const startingLevel = params.get('level'); 
  
  return ((startingLevel != null) && +startingLevel) || 2;
}

const playerName = getNameFromQueryString();
const startingLevel = getStartingLevelIndexFromQueryString();

function App() {
  const [levelIndex, setLevelIndex] = useState(startingLevel);
  const [question, setQuestion] = useState(() => getRandomQuestionWithVariants(getLevelLimit(levelIndex)));
  const [answer, setAnswer] = useState<TAnswerState>({ mode: ASKING });
  const [solvedCorrectCount, setCorrectCount] = useState(0);
  const [solvedCWrongCount, setWrongCount] = useState(0);
  const levelAdd = Math.floor(solvedCorrectCount / 5);
  useEffect(function(){
    setLevelIndex(startingLevel + levelAdd)
  }, [levelAdd] )

  const fnCheckAnswer = (answer: number) => {
    setAnswer({ mode: SHOWING_ANSWER, answer });
    if (answer === question.Result) {
      setCorrectCount((x) => x + 1);
    } else {
      setWrongCount((x) => x + 1);
    }
  };

  function fnNextQuiz() {
    setAnswer({ mode: ASKING });
    setQuestion(getRandomQuestionWithVariants(getLevelLimit(levelIndex)));
  }

  return (
    <Layout>
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
          Решено {solvedCorrectCount} задач из {solvedCorrectCount + solvedCWrongCount}
          <br/> Level {levelIndex}
        </h5>
      </div>
    </Layout>
  );
}

export default App;
