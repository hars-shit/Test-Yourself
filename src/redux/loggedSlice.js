import { createSlice } from "@reduxjs/toolkit"

const initialState={
    currentUser:null
}

const loggedSlice=createSlice({
    name:"log",
    initialState,
    reducers:{
        log:(state,action)=>{
            state.currentUser=action.payload;
        }
    }
})

export const {log}=loggedSlice.actions;

export default loggedSlice.reducer;