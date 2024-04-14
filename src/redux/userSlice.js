import { createSlice } from "@reduxjs/toolkit"

const initialState={
    currentUser:null
}

const userSlice=createSlice({
    name:"user",
    initialState,
    reducers:{
        user:(state,action)=>{
            state.currentUser=action.payload;
        }
    }
})

export const {user}=userSlice.actions;

export default userSlice.reducer;
