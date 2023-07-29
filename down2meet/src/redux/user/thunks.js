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

export const addUserEventAsync = createAsyncThunk(
    'users/addUserEventAsync',
    async (userID, eventID) => {
        return await service.addUserEvent(userID, eventID);
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

export const addFriendAsync = createAsyncThunk(
  'users/addFriend',
  async ({ userId, friendId }) => {
    return await service.addFriend(userId, friendId);
  }
);

export const removeFriendAsync = createAsyncThunk(
  'users/removeFriend',
  async ({ userId, friendId }) => {
    return await service.removeFriend(userId, friendId);
  }
);

export const getFriendsAsync = createAsyncThunk(
  'users/getFriendsAsync',
  async (user_id) => {
      return await service.getFriends(user_id);
  }
);

export const getHangoutsAsync = createAsyncThunk(
  'users/getHangoutsAsync',
  async (user_id) => {
      return await service.getHangouts(user_id);
  }
);
