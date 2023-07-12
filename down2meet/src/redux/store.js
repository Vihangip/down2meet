import { configureStore } from '@reduxjs/toolkit';
import eventReducer from './events/eventReducer';
import friendReducer from './friends/reducers';
import groupReducer from './groups/reducers';

const store = configureStore({
    reducer: {
        events: eventReducer,
        friends: friendReducer,
        groups: groupReducer,
    },
});

export default store;