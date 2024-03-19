import { Chip } from "@mui/material";
import BasicTable from "./BasicTable";
import Chart from "./Chart";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Result = () => {
  const navigate=useNavigate()
  const id = useSelector((state) => state.currentuser.id);
  const [topic, setTopic] = useState("");
  const [email, setEmail] = useState("");
  const [correct, setCorrect] = useState(null);
  const [item, setItem] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        let response = await axios.get(
          `http://localhost:2001/user/questions/get/${id}`
        );
        let correct = 0;
        for (let i = 0; i < response?.data?.data?.questions.length; i++) {
          if (response?.data?.data?.questions[i].is_correct === 1) {
            correct = correct + 1;
          }
        }
        setItem(response?.data?.data?.questions);
        setCorrect(correct);

        // console.log("response aa", response.data.data.questions);
        setTopic(response?.data?.data?.topic);
        setEmail(response?.data?.data?.email);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, [id]);

//   for pre data fetched by email id 
  useEffect(()=>{
    const getByEmail=async()=>{
      console.log("Email",email)
        try{

            const response=await axios.get('http://localhost:2001/user/questions/get',{
              params:{
                email:email,
              },
            });
            console.log("response ss",response)
        }
        catch(Err){
            console.log(Err)
        }
    }
    getByEmail()
  },[email])
  return (
    <div className="flex flex-col justify-center bg-gray-100  p-8">
      <div className="flex flex-col md:flex-row md:justify-between items-center gap-4 mb-8">
        <div className="flex flex-col">
          <p className="text-2xl font-bold mb-2">Test Results</p>
          <p className="text-gray-600 mb-2">Your Current Test Results</p>
        </div>
        <div className="flex justify-center md:justify-start">
          <button className="px-10 md:px-6 py-2 md:py-3 bg-black text-white rounded-lg" onClick={()=>navigate('/test')}>
            Take Exam
          </button>
        </div>
      </div>

      {/* Charts */}
      <div className="mb-8 tex-lg md:text-xl">
        <div className="flex  flex-col">
          <p className=" font-semibold mb-3">Current Topic : {topic}</p>
          <p className=" font-semibold mb-6">User Id : {email}</p>
          <div className="grid grid-cols-3 gap-4 mb-10 font-medium ">
            <p>Total Questions: {item.length}</p>
            <p>Correct Answers: {correct}</p>
            <p>Incorrect Answers: {item.length - correct}</p>
          </div>
        </div>
        <div>
          <Chart />
        </div>
      </div>

      {/* Questions */}
      <div className="mb-8  ">
        <div className="tex-lg md:text-xl">
          <p className="font-medium mb-3">All Questions and Correct Answers</p>
          {
            item?.map((e,i)=>{
                return(
          <div key={i} className="mb-5">

          <p >
            <span className="font-medium">Question {i+1} -</span> {e.question}{" "}
            <Chip
              label={e.is_correct ===0 ? "Incorrect" : "Correct"}
              style={{
                  backgroundColor:e.is_correct===0 ?  "rgb(217 199 187)" : "rgb(224 202 122)",
                  color: e.is_correct===0 ? "black" :"white",
                  fontWeight: "500",
                }}
                variant="outlined"
                />
          </p>
          <p className="text-justify tracking-wide ">
            <span className="font-medium">Answer {i+1}-</span> {e.correct}
          </p>
        </div>
        
    )
})
}
                </div>
        <div className=" text-xl font-medium mb-3 mt-10 flex">
          <p>Total Exams : </p>
          <p> 10</p>
        </div>
        <div className=" text-l md:text-xl font-medium mb-3 border rounded-lg shadow-lg p-4">
          <p className="mt-3">Previous Exam</p>
          <hr className="border-t-2 border-gray-500" />
          <p className="mt-3 mb-3">Java Programming :</p>

          <div className="grid grid-cols-3 gap-4 mb-3">
            <p>Total Questions: 10</p>
            <p>Correct Answers: 5</p>
            <p>Incorrect Answers: 5</p>
          </div>
        </div>
      </div>

      {/* Table */}
      <div>
        <BasicTable />
      </div>
    </div>
  );
};

export default Result;
