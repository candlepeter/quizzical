import React, { useContext } from "react";
import Answer from "./Answer.jsx";
import randomizeAnswers from "../utils/randomizeAnswers";

function QuestionCard(props) {
  const { data, onClick, checkResult } = props;

  const answers = data.answers.map((answer) => {
    if (!checkResult) {
      if (!answer.selected) {
        return (
          <Answer
            key={answer.id}
            answer={answer}
            showAnswer=""
            onClick={onClick}
            checkResult={checkResult}
          />
        );
      } else {
        return (
          <Answer
            key={answer.id}
            answer={answer}
            showAnswer="selected"
            onClick={onClick}
            checkResult={checkResult}
          />
        );
      }
    } else {
      if (answer.selected && answer.value === data.correctAnswer) {
        return (
          <Answer
            key={answer.id}
            answer={answer}
            showAnswer="correct"
            onClick={onClick}
            checkResult={checkResult}
          />
        );
      } else if (answer.selected && answer.value !== data.correctAnswer) {
        return (
          <Answer
            key={answer.id}
            answer={answer}
            showAnswer="wrong"
            onClick={onClick}
            checkResult={checkResult}
          />
        );
      } else if (!answer.selected && answer.value === data.correctAnswer) {
        return (
          <Answer
            key={answer.id}
            answer={answer}
            showAnswer="isRight"
            onClick={onClick}
            checkResult={checkResult}
          />
        );
      } else {
        return (
          <Answer
            key={answer.id}
            answer={answer}
            showAnswer=""
            onClick={onClick}
            checkResult={checkResult}
          />
        );
      }
    }
  });

  return (
    <div className="question-wrapper">
      <h3>{decodeURI(data.question)}</h3>
      <div className="answer-wrapper">{answers}</div>
    </div>
  );
}

export default QuestionCard;
