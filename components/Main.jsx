import React, { useState, useEffect } from "react";
import Form from "./Form.jsx";
import QuestionCard from "./QuestionCard.jsx";
import { UseFetch } from "../hooks/useFetch.jsx";
import questionModifer from "../utils/questionModifer";
import { GridLoader } from "./Loader.jsx";

function Main() {
  const [questionsData, setQuestionsData] = useState([]);
  const [start, setStart] = useState(false);
  const [url, setUrl] = useState("");
  const [checkResult, setCheckResult] = useState(false);
  const [score, setScore] = useState(0);
  const { data } = UseFetch(url);

  function startQuiz() {
    setStart(true);
  }

  function checkData() {
    return Object.keys(data).length > 0;
  }

  useEffect(() => {
    if (checkData()) {
      setQuestionsData(questionModifer(data));
    }
  }, [data]);

  function handleClick(event, questionId) {
    const newQuestionData = questionsData.map((question) => {
      if (question.id === questionId) {
        const selectedAnswer = question.answers.map((answer) => {
          if (answer.id === event.target.id) {
            return { ...answer, selected: true };
          } else {
            return { ...answer, selected: false };
          }
        });
        return { ...question, answers: selectedAnswer };
      } else {
        return question;
      }
    });
    setQuestionsData(newQuestionData);
  }

  function showQuestions() {
    if (checkData()) {
      return questionsData.map((result) => {
        return (
          <QuestionCard
            key={result.id}
            data={result}
            id={result.id}
            onClick={() => handleClick(event, result.id)}
            checkResult={checkResult}
          />
        );
      });
    } else {
      return <GridLoader />;
    }
  }

  function checkAnswer() {
    setCheckResult(true);
    questionsData.map((question) => {
      question.answers.map((answer) => {
        if (answer.selected && answer.value === question.correctAnswer) {
          setScore((prevScore) => prevScore + 1);
        }
      });
    });
  }

  function playAgain() {
    setStart(false);
    setCheckResult(false);
    setQuestionsData([]);
    setUrl("");
    setScore(0);
  }

  function displayBtn() {
    if (checkResult) {
      return (
        <div className="result-wrapper">
          <span>
            Your scored is {score}/{questionsData.length} correct answers
          </span>
          <button className="btn play-again" onClick={playAgain}>
            Play again
          </button>
        </div>
      );
    } else {
      const disableBtn = questionsData.every((question) => {
        return !question.answers.some((answer) => answer.selected);
      });
      return (
        <button
          disabled={disableBtn}
          className="btn check-answer"
          onClick={checkAnswer}
        >
          Check answers
        </button>
      );
    }
  }

  function displayFormOrQuestion() {
    if (start) {
      return (
        <div>
          {showQuestions()}
          {questionsData.length > 0 && displayBtn()}
        </div>
      );
    } else {
      return <Form setUrl={setUrl} startQuiz={startQuiz} />;
    }
  }

  return <main className="main-container">{displayFormOrQuestion()}</main>;
}

export default Main;
