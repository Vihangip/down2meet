import { createAsyncThunk } from '@reduxjs/toolkit';
import service from "./service";

export const getPostsAsync = createAsyncThunk(
    'posts/getPostAsync',
    async () => {
        return await service.getPosts();
    }
);

export const addPostAsync = createAsyncThunk(
    'posts/addPostAsync',
    async (post) => {
        return await service.addPost(post);
    }
);

export const deletePostAsync = createAsyncThunk(
    'posts/deletePostAsync',
    async (postID) => {
        return await service.deletePost(postID);
    }
);


export const getFriendsPostsAsync = createAsyncThunk(
    'posts/getFriendsPostsAsync',
    async (userID) => {
        return await service.getFriendsPosts(userID);
    }
);
