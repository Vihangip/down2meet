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

  useEffect(() => {
    buttonAvailable = isBusy ? 'button busy' : 'button available';
    if(userAvailability === "Availability"){
      setIsBusy(false);
    } else if ( userAvailability === "Busy"){
      setIsBusy(true);
    }
    const primaryColor = getComputedStyle(root).getPropertyValue('--active-color').trim();
    const secondaryColor = getComputedStyle(root).getPropertyValue('--busy-color').trim();
    root.style.setProperty('--active-color', isBusy ? primaryColor : secondaryColor);
    root.style.setProperty('--busy-color', isBusy ? secondaryColor : primaryColor);
  }, [userAvailability])
  console.log("user availabiity: " + userAvailability)

  if (!userAvailability) {
    console.log("loading.....")
    // Return a loading state if the availability data is not available yet
    return <div>Loading...</div>;
  }
  const handleClick = async () => {
    const primaryColor = getComputedStyle(root).getPropertyValue('--active-color').trim();
    const secondaryColor = getComputedStyle(root).getPropertyValue('--busy-color').trim();
    root.style.setProperty('--active-color', isBusy ? primaryColor : secondaryColor);
    root.style.setProperty('--busy-color', isBusy ? secondaryColor : primaryColor);

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
