import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Paper = () => {
  const data = useSelector(state => state.currentuser);
  const [index, setIndex] = useState(0);
  const [timerDuration, setTimerDuration] = useState(20); 

  useEffect(() => {
    const timer = setInterval(() => {
      setTimerDuration(prevDuration => {
        if (prevDuration === 1) {
          setIndex(prevIndex => prevIndex + 1);
          return 20; 
        } else {
          return prevDuration - 1;
        }
      });
    }, 1000);

    return () => clearInterval(timer); // Cleanup function
  }, [index]); 

  const handleOptionChange = (e) => {
    
    console.log("Selected option:", e.target.value);
  };

  return (
    <div>
      <div>
        {index < data.length ? (
          <div>
            <p>Time remaining: {timerDuration} seconds</p>
            <p>Q{index + 1} {data[index]?.question}</p>
            <form>
              {data[index]?.options.map((option, optionIndex) => (
                <div key={optionIndex}>
                  <input
                    type="radio"
                    id={`option-${optionIndex}`}
                    name={`option-${index}`}
                    value={option}
                    onChange={handleOptionChange}
                  />
                  <label htmlFor={`option-${optionIndex}`}>{option}</label>
                </div>
              ))}
            </form>
          </div>
        ) : (
          <p>Exam Finished</p>
        )}
      </div>
    </div>
  );
};

export default Paper;
