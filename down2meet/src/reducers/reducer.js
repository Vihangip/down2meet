
const initialState = {
    googleCalendar: false
  };

const reducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SIGNED_IN_CALENDAR':
        return {
          ...state,
          googleCalendar: action.payload
         };
      default:
        return state;
    }
  };
  
  export default reducer;
  