export const ADD_POST = 'ADD_POST';
export const UPDATE_USER_PROFILE = 'UPDATE_USER_PROFILE';


export const addPost = (object) => ({
  type: ADD_POST,
  payload: {
    object,
  },
});


export const updateUserProfile = (user) => ({
  type: UPDATE_USER_PROFILE,
  payload: user
});

// export const ADD_POST = 'ADD_POST';

// export function addPost(post) {
//   return {
//     type: ADD_POST,
//     payload: post
//   };
// }