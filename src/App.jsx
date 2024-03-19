import { Route, Routes } from "react-router-dom"
import Test from "./pages/Test"
import Lobby from "./components/Interview/Lobby"
import Room from "./components/Interview/Room"
import Paper from "./components/Test/Paper"
import Result from "./components/Test/Result"

const App = () => {
  return (
    <>
    <Routes>
      {/* for interview  */}
      <Route path="/" element={<Lobby/>}/>
      <Route path="/room/:roomId" element={<Room/>}/>

      {/* for mcq test  */}
      <Route path="/test" element={<Test />}/>
      <Route path="/paper" element={<Paper/>}/>
      <Route path="/res" element={<Result/>}/>
    </Routes>
    </>
  )
}

export default App
