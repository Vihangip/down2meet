import { createSlice } from "@reduxjs/toolkit";
import { logoutUserAsync } from "./thunks";


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
            .addCase(logoutUserAsync.fulfilled,(state,action)=>{
                state.authenticated = false;
            });
    },
});
export default authenticationSlice.reducer;