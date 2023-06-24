import { createSlice } from '@reduxjs/toolkit';
import { getEventsAsync, addEventAsync, deleteEventAsync, updateEventAsync } from './eventThunks';

const INITIAL_STATE = {
    eventList: [],
}

const eventSlice = createSlice({
    name: 'events',
    initialState: INITIAL_STATE,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getEventsAsync.fulfilled, (state, action) => {
                state.eventList = action.payload;
            })
            .addCase(addEventAsync.fulfilled, (state, action) => {
                state.eventList.push(action.payload);
            })
            .addCase(deleteEventAsync.fulfilled, (state, action) => {
                state.eventList = state.eventList.filter(event => event.id !== action.payload);
            })
            .addCase(updateEventAsync.fulfilled, (state, action) => {
                const index = state.list.finxIndex(event => event.id === action.payload.id);
                state.eventList[index] = action.payload;
            });
        },
});

export default eventSlice.reducer;