import {createSlice} from "@reduxjs/toolkit";

const initialState={
    currentuser:null
}
const paperSlice=createSlice({
    name:"paper",
    initialState,
    reducers:{
        addPaper:(state,action)=>{
            state.currentuser=action.payload;
        }
    }
})

export const {addPaper}=paperSlice.actions;

export default paperSlice.reducer;
