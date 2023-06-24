export const ADD_POST = 'ADD_POST';
export const UPDATE_USER_PROFILE = 'UPDATE_USER_PROFILE';
export const REMOVE_FRIEND = 'REMOVE_FRIEND';


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

export const removeFriend = (index) => {
  return {
    type: REMOVE_FRIEND,
    payload: index
  };
};

// export const ADD_POST = 'ADD_POST';

// export function addPost(post) {
//   return {
//     type: ADD_POST,
//     payload: post
//   };
// }