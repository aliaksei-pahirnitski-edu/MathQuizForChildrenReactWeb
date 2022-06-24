import { AllOperations } from './../Models/TOperation'
import { TQuestion } from './../Models/QuestionModel'

function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
}

export function getRandomOperation() {
    let max = AllOperations.length;
    let randomIndex = Math.floor(Math.random() * max);
    return AllOperations[randomIndex];
}


export function getRandomQuestion(limit: number = 4): TQuestion {
    let op = getRandomOperation();
    let a = getRandomInt(limit);
    let b = getRandomInt(limit);
    switch (op) {
        case '+': return { OperandA: a, OperandB: b, Operation: op, Result: a + b };
        case '-': return { OperandA: a + b, OperandB: a, Operation: op, Result: b };
        default:
            console.warn(`Operation ${op} not supported`);
            return { OperandA: a, OperandB: b, Operation: op, Result: 0 };
    }
}