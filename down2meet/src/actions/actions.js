export const SIGNED_IN_CALENDAR = 'SIGNED_IN_CALENDAR';

export const signInCalendar = (sign) => {
  return {
    type: SIGNED_IN_CALENDAR,
    payload: sign
  };
};
