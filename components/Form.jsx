import React, { useState } from "react";
import { UseFetch } from "../hooks/useFetch.jsx";
import { BarsLoader } from "./Loader.jsx";

function Form(props) {
  const { setUrl, startQuiz } = props;
  const [formData, setFormData] = useState({
    amount: 1,
    difficulty: "",
    category: "",
  });
  const { data } = UseFetch("https://opentdb.com/api_category.php");

  function handleChange(event) {
    const { value, name } = event.target;
    setFormData((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  }

  function Submit(event) {
    event.preventDefault();
    if (formData.difficulty && formData.category) {
      setUrl(
        `https://opentdb.com/api.php?amount=${formData.amount}&category=${formData.category}&difficulty=${formData.difficulty}`
      );
    } else if (formData.difficulty) {
      setUrl(
        `https://opentdb.com/api.php?amount=${formData.amount}&difficulty=${formData.difficulty}`
      );
    } else if (formData.category) {
      setUrl(
        `https://opentdb.com/api.php?amount=${formData.amount}&category=${formData.category}`
      );
    } else {
      setUrl(`https://opentdb.com/api.php?amount=${formData.amount}`);
    }
    startQuiz();
  }

  const options =
    Object.keys(data).length > 0 &&
    data["trivia_categories"].map((data) => {
      return (
        <option key={data.id} value={data.id}>
          {data.name}
        </option>
      );
    });

  return Object.keys(data).length > 0 ? (
    <form className="form" onSubmit={Submit}>
      <h1>Quizzical</h1>
      <p>
        You could just click the start button below and get 10 random questions
        or you could select a specific category and difficulty level
      </p>

      <input
        type="number"
        id="select-number"
        name="amount"
        min={1}
        max={50}
        value={formData.value}
        onChange={handleChange}
        placeholder="choose number of questions to display 1 - 50"
      />

      <label htmlFor="select-category">Select Category</label>
      <select
        id="select-category"
        onChange={handleChange}
        name="category"
        className="category"
      >
        <option value="">Any Category</option>
        {options}
      </select>

      <label htmlFor="difficulty">Select Difficulty</label>
      <select
        id="difficulty"
        onChange={handleChange}
        name="difficulty"
        className="difficulty"
      >
        <option value="">Any Difficulty</option>
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>

      <button className="start-btn btn">Start Quiz</button>
    </form>
  ) : (
    <BarsLoader />
  );
}

export default Form;
