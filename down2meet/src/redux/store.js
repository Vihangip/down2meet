import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user/reducer';
import postReducer from './posts/reducer';
import groupReducer from './groups/reducer';
import eventReducer from './event/reducer';


const store = configureStore({
    reducer: {
        users: userReducer,
        posts: postReducer,
        groups: groupReducer,
        event: eventReducer
    },
});

export default store;