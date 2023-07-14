import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user/reducer';
import postReducer from './posts/reducer';
import groupReducer from './groups/reducer';
import availabilityReducer from './availability/reducer';


const store = configureStore({
    reducer: {
        users: userReducer,
        posts: postReducer,
        groups: groupReducer,
        availability: availabilityReducer
    },
});

export default store;