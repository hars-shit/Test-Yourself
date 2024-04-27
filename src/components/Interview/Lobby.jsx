import { useCallback, useEffect, useState } from "react";
import { useSocket } from "../../context/SocketProvider";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { clusterId } from "../../redux/clusterSlice";

const Lobby = () => {
  const params = useParams();
  const [email, setEmail] = useState("");
  const [room, setRoom] = useState("");
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedRoom, setCopiedRoom] = useState(false);
  const navigate = useNavigate();
  const socket = useSocket();
  const dispatch = useDispatch();

  useEffect(() => {
    const getById = async () => {
      try {
        const id = params.id;
        console.log("id", id);
        let response = await axios.get(`http://localhost:2001/collab/${id}`);
        dispatch(clusterId(id));
        setRoom(response.data.room_id);
        setEmail(response.data.colllaborator_id);
      } catch (err) {
        console.log("Error while getting data by id", err);
      }
    };
    getById();
  }, [dispatch, params.id]);

  const handleSubmitForm = useCallback(
    (e) => {
      e.preventDefault();
      socket.emit("room:join", { email, room });
    },
    [email, room, socket]
  );

  const handleJoinRoom = useCallback(
    (data) => {
      const { room } = data;
      navigate(`/room/${room}`);
    },
    [navigate]
  );

  useEffect(() => {
    socket.on("room:join", handleJoinRoom);
    return () => {
      socket.off("room:join", handleJoinRoom);
    };
  }, [socket, handleJoinRoom]);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(true);
    setTimeout(() => {
      setCopiedEmail(false);
    }, 2000);
  };

  const handleCopyRoom = () => {
    navigator.clipboard.writeText(room);
    setCopiedRoom(true);
    setTimeout(() => {
      setCopiedRoom(false);
    }, 2000);
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="max-w-lg w-full mx-4 p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6">Lobby</h1>

        <div className="mb-6">
          <div className="  flex items-center mb-4">
            <label className="mr-8 text-sm font-medium text-gray-600">
              Email ID
            </label>
            <div className="flex items-center border rounded-md w-full">
              <input
                type="email"
                id="email"
                className="w-full p-2 focus:outline-none rounded-l-md"
                placeholder="Enter Email ID"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                className="bg-[#2c3e50] text-white p-2 rounded-r-md  focus:outline-none"
                onClick={handleCopyEmail}
              >
                {copiedEmail ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>

          <div className="flex items-center">
            <label
             
              className=" text-sm font-medium text-gray-600"
            >
              Room Number
            </label>
            <div className="flex items-center border rounded-md w-full">
              <input
                type="text"
                id="room"
                className="w-full p-2 focus:outline-none rounded-l-md"
                placeholder="Enter Room Number"
                value={room}
                onChange={(e) => setRoom(e.target.value)}
              />
              <button
                className="bg-[#2c3e50] text-white p-2 rounded-r-md focus:outline-none"
                onClick={handleCopyRoom}
              >
                {copiedRoom ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>
        </div>

        <hr className="my-6 bg-black" />
        <h2 className="mb-4 text-lg font-semibold text-gray-600">
          Please copy the above details and paste it below
        </h2>
        <form onSubmit={handleSubmitForm}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Email
            </label>
            <input
              type="text"
              id="email"
              className="w-full p-2 focus:outline-none border rounded-md"
              placeholder="Enter Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label
              
              className="block text-sm font-medium text-gray-600 mb-2"
            >
              Room Number
            </label>
            <input
              type="text"
              id="room"
              className="w-full p-2 focus:outline-none border rounded-md"
              placeholder="Enter Room Number"
              onChange={(e) => setRoom(e.target.value)}
            />
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-[#8e44ad] text-white px-6 py-2 rounded-md hover:bg-green-600 focus:outline-none w-1/2"
            >
              Join
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Lobby;