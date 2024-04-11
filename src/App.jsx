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

      <Route path="/lobby" element={<Lobby/>}/>
      <Route path="/room/:roomId" element={<Room/>}/>

      <Route path="/test" element={<Test />}/>
      <Route path="/paper" element={<Paper/>}/>
      <Route path="/res" element={<Result/>}/>
      <Route path="/newPaper" element={<NewPaper />}/>
      <Route path="/prompt" element={<Prompt />}/>
      <Route path="/result" element={<TypeResult />} />
    </Routes>
    </>
  )
}

export default App
