import { createAsyncThunk } from "@reduxjs/toolkit";
import { actionTypes } from './actionTypes';
import service from "./service";

export const getEventsAsync = createAsyncThunk(
    actionTypes.GET_EVENT,
    async () => {
        return await service.getEvents();
    }
);

export const addEventsAsync = createAsyncThunk(
    actionTypes.ADD_EVENT,
    async (event) => {
        return await service.addEvents(event);
    }
);

export const deleteEventsAsync = createAsyncThunk(
    actionTypes.DELETE_EVENT,
    async (eventID) => {
        return await service.deleteEvents(eventID);
    }
);
