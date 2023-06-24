import { createAsyncThunk } from "@reduxjs/toolkit";
import service from "./service";


export const getFriendsAsync = createAsyncThunk(
    "friends/getFriendsAsync",
    async () => {
        return await service.getFriends();
    }
);

export const addFriendAsync = createAsyncThunk(
    "friends/addFriendAsync",
    async (friend) => {
        return await service.addFriend(friend);
    }
);

export const deleteFriendAsync = createAsyncThunk(
    "friends/deleteFriendAsync",
    async (friendID) => {
        return await service.deleteFriend(friendID);
    }
);
