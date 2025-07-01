import type { TOp } from "../Models/TOperation";
import { TQuestion, TQuestionWithVariants } from "./../Models/QuestionModel";

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

export function getRandomOperation() {
  // different operations with different frequences
  const allOpsProbabilities: TOp[] = ["+", "+", "+", "+", "-", "-", "-", "*", "*"];
  const max = allOpsProbabilities.length;
  let randomIndex = Math.floor(Math.random() * max);
  return allOpsProbabilities[randomIndex];
}

export function getRandomVariants(answer: number): number[] {
  const start = Math.max(0, answer - 10);
  const end = answer + 10;
  const range = end + 1 - start;
  const getNextRandom = () => start + Math.floor(Math.random() * range);
  const randomCount = Math.random() > 0.5 ? 4 : 3; // 3 or 4

  let variantsSet = new Set<number>([answer, getNextRandom(), getNextRandom()]);
  while (variantsSet.size < randomCount) {
    variantsSet.add(getNextRandom());
  }
  return [...variantsSet].sort((x, y) => x - y);
}

export function getRandomQuestion(limit: number = 10): TQuestion {
  const op = getRandomOperation();
  if (op === "*") {
    limit = Math.ceil(Math.sqrt(limit)) + 2;
  }
  let a = getRandomInt(limit);
  let b = getRandomInt(limit);
  switch (op) {
    case "+":
      return { OperandA: a, OperandB: b, Operation: op, Result: a + b };
    case "-":
      return { OperandA: a + b, OperandB: a, Operation: op, Result: b };
    case "*":
      return { OperandA: a, OperandB: b, Operation: op, Result: a * b };
    default:
      console.warn(`Operation ${op} not supported`);
      return { OperandA: a, OperandB: b, Operation: op, Result: 0 };
  }
}

export function getRandomQuestionWithVariants(limit: number = 10): TQuestionWithVariants {
  const question = getRandomQuestion(limit);
  const variants = getRandomVariants(question.Result);
  return { Variants: variants, ...question };
}

const levelLimits = [7, 9, 12]; // level: levelIndex -> levelLimit (1 -> 9, 2 -> 13, .. n+1 -> v(n)* 1.3 ..)
export function getLevelLimit(levelIndex: number): number {
  switch (true) {
    case levelIndex <= 0:
      return levelLimits[0];
    case levelIndex < levelLimits.length:
      return levelLimits[levelIndex];
    case levelIndex < 100:
      return Math.round(1.25 * getLevelLimit(levelIndex - 1));
    default:
      return 10;
  }
}
