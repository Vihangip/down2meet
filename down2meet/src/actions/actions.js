export const ADD_POST = 'ADD_POST';


const addPost = (object) => ({
  type: ADD_POST,
  payload: {
    object,
  },
});


export default addPost;


// export const ADD_POST = 'ADD_POST';

// export function addPost(post) {
//   return {
//     type: ADD_POST,
//     payload: post
//   };
// }