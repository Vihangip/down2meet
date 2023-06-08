import data from '../tests/fillerData.json';

const initialState = {
    posts: data,
  };
  

const reducer = (state = initialState, action) => {
    switch (action.type) {
      case 'ADD_POST':
        return {
          ...state,
          posts: [...state.posts, action.payload.object],
        };
      default:
        return state;
    }
  };
  
  export default reducer;
  