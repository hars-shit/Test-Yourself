import { useState } from "react";
import CircularProgress from '@mui/material/CircularProgress';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addPaper } from "../redux/paperSlice";
import { Alert, Backdrop, Snackbar } from "@mui/material";

const Test = () => {
  const [topic, setTopic] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState([]);
  const navigate = useNavigate();
  const dispatch=useDispatch()
  const handlePrompt = () => {
      dispatch(addPaper(prompt))
      navigate('/paper');
    
    
  }
  
  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };


  const getResponse = async () => {
    if (!topic) {
      setError("Error: Please provide a topic");
      return;
    }
    try {
      setLoading(true);
      const message = `Give me 10 random mcq questions on the topic ${topic} in json format without any extra text only json file. The first entity will be the question, then the correct answer, and then the 4 options which also include the correct answer 
      example:
      [
        {
          "question": "What is the capital of France?",
          "correct_answer": "Paris",
          "options": ["London", "Berlin", "Paris", "Rome"]
        },
        {
          "question": "Which planet is known as the Red Planet?",
          "correct_answer": "Mars",
          "options": ["Venus", "Jupiter", "Mars", "Saturn"]
        },
        {
          "question": "What is the chemical symbol for water?",
          "correct_answer": "H2O",
          "options": ["CO2", "H2O", "O2", "H2SO4"]
        }
      ]
      
      `;
      const options = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await axios.post("http://localhost:8000/chat", { message }, options);
      setPrompt(response.data);
      // if(response.data.length==10){
        setOpen(true)
      // }
      setTopic("");
    } catch (err) {
      console.error(err);
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const clear = () => {
    setTopic("");
    setError("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <div className="mx-auto max-w-3xl p-6  rounded-lg shadow-lg">
      <div className="flex flex-col justify-center gap-4 items-start">
        <div className="space-y-2 mb-6">
          <h3 className="text-3xl font-bold">Test Yourself</h3>
          <p className="text-lg text-gray-500 dark:text-gray-400 ">Practice your target and achieve your dream</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
  <div className="space-y-2 order-first">
    <label htmlFor="email" className="text-lg">Email</label>
    <input id="email" className="w-full py-2 px-4 border rounded-lg" type="email" placeholder="Enter Your email"/>
  </div>
  <div className="space-y-2  md:order-none">
    <label htmlFor="topic" className="text-lg">Enter your Topic</label>
    <input id="topic" className="w-full py-2 px-4 border rounded-lg" type="text" value={topic} placeholder="Enter the topic..." onChange={(e) => setTopic(e.target.value)}/>
  </div>
</div>
<div className="mb-4">

        {!error ? (
          
          <button  onClick={getResponse} className="py-2 px-4 bg-white text-black border rounded-lg border-gray mb-5">Check Availability</button>
          
          ) : (
            <button onClick={clear} className="py-2 px-4 bg-white text-black border rounded-lg border-gray mb-5">Clear</button>
            )}
      </div>
            </div>
      {loading && 
        <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      }
      {prompt && (
        <div className="flex justify-center">
          {/* <div className="mb-6">Length of the prompt is {prompt.length}</div> */}
          
          <button
  onClick={handlePrompt}
  disabled={prompt.length !== 10}
  className={`py-2 px-4 bg-green-700 text-white rounded-lg w-1/2 ${
    prompt.length !== 10 && 'opacity-70 cursor-not-allowed'
  }`}
>
  Start Your Exam
</button>
{
  prompt?.length == 10
  ?
<Snackbar open={open} autoHideDuration={6000} 
onClose={handleClose}
>
  <Alert
    onClose={handleClose}
    severity="success"
    variant="filled"
    sx={{ width: '100%' }}
    >
    Your Test is ready click the Button and start !
  </Alert>
</Snackbar>
:
<Snackbar open={open} autoHideDuration={6000} 
onClose={handleClose}
>
  <Alert
    onClose={handleClose}
    severity="danger"
    variant="filled"
    sx={{ width: '100%' }}
    >
    Unable to Prompt at this moment, Please Retry after a while !
  </Alert>
</Snackbar>
  }

        </div>
      )}
    </div>
  </div>
  
  );
};

export default Test;
