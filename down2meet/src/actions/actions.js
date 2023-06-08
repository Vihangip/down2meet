export const ADD_POST = 'ADD_POST';


const addPost = (object) => ({
  type: ADD_POST,
  payload: {
    object,
  },
});


export default addPost;