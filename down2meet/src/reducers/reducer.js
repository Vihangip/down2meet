import data from '../../../tests/fillerData.json';
import dummyUser from '../../../tests/dummyUser.json';
import { userData } from '../../../tests/usersData';

const initialState = {
    posts: data,
    user: dummyUser,
    friendsList: userData,
    activeUsers: userData
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
      
        return {
          ...state,
          friendsList: updatedFriendsList,
          activeUsers: updatedActiveUsers,
        };

      default:
        return state;
    }
  };
  
  export default reducer;
  