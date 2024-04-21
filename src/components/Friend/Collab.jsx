import React from 'react'
import Room from '../Interview/Room'
import { useSelector } from 'react-redux';

const Collab = () => {
  const data = useSelector((state) => state.paperSlice);
  // const id= useSelector((state) => state.paperSlice.currentuser.id);
  console.log("data rr",data)
  return (
    <div>
     <Room />
    </div>
  )
}

export default Collab
