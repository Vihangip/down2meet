// import data from '../assets/dataseed.json';
const initialState = {
    posts: [],
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
  