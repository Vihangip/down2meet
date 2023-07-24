import { createAsyncThunk } from "@reduxjs/toolkit";
import { actionTypes } from './actionTypes';
import service from "./service";

export const getEventAsync = createAsyncThunk(
   actionTypes.GET_EVENT,
    async (userID) => {
        return await service.getEvent(userID);
    }
);

export const addEventAsync = createAsyncThunk(
    actionTypes.ADD_EVENT,
    async (group) => {
        return await service.addEvent(group);
    }
);

export const deleteEventAsync = createAsyncThunk(
    actionTypes.DELETE_EVENT,
    async (groupID) => {
        return await service.deleteEvent(groupID);
    }
);

export const updateEventAsync = createAsyncThunk(
    actionTypes.UPDATE_EVENT,
    async (item) => {
      return await service.updateEvent(item);
    }
  );
