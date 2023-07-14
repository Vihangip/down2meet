import { createAsyncThunk } from "@reduxjs/toolkit";
import { actionTypes } from './actionTypes';
import service from "./service";

export const getAvailabilityAsync = createAsyncThunk(
   actionTypes.GET_AVAILABILITY,
    async () => {
        return await service.getAvailability();
    }
);

export const addAvailabilityAsync = createAsyncThunk(
    actionTypes.ADD_AVAILABILITY,
    async (group) => {
        return await service.addAvailability(group);
    }
);

export const deleteAvailabilityAsync = createAsyncThunk(
    actionTypes.DELETE_AVAILABILITY,
    async (groupID) => {
        return await service.deleteAvailability(groupID);
    }
);

export const updateAvailabilityAsync = createAsyncThunk(
    actionTypes.UPDATE_AVAILABILITY,
    async (item) => {
      return await service.updateAvailability(item);
    }
  );
