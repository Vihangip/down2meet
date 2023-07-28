import { createSlice } from "@reduxjs/toolkit";
import { getPostsAsync, addPostAsync, deletePostAsync, addViewerToPost, removeViewerFromPost } from "./thunks";
import {REQUEST_STATE} from '../utils'
import { remove } from "jszip";


const INITIAL_STATE = {
    postList: [],
    getPosts: REQUEST_STATE.IDLE,
    addPost: REQUEST_STATE.IDLE,
};

const postSlice = createSlice({
    name: "posts",
    initialState: INITIAL_STATE,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getPostsAsync.fulfilled, (state, action) => {
                state.getPosts = REQUEST_STATE.FULFILLED;
                state.postList = action.payload;
            })
            .addCase(addPostAsync.fulfilled, (state, action) => {
                state.addPost = REQUEST_STATE.FULFILLED;
                state.postList.push(action.payload);
            })
            .addCase(deletePostAsync.fulfilled, (state, action) => {
                state.postList = state.postList.filter((post) => post.id !== action.payload);
            })
            .addCase(addViewerToPost.fulfilled, (state, action) => {
                // console.log('BEFORE');
                // console.log(state.postList);
                // state.postList = state.postList.map((post) => {
                //     if (post.id === action.payload.id) {
                //         return action.payload;
                //     }
                //     return post;
                // });
                // console.log('AFTER');
                // console.log(state.postList);
            })
            .addCase(removeViewerFromPost.fulfilled, (state, action) => {
                // state.postList = state.postList.map((post) => {
                //     if (post.id === action.payload.id) {
                //         return action.payload;
                //     }
                //     return post;
                // });
            });
    },
});

export default postSlice.reducer;