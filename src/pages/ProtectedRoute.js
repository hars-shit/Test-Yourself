import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";


const ProtectedRoute = ({children}) => {
  const user=useSelector((state)=>state.loggedSlice.currentUser);
  if(!user){
    return (<Navigate to="/login" replace={true}/>)
  }
  return children;
}

export default ProtectedRoute
