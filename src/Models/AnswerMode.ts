export type ASKING_MODE = "ASKING";
export type SHOWING_ANSWER_MODE = "SHOWING_ANSWER";
export type AnswerMode = ASKING_MODE | SHOWING_ANSWER_MODE;
export const ASKING: ASKING_MODE = "ASKING";
export const SHOWING_ANSWER: SHOWING_ANSWER_MODE = "SHOWING_ANSWER";

export type TAnswerState = { mode: ASKING_MODE } | { mode: SHOWING_ANSWER_MODE; answer: number };
