function NextButton({ dispatch, answer, index, numQuestions }) {
  if (answer === null) return null;

  if (index < numQuestions - 1) {
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "nextQuestion" })}
      >
        Next
      </button>
    );
  }

  if (index === numQuestions - 1) {
    return (
      <button
        onClick={() => dispatch({ type: "finish" })}
        className="btn btn-ui"
      >
        Finish
      </button>
    );
  }
}

export default NextButton;
