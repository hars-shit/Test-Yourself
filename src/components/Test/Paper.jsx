import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const num = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
];
const Paper = () => {
  const [activeIndex, setActiveIndex] = useState(0); // State variable to keep track of the active number's index

  const handleNumberClick = (index) => {
    setActiveIndex(index);
  };
  const data = useSelector((state) => state.paperSlice.currentuser.arr);
  const id = useSelector((state) => state.paperSlice.currentuser.id);
  // console.log("data rr",data)
  const [index, setIndex] = useState(0);
  const [timerDuration, setTimerDuration] = useState(5);
  const [optionIndex, SetOptionIndex] = useState(null);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setTimerDuration((prevDuration) => {
        if (prevDuration === 1) {
          if (index === data.length - 1) {
            navigate("/res");
          }
          setIndex((prevIndex) => prevIndex + 1);

          const setData = async () => {
            // const isCorrect=selectedOption===currentQuestion
            try {
              let currentQuestion = data[index].question;
              // console.log("Current Question:", currentQuestion);

              let correct = data[index].options[data[index].correct_answer];
              // console.log("Selected Option:", correct);

              // 1 represent true and 0 false
              let is_correct =
                data[index].correct_answer === optionIndex ? 1 : 0;
              // console.log("is correct",is_correct)

              const response = await axios.put(
                `http://localhost:2001/user/questions/${id}`,
                {
                  question: currentQuestion,
                  correct: correct,
                  is_correct: is_correct,
                }
              );
              // console.log("response",response)
            } catch (err) {
              console.log(err);
            }
          };

          setSelectedOptionIndex(null); // Reset selected option index
          setData();
          return 5;
        } else {
          return prevDuration - 1;
        }
      });
    }, 1000); // Fixed timer duration to 1000ms

    return () => clearInterval(timer); // Cleanup function
  }, [data, id, index, navigate, optionIndex, selectedOptionIndex]);

  const handleOptionChange = (e, optionIndex) => {
    setSelectedOptionIndex(parseInt(e.target.value)); // Set selected option index
    // console.log("Selected option:", optionIndex);
    SetOptionIndex(optionIndex);
  };

  return (
    <div className="flex flex-col justify-center items-center   min-h-screen">
    {/* Quiz Header */}
    <div className="flex flex-col md:flex-row justify-between w-full md:mb-10 px-4">
        <div className="flex flex-col justify-center items-center mb-4 text-gray-400">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Test 01 - Java Quiz</h1>
            <p className="text-sm text-gray-600 mt-2">Please select the correct answer</p>
        </div>
        <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
            <p className="bg-gray-200 text-black rounded-full px-4 py-1 text-xs md:text-sm shadow-md">
                Time remaining: {timerDuration} seconds
            </p>
            <p className="bg-red-100 text-red-800 rounded-full px-4 py-1 text-xs md:text-sm shadow-md">
                Do not open other tabs
            </p>
        </div>
    </div>
  
   
    <div className="flex justify-center w-full md:bg-gray-100 rounded-md md:border border-black  md:w-[80vw] py-8 px-6 md:px-12">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center w-full">
            {/* Question and Options */}
            <div className="flex flex-col justify-center items-center w-full md:w-3/5 p-6 ">
                {index < data.length && (
                    <div className="mb-6 w-full">
                        <p className="text-xl md:text-2xl font-medium text-gray-800 mb-4">
                            Q{index + 1}: {data[index]?.question}
                        </p>
                        <form className="space-y-4 w-full">
                            {data[index]?.options.map((option, optionIndex) => (
                                <div key={optionIndex} className="flex items-center space-x-4">
                                    <input
                                        type="radio"
                                        id={`option-${optionIndex}`}
                                        name={`option-${index}`}
                                        value={optionIndex}
                                        checked={selectedOptionIndex === optionIndex}
                                        onChange={(e) => handleOptionChange(e, optionIndex)}
                                        className="form-radio h-5 w-5 text-blue-600"
                                    />
                                    <label
                                        htmlFor={`option-${optionIndex}`}
                                        className="text-base text-gray-800"
                                    >
                                        {option}
                                    </label>
                                </div>
                            ))}
                        </form>
                    </div>
                )}
            </div>
  
            {/* calender  */}
            <div className="w-full md:w-2/5 flex flex-col justify-center items-center mt-4 md:mt-0">
                <div className="grid grid-cols-4 gap-4 p-4 bg-white rounded-md shadow-md">
                    {num.map((number, index) => (
                        <div
                            key={index}
                            className={`text-center h-12 w-12 flex justify-center items-center bg-gray-200 text-gray-800 rounded-full hover:bg-gray-300 transition duration-300 ${
                                index === activeIndex ? 'border border-blue-500' : ''
                            }`}
                            onClick={() => handleNumberClick(index)}
                        >
                            {number}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
  
    {/*  Buttons */}
    <div className="flex justify-center md:justify-end w-full gap-8 px-4 mt-8 md:mt-12 md:mr-20">
        <button className="px-6 md:px-10 py-2 md:py-3 bg-[#44ad55] text-white rounded-lg hover:bg-green-600 transition duration-300">
            Back
        </button>
        <button className="px-6 md:px-10 py-2 md:py-3 bg-[#8e44ad] text-white rounded-lg disabled:opacity-50 hover:bg-purple-700 transition duration-300">
            Next
        </button>
    </div>
</div>


  
  );
};

export default Paper;
