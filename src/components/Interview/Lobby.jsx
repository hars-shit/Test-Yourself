import { useCallback, useEffect, useState } from "react";
import { useSocket } from "../../context/SocketProvider";
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
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
  const dispatch=useDispatch()

  useEffect(() => {
    const getById = async () => {
      try {
        const id = params.id;
        console.log("id", id)
        let response = await axios.get(`http://localhost:2001/collab/${id}`);
        dispatch(clusterId(id));
        setRoom(response.data.room_id);
        setEmail(response.data.colllaborator_id);
        
      } catch (err) {
        console.log('Error while getting data by id', err);
      }   
    };
    getById();
  }, [dispatch, params.id]);

  const handleSubmitForm = useCallback((e) => {
    e.preventDefault();
    socket.emit('room:join', { email, room });
  }, [email, room, socket]);

  const handleJoinRoom = useCallback((data) => {
    const { room } = data;
    navigate(`/room/${room}`);
  }, [navigate]);

  useEffect(() => {
    socket.on('room:join', handleJoinRoom);
    return () => {
      socket.off('room:join', handleJoinRoom);
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
    <div>
      <h1>Lobby</h1>
      <div>
        <p>Email ID: {email}</p>
        <button onClick={handleCopyEmail}>
          {copiedEmail ? "Copied!" : "Copy Email"}
        </button>
        <p>Room Number: {room}</p>
        <button onClick={handleCopyRoom}>
          {copiedRoom ? "Copied!" : "Copy Room"}
        </button>
      </div>
      <form onSubmit={handleSubmitForm}>
        <label htmlFor="email">Email ID</label>
        <input
          type="email"
          id="email"
          
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <label htmlFor="room">Room Number</label>
        <input
          type="text"
          id="room"
          
          onChange={(e) => setRoom(e.target.value)}
        />
        <br />
        <button type="submit">Join</button>
      </form>
    </div>
  );
}

export default Lobby;
