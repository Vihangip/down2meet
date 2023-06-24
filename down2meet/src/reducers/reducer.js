import data from '../tests/fillerData.json';
import dummyUser from '../tests/dummyUser.json';

const initialState = {
    posts: data,
    user: dummyUser
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

      default:
        return state;
    }
  };
  
  export default reducer;
  