// import {createSlice} from '@reduxjs/toolkit'

// const initialState={
//     currentPrompt:null
// }

// const promptSlice=createSlice({
//     name:"prompt",
//     initialState,
//     reducers:{
//         prompt:(state,action)=>{
//             state.currentPrompt=action.payload;
//         }
//     }
// })

// export const {prompt}=promptSlice.actions;

// export default promptSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    // Assuming 'prompts' is an array of question objects
    prompts: []
};

const promptSlice = createSlice({
    name: "prompt",
    initialState,
    reducers: {
        // Initializes prompts. Call this when loading your questions the first time.
        setPrompts: (state, action) => {
            state.prompts = action.payload;
        },
        // Updates the answer for a single question
        updateAnswer: (state, action) => {
            const { index, user_answer, marks } = action.payload;
            if (state.prompts[index]) {
                state.prompts[index].user_answer = user_answer;
                state.prompts[index].marks = marks;
            }
        }
    }
});

export const { setPrompts, updateAnswer } = promptSlice.actions;

export default promptSlice.reducer;
