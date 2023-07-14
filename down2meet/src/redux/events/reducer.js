import { createSlice } from "@reduxjs/toolkit";
import { getGroupsAsync, addGroupsAsync, deleteGroupsAsync } from "./thunks";


const INITIAL_STATE = {
    eventsList: [],
};

const eventsSlice = createSlice({
    name: "events",
    initialState: INITIAL_STATE,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getGroupsAsync.fulfilled, (state, action) => {
                state.eventsList = action.payload;
            })
            .addCase(addGroupsAsync.fulfilled, (state, action) => {
                state.eventsList.push(action.payload);
            })
            .addCase(deleteGroupsAsync.fulfilled, (state, action) => {
                state.eventsList = state.eventsList.filter((event) => event.id !== action.payload);
            });
    },
});

export default eventsSlice.reducer;