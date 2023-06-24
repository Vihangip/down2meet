import { createSlice } from "@reduxjs/toolkit";
import { getUserAsync, addUserAsync, deleteUserAsync } from "./thunks";


const INITIAL_STATE = {
    userList: [],
};

const userSlice = createSlice({
    name: "users",
    initialState: INITIAL_STATE,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getUserAsync.fulfilled, (state, action) => {
                state.userList = action.payload;
            })
            .addCase(addUserAsync.fulfilled, (state, action) => {
                state.userList.push(action.payload);
            })
            .addCase(deleteUserAsync.fulfilled, (state, action) => {
                state.userList = state.userList.filter((user) => user.id !== action.payload);
            });
    },
});

export default userSlice.reducer;