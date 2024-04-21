import { useCallback, useEffect, useState } from "react";
import { useSocket } from "../../context/SocketProvider";
import ReactPlayer from "react-player";
import peer from "../../service/peer";
import axios from 'axios'
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Card } from "@mui/material";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
const Room = () => {
  const num=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]
  const [activeIndex, setActiveIndex] = useState(0); // State variable to keep track of the active number's index

  const handleNumberClick = (index) => {
    setActiveIndex(index); 
  };
  const socket = useSocket();
  const [remoteSocketId, setRemoteSocketId] = useState(null);
  const [myStream, setMyStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState();
  const id=useSelector((state)=>state.clusterSlice.currentId);
  const [data, setData] = useState([])
  const [email,setEmail]=useState("ankita@gmail.com")

  const [index, setIndex] = useState(0);
  const [timerDuration, setTimerDuration] = useState(10);
  const [optionIndex,SetOptionIndex]=useState(null)
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
  const navigate=useNavigate();
  const [collaboratorEmail, setCollaboratorEmail] = useState()
  const [prompt,setPrompt]=useState([])


  const handleUserJoined = useCallback(({ email, id }) => {
    setRemoteSocketId(id);
  }, []);

  useEffect(()=>{
    const getData=async()=>{

      try{
        let response=await axios.get(`http://localhost:2001/collab/${id}`)
         
        setData(response.data.colllaborator_id == email ? response.data.colllaborator_questions : response.data.host_questions)
        setCollaboratorEmail(response.data.colllaborator_id)
       
      }
      catch(err){
        console.log("Error While getting",err);
      }
    }
    getData()
  },[email, id])
 

  useEffect(() => {

    const timer = setInterval(() => {
      
      setTimerDuration((prevDuration) => {
        if (prevDuration === 1) {
            if(index===data.length-1){
                navigate('/res')
            }
            setIndex((prevIndex) => prevIndex + 1);
         
          

          
          const setData=async()=>{
            try{
                
                  let currentQuestion = data[index].question;
                  // console.log("Current Question:", currentQuestion);
               
                  let correct = data[index].option[data[index].correct];
                  // console.log("Selected Option:", correct);
                  
                  // 1 represent true and 0 false 
                  console.log('An',data[index].correct,optionIndex)
                  let is_correct=data[index].correct== optionIndex ? 1:0;
                  // console.log("is correct",is_correct)
                  // console.log("dss",email , collaboratorEmail)
                
                const response = email == collaboratorEmail ? await axios.put(`http://localhost:2001/collab/question/${id}`,
                {
                  questionIndex:index,
                  question:currentQuestion,
                  correct:correct,
                  is_correct:is_correct
                }
                ) : await axios.put(`http://localhost:2001/host/question/${id}`,{
                  questionIndex:index,
                  question:currentQuestion,
                  correct:correct,
                  is_correct:is_correct
                })
                console.log("response ghjk",response)
              }
              catch(err){
                console.log(err)
              }
          }
          
          setSelectedOptionIndex(null); 
          setData()
          return 10;
        } else {
          return prevDuration - 1;
        }
      });
    }, 1000); 

    return () => clearInterval(timer); 
  }, [data, email, id, index, navigate, optionIndex, selectedOptionIndex]);


  const handleOptionChange = (e,optionIndex) => {
    setSelectedOptionIndex(parseInt(e.target.value)); 
    console.log("Selected option:", optionIndex);
    SetOptionIndex(optionIndex)
  };

  const handleCallUser = useCallback(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    const offer = await peer.getOffer();
    socket.emit("user:call", {
      to: remoteSocketId,
      offer,
    });
    setMyStream(stream);
  }, [remoteSocketId, socket]);

  const handleIncomingCall = useCallback(
    async ({ from, offer }) => {
      setRemoteSocketId(from);
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      setMyStream(stream);
      
      const ans = await peer.getAnswer(offer);
      socket.emit("call:accepted", { to: from, ans });
    },
    [socket]
  );

  const sendStream=useCallback(()=>{
    for (const track of myStream.getTracks()) {
        peer.peer.addTrack(track, myStream);
      }
  },[myStream])

  const handleCallAccepted = useCallback(
    ({ from, ans }) => {
      peer.setLocalDescription(ans);
      sendStream()
    },
    [sendStream]
  );

  const handleNegoNeeded = useCallback(async () => {
    const offer = await peer.getOffer();
    socket.emit("peer:nego:needed", { offer, to: remoteSocketId });
  }, [remoteSocketId, socket]);

   const handleNegoNeedIncoming=useCallback(async({from,offer})=>{
    const ans=await peer.getAnswer(offer);
    socket.emit("peer:nego:done",{to:from,ans});
   },
   [socket]
   )

   const handleNegoFinal=useCallback(async({ans})=>{
    await peer.setLocalDescription(ans)
   },[])

  useEffect(() => {
    peer.peer.addEventListener("negotiationneeded", handleNegoNeeded);
    return () => {
      peer.peer.removeEventListener("negotiationneeded", handleNegoNeeded);
    };
  }, [handleNegoNeeded]);

  useEffect(() => {
    peer.peer.addEventListener("track", async (ev) => {
      const remoteStream = ev.streams;
      setRemoteStream(remoteStream[0]);
    });
  }, []);

  useEffect(() => {
    socket.on("user:joined", handleUserJoined);
    socket.on("incoming:call", handleIncomingCall);
    socket.on("call:accepted", handleCallAccepted);
    socket.on("peer:nego:needed",handleNegoNeedIncoming);
    socket.on("peer:nego:final",handleNegoFinal);
    return () => {
      socket.off("user:joined", handleUserJoined);
      socket.off("incoming:call", handleIncomingCall);
      socket.off("call:accepted", handleCallAccepted);
      socket.off("peer:nego:needed",handleNegoNeedIncoming);
      socket.off("peer:nego:final",handleNegoFinal);
    };
  }, [socket, handleNegoNeedIncoming, handleIncomingCall, handleCallAccepted, handleUserJoined, handleNegoFinal]);

  return (
    <div>
      room page
      <h4>{remoteSocketId ? "Connected" : "No one in the room"}</h4>
      {myStream && <button onClick={sendStream}>Send Stream</button>}
      
      {remoteSocketId && <button onClick={handleCallUser}>Call</button>}
    
      {myStream && (
        <>
          <h1>My Stream</h1>
          <ReactPlayer
            playing
            muted
            height="300px"
            width="600px"
            url={myStream}
          />
        </>
      )}
      {remoteStream && (
        <>
          <h1>Remote Stream</h1>
          <ReactPlayer
            playing
            muted
            height="300px"
            width="600px"
            url={remoteStream}
          />
        </>
      )}
      <div className="bg-gray-100 min-h-screen flex flex-col md:flex-row   items-center justify-center">
    {/* First Part (Card) */}
    <div className="w-full   ">
      <Card className="md:h-[100vh]  bg-white p-4 md:p-8 rounded-lg flex flex-col justify-between mb-8">
        <div>
          <h1 className="text-xl md:text-3xl font-bold text-center mb-2 md:mb-4">
            Basics Quiz
          </h1>
          <p className="text-base md:text-lg text-gray-600 text-center mb-4 md:mb-8">
            Please select the correct answer for each question
          </p>
        </div>
        {index < data.length && (
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
              {data[index]?.option.map((option, optionIndex) => (
                <div key={optionIndex} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id={`option-${optionIndex}`}
                    name={`option-${index}`}
                    value={optionIndex}
                    checked={selectedOptionIndex === optionIndex}
                    onChange={(e)=>handleOptionChange(e,optionIndex)}
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
        )}
        <div className="flex justify-between px-4 mt-5 md:mt-8">
          <button className="px-4 md:px-6 py-2 md:py-3 bg-slate-400 text-white rounded-lg">
            Back
          </button>
          <button className="px-4 md:px-6 py-2 md:py-3 bg-slate-400 text-white rounded-lg disabled:opacity-50"

          >
            Next
          </button>
        </div>
      </Card>
    </div>
    
    <div className="w-full md:w-1/2  flex justify-center items-center ">
  <div className="grid grid-cols-4 rounded-md p-4 bg-gray-200 w-full">
    <div className="col-span-4">
      <div className="flex  justify-between item-center ">
        <KeyboardArrowLeftIcon style={{ fontSize: '50px' }} />
        <KeyboardArrowRightIcon style={{ fontSize: '50px' }} />
      </div>
    </div>
    {num.map((number, index) => (
      <div
        key={index}
        className={`text-center m-[0.5rem] h-10 w-10 flex justify-center items-center ${index === activeIndex ? 'border border-gray-400' : ''}`}

            style={{ borderRadius: '100%' }} 
        onClick={() => handleNumberClick(index)}
      >
        {number}
      </div>
    ))}
  </div>
</div>










  </div>
      
    </div>
  );
};

export default Room;