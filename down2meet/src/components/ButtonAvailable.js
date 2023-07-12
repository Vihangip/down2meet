import React, { useState } from 'react';

export default function Button(){
    const root = document.documentElement;
    const [isBusy, setIsBusy] = useState(false);

    const buttonAvailable = isBusy ? 'button busy' : 'button available';
    
    const handleClick = () =>{
        setIsBusy(!isBusy);
        const primaryColor = getComputedStyle(root).getPropertyValue('--active-color').trim();
        const secondaryColor = getComputedStyle(root).getPropertyValue('--busy-color').trim();
        root.style.setProperty('--active-color', secondaryColor);
        root.style.setProperty('--busy-color', primaryColor);
    }
    return(
        <div>
            <button className={buttonAvailable} onClick= {handleClick}>{isBusy ? 'Busy' : 'Available'} </button>
        </div>
    );
}