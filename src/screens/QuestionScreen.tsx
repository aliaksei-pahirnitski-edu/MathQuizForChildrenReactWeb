import React from 'react';

function QuestionCard() {
    let a = 5;
    const b = 3;
    let c = a - b;
    console.log(c);
    let veryLongNameWithLendth25 = 5;
    veryLongNameWithLendth25 = veryLongNameWithLendth25
        + veryLongNameWithLendth25 + veryLongNameWithLendth25 + veryLongNameWithLendth25 + veryLongNameWithLendth25 + veryLongNameWithLendth25 + veryLongNameWithLendth25
        + 8;



    c = veryLongNameWithLendth25;
    c = a + b;
    return (
        <div > IT IS QUESTION HERE:
            <span> {a} + {b}</span>=<span>{c}</span></div>
    );

}


export default QuestionCard;