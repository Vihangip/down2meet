import { createSlice } from "@reduxjs/toolkit";
import { getUsersAsync, addUsersAsync, deleteUsersAsync, getOneUserAsync, addUserPostAsync } from "./thunks";


const INITIAL_STATE = {
    user: null,
    userList: [],
    friendsList: [],
    postList:[]
};

const userSlice = createSlice({
    name: "users",
    initialState: INITIAL_STATE,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
          },
        
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUsersAsync.fulfilled, (state, action) => {
                state.userList = action.payload;
                state.friendsList = action.payload[0].friends;
            })
            .addCase(getOneUserAsync.fulfilled, (state, action) => {
                state.user = action.payload;
            })
            .addCase(getOneUserAsync.rejected, (state, action) => {
                state.error = action.error.message;
                console.log(action.error);
              })
            .addCase(addUsersAsync.fulfilled, (state, action) => {
                state.userList.push(action.payload);
            })
            .addCase(deleteUsersAsync.fulfilled, (state, action) => {
                state.userList = state.userList.filter((user) => user.id !== action.payload);
            })
            .addCase(addUserPostAsync.fulfilled, (state, action) => {
                state.postList.push(action.payload);
            });
    },
});
export const { setUser } = userSlice.actions;
export default userSlice.reducer;