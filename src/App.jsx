import { Route, Routes,  useNavigate } from "react-router-dom"
import Test from "./pages/Test"
import Lobby from "./components/Interview/Lobby"
import Room from "./components/Interview/Room"
import Paper from "./components/Test/Paper"
import Result from "./components/Test/Result"
import NewPaper from "./components/Type/NewPaper"
import Prompt from "./components/Type/Prompt"
import TypeResult from "./components/Type/TypeResult"
import Login from "./pages/User/Login"
import Signup from "./pages/User/Signup"
import Profile from "./pages/User/Profile"
import Home from "./pages/Home"
import Friend from "./components/Friend/Friend"
import Subscription from "./pages/Subscription/Subscription"
import Collab from "./components/Friend/Collab"
import Notification from "./components/Notification/Notification"
import CollabPaper from "./components/Notification/CollabPaper"
import Data from "./components/Friend/Data"
import Ranking from "./components/Ranking/Ranking"
import { useSelector } from "react-redux"
import { useEffect } from "react"
import Exam from "./components/Exam/Exam"
import CollabResult from "./components/Interview/CollabResult"


const App = () => {
  const navigate=useNavigate()
  const user=useSelector((state)=>state.loggedSlice.currentUser);
  useEffect(()=>{

    if(!user){
      navigate('/')
    }
  },[navigate, user])
  console.log("user ",user);
  // localStorage.clear()
  return (
    <>
    <Routes>

      {/* for mcq test  */}
      <Route path="/" element={user ? <Home /> : <Login />}/>
    <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Signup />}/>
    <Route path="/profile" element={<Profile />}/>
    
      {/* for interview  */}
      <Route path="/notification" element={<Data />}/>

      <Route path="/lobby/:id" element={<Lobby/>}/>
      <Route path="/room/:roomId" element={<Room/>}/>
      <Route path="/friend" element={<Friend />}/>
      <Route path="/room/exam" element={<Collab />}/>
      <Route path="/room/exam/collab/:id" element={<CollabPaper />} />

      <Route path="/collab/result/:id" element={<CollabResult />}/>

      {/* for notification  */}

      {/* <Route path="/notification" element={<Notification />}/> */}

      {/* subscription  */}
      <Route path="/pay" element={<Subscription />}/>

      <Route path="/test" element={<Test />}/>
      <Route path="/paper" element={<Paper/>}/>
      <Route path="/res" element={<Result/>}/>
      <Route path="/newPaper" element={<NewPaper />}/>
      <Route path="/prompt" element={<Prompt />}/>
      <Route path="/result" element={<TypeResult />} />

      {/* ranking  */}

      <Route path="/rank" element={<Ranking />}/>

      {/* full exam paper  */}

      <Route  path="/exam" element={<Exam />}/>
    </Routes>
    </>
  )
}

export default App
