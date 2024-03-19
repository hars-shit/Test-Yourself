import { createSlice } from "@reduxjs/toolkit";

const initialState={
    currentid:null
}
const idSlice=createSlice({
    name:"id",
    initialState,
    reducers:{
        id:(state,action)=>{
            state.currentid=action.payload;
        }
    }

})

export const {id}=idSlice.actions;

export default idSlice.reducer;