import axios from "axios";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const TypeResult = () => {
    const data = useSelector((state) => state.promptSlice);

    const getResponse=async()=>{
      try{
        let message=
        `${data} is a  JSON file containing data from student quizzes. Each object in the file represents a question, with fields for the question itself, the correct answer, and the user's answer.
        
        Your task is to evaluate each question and assign marksout of 10 based on the correctness of the user's answer. Update the 'marks' field in each object accordingly.
        
        and share the JSON file only so that i can map the updated JSON file.
        `
        const options = {
          headers: {
            "Content-Type": "application/json",
          },
        };
        const response=await axios.post("http://localhost:8000/chat",{message},options)
        console.log("resonse ",response)
      }

      catch(err){
        console.log("Something went wrong",err)
      }
    }

    useEffect(()=>{
      getResponse()
    },[])

    console.log("Data sss",data)
  return (
    <div>
      
    </div>
  )
}

export default TypeResult
