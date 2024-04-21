import { Route, Routes } from "react-router-dom"
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

const App = () => {
  return (
    <>
    <Routes>

      {/* for mcq test  */}
      <Route path="/" element={<Login />}/>
      <Route path="/register" element={<Signup />}/>
    <Route path="/profile" element={<Profile />}/>
    <Route path="/home" element={<Home />}/>
    
      {/* for interview  */}
      <Route path="/data" element={<Data />}/>

      <Route path="/lobby/:id" element={<Lobby/>}/>
      <Route path="/room/:roomId" element={<Room/>}/>
      <Route path="/friend" element={<Friend />}/>
      <Route path="/room/exam" element={<Collab />}/>
      <Route path="/room/exam/collab/:id" element={<CollabPaper />} />

      {/* for notification  */}

      <Route path="/notification" element={<Notification />}/>

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
    </Routes>
    </>
  )
}

export default App
