import { useState } from "react";

/* eslint-disable react/prop-types */
function Question({ data, onAnswer }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [showMessage, setShowMessage] = useState(false);

  const handleAnswer = (option) => {
    setSelectedOption(option);
    const correct = option === data.answer;
    setIsCorrect(correct);
    setShowMessage(true);

    setTimeout(() => {
      setShowMessage(false);
      onAnswer(option);
      setSelectedOption(null);
      setIsCorrect(null);
    }, 2000);
  };

  return (
    <div >
      <h2 className="text-3xl lg:text-4xl font-semibold mb-10">{data.question}</h2>
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
        {data.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(option)}
            className={`w-full overflow-x-auto border p-6 rounded-lg mb-2 
              ${
                selectedOption === option
                  ? isCorrect
                    ? "bg-green-600 text-white"
                    : "bg-red-600 text-white"
                  : "hover:text-white text-lg font-medium hover:bg-blue-500 hover:shadow-lg"
              }`}
            disabled={selectedOption !== null}
          >
            {option}
          </button>
        ))}
      </div>

      {/* Pop-up Message */}
      {showMessage && (
        <div
          className={`fixed top-10 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-lg text-white ${
            isCorrect ? "bg-green-600" : "bg-red-600"
          }`}
        >
          {isCorrect ? "Correct Answer!" : "Wrong Answer!"}
        </div>
      )}
    </div>
  );
}

export default Question;
