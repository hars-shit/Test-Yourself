import { useState } from "react";
import CircularProgress from '@mui/material/CircularProgress';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addPaper } from "../redux/paperSlice";

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
    <div>
      <section className="search-section">
        <p className="text-black">What topic do you want to ask about?</p>
        <div className="input-container">
          <label htmlFor="email">Enter Email id</label>
          <br />
          <input type="text" 
          placeholder="Enter email id..."
          />
          <br />
          <label htmlFor="topic">Enter Topic</label>
          <br />
          <input
            type="text"
            value={topic}
            placeholder="Enter the topic..."
            onChange={(e) => setTopic(e.target.value)}
          />
          {!error ? (
            <button onClick={getResponse}>Ask me</button>
          ) : (
            <button onClick={clear}>Clear</button>
          )}
        </div>
        {loading && <CircularProgress />}
        {prompt && console.log("pros",prompt)}
        <div className="search-result">
         {prompt && 
         <div>
          length of the prompt is {prompt.length}
         </div>
         } 
         <button onClick={handlePrompt} disabled={prompt.length !== 10}> 
            Let's go...
         </button>
        </div>
      </section>
    </div>
  );
};

export default Test;
