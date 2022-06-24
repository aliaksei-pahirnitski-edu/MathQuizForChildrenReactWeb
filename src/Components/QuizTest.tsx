import React from 'react';
// import {AdditionIllustrator, SubtractionIllustrator} from './Illustrators'
import AdditionIllustrator from './Illustrators/AdditionIllustrator'

const QuizTest = () => {
    let randomOp = '+';
    let randomA = 3;
    let randomB = 4;
    let result = 7;
    //let Illustrator = AdditionIllustrator;
    return <div>
        <i>{randomA}</i> + <i>{randomB}</i>
        <hr/>
        <AdditionIllustrator a={randomA} b={randomB} />
        <hr />
        = {result}
        <hr />
        <button> Next Quiz</button>
    </div>
}

export default QuizTest;