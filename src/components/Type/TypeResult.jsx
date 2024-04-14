import { useSelector } from "react-redux";
import axios from "axios";
import { useEffect, useState } from "react";
import BasicTable from "../Test/BasicTable";
import { useNavigate } from "react-router-dom";

const TypeResult = () => {
    const data = useSelector((state) => state.promptSlice.prompts);
    const id = useSelector((state) => state.paperSlice.currentuser.id)
    // console.log("Dada",data)
    const [arr,setArr]=useState([])
    const [email,setEmail]=useState("")

    // data.map((d)=>console.log("this element is",d))

    const putData = async () => {
      try {
          let response = await axios.put(`http://localhost:2001/user/type/${id}`, {
            questions: data  // Sending the whole questions array directly
          });
          console.log("sas",response.data.email);
          setEmail(response?.data?.email)
          setArr(response.data)
      } catch (err) {
          console.log("Error in typed answer", err);
      }
    };

    useEffect(()=>{
      putData()
    },[])

    // console.log("Data sss",data)
    const navigate = useNavigate()
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

      {/* Charts */}
      <div className="mb-8 tex-lg md:text-xl">
        {/* <div className="flex  flex-col">
          <p className=" font-semibold mb-3">Current Topic : {topic}</p>
          <p className=" font-semibold mb-6">User Id : {email}</p>
          <div className="grid grid-cols-3 gap-4 mb-10 font-medium ">
            <p>Total Questions: {item?.length}</p>
            <p>Correct Answers: {correct}</p>
            <p>Incorrect Answers: {item?.length - correct}</p>
          </div>
        </div> */}
        <div className="grid md:grid-cols-4 gap-4 mb-10">
      {/* Card 1 */}

      <div className="bg-white shadow-md p-6 md:max-w-[300px] flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-center bg-blue-400 rounded-full w-12 h-12 mb-4">
            {/* <PersonIcon className="text-white" /> */}
          </div>
          {/* <p className="text-lg font-semibold">{email}</p> */}
          <div className="flex justify-between text-sm">
            <p>Total Topics</p>
            <p>10</p>
          </div>
        </div>
      </div>
      {/* Card 2 */}
      {/* <div className="bg-white shadow-md p-6 md:max-w-[300px] flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-center bg-red-400 rounded-full w-12 h-12 mb-4">
            <QuizIcon className="text-white" />
          </div>
          <p className="text-lg font-semibold">{topic}</p>
          <div className="flex justify-between text-sm">
            <p>Total Questions:</p>
            <p>10</p>
          </div>
        </div>
      </div> */}

      {/* Card 3 */}
      {/* <div className="bg-white shadow-md p-6 md:max-w-[300px] flex flex-col justify-between">
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
      </div> */}

      {/* Card 4 */}
      {/* <div className="bg-white shadow-md p-6 md:max-w-[300px] flex flex-col justify-between">
        <div>
          <div className="flex justify-between">
            <p className="text-lg font-semibold mb-2">Previous Topic</p>
            <div className="flex items-center justify-center bg-purple-400 rounded-full w-12 h-12">
              <VisibilityIcon className="text-white" />
            </div>
          </div>
          <div>
            <p className="text-lg mb-3">{pre_topic}</p>
            <div className="flex justify-between text-sm">
              <p>Correct Answers:</p>
              <p>{pre_correct}</p>
            </div>
          </div>
        </div>
      </div> */}
    </div>
       

      </div>

      {/* Questions */}

      {/* <div className="mb-8  ">
        <div className="tex-lg md:text-xl">
          <p className="font-medium mb-3">All Questions and Correct Answers</p>
          {
            item?.map((e, i) => {
              return (
                <div key={i} className="mb-5">

                  <p >
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
                  <p className="text-justify tracking-wide ">
                    <span className="font-medium">Answer {i + 1}-</span> {e.correct}
                  </p>
                </div>

              )
            })
          }
        </div>
      </div> */}

      {/* Table */}
      <div>
        {/* <BasicTable pre_data={pre_data}/> */}
      </div>
    </div>
  )
}

export default TypeResult
