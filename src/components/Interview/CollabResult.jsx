// import { Chip } from "@mui/material";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import QuizIcon from '@mui/icons-material/Quiz';
// import PersonIcon from '@mui/icons-material/Person';
// import AdsClickIcon from '@mui/icons-material/AdsClick';
// import VisibilityIcon from '@mui/icons-material/Visibility';
// import BasicTable from "../Test/BasicTable";
// // import ChartBar from "./ChartBar";
// // import Chart2 from "./Chart2";

import axios from "axios"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"



// const CollabResult= () => {
//   const user=useSelector((state)=>state.loggedSlice.currentUser);
//   const navigate = useNavigate()
//   const [topic, setTopic] = useState("");
//   const [email, setEmail] = useState("");
//   const [correct, setCorrect] = useState(null);
//   const [item, setItem] = useState([]);
//   const [pre_topic,setPre_topic]=useState("")
//   const [pre_data,setPre_data]=useState([])
//   const [pre_length,setPre_length]=useState(null)
//   const[pre_correct,setPre_correct]=useState(null)




//   //   for pre data fetched by email id 
//   useEffect(() => {
//     const getByEmail = async () => {
//       try {
//         const response = await axios.get(`http://localhost:2001/user/questions/get/${user.email}`
//         );
//         console.log("new response is the", response)
//         setPre_topic(response.data[response.data.length-2].topic)
//         setPre_data(response?.data)
//         setPre_length(response.data[response.data.length-2].questions.length)
//         let pre=response?.data[response.data.length-2].questions;
//         let correct=0;
//         for(let i=0;i<pre.length;i++){
//           if( response.data[response.data.length-2].questions[i].is_correct===1){
//           correct =correct + 1;
//           }
//         }
//         // console.log("corr",correct)
//         setPre_correct(correct)

//         // setPre_data(response.data[response.data.length-2])
//       }
//       catch (Err) {
//         console.log(Err)
//       }
//     }
//     getByEmail()
//   }, [email])

//   return (
//     <div className="flex flex-col justify-center bg-gray-100  p-8">
//       <div className="flex flex-col md:flex-row md:justify-between items-center gap-4 mb-8">
//         <div className="flex flex-col">
//           <p className="text-2xl font-bold mb-2">Test Results</p>
//           <p className="text-gray-600 mb-2">Your Current Test Results</p>
//         </div>
//         <div className="flex justify-center md:justify-start">
//           <button className="px-10 md:px-6 py-2 md:py-3 bg-black text-white rounded-lg" onClick={() => navigate('/test')}>
//             Take Exam
//           </button>
//         </div>
//       </div>

//       {/* Charts */}
//       <div className="mb-8 tex-lg md:text-xl">
//         {/* <div className="flex  flex-col">
//           <p className=" font-semibold mb-3">Current Topic : {topic}</p>
//           <p className=" font-semibold mb-6">User Id : {email}</p>
//           <div className="grid grid-cols-3 gap-4 mb-10 font-medium ">
//             <p>Total Questions: {item?.length}</p>
//             <p>Correct Answers: {correct}</p>
//             <p>Incorrect Answers: {item?.length - correct}</p>
//           </div>
//         </div> */}
//         <div className="grid md:grid-cols-4 gap-4 mb-10">
//       {/* Card 1 */}

//       <div className="bg-white shadow-md p-6 md:max-w-[300px] flex flex-col justify-between">
//         <div>
//           <div className="flex items-center justify-center bg-blue-400 rounded-full w-12 h-12 mb-4">
//             <PersonIcon className="text-white" />
//           </div>
//           <p className="text-lg font-semibold">{email}</p>
//           <div className="flex justify-between text-sm">
//             <p>Total Topics</p>
//             <p>10</p>
//           </div>
//         </div>
//       </div>
//       {/* Card 2 */}
//       <div className="bg-white shadow-md p-6 md:max-w-[300px] flex flex-col justify-between">
//         <div>
//           <div className="flex items-center justify-center bg-red-400 rounded-full w-12 h-12 mb-4">
//             <QuizIcon className="text-white" />
//           </div>
//           <p className="text-lg font-semibold">{topic}</p>
//           <div className="flex justify-between text-sm">
//             <p>Total Questions:</p>
//             <p>10</p>
//           </div>
//         </div>
//       </div>

//       {/* Card 3 */}
//       <div className="bg-white shadow-md p-6 md:max-w-[300px] flex flex-col justify-between">
//         <div>
//           <div className="flex items-center justify-center bg-green-400 rounded-full w-12 h-12 mb-4">
//             <AdsClickIcon className="text-white" />
//           </div>
//           <p className="text-lg font-semibold">Current Topic</p>
//           <div className="flex justify-between text-sm text-gray-500">
//             <p>Correct Answers</p>
//             <p>{correct}</p>
//           </div>
//         </div>
//       </div>

//       {/* Card 4 */}
//       <div className="bg-white shadow-md p-6 md:max-w-[300px] flex flex-col justify-between">
//         <div>
//           <div className="flex justify-between">
//             <p className="text-lg font-semibold mb-2">Previous Topic</p>
//             <div className="flex items-center justify-center bg-purple-400 rounded-full w-12 h-12">
//               <VisibilityIcon className="text-white" />
//             </div>
//           </div>
//           <div>
//             <p className="text-lg mb-3">{pre_topic}</p>
//             <div className="flex justify-between text-sm">
//               <p>Correct Answers:</p>
//               <p>{pre_correct}</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
       

//       </div>

//       {/* Questions */}
//       <div className="mb-8  ">
//         <div className="tex-lg md:text-xl">
//           <p className="font-medium mb-3">All Questions and Correct Answers</p>
//           {
//             item?.map((e, i) => {
//               return (
//                 <div key={i} className="mb-5">

//                   <p >
//                     <span className="font-medium">Question {i + 1} -</span> {e.question}{" "}
//                     <Chip
//                       label={e.is_correct === 0 ? "Incorrect" : "Correct"}
//                       style={{
//                         backgroundColor: e.is_correct === 0 ? "rgb(217 199 187)" : "rgb(224 202 122)",
//                         color: e.is_correct === 0 ? "black" : "white",
//                         fontWeight: "500",
//                       }}
//                       variant="outlined"
//                     />
//                   </p>
//                   <p className="text-justify tracking-wide ">
//                     <span className="font-medium">Answer {i + 1}-</span> {e.correct}
//                   </p>
//                 </div>

//               )
//             })
//           }
//         </div>
//       </div>

//       {/* Table */}
//       <div>
//         <BasicTable pre_data={pre_data}/>
//       </div>
//     </div>
//   );
// };

// export default CollabResult;


const CollabResult = () => {
  const paramsId=useParams().id
  const user = useSelector((state) => state.loggedSlice.currentUser);
  const [email, setEmail] = useState(user.email);
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
      }
      catch(err){
        console.log("Error while fetching collab result",err);
      }
    }
    getData()
  },[ email, paramsId])
  console.log("res",data_result)
  return (
    <div>
      
    </div>
  )
}

export default CollabResult
