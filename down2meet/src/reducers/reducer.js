
import dummyUser from '../tests/dummyUser.json';
import { userData } from '../tests/usersData';

const initialState = {
    user: dummyUser,
    friendsList: userData,
    activeUsers: userData
  };


const reducer = (state = initialState, action) => {
    switch (action.type) {
      case 'UPDATE_USER_PROFILE': //for profile, not storing all users yet
        console.log(dummyUser);
        console.log(action.payload);
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
  