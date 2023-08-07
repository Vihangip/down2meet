import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeUserAvailabilityAsync } from '../redux/user/thunks';

export default function Button() {
  const dispatch = useDispatch();
  const root = document.documentElement;
  const userAvailability = useSelector((state) => state.users.availability);
  const [isBusy, setIsBusy] = useState(false);
  const user = JSON.parse(localStorage.getItem('user'));
  let buttonAvailable = isBusy ? 'button busy' : 'button available';

  const colorSwitch = () => {
    const primaryColor = '#32CD32';
    const secondaryColor = '#FF6347';
    root.style.setProperty('--active-color', isBusy ? secondaryColor : primaryColor);
  };

  useEffect(() => {
    buttonAvailable = isBusy ? 'button busy' : 'button available';
    if(userAvailability === "Availability"){
      setIsBusy(false);
    } else if ( userAvailability === "Busy"){
      setIsBusy(true);
    }
    colorSwitch();
  }, [userAvailability])
  console.log("user availabiity: " + userAvailability)

  // if (!userAvailability) {
  //   console.log("loading.....")
  //   // Return a loading state if the availability data is not available yet
  //   return <div>Loading...</div>;
  // }

  const handleClick = async () => {

  if(userAvailability) {
    colorSwitch();
  }

    // Update user's availability in the database
    const availability = isBusy ? 'Available' : 'Busy';
    dispatch(changeUserAvailabilityAsync({userID: user.user_id, availability: availability}));
    // const response = await fetch(`${process.env.REACT_APP_URL3001}/users/${user.user_id}/availability`, {
    //   method: 'PUT',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ availability }),
    // });
      // Only change the button state after a successful server response
    setIsBusy(!isBusy);
  };


  return (
    <div>
      <button className={buttonAvailable} onClick={handleClick}>
        {isBusy ? 'Busy' : 'Available'}
      </button>
    </div>
  );
}
