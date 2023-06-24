import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user/reducer';
import postReducer from './posts/reducer';
import friendReducer from './friends/reducer';
import groupReducer from './groups/reducer';

const store = configureStore({
    reducer: {
        user: userReducer,
        posts: postReducer,
        friends: friendReducer,
        groups: groupReducer,
    },
});

export default store;