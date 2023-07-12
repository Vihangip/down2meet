import { createAsyncThunk } from '@reduxjs/toolkit';
import service from "./service";

export const getPostsAsync = createAsyncThunk(
    'users/getPostAsync',
    async () => {
        return await service.getPosts();
    }
);

export const addPostAsync = createAsyncThunk(
    'users/addPostAsync',
    async (post) => {
        return await service.addPost(post);
    }
);

export const deletePostAsync = createAsyncThunk(
    'users/deletePostAsync',
    async (postID) => {
        return await service.deletePost(postID);
    }
);
