import { createSlice } from "@reduxjs/toolkit";
import { getAvailabilityAsync, addAvailabilityAsync, deleteAvailabilityAsync, updateAvailabilityAsync } from "./thunks";


const INITIAL_STATE = {
    availabilityList: []
};

const availabilitySlice = createSlice({
    name: "availability",
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
                state.availabilityList = state.availabilityList.filter((availability) => availability.id !== action.payload);
            })
            .addCase(updateAvailabilityAsync.fulfilled, (state, action) => {
                // we find the event by id and then 
                const foundIndex = state.availabilityList.findIndex(availability => availability.id === action.payload.id);
                state.availabilityList[foundIndex] = action.payload;
            });
    },
});

export default availabilitySlice.reducer;