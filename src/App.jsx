import { Route, Routes } from "react-router-dom"
import Test from "./pages/Test"
import Lobby from "./components/Interview/Lobby"
import Room from "./components/Interview/Room"
import Paper from "./components/Test/Paper"

const App = () => {
  return (
    <>
    <Routes>
      <Route path="/" element={<Lobby/>}/>
      <Route path="/room/:roomId" element={<Room/>}/>
      <Route path="/test" element={<Test />}/>
      <Route path="/paper" element={<Paper/>}/>
    </Routes>
    </>
  )
}

export default App
