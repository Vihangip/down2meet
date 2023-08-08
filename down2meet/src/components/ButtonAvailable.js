import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeUserAvailabilityAsync } from '../redux/user/thunks';

export default function Button() {
  const dispatch = useDispatch();
  const root = document.documentElement;
  const userAvailability = useSelector((state) => state.users.availability);
  const [isBusy, setIsBusy] = useState(false);
  const user = JSON.parse(localStorage.getItem('user'));
  const [buttonAvailable, setButtonAvailable] = useState('button available');

  const colorSwitch = () => {
    const primaryColor = '#32CD32';
    const secondaryColor = '#FF6347';
    root.style.setProperty('--active-color', isBusy ? secondaryColor : primaryColor);
  };

  useEffect(() => {
    setButtonAvailable(isBusy ? 'button busy' : 'button available');
    if(userAvailability === "Availability"){
      setIsBusy(false);
    } else if ( userAvailability === "Busy"){
      setIsBusy(true);
    }
    colorSwitch();
  }, [userAvailability])
  
    const handleClick = async () => {

    if(userAvailability) {
      colorSwitch();
    }

    const availability = isBusy ? 'Available' : 'Busy';
    dispatch(changeUserAvailabilityAsync({userID: user.user_id, availability: availability}));
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
