import React, { useState } from 'react';
import { useSelector } from 'react-redux';
//require('dotenv').config();


export default function Button() {
  const root = document.documentElement;
  const [isBusy, setIsBusy] = useState(false);
  
  // Use the useSelector hook to get the current user from state
  const user = JSON.parse(localStorage.getItem('user'));
  
  const buttonAvailable = isBusy ? 'button busy' : 'button available';

  const handleClick = async () => {
    const primaryColor = getComputedStyle(root).getPropertyValue('--active-color').trim();
    const secondaryColor = getComputedStyle(root).getPropertyValue('--busy-color').trim();
    root.style.setProperty('--active-color', secondaryColor);
    root.style.setProperty('--busy-color', primaryColor);
  
    // Update user's availability in the database
    const availability = isBusy ? 'Available' : 'Busy';
    const response = await fetch(`${process.env.REACT_APP_URL3001}/users/${user.user_id}/availability`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ availability }),
    });
  
    if (!response.ok) {
      // Handle error
      console.error('Error updating user availability');
    } else {
      // Only change the button state after successful server response
      setIsBusy(!isBusy);
    }
  };

  

  return(
    <div>
      <button className={buttonAvailable} onClick= {handleClick}>{isBusy ? 'Busy' : 'Available'} </button>
    </div>
  );
}
