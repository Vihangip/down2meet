import data from '../../../tests/fillerData.json';
import dummyUser from '../../../tests/dummyUser.json';
import { userData } from '../../../tests/usersData';
// import {events}

const initialState = {
    posts: data,
    user: dummyUser,
    friendsList: userData,
    activeUsers: userData,
    event: [],
    // events: [],
  };

  

const reducer = (state = initialState, action) => {
    switch (action.type) {
      case 'ADD_POST':
        return {
          ...state,
          posts: [...state.posts, action.payload.object],
        };
      case 'UPDATE_USER_PROFILE': //for profile, not storing all users yet
        return {
          ...state,
          user: action.payload
        };
      case 'REMOVE_FRIEND':
        const updatedFriendsList = state.friendsList.filter(
          (friend, index) => index !== action.payload
        );
        const updatedActiveUsers = updatedFriendsList.filter((friend) => friend.availability);


        // calendar Event
        case 'ADD_EVENT':
          return {
            ...state,
            event: [...state.posts, action.payload.object],
          };
        case 'UPDATE_EVENT': //for profile, not storing all users yet
          return {
            ...state,
            event: action.payload
          };
        case 'REMOVE_EVENT':
          const updatedEventList = state.event.filter(
            (event, index) => index !== action.payload
          );
          const updatedEvent = updatedEventList;
          //updatedEventList.filter((event) => friend.event);


        // calendar Events
        case 'ADD_EVENT':
          return {
            ...state,
            events: [...state.posts, action.payload.object],
          };
        case 'UPDATE_EVENT': //for profile, not storing all users yet
          return {
            ...state,
            events: action.payload
          };
        case 'REMOVE_EVENT':
          const updatedEventRemoveList = state.events.filter(
            (events, index) => index !== action.payload
          );
          const updatedEvents = updatedEventRemoveList;
          // updatedFriendsList.filter((friend) => friend.event);
        
      
        return {
          ...state,
          friendsList: updatedFriendsList,
          activeUsers: updatedActiveUsers,
          event: updatedEvent,
          events: updatedEvents,
        };


      default:
        return state;
    }
  };
  
  export default reducer;
  