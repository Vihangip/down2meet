import { createSlice } from "@reduxjs/toolkit";
import { getUsersAsync, addUsersAsync, deleteUsersAsync, getOneUserAsync, addUserPostAsync, getSessionUserAsync, addUserEventAsync, 
        getFriendsAsync, getUserGroupsAsync, addUserGroupsAsync, getHangoutsAsync, removeHangoutsForFriendsAsync, addParticipantToPost, 
        removeParticipantFromPost, editUserAsync, getAvailabilityAsync, changeUserAvailabilityAsync } from "./thunks";
import { addGroupsAsync } from "../groups/thunks";


const INITIAL_STATE = {
    user: null,
    availability: null,
    userList: [],
    friendsList: [],
    postList:[],
    eventList:[],
    hangoutList:[], // List of post IDs
    groupList:[]
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
            })
            .addCase(getOneUserAsync.fulfilled, (state, action) => {
                state.user = action.payload;
            })
            .addCase(getOneUserAsync.rejected, (state, action) => {
                state.error = action.error.message;
            })
            .addCase(addUsersAsync.fulfilled, (state, action) => {
                state.userList.push(action.payload);
            })
            .addCase(deleteUsersAsync.fulfilled, (state, action) => {
                state.userList = state.userList.filter((user) => user.id !== action.payload);
            })
            .addCase(addUserPostAsync.fulfilled, (state, action) => {
                state.postList.push(action.payload);
            })
            .addCase(addUserEventAsync.fulfilled, (state, action) => {
                state.eventList.push(action.payload);
            })
            .addCase(getSessionUserAsync.fulfilled,(state,action) => {
                state.user = action.payload;
            })
            .addCase(getFriendsAsync.fulfilled,(state,action)=>{
                console.log('reducers payload');
                console.log(action.payload);
                state.friendsList = action.payload;
            })            
            .addCase(getHangoutsAsync.fulfilled,(state,action)=>{
                state.hangoutList = action.payload;
            })
            .addCase(getUserGroupsAsync.fulfilled,(state,action)=>{
                state.groupList = action.payload;
            })
            .addCase(addUserGroupsAsync.fulfilled,(state,action)=>{
                state.groupList.push(action.payload);

            })
            .addCase(removeHangoutsForFriendsAsync.fulfilled,(state,action)=>{
                state.hangoutList = state.hangoutList.filter((hangout) => hangout !== action.payload);
            })
            .addCase(addParticipantToPost.fulfilled, (state, action) => {
                state.hangoutList.push(action.payload);
            })
            .addCase(removeParticipantFromPost.fulfilled, (state, action) => {
                state.hangoutList = state.hangoutList.filter((hangout) => hangout !== action.payload);
            })
            .addCase(editUserAsync.fulfilled, (state, action) => {
                state.userList = state.userList.map(user => {
                  if (user.user_id === action.payload.user_id) {
                    return action.payload; // Replace the item with the updated one
                  }
                  return user; // Keep the other items 
                })
            })
            .addCase(getAvailabilityAsync.fulfilled,(state,action) => {
                state.availability = action.payload;
                console.log("state.availability for get" +state.availability);
            })
            .addCase(changeUserAvailabilityAsync.fulfilled,(state,action) => {
                state.availability = action.payload;
                console.log("state.availability for change" +state.availability);
            });
    },
});
export const { setUser } = userSlice.actions;
export default userSlice.reducer;