import { createSlice } from "@reduxjs/toolkit";
import { getPostsAsync, addPostAsync, deletePostAsync } from "./thunks";


const INITIAL_STATE = {
    postList: [],
};

const postSlice = createSlice({
    name: "posts",
    initialState: INITIAL_STATE,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getPostsAsync.fulfilled, (state, action) => {
                state.postList = action.payload;
            })
            .addCase(addPostAsync.fulfilled, (state, action) => {
                state.postList.push(action.payload);
            })
            .addCase(deletePostAsync.fulfilled, (state, action) => {
                state.postList = state.postList.filter((post) => post.id !== action.payload);
            });
    },
});

export default postSlice.reducer;