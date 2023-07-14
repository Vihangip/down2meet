import data from '../../../tests/fillerData.json';
import dummyUser from '../../../tests/dummyUser.json';
import { userData } from '../../../tests/usersData';
// import {events}

const initialState = {
    posts: data,
    user: dummyUser,
    friendsList: userData,
    activeUsers: userData,
    availability: [],
    events: [],
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


        // calendar Availability
        case 'ADD_AVAILABILITY':
          return {
            ...state,
            availability: [...state.posts, action.payload.object],
          };
        case 'UPDATE_AVAILABILITY': //for profile, not storing all users yet
          return {
            ...state,
            availability: action.payload
          };
        case 'REMOVE_AVAILABILITY':
          const updatedAvailabilityList = state.availability.filter(
            (availability, index) => index !== action.payload
          );
          const updatedAvailability = updatedAvailabilityList;
          //updatedAvailabilityList.filter((availability) => friend.availability);


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
          const updatedEventList = state.events.filter(
            (events, index) => index !== action.payload
          );
          const updatedEvents = updatedEventList;
          // updatedFriendsList.filter((friend) => friend.availability);
        
      
        return {
          ...state,
          friendsList: updatedFriendsList,
          activeUsers: updatedActiveUsers,
          availability: updatedAvailability,
          events: updatedEvents,
        };


      default:
        return state;
    }
  };
  
  export default reducer;
  