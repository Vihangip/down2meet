
export const UPDATE_USER_PROFILE = 'UPDATE_USER_PROFILE';
export const SIGNED_IN_CALENDAR = 'SIGNED_IN_CALENDAR';
export const REMOVE_FRIEND = 'REMOVE_FRIEND';


export const updateUserProfile = (user) => {
  return {
    type: UPDATE_USER_PROFILE,
    payload: user
  };
};

export const signInCalendar = (sign) => {
  return {
    type: SIGNED_IN_CALENDAR,
    payload: sign
  };
};

export const removeFriend = (index) => {
  return {
    type: REMOVE_FRIEND,
    payload: index
  };
};
