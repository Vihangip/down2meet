import { createAsyncThunk } from '@reduxjs/toolkit';
import service from "./service";

export const getUserAsync = createAsyncThunk(
    'users/getUserAsync',
    async () => {
        return await service.getUser();
    }
);

export const addUserAsync = createAsyncThunk(
    'users/addUserAsync',
    async (user) => {
        return await service.addUser(user);
    }
);

export const deleteUserAsync = createAsyncThunk(
    'users/deleteUserAsync',
    async (userID) => {
        return await service.deleteUser(userID);
    }
);
