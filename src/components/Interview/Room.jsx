import { useCallback, useEffect, useState } from "react";
import { useSocket } from "../../context/SocketProvider";
import ReactPlayer from "react-player";
import peer from "../../service/peer";
const Room = () => {
  const socket = useSocket();
  const [remoteSocketId, setRemoteSocketId] = useState(null);
  const [myStream, setMyStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState();

  const handleUserJoined = useCallback(({ email, id }) => {
    console.log(`Email ${email} joined room `);
    setRemoteSocketId(id);
  }, []);

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
      // console.log(`Incoming offer`, from , offer)
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
      {/* to render our stream  */}
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
    </div>
  );
};

export default Room;
