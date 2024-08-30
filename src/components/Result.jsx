/* eslint-disable react/prop-types */

function Result({ score, total, onPlayAgain }) {
  return (
    <div className="flex flex-col justify-center items-center h-screen text-center">
      <h2 className="text-green-600 text-lg font-medium">Quiz Successfully Completed!</h2>
      <p className="text-2xl lg:text-4xl font-semibold my-5">
        Your Score: {score} / {total}
      </p>
      <button
        onClick={onPlayAgain}
        className="bg-blue-600 text-lg font-medium text-white px-6 py-3 rounded-lg mb-2 hover:bg-blue-500 shadow-md"
      >
        Play Again
      </button>
    </div>
  );
}

export default Result;
