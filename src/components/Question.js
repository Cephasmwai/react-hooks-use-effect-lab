import React, { useState, useEffect } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);

  useEffect(() => {
    // Start the countdown timer
    if (timeRemaining === 0) {
      // If time runs out, reset the timer and call onAnswered with false
      onAnswered(false);
      setTimeRemaining(10);
      return;
    }

    // Decrease timeRemaining by 1 every second
    const timerId = setTimeout(() => {
      setTimeRemaining((prev) => prev - 1);
    }, 1000);

    // Cleanup function to clear the timeout when timeRemaining changes
    return () => clearTimeout(timerId);
  }, [timeRemaining, onAnswered]);

  function handleAnswer(isCorrect) {
    setTimeRemaining(10); // Reset the timer when an answer is chosen
    onAnswered(isCorrect);
  }

  const { id, prompt, answers, correctIndex } = question;

  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => {
        const isCorrect = index === correctIndex;
        return (
          <button key={answer} onClick={() => handleAnswer(isCorrect)}>
            {answer}
          </button>
        );
      })}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  );
}

export default Question;
