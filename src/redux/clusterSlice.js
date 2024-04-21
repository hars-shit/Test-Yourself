import { createSlice } from "@reduxjs/toolkit"

const initialState={
    currentId:null
}

const clusterSlice=createSlice({
    name:"cluster",
    initialState,
    reducers:{
        clusterId:(state,action)=>{
            state.currentId=action.payload;
        }
    }
})

export const {clusterId}=clusterSlice.actions;

export default clusterSlice.reducer;