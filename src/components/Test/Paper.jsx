import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Result from "./Result";
import { Card } from "@mui/material";

const Paper = () => {
  const data = useSelector((state) => state.currentuser);
  const [index, setIndex] = useState(0);
  const [timerDuration, setTimerDuration] = useState(20);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimerDuration((prevDuration) => {
        if (prevDuration === 1) {
          setIndex((prevIndex) => prevIndex + 1);
          return 20;
        } else {
          return prevDuration - 1;
        }
      });
    }, 1000); // Fixed timer duration to 1000ms

    return () => clearInterval(timer); // Cleanup function
  }, [index]);

  const handleOptionChange = (e) => {
    console.log("Selected option:", e.target.value);
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center">
      <Card className="w-full md:w-[600px]  h-auto md:h-[80vh] bg-white p-4 md:p-8  shadow-lg rounded-lg flex flex-col justify-between">
        <div>
          <h1 className="text-xl md:text-3xl font-bold text-center mb-2 md:mb-4">
            Basics Quiz
          </h1>
          <p className="text-base md:text-lg text-gray-600 text-center mb-4 md:mb-8">
            Please select the correct answer for each question
          </p>
        </div>
        {index < data.length ? (
          <div>
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 md:mb-10">
              <p className="bg-gray-200 text-black rounded-lg px-2 md:px-4 py-1 md:py-2 mb-4 md:mb-2 text-xs md:text-sm">
                Time remaining: {timerDuration} seconds
              </p>
              <p className="bg-red-100 text-red-800 rounded-lg px-2 md:px-4 py-1 md:py-2 text-xs md:text-sm">
                Do not open other tabs
              </p>
            </div>
            <p className="text-sm md:text-lg font-medium mb-4">
              Q{index + 1}: {data[index]?.question}
            </p>
            <form className="space-y-3 md:space-y-4 mb-8">
              {data[index]?.options.map((option, optionIndex) => (
                <div key={optionIndex} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id={`option-${optionIndex}`}
                    name={`option-${index}`}
                    value={option}
                    onChange={handleOptionChange}
                    className="form-radio h-4 w-4 md:h-5 md:w-5 text-blue-600"
                  />
                  <label
                    htmlFor={`option-${optionIndex}`}
                    className="text-xs md:text-sm"
                  >
                    {option}
                  </label>
                </div>
              ))}
            </form>
          </div>
        ) : (
          <Result />
        )}
        <div className="flex justify-between mt-5 md:mt-8">
          <button className="px-4 md:px-6 py-2 md:py-3 bg-slate-400 text-white rounded-lg">
            Back
          </button>
          <button className="px-4 md:px-6 py-2 md:py-3 bg-slate-400 text-white rounded-lg disabled:opacity-50">
            Next
          </button>
        </div>
      </Card>
    </div>
  );
};

export default Paper;
