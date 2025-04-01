import React from "react";
import "./VariantButton.css";
import Button from "react-bootstrap/Button";
import { ASKING, ASKING_MODE, SHOWING_ANSWER_MODE } from "./../Models/AnswerMode";

export type VariantButtonPropsAsking = {
  mode: ASKING_MODE;
  variant: number;
  checkAnswerHandler: (answer: number) => void;
};
export type VariantButtonPropsCheckingAnswer = {
  mode: SHOWING_ANSWER_MODE;
  variant: number;
  answer: number;
  correctAnswer: number;
};

export type VariantButtonProps = VariantButtonPropsAsking | VariantButtonPropsCheckingAnswer;

function getAnswerColor({ variant, answer, correctAnswer }: VariantButtonPropsCheckingAnswer): string {
  return variant === answer ? (answer === correctAnswer ? "success" : "danger") : "info";
}
function renderVariant(props: VariantButtonProps): string {
  return props.mode === ASKING ? "secondary" : getAnswerColor(props);
}

const VariantButton = (props: VariantButtonProps) => {
  const { mode, variant } = props;
  const clickHandler = () => {
    if (mode === ASKING) {
      props.checkAnswerHandler(variant);
    }
  };
  return (
    <Button variant={renderVariant(props)} onClick={clickHandler} className="answer-button">
      {variant}
    </Button>
  );
};

export default VariantButton;
