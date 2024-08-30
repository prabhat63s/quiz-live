import { useState, useEffect } from "react";
import Question from "../components/Question";
import Result from "../components/Result";
import DifficultySelection from "../components/DifficultySelection";
import { quizData } from "../quizData";

const shuffleArray = (array) => {
  let shuffledArray = array.slice();
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

const getShuffledQuizData = (difficulty) => {
  const filteredQuestions = quizData.filter((q) => q.difficulty === difficulty);
  return shuffleArray(filteredQuestions);
};

function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [questions, setQuestions] = useState([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);

  const handleDifficultySelect = (difficulty) => {
    setSelectedDifficulty(difficulty);
    setQuestions(getShuffledQuizData(difficulty));
  };

  useEffect(() => {
    if (selectedDifficulty && timeLeft > 0 && !showResult) {
      const timerId = setInterval(() => {
        setTimeLeft((prevTimeLeft) => {
          if (prevTimeLeft === 1) {
            handleNextQuestion();
            return 30;
          }
          return prevTimeLeft - 1;
        });
      }, 1000);

      return () => clearInterval(timerId);
    }
  }, [timeLeft, selectedDifficulty, showResult]);

  const handleAnswer = (selectedOption) => {
    if (selectedOption === questions[currentQuestion].answer) {
      setScore((prevScore) => prevScore + 2);
    }
    handleNextQuestion();
  };

  const handleNextQuestion = () => {
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
      setTimeLeft(30);
    } else {
      setShowResult(true);
    }
  };

  const handlePreviousQuestion = () => {
    const previousQuestion = currentQuestion - 1;
    if (previousQuestion >= 0) {
      if (
        questions[previousQuestion].userAnswer ===
        questions[previousQuestion].answer
      ) {
        setScore((prevScore) => prevScore - 2);
      }
      setCurrentQuestion(previousQuestion);
      setTimeLeft(30);
    }
  };

  const handleSubmit = () => {
    setShowResult(true);
  };

  const handleReset = () => {
    setQuestions([]);
    setCurrentQuestion(0);
    setScore(0);
    setTimeLeft(30);
    setShowResult(false);
    setSelectedDifficulty(null);
  };

  return (
    <div className="flex flex-col justify-center items-center w-full min-h-screen px-4 py-12">
      {!selectedDifficulty ? (
        <DifficultySelection onSelectDifficulty={handleDifficultySelect} />
      ) : (
        <div className="w-full max-w-7xl ">
          {showResult ? (
            <Result
              score={score}
              total={questions.length * 2}
              onPlayAgain={handleReset}
            />
          ) : (
            <>
              <div className="flex items-center justify-between font-semibold text-lg text-neutral-600 mb-4">
                <p className="text-blue-600 mb-2">
                  Question {currentQuestion + 1} of {questions.length}
                </p>
                <p className={timeLeft <= 10 ? "text-red-600" : ""}>
                  Time Left: {timeLeft} seconds
                </p>
              </div>
              <div className="mb-10">
                <div className="flex justify-between mb-4 items-center">
                  <div className="text-lg font-medium lg:w-[10%]">Score: {score}</div>
                  <div className="w-[80%] lg:w-[90%] bg-gray-200 rounded-full h-1">
                    <div
                      className="bg-green-600 h-1 rounded-full"
                      style={{
                        width: `${
                          ((currentQuestion + 0) / questions.length) * 100
                        }%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
              <Question
                data={questions[currentQuestion]}
                onAnswer={(selectedOption) => {
                  questions[currentQuestion].userAnswer = selectedOption;
                  handleAnswer(selectedOption);
                }}
              />
              <div className="flex justify-between mt-10">
                <button
                  className="bg-blue-400 text-lg font-medium text-white px-4 py-2 rounded-lg mb-2 hover:bg-blue-600 shadow-md"
                  onClick={handlePreviousQuestion}
                  disabled={currentQuestion === 0}
                >
                  Previous
                </button>
                {currentQuestion < questions.length - 1 ? (
                  <button
                    className="bg-blue-600 text-lg font-medium text-white px-4 py-2 rounded-lg mb-2 hover:bg-blue-500 shadow-md"
                    onClick={handleNextQuestion}
                  >
                    Next
                  </button>
                ) : (
                  <button
                    className="bg-green-600 text-lg font-medium text-white px-4 py-2 rounded-lg mb-2 hover:bg-green-800 shadow-md"
                    onClick={handleSubmit}
                  >
                    Submit
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default Quiz;
