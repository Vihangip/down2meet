import { createAsyncThunk } from "@reduxjs/toolkit";
import service from "./service";

export const getGroupsAsync = createAsyncThunk(
    "groups/getGroupsAsync",
    async () => {
        return await service.getGroups();
    }
);

export const addGroupsAsync = createAsyncThunk(
    "groups/addGroupsAsync",
    async (group) => {
        return await service.addGroups(group);
    }
);

export const deleteGroupsAsync = createAsyncThunk(
    "groups/deleteGroupsAsync",
    async (groupID) => {
        return await service.deleteGroups(groupID);
    }
);
