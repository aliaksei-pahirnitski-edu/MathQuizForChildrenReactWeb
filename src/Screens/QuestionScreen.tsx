import React from "react";

function QuestionCard() {
  let a = 5;
  const b = 3;
  let c = a - b;
  console.log(c);

  return (
    <div>
      {" "}
      IT IS QUESTION HERE:
      <span>
        {" "}
        {a} + {b}
      </span>
      =<span>{c}</span>
    </div>
  );
}

export default QuestionCard;
