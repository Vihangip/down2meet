import { createSlice } from "@reduxjs/toolkit";
import { getPostsAsync, addPostAsync, deletePostAsync, getFriendsPostsAsync } from "./thunks";
import {REQUEST_STATE} from '../utils'


const INITIAL_STATE = {
    postList: [],
    friendsPostList: [],
    getPosts: REQUEST_STATE.IDLE,
    addPost: REQUEST_STATE.IDLE,
};

const postSlice = createSlice({
    name: "posts",
    initialState: INITIAL_STATE,
    reducers: {        
        setUpdateState: (state, action) => {
        state.setUpdate = action.payload;
    },},
    extraReducers: (builder) => {
        builder
            .addCase(getPostsAsync.fulfilled, (state, action) => {
                state.getPosts = REQUEST_STATE.FULFILLED;
                state.postList = action.payload;
            })
            .addCase(addPostAsync.fulfilled, (state, action) => {
                state.addPost = REQUEST_STATE.FULFILLED;
                state.friendsPostList.push(action.payload);
                state.postList.push(action.payload);
            })
            .addCase(deletePostAsync.fulfilled, (state, action) => {
                // state.postList = state.postList.filter((post) => post.id !== action.payload);
                 state.friendsPostList = state.friendsPostList.filter((post) => post.post_id !== action.payload);
            })
            .addCase(getFriendsPostsAsync.fulfilled, (state, action) => {
                state.friendsPostList = action.payload;
            });
    },
});
export const { setUpdateState } = postSlice.actions;
export default postSlice.reducer;