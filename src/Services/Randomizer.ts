import type { TOp } from "../Models/TOperation";
import { TQuestion, TQuestionWithVariants } from "./../Models/QuestionModel";

// not including
function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

export function getRandomOperation() {
  // different operations with different frequences
  const allOpsProbabilities: TOp[] = ["+", "+", "+", "+", "-", "-", "-", "*", "*", ":", ":", "formula", "formula", "formula", "formula"];
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
  if (op === "*" || op === ":") {
    limit = Math.ceil(Math.sqrt(limit)) + 1;
  } else if (op === "+" || op === "-") {
    limit = (2 * limit) / 3;
  }
  let a = getRandomInt(limit);
  let b = getRandomInt(limit);
  // decided exclude 0
  a = a + 1;
  b = b + 1;

  switch (op) {
    case "+":
      return { OperandA: a, OperandB: b, Operation: op, Result: a + b };
    case "-":
      return { OperandA: a + b, OperandB: a, Operation: op, Result: b };
    case "*":
      return { OperandA: a, OperandB: b, Operation: op, Result: a * b };
    case ":":
      return { OperandA: a * b, OperandB: a, Operation: op, Result: b };
    case "formula":
      return getRandomFormula(limit);
    default:
      console.warn(`Operation ${op} not supported`);
      return { OperandA: a, OperandB: b, Operation: op, Result: 0 };
  }
}

function getRandomFormula(limit: number): TQuestion {
  // 0 => a + b + c
  // 1 => a + b - c
  // 2 => a - (b-c)
  // 3 => a*2 + b
  let formulaShape = getRandomInt(4);
  if (formulaShape === 0) {
    // 0 => ++ => a + b + c
    const subLimit = (2 * limit) / 3;
    const a = getRandomInt(subLimit);
    const b = getRandomInt(subLimit);
    const c = getRandomInt(subLimit);
    return { OperandA: 0, OperandB: 0, Operation: "formula", Result: a + b + c, PlainFormula: a + " + " + b + " + " + c };
  } else if (formulaShape === 1) {
    // 1 => +- => a + b - c
    const a = getRandomInt(limit);
    const b = getRandomInt(limit);
    const c = getRandomInt(a + b);
    return { OperandA: 0, OperandB: 0, Operation: "formula", Result: a + b - c, PlainFormula: a + " + " + b + " - " + c };
  } else if (formulaShape === 2) {
    // 2 => a - (b-c)
    const subLimit = limit / 2;
    const c = getRandomInt(subLimit);
    const b = c + getRandomInt(subLimit);
    const a = b + getRandomInt(subLimit);
    return { OperandA: 0, OperandB: 0, Operation: "formula", Result: a - (b - c), PlainFormula: a + " - (" + b + " - " + c + ")" };
  } else if (formulaShape === 3) {
    // 2 => a - (b-c)
    const subLimit = -1 + limit / 2;
    const a = getRandomInt(subLimit);
    const b = getRandomInt(subLimit);
    return { OperandA: 0, OperandB: 0, Operation: "formula", Result: a * 2 + b, PlainFormula: a + " * 2 + " + b };
  } else {
    console.warn(`formula shape not added: ${formulaShape}`);
    // default => a + b + c
    const subLimit = (2 * limit) / 3;
    const a = getRandomInt(subLimit);
    const b = getRandomInt(subLimit);
    const c = getRandomInt(subLimit);
    return { OperandA: 0, OperandB: 0, Operation: "formula", Result: a + b + c, PlainFormula: a + " + " + b + " + " + c };
  }
}

export function getRandomQuestionWithVariants(limit: number = 10): TQuestionWithVariants {
  const question = getRandomQuestion(limit);
  const variants = getRandomVariants(question.Result);
  return { Variants: variants, ...question };
}

const levelLimits = [11, 15]; // level: levelIndex -> levelLimit (1 -> 11, 2 -> 15, .. n+1 -> v(n)* 1.3 ..)
export function getLevelLimit(levelIndex: number): number {
  switch (true) {
    case levelIndex <= 0:
      return levelLimits[0];
    case levelIndex < levelLimits.length:
      return levelLimits[levelIndex];
    case levelIndex < 100:
      return Math.round(1.15 * getLevelLimit(levelIndex - 1));
    default:
      return 10;
  }
}
