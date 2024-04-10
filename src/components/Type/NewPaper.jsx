import { useSelector } from "react-redux";
import { Card } from "@mui/material";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import { useState, useEffect } from "react";
import Textarea from "@mui/joy/Textarea";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import InfoIcon from "@mui/icons-material/Info";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Tooltip from "@mui/material/Tooltip";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
// import { prompt} from "../../redux/promptSlice";
import {setPrompts, updateAnswer} from "../../redux/promptSlice"

const NewPaper = () => {
  const data = useSelector((state) => state.paperSlice.currentuser.arr);
  const [arr, setArr] = useState([]);
  const [index, setIndex] = useState(0);
  const [input, setInput] = useState('');
  const navigate = useNavigate()
  console.log("aerr",arr)
  const dispatch=useDispatch()

  useEffect(() => {
    const currentAnswer = data[index]?.user_answer || '';
    setInput(currentAnswer);
  }, [index, data]);


  useEffect(()=>{
    dispatch(setPrompts(data))
  },[])

  
  const handleTextareaChange = (e) => {
    const { value } = e.target;
  
    // Update the input state with the typed value
    setInput(value);
  
    // Create a new array with the updated value
    const updatedData = data.map((item, idx) => {
      if (idx === index) {
        return { ...item, user_answer: value };
      }
      return item;
    });
    // Dispatch the updated answer to the Redux store
dispatch(updateAnswer({ index, user_answer: value }));

  };
  

  const handleNext = () => {
    if(index === data.length-1){
      navigate('/result')
    }
    if (index < data.length - 1) {
      setIndex((ind) => ind + 1);
    }

  };

  const handleBack = () => {
    if (index > 0) {
      setIndex((ind) => ind - 1);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center">
      <Card className="w-full md:w-[850px] h-auto md:h-[80vh] bg-white p-4 md:p-8 shadow-lg rounded-lg flex flex-col justify-between">
        <div className="flex justify-between items-center">
          <ChevronLeftIcon style={{ fontSize: "2.5rem" }} />
          <div className="flex items-center gap-3">
            <AccessAlarmIcon style={{ fontSize: "1.80rem" }} />
            <p style={{ fontSize: "1.20rem", marginLeft: "5px" }}>00:23:45</p>
          </div>
        </div>
        <div>
          <h1 className="text-xl md:text-3xl font-bold text-center mb-2 md:mb-4">
            Basics Quiz
          </h1>
          <p className="text-base md:text-lg text-gray-600 text-center mb-4 md:mb-8">
            Please select the correct answer for each question
          </p>
        </div>
        <div className="flex justify-center md:justify-end items-center mb-6 md:mb-10">
          <div className="relative bg-red-100 rounded-lg px-2 md:px-4 py-1 md:py-2 text-xs md:text-sm ">
            <Tooltip title="Do not open other tabs otherwise form will be submit automatically" arrow>
              <InfoIcon style={{ fontSize: "15px", marginTop: "-2", marginRight: "4px" }} />
            </Tooltip>
            Do not change or open another window.
          </div>
        </div>
        <div>
          <p className="text-lg md:text-lg font-medium mb-4">
            Q{index + 1} : {data[index].question}
          </p>
          <FormControl>
            <FormLabel sx={{ fontWeight: "600", fontSize: "15px" }}></FormLabel>
            <Textarea
              placeholder=" Your answer..😃"
              minRows={3}
              value={input}
              onChange={handleTextareaChange}
            />
          </FormControl>
        </div>
        <div className="flex justify-between mt-5 md:mt-8">
          <button
            className="px-4 md:px-6 py-2 md:py-3 bg-slate-400 text-black  rounded-lg disabled:opacity-50 "
            onClick={handleBack}
          >
            <ChevronLeftIcon style={{ fontSize: "2rem" }} /> Back
          </button>
          <p className="text-lg font-semibold"> Question {index + 1} of {data.length}</p>
          <button
            className="px-4 md:px-6 py-2 md:py-3 bg-slate-400 text-black rounded-lg disabled:opacity-50"
            onClick={handleNext}
          >
            {index === data.length-1 ? "Submit" : "Next"} 
            <ChevronRightIcon style={{ fontSize: "2rem" }} />
          </button>
        </div>
      </Card>
    </div>
  );
};

export default NewPaper
