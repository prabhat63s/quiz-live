// eslint-disable-next-line react/prop-types
const DifficultySelection = ({ onSelectDifficulty }) => {
  const difficulties = [
    { level: "easy", color: "bg-green-600 hover:bg-green-400" },
    { level: "medium", color: "bg-yellow-500 hover:bg-yellow-400" },
    { level: "hard", color: "bg-red-600 hover:bg-red-400" },
  ];

  return (
    <>
      <div className="flex flex-col justify-center items-center px-8 text-center">
        <h2 className="text-blue-500 leading-10 text-4xl font-bold mb-5">
          Frontend Developer Quiz
        </h2>
        <h2 className="text-2xl font-semibold mb-5 text-neutral-800">
          Select Difficulty Level
        </h2>

        <div className="w-full max-w-6xl flex flex-col lg:flex-row items-center gap-6 justify-center">
          {difficulties.map(({ level, color }) => (
            <button
              key={level}
              className={`${color} text-white text-lg font-medium p-4 w-full rounded-lg shadow-lg`}
              onClick={() => onSelectDifficulty(level)}
            >
              {level.charAt(0).toUpperCase() + level.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="fixed bottom-10 text-lg font-medium text-neutral-700">
        Made with 💛 by <a href="https://prabhat-singh-portfolio.vercel.app/" target="_blank">Prabhat Singh</a> 
      </div>
    </>
  );
};

export default DifficultySelection;
