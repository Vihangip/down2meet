import { createSlice } from "@reduxjs/toolkit";
import { getUsersAsync, addUsersAsync, deleteUsersAsync, getOneUserAsync } from "./thunks";


const INITIAL_STATE = {
    userList: [],
    friendsList: [],
    isUserNotFound: false,
};

const userSlice = createSlice({
    name: "users",
    initialState: INITIAL_STATE,
    reducers: { setUserNotFound: (state, action) => {
        state.isUserNotFound = action.payload;
    }  
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUsersAsync.fulfilled, (state, action) => {
                state.userList = action.payload;
                state.friendsList = action.payload[0].friends;
            })
            .addCase(getOneUserAsync.fulfilled, (state, action) => {
                state.user = action.payload;
                state.isUserNotFound = false;
            })
            .addCase(getOneUserAsync.rejected, (state, action) => {
                state.isUserNotFound = true; // User not found in the database
              })
            .addCase(addUsersAsync.fulfilled, (state, action) => {
                state.userList.push(action.payload);
            })
            .addCase(deleteUsersAsync.fulfilled, (state, action) => {
                state.userList = state.userList.filter((user) => user.id !== action.payload);
            });
    },
});
export const { setUserNotFound } = userSlice.actions;
export default userSlice.reducer;