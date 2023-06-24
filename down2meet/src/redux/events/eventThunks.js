import { createAsyncThunk } from '@reduxjs/toolkit';
import * as actionTypes from './eventActionTypes';
import EventService from '../../services/EventService';

export const getEventsAsync = createAsyncThunk(
    actionTypes.GET_EVENTS,
    async () => {
        return await EventService.getEvents();
    }
);

export const addEventsAsync = createAsyncThunk(
    actionTypes.ADD_EVENT,
    async (event) => {
        return await EventService.addEvent(event);
    }
);

export const deleteEventsAsync = createAsyncThunk(
    actionTypes.DELETE_EVENT,
    async (eventID) => {
        return await EventService.deleteEvent(eventID);
    }
);

export const updateEventsAsync = createAsyncThunk(
    actionTypes.UPDATE_EVENT,
    async ({eventID, event}) => {
        return await EventService.updateEvent(eventID, event);
    }
);