import { Chip } from "@mui/material";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
import QuizIcon from '@mui/icons-material/Quiz';
import PersonIcon from '@mui/icons-material/Person';
import AdsClickIcon from '@mui/icons-material/AdsClick';
import VisibilityIcon from '@mui/icons-material/Visibility';
// import BasicTable from "../Test/BasicTable";
// // import ChartBar from "./ChartBar";
// // import Chart2 from "./Chart2";

import axios from "axios"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"





const CollabResult = () => {
  const paramsId=useParams().id
  const user = useSelector((state) => state.loggedSlice.currentUser);
  const [email, setEmail] = useState(user.email);
  const [correct, setCorrect] = useState(null);
  const [data_result,setData_result]=useState([]);
  // console.log("params id",paramsId)
  useEffect(()=>{
  const  getData=async()=>{
      try{
        let resp=await axios.get(`http://localhost:2001/collab/${paramsId}`)
        // console.log("res",resp?.data);
        if(resp?.data?.colllaborator_id==email){
          setData_result(resp?.data?.colllaborator_questions)
        }
        else{
          setData_result(resp?.data?.host_questions)
        }
        // console.log('Res',resp.data.colllaborator_id==email ? "true" : "false"
        // )
        let correct=0;
        for(let i=0; i<resp?.data?.question.length; i++){
          if(resp?.data?.question[i].is_correct===1){
            correct=correct+1
          }
        }
        setCorrect(correct)
      }
      catch(err){
        console.log("Error while fetching collab result",err);
      }
    }
    getData()
  },[ email, paramsId])
  console.log("res",data_result)
  return (
    <div className="flex flex-col justify-center bg-gray-100  p-8">
      <div className="flex flex-col md:flex-row md:justify-between items-center gap-4 mb-8">
        <div className="flex flex-col">
          <p className="text-2xl font-bold mb-2">Test Results</p>
          <p className="text-gray-600 mb-2">Your Current Test Results</p>
        </div>
        <div className="flex justify-center md:justify-start">
          <button className="px-10 md:px-6 py-2 md:py-3 bg-black text-white rounded-lg" onClick={() => navigate('/test')}>
            Take Exam
          </button>
        </div>
      </div>
      <div className="grid md:grid-cols-4 gap-4 mb-10">

      {/* card 1 */}
      
      <div className="bg-white shadow-md p-6 md:max-w-[300px] flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-center bg-blue-400 rounded-full w-12 h-12 mb-4">
            <PersonIcon className="text-white" />
          </div>
          <p className="text-lg font-semibold">{email}</p>
          <div className="flex justify-between text-sm">
            <p>Total Topics</p>
            <p>10</p>
          </div>
        </div>
      </div>

          {/* Card 2 */}
          <div className="bg-white shadow-md p-6 md:max-w-[300px] flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-center bg-red-400 rounded-full w-12 h-12 mb-4">
            <QuizIcon className="text-white" />
          </div>
          <p className="text-lg font-semibold">Topic</p>
          <div className="flex justify-between text-sm">
            <p>Total Questions:</p>
            <p>10</p>
          </div>
        </div>
      </div>
        {/* Card 3 */}
        <div className="bg-white shadow-md p-6 md:max-w-[300px] flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-center bg-green-400 rounded-full w-12 h-12 mb-4">
            <AdsClickIcon className="text-white" />
          </div>
          <p className="text-lg font-semibold">Current Topic</p>
          <div className="flex justify-between text-sm text-gray-500">
            <p>Correct Answers</p>
            <p>{correct}</p>
          </div>
        </div>
      </div>

        {/* Card 4 */}
        <div className="bg-white shadow-md p-6 md:max-w-[300px] flex flex-col justify-between">
        <div>
          <div className="flex justify-between">
            <p className="text-lg font-semibold mb-2">Previous Topic</p>
            <div className="flex items-center justify-center bg-purple-400 rounded-full w-12 h-12">
              <VisibilityIcon className="text-white" />
            </div>
          </div>
          <div>
            <p className="text-lg mb-3">Java</p>
            <div className="flex justify-between text-sm">
              <p>Correct Answers:</p>
              <p>4</p>
            </div>
          </div>
        </div>
      </div>
      </div>
<div>
  <div>
  <p className="font-medium mb-3">All Questions and Correct Answers</p>
  {
    data_result?.map((e,i)=>{
      return(
     <div key={i} className="mb-5">
     
      <p>
      <span className="font-medium">Question {i + 1} -</span> {e.question}{" "}

      <Chip
                      label={e.is_correct === 0 ? "Incorrect" : "Correct"}
                      style={{
                        backgroundColor: e.is_correct === 0 ? "rgb(217 199 187)" : "rgb(224 202 122)",
                        color: e.is_correct === 0 ? "black" : "white",
                        fontWeight: "500",
                      }}
                      variant="outlined"
                    />
      </p>
     </div>

     ) })
  }
  </div>
</div>


    </div>
  )
}

export default CollabResult
