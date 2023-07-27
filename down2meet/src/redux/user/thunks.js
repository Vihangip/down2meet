import { createAsyncThunk } from '@reduxjs/toolkit';
import service from "./service";

export const getUsersAsync = createAsyncThunk(
    'users/getUsersAsync',
    async () => {
        return await service.getUsers();
    }
);

// export const getOneUserAsync = createAsyncThunk(
//     'users/getOneUserAsync',
//     async (userID) => {
//       return await service.getOneUser(userID);
//     }
//   );
export const getOneUserAsync = createAsyncThunk(
    'users/getOneUserAsync',
    async (userID, { rejectWithValue }) => {
      try {
        const user = await service.getOneUser(userID);
        return user;
      } catch (error) {
        // Use rejectWithValue to include the error message in the action payload
        return rejectWithValue(error.message);
      }
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

export const addUserPostAsync = createAsyncThunk(
    'users/addUserPostAsync',
    async (userID, postID) => {
        return await service.addUserPost(userID, postID);
    });

export const logoutUserAsync = createAsyncThunk(
  'users/logoutUserAsync', 
  async () => {
      return await service.logoutUser();
});

export const getSessionUserAsync = createAsyncThunk(
  'users/getUserAsync',
  async() => {
    return await service.getSessionUser();
  }
);
