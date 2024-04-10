import { useSelector } from "react-redux";

const TypeResult = () => {
    const data = useSelector((state) => state.promptSlice);
    console.log("Data sss",data)
  return (
    <div>
      
    </div>
  )
}

export default TypeResult
