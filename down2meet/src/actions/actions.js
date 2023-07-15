
export const UPDATE_USER_PROFILE = 'UPDATE_USER_PROFILE';
export const REMOVE_FRIEND = 'REMOVE_FRIEND';


export const updateUserProfile = (user) => {
  return {
    type: UPDATE_USER_PROFILE,
    payload: user
  };
};

export const removeFriend = (index) => {
  return {
    type: REMOVE_FRIEND,
    payload: index
  };
};
