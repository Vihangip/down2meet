import { createSlice } from "@reduxjs/toolkit";
import { getUsersAsync, addUsersAsync, deleteUsersAsync, getOneUserAsync } from "./thunks";


const INITIAL_STATE = {
    userList: [],
    friendsList: [],
};

const userSlice = createSlice({
    name: "users",
    initialState: INITIAL_STATE,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getUsersAsync.fulfilled, (state, action) => {
                state.userList = action.payload;
                state.friendsList = action.payload[0].friends;
            })
            .addCase(getOneUserAsync.fulfilled, (state, action) => {
                state.user = action.payload;
            })
            .addCase(addUsersAsync.fulfilled, (state, action) => {
                state.userList.push(action.payload);
            })
            .addCase(deleteUsersAsync.fulfilled, (state, action) => {
                state.userList = state.userList.filter((user) => user.id !== action.payload);
            });
    },
});

export default userSlice.reducer;