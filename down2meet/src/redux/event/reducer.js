import { createSlice } from "@reduxjs/toolkit";
import { getEventAsync, addEventAsync, deleteEventAsync, updateEventAsync, removeEventParticipant} from "./thunks";


const INITIAL_STATE = {
    eventList: []
};

const eventSlice = createSlice({
    name: "event",
    initialState: INITIAL_STATE,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getEventAsync.fulfilled, (state, action) => {
                state.eventList = action.payload;
            })
            .addCase(addEventAsync.fulfilled, (state, action) => {
                state.eventList.push(action.payload);
            })
            .addCase(deleteEventAsync.fulfilled, (state, action) => {
                state.eventList = state.eventList.filter((event) => event.id !== action.payload);
            })
            .addCase(updateEventAsync.fulfilled, (state, action) => {
                const foundIndex = state.eventList.findIndex(event => event.id === action.payload.id);
                state.eventList[foundIndex] = action.payload;
            })
            .addCase(removeEventParticipant.fulfilled, (state, action) => {
                state.eventList = state.eventList.filter((event) => event !== action.payload);
            });
    },
});

export default eventSlice.reducer;