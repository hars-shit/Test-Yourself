import { useState,  useCallback, useEffect } from "react";
import CircularProgress from '@mui/material/CircularProgress';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Alert, Backdrop, Snackbar } from "@mui/material";
import { addPaper } from "../../redux/paperSlice";
import { useSocket } from "../../context/SocketProvider";
import { clusterId } from "../../redux/clusterSlice";

const Friend = () => {
  const [topic, setTopic] = useState("");
  const [email,setEmail]=useState("");
  const [room,setRoom]=useState();
  const [is_accepted,setIs_accepted]=useState(0)
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState({
    arr:[],
    id:''
  });
  const navigate = useNavigate();
  const dispatch=useDispatch()
  const user=useSelector((state)=>state.loggedSlice.currentUser);

  const handlePrompt = () => {
    const sendData = async () => {
      try {
        let response = await axios.post('http://localhost:2001/user/collab', {
          email:user.email,
          topic: topic,
          colllaborator_id:email,
          room_id:room,
          is_accepted:0,
          host_questions:prompt.arr.map(i=>({
            question:i.question,
            option:i.options,
            correct:i.correct_answer,
            is_correct:2 
          })),
          colllaborator_questions:prompt.arr.map(i=>({
            question:i.question,
            option:i.options,
            correct:i.correct_answer,
            is_correct:2 
          }))


        });
        console.log("res id ", response);
        dispatch(clusterId(response.data._id));
        handleSubmitForm()

        dispatch(addPaper({...prompt, id: response.data._id}))
        // response.data._id && navigate(`/room/${room}`)

       

      } catch (Error) {
        console.log("error", Error);
      }
    };
    sendData();
  }


  const socket=useSocket()
  // console.log("soc",socket)

  const handleSubmitForm =useCallback((e)=>{
      // e.preventDefault();
      socket.emit('room:join',{email,room});
      console.log({
          email,
          room
      })
  },[email,room,socket])

  const handleJoinRoom=useCallback((data)=>{
      const {email,room}=data;
      // console.log(email,room)
      navigate(`/room/${room}`)
  },[navigate])

  useEffect(()=>{
      socket.on('room:join',handleJoinRoom);
      return()=>{
          socket.off('room:join',handleJoinRoom)
      }
  },[socket,handleJoinRoom])

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
      const message = `Give me 10 random mcq questions numericals, hard ,medium and easy on the topic ${topic} in json format without any extra text on starting and end only json file. The first entity will be the question, then the correct answer index ,index will be start from 0, and then the 4 options which also include the correct answer 
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
      console.log("res type",response.data)
      setPrompt({ arr: response.data, id: '' });
      setOpen(true);
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
      <div className="mx-auto max-w-3xl p-6 rounded-lg shadow-lg">
        <div className="flex flex-col justify-center gap-4 items-start">
          <div className="space-y-2 mb-6">
            <h3 className="text-3xl font-bold">Test Yourself</h3>
            <p className="text-lg text-gray-500 dark:text-gray-400">Practice your target and achieve your dream</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="space-y-2 order-first">
              <label htmlFor="email" className="text-lg">Enter Collab Email Id</label>
              <input id="email" className="w-full py-2 px-4 border rounded-lg" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter Your email"/>
            </div>
            <div className="space-y-2  md:order-none">
              <label htmlFor="topic" className="text-lg">Enter your Topic</label>
              <input id="topic" className="w-full py-2 px-4 border rounded-lg" type="text" value={topic} placeholder="Enter the topic..." onChange={(e) => setTopic(e.target.value)}/>
            </div>
            <div className="space-y-2  md:order-none ">
              <label htmlFor="topic" className="text-lg">Enter your Category</label>
              <select name="" id="" className="w-full py-2 px-4 border rounded-lg">
                <option value="">Easy</option>
                <option value="">Medium</option>
                <option value="">Hard</option>
              </select>
            </div>
            <div className="space-y-2  md:order-none">
              <label htmlFor="room" className="text-lg">Create your Room Id</label>
              <input id="room" className="w-full py-2 px-4 border rounded-lg" type="text" value={room} placeholder="Enter the Room Id..." onChange={(e) => setRoom(e.target.value)}/>
            </div>
          </div>
          <div className="mb-4">
            {!error ? (
              <button onClick={getResponse} className="py-2 px-4 bg-white text-black border rounded-lg border-gray mb-5">Check Availability</button>
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
        {prompt.arr && (
          <div className="flex justify-center">
            {/* sx */}
            <button

              onClick={handlePrompt}
              disabled={prompt.arr.length !== 10}
              className={`py-2 px-4 bg-green-700 text-white rounded-lg w-1/2 ${prompt.arr.length !== 10 && 'opacity-70 cursor-not-allowed'}`}
            >
              Start Your Exam
            </button>
            {prompt?.arr.length === 10 ? (
              <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" variant="filled" sx={{ width: '100%' }}>
                  Your Test is ready. Click the button and start!
                </Alert>
              </Snackbar>
            ) : (
              <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" variant="filled" sx={{ width: '100%' }}>
                  Unable to prompt at this moment. Please retry after a while!
                </Alert>
              </Snackbar>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Friend;
