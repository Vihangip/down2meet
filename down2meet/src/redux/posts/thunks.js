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

export const addParticipantToPost = createAsyncThunk(
    'users/addParticipantToPost',
    async ({ postID, userID }) => {
        return await service.addParticipantToPost(postID, userID);
    }
);

export const removeParticipantFromPost = createAsyncThunk(   
    'users/removeParticipantFromPost',
    async ({postID, userID}) => {
        return await service.removeParticipantFromPost(postID, userID);
    }
);
