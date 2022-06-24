import React from 'react';
import { AdditionIllustrator, SubtractionIllustrator } from './Illustrators'
import { getRandomQuestion } from './../Services/Randomizer'

const QuizTest = () => {
    let randomQuestion = getRandomQuestion(5);
    let Illustrator = randomQuestion.Operation === '+' ? AdditionIllustrator : SubtractionIllustrator;
    return <div>
        <i>{randomQuestion.OperandA}</i> {randomQuestion.Operation} <i>{randomQuestion.OperandB}</i>
        <hr />
        <Illustrator a={randomQuestion.OperandA} b={randomQuestion.OperandB} />
        <hr />
        = {randomQuestion.Result}
        <hr />
        <button> Next Quiz</button>
    </div>
}

export default QuizTest;