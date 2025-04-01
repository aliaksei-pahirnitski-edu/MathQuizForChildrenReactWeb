import React from "react";
import { AdditionIllustrator, SubtractionIllustrator } from "./Illustrators";
import { getRandomQuestion } from "./../Services/Randomizer";
import { TQuestion } from "../Models/QuestionModel";

const Quiz = ({ randomQuestion }: { randomQuestion: TQuestion }) => {
  let Illustrator = randomQuestion.Operation === "+" ? AdditionIllustrator : SubtractionIllustrator;
  return (
    <h2>
      <i>{randomQuestion.OperandA}</i> {randomQuestion.Operation} <i>{randomQuestion.OperandB}</i>
      {/*
      <hr />
      <Illustrator a={randomQuestion.OperandA} b={randomQuestion.OperandB} />
      <hr />= {randomQuestion.Result}*/}
    </h2>
  );
};

export default Quiz;
