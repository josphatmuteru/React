import { useState } from "react";

const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];

export default function App() {
  return (
    <>
      <Steps />
      <StepMessage step={1}>
        <p>Pass in content</p>
        <span>✌</span>
      </StepMessage>
      <StepMessage step={2}>
        <p>Read children prop</p>
        <span>😎</span>
      </StepMessage>
    </>
  );
}

function Steps() {
  const [step, setStep] = useState(1);
  const [isOpen, setIsOpen] = useState(true);
  // const step = 1;

  function handlePrevious() {
    if (step > 1) setStep((s) => s - 1);
  }

  function handleNext() {
    if (step < 3) setStep((s) => s + 1);
  }
  return (
    <>
      <button className="close" onClick={() => setIsOpen((is) => !is)}>
        &times;
      </button>
      {isOpen && (
        <div className="steps">
          <div className="numbers">
            <div className={step >= 1 ? "active" : ""}>1</div>
            <div className={step >= 2 ? "active" : ""}>2</div>
            <div className={step >= 3 ? "active" : ""}>3</div>
          </div>
          <StepMessage step={step}>
            {messages[step - 1]}
            <div className="buttons">
              <Button
                bgColor={"#e7e7e7"}
                onClick={() => alert(`Learn how to ${messages[step - 1]}`)}
                color={"#333"}
              >
                Learn how
              </Button>
            </div>
          </StepMessage>

          {/* <p className="message">
            Step {step}: {messages[step - 1]}
          </p> */}
          <div className="buttons">
            <Button onClick={handlePrevious} bgColor={"#7950f2"} color={"#fff"}>
              <span>👈</span>
              Previous
            </Button>
            <Button onClick={handleNext} bgColor={"#7950f2"} color={"#fff"}>
              Next
              <span>👉</span>
            </Button>

            {/* <button
              onClick={handlePrevious}
              style={{ backgroundColor: "#7950f2", color: "#fff" }}
            >
              Previous
            </button>
            <button
              onClick={handleNext}
              style={{ backgroundColor: "#7950f2", color: "#fff" }}
            >
              Next
            </button> */}
          </div>
        </div>
      )}
    </>
  );
}

function StepMessage({ step, children }) {
  return (
    <div className="message">
      <p>
        <h3>Step: {step}</h3>
        {children}
      </p>
    </div>
  );
}

function Button({ bgColor, color, onClick, children }) {
  return (
    <button
      onClick={onClick}
      style={{ backgroundColor: bgColor, color: color }}
    >
      {children}
    </button>
  );
}
