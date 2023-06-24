import { createSlice } from "@reduxjs/toolkit";
import { getGroupsAsync, addGroupsAsync, deleteGroupsAsync } from "./thunks";


const INITIAL_STATE = {
    groupsList: [],
};

const groupsSlice = createSlice({
    name: "groups",
    initialState: INITIAL_STATE,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getGroupsAsync.fulfilled, (state, action) => {
                state.groupsList = action.payload;
            })
            .addCase(addGroupsAsync.fulfilled, (state, action) => {
                state.groupsList.push(action.payload);
            })
            .addCase(deleteGroupsAsync.fulfilled, (state, action) => {
                state.groupsList = state.groupsList.filter((group) => group.id !== action.payload);
            });
    },
});

export default groupsSlice.reducer;