import { TOp } from "./TOperation";

export type TQuestion = {
  OperandA: number;
  OperandB: number;
  Operation: TOp;
  Result: number;
  PlainFormula?: string; // for complex (compound) questions like "1+2+3-4"
};

export type TQuestionWithVariants = TQuestion & {
  Variants: number[];
};

export function displayFormula(question: TQuestion): string {
  switch (question.Operation) {
    case "+":
      return question.OperandA + " + " + question.OperandB;
    case "-":
      return question.OperandA + " - " + question.OperandB;
    case "*":
      return question.OperandA + " * " + question.OperandB;
    case ":":
      return question.OperandA + " : " + question.OperandB;
    case "formula":
      if (question.PlainFormula === undefined) {
        console.warn(`question.PlainFormula not exists`);
        return "undefined";
      }
      return question.PlainFormula;
    default:
      console.warn(`Operation ${question.Operation} not supported`);
      return "n/a";
  }
}
