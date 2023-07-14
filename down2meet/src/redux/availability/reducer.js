import { createSlice } from "@reduxjs/toolkit";
import { getAvailabilityAsync, addAvailabilityAsync, deleteAvailabilityAsync } from "./thunks";


const INITIAL_STATE = {
    availabilityList: [],
};

const availabilitySlice = createSlice({
    name: "groups",
    initialState: INITIAL_STATE,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAvailabilityAsync.fulfilled, (state, action) => {
                state.availabilityList = action.payload;
            })
            .addCase(addAvailabilityAsync.fulfilled, (state, action) => {
                state.availabilityList.push(action.payload);
            })
            .addCase(deleteAvailabilityAsync.fulfilled, (state, action) => {
                state.availabilityList = state.availabilityList.filter((avialability) => avialability.id !== action.payload);
            });
    },
});

export default availabilitySlice.reducer;