import { useCallback, useEffect, useState } from "react";
import { useSocket } from "../../context/SocketProvider";
import ReactPlayer from "react-player";
import peer from "../../service/peer";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Room = () => {
  
 

  // const handleNumberClick = (index) => {
  //   setActiveIndex(index);
  // };
  const socket = useSocket();
  const [remoteSocketId, setRemoteSocketId] = useState(null);
  const [myStream, setMyStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState();
  const id = useSelector((state) => state.clusterSlice.currentId);
  const [data, setData] = useState([]);
  const user = useSelector((state) => state.loggedSlice.currentUser);
  const [email, setEmail] = useState(user.email);
  console.log("uda of",id)
  const [index, setIndex] = useState(0);
  const [timerDuration, setTimerDuration] = useState(50);
  const [optionIndex, SetOptionIndex] = useState(null);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
  const navigate = useNavigate();
  const [collaboratorEmail, setCollaboratorEmail] = useState();
 

  const handleUserJoined = useCallback(({ email, id }) => {
    setRemoteSocketId(id);
  }, []);

  useEffect(() => {
    const getData = async () => {
      try {
        let response = await axios.get(`http://localhost:2001/collab/${id}`);

        setData(
          response.data.colllaborator_id == email
            ? response.data.colllaborator_questions
            : response.data.host_questions
        );
        setCollaboratorEmail(response.data.colllaborator_id);
      } catch (err) {
        console.log("Error While getting", err);
      }
    };
    getData();
  }, [email, id]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimerDuration((prevDuration) => {
        if (prevDuration === 1) {
          if (index === data.length - 1) {
            navigate(`/collab/result/${id}`);
          }
          setIndex((prevIndex) => prevIndex + 1);

          const setData = async () => {
            try {
              let currentQuestion = data[index].question;
              // console.log("Current Question:", currentQuestion);

              let correct = data[index].option[data[index].correct];
              // console.log("Selected Option:", correct);

              // 1 represent true and 0 false
              console.log("An", data[index].correct, optionIndex);
              let is_correct = data[index].correct == optionIndex ? 1 : 0;
              // console.log("is correct",is_correct)
              // console.log("dss",email , collaboratorEmail)

              const response =
                email == collaboratorEmail
                  ? await axios.put(
                      `http://localhost:2001/collab/question/${id}`,
                      {
                        questionIndex: index,
                        question: currentQuestion,
                        correct: correct,
                        is_correct: is_correct,
                      }
                    )
                  : await axios.put(
                      `http://localhost:2001/host/question/${id}`,
                      {
                        questionIndex: index,
                        question: currentQuestion,
                        correct: correct,
                        is_correct: is_correct,
                      }
                    );
              console.log("response ghjk", response);
            } catch (err) {
              console.log(err);
            }
          };

          setSelectedOptionIndex(null);
          setData();
          return 50;
        } else {
          return prevDuration - 1;
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [
    collaboratorEmail,
    data,
    email,
    id,
    index,
    navigate,
    optionIndex,
    selectedOptionIndex,
  ]);

  const handleOptionChange = (e, optionIndex) => {
    setSelectedOptionIndex(parseInt(e.target.value));
    console.log("Selected option:", optionIndex);
    SetOptionIndex(optionIndex);
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

  const sendStream = useCallback(() => {
    for (const track of myStream.getTracks()) {
      peer.peer.addTrack(track, myStream);
    }
  }, [myStream]);

  const handleCallAccepted = useCallback(
    ({ from, ans }) => {
      peer.setLocalDescription(ans);
      sendStream();
    },
    [sendStream]
  );

  const handleNegoNeeded = useCallback(async () => {
    const offer = await peer.getOffer();
    socket.emit("peer:nego:needed", { offer, to: remoteSocketId });
  }, [remoteSocketId, socket]);

  const handleNegoNeedIncoming = useCallback(
    async ({ from, offer }) => {
      const ans = await peer.getAnswer(offer);
      socket.emit("peer:nego:done", { to: from, ans });
    },
    [socket]
  );

  const handleNegoFinal = useCallback(async ({ ans }) => {
    await peer.setLocalDescription(ans);
  }, []);

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
    socket.on("peer:nego:needed", handleNegoNeedIncoming);
    socket.on("peer:nego:final", handleNegoFinal);
    return () => {
      socket.off("user:joined", handleUserJoined);
      socket.off("incoming:call", handleIncomingCall);
      socket.off("call:accepted", handleCallAccepted);
      socket.off("peer:nego:needed", handleNegoNeedIncoming);
      socket.off("peer:nego:final", handleNegoFinal);
    };
  }, [
    socket,
    handleNegoNeedIncoming,
    handleIncomingCall,
    handleCallAccepted,
    handleUserJoined,
    handleNegoFinal,
  ]);

  return (
   
    <div className="flex flex-col lg:flex-row lg:space-x-8 max-w-8xl mx-auto p-8">
      <div className="flex-1 space-y-6 mb-6">
        <div className="space-y-2">
          <h2 className="text-4xl font-bold">AutoProb</h2>
          <p className="text-lg">
            Please select the correct answer for each question
          </p>
        </div>
        <div className="bg-red-100 p-4 rounded-md flex justify-between items-center">
          <span className="text-red-800">Time remaining: {timerDuration} seconds</span>
          <span className="text-red-800"> Do not open other tabs</span>
        </div>
        <div className="bg-white shadow rounded-md p-6">
          <div className="flex flex-col justify-center items-center  p-6">
            {index < data.length && (
              <div className="mb-6 w-full">
                <p className="text-xl md:text-2xl font-medium text-gray-800 mb-4">
                  Q{index + 1}: {data[index]?.question}
                </p>
                <form className="space-y-4 w-full">
                  {data[index]?.option.map((option, optionIndex) => (
                    <div key={optionIndex} className="flex items-center space-x-2 ">
                      <input
                        type="radio"
                        id={`option-${optionIndex}`}
                        name={`option-${index}`}
                        value={optionIndex}
                        checked={selectedOptionIndex === optionIndex}
                        onChange={(e) => handleOptionChange(e, optionIndex)}
                      />
                      <label
                        for={`option-${optionIndex}`}
                        className="text-sm md:text-lg"
                      >
                        {option}
                      </label>
                    </div>
                  ))}
                </form>
              </div>
            )}
          </div>
        </div>
        {/* <div className="flex justify-between">
          <button className="bg-green-500 text-white px-6 py-3 rounded-lg">
            Back
          </button>
          <button className="bg-purple-500 text-white px-6 py-3 rounded-lg">
            Next
          </button>
        </div> */}
      </div>
      <div className="flex-1 space-y-4 border border-gray-200">
        <div className=" rounded-md p-4 ">
          <h1 className="text-2xl font-bold ml-4 flex items-center  ">My Stream</h1>
          <div className="flex  justify-between items-center mb-4">
            <div className="flex gap-3 mt-auto mb-2 ">
              <button className="px-3 ">
                {remoteSocketId ? (
                  <button className="bg-green-300 rounded-2xl md:px-5 md:py-2 text-sm ">
                    Connected
                  </button>
                ) : (
                  "No one in the room"
                )}
              </button>
              {myStream && (
                 <span>
                <button
                  onClick={sendStream}
                  className="bg-[#8e44ad] rounded-2xl px-4  md:px-5  text-sm"
                >
                 Send Stream
                </button>
                 </span> 
              )}
              {remoteSocketId && (
                <button
                  onClick={handleCallUser}
                  className="bg-blue-400 px-4 py-1 md:px-5  rounded-2xl text-sm"
                >
                  Call
                </button>
              )}
            </div>
            <div className="flex flex-col">
              {myStream && (
                <div>
                  <ReactPlayer
                    playing
                    muted
                    height="250px"
                    width="450px"
                    url={myStream}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
        <div className=" rounded-md p-5">
          {/* <h2 className="text-xl font-semibold mb-4">Remote Stream</h2> */}
          <div className="flex  ">
            {remoteStream && (
              <>
                
                <ReactPlayer
                  playing
                 muted
                  height="250px"
                  width="450px"
                  
                  url={remoteStream}
                />
                <h1 className="text-2xl font-bold ml-4 flex items-center">Remote Stream</h1>
              </>
            )}
          </div>
        </div>
      
      </div>
      
      
     
    </div>
  );
};

export default Room;
