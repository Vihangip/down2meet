import { createSlice } from "@reduxjs/toolkit";
import { loginUserAsync, logoutUserAsync } from "./thunks";


const INITIAL_STATE = {
    authenticated: false,
};

const authenticationSlice = createSlice({
    name: "authentication",
    initialState: INITIAL_STATE,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            // .addCase(loginUserAsync.fulfilled,(state,action)=>{
            //     state.authenticated = true;
            // })
            .addCase(logoutUserAsync.fulfilled,(state,action)=>{
                state.authenticated = false;
            });
    },
});
export default authenticationSlice.reducer;