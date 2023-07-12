import { createAsyncThunk } from '@reduxjs/toolkit';
import service from "./service";

export const getUsersAsync = createAsyncThunk(
    'users/getUsersAsync',
    async () => {
        return await service.getUsers();
    }
);

export const getOneUserAsync = createAsyncThunk(
    'users/getOneUserAsync',
    async () => {
        return await service.getOneUser();
    }
);

export const addUsersAsync = createAsyncThunk(
    'users/addUsersAsync',
    async (user) => {
        return await service.addUsers(user);
    });

export const deleteUsersAsync = createAsyncThunk(
    'users/deleteUsersAsync',
    async (userID) => {
        return await service.deleteUsers(userID);
    }
);
