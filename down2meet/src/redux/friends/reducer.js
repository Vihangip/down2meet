import { createSlice } from "@reduxjs/toolkit";
import { getFriendsAsync, addFriendAsync, deleteFriendAsync } from "./thunks";


const INITIAL_STATE = {
    friendsList: [],
};

const friendsSlice = createSlice({
    name: "friends",
    initialState: INITIAL_STATE,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getFriendsAsync.fulfilled, (state, action) => {
                state.friendsList = action.payload;
            })
            .addCase(addFriendAsync.fulfilled, (state, action) => {
                state.friendsList.push(action.payload);
            })
            .addCase(deleteFriendAsync.fulfilled, (state, action) => {
                state.friendsList = state.friendsList.filter((friend) => friend.id !== action.payload);
            });
    },
});

export default friendsSlice.reducer;