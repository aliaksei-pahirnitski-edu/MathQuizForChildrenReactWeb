import { TOp } from "./TOperation";

export type TQuestion = {
  OperandA: number;
  OperandB: number;
  Operation: TOp;
  Result: number;
};

export type TQuestionWithVariants = TQuestion & {
  Variants: number[];
};
