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
    async (event) => {
        return await service.addEvent(event);
    }
);

export const deleteEventAsync = createAsyncThunk(
    actionTypes.DELETE_EVENT,
    async (eventID) => {
        return await service.deleteEvent(eventID);
    }
);

export const updateEventAsync = createAsyncThunk(
    actionTypes.UPDATE_EVENT,
    async (event) => {
      return await service.updateEvent(event);
    }
);

export const removeEventParticipant = createAsyncThunk(   
    actionTypes.REMOVE_PARTICIPANT,
    async ({eventID, userID}) => {
        return await service.removeEventParticipant(eventID, userID);
    }
);