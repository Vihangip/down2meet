import { createAsyncThunk } from "@reduxjs/toolkit";
import { actionTypes } from './actionTypes';
import service from "./service";

export const getGroupsAsync = createAsyncThunk(
    actionTypes.GET_GROUPS,
    async () => {
        return await service.getGroups();
    }
);

export const addGroupsAsync = createAsyncThunk(
    actionTypes.ADD_GROUP,
    async (group) => {
        return await service.addGroups(group);
    }
);

export const deleteGroupsAsync = createAsyncThunk(
    actionTypes.DELETE_GROUP,
    async (groupID) => {
        return await service.deleteGroups(groupID);
    }
);
